import React from 'react';
import Header from '../../../shared/Header';
import Drawer from '../../../shared/Drawer';
import { Assessment, EventBusyOutlined, HomeOutlined, LockClock, ReportOffSharp, TaskAlt, VolunteerActivism } from '@mui/icons-material';

const Layout = ({ children }) => {
    const menuItems = [
        {
            label: 'Home',
            icon: <HomeOutlined />,
            link: "/admin",
        },
        {
            label: "Tasks",
            icon: <TaskAlt />,
            link: "/admin/tasks",

        }, {
            label: "Donations",
            icon: <LockClock />,
            link: "/admin/donations",

        }, {
            label: "Reports",
            icon: <Assessment />,
            link: "/admin/reports"
        }, {
            label: "Events",
            icon: <EventBusyOutlined />,
            link: "/admin/events"
        }
    ]
    return (
        <>
            <Header />
            <Drawer menuItems={menuItems} />
            <main className='p-5 ml-[65px] mt-[80px]'>
                {children}
            </main>
        </>
    );
}

export default Layout;
