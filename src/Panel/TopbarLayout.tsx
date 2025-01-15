import React, { useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
// import { CiLight, CiDark } from "react-icons/ci";
// import { ProductContextData } from '../context/ContextData';
import { IoIosLogOut } from "react-icons/io";
import { ProductContextData } from '../context/ContextData';
import { AccessControl } from '../accessControl/AccessControl';
import { Badge } from 'primereact/badge';

interface propsI {
    userRole: keyof typeof AccessControl,
}

const TopbarLayout: React.FC<propsI> = ({ userRole }) => {
    const navigate = useNavigate()
    const context = useContext(ProductContextData);
    if (!context) {
        throw new Error('it should not be null');
    }
    const { loginUserDetail, setLoginUserDetail } = context

    // const topBarPophoverItems = [
    //     {
    //         navName: 'Add Presenter',
    //         navLink: '/add-new-presenter'
    //     },
    //     {
    //         navName: 'Presenter List',
    //         navLink: '/presenters-table'
    //     },
    //     {
    //         navName: 'Add Sub Admin',
    //         navLink: '/add-sub-admin'
    //     },
    //     {
    //         navName: 'Add Event',
    //         navLink: '/add-event'
    //     },
    //     {
    //         navName: 'Edit Profile',
    //         navLink: '/edit-profile'
    //     },
    //     {
    //         navName: 'Change Password',
    //         navLink: '/change-password'
    //     }
    // ]

    const logoutUser = () => {
        localStorage.clear();
        setLoginUserDetail(null)
        navigate('/')
        // window.history.go(0);
    }
    return (
        <nav className="fixed top-0 z-50 w-full bg-white">
            <div className="px-3 py-3 lg:px-5 lg:pl-3">
                <div className="flex items-center justify-between">
                    <div className="flex items-center justify-start rtl:justify-end">
                        <button data-drawer-target="logo-sidebar" data-drawer-toggle="logo-sidebar" aria-controls="logo-sidebar" type="button" className="inline-flex items-center p-2 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600">
                            <span className="sr-only">Open sidebar</span>
                            <svg className="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                <path clipRule="evenodd" fillRule="evenodd" d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"></path>
                            </svg>
                        </button>
                        <a href="https://flowbite.com" className="flex ms-2 md:me-24">
                            <img src="https://flowbite.com/images/logo.svg" className="h-8 me-3" alt="FlowBite Logo" />
                        </a>
                    </div>
                    <div className="flex items-center">
                        <div className="flex items-center ms-3">
                            <div className='p-[5px] rounded-full border border-solid border-[#ddd]'>
                                <button type="button" className="flex text-sm" aria-expanded="false" data-dropdown-toggle="dropdown-user">
                                    {/* <span className="sr-only">Open user menu</span> */}
                                    <i className='pi pi-user text-[20px] text-[#666666]' />
                                    {/* <img className="w-8 h-8 rounded-full" src="https://flowbite.com/docs/images/people/profile-picture-5.jpg" alt="user photo" /> */}
                                </button>
                            </div>
                            {
                                localStorage.getItem('userAccessToken') && <div className="z-50 hidden my-4 text-base list-none bg-white divide-y divide-gray-100 rounded shadow dark:bg-gray-700 dark:divide-gray-600" id="dropdown-user">
                                    <div className="px-4 py-3" role="none">
                                        <p className="text-sm text-gray-900 dark:text-white flex items-center justify-start capitalize" role="none">
                                            {loginUserDetail?.name}<Badge className='ml-2 text-[10px]' value={loginUserDetail?.role}/>
                                        </p>
                                        <p className="text-sm font-medium text-gray-900 truncate dark:text-gray-300" role="none">
                                            {loginUserDetail?.email}
                                        </p>
                                    </div>
                                    <ul className="py-1" role="none">
                                        {
                                            AccessControl[userRole]?.navLinks.map((items: any, index: any) => {
                                                return (
                                                    <li key={index}>
                                                        <Link to={`${items.navLink}`} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-600 dark:hover:text-white">
                                                            {items.navName}
                                                        </Link>
                                                    </li>
                                                )
                                            })
                                        }
                                        <li className="block cursor-pointer flex justify-start items-center px-4 py-2 text-sm text-gray-700 dark:text-gray-300 dark:hover:bg-gray-600 dark:hover:text-white hover:bg-[#ff00000a] text-[#ff0000]">
                                            <IoIosLogOut size={20} />
                                            <div className='ml-2' onClick={logoutUser}>Logout</div>
                                        </li>
                                    </ul>
                                </div>
                            }
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    )
}

export default TopbarLayout;
