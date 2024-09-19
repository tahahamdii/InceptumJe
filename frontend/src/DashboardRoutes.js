import React from 'react'
import { useRoutes } from 'react-router-dom';
import { lazy } from 'react';
import MainLayout from './components/MainLayout/MainLayout';
import Loadable from './components/uiComponents/Loadable';

const Dashboard = Loadable(lazy(() => import('./views/dashboard/dashboard')));

function DashboardRoutes() {


    let element = useRoutes([
        {
            path: '/',
            element: <MainLayout />,
            children: [
                {
                    path: 'dashboard',
                    element: <Dashboard />
                },
                {
                    path: 'projects/intern',
                    element: <h3>Intern Projetcs</h3>
                },
                {
                    path: 'projects/extern',
                    element: <h3>Extern Projetcs</h3>
                },
                {
                    path: 'meetings',
                    element: <h3>Meetings</h3>
                },
            ]
        },
    ]);

    return element;
}

export default DashboardRoutes
