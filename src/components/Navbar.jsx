import React from 'react'
import { Link } from 'react-router-dom'

const NavbarSuper = ({ brand }) => {
    return (
        <nav className=' bg-primary text-white py-4 w-full'>
            <div className='container mx-auto flex md:justify-between justify-center flex-wrap px-4'>
                <Link to="/super-admin" className="logo font-bold text-white">{brand}</Link>
                <ul className='flex md:gap-6 gap-4 flex-wrap md:mt-0 mt-5'>
                    <a href='#'><li>Home</li></a>
                </ul>
            </div>
        </nav>
    )
}

export default NavbarSuper