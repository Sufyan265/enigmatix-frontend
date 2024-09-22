import React, { useEffect, useState } from 'react'
import Sidebar from '../../components/Sidebar'
import NotFound from '../../components/NotFound';
import CreateEmployee from '../Company/CreateEmployee';
import { Navigate, Route, Routes, useParams } from 'react-router-dom';
import NavbarCompany from '../../components/NavbarCompany';
import { useAdminContext } from '../../context/AdminContext';
import ViewCompany from './ViewCompany';
import ApproveExpense from '../Expense/ApproveExpense';
import AddIncome from '../Income/AddIncome';

const Admin = () => {
    const { id } = useParams();
    const adminToken = localStorage.getItem(`adminToken:${id}`);

    if (!id || !adminToken) {
        return <Navigate to={`/company/login`} />;
    }


    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const { getAllUsers, setNewUserData, allUsersData } = useAdminContext();

    useEffect(() => {
        getAllUsers(id);
    }, [setNewUserData]);

    return (
        <>
            <div className="flex min-h-screen bg-gray-100">

                <Sidebar isOpen={isSidebarOpen} />
                <div className="flex flex-col w-full bg-gray-100">
                    <NavbarCompany />
                    <div className="md:hidden p-4 z-20 fixed">
                        <button onClick={() => setIsSidebarOpen(!isSidebarOpen)} className="text-3xl text-gray-700 font-bold">
                            ⟫
                        </button>
                    </div>

                    <Routes>
                        <Route path="/" element={<ViewCompany heading="Create Employee" createAccountPath={`/company/${id}/create`} getAccountPath={`/company/${id}/employee`} data={allUsersData} />} />
                        <Route path="/create" element={<CreateEmployee />} />

                        <Route path="/expense" element={<ApproveExpense />} />

                        <Route path="/income" element={<AddIncome />} />

                        <Route path="*" element={<NotFound />} />
                    </Routes>
                </div>
            </div>
        </>
    )
}

export default Admin