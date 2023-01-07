import Login from "./pages/Login";
import Layout from "./layouts/Layout";
import Profile from "./pages/Profile";
import HomePage from "./pages/HomePage";
import Products from "./pages/Product";
import Register from "./pages/Register";
import ProductBuyPage from './pages/ProductBuyPage';
import Checkout from "./pages/Checkout/Checkout";
import ProfileSetup from "./pages/ProfileSetup";
import PaymentSuccess from "./pages/PaymentSuccess";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import {AuthProvider} from "./contexts/AuthContext";
import {PayPalScriptProvider} from "@paypal/react-paypal-js";
import {UserProfileSetupProvider} from "./contexts/UserProfileSetupContext";

function App() {
    return (
        <div>
            <AuthProvider>
                <UserProfileSetupProvider>
                    <PayPalScriptProvider
                        options={{"client-id": process.env.REACT_APP_PAYPAL_CLIENT_ID}}>
                        <BrowserRouter>
                            <Routes>
                                <Route path="/" element={<Layout/>}>
                                    <Route index element={<HomePage/>}/>
                                    <Route path="login" element={<Login/>}/>
                                    <Route path="register" element={<Register/>}/>
                                    <Route path="/profile" element={<Profile/>}/>
                                    <Route path="/profile/setup" element={<ProfileSetup/>}/>
                                    <Route path="/products" element={<Products/>}/>
                                    <Route path="/products/buy" element={<ProductBuyPage/>}/>
                                    <Route path="/products/buy/success" element={<PaymentSuccess/>}/>
                                    <Route path="/products/buy/checkout" element={<Checkout/>}/>
                                </Route>
                            </Routes>
                        </BrowserRouter>
                    </PayPalScriptProvider>
                </UserProfileSetupProvider>
            </AuthProvider>
        </div>
);
}

export default App;
