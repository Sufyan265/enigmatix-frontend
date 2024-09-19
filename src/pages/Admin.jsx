import React, { useState } from 'react'
import Sidebar from '../components/Sidebar'
import NotFound from '../components/NotFound'
import ViewAccounts from './Account/ViewAccounts';
import CreateEmployee from './Company/CreateEmployee';
import { Route, Routes, useParams } from 'react-router-dom';
import NavbarCompany from '../components/NavbarCompany';

const Admin = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const { id } = useParams();

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
                        <Route path="/" element={<ViewAccounts heading="Create Employee" createAccountPath={`/company/${id}/create`} />} />
                        <Route path="/create" element={<CreateEmployee />} />
                        <Route path="*" element={<NotFound />} />
                    </Routes>
                </div>
            </div>
        </>
    )
}

export default Admin