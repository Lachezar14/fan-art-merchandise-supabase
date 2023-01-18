import * as React from "react";
import {useEffect, useState} from "react";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import {Alert, FormHelperText} from "@mui/material";
import Container from "@mui/material/Container";
import {theme} from "../theme";
import {ThemeProvider} from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import {supabase} from "../supabaseClient";
import {useAuth} from "../contexts/AuthContext";
import Stack from "@mui/material/Stack";
import {Link} from "react-router-dom";
import UserProfileSetup from "../components/UserProfileSetup";
import {useProfileSetup} from "../contexts/UserProfileSetupContext";
import MenuItem from "@mui/material/MenuItem";

export default function Profile() {


    const {user} = useAuth();
    const { userProfile } = useProfileSetup();
    const [image, setImage] = useState(null);
    const [url, setUrl] = useState("");
    const [errorMessage, setErrorMessage] = useState(false);
    const [alert, setAlert] = useState(false);
    const [alertContent, setAlertContent] = useState('');
    const [tag, setTag] = useState("");
    const [creatorTags, setCreatorTags] = useState([]);
    
    useEffect(() => {
        const fetchTags = async () => {
            let { data, error } = await supabase
                .from('creatorTags')
                .select('*')

            setCreatorTags(data);
        };
        fetchTags();
    }, []);

    const creatorTagChange = (event) => {
        setTag(event.target.value);
    };
        
    
    const uploadImage = async (event) => {
        event.preventDefault();
        const dataForm = new FormData(event.currentTarget);
        console.log(url)
        if (image === null) {
            setErrorMessage("Please select an image");
        } else if (user === null) {
            setErrorMessage("Please log in");
        } else {
            const {dataPic, errorPic} = await supabase
                .storage
                .from('products')
                .upload(`products/${dataForm.get("product_name")}`, image)
                
            const url = supabase
                .storage
                .from('products')
                .getPublicUrl(`products/${dataForm.get("product_name")}`)

            const {data, error} = await supabase
                .from('products')
                .insert([
                    {
                        product_name: dataForm.get("product_name"),
                        product_price: dataForm.get("product_price"),
                        product_tag: tag,
                        user_id: user.id,
                        image_url: url.data.publicUrl
                    },
                ])
            if (error || errorPic) {
                setErrorMessage(error.message);
                setTimeout(() => {
                    setErrorMessage(false);
                }, 3000);
                
            } else {
                setAlert(true);
                setAlertContent("Product added successfully");
                setTimeout(() => {
                    setAlert(false);
                }, 3000);
            }
        }
    };

    return (
        <>
            <ThemeProvider theme={theme}>
                <CssBaseline/>
                {alert ? <Alert severity="success">{alertContent}</Alert> : <></>}
                <UserProfileSetup/>
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
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                sx={{mt: 3, mb: 2}}
                            >
                                Upload
                            </Button>
                            <Button
                                component={Link}
                                to={"/profile/verification"}
                                fullWidth
                                variant="contained"
                            >
                                Become a verified user/Organization
                            </Button>
                        </Box>
                    </Box>
                </Container>
            </ThemeProvider>
        </>
    );
}