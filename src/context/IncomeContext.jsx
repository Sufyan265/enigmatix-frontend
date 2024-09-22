import React, { createContext, useContext, useState } from 'react';
import { useSuperAdminContext } from './SuperAdminContext';

export const IncomeContext = createContext();

export const IncomeProvider = (props) => {
    const { host } = useSuperAdminContext();
    const [loading, setLoading] = useState(false);
    const [incomes, setIncomes] = useState([]);

    const [successMessage, setSuccessMessage] = useState('');

    // Create Company Employee Account Function
    const submitIncome = async (incomeData) => {
        try {
            setLoading(true);
            const response = await fetch(`${host}/api/incomes/submit`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem(`adminToken:${incomeData.companyId}`)}`
                },
                body: JSON.stringify(incomeData)
            });

            const data = await response.json();
            // console.log(data)
            if (!response.ok) {
                throw new Error(data.message)
            }

            setSuccessMessage('Income submitted successfully!');
            console.log("Income submitted successfully!")

            setTimeout(() => {
                setSuccessMessage('')
            }, 5000);

            setLoading(false)
        } catch (error) {
            setLoading(false);
            console.error(error)
        }
    };

    // Create Company Employee Account Function
    const allIncomes = async (companyId) => {
        try {
            setLoading(true);
            const response = await fetch(`${host}/api/incomes`, {
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
            setIncomes(data)
            // navigate("/company/:id")
            console.log('All Incomes fetched successfully!');
            setLoading(false)
        } catch (error) {
            setLoading(false);
            console.error(error)
        }
    };



    return (
        <IncomeContext.Provider value={{
            loading,

            submitIncome,
            successMessage,

            allIncomes,
            incomes,


        }}>
            {props.children}
        </IncomeContext.Provider>
    );
};

export const useIncomeContext = () => useContext(IncomeContext);