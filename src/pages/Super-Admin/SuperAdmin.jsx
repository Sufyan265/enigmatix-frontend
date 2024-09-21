import React, { useEffect } from 'react'
import NotFound from '../../components/NotFound'
import ViewAccounts from './ViewAccounts';
import CreateAccount from './CreateAccount';
import { Route, Routes } from 'react-router-dom';
import Navbar from '../../components/Navbar';
import { useSuperAdminContext } from '../../context/SuperAdminContext';

const SuperAdmin = () => {
  const { getAllCompanies, allCompaniesData, newCompanyData } = useSuperAdminContext();

  useEffect(() => {
    getAllCompanies();
  }, [newCompanyData]);

  return (
    <>
      <div className="flex min-h-screen bg-gray-100">
        <div className="flex flex-col w-full bg-gray-100">
          <Navbar brand="Company Super Admin" />

          <Routes>
            <Route path="/" element={<ViewAccounts heading="Create Company" createAccountPath="/super-admin/company/create" data={allCompaniesData} />} />
            <Route path="/company/create" element={<CreateAccount />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
      </div>
    </>
  )
}

export default SuperAdmin