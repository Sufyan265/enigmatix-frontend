import React, { useEffect } from 'react';
import Navbar from "../../components/Navbar";
import Login from '../../components/Login';
import { useSuperAdminContext } from '../../context/SuperAdminContext';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
    const { loginSuperAdmin } = useSuperAdminContext();
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem("superAdminToken");
        if (token) {
            navigate("/super-admin");
        }
    }, []);

    const onSubmit = async (data, setError) => {
        try {
            await loginSuperAdmin(data);
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