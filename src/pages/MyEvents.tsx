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
import LogInImg from '../assets/loginImg.gif'
import { Image } from 'primereact/image';
// import PresentersListSkeleton from '../skeletons/PresentersListSkeleton';
import { Paginator } from 'primereact/paginator';
import InitateForgetPasswordForm from '../components/IniateForgetPasswordForm';
import PresenterDetailPopup from '../components/PresenterDetailPopup';
// import Spinner from '../components/Spinner';

const MyEvents: React.FC = () => {
    const context = useContext(ProductContextData);
    if (!context) {
        throw new Error('it should not be null');
    }
    const { activeEventSubTab, getAllPresentersDataByApi, loginUserDetail, storeAllPresenters, storeAllToAttendEvents, getAllToAttendEventsDataByApi, getAllUpcomingEventsDataByApi, logInPopupValue, setLoginPopupValue, storeAllUpcomingEvents, getAllPastEventsDataByApi, storeAllPastEvents, skipForUpcomingEvents, storeLengthOfUpcomingEvents, onPageChangeForUpcoming, limitForUpcomingEvents, skipForPastEvents, limitForPastEvents, storeLengthOfPastEvents, setLimitForPastEvent, setSkipForPastEvent, appLoader, initateForgetPasswordPopupValue, setInitateForgetPasswordPopupValue } = context;

    const CONTACT_EMAIL = 'tt@timetappers.com';

    useEffect(() => {
        getAllPresentersDataByApi();
        getAllUpcomingEventsDataByApi();
        getAllPastEventsDataByApi();
        getAllToAttendEventsDataByApi()
        // console.log(storeAllPresenters)
    }, [])


    const onPageChangeForPast = (event: any) => {
        setLimitForPastEvent(event.rows);
        setSkipForPastEvent(event.first)
    }

    useEffect(() => {
        getAllPastEventsDataByApi();
    }, [limitForPastEvents, skipForPastEvents])
    return (
        <div className='flex flex-col md:flex-row gap-3 w-full items-start'>
            <div className='w-[100%] md:w-[65%] lg:w-[70%] xl:w-[75%] 2xl:w-4/5'>
                {
                    loginUserDetail && localStorage.getItem('userAccessToken') && <div>
                        <EventsTab />
                        <div className='grid grid-cols-2 2xl:grid-cols-3 gap-3 bg-white p-4 rounded-[15px_15px_0_0]'>
                            {

                                activeEventSubTab === 'To Attend' ?
                                    appLoader ?
                                        <div>Data is beening loaded ...</div> :
                                        (storeAllToAttendEvents && storeAllToAttendEvents.length > 0) ? storeAllToAttendEvents?.map((items, index) => {
                                            return (
                                                <div
                                                    key={index}
                                                    className='mainCard border-solid border border-[#e6e6e6] rounded-[20px] p-3'
                                                >
                                                    <EventCard
                                                        eventData={items}
                                                        index={index}
                                                        eventDetails={activeEventSubTab}
                                                    />
                                                </div>
                                            )
                                        }) : <div className='no-data text-[13px] md:text-[15px]'>No Events Avaliable.</div>

                                    : activeEventSubTab === 'To Present' ?
                                        appLoader ?
                                            <div>Data is beening loaded ...</div> :
                                            (storeAllUpcomingEvents && storeAllUpcomingEvents.length > 0) ? storeAllUpcomingEvents?.map((items, index) => {
                                                return (
                                                    <div
                                                        key={index}
                                                        className='mainCard border-solid border border-[#e6e6e6] rounded-[20px] p-3'
                                                    >
                                                        <EventCard
                                                            eventData={items}
                                                            index={index}
                                                            eventDetails={activeEventSubTab}
                                                        />
                                                    </div>
                                                )
                                            }) : <div className='no-data text-[13px] md:text-[15px]'>No Events Avaliable.</div>
                                        : activeEventSubTab === 'Presented' ?
                                            appLoader ?
                                                <div>Data is beening loaded ...</div> :
                                                (storeAllPastEvents && storeAllPastEvents.length > 0) ? storeAllPastEvents?.map((items, index) => {
                                                    return (
                                                        <div
                                                            key={index}
                                                            className='mainCard border-solid border border-[#e6e6e6] rounded-[20px] p-3'
                                                        >
                                                            <EventCard
                                                                eventData={items}
                                                                index={index}
                                                                eventDetails={activeEventSubTab}
                                                            />
                                                        </div>
                                                    )
                                                }
                                                ) : <div className='no-data text-[13px] md:text-[15px]'>No Events Avaliable.</div> : null
                            }

                        </div>
                        {
                            // <>
                            (activeEventSubTab === 'To Present' && storeAllUpcomingEvents.length > 0) && <div className='rounded-[0_0_15px_15px]'>
                                <Paginator className='rounded-[0_0_15px_15px]' first={skipForUpcomingEvents} rows={limitForUpcomingEvents} totalRecords={storeLengthOfUpcomingEvents} rowsPerPageOptions={[6, 12, 18]} onPageChange={onPageChangeForUpcoming} />
                            </div>
                        }
                        {
                            (activeEventSubTab === 'Presented' && storeAllPastEvents.length > 0) && <div className='rounded-[0_0_15px_15px]'>
                                <Paginator className='rounded-[0_0_15px_15px]' first={skipForPastEvents} rows={limitForPastEvents} totalRecords={storeLengthOfPastEvents} rowsPerPageOptions={[6, 12, 18]} onPageChange={onPageChangeForPast} />
                            </div>
                        }

                    </div>
                }
                {
                    !loginUserDetail && !localStorage.getItem('userAccessToken') && <div className='flex flex-col items-center bg-[#fff] rounded-[20px]'>
                        <div className='flex justify-around items-center'>
                            <h2 className='text-[30px] w-[55%] text-[#5e5e5e] pl-[50px]'>It's a member only platform, if you wish to associate please write to us at  <a href={`mailto:${CONTACT_EMAIL}`} className="text-[#06b6d4] hover:underline">
                                {CONTACT_EMAIL}
                            </a>, do not forget to attach your CV!</h2>
                            <div className='loginImgContainer w-[45%]'><Image src={LogInImg} className='w-[100%]' style={{ marginBottom: '-60px' }} loading='lazy' /></div>
                        </div>
                        {/* <Button icon='pi pi-sign-in' className='mt-4 mb-6' label='Login to the Application' onClick={() => { setLoginPopupValue(true) }} /> */}
                        <div className='flex items-center justify-center'>
                            <Button icon='pi pi-sign-in' className='mt-4 mb-6' label='Login' onClick={() => { setLoginPopupValue(true) }} />
                            <Button label="Forget Password" link onClick={() => { setInitateForgetPasswordPopupValue(true) }} />
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
                        }) : <div className='no-data text-[13px] md:text-[15px]'>No Presenter Avaliable.</div>

                    }
                </div>
                <div className='flex justify-end py-0 md:py-2'>
                    <Link to="/presenters-list">
                        <Button className='!px-0 pb-0 text-[14px] md:text-[15px]' label="See All Presenters" iconPos='right' icon='pi pi-angle-double-right' link />
                    </Link>
                </div>
            </div>
            {logInPopupValue && <LoginForm />}
            {initateForgetPasswordPopupValue && <InitateForgetPasswordForm />}
            <PresenterDetailPopup />
        </div>
    )
}


export default MyEvents;

