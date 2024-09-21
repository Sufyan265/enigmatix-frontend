import { Navigate, useParams } from "react-router-dom";
import SubmitExpense from "../Expense/SubmitExpense";


const EmployeePanel = () => {
    // const { getAccounts, accounts, loading } = useCrudContext();

    // useEffect(() => {
    //     getAccounts();
    // }, []);

    const { companyId, employeeId } = useParams();
    const employeeToken = localStorage.getItem(`employeeToken:${employeeId}`);

    if (!employeeId || !employeeToken) {
        return <Navigate to={`/company/${companyId}/employee/login`} />;
    }

    return (
        <>
            <div className="container mx-auto p-6">
                <SubmitExpense />
            </div>
        </>
    )
}

export default EmployeePanel;