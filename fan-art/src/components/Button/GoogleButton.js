import { Button, ButtonProps} from '@mantine/core';
import { GoogleIcon } from '../Icons/GoogleIcon';


export function GoogleButton(props) {
    return <Button leftIcon={<GoogleIcon />} variant="default" color="gray" {...props} />;
}
