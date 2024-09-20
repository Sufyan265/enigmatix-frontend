import React from 'react';
import Navbar from "../../components/Navbar"
import Login from '../../components/Login';
import { useEmployeeContext } from '../../context/EmployeeContext';

const EmployeeLoginPage = () => {
    const { loginEmployee } = useEmployeeContext();
    
    const onSubmit = async (data, setError) => {
        try {
            console.log('superAdminData')
            await loginEmployee(data);
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
            <Navbar brand="Company Employee" />
            <div className="min-h-full flex justify-center items-center">
                <div className="bg-white p-4 rounded-lg max-w-lg w-full">
                    <Login onSubmit={onSubmit} panelName="Company Employee" />

                </div>
            </div>
        </>
    );
};

export default EmployeeLoginPage;
