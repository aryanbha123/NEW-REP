import React from 'react';
import { Link } from 'react-router-dom';
import CustomButton from '../../utilities/CustomButton';

const Header = () => {
    return (
        <>
            <header>
                <nav className='h-[80px] justify-between shadow-md px-5 flex items-center' >
                    <img className='h-14 rounded-md' src="/Screenshot 2025-02-01 113753.png" alt="" />
                    <div className="flex gap-3 ">
                        <Link to={"/auth?page=signin"} >
                            <CustomButton Label={"Login"} />
                        </Link>
                        <Link to={"/auth?page=signup"} >
                            <CustomButton Label={"Signup"} />
                        </Link>
                    </div>
                </nav>

            </header>

        </>
    );
}

export default Header;
