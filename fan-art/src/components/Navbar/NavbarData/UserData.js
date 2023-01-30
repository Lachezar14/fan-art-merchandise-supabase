import {
    IconBoxMultiple,
    IconDiscountCheck,
    IconHome2,
    IconSettings,
    IconShoppingBag,
    IconUpload,
    IconUserCheck
} from "@tabler/icons";

const data = [
    {icon: IconHome2, label: 'Home', href: '/profile'},
    {icon: IconBoxMultiple, label: 'My Products', href: '/profile/myProducts'},
    {icon: IconShoppingBag, label: 'Purchases', href: '/profile/purchases'},
    {icon: IconUpload, label: 'Upload', href: '/profile/upload'},
    {icon: IconDiscountCheck, label: 'Verification', href: '/profile/verification'},
    {icon: IconUserCheck, label: 'Setup', href: '/profile/setup'},
    {icon: IconSettings, label: 'Settings', href: '/profile/settings'},
];

export default {
    data
}