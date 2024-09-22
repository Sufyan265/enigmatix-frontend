import { useForm } from 'react-hook-form';
import { useParams } from 'react-router-dom';
import Loading from '../../components/Loading';
import { useExpenseContext } from '../../context/ExpenseContext';

const AddIncome = () => {
    const { loading, successMessage } = useExpenseContext();

    const { register, handleSubmit, formState: { errors, isSubmitting }, reset, } = useForm();
    // const { companyId, employeeId } = useParams();

    const onSubmit = async (data) => {
        // const formData = {
        //     ...data,
        //     companyId,
        // };
        // await submitExpense(formData, employeeId);
        console.log(data)

        reset();
    };

    return (
        <>
            <div className="container mx-auto p-6 max-w-xl bg-white shadow-sm rounded-lg my-5">
                <h1 className="text-3xl font-bold mb-6 text-gray-800">Add Income</h1>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    <div>
                        <input
                            type="number"
                            {...register('amount', { required: 'Income amount is required' })}
                            placeholder="Enter Income amount"
                            className="border p-3 w-full rounded text-gray-700 focus:outline-none focus:border-blue-500"
                        />
                        {errors.amount && (
                            <p className="text-red-500 text-sm mt-2">{errors.amount.message}</p>
                        )}
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition"
                        disabled={loading}
                    >
                        {loading ? <Loading /> : "Add Income"}
                    </button>
                </form>

                {successMessage && (
                    <p className="mt-4 bg-green-100 text-green-600 p-4 rounded">
                        {successMessage}
                    </p>
                )}
            </div>

            <div className="container mx-auto p-6 bg-white shadow-md rounded-lg">
                <h1 className="text-3xl font-bold mb-6 text-gray-800">Approve Expenses</h1>

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
                                <th className="px-4 py-2 md:px-6 md:py-3 text-left text-xs md:text-sm font-medium text-gray-700 uppercase tracking-wider">
                                    Action
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {loading && <Loading color="black" height="3rem" />}
                            {expenses.map((expense) => (
                                <tr key={expense._id} className="border-b">
                                    <td className="px-4 py-2 md:px-6 md:py-4 whitespace-nowrap text-sm md:text-base font-medium text-gray-900">
                                        {expense.submittedBy.name}
                                    </td>
                                    <td className="px-4 py-2 md:px-6 md:py-4 whitespace-nowrap text-sm md:text-base text-gray-700">
                                        {expense.submittedBy.email}
                                    </td>
                                    <td className="px-4 py-2 md:px-6 md:py-4 whitespace-nowrap text-sm md:text-base text-gray-700">
                                        {expense.submittedBy._id}
                                    </td>
                                    <td className="px-4 py-2 md:px-6 md:py-4 whitespace-nowrap text-sm md:text-base text-gray-700">
                                        ${expense.amount}
                                    </td>
                                    <td className="px-4 py-2 md:px-6 md:py-4 whitespace-nowrap">
                                        <button
                                            // onClick={() => handleApprove(expense.id)}
                                            className={`${expense.isApproved ? "bg-gray-500" : "bg-green-500 hover:bg-green-600"}  text-white text-xs md:text-sm px-3 md:px-4 py-1 md:py-2 rounded  transition`}
                                            disabled={expense.isApproved}
                                            onClick={() => handleApprove(expense._id)}
                                        >
                                            {expense.isApproved ? "Approved" : "Approve"}
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    );
};

export default AddIncome;
