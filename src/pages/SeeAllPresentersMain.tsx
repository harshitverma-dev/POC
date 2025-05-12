import React, { useContext, useEffect } from 'react'
// import { RightSideType } from '../interface/EventInterface';
import RightSideCard from '../components/RightSideCard';
// import EventsTab from '../components/EventsTab';
import { Button } from 'primereact/button';
import PresentersCard from '../components/PresentersCard';
import { useNavigate } from 'react-router-dom';
import { ProductContextData } from '../context/ContextData';
// import PresentersListSkeleton from '../skeletons/PresentersListSkeleton';
// import { userPresentersI } from '../interface/Presenters';
// import { Dialog } from 'primereact/dialog';
// import { Avatar } from 'primereact/avatar';
// import { Chip } from 'primereact/chip';

// import { Badge } from 'primereact/badge';
import PresenterDetailPopup from '../components/PresenterDetailPopup';
// import RightSideCardSkeleton from '../skeletons/RightSideCardSkeleton';
// import { Messages } from 'primereact/messages';
import { Message } from 'primereact/message';
import LoginForm from '../components/LoginForm';
// import Spinner from '../components/Spinner';


const SeeAllPresentersMain: React.FC = () => {
    const context = useContext(ProductContextData);
    if (!context) {
        throw new Error('it should not be null');
    }
    const { getAllPresentersDataByApi, appLoader, storeAllPresenters, loginUserDetail, storeAllUpcomingEvents, getAllUpcomingEventsDataByApi, logInPopupValue, setLoginPopupValue } = context;
    const navigate = useNavigate()

    useEffect(() => {
        getAllPresentersDataByApi();
        getAllUpcomingEventsDataByApi();
    }, [])

    const handleFunctionforEventsShow = () =>{
        let checkIfUserLoginOrNot = localStorage.getItem('userAccessToken');
        checkIfUserLoginOrNot ? navigate('/upcoming-events') : setLoginPopupValue(true);
        // navigate('/upcoming-events')
        // setLoginPopupValue(true);
    }


    // const headerElementForPopup = (
    //     <div className="inline-flex items-center justify-content-center gap-2">
    //         <Avatar label={String(presentersDetailsPopup?.name.split(' ')[0]).slice(0, 1).toUpperCase() + String(presentersDetailsPopup?.name.split(' ')[1]).slice(0, 1).toUpperCase()} size="large" shape="circle" />
    //         <div className='flex flex-col'>
    //             <span className='flex items-center'>
    //                 <span className="capitalize font-bold white-space-nowrap text-[22px]">{presentersDetailsPopup?.name}</span>
    //                 <Badge className='ml-2' value={presentersDetailsPopup?.role} severity="contrast" />
    //             </span>
    //             <span className='text-[15px] font-medium text-[#ababab]'>{presentersDetailsPopup?.email}</span>
    //         </div>
    //     </div>
    // );
    
    return (
        <>
            <div className='flex flex-col md:flex-row gap-3 w-full items-start'>
                <div className='w-[100%] md:w-[65%] lg:w-[70%] xl:w-[75%] 2xl:w-4/5'>
                    {/* <EventsTab /> */}
                    <div className='grid grid-cols-2 2xl:grid-cols-3 gap-3 bg-white p-4 rounded-[15px_15px_0_0] thin-scrollbar-presenter'>
                        {
                            appLoader ? <div>Data is beening loaded ...</div> : (storeAllPresenters !== null && storeAllPresenters?.length > 0) ? storeAllPresenters?.map((items, index) => {
                                return (
                                    <div className='mainCard border-solid border border-[#e6e6e6] rounded-[20px] p-2 md:p-3' key={index}>
                                        <PresentersCard
                                            // key={index}
                                            presentersData={items}
                                            index={index} />
                                    </div >
                                )
                            }) : <div className='no-data text-[13px] md:text-[15px]'>No Presenter Avaliable.</div>
                        }
                    </div>
                </div>
                <div className='w-[100%] md:w-[35%] lg:w-[30%] xl:w-[25%] 2xl:w-1/5 pt-[13px] pb-0 pl-[13px] pr-[5px]  bg-white rounded-[15px_15px_15px_15px]'>
                    <div className='flex flex-row md:flex-col gap-3 thin-scrollbar pb-3 md:pb-0'>
                        {
                            appLoader ?
                                <div>Data is beening loaded ...</div> : storeAllUpcomingEvents.length > 0 ? storeAllUpcomingEvents?.map((items) => {
                                    return (
                                        <div className='mainCard rightCardContainer min-w-[60%] md:w-[100%] border-solid border border-[#e6e6e6] rounded-[20px] p-3'>
                                            <RightSideCard rightSideData={items} />
                                        </div>
                                    )
                                }) : (loginUserDetail && localStorage.getItem('userAccessToken')) ? <div className='no-data text-[13px] md:text-[15px]'>No Events Avaliable.</div> : <Message className='flex w-full justify-start' severity="info" text="Login to see the Events." />

                        }
                    </div>
                    <div className='flex justify-end py-0 md:py-2'>
                        <Button className='!px-0 pb-0 text-[14px] md:text-[15px]' label="See All Events" iconPos='right' icon='pi pi-angle-double-right' link onClick={handleFunctionforEventsShow} />
                    </div>
                </div>
            </div>
            {/* <Dialog header={headerElementForPopup} visible={presentersDetailsPopupValue} onHide={() => { if (!presentersDetailsPopupValue) return; setPresentersDetailsPopupValue(false); setPresentersDetailsPopup(null) }} style={{ width: '50vw' }} >
                <p className="m-0 pb-3">
                    <span className='font-bold'>About:- </span>
                    {presentersDetailsPopup?.introduction}
                </p>
                {
                    (presentersDetailsPopup?.techExpertise !== undefined && presentersDetailsPopup?.techExpertise.length > 0)  && <p className="m-0">
                    <span className='font-bold'>Skills:- </span>
                    {
                        presentersDetailsPopup?.techExpertise.map((items) => <Chip className='mr-2 text-[14px]' label={items}/>)
                    }
                </p>
                }
                
            </Dialog> */}
            <PresenterDetailPopup />
            {logInPopupValue && <LoginForm />}
        </>
    )
}

export default SeeAllPresentersMain
