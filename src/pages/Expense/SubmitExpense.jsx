import { useForm } from 'react-hook-form';
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import Loading from '../../components/Loading';
import { useExpenseContext } from '../../context/ExpenseContext';

const SubmitExpense = () => {
    const { loading, submitExpense, successMessage } = useExpenseContext();

    const { register, handleSubmit, formState: { errors, isSubmitting }, reset, } = useForm();
    const { companyId, employeeId } = useParams();

    const onSubmit = async (data) => {
        const formData = {
            ...data,
            companyId,
        };

        await submitExpense(formData, employeeId);
        reset();
    };

    return (
        <div className="container mx-auto p-6 max-w-xl bg-white shadow-md rounded-lg">
            <h1 className="text-3xl font-bold mb-6 text-gray-800">Submit Expense</h1>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <div>
                    <input
                        type="number"
                        {...register('amount', { required: 'Expense amount is required' })}
                        placeholder="Enter expense amount"
                        className="border p-3 w-full rounded text-gray-700 focus:outline-none focus:border-blue-500"
                    />
                    {errors.amount && (
                        <p className="text-red-500 text-sm mt-2">{errors.amount.message}</p>
                    )}
                </div>

                <button
                    type="submit"
                    className="w-full bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition"
                    disabled={loading}
                >
                    {loading ? <Loading /> : "Submit Expense"}
                </button>
            </form>

            {successMessage && (
                <p className="mt-4 bg-green-100 text-green-600 p-4 rounded">
                    {successMessage}
                </p>
            )}
        </div>
    );
};

export default SubmitExpense;
