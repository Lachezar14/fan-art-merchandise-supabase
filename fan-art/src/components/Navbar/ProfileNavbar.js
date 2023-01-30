import {useState} from 'react';
import {Navbar, Center, Tooltip, UnstyledButton, createStyles, Stack, Avatar} from '@mantine/core';
import {
    TablerIcon,
    IconHome2,
    IconShoppingBag,
    IconDeviceDesktopAnalytics,
    IconPhotoPlus,
    IconUpload,
    IconUserCheck,
    IconSettings,
    IconLogout,
    IconBasket,
    IconDiscountCheck,
    IconBoxMultiple,
    IconCloudUpload,
} from '@tabler/icons';
import {MantineLogo} from '@mantine/ds';
import {useNavigate} from "react-router-dom";
import {supabase} from "../../supabaseClient";
import * as React from "react";
import {useAuth} from "../../contexts/AuthContext";
import {useProfileSetup} from "../../contexts/UserProfileSetupContext";

const useStyles = createStyles((theme) => ({
    link: {
        width: 50,
        height: 50,
        borderRadius: theme.radius.md,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: theme.white,
        opacity: 0.85,

        '&:hover': {
            opacity: 1,
            backgroundColor: theme.fn.lighten(
                theme.fn.variant({variant: 'filled', color: theme.primaryColor}).background,
                0.1
            ),
        },
    },

    active: {
        opacity: 1,
        '&, &:hover': {
            backgroundColor: theme.fn.lighten(
                theme.fn.variant({variant: 'filled', color: theme.primaryColor}).background,
                0.15
            ),
        },
    },
}));

function NavbarLink({icon: Icon, label, active, onClick}) {
    const {classes, cx} = useStyles();
    return (
        <Tooltip label={label} position="right" transitionDuration={0}>
            <UnstyledButton onClick={onClick} className={cx(classes.link, {[classes.active]: active})}>
                <Icon stroke={1.5}/>
            </UnstyledButton>
        </Tooltip>
    );
}

const mockdata = [
    {icon: IconHome2, label: 'Home', href: '/profile'},
    {icon: IconBoxMultiple, label: 'My Products', href: '/profile/myProducts'},
    {icon: IconShoppingBag, label: 'Purchases', href: '/profile/purchases'},
    {icon: IconUpload, label: 'Upload', href: '/profile/upload'},
    {icon: IconDiscountCheck, label: 'Verification', href: '/profile/verification'},
    {icon: IconUserCheck, label: 'Setup', href: '/profile/setup'},
    {icon: IconSettings, label: 'Settings'},
];


export function ProfileNavbar() {

    const {user} = useAuth();
    const {userProfile} = useProfileSetup();
    const [active, setActive] = useState(0);
    let navigate = useNavigate();

    function handleClick(link, index) {
        setActive(index);
        if (link.href) {
            navigate(link.href);
        }
    }

    const handleLogout = async () => {
        await supabase.auth.signOut().then(() => {
            navigate('/');
        });
    };

    const links = mockdata.map((link, index) => (
        <NavbarLink
            {...link}
            key={link.label}
            active={index === active}
            onClick={() => handleClick(link, index)}
        />
    ));

    return (
        <Navbar width={{base: 80}} p="md"
                sx={(theme) => ({
                    backgroundColor: theme.fn.variant({variant: 'filled', color: theme.primaryColor})
                        .background,
                })}
        >
            <Center>
                <UnstyledButton onClick={() => navigate("/")}>
                    <MantineLogo type="mark" inverted size={30}/>
                </UnstyledButton>
            </Center>
            <Navbar.Section grow mt={50}>
                <Stack justify="center" spacing={0}>
                    {links}
                </Stack>
            </Navbar.Section>
            <Navbar.Section>
                <Stack justify="center" spacing={0}>
                    <Center>
                        <Tooltip
                            label="Settings"
                            position="right-start"
                            offset={15}
                        >
                            <UnstyledButton onClick={() => navigate()}>
                                <Avatar alt={user.user_metadata.full_name} src={user.user_metadata.avatar_url}
                                        radius="xl" mb={10} size={30}/>
                            </UnstyledButton>
                        </Tooltip>
                    </Center>
                    <NavbarLink icon={IconLogout} label="Logout" onClick={() => handleLogout()}/>
                </Stack>
            </Navbar.Section>
        </Navbar>
    );
}