import Grid from "@mui/material/Grid";
import {AspectRatio, Badge, Button, Card, createStyles, Flex, Group, Image, Text} from "@mantine/core";
import VerifiedIcon from "@mui/icons-material/Verified";
import {blue} from "@mui/material/colors";
import {Link} from "react-router-dom";
import {supabase} from "../../supabaseClient";
import {useEffect, useState} from "react";

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

export function ProductDisplay({products}) {

    const {classes} = useStyles();

    return (
        <>
            {products.map((product) => (
                <Grid item key={product.id} xs={12} sm={6} md={4}>
                    <Card withBorder radius="md" className={classes.card}>
                        <Card.Section className={classes.imageSection}>
                            <Image src={product.image_url} alt={product.product_name}/>
                        </Card.Section>


                        <Group position="apart" mt="md" mb="md">
                            <Flex>
                                <div>
                                    <Text weight={500}>{product.product_name}</Text>
                                </div>
                                {product.verified ? <VerifiedIcon sx={{color: blue[500], fontSize: "medium"}}/> : null}
                            </Flex>
                            <Badge variant="outline">{product.creator_tag}</Badge>
                        </Group>

                        <Card.Section className={classes.section}>
                            <Group spacing={30}>
                                <div>
                                    <Text size="xl" weight={700} sx={{lineHeight: 1}}>
                                        ${product.product_price}
                                    </Text>
                                </div>

                                <Button component={Link}
                                        to={`/products/buy`}
                                        state={{product: product}}
                                        radius="xl"
                                        style={{flex: 1}}>
                                    Buy
                                </Button>
                            </Group>
                        </Card.Section>
                    </Card>
                </Grid>
            ))
            }
        </>
    );
}