import './App.css'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SuperAdmin from './pages/SuperAdmin';
import LoginPage from './pages/Auth/LoginPage';
import CompanyLoginPage from './pages/Company/CompanyLoginPage';
import EmployeeLoginPage from './pages/Employee/EmployeeLoginPage';
import NotFound from './components/NotFound';
import Admin from './pages/Admin';
import EmployeePanel from './pages/Employee/EmployeePanel';

function App() {
  return (
    <>
      <Router>
        <main>
          <Routes>
            <Route exact path="/" element={<LoginPage />} />
            <Route exact path="/super-admin/*" element={<SuperAdmin />} />

            <Route exact path="/company/:id/login" element={<CompanyLoginPage />} />
            <Route exact path="/company/:id/*" element={<Admin />} />

            <Route exact path="/company/:companyId/employee/:employeeId/login" element={<EmployeeLoginPage />} />
            <Route exact path="/company/:companyId/employee/:employeeId/*" element={<EmployeePanel />} />

            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>

      </Router>
    </>
  )
}

export default App
