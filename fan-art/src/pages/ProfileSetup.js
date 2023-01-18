import * as React from "react";
import {useNavigate} from "react-router-dom";
import {ThemeProvider} from "@mui/material/styles";
import {theme} from "../theme";
import Container from "@mui/material/Container";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import {Alert, FormHelperText} from "@mui/material";
import Button from "@mui/material/Button";
import {supabase} from "../supabaseClient";
import {useAuth} from "../contexts/AuthContext";
import {useState} from "react";

export default function ProfileSetup() {

    const { user } = useAuth();
    const [alert, setAlert] = useState(false);
    const [alertContent, setAlertContent] = useState('');
    const [errorMessage, setErrorMessage] = React.useState(false);
    let navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);

        if( formData.get("password") !== formData.get("passwordConfirm")) {
            setErrorMessage("Passwords do not match");
            setTimeout(() => {
                setErrorMessage(false);
            }, 5000);
        } else {
            const {data, error} = await supabase
                .from('userInfo')
                .insert([
                    {
                        id: user.id,
                        first_name: formData.get("firstName"),
                        last_name: formData.get("lastName"),
                        phone_number: formData.get("phoneNumber"),
                        email: user.email,
                        password: formData.get("password"),
                        role: "USER"
                    },
                ])
            if (error) {
                setErrorMessage(error.message);
                setTimeout(() => {
                    setErrorMessage(false);
                }, 3000);
            } else {
                setAlert(true);
                setAlertContent("Profile set up successfully");
                setTimeout(() => {
                    window.location.href = "/profile";
                }, 1000);
            }
        }
    };

    return (
        <ThemeProvider theme={theme}>
            {alert ? <Alert severity="success">{alertContent}</Alert> : <></>}
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <Box
                    sx={{
                        marginTop: 8,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                        <AccountCircleIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Finish setting up your profile
                    </Typography>
                    <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
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
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    autoComplete="phone-number"
                                    name="phoneNumber"
                                    required
                                    fullWidth
                                    id="phoneNumber"
                                    label="Phone Number"
                                    autoFocus
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    name="password"
                                    label="Password"
                                    type="password"
                                    id="password"
                                    autoComplete="new-password"
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    name="passwordConfirm"
                                    label="Confirm Password"
                                    type="password"
                                    id="passwordConfirm"
                                    autoComplete="new-password"
                                />
                            </Grid>
                        </Grid>
                        <Box sx={{display:'flex',justifyContent:'center',mt: 3}}>
                            <FormHelperText error>
                                {errorMessage}
                            </FormHelperText>
                        </Box>
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                        >
                            Set up profile
                        </Button>
                    </Box>
                </Box>
            </Container>
        </ThemeProvider>
    );
}