import React, { useEffect, useState } from 'react';
import LoginForm from './LoginForm';
import RegisterForm from './RegisterForm';
import { useLocation } from 'react-router-dom';

const Auth = () => {
    const query = new URLSearchParams(useLocation().search);
    const page = query.get("page");
    // page=signin
    const [haveAccount, setHaveAccount] = useState(page === "signin");

    useEffect(() => {
        setHaveAccount(page === "signin");
    }, [page]);

    const toggleAuth = () => {
        setHaveAccount((prev) => !prev);
    };

    return (
        <section className="flex justify-center items-center h-screen">
            {haveAccount ? (
                <LoginForm toggleAuth={toggleAuth} />
            ) : (
                <RegisterForm />
            )}
        </section>
    );
};

export default Auth;
