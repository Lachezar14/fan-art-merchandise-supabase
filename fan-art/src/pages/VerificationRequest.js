import * as React from 'react';
import {useEffect, useState} from 'react';
import Container from '@mui/material/Container';
import {useAuth} from "../contexts/AuthContext";
import {useNavigate} from "react-router-dom";
import {supabase} from "../supabaseClient";
import {useProfileSetup} from "../contexts/UserProfileSetupContext";
import {Button, createStyles, Group, Select, SimpleGrid, Text, TextInput, Title} from "@mantine/core";
import ProductDropzone from "../components/Dropzone/DropzoneProductUpload";
import {useForm} from "@mantine/form";
import mockdata from "../components/Socials/VerificationRequestSocials.js";
import {DisplaySocials} from "../components/Socials/DisplaySocials";

const useStyles = createStyles((theme) => ({
    wrapper: {
        marginTop: 50,
        minHeight: 400,
        boxSizing: 'border-box',
        backgroundImage: `linear-gradient(-60deg, ${theme.colors[theme.primaryColor][4]} 0%, ${
            theme.colors.teal[6]
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
        backgroundColor: theme.colors.teal[6],
    },
}));

export default function VerificationRequest() {

    const {user} = useAuth();
    const {userProfile} = useProfileSetup();
    const [image, setImage] = useState("");
    const [requests, setRequests] = useState([]);
    const [alert, setAlert] = useState(false);
    const [alertContent, setAlertContent] = useState('');
    const [errorMessage, setErrorMessage] = useState(false);
    let navigate = useNavigate();
    const {classes} = useStyles();

    useEffect(() => {
        const fetchRequests = async () => {
            let {data, error} = await supabase
                .from('verifyRequests')
                .select('*')
            setRequests(data);
        };
        fetchRequests();
    }, []);

    const handleSubmit = async (event) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);

        if (requests.some((request) => request.user_id === user.id)) {
            setErrorMessage("You have already submitted a request");
            setTimeout(() => {
                setErrorMessage(false);
            }, 3000);
        } else {
            const {dataPic, errorPic} = await supabase
                .storage
                .from('verifyrequests')
                .upload(`verifyrequests/${formData.get("firstName") + formData.get("lastName")}`, image)

            if (errorPic) {
                setAlertContent(errorPic.message);
                setAlert(true);
            } else {
                const url = supabase
                    .storage
                    .from('verifyrequests')
                    .getPublicUrl(`verifyrequests/${formData.get("firstName") + formData.get("lastName")}`)

                const {data, error} = await supabase
                    .from('verifyRequests')
                    .insert([
                        {
                            created_at: new Date(),
                            passport_first_name: formData.get("firstName"),
                            passport_last_name: formData.get("lastName"),
                            instagram_username: formData.get("instagram"),
                            twitter_username: formData.get("twitter"),
                            creator_organization_name: formData.get("creatorName"),
                            user_id: user.id,
                            document_url: url.data.publicUrl,
                            verified: false
                        },
                    ])

                if (error) {
                    setAlertContent(error.message);
                    setAlert(true);
                } else {
                    setAlertContent("Your verification request has been submitted");
                    setAlert(true);
                    setTimeout(() => {
                        navigate("/profile")
                    }, 3000);
                }
            }
        }
    };

    const sendDataToParent = (acceptedFiles) => { // the callback. Use a better name
        //setFiles(files => files.concat(...acceptedFiles));
    };

    const form = useForm({
        initialValues: {
            firstName: '',
            lastName: '',
            twitterUsername: '',
            instagramUsername: '',
            creatorName: '',
        },
    });

    return (
        <Container className={classes.wrapper}>
            <SimpleGrid cols={2} spacing={50} breakpoints={[{maxWidth: 'sm', cols: 1}]}>
                <div>
                    <Title className={classes.title}>Become a creator and get access to our exclusive tools.</Title>
                    <Text className={classes.description} mt="sm" mb={30}>
                        Apply to become a verified creator.
                    </Text>
                    <DisplaySocials mockdata={mockdata}/>
                </div>
                <div className={classes.form}>
                    <form onSubmit={form.onSubmit((values) => console.log(values))}>
                        <SimpleGrid cols={2} breakpoints={[{maxWidth: 'sm', cols: 1}]}>
                            <TextInput
                                id="firstName"
                                name="firstName"
                                label="First Name"
                                placeholder="Ben"
                                required
                                value={form.values.firstName}
                                onChange={(event) => form.setFieldValue('firstName', event.currentTarget.value)}
                            />
                            <TextInput
                                id="lastName"
                                name="lastName"
                                label="Family Name"
                                placeholder="Dover"
                                required
                                value={form.values.lastName}
                                onChange={(event) => form.setFieldValue('lastName', event.currentTarget.value)}
                            />
                        </SimpleGrid>
                        <TextInput
                            id="twitterUsername"
                            name="twitterUsername"
                            label="Twitter Username"
                            placeholder="ben_dover94"
                            required
                            value={form.values.twitterUsername}
                            onChange={(event) => form.setFieldValue('twitterUsername', event.currentTarget.value)}
                        />
                        <TextInput
                            id="instagramUsername"
                            name="instagramUsername"
                            label="Instagram Username"
                            placeholder="ben_dover94"
                            required
                            value={form.values.instagramUsername}
                            onChange={(event) => form.setFieldValue('instagramUsername', event.currentTarget.value)}
                        />
                        <TextInput
                            mb={20}
                            id="creatorName"
                            name="creatorName"
                            label="Creator/Organization Name"
                            placeholder="PewDiePie"
                            required
                            value={form.values.creatorName}
                            onChange={(event) => form.setFieldValue('creatorName', event.currentTarget.value)}
                        />
                        <ProductDropzone sendDataToParent={sendDataToParent}/>

                        <Group position="right" mt="md">
                            <Button type="submit" className={classes.control}>Become a creator</Button>
                        </Group>
                    </form>
                </div>
            </SimpleGrid>
        </Container>
    );
}

{/*
    return (
        <ThemeProvider theme={theme}>
            {alert ? <Alert severity="success">{alertContent}</Alert> : <></>}
            <UserProfileSetup/>
            <Container component="main" maxWidth="xs">
                <CssBaseline/>
                <Box
                    sx={{
                        marginTop: 8,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <Avatar sx={{m: 1, bgcolor: 'secondary.main'}}>
                        <VerifiedUserIcon/>
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Apply for Verification
                    </Typography>
                    <Box component="form" onSubmit={handleSubmit} sx={{mt: 3}}>
                        <Grid container spacing={2}>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    autoComplete="given-name"
                                    name="firstName"
                                    required
                                    fullWidth
                                    id="firstName"
                                    label="First Name"
                                    autoFocus
                                    helperText={"same as your ID/Passport"}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    required
                                    fullWidth
                                    id="lastName"
                                    label="Last Name"
                                    name="lastName"
                                    autoComplete="family-name"
                                    helperText={"same as your ID/Passport"}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    id="twitter"
                                    label="Twitter username"
                                    name="twitter"
                                    autoComplete="twitter-username"
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    id="instagram"
                                    label="Instagram username"
                                    name="instagram"
                                    autoComplete="instagram-username"
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    id="creatorName"
                                    label="Creator/Organization Name"
                                    name="creatorName"
                                    autoComplete="creator-name"
                                    helperText={"Write the name of the creator/organization you want to apply to be verified for"}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <Typography component="p" sx={{mb: 1}}>Upload ID/Passport *</Typography>
                                <Box sx={{
                                    display: 'flex',
                                    flexDirection: 'row',
                                    justifyContent: 'flex-start',
                                    alignItems: 'center'
                                }}>
                                    <Button
                                        sx={{mr: 2}}
                                        variant="contained"
                                        component="label"
                                    >
                                        Upload File
                                        <input
                                            type="file"
                                            hidden
                                            onChange={(e) => setImage(e.target.files[0])}
                                        />
                                    </Button>
                                    <Typography variant="body2" color="text.secondary" align="center">
                                        File selected: {image ? image.name : ""}
                                    </Typography>
                                </Box>
                            </Grid>
                        </Grid>
                        <Box sx={{display: 'flex', justifyContent: 'center', mt: 3}}>
                            <FormHelperText error>
                                {errorMessage}
                            </FormHelperText>
                        </Box>
                        { userProfile === null ?
                            <Button component={Link}
                                    to={`/profile/setup`}
                                    variant="contained"
                                    fullWidth
                                    sx={{mt: 3, mb: 2}}
                            > 
                                Apply
                            </Button>
                            :
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                sx={{mt: 3, mb: 2}}
                            >
                                Apply
                            </Button>
                        }
                    </Box>
                </Box>
            </Container>
        </ThemeProvider>
    );
}*/
}