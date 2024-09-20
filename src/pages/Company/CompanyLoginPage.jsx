import React from 'react';
import Navbar from "../../components/Navbar"
import Login from '../../components/Login';
import { useAdminContext } from '../../context/AdminContext';

const LoginPage = () => {

    const { loginAdmin } = useAdminContext();

    const onSubmit = async (data, setError) => {
        try {
            await loginAdmin(data);
        } catch (error) {
            console.error(error);
            if (error.message === 'Invalid Credentials') {
                setError('inValid', { type: 'manual', message: 'Invalid email or password' });
            } else {
                setError('inValid', { type: 'manual', message: error.message });
            }
        }
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
