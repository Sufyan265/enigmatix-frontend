import React, { createContext, useContext, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
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
    const createUser = async (userDetails, id) => {
        try {
            setLoading(true);
            const response = await fetch(`${host}/api/users`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem("AdminToken")}`
                },
                body: JSON.stringify({ ...userDetails, companyId: id })
            });

            const data = await response.json();
            if (!response.ok) {
                throw new Error(data.message)
            }

            console.log(data)
            setNewUserData(data)
            navigate(`/company/${id}`)
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
            // console.log(data)
            setAllUsersData(data)
            console.log("Fetch all Users Succesfuly")
            setLoading(false)
        } catch (error) {
            setLoading(false);
            console.error(error)
            throw error
        }
    };



    // const createAccount = async (data) => {
    //   console.log("Create Account")

    // };


    // Get All Accounts Function
    // const getAccounts = async () => {
    //   console.log("Get All Accounts")

    // };

    // Get Account By ID Function
    // const getAccountById = async (accountId) => {
    //   console.log("Get Account By ID")

    // };


    // Edit Account Function
    // const editAccount = async (accountId, data) => {
    //   console.log("Edit Account Function")

    // };


    // Delete Account Function (Delete from Firebase)
    // const deleteAccount = async (accountId) => {
    //   console.log("Delete Account")

    // };

    return (
        <AdminContext.Provider value={{
            loading,
            loginAdmin,

            createUser,
            newUserData,

            getAllUsers,
            allUsersData,
            setNewUserData,


        }}>
            {props.children}
        </AdminContext.Provider>
    );
};

export const useAdminContext = () => useContext(AdminContext);