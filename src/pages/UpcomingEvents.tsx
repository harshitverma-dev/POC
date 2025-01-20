import React, { useContext, useEffect } from 'react'
import EventCard from '../components/EventCard';
// import { EventType, RightSideType } from '../interface/EventInterface';
import RightSideCard from '../components/RightSideCard';
import EventsTab from '../components/EventsTab';
import { Button } from 'primereact/button';
import { Link } from 'react-router-dom';
import { ProductContextData } from '../context/ContextData';
// import RightSideCardSkeleton from '../skeletons/RightSideCardSkeleton';
import LoginForm from '../components/LoginForm';
// import PresentersListSkeleton from '../skeletons/PresentersListSkeleton';
import LogInImg from '../assets/loginImg.gif'
import { Image } from 'primereact/image';
// import { ProgressSpinner } from 'primereact/progressspinner';
// import Spinner from '../components/Spinner';
import { Paginator } from 'primereact/paginator';
import InitateForgetPasswordForm from '../components/IniateForgetPasswordForm';
import PresenterDetailPopup from '../components/PresenterDetailPopup';
// import Spinner from '../components/Spinner';
// import EventRatingPopup from '../components/EventRatingPopup';


const UpcomingEvents: React.FC = () => {
    const context = useContext(ProductContextData);
    if (!context) {
        throw new Error('it should not be null');
    }
    const { getAllPresentersDataByApi, appLoader, storeAllPresenters, getAllUpcomingEventsDataByApi, loginUserDetail, storeAllUpcomingEvents, setLoginPopupValue, logInPopupValue, limitForUpcomingEvents, skipForUpcomingEvents, storeLengthOfUpcomingEvents, onPageChangeForUpcoming, initateForgetPasswordPopupValue, setInitateForgetPasswordPopupValue } = context;

    useEffect(() => {
        getAllPresentersDataByApi();
        getAllUpcomingEventsDataByApi();
        // console.log(storeAllPresenters)
    }, [])




    return (
        <div className='flex flex-col md:flex-row gap-3 w-full items-start'>
            <div className='w-[100%] md:w-[65%] lg:w-[70%] xl:w-[75%] 2xl:w-4/5'>
                {
                    loginUserDetail && localStorage.getItem('userAccessToken') && <div>
                        <EventsTab />
                        <div className='grid grid-cols-3 gap-3 bg-white p-4 rounded-[15px_15px_0_0]'>
                            {
                                appLoader ? <div>Data is beening loaded ...</div> : (storeAllUpcomingEvents && storeAllUpcomingEvents.length > 0) ? storeAllUpcomingEvents.map((items, index) => {
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
                        <div>
                            <Image src={LogInImg} className='w-[100%] h-[100%]' style={{ marginBottom: '-60px' }} loading='lazy' />
                        </div>
                        <div className='flex items-center justify-center'>
                            <Button icon='pi pi-sign-in' className='mt-4 mb-6' label='Login' onClick={() => { setLoginPopupValue(true) }} />
                            <Button label="Reset Password" link onClick={() => { setInitateForgetPasswordPopupValue(true) }} />
                        </div>
                    </div>
                }
            </div>
            <div className='w-[100%] md:w-[35%] lg:w-[30%] xl:w-[25%] 2xl:w-1/5 pt-[13px] pb-0 pl-[13px] pr-[5px]  bg-white rounded-[15px_15px_15px_15px]'>
                <div className='flex flex-row md:flex-col gap-3 thin-scrollbar pb-3 md:pb-0'>
                    {
                        appLoader ? <div>Data is beening loaded ...</div> : (storeAllPresenters !== null && storeAllPresenters.length > 0) ? storeAllPresenters?.map((items, index) => {
                            return (
                                <div className='mainCard rightCardContainer min-w-[60%] md:w-[100%] border-solid border border-[#e6e6e6] rounded-[20px] p-3' key={index}>
                                    <RightSideCard rightSideData={items} />
                                </div>
                            )
                        }
                        ) : <div className='no-data'>No Presenter Avaliable.</div>
                    }
                </div>
                <div className='flex justify-end py-0 md:py-2'>
                    <Link to="/presenters-list" className='flex justify-start items-center'>
                        <Button className='!px-0 pb-0' iconPos='right' icon='pi pi-angle-double-right' label="See All Presenters" link />
                        {/* <i className='pi pi-angle-double-right'/> */}
                    </Link>
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
