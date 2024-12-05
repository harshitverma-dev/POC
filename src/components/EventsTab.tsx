// import { Button } from 'primereact/button';
import React, { useContext, useEffect} from 'react'
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
    const { toggleEventTabs, setToggleEventTabs, activeMainTab, setActiveMainTab, activeEventSubTab, setEventSubTab } = context;
    const navigate = useNavigate();
    const location = useLocation();
    const toggleMyEventsTabs = () => {
        setToggleEventTabs(!toggleEventTabs);
        navigate('/my-events')

    }
    console.log(location)
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
            <ul className='flex justify-start items-center'>
                <Link to={'/'} className={`border border-solid border-[#B1D4DF] rounded-[15px] px-4 py-2 mr-2 cursor-pointer ${activeMainTab == 'Upcoming Events' ? 'bg-[#B1D4DF]' : 'bg-[#fff]'}`} onClick={() => { setActiveMainTab('Upcoming Events') }}>Upcoming Events</Link>
                <li className={`border text-[#000] border-solid border-[#B1D4DF] rounded-[15px] px-4 py-2 mr-2 cursor-pointer ${activeMainTab == 'My Events' ? 'bg-[#B1D4DF]' : 'bg-[#fff]'}`} onClick={toggleMyEventsTabs}>
                    My Events
                </li>
                {toggleEventTabs && <HiArrowLongRight className='mr-2' />}
                {
                    toggleEventTabs && <ul className='flex justify-start items-center'>
                        <li className={`border border-solid border-[#B1D4DF] rounded-[15px] px-3 py-1 mr-2 cursor-pointer ${activeEventSubTab == 'To Attend' ? 'bg-[#B1D4DF]' : 'bg-[#fff]'}`} onClick={toAttendedTab} >To Attend</li>
                        <li className={`border border-solid border-[#B1D4DF] rounded-[15px] px-3 py-1 mr-2 cursor-pointer ${activeEventSubTab == 'To Present' ? 'bg-[#B1D4DF]' : 'bg-[#fff]'}`} onClick={toPresentTab}>To Present</li>
                        <li className={`border border-solid border-[#B1D4DF] rounded-[15px] px-3 py-1 cursor-pointer ${activeEventSubTab == 'Presented' ? 'bg-[#B1D4DF]' : 'bg-[#fff]'}`} onClick={PresentedTab}>Presented</li>
                    </ul>
                }

            </ul>
        </div>
    )
}

export default EventsTab;
