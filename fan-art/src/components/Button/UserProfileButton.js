import {
    UnstyledButton,
    UnstyledButtonProps,
    Group,
    Avatar,
    Text,
    createStyles,
} from '@mantine/core';
import { IconChevronRight } from '@tabler/icons';
import {useNavigate} from "react-router-dom";

const useStyles = createStyles((theme) => ({
    user: {
        display: 'block',
        width: '100%',
        padding: theme.spacing.md,
        color: theme.colorScheme === 'dark' ? theme.colors.dark[0] : theme.white,

        '&:hover': {
            borderRadius: theme.radius.sm,
            backgroundColor: theme.fn.lighten(
                theme.fn.variant({variant: 'filled', color: theme.primaryColor}).background,
                0.1
            ),
        },
    },

    email: {
        color: theme.colorScheme === 'dark' ? theme.colors.dark[0] : theme.colors.gray[3],
    },
}));

export function UserProfileButton({user}) {
    const { classes } = useStyles();
    let navigate = useNavigate();

    return (
        <UnstyledButton className={classes.user} onClick={() => navigate("/profile/settings")}>
            <Group>
                <Avatar src={user.user_metadata.avatar_url} radius="xl" />

                <div style={{ flex: 1 }}>
                    <Text size="sm" weight={500}>
                        {user.user_metadata.full_name}
                    </Text>

                    <Text className={classes.email} size="xs">
                        {user.email}
                    </Text>
                </div>
                <IconChevronRight size={14} stroke={1.5} />
            </Group>
        </UnstyledButton>
    );
}