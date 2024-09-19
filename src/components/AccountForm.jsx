import { useForm } from 'react-hook-form';
import Loading from './Loading';

const AccountForm = ({ onSubmit, submitText }) => {
    const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm();

    return (
        <section className="min-h-full flex justify-center items-center">
            <div className="bg-white max-w-xl w-full">
                <div className="flex items-center justify-center min-h-screen bg-gray-100 w-full">
                    <div className="bg-white shadow-sm w-full rounded-md border ">

                        <div className="flex justify-between items-center mb-2 bg-secondary rounded-t-md">
                            <div className='md:p-5 p-3'>
                                <h2 className="text-2xl font-semibold text-primary font-heading">Create New Account</h2>
                                <p className="text-gray-400 text-sm">Add credentials for Create New Account</p>
                            </div>
                        </div>

                        <div className="md:p-8 p-4">

                            <form onSubmit={handleSubmit(onSubmit)}>
                                <div className="mb-4">
                                    <label className="block text-gray-700">Name</label>
                                    <input
                                        type="name"
                                        placeholder="Enter name"
                                        className={`w-full px-4 py-2 mt-2 border rounded-sm focus:outline-none focus:ring-2 text-gray-700 ${errors.name ? 'border-red-500' : 'focus:ring-primary'}`}
                                        {...register('name', { required: 'Name is required' })}
                                        autoComplete='name'
                                    />
                                    {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>}
                                </div>
                                <div className="mb-4">
                                    <label className="block text-gray-700">Owner</label>
                                    <input
                                        type="owner"
                                        placeholder="Enter owner"
                                        className={`w-full px-4 py-2 mt-2 border rounded-sm focus:outline-none focus:ring-2 text-gray-700 ${errors.owner ? 'border-red-500' : 'focus:ring-primary'}`}
                                        {...register('owner', { required: 'Owner is required' })}
                                        autoComplete='owner'
                                    />
                                    {errors.owner && <p className="text-red-500 text-sm mt-1">{errors.owner.message}</p>}
                                </div>

                                <button type="submit" className="w-full bg-primary text-white py-2 rounded-sm hover:bg-blue-600 transition-colors" disabled={isSubmitting}>
                                    {isSubmitting ? <Loading size={25} /> : submitText}
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default AccountForm;