import * as React from 'react';
import {useEffect, useState} from 'react';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import {supabase} from "../supabaseClient";
import {useProfileSetup} from "../contexts/UserProfileSetupContext";
import UserProfileSetup from "../components/UserProfileSetup";
import {AppShell, Button, Collapse, createStyles, Text, Tooltip, UnstyledButton} from '@mantine/core';
import {FilterComponent} from "../components/Filter/FilterComponent";
import {ProductDisplay} from "../components/Products/ProductDisplay";
import {HeaderNavbar} from "../components/Navbar/HeaderNavbar";
import {IconAdjustmentsAlt} from "@tabler/icons";
import {Transition} from "@mantine/core";

const useStyles = createStyles((theme) => ({
    card: {
        backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.white,
    },

    imageSection: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        borderBottom: `1px solid ${
            theme.colorScheme === 'dark' ? theme.colors.dark[4] : theme.colors.gray[3]
        }`,
    },

    label: {
        marginBottom: theme.spacing.xs,
        lineHeight: 1,
        fontWeight: 700,
        fontSize: theme.fontSizes.xs,
        letterSpacing: -0.25,
        textTransform: 'uppercase',
    },

    section: {
        padding: theme.spacing.md,
        borderTop: `1px solid ${
            theme.colorScheme === 'dark' ? theme.colors.dark[4] : theme.colors.gray[3]
        }`,
    },

    icon: {
        marginRight: 5,
        color: theme.colorScheme === 'dark' ? theme.colors.dark[2] : theme.colors.gray[5],
    },
}));

export default function Album() {

    const {classes} = useStyles();
    const {userProfile} = useProfileSetup();
    const [products, setProducts] = useState([]);
    const [errorMessage, setErrorMessage] = useState(false);
    const [opened, setOpened] = useState(true);

    useEffect(() => {
        const getProducts = async () => {
            let {data: products, error} = await supabase
                .from('products')
                .select('*')
                .order('id', {ascending: true});
            setProducts(products);
        }
        getProducts();
    }, []);

    const sendDataToParent = (filteredProducts) => { // the callback. Use a better name
        setProducts(filteredProducts);

    };

    return (
        <>
            <UserProfileSetup/>
            <AppShell
                padding="xs"
                navbar={
                    <Collapse in={opened}>
                        {!opened ? null :
                            <FilterComponent sendDataToParent={sendDataToParent}/>}
                    </Collapse>}
                aside={
                    <Box sx={{mr: 3}}>
                        <Tooltip
                            label={!opened ? "Show filters" : "Hide filters"}
                            position="right-start"
                            offset={15}
                        >
                            <UnstyledButton onClick={() => setOpened(!opened)} fullWidth>
                                <IconAdjustmentsAlt size={24} className={classes.icon}/>
                            </UnstyledButton>
                        </Tooltip>
                    </Box>
                }
                styles={(theme) => ({
                    main: {backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.colors.white},
                })}>
                <Box
                    sx={{
                        bgcolor: 'background.paper',
                        pb: 6,
                    }}
                >
                    <Container maxWidth="sm">
                        <Typography
                            component="h1"
                            variant="h2"
                            align="center"
                            color="text.primary"
                            gutterBottom
                        >
                            Album layout
                        </Typography>
                        <Typography variant="h5" align="center" color="text.secondary" paragraph>
                            Something short and leading about the collection below—its contents,
                            the creator, etc. Make it short and sweet, but not too short so folks
                            don&apos;t simply skip over it entirely.
                        </Typography>
                    </Container>
                </Box>
                <Container sx={{py: 8}} maxWidth="lg">
                    <Grid container spacing={4}>
                        <ProductDisplay products={products}/>
                    </Grid>
                </Container>
            </AppShell>

        </>
    );
}