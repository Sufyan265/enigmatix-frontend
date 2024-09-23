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
      // console.log(data)
      if (data.token) {
        localStorage.setItem("superAdminToken", data.token)
        navigate("/super-admin")
        console.log("Logged in Super Admin successfully");
        setLoading(false)
        return data;
      } else {
        setLoading(false)
        throw new Error("Invalid Credentials")
      }

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

  // Create Company Admin Account Function
  const deleteCompany = async (companyId) => {
    try {
      const response = await fetch(`${host}/api/auth/delete`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem("superAdminToken")}`
        },
        body: JSON.stringify({ companyId })
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message)
      }

      console.log(data)

      const updatedData = allCompaniesData.filter(item => item.company._id !== companyId);

      setAllCompaniesData(updatedData)

      console.log("Company Deleted Succesfuly")
    } catch (error) {
      console.error(error)
    }
  };

  return (
    <SuperAdminContext.Provider value={{
      host,

      loading,
      loginSuperAdmin,

      createCompanyAdmin,
      newCompanyData,
      setNewCompanyData,

      getAllCompanies,
      allCompaniesData,
      setAllCompaniesData,

      deleteCompany,

    }}>
      {props.children}
    </SuperAdminContext.Provider>
  );
};

export const useSuperAdminContext = () => useContext(SuperAdminContext);