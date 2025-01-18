import React, { useContext, useEffect } from 'react'
import EventCard from '../components/EventCard';
// import { EventType, RightSideType } from '../interface/EventInterface';
import RightSideCard from '../components/RightSideCard';
import EventsTab from '../components/EventsTab';
import { Button } from 'primereact/button';
import { Link } from 'react-router-dom';
import { ProductContextData } from '../context/ContextData';
import RightSideCardSkeleton from '../skeletons/RightSideCardSkeleton';
import LoginForm from '../components/LoginForm';
import PresentersListSkeleton from '../skeletons/PresentersListSkeleton';
import LogInImg from '../assets/loginImg.gif'
import { Image } from 'primereact/image';
// import { ProgressSpinner } from 'primereact/progressspinner';
// import Spinner from '../components/Spinner';
import { Paginator } from 'primereact/paginator';
import InitateForgetPasswordForm from '../components/IniateForgetPasswordForm';
import PresenterDetailPopup from '../components/PresenterDetailPopup';
import EventRatingPopup from '../components/EventRatingPopup';


const UpcomingEvents: React.FC = () => {
    const context = useContext(ProductContextData);
    if (!context) {
        throw new Error('it should not be null');
    }
    const { getAllPresentersDataByApi, storeAllPresenters, getAllUpcomingEventsDataByApi, loginUserDetail, storeAllUpcomingEvents, setLoginPopupValue, logInPopupValue, isStoreAllUpcomingEventsLoader, limitForUpcomingEvents, skipForUpcomingEvents, storeLengthOfUpcomingEvents, onPageChangeForUpcoming, initateForgetPasswordPopupValue, setInitateForgetPasswordPopupValue } = context;

    useEffect(() => {
        getAllPresentersDataByApi();
        getAllUpcomingEventsDataByApi();
        // console.log(storeAllPresenters)
    }, [])




    return (
        <div className='flex gap-3 w-full'>
            <div className='w-4/5'>
                {
                    loginUserDetail && localStorage.getItem('userAccessToken') && <div>
                        <EventsTab />
                        <div className='grid grid-cols-3 gap-3 bg-white p-4 rounded-[15px_15px_0_0]'>
                            {
                                isStoreAllUpcomingEventsLoader ? <PresentersListSkeleton /> : (storeAllUpcomingEvents && storeAllUpcomingEvents.length > 0) ? storeAllUpcomingEvents.map((items, index) => {
                                    return (
                                        <div className='mainCard border-solid border border-[#e6e6e6] rounded-[20px] p-3' key={index}>
                                            <EventCard
                                                eventData={items}
                                                index={index}
                                                eventDetails="Upcoming Events" />
                                        </div >
                                    )
                                }) : <div className='no-data'>No Upcoming Events Avaliable.</div>
                            }
                        </div>
                        {
                            storeAllUpcomingEvents.length > 0 && <div className='rounded-[0_0_15px_15px]'>
                                <Paginator className='rounded-[0_0_15px_15px]' first={skipForUpcomingEvents} rows={limitForUpcomingEvents} totalRecords={storeLengthOfUpcomingEvents} rowsPerPageOptions={[6, 12, 18]} onPageChange={onPageChangeForUpcoming} />
                            </div>
                        }

                    </div>
                }
                {
                    !loginUserDetail && !localStorage.getItem('userAccessToken') && <div className='flex flex-col items-center bg-[#fff] rounded-[20px]'>
                        <div style={{ minWidth: '500px', maxWidth: '500px' }}>
                            <Image src={LogInImg} className='w-[100%] h-[100%]' style={{ marginBottom: '-60px' }} loading='lazy' />
                        </div>
                        <div className='flex items-center justify-center'>
                            <Button icon='pi pi-sign-in' className='mt-4 mb-6' label='Login to the Application' onClick={() => { setLoginPopupValue(true) }} />
                            <Button label="Forget Password" link onClick={() => { setInitateForgetPasswordPopupValue(true) }} />
                        </div>
                    </div>
                }
            </div>
            <div className='w-1/5 flex flex-col gap-3 p-[13px] thin-scrollbar bg-white rounded-[15px_15px_15px_15px]'>
                <div className=' sticky top-0'>
                    {
                        (storeAllPresenters !== null && storeAllPresenters.length > 0) ? storeAllPresenters?.map((items, index) => {
                            return (
                                <div className='mainCard rightCardContainer border-solid border border-[#e6e6e6] rounded-[20px] p-3 mb-3' key={index}>
                                    <RightSideCard rightSideData={items} />
                                </div>
                            )
                        }
                        ) : <RightSideCardSkeleton />
                    }
                    <div className='flex justify-end'>
                        <Link to="/presenters-list" className='flex justify-start items-center'>
                            <Button className='px-0 pb-0' iconPos='right' icon='pi pi-angle-double-right' label="See all Presenters" link />
                            {/* <i className='pi pi-angle-double-right'/> */}
                        </Link>
                    </div>
                </div>
            </div>
            {logInPopupValue && <LoginForm />}
            {initateForgetPasswordPopupValue && <InitateForgetPasswordForm />}
            <PresenterDetailPopup />
            {/* {loginUserDetail?.role === 'STUDENT' && <EventRatingPopup />} */}
            {/* <ProgressSpinner style={{width: '50px', height: '50px'}} strokeWidth="8" fill="var(--surface-ground)" animationDuration=".5s" /> */}
        </div>
    )
}


export default UpcomingEvents;
