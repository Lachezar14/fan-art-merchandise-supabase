import Box from "@mui/material/Box";
import {useLocation, Link, useNavigate} from "react-router-dom";
import Button from "@mui/material/Button";
import {ThemeProvider} from "@mui/material/styles";
import {theme} from "../theme";
import Typography from "@mui/material/Typography";
import { PayPalButtons } from "@paypal/react-paypal-js";
import {useEffect, useState} from "react";
import {useAuth} from "../contexts/AuthContext";
import {supabase} from "../supabaseClient";
import UserProfileSetup from "../components/UserProfileSetup";

export default function HomePage() {

    let navigate = useNavigate();
    const { user } = useAuth();
    const {state} = useLocation();
    const product = state;
    
    const [success, setSuccess] = useState(false);
    const [ErrorMessage, setErrorMessage] = useState("");
    const [orderID, setOrderID] = useState(false);

    const createOrder = (data, actions) => {
        return actions.order
            .create({
                purchase_units: [
                    {
                        description: product.product.product_name,
                        amount: {
                            currency_code: "USD",
                            value: product.product.product_price,
                        },
                    },
                ],
            })
            .then((orderID) => {
                setOrderID(orderID);
                return orderID;
            });
    };

    const onApprove = async (data, actions) => {
        return await actions.order.capture().then(async function (details) {
            console.log(details);
            const {payer} = details;
            const {data, error} = await supabase
                .from('orders')
                .insert([
                    {placed_at: new Date(), order_id: orderID, user_id: user.id, product_id: product.product.id},
                ])
            navigate('/products/buy/checkout');
        });
    };

    //capture likely error
    const onError = (data, actions) => {
        alert("Error");
        setErrorMessage("An Error occured with your payment ");
    };
    
    return (
        <ThemeProvider theme={theme}>
            <Box sx={{ display: 'flex', flexDirection:'column', justifyContent: 'center', alignItems: 'center', height: '40vh',mt:10 }}>
                <Typography variant="h5" component='h1'>
                    {product.product.product_name}
                </Typography>
                <Typography variant="h6" component='h2'>
                    ${product.product.product_price}
                </Typography>
                <Box
                    component="img"
                    sx={{
                        height: 233,
                        width: 350,
                        maxHeight: { xs: 233, md: 167 },
                        maxWidth: { xs: 350, md: 250 },
                        mb: 5,
                        mt: 2
                    }}
                    src={product.product.image_url}
                />
                <Button component={Link}
                    to={"/products/buy/checkout"}
                    state={{product: product.product}}    
                    variant="contained" 
                    size="large"
                    sx={{ width: '100%', maxWidth: 250, mb: 2 }}
                >
                    Buy
                </Button>
            </Box>
            <Box sx={{display:'flex', justifyContent:'center'}}>
                <PayPalButtons
                    style={{ layout: "vertical" }}
                    createOrder={createOrder}
                    onApprove={onApprove}
                    onError={onError}
                />
            </Box>
        </ThemeProvider>
    )
}