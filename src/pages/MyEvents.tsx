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
import LogInImg from '../assets/loginImg.gif'

const MyEvents: React.FC = () => {
    const context = useContext(ProductContextData);
    if (!context) {
        throw new Error('it should not be null');
    }
    const { activeEventSubTab, getAllPresentersDataByApi, storeAllPresenters, getAllUpcomingEventsDataByApi, logInPopupValue, setLoginPopupValue, storeAllUpcomingEvents, getAllPastEventsDataByApi, storeAllPastEvents } = context;
    // const EventData: EventType[] = [
    //     {
    //         eventName: "Event1",
    //         eventDate: "03rd August - 2024",
    //         eventTime: "6:00PM - 8:00PM",
    //         eventInfo: "aDiscussion on Porters Five forces and how these forces shape a companies marketing strategies, with industry examples",
    //         presenterInfo: "Abhinav is an MBA from IIM, brings with him a total experience of 8 years primarily in Marketing",
    //         eventRating: 2.3
    //     },
    //     {
    //         eventName: "Event1",
    //         eventDate: "03rd August - 2024",
    //         eventTime: "6:00PM - 8:00PM",
    //         eventInfo: "bDiscussion on Porters Five forces and how these forces shape a companies marketing strategies, with industry examples",
    //         presenterInfo: "Abhinav is an MBA from IIM, brings with him a total experience of 8 years primarily in Marketing",
    //         eventRating: 4
    //     },
    //     {
    //         eventName: "Event1",
    //         eventDate: "03rd August - 2024",
    //         eventTime: "6:00PM - 8:00PM",
    //         eventInfo: "cDiscussion on Porters Five forces and how these forces shape a companies marketing strategies, with industry examples",
    //         presenterInfo: "Abhinav is an MBA from IIM, brings with him a total experience of 8 years primarily in Marketing",
    //         eventRating: 4
    //     },
    //     {
    //         eventName: "Event1",
    //         eventDate: "03rd August - 2024",
    //         eventTime: "6:00PM - 8:00PM",
    //         eventInfo: "dDiscussion on Porters Five forces and how these forces shape a companies marketing strategies, with industry examples",
    //         presenterInfo: "Abhinav is an MBA from IIM, brings with him a total experience of 8 years primarily in Marketing",
    //         eventRating: 4
    //     },
    //     {
    //         eventName: "Event1",
    //         eventDate: "03rd August - 2024",
    //         eventTime: "6:00PM - 8:00PM",
    //         eventInfo: "eDiscussion on Porters Five forces and how these forces shape a companies marketing strategies, with industry examples",
    //         presenterInfo: "Abhinav is an MBA from IIM, brings with him a total experience of 8 years primarily in Marketing"
    //     },
    //     {
    //         eventName: "Event1",
    //         eventDate: "03rd August - 2024",
    //         eventTime: "6:00PM - 8:00PM",
    //         eventInfo: "fDiscussion on Porters Five forces and how these forces shape a companies marketing strategies, with industry examples",
    //         presenterInfo: "Abhinav is an MBA from IIM, brings with him a total experience of 8 years primarily in Marketing",
    //         eventRating: 4
    //     },
    //     {
    //         eventName: "Event1",
    //         eventDate: "03rd August - 2024",
    //         eventTime: "6:00PM - 8:00PM",
    //         eventInfo: "gDiscussion on Porters Five forces and how these forces shape a companies marketing strategies, with industry examples",
    //         presenterInfo: "Abhinav is an MBA from IIM, brings with him a total experience of 8 years primarily in Marketing",
    //         eventRating: 4
    //     },
    //     {
    //         eventName: "Event1",
    //         eventDate: "03rd August - 2024",
    //         eventTime: "6:00PM - 8:00PM",
    //         eventInfo: "hDiscussion on Porters Five forces and how these forces shape a companies marketing strategies, with industry examples",
    //         presenterInfo: "Abhinav is an MBA from IIM, brings with him a total experience of 8 years primarily in Marketing",
    //         eventRating: 4
    //     },
    //     {
    //         eventName: "Event1",
    //         eventDate: "03rd August - 2024",
    //         eventTime: "6:00PM - 8:00PM",
    //         eventInfo: "Discussion on Porters Five forces and how these forces shape a companies marketing strategies, with industry examples",
    //         presenterInfo: "Abhinav is an MBA from IIM, brings with him a total experience of 8 years primarily in Marketing",
    //         eventRating: 4
    //     },
    //     {
    //         eventName: "Event1",
    //         eventDate: "03rd August - 2024",
    //         eventTime: "6:00PM - 8:00PM",
    //         eventInfo: "Discussion on Porters Five forces and how these forces shape a companies marketing strategies, with industry examples",
    //         presenterInfo: "Abhinav is an MBA from IIM, brings with him a total experience of 8 years primarily in Marketing",
    //         eventRating: 3
    //     },
    //     {
    //         eventName: "Event1",
    //         eventDate: "03rd August - 2024",
    //         eventTime: "6:00PM - 8:00PM",
    //         eventInfo: "Discussion on Porters Five forces and how these forces shape a companies marketing strategies, with industry examples",
    //         presenterInfo: "Abhinav is an MBA from IIM, brings with him a total experience of 8 years primarily in Marketing",
    //         eventRating: 1
    //     },
    //     {
    //         eventName: "Event1",
    //         eventDate: "03rd August - 2024",
    //         eventTime: "6:00PM - 8:00PM",
    //         eventInfo: "Discussion on Porters Five forces and how these forces shape a companies marketing strategies, with industry examples",
    //         presenterInfo: "Abhinav is an MBA from IIM, brings with him a total experience of 8 years primarily in Marketing",
    //         eventRating: 3
    //     },
    //     {
    //         eventName: "Event1",
    //         eventDate: "03rd August - 2024",
    //         eventTime: "6:00PM - 8:00PM",
    //         eventInfo: "Discussion on Porters Five forces and how these forces shape a companies marketing strategies, with industry examples",
    //         presenterInfo: "Abhinav is an MBA from IIM, brings with him a total experience of 8 years primarily in Marketing",
    //         eventRating: 3.4
    //     },
    //     {
    //         eventName: "Event1",
    //         eventDate: "03rd August - 2024",
    //         eventTime: "6:00PM - 8:00PM",
    //         eventInfo: "Discussion on Porters Five forces and how these forces shape a companies marketing strategies, with industry examples",
    //         presenterInfo: "Abhinav is an MBA from IIM, brings with him a total experience of 8 years primarily in Marketing",
    //         eventRating: 5
    //     },
    //     {
    //         eventName: "Event1",
    //         eventDate: "03rd August - 2024",
    //         eventTime: "6:00PM - 8:00PM",
    //         eventInfo: "Discussion on Porters Five forces and how these forces shape a companies marketing strategies, with industry examples",
    //         presenterInfo: "Abhinav is an MBA from IIM, brings with him a total experience of 8 years primarily in Marketing",
    //         eventRating: 2
    //     },
    //     {
    //         eventName: "Event1",
    //         eventDate: "03rd August - 2024",
    //         eventTime: "6:00PM - 8:00PM",
    //         eventInfo: "Discussion on Porters Five forces and how these forces shape a companies marketing strategies, with industry examples",
    //         presenterInfo: "Abhinav is an MBA from IIM, brings with him a total experience of 8 years primarily in Marketing",
    //         eventRating: 2
    //     },
    //     {
    //         eventName: "Event1",
    //         eventDate: "03rd August - 2024",
    //         eventTime: "6:00PM - 8:00PM",
    //         eventInfo: "Discussion on Porters Five forces and how these forces shape a companies marketing strategies, with industry examples",
    //         presenterInfo: "Abhinav is an MBA from IIM, brings with him a total experience of 8 years primarily in Marketing",
    //         eventRating: 4
    //     },
    //     {
    //         eventName: "Event1",
    //         eventDate: "03rd August - 2024",
    //         eventTime: "6:00PM - 8:00PM",
    //         eventInfo: "Discussion on Porters Five forces and how these forces shape a companies marketing strategies, with industry examples",
    //         presenterInfo: "Abhinav is an MBA from IIM, brings with him a total experience of 8 years primarily in Marketing",
    //         eventRating: 5
    //     },
    //     {
    //         eventName: "Event1",
    //         eventDate: "03rd August - 2024",
    //         eventTime: "6:00PM - 8:00PM",
    //         eventInfo: "Discussion on Porters Five forces and how these forces shape a companies marketing strategies, with industry examples",
    //         presenterInfo: "Abhinav is an MBA from IIM, brings with him a total experience of 8 years primarily in Marketing",
    //         eventRating: 1
    //     }
    // ];

    useEffect(() => {
        getAllPresentersDataByApi();
        getAllUpcomingEventsDataByApi();
        getAllPastEventsDataByApi()
        // console.log(storeAllPresenters)
    }, [])
    return (
        <div className='flex gap-3 w-full'>
            <div className='w-4/5'>
                {
                    localStorage.getItem('userAccessToken') ? <div>
                        <EventsTab />
                        <div className='grid grid-cols-3 gap-3'>
                            {

                                activeEventSubTab === 'To Attend' ?
                                    (
                                        <div>To Attend</div>
                                    ) : activeEventSubTab === 'To Present' ?
                                        storeAllUpcomingEvents?.map((items, index) => {
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
                                        ) : activeEventSubTab === 'Presented' ?
                                            storeAllPastEvents?.map((items, index) => {
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
                                            ) : null

                                // else if(activeEventSubTab === 'To Present'){
                                //     // return 'to present'
                                //     console.log('return to present')
                                // }else if (activeEventSubTab === 'Presented'){
                                //     // return 'Presented'
                                //     console.log('Presented')
                                // }
                                // return null;
                            }

                        </div>
                    </div> : <div className='flex flex-col items-center bg-[#fff] rounded-[20px] border border-solid border-[#e6e6e6]'>
                        <div style={{ minWidth: '600px' }}>
                            <img src={LogInImg} className='w-full' style={{ marginBottom: '-60px' }} />
                        </div>
                        <Button icon='pi pi-sign-in' className='mt-4 mb-6' label='Login to the Application' onClick={() => { setLoginPopupValue(true) }} />
                    </div>
                }
            </div>
            <div className='w-1/5 flex flex-col gap-3 px-[13px] border-l border-solid border-[#e6e6e6] '>
                <div className=' sticky top-[70px]'>
                    {
                        (storeAllPresenters !== null && storeAllPresenters.length > 0) ? storeAllPresenters?.map((items) => {
                            return (
                                <div className='mainCard rightCardContainer border-solid border border-[#e6e6e6] rounded-[20px] p-3 mb-3'>
                                    <RightSideCard rightSideData={items} />
                                </div>
                            )
                        }) : <RightSideCardSkeleton />
                    }
                    <div className='flex justify-end'>
                        <Link to="/presenters-list">
                            <Button className='px-0 pb-0' label="See All Presenters" link />
                        </Link>
                    </div>
                </div>
            </div>
            {logInPopupValue && <LoginForm />}
        </div>
    )
}


export default MyEvents;

