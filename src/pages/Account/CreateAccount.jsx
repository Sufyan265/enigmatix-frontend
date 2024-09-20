import React from 'react';
import AccountForm from '../../components/AccountForm';
import { useSuperAdminContext } from '../../context/SuperAdminContext';

const AccountCreationPage = () => {
    const { createCompanyAdmin } = useSuperAdminContext();

    const onSubmit = async (data, setError) => {
        try {
            await createCompanyAdmin(data);
        } catch (error) {
            console.error(error);
            if (error.message === 'Company with this email already exists.' || error.message === 'Invalid Credentials') {
                setError('inValid', { type: 'manual', message: 'Company with this email already exists.' });
            } else {
                setError('inValid', { type: 'manual', message: error.message });
            }
        }
    }

    return (
        <>
            <div className="container mx-auto p-4">
                <AccountForm onSubmit={onSubmit} submitText="Create Company" />
            </div>
        </>
    );
};

export default AccountCreationPage;