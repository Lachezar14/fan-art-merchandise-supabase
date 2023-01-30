import * as React from 'react';
import {useState} from 'react';
import {createStyles, Group, Navbar, UnstyledButton} from '@mantine/core';
import {
    IconBoxMultiple,
    IconDiscountCheck,
    IconHome2,
    IconLogout,
    IconSettings,
    IconShoppingBag,
    IconUpload,
    IconUserCheck,
} from '@tabler/icons';
import {MantineLogo} from '@mantine/ds';
import {useNavigate} from "react-router-dom";
import {UserProfileButton} from "../Button/UserProfileButton";
import {useAuth} from "../../contexts/AuthContext";
import {supabase} from "../../supabaseClient";

const useStyles = createStyles((theme, _params, getRef) => {
    const icon = getRef('icon');
    return {
        navbar: {
            backgroundImage: `linear-gradient(-60deg, ${theme.colors[theme.primaryColor][9]} 0%, ${
                theme.colors[theme.primaryColor][5]
            } 100%)`,
        },

        version: {
            backgroundColor: theme.fn.lighten(
                theme.fn.variant({variant: 'filled', color: theme.primaryColor}).background,
                0.1
            ),
            color: theme.white,
            fontWeight: 700,
        },

        header: {
            paddingBottom: theme.spacing.md,
            marginBottom: theme.spacing.md * 1.5,
            borderBottom: `1px solid ${theme.fn.lighten(
                theme.fn.variant({variant: 'filled', color: theme.primaryColor}).background,
                0.1
            )}`,
        },

        footer: {
            paddingTop: theme.spacing.md,
            marginTop: theme.spacing.md,
            borderTop: `1px solid ${theme.fn.lighten(
                theme.fn.variant({variant: 'filled', color: theme.primaryColor}).background,
                0.1
            )}`,
        },

        link: {
            ...theme.fn.focusStyles(),
            display: 'flex',
            alignItems: 'center',
            textDecoration: 'none',
            fontSize: theme.fontSizes.sm,
            color: theme.white,
            padding: `${theme.spacing.xs}px ${theme.spacing.sm}px`,
            borderRadius: theme.radius.sm,
            fontWeight: 500,

            '&:hover': {
                backgroundColor: theme.fn.lighten(
                    theme.fn.variant({variant: 'filled', color: theme.primaryColor}).background,
                    0.1
                ),
            },
        },

        linkIcon: {
            ref: icon,
            color: theme.white,
            opacity: 0.75,
            marginRight: theme.spacing.sm,
        },

        linkActive: {
            '&, &:hover': {
                backgroundColor: theme.fn.lighten(
                    theme.fn.variant({variant: 'filled', color: theme.primaryColor}).background,
                    0.15
                ),
                [`& .${icon}`]: {
                    opacity: 0.9,
                },
            },
        },
    };
});

function NavbarLink({icon: Icon, label, active, onClick}) {
    const {classes, cx} = useStyles();
    return (
        <a onClick={onClick} className={cx(classes.link, {[classes.active]: active})}>
            <Icon className={classes.linkIcon} stroke={1.5}/>
            <span>{label}</span>
        </a>
    );
}

export function ProfileNavbar2({data}) {
    const {classes} = useStyles();
    const {user} = useAuth();
    let navigate = useNavigate();
    const [active, setActive] = useState(0);

    function handleClick(link, index) {
        setActive(index);
        if (link.href) {
            navigate(link.href);
        }
    }

    const links = data.data.map((link, index) => (
        <NavbarLink
            {...link}
            key={link.label}
            active={index === active}
            onClick={() => handleClick(link, index)}
        />
    ));

    const handleLogout = async () => {
        await supabase.auth.signOut().then(() => {
            navigate('/');
        });
    };

    return (
        <Navbar width={{sm: 300}} p="md" className={classes.navbar}>
            <Navbar.Section grow>
                <Group className={classes.header} position="apart">
                    <UnstyledButton onClick={() => navigate("/")}>
                        <MantineLogo inverted size={28}/>
                    </UnstyledButton>
                </Group>
                {links}
            </Navbar.Section>

            <a className={classes.link} onClick={() => handleLogout()}>
                <IconLogout className={classes.linkIcon} stroke={1.5}/>
                <span>Logout</span>
            </a>
            <Navbar.Section className={classes.footer}>
                <UserProfileButton user={user}/>
            </Navbar.Section>
        </Navbar>
    );
}