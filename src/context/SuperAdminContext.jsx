import React, { createContext, useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export const SuperAdminContext = createContext();

export const SuperAdminProvider = (props) => {
  // const [accounts, setAccounts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [newCompanyData, setNewCompanyData] = useState([]);
  const [allCompaniesData, setAllCompaniesData] = useState([]);

  const host = "http://localhost:5000";

  const navigate = useNavigate();

  // Login Super Admin Account Function
  const loginSuperAdmin = async (account) => {
    try {
      setLoading(true);
      const response = await fetch(`${host}/api/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(account)
      });

      if (!response.ok) {
        throw new Error("Invalid Credentials")
      }

      const data = await response.json();
      // console.log(data.token)
      if (data.token) {
        localStorage.setItem("superAdminToken", data.token)
        navigate("/super-admin")
        console.log("Logged in Super Admin successfully");
        return data;
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
  const createCompanyAdmin = async (accountDetails) => {
    try {
      setLoading(true);
      const response = await fetch(`${host}/api/companies`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem("superAdminToken")}`
        },
        body: JSON.stringify(accountDetails)
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message)
      }

      console.log(data)
      setNewCompanyData(data)
      navigate("/super-admin")
      console.log("Company Created Succesfuly")
      setLoading(false)
    } catch (error) {
      setLoading(false);
      console.error(error)
      throw error
    }
  };

  // Create Company Admin Account Function
  const getAllCompanies = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${host}/api/auth/allCompanies`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem("superAdminToken")}`
        }
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message)
      }

      console.log(data)
      setAllCompaniesData(data)
      // navigate("/super-admin")
      console.log("Fetch all Companies Succesfuly")
      setLoading(false)
    } catch (error) {
      setLoading(false);
      console.error(error)
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
    <SuperAdminContext.Provider value={{
      // createAccount,
      // getAccounts,
      // getAccountById,
      // editAccount,
      // deleteAccount,

      host,

      loading,
      loginSuperAdmin,

      createCompanyAdmin,
      newCompanyData,
      setNewCompanyData,

      getAllCompanies,
      allCompaniesData,
      setAllCompaniesData,

    }}>
      {props.children}
    </SuperAdminContext.Provider>
  );
};

export const useSuperAdminContext = () => useContext(SuperAdminContext);