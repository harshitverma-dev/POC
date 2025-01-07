import React, { useContext, useEffect } from 'react'
import EventCard from '../components/EventCard';
import { EventType, RightSideType } from '../interface/EventInterface';
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


const UpcomingEvents: React.FC = () => {
    const context = useContext(ProductContextData);
    if (!context) {
        throw new Error('it should not be null');
    }
    const { activeEventSubTab, getAllPresentersDataByApi, storeAllPresenters, getAllUpcomingEventsDataByApi, loginUserDetail,storeAllUpcomingEvents, setLoginPopupValue, logInPopupValue, isStoreAllUpcomingEventsLoader } = context;
    // const EventData: EventType[] = [
    //     {
    //         eventName: "Event1",
    //         eventDate: "03rd August - 2024",
    //         eventTime: "6:00PM - 8:00PM",
    //         eventInfo: "Discussion on Porters Five forces and how these forces shape a companies marketing strategies, with industry examples",
    //         presenterInfo: "Abhinav is an MBA from IIM, brings with him a total experience of 8 years primarily in Marketing"
    //     },
    //     {
    //         eventName: "Event1",
    //         eventDate: "03rd August - 2024",
    //         eventTime: "6:00PM - 8:00PM",
    //         eventInfo: "Discussion on Porters Five forces and how these forces shape a companies marketing strategies, with industry examples",
    //         presenterInfo: "Abhinav is an MBA from IIM, brings with him a total experience of 8 years primarily in Marketing"
    //     },
    //     {
    //         eventName: "Event1",
    //         eventDate: "03rd August - 2024",
    //         eventTime: "6:00PM - 8:00PM",
    //         eventInfo: "Discussion on Porters Five forces and how these forces shape a companies marketing strategies, with industry examples",
    //         presenterInfo: "Abhinav is an MBA from IIM, brings with him a total experience of 8 years primarily in Marketing"
    //     },
    //     {
    //         eventName: "Event1",
    //         eventDate: "03rd August - 2024",
    //         eventTime: "6:00PM - 8:00PM",
    //         eventInfo: "Discussion on Porters Five forces and how these forces shape a companies marketing strategies, with industry examples",
    //         presenterInfo: "Abhinav is an MBA from IIM, brings with him a total experience of 8 years primarily in Marketing"
    //     },
    //     {
    //         eventName: "Event1",
    //         eventDate: "03rd August - 2024",
    //         eventTime: "6:00PM - 8:00PM",
    //         eventInfo: "Discussion on Porters Five forces and how these forces shape a companies marketing strategies, with industry examples",
    //         presenterInfo: "Abhinav is an MBA from IIM, brings with him a total experience of 8 years primarily in Marketing"
    //     },
    //     {
    //         eventName: "Event1",
    //         eventDate: "03rd August - 2024",
    //         eventTime: "6:00PM - 8:00PM",
    //         eventInfo: "Discussion on Porters Five forces and how these forces shape a companies marketing strategies, with industry examples",
    //         presenterInfo: "Abhinav is an MBA from IIM, brings with him a total experience of 8 years primarily in Marketing"
    //     },
    //     {
    //         eventName: "Event1",
    //         eventDate: "03rd August - 2024",
    //         eventTime: "6:00PM - 8:00PM",
    //         eventInfo: "Discussion on Porters Five forces and how these forces shape a companies marketing strategies, with industry examples",
    //         presenterInfo: "Abhinav is an MBA from IIM, brings with him a total experience of 8 years primarily in Marketing"
    //     },
    //     {
    //         eventName: "Event1",
    //         eventDate: "03rd August - 2024",
    //         eventTime: "6:00PM - 8:00PM",
    //         eventInfo: "Discussion on Porters Five forces and how these forces shape a companies marketing strategies, with industry examples",
    //         presenterInfo: "Abhinav is an MBA from IIM, brings with him a total experience of 8 years primarily in Marketing"
    //     },
    //     {
    //         eventName: "Event1",
    //         eventDate: "03rd August - 2024",
    //         eventTime: "6:00PM - 8:00PM",
    //         eventInfo: "Discussion on Porters Five forces and how these forces shape a companies marketing strategies, with industry examples",
    //         presenterInfo: "Abhinav is an MBA from IIM, brings with him a total experience of 8 years primarily in Marketing"
    //     },
    //     {
    //         eventName: "Event1",
    //         eventDate: "03rd August - 2024",
    //         eventTime: "6:00PM - 8:00PM",
    //         eventInfo: "Discussion on Porters Five forces and how these forces shape a companies marketing strategies, with industry examples",
    //         presenterInfo: "Abhinav is an MBA from IIM, brings with him a total experience of 8 years primarily in Marketing"
    //     },
    //     {
    //         eventName: "Event1",
    //         eventDate: "03rd August - 2024",
    //         eventTime: "6:00PM - 8:00PM",
    //         eventInfo: "Discussion on Porters Five forces and how these forces shape a companies marketing strategies, with industry examples",
    //         presenterInfo: "Abhinav is an MBA from IIM, brings with him a total experience of 8 years primarily in Marketing"
    //     },
    //     {
    //         eventName: "Event1",
    //         eventDate: "03rd August - 2024",
    //         eventTime: "6:00PM - 8:00PM",
    //         eventInfo: "Discussion on Porters Five forces and how these forces shape a companies marketing strategies, with industry examples",
    //         presenterInfo: "Abhinav is an MBA from IIM, brings with him a total experience of 8 years primarily in Marketing"
    //     },
    //     {
    //         eventName: "Event1",
    //         eventDate: "03rd August - 2024",
    //         eventTime: "6:00PM - 8:00PM",
    //         eventInfo: "Discussion on Porters Five forces and how these forces shape a companies marketing strategies, with industry examples",
    //         presenterInfo: "Abhinav is an MBA from IIM, brings with him a total experience of 8 years primarily in Marketing"
    //     },
    //     {
    //         eventName: "Event1",
    //         eventDate: "03rd August - 2024",
    //         eventTime: "6:00PM - 8:00PM",
    //         eventInfo: "Discussion on Porters Five forces and how these forces shape a companies marketing strategies, with industry examples",
    //         presenterInfo: "Abhinav is an MBA from IIM, brings with him a total experience of 8 years primarily in Marketing"
    //     },
    //     {
    //         eventName: "Event1",
    //         eventDate: "03rd August - 2024",
    //         eventTime: "6:00PM - 8:00PM",
    //         eventInfo: "Discussion on Porters Five forces and how these forces shape a companies marketing strategies, with industry examples",
    //         presenterInfo: "Abhinav is an MBA from IIM, brings with him a total experience of 8 years primarily in Marketing"
    //     },
    //     {
    //         eventName: "Event1",
    //         eventDate: "03rd August - 2024",
    //         eventTime: "6:00PM - 8:00PM",
    //         eventInfo: "Discussion on Porters Five forces and how these forces shape a companies marketing strategies, with industry examples",
    //         presenterInfo: "Abhinav is an MBA from IIM, brings with him a total experience of 8 years primarily in Marketing"
    //     },
    //     {
    //         eventName: "Event1",
    //         eventDate: "03rd August - 2024",
    //         eventTime: "6:00PM - 8:00PM",
    //         eventInfo: "Discussion on Porters Five forces and how these forces shape a companies marketing strategies, with industry examples",
    //         presenterInfo: "Abhinav is an MBA from IIM, brings with him a total experience of 8 years primarily in Marketing"
    //     },
    //     {
    //         eventName: "Event1",
    //         eventDate: "03rd August - 2024",
    //         eventTime: "6:00PM - 8:00PM",
    //         eventInfo: "Discussion on Porters Five forces and how these forces shape a companies marketing strategies, with industry examples",
    //         presenterInfo: "Abhinav is an MBA from IIM, brings with him a total experience of 8 years primarily in Marketing"
    //     },
    //     {
    //         eventName: "Event1",
    //         eventDate: "03rd August - 2024",
    //         eventTime: "6:00PM - 8:00PM",
    //         eventInfo: "Discussion on Porters Five forces and how these forces shape a companies marketing strategies, with industry examples",
    //         presenterInfo: "Abhinav is an MBA from IIM, brings with him a total experience of 8 years primarily in Marketing"
    //     }
    // ];
    useEffect(() => {
        getAllPresentersDataByApi();
        getAllUpcomingEventsDataByApi();
        // console.log(storeAllPresenters)
    }, [])
    return (
        <div className='flex gap-3 w-full'>
            <div className='w-4/5'>
                {
                    loginUserDetail ? <div>
                        <EventsTab />
                        <div className='grid grid-cols-3 gap-3'>
                            {
                                storeAllUpcomingEvents.length > 0 ? storeAllUpcomingEvents.map((items, index) => {
                                    return (
                                        <div className='mainCard border-solid border border-[#e6e6e6] rounded-[20px] p-3' key={index}>
                                            <EventCard
                                                eventData={items}
                                                index={index}
                                                eventDetails="Upcoming Events" />
                                        </div >
                                    )
                                }) : storeAllUpcomingEvents.length === 0 && isStoreAllUpcomingEventsLoader ? <PresentersListSkeleton /> : storeAllUpcomingEvents.length === 0 && !isStoreAllUpcomingEventsLoader ? <div className='no-data'>No Upcoming Events Avaliable.</div> : null
                            }
                        </div>
                    </div> :
                        <div className='flex flex-col items-center bg-[#fff] rounded-[20px] border border-solid border-[#e6e6e6]'>
                            <div style={{minWidth: '500px', maxWidth: '500px'}}>
                                <Image src={LogInImg} className='w-[100%] h-[100%]'style={{marginBottom: '-60px'}} loading='lazy'/>
                            </div>
                            <Button icon='pi pi-sign-in' className='mt-4 mb-6' label='Login to the Application' onClick={() => { setLoginPopupValue(true) }} />
                        </div>
                }

            </div>
            <div className='w-1/5 flex flex-col gap-3 px-[13px] border-l border-solid border-[#e6e6e6] '>
                <div className=' sticky top-[70px]'>
                    {
                        (storeAllPresenters !== null && storeAllPresenters.length > 0) ? storeAllPresenters?.map((items,index) => {
                            return (
                                <div className='mainCard rightCardContainer border-solid border border-[#e6e6e6] rounded-[20px] p-3 mb-3' key={index}>
                                    <RightSideCard rightSideData={items} />
                                </div>
                            )
                        }
                        ) : <RightSideCardSkeleton />
                    }
                    <div className='flex justify-end'>
                        <Link to="/presenters-list">
                            <Button className='px-0 pb-0' label="See all Presenters" link />
                        </Link>
                    </div>
                </div>
            </div>
            {logInPopupValue && <LoginForm />}
        </div>
    )
}


export default UpcomingEvents;
