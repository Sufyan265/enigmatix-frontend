import { useForm } from 'react-hook-form';
import Loading from './Loading';
import { useEffect } from 'react';

const AccountForm = ({ onSubmit }) => {
    const { register, handleSubmit, formState: { errors, isSubmitting }, setError, clearErrors, watch } = useForm();

    const email = watch('email');
    const password = watch('password');
    const companyName = watch('companyName');
    const name = watch('name');


    useEffect(() => {
        if (errors.inValid) {
            clearErrors('inValid');
        }
        setTimeout(() => {
            clearErrors('inValid');
        }, 7000);
    }, [email, password, companyName, name, clearErrors]);

    return (
        <section className="min-h-full flex justify-center items-center">
            <div className="bg-white max-w-xl w-full">
                <div className="flex items-center justify-center min-h-screen bg-gray-100 w-full">
                    <div className="bg-white shadow-sm w-full rounded-md border ">

                        <div className="flex justify-between items-center mb-2 bg-secondary rounded-t-md">
                            <div className='md:p-5 p-3'>
                                <h2 className="text-2xl font-semibold text-primary font-heading">Create New Employee</h2>
                                <p className="text-gray-400 text-sm">Add credentials for Create New Employee</p>
                            </div>
                        </div>

                        <div className="md:p-8 p-4">

                            <form onSubmit={handleSubmit((data) => onSubmit(data, setError))}>
                                <div className="mb-4">
                                    <label className="block text-gray-700">Name</label>
                                    <input
                                        type="name"
                                        placeholder="Enter Employee name"
                                        className={`w-full px-4 py-2 mt-2 border rounded-sm focus:outline-none focus:ring-2 text-gray-700 ${errors.name ? 'border-red-500' : 'focus:ring-primary'}`}
                                        {...register('name', { required: 'Name is required' })}
                                        autoComplete='name'
                                    />
                                    {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>}
                                </div>
                                <div className="mb-4">
                                    <label className="block text-gray-700">Email</label>
                                    <input
                                        type="email"
                                        placeholder="Enter email"
                                        className={`w-full px-4 py-2 mt-2 border rounded-sm focus:outline-none focus:ring-2 text-gray-700 ${errors.email ? 'border-red-500' : 'focus:ring-primary'}`}
                                        {...register('email', { required: 'Email is required', pattern: { value: /^\S+@\S+$/i, message: 'Invalid email' } })}
                                        autoComplete='email'
                                    />
                                    {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
                                </div>
                                <div className="mb-4">
                                    <label className="block text-gray-700">Set Password</label>
                                    <input
                                        type="password"
                                        placeholder="Enter password"
                                        className={`w-full px-4 py-2 mt-2 border rounded-sm focus:outline-none focus:ring-2 text-gray-700 ${errors.password ? 'border-red-500' : 'focus:ring-primary'}`}
                                        {...register('password', { required: 'Password is required', minLength: { value: 6, message: 'Password must be at least 6 characters' } })}
                                        autoComplete='password'
                                    />
                                    {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>}
                                </div>

                                {errors.inValid && <p className="text-red-500 text-sm my-1 text-center">{errors.inValid.message}</p>}
                                <button type="submit" className="w-full bg-primary text-white py-2 rounded-sm hover:bg-blue-600 transition-colors" disabled={isSubmitting}>
                                    {isSubmitting ? <Loading size={25} stroke="4" /> : "Create Employee"}
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