import { IconFileCode, IconCalendarEvent } from '@tabler/icons';

const icons = {
    IconFileCode,
    IconCalendarEvent
};

const servicesSG = {
    id: 'services',
    type: 'group',
    children: [
        {
            id: 'projects',
            title: 'Projets',
            type: 'collapse',
            icon: icons.IconFileCode,

            children: [
                {
                    id: 'intern',
                    title: 'Projets Internes',
                    type: 'item',
                    url: 'projects/intern'
                },
                {
                    id: 'extern',
                    title: 'Projets Externes',
                    type: 'item',
                    url: 'projects/extern'
                }
            ]
        },
        {
            id: 'meetings',
            title: 'Meetings',
            type: 'item',
            url: 'meetings',
            icon: icons.IconCalendarEvent
        },
    ]
};

export default servicesSG;
