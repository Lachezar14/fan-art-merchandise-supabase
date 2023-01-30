import Login from "./pages/Login";
import Layout from "./layouts/Layout";
import ProductUpload from "./pages/ProductUpload";
import {HomePage} from "./pages/HomePage";
import {SignIn} from "./pages/SignIn";
import {ProfileHomePage} from "./pages/ProfileHome";
import Products from "./pages/Product";
import {Register} from "./pages/Register";
import {MyProducts} from "./pages/MyProducts";
import {ContactUs} from "./pages/ContactUs";
import ProductBuyPage from './pages/ProductBuyPage';
import Checkout from "./pages/Checkout/Checkout";
import ProfileSetup from "./pages/ProfileSetup";
import {PaymentSuccess} from "./pages/PaymentSuccess";
import VerificationRequest from "./pages/VerificationRequest";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import {PayPalScriptProvider} from "@paypal/react-paypal-js";
import {useProfileSetup} from "./contexts/UserProfileSetupContext";
import {useEffect, useState} from "react";
import AdminProfile from "./pages/AdminProfile";
import ProfilePage from "./wrappers/ProfilePageWrapper";
import ProfileLayout from "./layouts/ProfilesLayout";
import {ProductPurchases} from "./pages/ProductPurchases";
import {SettingsProfilePage} from "./pages/SettingsProfilePage";


function App() {
    
    const { userProfile } = useProfileSetup();
    console.log(userProfile);
    
    return (
        <div>
                        <BrowserRouter>
                            <Routes>
                                <Route path="/" element={<Layout/>}>
                                    <Route index element={<HomePage/>}/>
                                    <Route path="login" element={<SignIn/>}/>
                                    <Route path="register" element={<Register/>}/>
                                    <Route path="contactUs" element={<ContactUs/>}/>
                                    <Route path="/products" element={<Products/>}/>
                                    <Route path="/products/buy" element={<ProductBuyPage/>}/>
                                    <Route path="/products/buy/success" element={<PaymentSuccess/>}/>
                                    <Route path="/products/buy/checkout" element={<Checkout/>}/>
                                </Route>
                                <Route path="/profile" element={<ProfileLayout />}>
                                    <Route index element={userProfile?.role === "ADMIN" ? <AdminProfile/> : <ProfileHomePage/>}/>
                                    <Route path="upload" element={<ProductUpload/>}/>
                                    <Route path="setup" element={<ProfileSetup/>}/>
                                    <Route path="verification" element={<VerificationRequest/>} />
                                    <Route path="myProducts" element={<MyProducts/>}/>
                                    <Route path="purchases" element={<ProductPurchases/>}/>
                                    <Route path="settings" element={<SettingsProfilePage/>}/>
                                </Route>
                            </Routes>
                        </BrowserRouter>
        </div>
);
}

export default App;
