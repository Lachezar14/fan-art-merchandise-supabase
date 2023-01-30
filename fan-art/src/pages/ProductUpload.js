import * as React from "react";
import {useEffect, useState} from "react";
import {Alert} from "@mui/material";
import Container from "@mui/material/Container";
import {supabase} from "../supabaseClient";
import {useAuth} from "../contexts/AuthContext";
import UserProfileSetup from "../components/UserProfileSetup";
import {useProfileSetup} from "../contexts/UserProfileSetupContext";
import ProductDropzone from "../components/Dropzone/DropzoneProductUpload";
import {Button, createStyles, Group, NativeSelect, Select, SimpleGrid, Text, TextInput, Title} from "@mantine/core";
import {useForm} from "@mantine/form";
import ContactUsSocials from "../components/Socials/ContactUsSocials";
import mockdata from "../components/Socials/UploadProductSocials.js";
import {DisplaySocials} from "../components/Socials/DisplaySocials";


const useStyles = createStyles((theme) => ({
    wrapper: {
        marginTop: 100,
        minHeight: 400,
        boxSizing: 'border-box',
        backgroundImage: `linear-gradient(-60deg, ${theme.colors.violet[3]} 0%, ${
            theme.colors[theme.primaryColor][7]
        } 100%)`,
        borderRadius: theme.radius.md,
        padding: theme.spacing.xl * 2.5,

        [`@media (max-width: ${theme.breakpoints.sm}px)`]: {
            padding: theme.spacing.xl * 1.5,
        },
    },

    title: {
        fontFamily: `Greycliff CF, ${theme.fontFamily}`,
        color: theme.white,
        lineHeight: 1,
    },

    description: {
        color: theme.colors[theme.primaryColor][0],
        maxWidth: 300,

        [`@media (max-width: ${theme.breakpoints.sm}px)`]: {
            maxWidth: '100%',
        },
    },

    form: {
        backgroundColor: theme.white,
        padding: theme.spacing.xl,
        borderRadius: theme.radius.md,
        boxShadow: theme.shadows.lg,
    },

    social: {
        color: theme.white,

        '&:hover': {
            color: theme.colors[theme.primaryColor][1],
        },
    },

    input: {
        backgroundColor: theme.white,
        borderColor: theme.colors.gray[4],
        color: theme.black,

        '&::placeholder': {
            color: theme.colors.gray[5],
        },
    },

    inputLabel: {
        color: theme.black,
    },

    control: {
        backgroundColor: theme.colors.violet[6],
    },
}));

const currency = [
    {value: 'usd', label: '🇺🇸 USD'}
];

export default function ProductUpload() {


    const {user} = useAuth();
    const {userProfile} = useProfileSetup();
    const [image, setImage] = useState(null);
    const [url, setUrl] = useState("");
    const [errorMessage, setErrorMessage] = useState(false);
    const [alert, setAlert] = useState(false);
    const [alertContent, setAlertContent] = useState('');
    const [tag, setTag] = useState("");
    const [creatorTags, setCreatorTags] = useState([]);
    const [files, setFiles] = useState([]);
    const {classes} = useStyles();

    const sendDataToParent = (acceptedFiles) => { // the callback. Use a better name
        setFiles(files => files.concat(...acceptedFiles));
    };

    useEffect(() => {
        const fetchTags = async () => {
            let { data: creatorTags, error } = await supabase
                .from('creatorTags')
                .select('creator_name')
            setCreatorTags(creatorTags.map((tag) => tag.creator_name))
        };
        fetchTags();
    }, []);
    
    const uploadImage = async (values) => {
        if (files.length === 0) {
            setAlert(true);
            setAlertContent("Please select an image");
        } else if (user === null) {
            setAlert(true);
            setAlertContent("Please log in");
        } else {
            const {data, error} = await supabase
                .from('products')
                .insert([
                    {
                        product_name: values.product_name,
                        product_price: values.product_price,
                        creator_tag: tag,
                        user_id: user.id,
                        image_url: null,
                        verified: false,
                    },
                ]).select()

            let id = (data[0].id);

            if (error) {
                setAlert(true);
                setAlertContent("Error uploading product");
            } else {
                files.map(async (file) => {
                    const {dataPic, errorPic} = await supabase
                        .storage
                        .from('products')
                        .upload(`products/${user.id}/${values.product_name}/${file.path}`, file)

                    const url = supabase
                        .storage
                        .from('products')
                        .getPublicUrl(`products/${user.id}/${values.product_name}/${file.path}`)


                    const {data, error} = await supabase
                        .from('productImage')
                        .insert([
                            {
                                created_at: new Date(),
                                product_id: id,
                                image_url: url.data.publicUrl
                            },
                        ])
                    console.log(error);
                })
            }
        }
    };

    const select = (
        <NativeSelect
            data={currency}
            styles={{
                input: {
                    fontWeight: 500,
                    borderTopLeftRadius: 0,
                    borderBottomLeftRadius: 0,
                },
            }}
        />
    );

    const form = useForm({
        initialValues: {
            product_name: '',
            product_price: '',
        },
    });

    const onSubmit = (values) => {
        console.log(values);
    };

    //console.log(files)
    //console.log(tag)

    return (
        <>
            {alert ? <Alert severity="success">{alertContent}</Alert> : <></>}
            <UserProfileSetup/>
            <Container className={classes.wrapper}>
                <SimpleGrid cols={2} spacing={50} breakpoints={[{maxWidth: 'sm', cols: 1}]}>
                    <div>
                        <Title className={classes.title}>Upload product</Title>
                        <Text className={classes.description} mt="sm" mb={30}>
                            Upload your product to the marketplace
                        </Text>
                        <DisplaySocials mockdata={mockdata}/>
                    </div>
                    <div className={classes.form}>
                        <form onSubmit={form.onSubmit((values) => uploadImage(values))}>
                            <TextInput
                                id="product_name"
                                name="product_name"
                                label="Name"
                                placeholder="Product name"
                                required
                                value={form.values.product_name}
                                onChange={(event) => form.setFieldValue('product_name', event.currentTarget.value)}
                            />
                            <TextInput
                                type="number"
                                id="product_price"
                                name="product_price"
                                label="Price"
                                placeholder="100"
                                required
                                rightSection={select}
                                rightSectionWidth={92}
                                value={form.values.product_price}
                                onChange={(event) => form.setFieldValue('product_price', event.currentTarget.value)}
                            />
                            <Select
                                mb={20}
                                data={creatorTags}
                                value={tag}
                                onChange={setTag}
                                label="Creator tag"
                                required
                                placeholder="Pick all that you like"
                            />
                            <ProductDropzone sendDataToParent={sendDataToParent}/>

                            <Group position="right" mt="md">
                                <Button type="submit" className={classes.control}>Upload product</Button>
                            </Group>
                        </form>
                    </div>
                </SimpleGrid>
            </Container>
        </>
    );
}

{/*return (
        <>
            <ThemeProvider theme={theme}>
                <CssBaseline/>
                {alert ? <Alert severity="success">{alertContent}</Alert> : <></>}
               
                <Container component="main" maxWidth="xs">
                    <Box
                        sx={{
                            marginTop: 8,
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                        }}
                    >
                        <Typography component="h1" variant="h5">
                            Upload Product
                        </Typography>
                        <Box component="form" onSubmit={uploadImage} sx={{mt: 3}}>
                            <Grid container spacing={2}>
                                <Grid item xs={12}>
                                    <TextField
                                        required
                                        fullWidth
                                        id="product_name"
                                        label="Title"
                                        name="product_name"
                                        autoComplete="product-name"
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        required
                                        fullWidth
                                        id="product_price"
                                        label="Price"
                                        name="product_price"
                                        autoComplete="product-price"
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        margin="normal"
                                        id="outlined-select-currency"
                                        required
                                        fullWidth
                                        select
                                        label="Creator Tag"
                                        value={tag}
                                        onChange={creatorTagChange}
                                        helperText={"Please select the creator your product is about"}
                                    >
                                        {creatorTags.map((tag) => (
                                            <MenuItem key={tag.id} value={tag}>
                                                {tag.creator_name}
                                            </MenuItem>
                                        ))}
                                    </TextField>
                                </Grid>
                                <Grid item xs={12}>
                                    <ProductDropzone sendDataToParent={sendDataToParent}/>
                                </Grid>
                            </Grid>
                            <Box sx={{display: 'flex', justifyContent: 'center', mt: 3}}>
                                <FormHelperText error>
                                    {errorMessage}
                                </FormHelperText>
                            </Box>
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                sx={{mt: 3, mb: 2}}
                            >
                                Upload
                            </Button>
                        </Box>
                    </Box>
                </Container>
            </ThemeProvider>
        </>
    );*/
}