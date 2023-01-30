import * as React from "react";
import {Button, Container, Divider, Flex, Group, SimpleGrid, Text, TextInput} from "@mantine/core";
import {useForm} from "@mantine/form";
import ProductDropzone from "../components/Dropzone/DropzoneProductUpload";
import {useProfileSetup} from "../contexts/UserProfileSetupContext";


export function SettingsProfilePage() {
    
    const{ userProfile } = useProfileSetup();

    const form = useForm({
        initialValues: {
            firstName: userProfile.first_name,
            lastName: userProfile.last_name,
            phone: userProfile.phone_number,
        },
    });

    function handleReset() {
        form.reset();
    }

    return (
        <>
            <Flex m={70} direction="column">
                <Text fw={700} fz={35}>
                    Account Settings
                </Text>
                
                    <Text fw={400} fz={25} mt={50}>
                        Profile
                    </Text>
                <Flex mb={50}>
                    <Divider size="sm"/>
                <Text fw={270} fz={18} mb={10}>
                    Manage your account settings and update your profile information.
                </Text>
                <form onSubmit={form.onSubmit((values) => console.log(values))}>
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
                        mt={20}
                        required
                        label="Phone Number"
                        placeholder="Phone Number"
                        value={form.values.phone}
                        onChange={(event) => form.setFieldValue('phone', event.currentTarget.value)}
                        error={form.errors.phone && 'Invalid phone number'}
                    />
                    
                    <Group position="right" mt="md">
                        <Button variant="outline" onClick={() => handleReset()}>Reset</Button>
                        <Button type="submit">Save</Button>
                    </Group>
                </form>
                </Flex>
                <Flex>
                    <Divider size="sm"/>
                    <Text fw={270} fz={18} mb={10}>
                        Manage your account settings and update your profile information.
                    </Text>
                    <form onSubmit={form.onSubmit((values) => console.log(values))}>
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
                            mt={20}
                            required
                            label="Phone Number"
                            placeholder="Phone Number"
                            value={form.values.phone}
                            onChange={(event) => form.setFieldValue('phone', event.currentTarget.value)}
                            error={form.errors.phone && 'Invalid phone number'}
                        />

                        <Group position="right" mt="md">
                            <Button variant="outline" onClick={() => handleReset()}>Reset</Button>
                            <Button type="submit">Save</Button>
                        </Group>
                    </form>
                </Flex>

            </Flex>
        </>
    );
}