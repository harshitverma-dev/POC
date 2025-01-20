// import { Button } from 'primereact/button';
import React, { useContext, useEffect } from 'react'
import { Link } from 'react-router-dom';
import { useNavigate, useLocation } from 'react-router-dom';
import { HiArrowLongRight } from "react-icons/hi2";
import { ProductContextData } from '../context/ContextData';

const EventsTab: React.FC = () => {
    // const [toggleEventTabs, setToggleEventTabs] = useState(false);
    // const [activeMainTab, setActiveMainTab] = useState('');
    // const [activeEventSubTab, setEventSubTab] = useState('');
    const context = useContext(ProductContextData);
    if (!context) {
        throw new Error('it should not be null');
    }
    const { toggleEventTabs, setToggleEventTabs, activeMainTab, setActiveMainTab, activeEventSubTab, setEventSubTab, loginUserDetail } = context;
    const navigate = useNavigate();
    const location = useLocation();
    const toggleMyEventsTabs = () => {
        setToggleEventTabs(!toggleEventTabs);
        navigate('/my-events')

    }
    // console.log(location)
    const toAttendedTab = () => {
        setEventSubTab('To Attend');
    }
    const toPresentTab = () => {
        setEventSubTab('To Present')
    }
    const PresentedTab = () => {
        setEventSubTab('Presented');
    }
    useEffect(() => {
        if (location.pathname === '/my-events') {
            setActiveMainTab('My Events');
            setToggleEventTabs(true)
        } else if (location.pathname === '/' || location.pathname === '/upcoming-events') {
            setActiveMainTab('Upcoming Events');
            setToggleEventTabs(false)
        }
    }, [location.pathname]);
    return (
        <div className='mb-5 flex'>
            <ul className='flex justify-start items-center text-[14px] md:text-[16px] w-[100%] flex-wrap gap-2'>
                <div className='flex justify-start items-center'>
                    <Link to={'/'} className={`border border-solid border-[#e6e6e6] rounded-[15px] px-4 py-2 mr-2 cursor-pointer ${activeMainTab == 'Upcoming Events' ? 'bg-[#e6e6e6]' : 'bg-[#fff]'}`} onClick={() => { setActiveMainTab('Upcoming Events') }}>Upcoming Events</Link>
                    <li className={`border text-[#000] border-solid border-[#e6e6e6] rounded-[15px] px-4 py-2 mr-2 cursor-pointer ${activeMainTab == 'My Events' ? 'bg-[#e6e6e6]' : 'bg-[#fff]'}`} onClick={toggleMyEventsTabs}>
                        My Events
                    </li>
                    {toggleEventTabs && <HiArrowLongRight className='mr-2' />}
                </div>
                
                {
                    toggleEventTabs && <ul className='flex justify-start items-center'>
                        <li className={`border border-solid border-[#e6e6e6] rounded-[15px] px-3 py-1 mr-2 cursor-pointer ${activeEventSubTab == 'To Attend' ? 'bg-[#e6e6e6]' : 'bg-[#fff]'}`} onClick={toAttendedTab} >To Attend</li>
                        {
                            loginUserDetail.role !== 'STUDENT' && loginUserDetail.role !== 'SUBADMIN' && (
                                <>
                                    <li className={`border border-solid border-[#e6e6e6] rounded-[15px] px-3 py-1 mr-2 cursor-pointer ${activeEventSubTab == 'To Present' ? 'bg-[#e6e6e6]' : 'bg-[#fff]'}`} onClick={toPresentTab}>To Present</li>
                                    <li className={`border border-solid border-[#e6e6e6] rounded-[15px] px-3 py-1 cursor-pointer ${activeEventSubTab == 'Presented' ? 'bg-[#e6e6e6]' : 'bg-[#fff]'}`} onClick={PresentedTab}>Presented</li>
                                </>
                            )
                        }

                    </ul>
                }

            </ul>
        </div>
    )
}

export default EventsTab;
