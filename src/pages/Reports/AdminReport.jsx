import React, { useState, useEffect } from 'react';
import Loading from '../../components/Loading';
import { useReportContext } from '../../context/ReportContext';
import { useIncomeContext } from '../../context/IncomeContext';
import { useExpenseContext } from '../../context/ExpenseContext';
import { useParams } from 'react-router-dom';

const AdminReport = () => {
    const { fetchReportData, loading, totalIncome, totalExpenses } = useReportContext();
    const { incomes } = useIncomeContext()
    const { expenses } = useExpenseContext()

    const { id } = useParams();


    useEffect(() => {
        fetchReportData(id)
    }, []);

    // if (loading) return <p className="text-center text-xl text-gray-600">Loading report...</p>;

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="bg-white shadow-md rounded-lg p-6 mb-6">
                <h1 className="text-3xl font-bold text-gray-800 mb-4 text-center">Company Financial Report</h1>

                {/* Summary Section */}
                <div className="flex flex-wrap justify-around mb-6 gap-2">
                    <div className="w-full md:w-[32.333333%] p-4 bg-indigo-100 rounded-lg text-center">
                        <h2 className="text-xl font-semibold text-gray-700">Total Income</h2>
                        <p className="text-2xl font-bold text-indigo-700">${totalIncome.toFixed(2)}</p>
                    </div>
                    <div className="w-full md:w-[32.333333%] p-4 bg-red-100 rounded-lg text-center">
                        <h2 className="text-xl font-semibold text-gray-700">Total Expenses</h2>
                        <p className="text-2xl font-bold text-red-700">${totalExpenses.toFixed(2)}</p>
                    </div>
                    <div className="w-full md:w-[32.333333%] p-4 bg-green-100 rounded-lg text-center">
                        <h2 className="text-xl font-semibold text-gray-700">Overall Balance</h2>
                        <p className="text-2xl font-bold text-green-700">${(totalIncome - totalExpenses).toFixed(2)}</p>
                    </div>
                </div>

                {loading && <Loading color="black" height="3rem" />}

                {/* Income Section */}
                <div className="mb-8">
                    <h2 className="text-2xl font-semibold text-gray-800 mb-4">Income Records</h2>
                    {incomes.length > 0 ? (
                        <table className="min-w-full bg-white shadow-lg rounded-lg overflow-hidden">
                            <thead>
                                <tr className="bg-indigo-700 text-white text-left">
                                    <th className="py-2 px-4">ID</th>
                                    <th className="py-2 px-4">Amount</th>
                                    <th className="py-2 px-4">Date</th>
                                </tr>
                            </thead>
                            <tbody>
                                {incomes.map((income, index) => (
                                    <tr key={index} className="border-b">
                                        <td className="py-2 px-4 text-gray-700">{income._id}</td>
                                        <td className="py-2 px-4 text-indigo-700 font-bold">${income.amount.toFixed(2)}</td>
                                        <td className="py-2 px-4 text-gray-500">{new Date(income.createdAt).toLocaleDateString()}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    ) : (
                        <p className="text-center text-gray-600">No income records found.</p>
                    )}
                </div>

                {/* Expense Section */}
                <div className="mb-8">
                    <h2 className="text-2xl font-semibold text-gray-800 mb-4">Expense Records</h2>
                    {expenses.length > 0 ? (
                        <table className="min-w-full bg-white shadow-lg rounded-lg overflow-hidden">
                            <thead>
                                <tr className="bg-red-700 text-white text-left">
                                    <th className="py-2 px-4">Email</th>
                                    <th className="py-2 px-4">Amount</th>
                                    <th className="py-2 px-4">Date</th>
                                    <th className="py-2 px-4">Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                {expenses.map((expense, index) => (
                                    <tr key={index} className="border-b">
                                        <td className="py-2 px-4 text-gray-700">{expense.submittedBy.email}</td>
                                        <td className="py-2 px-4 text-red-700 font-bold">${expense.amount.toFixed(2)}</td>
                                        <td className="py-2 px-4 text-gray-500">{new Date(expense.createdAt).toLocaleDateString()}</td>
                                        <td className="py-2 px-4">
                                            <span
                                                className={`px-2 py-1 text-sm rounded ${expense.isApproved
                                                    ? 'bg-green-200 text-green-600'
                                                    : 'bg-yellow-200 text-yellow-600'
                                                    }`}
                                            >
                                                {expense.isApproved ? 'Approved' : 'Pending'}
                                            </span>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    ) : (
                        <p className="text-center text-gray-600">No expense records found.</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default AdminReport;
