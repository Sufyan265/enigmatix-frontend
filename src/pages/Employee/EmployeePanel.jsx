import SubmitExpense from "../Expense/SubmitExpense";


const EmployeePanel = ({ heading }) => {
    // const { getAccounts, accounts, loading } = useCrudContext();

    // useEffect(() => {
    //     getAccounts();
    // }, []);

    return (
        <>
            <div className="container mx-auto p-6">
                <SubmitExpense />
            </div>
        </>
    )
}

export default EmployeePanel;