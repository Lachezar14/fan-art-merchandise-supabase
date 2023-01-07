import {Link, useNavigate} from "react-router-dom";
import {useAuth} from "../contexts/AuthContext";
import {supabase} from "../supabaseClient";
import {useEffect, useState} from "react";
import Container from "@mui/material/Container";
import Stack from "@mui/material/Stack";
import {Alert} from "@mui/material";
import Button from "@mui/material/Button";
import {useProfileSetup} from "../contexts/UserProfileSetupContext";

export default function UserProfileSetup() {
    
    const { userProfile } = useProfileSetup();
    const [alert, setAlert] = useState(false);
    const [alertContent, setAlertContent] = useState('');
    
    return (
        userProfile === null ?
            <Container component="main" maxWidth="md" sx={{mt: 3}}>
                <Stack sx={{width: '100%'}} spacing={2}>
                    <Alert
                        action={
                            <Button component={Link}
                                    to={'/profile/setup'}
                                    color="inherit"
                                    size="small"
                            >
                                Set up here
                            </Button>
                        }
                    >
                        Your profile is not set up yet!
                    </Alert>
                </Stack>
            </Container>
            : <></>
    );
}