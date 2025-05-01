import React from 'react';
import Header from '../../../shared/Header';
import Drawer from '../../../shared/Drawer';
import { Beenhere, Feedback, HomeOutlined, Person, ShoppingBag, Summarize, VolunteerActivism } from '@mui/icons-material';

const Layout = ({ children }) => {
    const menuItems = [
        {
            label: 'Home',
            icon: <HomeOutlined />,
            link: "/user",
        },
        {
            label: "Events",
            icon: <VolunteerActivism />,
            link: "/user/events",

        }, {
            label: "Donations",
            icon: <Summarize />,
            link: "/user/donations",

        }, {
            label: "Reports",
            icon: <Beenhere />,
            link: "/user/reports",
        }
        , {
            label: "Products",
            icon: <ShoppingBag />,
            link: "/user/products",
        } , {
            label:"Feedback" ,
            icon:<Feedback/>,
            link:"/user/feedback"
        }

    ]
    return (
        <>
            <Header />
            <Drawer menuItems={menuItems} />
            <main className='mt-[80px] ml-[60px] p-5'>
                {children}
            </main>
        </>
    );
}

export default Layout;
