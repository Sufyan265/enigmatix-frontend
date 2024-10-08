import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import Loading from "../../components/Loading";
import AccountCard from "../../components/AccountCard";
import { useAdminContext } from "../../context/AdminContext";

// const botsObj = [
//     { id: 1, name: 'Adeel', category: 'Layer Faram', owner: "Muhammad Sufyan" },
//     { id: 2, name: 'Haseeb', category: 'Tech', owner: "Muhammad Sufyan" },
//     { id: 3, name: 'Haroon', category: 'Hardware Store', owner: "Muhammad Sufyan" },
//     { id: 4, name: 'Noman', category: 'Tech', owner: "Muhammad Sufyan" },
//     { id: 5, name: 'Atique', category: 'Pet Store', owner: "Muhammad Sufyan" },
//     { id: 6, name: 'Usama', category: 'Beauty Salon', owner: "Muhammad Sufyan" },
//     { id: 7, name: 'Samad', category: 'Hardware Store', owner: "Muhammad Sufyan" },
// ];

const ViewCompany = ({ heading, createAccountPath, getAccountPath, data, companyId }) => {
    const { loading, deleteUser } = useAdminContext()

    if (!data) {
        data = [];
    }

    const handleDelete = async (userId) => {
        if (confirm("Are you sure you want to delete this user?")) {
            await deleteUser(userId, companyId)
        }
    }


    return (
        <>
            <div className="container mx-auto p-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    <button className="bg-primary text-white rounded-sm hover:border-primary">
                        <Link to={createAccountPath} className="flex items-center justify-center flex-col rounded-sm p-6 md:py-14 py-10 shadow-sm">
                            <span className='w-12 h-12 rounded-full bg-gray-200 bg-opacity-50 text-3xl flex justify-center items-center mb-2'>+</span>
                            <h3 className="text-lg font-semibold uppercase">{heading}</h3>
                        </Link>
                    </button>

                    {loading ? (
                        <div className="flex items-center justify-center">
                            <Loading display="inline-flex" color="black" />
                        </div>
                    ) : (
                        data.map((account) => (
                            <AccountCard key={account._id} name={account.name} owner={account.email} category={account.role} path={`${getAccountPath}/login`} handleDelete={handleDelete} companyId={account._id} />
                        ))
                    )}
                </div>
            </div>
        </>
    )
}

export default ViewCompany;