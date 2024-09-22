import { useState } from 'react';
import { Link, useParams } from 'react-router-dom';

const Sidebar = ({ isOpen }) => {
    const [activeItem, setActiveItem] = useState('accounts');
    const { id } = useParams()

    const handleItemClick = (item) => {
        setActiveItem(item);
    };

    return (
        <aside className={`w-64 h-screen bg-white fixed md:relative ${isOpen ? 'block' : 'hidden'} md:block z-10 border-r-1 border-gray-300`}>
            <div className="flex flex-col justify-between h-full ">
                <div className="p-4">

                    <div className="mt-8">
                        <label className="material-icons text-black font-medium uppercase text-sm" htmlFor='manu'>Manu</label>

                        <ul className='ml-3 my-3' id='manu'>
                            <li className={`mb-4 ${activeItem === 'accounts' ? 'text-primary' : 'text-gray-600'}`}>
                                <Link to={`/company/${id}`} className="flex items-center space-x-2 hover:text-primary" onClick={() => handleItemClick('accounts')}>Manage Accounts</Link>
                            </li>
                            <li className={`mb-4 ${activeItem === 'income' ? 'text-primary' : 'text-gray-600'}`}>
                                <Link to={`/company/${id}/income`} className="flex items-center space-x-2 hover:text-primary" onClick={() => handleItemClick('income')}>Manage Income</Link>
                            </li>
                            <li className={`mb-4 ${activeItem === 'expense' ? 'text-primary' : 'text-gray-600'}`}>
                                <Link to={`/company/${id}/expense`} className="flex items-center space-x-2 hover:text-primary" onClick={() => handleItemClick('expense')}>Manage Expense</Link>
                            </li>
                            <li className={`mb-4 ${activeItem === 'reports' ? 'text-primary' : 'text-gray-600'}`}>
                                <Link to={`/company/${id}/report`} className="flex items-center space-x-2 hover:text-primary" onClick={() => handleItemClick('reports')}>View Reports</Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </aside>
    );
};

export default Sidebar;