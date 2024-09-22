import React, { createContext, useContext, useState } from 'react';
import { useSuperAdminContext } from './SuperAdminContext';
import { useIncomeContext } from './IncomeContext';
import { useExpenseContext } from './ExpenseContext';

export const ReportContext = createContext();

export const ReportProvider = (props) => {
    // const { host } = useSuperAdminContext();
    const { allIncomes, incomes } = useIncomeContext()
    const { allExpenses, expenses } = useExpenseContext()

    const [loading, setLoading] = useState(false);
    // const [incomeData, setIncomeData] = useState([]);
    // const [expenseData, setExpenseData] = useState([]);
    const [totalIncome, setTotalIncome] = useState(0);
    const [totalExpenses, setTotalExpenses] = useState(0);


    const fetchReportData = async (companyId) => {
        try {
            setLoading(true);
            await allIncomes(companyId);
            await allExpenses(companyId);

            const incomeTotal = incomes.reduce((sum, item) => sum + item.amount, 0);
            const expensesTotal = expenses.reduce((sum, item) => sum + item.amount, 0);

            setTotalIncome(incomeTotal);
            setTotalExpenses(expensesTotal);

            setLoading(false)

        } catch (error) {
            setLoading(false)
            console.log(error)
        }

    }



    return (
        <ReportContext.Provider value={{
            loading,
            fetchReportData,

            totalIncome,
            totalExpenses,

        }}>
            {props.children}
        </ReportContext.Provider>
    );
};

export const useReportContext = () => useContext(ReportContext);