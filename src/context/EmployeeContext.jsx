import React, { createContext, useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSuperAdminContext } from './SuperAdminContext';

export const EmployeeContext = createContext();

export const EmployeeProvider = (props) => {
    const { host } = useSuperAdminContext();
    // const [accounts, setAccounts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [newUserData, setNewUserData] = useState([]);
    const [allUsersData, setAllUsersData] = useState([]);

    const navigate = useNavigate();

    // Login Employee Account Function
    const loginEmployee = async (account) => {
        try {
            setLoading(true);
            const response = await fetch(`${host}/api/users/login`, {
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
                localStorage.setItem(`employeeToken:${data.user._id}`, data.token)
                navigate(`/company/${data.user.company}/employee/${data.user._id}`)
                console.log("Logged in Company Employee successfully");
            } else {
                throw new Error("Invalid Credentials")
            }
            setLoading(false)
        } catch (error) {
            setLoading(false);
            console.error(error)
            throw error;
        }
    };


    // Create Company Employee Account Function
    const createUser = async (accountDetails) => {
        try {
            setLoading(true);
            const response = await fetch(`${host}/api/companies`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem("EmployeeToken")}`
                },
                body: JSON.stringify(accountDetails)
            });

            if (!response.ok) {
                throw new Error("Invalid Credentials")
            }

            const data = await response.json();
            console.log(data)
            setNewUserData(data)
            navigate("/company/:id")
            console.log("Company Created Succesfuly")
            setLoading(false)
        } catch (error) {
            setLoading(false);
            console.error(error)
        }
    };

    // Create Company Employee Account Function
    const getAllUsers = async () => {
        try {
            setLoading(true);
            const response = await fetch(`${host}/api/users`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem("EmployeeToken")}`
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
        }
    };

    return (
        <EmployeeContext.Provider value={{
            loading,
            loginEmployee,

            createUser,
            newUserData,

            getAllUsers,
            allUsersData,
            setNewUserData,


        }}>
            {props.children}
        </EmployeeContext.Provider>
    );
};

export const useEmployeeContext = () => useContext(EmployeeContext);