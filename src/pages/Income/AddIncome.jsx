import React, { useState } from 'react';

const AddIncome = () => {
    const [incomeAmount, setIncomeAmount] = useState('');

    const handleAddIncome = async () => {
        try {
            const response = await fetch('/api/income', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ amount: incomeAmount }),
            });
            if (response.ok) {
                alert('Income added successfully');
            } else {
                alert('Failed to add income');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold mb-4">Add Income</h1>
            <input
                type="number"
                value={incomeAmount}
                onChange={(e) => setIncomeAmount(e.target.value)}
                placeholder="Enter income amount"
                className="border p-2 mb-4 w-full"
            />
            <button
                onClick={handleAddIncome}
                className="bg-green-500 text-white px-4 py-2 rounded"
            >
                Add Income
            </button>
        </div>
    );
};

export default AddIncome;
