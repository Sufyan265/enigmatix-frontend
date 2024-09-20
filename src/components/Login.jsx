import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import Loading from './Loading';

const Login = ({ onSubmit, panelName }) => {
    const { register, handleSubmit, formState: { errors, isSubmitting }, setError, clearErrors, watch } = useForm();

    // Watch email and password fields
    const email = watch('email');
    const password = watch('password');

    // Clear inValid error when email or password changes
    useEffect(() => {
        if (errors.inValid) {
            clearErrors('inValid');
        }
    }, [email, password, clearErrors]);

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100 w-full">
            <div className="bg-white shadow-sm w-full rounded-md border border-gray-200">
                <div className="flex justify-between items-center mb-2 bg-secondary rounded-t-md">
                    <div className='md:p-5 p-3'>
                        <h2 className="text-2xl font-semibold text-primary font-heading">Sign in as {panelName}!</h2>
                        <p className="text-gray-400 text-sm">Sign in to continue {panelName} panel</p>
                    </div>
                </div>

                <div className="md:p-8 p-4">
                    <form onSubmit={handleSubmit((data) => onSubmit(data, setError))}>
                        <div className="mb-4">
                            <label className="block text-gray-700">Email</label>
                            <input
                                type="email"
                                placeholder="Enter email"
                                className={`w-full px-4 py-2 mt-2 border rounded-sm focus:outline-none focus:ring-2 text-gray-700 ${errors.email ? 'border-red-500' : 'focus:ring-primary'}`}
                                {...register('email', { required: 'Email is required' })}
                                autoComplete='email'
                            />
                            {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700">Password</label>
                            <input
                                type="password"
                                placeholder="Enter password"
                                className={`w-full px-4 py-2 mt-2 border rounded-sm focus:outline-none focus:ring-2 text-gray-700 ${errors.password ? 'border-red-500' : 'focus:ring-primary'}`}
                                {...register('password', { required: 'Password is required', minLength: { value: 6, message: 'Password must be at least 6 characters' } })}
                                autoComplete='current-password'
                            />
                            {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>}
                        </div>

                        {errors.inValid && <p className="text-red-500 text-sm my-1 text-center">{errors.inValid.message}</p>}
                        <button type="submit" className="w-full bg-primary text-white py-2 rounded-sm hover:bg-blue-600 transition-colors" disabled={isSubmitting}>
                            {isSubmitting ? <Loading size={25} /> : 'Log In'}
                        </button>
                    </form>

                    <div className="w-full text-center my-7">
                        <a href="#" className="text-gray-500 flex justify-center items-center text-base cursor-pointer">
                            Forgot your password?
                        </a>
                    </div>

                    <div className="mt-15 text-center text-gray-600 font-heading text-base">
                        Don’t have an account?{' '}
                        <a href="#" className="text-primary font-semibold hover:underline">
                            Sign up now
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;