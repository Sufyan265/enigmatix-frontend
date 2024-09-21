import { RiDeleteBin5Fill } from "react-icons/ri";
import { Link } from "react-router-dom";

const AccountCard = ({ name, owner, category, path }) => {
    const handleDelete = async () => {
        confirm("Are you sure you want to delete this company?");
    }

    return (
        <div className="relative bg-white shadow-sm md:px-6 px-4 md:py-12 py-6 rounded-sm text-center border border-white hover:border-primary cursor-pointer transition-all group">
            <div className="absolute top-2 right-2 flex space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
                {/* <div className="hover:bg-red-700 flex items-center justify-center"> */}

                <button className="text-red-500 hover:text-red-700 py-[2px] px-[3px] rounded-sm"> <RiDeleteBin5Fill size={23} onClick={handleDelete} /></button>

                {/* </div> */}
                {/* <div className="flex items-center justify-center"> */}
                {/* <button className="bg-primary text-white py-[2px] px-[3px] rounded-sm text-sm">Edit</button> */}
                {/* </div> */}
            </div>
            <h2 className="text-lg font-medium text-gray-800">{name}</h2>
            <p className="text-gray-500 mt-2 text-base">{owner}</p>
            <span className="bg-primary text-white px-3 mt-4 rounded-md text-sm inline-block transition-all">{category}</span>
            <div className="w-full text-center mt-5">
                <Link to={path} className=" bg-green-600 text-white hover:bg-green-700 py-[3px] px-[4px] rounded-sm ">SignIn</Link>
            </div>
        </div>
    );
};

export default AccountCard;