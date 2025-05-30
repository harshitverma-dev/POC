import React, { useContext, useState } from 'react'
// import { HiOutlineHome } from "react-icons/hi2";
// import { IoAddCircleOutline } from "react-icons/io5";
// import { BsBookmarks } from "react-icons/bs";
import { FiFilter } from "react-icons/fi";
import { IoHomeOutline } from "react-icons/io5";
// import { LiaMailBulkSolid } from "react-icons/lia";
import { Dialog } from 'primereact/dialog';
import { Dropdown } from 'primereact/dropdown';
// import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { Link } from 'react-router-dom';
import { ProductContextData } from '../context/ContextData';
import { IndustryList, SegmentList } from '../interface/IndustryAndSegment';
import { TabPanel, TabView } from 'primereact/tabview';


const SideBarLayout: React.FC = () => {
    const context = useContext(ProductContextData);
    if (!context) {
        throw new Error('it should not be null');
    }
    const [activeIndex, setActiveIndex] = useState<number>(0);
    const { isFilterForm, setIsFilterForm, filterFields, setFilterFields, applyFilterData, removeFilter, loginUserDetail, toggleSidebar } = context;

    // const [selectedCity, setSelectedCity] = useState(null);
    // const cities = [
    //     { name: 'New York', code: 'NY' },
    //     { name: 'Rome', code: 'RM' },
    //     { name: 'London', code: 'LDN' },
    //     { name: 'Istanbul', code: 'IST' },
    //     { name: 'Paris', code: 'PRS' }
    // ];
    const sidebarItems = [
        {
            navName: "Dashboard",
            navIcon: <IoHomeOutline size={35} color='#5e5e5e' />,
            navLink: '/',
            onClick: () => setIsFilterForm(false)
        },
        {
            navName: "Filters",
            navIcon: <FiFilter size={35} color='#5e5e5e' />,
            onClick: () => setIsFilterForm(!isFilterForm)
        },
        // {
        //     navName: "Add Product",
        //     navIcon: <LiaMailBulkSolid size={35} color='#3a3a3a' />,
        //     onClick: () => setIsFilterForm(false)
        // }
    ]

    const filterOnChange = (e: any) => {
        const { name, value } = e.target;
        setFilterFields({
            ...filterFields,
            [name]: value
        })
    }


    return (
        <>
            <aside className={`fixed top-0 left-0 z-40 w-20 h-screen pt-20 transition-transform bg-white ${toggleSidebar ? 'translate-x-0 shadow-xl' : '-translate-x-full shadow'
                } sm:translate-x-0`} aria-label="Sidebar">
                <div className="h-full px-3 pb-4 bg-white dark:bg-gray-800 flex justify-center">
                    <ul className="space-y-2 font-medium">
                        {
                            sidebarItems?.map((items, index) => {
                                return (
                                    (loginUserDetail && localStorage.getItem('userAccessToken')) ?
                                        items.navLink ?
                                            <li key={index} onClick={items.onClick} className='py-2 px-2 cursor-pointer hover:bg-[#f3f3f3] rounded-full'>
                                                <Link to={`${items.navLink}`}>
                                                    {items.navIcon}
                                                </Link>
                                            </li> :
                                            <li key={index} onClick={items.onClick} className='py-2 px-2 cursor-pointer hover:bg-[#f3f3f3] rounded-full'>
                                                {items.navIcon}
                                            </li> : null

                                )
                            })
                        }
                    </ul>
                </div>
            </aside>
            {
                isFilterForm && <Dialog position={'top'} draggable={false} header="Filter" visible={isFilterForm} className='w-full md:max-w-[40vw]' onHide={() => { if (!isFilterForm) return; setIsFilterForm(false); }}>
                    <div className="flex mb-2 gap-2 justify-content-end">
                        <Button onClick={() => setActiveIndex(0)} className="w-2rem h-2rem p-0" rounded outlined={activeIndex !== 0} label="Add Event Filter" />
                        <Button onClick={() => setActiveIndex(1)} className="w-2rem h-2rem p-0" rounded outlined={activeIndex !== 1} label="Add Presenter Filter" />
                    </div>

                    <TabView activeIndex={activeIndex} onTabChange={(e) => setActiveIndex(e.index)}>
                        <TabPanel header="Select Event Filter">
                            <p className="m-0">
                                <div className="flex flex-wrap flex-col items-start justify-start mb-3 gap-2">
                                    <label htmlFor="eventPrerequisite" className="">Industry:</label>
                                    <Dropdown filter value={filterFields.industry} name='industry' onChange={filterOnChange} options={IndustryList}
                                        placeholder="Select Industry" className="w-full md:w-14rem mb-3" highlightOnSelect={false} />
                                </div>
                                <div className="flex flex-wrap flex-col items-start justify-start mb-3 gap-2">
                                    <label htmlFor="eventPrerequisite" className="">Segment:</label>
                                    <Dropdown filter value={filterFields.segment} name='segment' onChange={filterOnChange} options={SegmentList[filterFields?.industry ?? ''] || []}
                                        placeholder="Select Segement" className="w-full md:w-14rem mb-3" highlightOnSelect={false} />
                                </div>

                                {/* placeholder="Select a City" className="w-full md:w-14rem mb-3" highlightOnSelect={false} /> */}
                                {/* <InputText type="text" placeholder="Normal" className="p-inputtext-sm w-full mb-3" /> */}
                                <div className='text-center'>
                                    <Button label="Apply Filters" className='mr-3 text-[13px] md:text-[15px]' outlined rounded onClick={applyFilterData} />
                                    <Button label="Remove Filters" className='text-[13px] md:text-[15px]' outlined rounded onClick={()=>removeFilter('eventFilter')} />
                                </div>
                            </p>
                        </TabPanel>
                        <TabPanel header="Select Presenter Filter">
                            <p className="m-0">
                                <div className="flex flex-wrap flex-col items-start justify-start mb-3 gap-2">
                                    <label htmlFor="eventPrerequisite" className="">Industry:</label>
                                    <Dropdown filter value={filterFields.presenterIndustry} name='presenterIndustry' onChange={filterOnChange} options={IndustryList}
                                        placeholder="Select Industry" className="w-full md:w-14rem mb-3" highlightOnSelect={false} />
                                </div>
                                <div className="flex flex-wrap flex-col items-start justify-start mb-3 gap-2">
                                    <label htmlFor="eventPrerequisite" className="">Segment:</label>
                                    <Dropdown filter value={filterFields.presenterSegment} name='presenterSegment' onChange={filterOnChange} options={SegmentList[filterFields?.presenterIndustry ?? ''] || []}
                                        placeholder="Select Segement" className="w-full md:w-14rem mb-3" highlightOnSelect={false} />
                                </div>

                                {/* placeholder="Select a City" className="w-full md:w-14rem mb-3" highlightOnSelect={false} /> */}
                                {/* <InputText type="text" placeholder="Normal" className="p-inputtext-sm w-full mb-3" /> */}
                                <div className='text-center'>
                                    <Button label="Apply Filters" className='mr-3 text-[13px] md:text-[15px]' outlined rounded onClick={applyFilterData} />
                                    <Button label="Remove Filters" className='text-[13px] md:text-[15px]' outlined rounded onClick={()=>removeFilter('presenterFilter')} />
                                </div>
                            </p>
                        </TabPanel>
                    </TabView>
                </Dialog>

            }
        </>
    )
}

export default SideBarLayout;
