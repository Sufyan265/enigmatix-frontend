import './App.css'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SuperAdmin from './pages/Super-Admin/SuperAdmin';
import LoginPage from './pages/Auth/LoginPage';
import CompanyLoginPage from './pages/Company/CompanyLoginPage';
import EmployeeLoginPage from './pages/Employee/EmployeeLoginPage';
import NotFound from './components/NotFound';
import Admin from './pages/Company/Admin';
import EmployeePanel from './pages/Employee/EmployeePanel';
import { SuperAdminProvider } from './context/SuperAdminContext';
import { AdminProvider } from './context/AdminContext';
import { EmployeeProvider } from './context/EmployeeContext';

function App() {
  return (
    <>
      <Router>
        <SuperAdminProvider>
          <AdminProvider>
            <EmployeeProvider>
              <main>
                <Routes>
                  <Route exact path="/" element={<LoginPage />} />
                  <Route exact path="/super-admin/*" element={<SuperAdmin />} />

                  <Route exact path="/company/login" element={<CompanyLoginPage />} />
                  <Route exact path="/company/:id/*" element={<Admin />} />

                  <Route exact path="/company/:companyId/employee/login" element={<EmployeeLoginPage />} />
                  <Route exact path="/company/:companyId/employee/:employeeId/*" element={<EmployeePanel />} />

                  <Route path="*" element={<NotFound />} />
                </Routes>
              </main>

            </EmployeeProvider>
          </AdminProvider>
        </SuperAdminProvider>
      </Router>
    </>
  )
}

export default App
