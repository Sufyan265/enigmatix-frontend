import React, { useEffect } from 'react'
import NotFound from '../../components/NotFound'
import ViewAccounts from './ViewAccounts';
import CreateAccount from './CreateAccount';
import { Route, Routes } from 'react-router-dom';
import NavbarSuper from '../../components/NavbarSuper';
import { useSuperAdminContext } from '../../context/SuperAdminContext';
import SuperAdminReports from '../Reports/SuperAdminReports';

const SuperAdmin = () => {
  const { getAllCompanies, allCompaniesData, newCompanyData } = useSuperAdminContext();

  useEffect(() => {
    getAllCompanies();
  }, [newCompanyData]);

  return (
    <>
      <div className="flex min-h-screen bg-gray-100">
        <div className="flex flex-col w-full bg-gray-100">
          <NavbarSuper />

          <Routes>
            <Route path="/" element={<ViewAccounts heading="Create Company" createAccountPath="/super-admin/company/create" data={allCompaniesData} />} />
            <Route path="/company/create" element={<CreateAccount />} />

            <Route path="/report" element={<SuperAdminReports />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
      </div>
    </>
  )
}

export default SuperAdmin