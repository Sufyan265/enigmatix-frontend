import React from 'react';
import Navbar from "../../components/Navbar"
import Login from './Login';

const LoginPage = () => {
    return (
        <>
            <Navbar />
            <div className="min-h-full flex justify-center items-center">
                <div className="bg-white p-4 rounded-lg max-w-lg w-full">
                    <Login />

                </div>
            </div>
        </>
    );
};

export default LoginPage;
