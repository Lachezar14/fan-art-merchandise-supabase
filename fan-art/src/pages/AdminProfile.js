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
import CardContent from "@mui/material/CardContent";
import Card from "@mui/material/Card";
import IconButton from "@mui/material/IconButton";
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import CardMedia from "@mui/material/CardMedia";
import CardActions from "@mui/material/CardActions";


export default function AdminProfile() {

    const [verifyRequests, setVerifyRequests] = useState([]);
    const [updated, setUpdated] = useState(false);

    useEffect(() => {
        const fetchVerifyRequests = async () => {
            let {data: verifyRequests, error} = await supabase
                .from('verifyRequests')
                .select('*')
                .eq('verified', false)
            setVerifyRequests(verifyRequests);
        };
        fetchVerifyRequests();
    }, [updated]);

    const handleSubmit = async (request) => {
        const { updatedRequest, errorRequest } = await supabase
            .from('verifyRequests')
            .update({verified: true})
            .eq('id',request.id)

        if (errorRequest) {
            console.log(errorRequest);
        } else {
            const {user, errorUser} = await supabase
                .from('userInfo')
                .update({role: 'CREATOR'})
                .eq('id', request.user_id)
            
            if (errorUser) {
                console.log(errorUser);
            }
        }
    };

    return (
        <>
            <ThemeProvider theme={theme}>
                <CssBaseline/>
                <Container sx={{py: 8}} maxWidth="lg">
                    <Typography
                        component="h1"
                        variant="h3"
                        align="center"
                        color="text.primary"
                        gutterBottom
                        sx={{mb: 4}}
                    >
                        Verification requests
                    </Typography>
                    <Grid container spacing={4}>
                        {verifyRequests.map((request) => (
                            <Grid item key={request.id} xs={12} md={5}>
                                <Card sx={{display: 'flex'}}>
                                    <Box sx={{display: 'flex', flexDirection: 'column'}}>
                                        <CardContent sx={{flex: '1 0 auto'}}>
                                            <Typography component="div" variant="h5">
                                                {request.passport_first_name} {request.passport_last_name}
                                            </Typography>
                                            <Typography variant="subtitle1" color="text.secondary" component="div">
                                                Mac Miller
                                            </Typography>
                                        </CardContent>
                                        <Box sx={{display: 'flex', alignItems: 'center', pl: 1, pb: 1}}>
                                            <CardActions>
                                                <Button color="primary"
                                                        onClick={() => handleSubmit(request) && setTimeout(() => setUpdated(!updated), 300)}
                                                        sx={{
                                                            borderRadius: 2,
                                                            '&:hover': {
                                                                backgroundColor: '#ADE792',
                                                                color: 'black'
                                                            }
                                                        }}
                                                >
                                                    Accept
                                                </Button>
                                            </CardActions>

                                        </Box>
                                    </Box>
                                    <CardMedia
                                        component="img"
                                        sx={{width: "67%"}}
                                        image={request.document_url}
                                        alt="random"
                                    />
                                </Card>
                            </Grid>
                        ))}
                    </Grid>
                </Container>
            </ThemeProvider>
        </>
    );
}