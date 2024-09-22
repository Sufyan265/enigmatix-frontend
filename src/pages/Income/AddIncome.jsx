import { useForm } from 'react-hook-form';
import { useParams } from 'react-router-dom';
import Loading from '../../components/Loading';
import { useIncomeContext } from '../../context/IncomeContext';

const AddIncome = () => {
    const { loading, successMessage, submitIncome } = useIncomeContext();

    const { register, handleSubmit, formState: { errors }, reset, } = useForm();
    const { id } = useParams();

    const onSubmit = async (data) => {
        const formData = {
            ...data,
            companyId: id,
        };
        console.log(formData)
        await submitIncome(formData);

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

            {/* <IncomesTable /> */}
        </>
    );
};

export default AddIncome;
