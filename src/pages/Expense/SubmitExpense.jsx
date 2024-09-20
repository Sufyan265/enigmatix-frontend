import React, { useState } from 'react';

const SubmitExpense = () => {
    const [expenseAmount, setExpenseAmount] = useState('');

    const handleSubmitExpense = async () => {
        try {
            const response = await fetch('/api/expense', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ amount: expenseAmount }),
            });
            if (response.ok) {
                alert('Expense submitted successfully');
            } else {
                alert('Failed to submit expense');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <div className="container mx-auto p-4 max-w-xl">
            <h1 className="text-2xl font-bold mb-4 text-gray-700">Submit Expense</h1>
            <input
                type="number"
                value={expenseAmount}
                onChange={(e) => setExpenseAmount(e.target.value)}
                placeholder="Enter expense amount"
                className="border p-2 mb-4 w-full text-gray-700"
            />
            <button
                onClick={handleSubmitExpense}
                className="bg-red-500 text-white px-4 py-2 rounded"
            >
                Submit Expense
            </button>
        </div>
    );
};

export default SubmitExpense;
