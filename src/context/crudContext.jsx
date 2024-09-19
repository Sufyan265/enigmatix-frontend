import React, { createContext, useContext, useState } from 'react';

export const CrudContext = createContext();

export const CrudProvider = (props) => {
    // const [accounts, setAccounts] = useState([]);
    const [loading, setLoading] = useState(false);

    // Create Account Function
    const createAccount = async (data) => {
        console.log("Create Account")

    };


    // Get All Accounts Function
    const getAccounts = async () => {
        console.log("Get All Accounts")

    };

    // Get Account By ID Function
    const getAccountById = async (accountId) => {
        console.log("Get Account By ID")

    };


    // Edit Account Function
    const editAccount = async (accountId, data) => {
        console.log("Edit Account Function")

    };


    // Delete Account Function (Delete from Firebase)
    const deleteAccount = async (accountId) => {
        console.log("Delete Account")

    };

    return (
        <CrudContext.Provider value={{
            createAccount,
            getAccounts,
            getAccountById,
            editAccount,
            deleteAccount,

            accounts,
            loading,
        }}>
            {props.children}
        </CrudContext.Provider>
    );
};

export const useCrudContext = () => useContext(CrudContext);