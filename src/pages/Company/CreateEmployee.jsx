import React from 'react';
import AccountForm from '../../components/AccountForm';

const CreateEmployee = () => {
    // const { createAccount } = useCrudContext();

    const onSubmit = async (data) => {
        try {
            console.log(data);
            // await createAccount(data);
            console.log("Accouent Created Succesfuly")
        } catch (error) {
            console.error(error);
        };
    }

    return (
        <>
            <div className="container mx-auto p-4">
                <AccountForm onSubmit={onSubmit} submitText="Create Employee" />
            </div>
        </>
    );
};

export default CreateEmployee;