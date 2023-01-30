import { useToggle, upperFirst } from '@mantine/hooks';
import { useForm } from '@mantine/form';
import {
    TextInput,
    PasswordInput,
    Text,
    Paper,
    Group,
    Button,
    Divider,
    Checkbox,
    Anchor,
    Stack, Container, Flex, SimpleGrid,
} from '@mantine/core';
import { GoogleButton } from '../components/Button/GoogleButton';
import {supabase} from "../supabaseClient";
import {useNavigate} from "react-router-dom";

export function Register() {

    let navigate = useNavigate();

    const form = useForm({
        initialValues: {
            firstName: '',
            lastName: '',
            phone: '',
            email: '',
            password: '',
            terms: false,
        },

        validate: {
            email: (val) => (/^\S+@\S+$/.test(val) ? null : 'Invalid email'),
            password: (val) => (val.length <= 6 ? 'Password should include at least 6 characters' : null),
            terms: (val) => (val ? null : 'You must agree to terms and conditions'),
        },
    });
    
    return (
        <Container size="xs" mt={100}>
            <Paper radius="md" p="md" withBorder>
                <Text size="lg" weight={500} mb={10}>
                    Welcome to Mantine, register with
                </Text>
                <form onSubmit={form.onSubmit(() => {})}>
                    <Stack>
                        <SimpleGrid cols={2} breakpoints={[{maxWidth: 'sm', cols: 1}]}>
                            <TextInput
                                id="firstName"
                                name="firstName"
                                label="First Name"
                                placeholder="Ben"
                                required
                                value={form.values.firstName}
                                onChange={(event) => form.setFieldValue('firstName', event.currentTarget.value)}
                            />
                            <TextInput
                                id="lastName"
                                name="lastName"
                                label="Family Name"
                                placeholder="Dover"
                                required
                                value={form.values.lastName}
                                onChange={(event) => form.setFieldValue('lastName', event.currentTarget.value)}
                            />
                        </SimpleGrid>

                        <TextInput
                            required
                            label="Phone Number"
                            placeholder="Phone Number"
                            value={form.values.phone}
                            onChange={(event) => form.setFieldValue('phone', event.currentTarget.value)}
                            error={form.errors.phone && 'Invalid phone number'}
                        />

                        <TextInput
                            required
                            label="Email"
                            placeholder="hello@mantine.dev"
                            value={form.values.email}
                            onChange={(event) => form.setFieldValue('email', event.currentTarget.value)}
                            error={form.errors.email && 'Invalid email'}
                        />

                        <PasswordInput
                            required
                            label="Password"
                            placeholder="Your password"
                            value={form.values.password}
                            onChange={(event) => form.setFieldValue('password', event.currentTarget.value)}
                            error={form.errors.password && 'Password should include at least 6 characters'}
                        />
                        
                        <Checkbox
                            label="I accept terms and conditions"
                            checked={form.values.terms}
                            onChange={(event) => form.setFieldValue('terms', event.currentTarget.checked)}
                        />
                    </Stack>

                    <Flex direction="column" mt={20}>
                        <Button type="submit" radius="xl">Register</Button>
                        <Text align="center" mt={10}>
                           Already have an account?{' '}
                            <Anchor weight={700} onClick={() => navigate("/login")}>
                                Login
                            </Anchor>
                        </Text>
                    </Flex>
                </form>
            </Paper>
        </Container>
    );
}