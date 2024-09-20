import React from 'react';
import Navbar from "../../components/Navbar"
import Login from '../../components/Login';

const LoginPage = () => {

    const onSubmit = async (data) => {
        // navigate("/admin");
        console.log(data);
        console.log("Logged in successfully");
    };

    return (
        <>
            <Navbar brand="Company Super Admin" />
            <div className="min-h-full flex justify-center items-center">
                <div className="bg-white p-4 rounded-lg max-w-lg w-full">
                    <Login onSubmit={onSubmit} panelName="Super Admin" />

                </div>
            </div>
        </>
    );
};

export default LoginPage;
