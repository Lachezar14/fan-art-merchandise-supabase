import {useToggle, upperFirst} from '@mantine/hooks';
import {useForm} from '@mantine/form';
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
    Stack, Container, Flex,
} from '@mantine/core';
import {GoogleButton} from '../components/Button/GoogleButton';
import {supabase} from "../supabaseClient";
import {useNavigate} from "react-router-dom";

export function SignIn() {

    let navigate = useNavigate();
    const form = useForm({
        initialValues: {
            email: '',
            password: '',
        },

        validate: {
            email: (val) => (/^\S+@\S+$/.test(val) ? null : 'Invalid email'),
            password: (val) => (val.length <= 6 ? 'Password should include at least 6 characters' : null),
        },
    });

    const handleGoogleSignIn = async () => {
        const {data, error} = await supabase.auth.signInWithOAuth({
            provider: 'google',
            options: {
                redirectTo: 'http://localhost:3000/profile',
            },
        })
    };

    return (
        <Container size="xs" mt={100}>
            <Paper radius="md" p="md" withBorder>
                <Text size="lg" weight={500}>
                    Welcome to Mantine, login with
                </Text>

                <Group grow mb="md" mt="md">
                    <GoogleButton radius="xl" onClick={() => handleGoogleSignIn()}>Google</GoogleButton>
                </Group>

                <Divider label="Or continue with email" labelPosition="center" my="lg"/>

                <form onSubmit={form.onSubmit(() => {})}>
                    <Stack>
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
                    </Stack>

                    <Group position="apart" mt="lg">
                        <Checkbox label="Remember me" sx={{lineHeight: 1}}/>
                        <Anchor onClick={(event) => event.preventDefault()} href="#" size="sm">
                            Forgot password?
                        </Anchor>
                    </Group>

                    <Flex direction="column" mt={20}>
                        <Button type="submit" radius="xl">Login</Button>
                        <Text align="center" mt={10}>
                            Don&apos;t have an account?{' '}
                            <Anchor weight={700} onClick={() => navigate("/register")}>
                                Register
                            </Anchor>
                        </Text>
                    </Flex>
                </form>
            </Paper>
        </Container>
    );
}