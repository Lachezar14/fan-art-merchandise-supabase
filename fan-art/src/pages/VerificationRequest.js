import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import VerifiedUserIcon from '@mui/icons-material/VerifiedUser';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import {ThemeProvider} from '@mui/material/styles';
import {Alert, FormHelperText} from "@mui/material";
import {theme} from "../theme";
import {useAuth} from "../contexts/AuthContext";
import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import {supabase} from "../supabaseClient";
import UserProfileSetup from "../components/UserProfileSetup";
import {useProfileSetup} from "../contexts/UserProfileSetupContext";
import {Link} from "react-router-dom";

export default function VerificationRequest() {

    const {user} = useAuth();
    const {userProfile} = useProfileSetup();
    const [image, setImage] = useState("");
    const [requests, setRequests] = useState([]);
    const [alert, setAlert] = useState(false);
    const [alertContent, setAlertContent] = useState('');
    const [errorMessage, setErrorMessage] = useState(false);
    let navigate = useNavigate();

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
}