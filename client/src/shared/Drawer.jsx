import { ArrowRight, Beenhere, HomeOutlined, Person, ShortText, Summarize, VolunteerActivism } from '@mui/icons-material';
import { Avatar } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
const Drawer = ({menuItems}) => {
    const { user } = useSelector(s => s.auth)
    const [showMenu, setShowMenu] = useState(false);
    const location = useLocation();
    useEffect(() => {
        setShowMenu(false)
    }, [location.pathname])
  
    return (
        <>

            {/* <aside onMouseEnter={() => { setShowMenu(true) }} onMouseLeave={() => { setShowMenu(false) }} className={`z-50 h-screen w-[270px] left-0 fixed top-0 transition-all duration-200 ${!showMenu ? '-translate-x-[210px]' : 'translate-x-0'} border-r-[1px] border-gray-200 bg-white`}> */}
            <aside onMouseEnter={() => { setShowMenu(true) }} onMouseLeave={() => { setShowMenu(false) }} className={`z-40 h-[calc(100vh-70px)] top-[71px]   fixed transition-all duration-200 ${showMenu ? ' w-[270px]' : 'w-[70px] '} border-r-[1px] left-0 border-gray-200 bg-white`}>
                {/* <div className='flex justify-center  my-10 gap-5' > */}
                    {/* <span className="fixed right-6 top-5  ">
                        {
                            !showMenu ?
                                <ShortText /> : <><ArrowRight /></>
                        }
                    </span>
                    <div className='fkex flex-col items-center gap-5' >
                        {showMenu && <Avatar sx={{
                            width: 120,
                            height: 120,
                            mb: "10px"
                        }} />}
                        {
                            showMenu && <>
                                <p className='mt-3'>
                                    {user.name}
                                </p>
                                <p className="text-xs text-center">{user.email}</p>
                            </>
                        } */}
                    {/* </div> */}
                {/* </div> */}
                <ul>
                    {
                        menuItems.map((item, i) => (
                            <Link to={item.link} className={`flex gap-4 ${showMenu ? '' : 'justify-end'} py-4 cursor-pointer  hover:bg-gray-600 bg-gray-700 text-white mx-3 px-3 rounded-3xl my-4 ${showMenu ? '' : ''} `} key={i}>
                                <span className='text-end' >{item.icon}</span>
                                <span className={`text-nowrap ${showMenu ? '' : 'hidden '}`} >{item.label}</span>
                            </Link>
                        ))
                    }
                    <li></li>
                </ul>
            </aside>

        </>
    );
}

export default Drawer;
