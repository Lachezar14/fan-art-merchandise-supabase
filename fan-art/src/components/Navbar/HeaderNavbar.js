import {
    createStyles,
    Menu,
    Center,
    Header,
    Container,
    Group,
    Button,
    Burger, UnstyledButton,
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { IconChevronDown } from '@tabler/icons';
import { MantineLogo } from '@mantine/ds';
import {Link, useNavigate} from "react-router-dom";
import * as React from "react";

const HEADER_HEIGHT = 80;

const useStyles = createStyles((theme) => ({
    inner: {
        height: HEADER_HEIGHT,
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
    },

    links: {
        [theme.fn.smallerThan('sm')]: {
            display: 'none',
        },
    },

    burger: {
        [theme.fn.largerThan('sm')]: {
            display: 'none',
        },
    },

    link: {
        display: 'block',
        lineHeight: 1,
        padding: '8px 12px',
        borderRadius: theme.radius.sm,
        textDecoration: 'none',
        color: theme.colorScheme === 'dark' ? theme.colors.dark[0] : theme.colors.gray[7],
        fontSize: theme.fontSizes.sm,
        fontWeight: 500,

        '&:hover': {
            backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[0],
        },
    },

    linkLabel: {
        marginRight: 5,
    },
}));

const links = [
    { label: 'Home', href: '/' },
    { label: 'Products', href: '/products' },
    { label: 'Contact Us', href: '/contactUs' }
]

export function HeaderNavbar() {
  
    let navigate = useNavigate();
    const { classes } = useStyles();
    const [opened, { toggle }] = useDisclosure(false);
    const items = links.map((link) => {
            return (
                <Menu key={link.label} trigger="hover" exitTransitionDuration={0}>
                    <Menu.Target>
                        <a
                            className={classes.link}
                            onClick={() => navigate(link.href)}
                        >
                            <Center>
                                <span className={classes.linkLabel}>{link.label}</span>
                            </Center>
                        </a>
                    </Menu.Target>
                </Menu>
            );
    });

    return (
        <Header height={HEADER_HEIGHT} sx={{ borderBottom: 0 }}>
            <Container className={classes.inner} fluid>
                <Group>
                    <Burger opened={opened} onClick={toggle} className={classes.burger} size="sm" />
                    <UnstyledButton onClick={() => navigate('/')}>
                        <MantineLogo size={28} />
                    </UnstyledButton>
                </Group>
                <Group spacing={5} className={classes.links}>
                    {items}
                </Group>
                <Button component={Link} 
                        to={"/login"} 
                        radius="xl" 
                        sx={{ height: 30 }}>
                    Login
                </Button>
            </Container>
        </Header>
    );
}