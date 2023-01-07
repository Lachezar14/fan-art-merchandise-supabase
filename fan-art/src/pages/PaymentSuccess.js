import {ThemeProvider} from "@mui/material/styles";
import {theme} from "../theme";
import CssBaseline from "@mui/material/CssBaseline";
import * as React from "react";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import Container from "@mui/material/Container";


export default function PaymentSuccess() {

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline/>
            <Container component="main" maxWidth="sm" sx={{mb: 4}}>
                <Paper variant="outlined" sx={{my: {xs: 3, md: 6}, p: {xs: 2, md: 3}}}>
                    <React.Fragment>
                        <Typography variant="h5" gutterBottom>
                            Thank you for your order.
                        </Typography>
                        <Typography variant="subtitle1">
                            Your order number is #2001539. We have emailed your order
                            confirmation, and will send you an update when your order has
                            shipped.
                        </Typography>
                    </React.Fragment>
                </Paper>
            </Container>
        </ThemeProvider>
    )
}