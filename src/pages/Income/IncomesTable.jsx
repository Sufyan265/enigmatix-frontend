import React from 'react'
import { useIncomeContext } from '../../context/IncomeContext';
import Loading from '../../components/Loading';

const IncomesTable = () => {
    const { loading, successMessage, incomes } = useIncomeContext();

    return (
        <>
            <div className="container mx-auto p-6 bg-white shadow-md rounded-lg">
                <h1 className="text-3xl font-bold mb-6 text-gray-800">Approve Incomes</h1>

                {/* Responsive table container */}
                <div className="overflow-x-auto">
                    <table className="min-w-full bg-white border border-gray-200 rounded-lg">
                        <thead className="bg-gray-200">
                            <tr>
                                <th className="px-4 py-2 md:px-6 md:py-3 text-left text-xs md:text-sm font-medium text-gray-700 uppercase tracking-wider">
                                    Name
                                </th>
                                <th className="px-4 py-2 md:px-6 md:py-3 text-left text-xs md:text-sm font-medium text-gray-700 uppercase tracking-wider">
                                    Email
                                </th>
                                <th className="px-4 py-2 md:px-6 md:py-3 text-left text-xs md:text-sm font-medium text-gray-700 uppercase tracking-wider">
                                    ID
                                </th>
                                <th className="px-4 py-2 md:px-6 md:py-3 text-left text-xs md:text-sm font-medium text-gray-700 uppercase tracking-wider">
                                    Amount
                                </th>
                                {/* <th className="px-4 py-2 md:px-6 md:py-3 text-left text-xs md:text-sm font-medium text-gray-700 uppercase tracking-wider">
                                    Action
                                </th> */}
                            </tr>
                        </thead>
                        <tbody>
                            {loading && <Loading color="black" height="3rem" />}
                            {incomes.map((income) => (
                                <tr key={income._id} className="border-b">
                                    <td className="px-4 py-2 md:px-6 md:py-4 whitespace-nowrap text-sm md:text-base font-medium text-gray-900">
                                        {income.submittedBy.name}
                                    </td>
                                    <td className="px-4 py-2 md:px-6 md:py-4 whitespace-nowrap text-sm md:text-base text-gray-700">
                                        {income.submittedBy.email}
                                    </td>
                                    <td className="px-4 py-2 md:px-6 md:py-4 whitespace-nowrap text-sm md:text-base text-gray-700">
                                        {income.submittedBy._id}
                                    </td>
                                    <td className="px-4 py-2 md:px-6 md:py-4 whitespace-nowrap text-sm md:text-base text-gray-700">
                                        ${income.amount}
                                    </td>
                                    {/* <td className="px-4 py-2 md:px-6 md:py-4 whitespace-nowrap">
                                        <button
                                            // onClick={() => handleApprove(income.id)}
                                            className={`${income.isApproved ? "bg-gray-500" : "bg-green-500 hover:bg-green-600"}  text-white text-xs md:text-sm px-3 md:px-4 py-1 md:py-2 rounded  transition`}
                                            disabled={income.isApproved}
                                            onClick={() => handleApprove(income._id)}
                                        >
                                            {income.isApproved ? "Approved" : "Approve"}
                                        </button>
                                    </td> */}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    )
}

export default IncomesTable
