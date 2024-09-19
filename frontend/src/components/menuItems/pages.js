// assets
import { IconKey } from '@tabler/icons';

// constant
const icons = {
    IconKey
};

const pages = {
    id: 'pages',
    type: 'group',
    children: [
        {
            id: 'authentication',
            title: 'Authentication',
            type: 'collapse',
            icon: icons.IconKey,

            children: [
                {
                    id: 'login',
                    title: 'Login',
                    type: 'item',
                    url: 'login',
                }
            ]
        }
    ]
};

export default pages;
