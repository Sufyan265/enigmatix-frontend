import React from 'react';
import EmployeeForm from '../../components/EmployeeForm';
import { useAdminContext } from '../../context/AdminContext';
import { useParams } from 'react-router-dom';

const CreateEmployee = () => {
    const { createUser } = useAdminContext();
    const { id } = useParams();

    const onSubmit = async (data, setError) => {
        try {
            await createUser(data, id);
        } catch (error) {
            console.error(error);
            if (error.message === 'User with this email already exists.' || error.message === 'Invalid Credentials') {
                setError('inValid', { type: 'manual', message: 'User with this email already exists.' });
            } else {
                setError('inValid', { type: 'manual', message: error.message });
            }
        }
    }

    return (
        <>
            <div className="container mx-auto p-4">
                <EmployeeForm onSubmit={onSubmit} />
            </div>
        </>
    );
};

export default CreateEmployee;