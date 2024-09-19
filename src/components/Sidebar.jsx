
const Sidebar = ({ isOpen }) => {
    return (
        <aside className={`w-64 h-screen bg-white fixed md:relative ${isOpen ? 'block' : 'hidden'} md:block z-10 border-r-1 border-gray-300`}>
            <div className="flex flex-col justify-between h-full">
                <div className="p-4"> 

                    <div className="mt-8">
                        <label className="material-icons text-black font-medium uppercase text-sm" htmlFor='manu'>Manu</label>

                        <ul className='ml-3 my-3' id='manu'>
                            <li className="text-gray-600 mb-4">
                                <a href="/accounts" className="flex items-center space-x-2 hover:text-primary active">Manage Accounts</a>
                            </li>
                            <li className="text-gray-600 mb-4">
                                <a href="/income" className="flex items-center space-x-2 hover:text-primary active">Manage Income</a>
                            </li>
                            <li className="text-gray-600 mb-4">
                                <a href="/expense" className="flex items-center space-x-2 hover:text-primary active">Manage Expense</a>
                            </li>
                            <li className="text-gray-600 mb-4">
                                <a href="/reports" className="flex items-center space-x-2 hover:text-primary active">View Reports</a>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </aside>
    );
};

export default Sidebar;