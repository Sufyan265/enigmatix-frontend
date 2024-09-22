import React, { createContext, useContext, useState } from 'react';
import { useSuperAdminContext } from './SuperAdminContext';

export const ExpenseContext = createContext();

export const ExpenseProvider = (props) => {
    const { host } = useSuperAdminContext();
    const [loading, setLoading] = useState(false);
    const [aproveLoading, setAproveLoading] = useState(false);
    const [expenses, setExpenses] = useState([]);

    const [successMessage, setSuccessMessage] = useState('');

    // Create Company Employee Account Function
    const submitExpense = async (expenseData, employeeId) => {
        try {
            setLoading(true);
            const response = await fetch(`${host}/api/expenses/submit`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem(`employeeToken:${employeeId}`)}`
                },
                body: JSON.stringify(expenseData)
            });

            const data = await response.json();
            // console.log(data)
            if (!response.ok) {
                throw new Error(data.message)
            }

            setSuccessMessage('Expense submitted successfully!');
            console.log("Expense submitted successfully!")

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
    const allExpenses = async (companyId) => {
        try {
            setLoading(true);
            const response = await fetch(`${host}/api/expenses`, {
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
            setExpenses(data)
            // navigate("/company/:id")
            console.log('All Expenses fetched successfully!');
            setLoading(false)
        } catch (error) {
            setLoading(false);
            console.error(error)
        }
    };

    // Create Company Employee Account Function
    const aproveExpenses = async (companyId, expenseId) => {
        try {
            setAproveLoading(true);
            const response = await fetch(`${host}/api/expenses/${expenseId}/approve`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem(`adminToken:${companyId}`)}`
                }
            });

            const data = await response.json();
            console.log(data)
            if (!response.ok) {
                throw new Error(data.messge)
            }

            const updatedData = expenses.map(item => 
                item._id === data._id ? { ...item, isApproved: true } : item
              );

            setExpenses(updatedData)

            console.log('Expense Aproved successfully!');
            setAproveLoading(false)
        } catch (error) {
            setAproveLoading(false);
            console.error(error)
        }
    };


    return (
        <ExpenseContext.Provider value={{
            loading,

            submitExpense,
            successMessage,

            allExpenses,
            expenses,

            aproveExpenses,
            aproveLoading,


        }}>
            {props.children}
        </ExpenseContext.Provider>
    );
};

export const useExpenseContext = () => useContext(ExpenseContext);