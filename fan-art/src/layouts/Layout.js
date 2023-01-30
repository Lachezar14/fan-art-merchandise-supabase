import React, {useState} from "react";
import {Outlet} from "react-router-dom";
import {HeaderNavbar} from "../components/Navbar/HeaderNavbar";
import {HeaderLoggedIn} from "../components/Navbar/HeaderNavbarLoggedIn";
import {useAuth} from "../contexts/AuthContext";
import {Footer} from "../components/Footer/Footer";
import Box from "@mui/material/Box";
import {ProfileNavbar} from "../components/Navbar/ProfileNavbar";
import {FooterLinks} from "../components/Footer/FooterBig";
import {AppShell} from "@mantine/core";
import data from "../components/Footer/FooterData";


const Layout = () => {

    const {user} = useAuth();
    const [footerLinks, setFooterLinks] = useState(data);
    
    return (
        <>
            {user ? <HeaderLoggedIn/> : <HeaderNavbar/>}
            <Outlet/>
            <Box sx={{alignSelf:'flex-end'}}>
                <FooterLinks data={footerLinks}/>
            </Box>
        </>
    )
};

export default Layout;