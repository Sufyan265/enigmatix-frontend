import { Navigate } from "react-router-dom";

export const SuperAdminProtecter = ({ children }) => {
    const superAdminToken = localStorage.getItem("superAdminToken");
    return superAdminToken ? children : <Navigate to="/" />;
};

// export const AdminProtecter = ({ children }) => {
//     const superAdminToken = localStorage.getItem(`adminToken:${companyId}`);
//     return superAdminToken ? children : <Navigate to={`/company/${companyId}/login`} />;
// };