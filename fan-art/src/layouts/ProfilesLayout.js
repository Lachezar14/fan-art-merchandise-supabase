import React, {useEffect, useState} from "react";
import {Outlet} from "react-router-dom";
import {ProfileNavbar} from "../components/Navbar/ProfileNavbar";
import Box from "@mui/material/Box";
import {Footer} from "../components/Footer/Footer";
import {FooterLinks} from "../components/Footer/FooterBig";
import data from "../components/Footer/FooterData";
import {AppShell, createStyles, Transition} from '@mantine/core';
import {ProfileNavbar2} from "../components/Navbar/ProfileNavbar2";
import userData from "../components/Navbar/NavbarData/UserData";
import adminData from "../components/Navbar/NavbarData/AdminData";
import {useProfileSetup} from "../contexts/UserProfileSetupContext";

const useStyles = createStyles((theme) => ({

}));

const ProfileLayout = () => {
    const [footerLinks, setFooterLinks] = useState(data);
    const [navbarLinks, setNavbarLinks] = useState(userData);
    const {classes} = useStyles();
    const {userProfile} = useProfileSetup();
    
    useEffect(() => {
        if (userProfile) {
            if (userProfile.role === 'ADMIN') {
                setNavbarLinks(adminData);
            } else {
                setNavbarLinks(userData);
            }
        }
    }, [userProfile]);

    return (
        <>
            <AppShell
                padding="md"
                navbar={<ProfileNavbar2 data={navbarLinks}/>}
                footer={<FooterLinks data={footerLinks}/>}
                styles={(theme) => ({
                    main: {backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.colors.white},
                })}>
                <Outlet/>
            </AppShell>
        </>
    );
};


export default ProfileLayout;

{/*    Changing the navbar on hover
const { hovered, ref } = useHover();  
<div ref={ref}> {hovered ? <ProfileNavbar2/> : <ProfileNavbar/>} </div>
*/}