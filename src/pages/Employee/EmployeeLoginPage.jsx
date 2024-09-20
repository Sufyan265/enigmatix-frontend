import React from 'react';
import Navbar from "../../components/Navbar"
import Login from '../../components/Login';
import { useNavigate, useParams } from 'react-router-dom';

const EmployeeLoginPage = () => {
    const navigate = useNavigate();
    const { companyId, employeeId } = useParams();

    const onSubmit = async (data) => {
        navigate(`/company/${companyId}/employee/${employeeId}`);
        console.log(data);
        console.log("Logged in successfully");
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
