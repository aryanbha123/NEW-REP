import React from 'react';
import Header from '../../../shared/Header';
import Drawer from '../../../shared/Drawer';
import { HomeOutlined, LockClock, TaskAlt, VolunteerActivism } from '@mui/icons-material';

const Layout = () => {
    const menuItems = [
        {
            label: 'Home',
            icon: <HomeOutlined />,
            link: "/member",
        },
        {
            label: "Tasks",
            icon: <TaskAlt />,
            link: "/member/tasks",

        }, {
            label: "Donation History",
            icon: <LockClock />,
            link: "/member/donations",

        }
    ]
    return (
        <>
            <Header />
            <Drawer menuItems={menuItems} />
        </>
    );
}

export default Layout;
