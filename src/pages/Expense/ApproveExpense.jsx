import React, { useState, useEffect } from 'react';

const ApproveExpense = () => {
    const [expenses, setExpenses] = useState([]);

    useEffect(() => {
        const fetchExpenses = async () => {
            const response = await fetch('/api/expense/pending');
            const data = await response.json();
            setExpenses(data);
        };

        fetchExpenses();
    }, []);

    const handleApprove = async (id) => {
        try {
            const response = await fetch(`/api/expense/${id}/approve`, {
                method: 'PUT',
            });
            if (response.ok) {
                alert('Expense approved');
                setExpenses(expenses.filter(expense => expense.id !== id));
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold mb-4">Approve Expenses</h1>
            <ul>
                {expenses.map(expense => (
                    <li key={expense.id} className="mb-4">
                        <span>Expense: {expense.amount}</span>
                        <button
                            onClick={() => handleApprove(expense.id)}
                            className="bg-green-500 text-white px-2 py-1 rounded ml-4"
                        >
                            Approve
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ApproveExpense;
