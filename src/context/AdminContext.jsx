import React, { createContext, useContext, useState } from 'react';
import { Navigate, useNavigate, useParams } from 'react-router-dom';
import { useSuperAdminContext } from './SuperAdminContext';

export const AdminContext = createContext();

export const AdminProvider = (props) => {
    const { host } = useSuperAdminContext();
    // const [accounts, setAccounts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [newUserData, setNewUserData] = useState([]);
    const [allUsersData, setAllUsersData] = useState([]);

    const navigate = useNavigate();


    // Login Admin Account Function
    const loginAdmin = async (account) => {
        try {
            setLoading(true);
            const response = await fetch(`${host}/api/companies/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(account)
            });

            const data = await response.json();
            if (!response.ok) {
                throw new Error(data.message)
            }

            // console.log(data.token)
            if (data.token) {
                localStorage.setItem(`adminToken:${data.company._id}`, data.token)
                navigate(`/company/${data.company._id}`)
                console.log("Logged in Company Admin successfully");
            } else {
                throw new Error("Invalid Credentials")
            }
            setLoading(false)
        } catch (error) {
            setLoading(false);
            console.error(error)
            throw error
        }
    };


    // Create Company Admin Account Function
    const createUser = async (userDetails, companyId) => {
        try {
            setLoading(true);
            const response = await fetch(`${host}/api/users`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem(`adminToken:${companyId}`)}`
                },
                body: JSON.stringify({ ...userDetails, companyId: companyId })
            });

            const data = await response.json();
            if (!response.ok) {
                throw new Error(data.message)
            }

            console.log(data)
            setNewUserData(data)
            navigate(`/company/${companyId}`)
            console.log("Company Created Succesfuly")
            setLoading(false)
        } catch (error) {
            setLoading(false);
            console.error(error)
            throw error
        }
    };

    // Create Company Admin Account Function
    const getAllUsers = async (companyId) => {
        try {
            setLoading(true);
            const response = await fetch(`${host}/api/users`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem(`adminToken:${companyId}`)}`
                }
            });

            const data = await response.json();
            if (!response.ok) {
                throw new Error(data.message)
            }
            console.log(data)
            setAllUsersData(data)
            console.log("Fetch all Users Succesfuly")
            setLoading(false)
        } catch (error) {
            setLoading(false);
            console.error(error)
            if (error.message === "Not authorized, token failed") {
                return navigate("/company/login");
            }
            throw error;
        }
    };

    // Create Company Admin Account Function
    const deleteUser = async (userId, companyId) => {
        try {
            const response = await fetch(`${host}/api/companies/delete`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem(`adminToken:${companyId}`)}`,
                },
                body: JSON.stringify({ userId })
            });

            const data = await response.json();
            if (!response.ok) {
                throw new Error(data.message)
            }

            console.log(data)

            const updatedData = allUsersData.filter(item => item._id !== userId);

            setAllUsersData(updatedData)

            console.log("User Deleted Succesfuly")
        } catch (error) {
            console.error(error)
        }
    };

    return (
        <AdminContext.Provider value={{
            loading,
            loginAdmin,

            createUser,
            newUserData,

            getAllUsers,
            allUsersData,
            setNewUserData,

            deleteUser,


        }}>
            {props.children}
        </AdminContext.Provider>
    );
};

export const useAdminContext = () => useContext(AdminContext);