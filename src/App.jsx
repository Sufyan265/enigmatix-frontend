import './App.css';
import { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useNavigate } from "react-router-dom";
import SuperAdmin from './pages/Super-Admin/SuperAdmin';
import LoginPage from './pages/Auth/LoginPage';
import CompanyLoginPage from './pages/Company/CompanyLoginPage';
import EmployeeLoginPage from './pages/Employee/EmployeeLoginPage';
import NotFound from './components/NotFound';
import Admin from './pages/Company/Admin';
import EmployeePanel from './pages/Employee/EmployeePanel';
import { SuperAdminProvider, useSuperAdminContext } from './context/SuperAdminContext';
import { AdminProvider } from './context/AdminContext';
import { EmployeeProvider } from './context/EmployeeContext';
import {  SuperAdminProtecter } from './routes/ProtectedRoute';

function AppWrapper() {
  const { companyId } = useSuperAdminContext();

  return (
    <main>
      <Routes>
        <Route exact path="/" element={<LoginPage />} />
        <Route exact path="/super-admin/*" element={<SuperAdminProtecter><SuperAdmin /></SuperAdminProtecter>} />

        <Route exact path="/company/login" element={<CompanyLoginPage />} />
        <Route exact path="/company/:id/*" element={<Admin />} />

        <Route exact path="/company/:companyId/employee/login" element={<EmployeeLoginPage />} />
        <Route exact path="/company/:companyId/employee/:employeeId/*" element={<EmployeePanel />} />

        <Route path="*" element={<NotFound />} />
      </Routes>
    </main>
  );
}

function App() {
  return (
    <Router>
      <SuperAdminProvider>
        <AdminProvider>
          <EmployeeProvider>
            <AppWrapper />
          </EmployeeProvider>
        </AdminProvider>
      </SuperAdminProvider>
    </Router>
  );
}


export default App;