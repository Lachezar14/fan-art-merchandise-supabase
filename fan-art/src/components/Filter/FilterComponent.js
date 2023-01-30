import {useEffect, useState} from 'react';
import {
    createStyles,
    Navbar,
    Text,
    Code,
    RangeSlider,
    TextInput,
    Button,
    Center,
    Divider,
    ScrollArea, Container, MultiSelect, Collapse
} from '@mantine/core';
import {supabase} from "../../supabaseClient";


const useStyles = createStyles((theme, _params, getRef) => {
    const icon = getRef('icon');
    return {
        header: {
            paddingBottom: theme.spacing.md,
            marginBottom: theme.spacing.md * 1.5,
            borderBottom: `1px solid ${
                theme.colorScheme === 'dark' ? theme.colors.dark[4] : theme.colors.gray[2]
            }`,
        },

        footer: {
            paddingTop: theme.spacing.md,
            marginTop: theme.spacing.md,

        },

        link: {
            ...theme.fn.focusStyles(),
            display: 'flex',
            alignItems: 'center',
            textDecoration: 'none',
            fontSize: theme.fontSizes.sm,
            color: theme.colorScheme === 'dark' ? theme.colors.dark[1] : theme.colors.gray[7],
            padding: `${theme.spacing.xs}px ${theme.spacing.sm}px`,
            borderRadius: theme.radius.sm,
            fontWeight: 500,

            '&:hover': {
                backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[0],
                color: theme.colorScheme === 'dark' ? theme.white : theme.black,

                [`& .${icon}`]: {
                    color: theme.colorScheme === 'dark' ? theme.white : theme.black,
                },
            },
        },

        linkIcon: {
            ref: icon,
            color: theme.colorScheme === 'dark' ? theme.colors.dark[2] : theme.colors.gray[6],
            marginRight: theme.spacing.sm,
        },

        linkActive: {
            '&, &:hover': {
                backgroundColor: theme.fn.variant({variant: 'light', color: theme.primaryColor})
                    .background,
                color: theme.fn.variant({variant: 'light', color: theme.primaryColor}).color,
                [`& .${icon}`]: {
                    color: theme.fn.variant({variant: 'light', color: theme.primaryColor}).color,
                },
            },
        },

        label: {
            top: 0,
            height: 28,
            lineHeight: '28px',
            width: 34,
            padding: 0,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            fontWeight: 700,
            backgroundColor: 'transparent',
        },

        thumb: {
            backgroundColor: theme.colors[theme.primaryColor][6],
            height: 28,
            width: 34,
            border: 'none',
        },

        dragging: {
            transform: 'translate(-50%, -50%)',
        },
    };
});


export function FilterComponent({sendDataToParent}) {
    const {classes, cx} = useStyles();
    const [minPrice, setMinPrice] = useState('');
    const [maxPrice, setMaxPrice] = useState('');
    const [creatorTags, setCreatorTags] = useState([]);
    const [tag, setTag] = useState('');
    const [opened, setOpened] = useState(false);

    useEffect(() => {
        const getTags = async () => {
            let { data: creatorTags, error } = await supabase
                .from('creatorTags')
                .select('creator_name')
            setCreatorTags(creatorTags.map((tag) => tag.creator_name))
        }
        getTags();
    }, []);
    
    console.log(tag);

    const getProducts = async () => {
        let {data: products, error} = await supabase
            .from('products')
            .select('*')
            .order('id', {ascending: true});
        sendDataToParent(products);
        console.log(error);
    }
    
    const handlePriceFilter = async () => {
        let {data: filteredProducts, error} = await supabase
            .from('products')
            .select('*')
            .gte('product_price', minPrice)
            .lte('product_price', maxPrice)
            .order('id', {ascending: true});
        sendDataToParent(filteredProducts);
        console.log(error);
    };
    
    const handleCreatorTagFilter = async (tag) => {
        let {data: filteredProducts, error} = await supabase
            .from('products')
            .select('*')
            .in('creator_tag', tag)
            .order('id', {ascending: true});
        sendDataToParent(filteredProducts);
        console.log(error);
    };

    return (
        <Navbar height={850} width={{sm: 300}} p="md">
            <Navbar.Section grow>
                <Container>
                    <Text size="xl" weight={700} sx={{lineHeight: 1}}>
                        Filter by price
                    </Text>
                    <TextInput
                        placeholder="$10"
                        label="Price min:"
                        value={minPrice} onChange={(event) => setMinPrice(event.currentTarget.value)}
                    />
                    <TextInput
                        placeholder="$500"
                        label="Price max:"
                        value={maxPrice} onChange={(event) => setMaxPrice(event.currentTarget.value)}
                    />
                    <Center>
                        <Button compact w={200} mt={10}
                                onClick={() => { minPrice !== '' && maxPrice !== '' ? handlePriceFilter() : getProducts()}}>
                            Filter
                        </Button>
                    </Center>
                    <Divider mt={20} mb={20}/>
                </Container>
                <Container>
                    <Text size="xl" weight={700} mb={10} sx={{lineHeight: 1}}>
                        Filter by creator
                    </Text>
                    <MultiSelect
                        data={creatorTags}
                        value={tag} 
                        onChange={setTag}
                        placeholder="Pick all that you like"
                    />
                    <Center>
                        <Button compact w={200} mt={10}
                                onClick={() => {tag.length === 0 ? getProducts() : handleCreatorTagFilter(tag)}}>
                            Filter
                        </Button>
                    </Center>
                    <Divider mt={20} mb={20}/>
                </Container>
            </Navbar.Section>
        </Navbar>
    );
}