import Login from "./pages/Login";
import Layout from "./layouts/Layout";
import Profile from "./pages/Profile";
import HomePage from "./pages/HomePage";
import Products from "./pages/Product";
import Register from "./pages/Register";
import ProductBuyPage from './pages/ProductBuyPage';
import Checkout from "./pages/Checkout/Checkout";
import Stripe from "./pages/Checkout/Stripe";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import {AuthProvider} from "./contexts/AuthContext";

function App() {

    return (
        <div>
            <AuthProvider>
                <BrowserRouter>
                    <Routes>
                        <Route path="/" element={<Layout/>}>
                            <Route index element={<HomePage/>}/>
                            <Route path="login" element={<Login/>}/>
                            <Route path="register" element={<Register/>}/>
                            <Route path="/profile" element={<Profile/>}/>
                            <Route path="/products" element={<Products/>}/>
                            <Route path="/products/buy" element={<ProductBuyPage/>}/>
                            <Route path="/products/buy/checkout" element={<Checkout/>}/>
                            <Route path="/products/buy/stripe" element={<Stripe/>}/>
                        </Route>
                    </Routes>
                </BrowserRouter>
            </AuthProvider>
        </div>
    );
}

export default App;
