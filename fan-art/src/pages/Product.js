import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Button from '@mui/material/Button';
import CameraIcon from '@mui/icons-material/PhotoCamera';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useState, useEffect} from "react";
import {theme} from "../theme";
import {Link} from "react-router-dom";
import {supabase} from "../supabaseClient";
import {FormHelperText} from "@mui/material";
import {useProfileSetup} from "../contexts/UserProfileSetupContext";
import UserProfileSetup from "../components/UserProfileSetup";
import VerifiedIcon from '@mui/icons-material/Verified';
import {blue} from "@mui/material/colors";
import Tooltip from "@mui/material/Tooltip";

export default function Album() {
    
    const { userProfile } = useProfileSetup();
    const [products, setProducts] = useState([]);
    const [errorMessage, setErrorMessage] = useState(false);
    
    useEffect(() => {
        const getProducts = async () => {
            let {data: products, error} = await supabase
                .from('products')
                .select('*')
                .order('id', {ascending: true});
            setProducts(products);
        }
        getProducts();
    }, []);
    
    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <UserProfileSetup />
                {/* Hero unit */}
                <Box
                    sx={{
                        bgcolor: 'background.paper',
                        pt: 8,
                        pb: 6,
                    }}
                >
                    <Container maxWidth="sm">
                        <Typography
                            component="h1"
                            variant="h2"
                            align="center"
                            color="text.primary"
                            gutterBottom
                        >
                            Album layout
                        </Typography>
                        <Typography variant="h5" align="center" color="text.secondary" paragraph>
                            Something short and leading about the collection below—its contents,
                            the creator, etc. Make it short and sweet, but not too short so folks
                            don&apos;t simply skip over it entirely.
                        </Typography>
                    </Container>
                </Box>
                <Container sx={{ py: 8 }} maxWidth="lg">
                    {/* End hero unit */}
                    <Grid container spacing={4}>
                        {products.map((product) => (
                            <Grid item key={product.id} xs={12} sm={6} md={4}>
                                <Card
                                    sx={{ height: '100%', display: 'flex', flexDirection: 'column'}}
                                >
                                    <CardMedia
                                        component="img"
                                        image={product.image_url}
                                        alt="random"
                                    />
                                    <CardContent sx={{ flexGrow: 1 }}>
                                        <Box sx={{display: 'flex', flexDirection: 'row'}}>
                                            <Typography gutterBottom variant="h5" component="h2" sx={{mr: 1}}>
                                                {product.product_name}
                                            </Typography>
                                            {
                                                product.verified ?
                                                    <Tooltip title="Product is verified by content creator" arrow>
                                                        <VerifiedIcon fontSize='small' sx={{color: blue[700]}}/>
                                                    </Tooltip>
                                                    :
                                                    <></>
                                            }
                                        </Box>
                                        <Typography>
                                            Price: ${product.product_price}
                                        </Typography>
                                    </CardContent>
                                    <Box sx={{display:'flex',justifyContent:'flex-end'}}>
                                        <CardActions>
                                            <Button component={Link}
                                                    key={product.id}
                                                    to={userProfile === null ? `/profile/setup` : `/products/buy`}
                                                    size="small"
                                                    state={{product: product}}
                                             > View
                                            </Button>
                                        </CardActions>
                                    </Box>
                                </Card>
                            </Grid>
                        ))}
                    </Grid>
                </Container>
            {/* Footer */}
            <Box sx={{ bgcolor: 'background.paper', p: 6 }} component="footer">
                <Typography variant="h6" align="center" gutterBottom>
                    Footer
                </Typography>
                <Typography
                    variant="subtitle1"
                    align="center"
                    color="text.secondary"
                    component="p"
                >
                    Something here to give the footer a purpose!
                </Typography>
            </Box>
            {/* End footer */}
        </ThemeProvider>
    );
}