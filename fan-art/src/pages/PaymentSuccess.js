import { createStyles, Title, Text, Button, Container, Group } from '@mantine/core';
import {Link} from "react-router-dom";

const useStyles = createStyles((theme) => ({
    root: {
        paddingTop: 80,
        paddingBottom: 80,
    },

    label: {
        textAlign: 'center',
        fontWeight: 900,
        fontSize: 220,
        lineHeight: 1,
        marginBottom: theme.spacing.xl * 1.5,
        color: theme.colorScheme === 'dark' ? theme.colors.dark[4] : theme.colors.gray[2],

        [theme.fn.smallerThan('sm')]: {
            fontSize: 120,
        },
    },

    title: {
        fontFamily: `Greycliff CF, ${theme.fontFamily}`,
        textAlign: 'center',
        fontWeight: 900,
        fontSize: 38,

        [theme.fn.smallerThan('sm')]: {
            fontSize: 32,
        },
    },

    description: {
        maxWidth: 500,
        margin: 'auto',
        marginTop: theme.spacing.xl,
        marginBottom: theme.spacing.xl * 1.5,
    },
}));

export function PaymentSuccess() {
    const { classes } = useStyles();

    return (
        <Container className={classes.root}>
            <Title className={classes.title}>Your order has been placed!</Title>
            <Text color="dimmed" size="lg" align="center" className={classes.description}>
                We have sent you an email with the order details. You can also check your order in your account.
            </Text>
            <Group position="center">
                <Button component={Link} 
                        to={"/profile"} 
                        variant="subtle" 
                        size="md">
                    Take me back to my account
                </Button>
            </Group>
        </Container>
    );
}