import React, { createContext, useContext, useState } from 'react';
import { useSuperAdminContext } from './SuperAdminContext';
import { useIncomeContext } from './IncomeContext';
import { useExpenseContext } from './ExpenseContext';

export const ReportContext = createContext();

export const ReportProvider = (props) => {
    const { allCompaniesData, host } = useSuperAdminContext();
    const { allIncomes, incomes } = useIncomeContext()
    const { allExpenses, expenses } = useExpenseContext()
    const [superAdminReportData, setSuperAdminReportData] = useState([]);

    const [loading, setLoading] = useState(false);
    const [totalIncome, setTotalIncome] = useState(0);
    const [totalExpenses, setTotalExpenses] = useState(0);


    const fetchReportData = async (companyId) => {
        try {
            setLoading(true);
            await allIncomes(companyId);
            await allExpenses(companyId);

            const incomeTotal = incomes.reduce((sum, item) => sum + item.amount, 0);
            const approvedExpensesTotal = expenses.reduce((sum, item) => item.isApproved ? sum + item.amount : sum, 0);

            setTotalIncome(incomeTotal);
            setTotalExpenses(approvedExpensesTotal);

            setLoading(false)
        } catch (error) {
            setLoading(false)
            console.log(error)
        }
    }


    const superAdminReport = async () => {
        try {
            setLoading(true);
            const response = await fetch(`${host}/api/auth/report`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem("superAdminToken")}`
                }
            });

            const data = await response.json();
            if (!response.ok) {
                throw new Error(data.message)
            }

            console.log(data)
            setSuperAdminReportData(data)
            // navigate("/super-admin")
            console.log("Fetch all Companies Succesfuly")
            setLoading(false)
        } catch (error) {
            setLoading(false);
            console.error(error)
        }
    };




    return (
        <ReportContext.Provider value={{
            loading,
            fetchReportData,

            totalIncome,
            totalExpenses,

            superAdminReport,
            superAdminReportData,

        }}>
            {props.children}
        </ReportContext.Provider>
    );
};

export const useReportContext = () => useContext(ReportContext);