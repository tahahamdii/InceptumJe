import { IconUsers } from '@tabler/icons';

const icons = {
    IconUsers,
};

const servicesRH = {
    id: 'services',
    type: 'group',
    children: [
        {
            id: 'members',
            title: 'Membres',
            type: 'item',
            url: 'members',
            icon: icons.IconUsers,
            breadcrumbs: true
        },
    ]
};

export default servicesRH;
