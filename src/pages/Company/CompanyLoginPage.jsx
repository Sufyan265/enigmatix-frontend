import React from 'react';
import Navbar from "../../components/Navbar"
import Login from '../../components/Login';
import { useNavigate, useParams } from 'react-router-dom';
import { useAdminContext } from '../../context/AdminContext';

const LoginPage = () => {
    // const navigate = useNavigate();

    const { loginAdmin } = useAdminContext();

    const onSubmit = async (data) => {
        // navigate(`/company/${id}`);
        console.log(data);
        await loginAdmin(data);
        console.log("Logged in successfully");
    };

    return (
        <>
            <Navbar brand="Company Admin" />
            <div className="min-h-full flex justify-center items-center">
                <div className="bg-white p-4 rounded-lg max-w-lg w-full">
                    <Login onSubmit={onSubmit} panelName="Company Admin" />

                </div>
            </div>
        </>
    );
};

export default LoginPage;
