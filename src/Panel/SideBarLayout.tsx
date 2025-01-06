import React, { useContext, useState } from 'react'
// import { HiOutlineHome } from "react-icons/hi2";
// import { IoAddCircleOutline } from "react-icons/io5";
// import { BsBookmarks } from "react-icons/bs";
import { FiFilter } from "react-icons/fi"; 
import { IoHomeOutline } from "react-icons/io5";
import { LiaMailBulkSolid } from "react-icons/lia";
import { Dialog } from 'primereact/dialog';
import { Dropdown } from 'primereact/dropdown';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { Link } from 'react-router-dom';
import { ProductContextData } from '../context/ContextData';


const SideBarLayout: React.FC = () => {
    const context = useContext(ProductContextData);
    if (!context) {
        throw new Error('it should not be null');
    }
    const {isFilterForm, setIsFilterForm} = context;
    const [selectedCity, setSelectedCity] = useState(null);
    const cities = [
        { name: 'New York', code: 'NY' },
        { name: 'Rome', code: 'RM' },
        { name: 'London', code: 'LDN' },
        { name: 'Istanbul', code: 'IST' },
        { name: 'Paris', code: 'PRS' }
    ];
    const sidebarItems = [
        {
            navName: "Dashboard",
            navIcon: <IoHomeOutline size={35} color='#3a3a3a' />,
            navLink: '/',
            onClick: () => setIsFilterForm(false)
        },
        // {
        //     navName: "Filters",
        //     navIcon: <FiFilter size={35} color='#3a3a3a' />,
        //     onClick: () => setIsFilterForm(!isFilterForm)
        // },
        // {
        //     navName: "Add Product",
        //     navIcon: <LiaMailBulkSolid size={35} color='#3a3a3a' />,
        //     onClick: () => setIsFilterForm(false)
        // }
    ]
    return (
        <>
            <aside id="logo-sidebar" className="fixed top-0 left-0 z-40 w-20 h-screen pt-20 transition-transform -translate-x-full bg-white border-r border-gray-200 sm:translate-x-0 dark:bg-gray-800 dark:border-gray-700" aria-label="Sidebar">
                <div className="h-full px-3 pb-4 bg-white dark:bg-gray-800 flex justify-center">
                    <ul className="space-y-2 font-medium">
                        {
                            sidebarItems?.map((items, index) => {
                                return (
                                    items.navLink ?
                                        <li key={index} onClick={items.onClick} className='py-2 px-2 cursor-pointer hover:bg-[#f3f3f3] rounded-full'>
                                            <Link to={`${items.navLink}`}>
                                                {items.navIcon}
                                            </Link>
                                        </li> :
                                        <li key={index} onClick={items.onClick} className='py-2 px-2 cursor-pointer hover:bg-[#f3f3f3] rounded-full'>
                                            {items.navIcon}
                                        </li>
                                )
                            })
                        }
                    </ul>
                </div>
            </aside>
            {
                isFilterForm && <Dialog header="Header" draggable={false} visible={isFilterForm} style={{ width: '30vw' }} onHide={() => { if (!isFilterForm) return; setIsFilterForm(false); }}>
                    <p className="m-0">
                        <Dropdown value={selectedCity} onChange={(e) => setSelectedCity(e.value)} options={cities} optionLabel="name"
                            placeholder="Select a City" className="w-full md:w-14rem mb-3" checkmark={true} highlightOnSelect={false} />
                        <Dropdown value={selectedCity} onChange={(e) => setSelectedCity(e.value)} options={cities} optionLabel="name"
                            placeholder="Select a City" className="w-full md:w-14rem mb-3" checkmark={true} highlightOnSelect={false} />
                        <InputText type="text" placeholder="Normal" className="p-inputtext-sm w-full mb-3"/>
                        <div className='text-center'>
                            <Button label="Apply Filters" outlined rounded />
                        </div>
                    </p>
                </Dialog>

            }
        </>
    )
}

export default SideBarLayout;
