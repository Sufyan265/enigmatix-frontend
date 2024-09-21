import { useState } from 'react';

const Sidebar = ({ isOpen }) => {
    const [activeItem, setActiveItem] = useState('accounts');

    const handleItemClick = (item) => {
        setActiveItem(item);
    };

    return (
        <aside className={`w-64 h-screen bg-white fixed md:relative ${isOpen ? 'block' : 'hidden'} md:block z-10 border-r-1 border-gray-300`}>
            <div className="flex flex-col justify-between h-full">
                <div className="p-4">

                    <div className="mt-8">
                        <label className="material-icons text-black font-medium uppercase text-sm" htmlFor='manu'>Manu</label>

                        <ul className='ml-3 my-3' id='manu'>
                            <li className={`mb-4 ${activeItem === 'accounts' ? 'text-primary' : 'text-gray-600'}`}>
                                <a href="/accounts" className="flex items-center space-x-2 hover:text-primary" onClick={() => handleItemClick('accounts')}>Manage Accounts</a>
                            </li>
                            <li className={`mb-4 ${activeItem === 'income' ? 'text-primary' : 'text-gray-600'}`}>
                                <a href="/income" className="flex items-center space-x-2 hover:text-primary" onClick={() => handleItemClick('income')}>Manage Income</a>
                            </li>
                            <li className={`mb-4 ${activeItem === 'expense' ? 'text-primary' : 'text-gray-600'}`}>
                                <a href="/expense" className="flex items-center space-x-2 hover:text-primary" onClick={() => handleItemClick('expense')}>Manage Expense</a>
                            </li>
                            <li className={`mb-4 ${activeItem === 'reports' ? 'text-primary' : 'text-gray-600'}`}>
                                <a href="/reports" className="flex items-center space-x-2 hover:text-primary" onClick={() => handleItemClick('reports')}>View Reports</a>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </aside>
    );
};

export default Sidebar;