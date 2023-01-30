import {useEffect, useState} from "react";
import {supabase} from "../supabaseClient";
import {useAuth} from "../contexts/AuthContext";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import {Badge, Button, Card, createStyles, Divider, Flex, Group, Image, Text} from "@mantine/core";
import VerifiedIcon from "@mui/icons-material/Verified";
import {blue} from "@mui/material/colors";
import {Link} from "react-router-dom";
import * as React from "react";
import {ProductDisplay} from "../components/Products/ProductDisplay";

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

export function MyProducts() {

    const {classes} = useStyles();
    const {user} = useAuth();
    const [products, setProducts] = useState([]);

    useEffect(() => {
        const getProducts = async () => {
            let {data: products, error} = await supabase
                .from('products')
                .select('*')
                .eq('user_id', user.id)
                .order('id', {ascending: true});
            setProducts(products);
        }
        getProducts();
    }, []);

    return (
        <>
            <Flex m={70} direction="column">
            <Text fw={700} fz={35}>
                My Products
            </Text>
            <Divider size="sm"/>
            </Flex>
            <Container sx={{py: 8}} maxWidth="md">
                <Grid container spacing={4}>
                    <ProductDisplay products={products}/>
                </Grid>
            </Container>
        </>
    );
}