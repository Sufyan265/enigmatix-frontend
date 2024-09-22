import React, { useState, useEffect } from 'react';
import Loading from '../../components/Loading';

const SuperAdminReports = () => {
    const [reports, setReports] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Simulating a fetch call to get all companies' reports
        setTimeout(() => {
            const fetchedReports = [
                { id: 1, company: 'Company A', income: 25000, expense: 10000, balance: 15000 },
                { id: 2, company: 'Company B', income: 34000, expense: 14000, balance: 20000 },
                { id: 3, company: 'Company C', income: 41000, expense: 21000, balance: 20000 }
            ];
            setReports(fetchedReports);
            setLoading(false);
        }, 2000);
    }, []);

    if (loading) {
        return <div className="flex justify-center items-center h-screen"><Loading color="black" /></div>;
    }

    return (
        <div className="min-h-screen bg-gray-100 p-8">
            <div className="container mx-auto bg-white shadow-lg rounded-lg">
                <div className="py-6 px-8 bg-gradient-to-r from-blue-500 to-teal-400 rounded-t-lg text-white text-center">
                    <h2 className="text-3xl font-bold mb-2">Super Admin - Company Reports</h2>
                    <p className="text-lg">View all company income and expense reports</p>
                </div>
                <div className="overflow-x-auto">
                    <table className="min-w-full leading-normal">
                        <thead className="bg-gray-200 text-gray-600 uppercase text-sm">
                            <tr>
                                <th className="py-3 px-6 text-left">Company</th>
                                <th className="py-3 px-6 text-right">Income</th>
                                <th className="py-3 px-6 text-right">Expense</th>
                                <th className="py-3 px-6 text-right">Balance</th>
                            </tr>
                        </thead>
                        <tbody>
                            {reports.map((report) => (
                                <tr key={report.id} className="bg-white border-b border-gray-200 hover:bg-gray-50">
                                    <td className="py-4 px-6 text-left">{report.company}</td>
                                    <td className="py-4 px-6 text-right text-green-500 font-semibold">${report.income.toLocaleString()}</td>
                                    <td className="py-4 px-6 text-right text-red-500 font-semibold">${report.expense.toLocaleString()}</td>
                                    <td className="py-4 px-6 text-right text-gray-700 font-bold">${report.balance.toLocaleString()}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <div className="py-6 px-8 bg-gray-100 rounded-b-lg">
                    <p className="text-gray-600 text-sm">You are viewing all reports for all companies under your management.</p>
                </div>
            </div>
        </div>
    );
};

export default SuperAdminReports;
