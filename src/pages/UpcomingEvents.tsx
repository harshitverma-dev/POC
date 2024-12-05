import React from 'react'
import EventCard from '../components/EventCard';
import { EventType, RightSideType } from '../interfaces/EventInterface';
import RightSideCard from '../components/RightSideCard';
import EventsTab from '../components/EventsTab';
import { Button } from 'primereact/button';
import { Link } from 'react-router-dom';

const UpcomingEvents: React.FC = () => {
    const EventData: EventType[] = [
        {
            eventName: "Event1",
            eventDate: "03rd August - 2024",
            eventTime: "6:00PM - 8:00PM",
            eventInfo: "Discussion on Porters Five forces and how these forces shape a companies marketing strategies, with industry examples",
            presenterInfo: "Abhinav is an MBA from IIM, brings with him a total experience of 8 years primarily in Marketing"
        },
        {
            eventName: "Event1",
            eventDate: "03rd August - 2024",
            eventTime: "6:00PM - 8:00PM",
            eventInfo: "Discussion on Porters Five forces and how these forces shape a companies marketing strategies, with industry examples",
            presenterInfo: "Abhinav is an MBA from IIM, brings with him a total experience of 8 years primarily in Marketing"
        },
        {
            eventName: "Event1",
            eventDate: "03rd August - 2024",
            eventTime: "6:00PM - 8:00PM",
            eventInfo: "Discussion on Porters Five forces and how these forces shape a companies marketing strategies, with industry examples",
            presenterInfo: "Abhinav is an MBA from IIM, brings with him a total experience of 8 years primarily in Marketing"
        },
        {
            eventName: "Event1",
            eventDate: "03rd August - 2024",
            eventTime: "6:00PM - 8:00PM",
            eventInfo: "Discussion on Porters Five forces and how these forces shape a companies marketing strategies, with industry examples",
            presenterInfo: "Abhinav is an MBA from IIM, brings with him a total experience of 8 years primarily in Marketing"
        },
        {
            eventName: "Event1",
            eventDate: "03rd August - 2024",
            eventTime: "6:00PM - 8:00PM",
            eventInfo: "Discussion on Porters Five forces and how these forces shape a companies marketing strategies, with industry examples",
            presenterInfo: "Abhinav is an MBA from IIM, brings with him a total experience of 8 years primarily in Marketing"
        },
        {
            eventName: "Event1",
            eventDate: "03rd August - 2024",
            eventTime: "6:00PM - 8:00PM",
            eventInfo: "Discussion on Porters Five forces and how these forces shape a companies marketing strategies, with industry examples",
            presenterInfo: "Abhinav is an MBA from IIM, brings with him a total experience of 8 years primarily in Marketing"
        },
        {
            eventName: "Event1",
            eventDate: "03rd August - 2024",
            eventTime: "6:00PM - 8:00PM",
            eventInfo: "Discussion on Porters Five forces and how these forces shape a companies marketing strategies, with industry examples",
            presenterInfo: "Abhinav is an MBA from IIM, brings with him a total experience of 8 years primarily in Marketing"
        },
        {
            eventName: "Event1",
            eventDate: "03rd August - 2024",
            eventTime: "6:00PM - 8:00PM",
            eventInfo: "Discussion on Porters Five forces and how these forces shape a companies marketing strategies, with industry examples",
            presenterInfo: "Abhinav is an MBA from IIM, brings with him a total experience of 8 years primarily in Marketing"
        },
        {
            eventName: "Event1",
            eventDate: "03rd August - 2024",
            eventTime: "6:00PM - 8:00PM",
            eventInfo: "Discussion on Porters Five forces and how these forces shape a companies marketing strategies, with industry examples",
            presenterInfo: "Abhinav is an MBA from IIM, brings with him a total experience of 8 years primarily in Marketing"
        },
        {
            eventName: "Event1",
            eventDate: "03rd August - 2024",
            eventTime: "6:00PM - 8:00PM",
            eventInfo: "Discussion on Porters Five forces and how these forces shape a companies marketing strategies, with industry examples",
            presenterInfo: "Abhinav is an MBA from IIM, brings with him a total experience of 8 years primarily in Marketing"
        },
        {
            eventName: "Event1",
            eventDate: "03rd August - 2024",
            eventTime: "6:00PM - 8:00PM",
            eventInfo: "Discussion on Porters Five forces and how these forces shape a companies marketing strategies, with industry examples",
            presenterInfo: "Abhinav is an MBA from IIM, brings with him a total experience of 8 years primarily in Marketing"
        },
        {
            eventName: "Event1",
            eventDate: "03rd August - 2024",
            eventTime: "6:00PM - 8:00PM",
            eventInfo: "Discussion on Porters Five forces and how these forces shape a companies marketing strategies, with industry examples",
            presenterInfo: "Abhinav is an MBA from IIM, brings with him a total experience of 8 years primarily in Marketing"
        },
        {
            eventName: "Event1",
            eventDate: "03rd August - 2024",
            eventTime: "6:00PM - 8:00PM",
            eventInfo: "Discussion on Porters Five forces and how these forces shape a companies marketing strategies, with industry examples",
            presenterInfo: "Abhinav is an MBA from IIM, brings with him a total experience of 8 years primarily in Marketing"
        },
        {
            eventName: "Event1",
            eventDate: "03rd August - 2024",
            eventTime: "6:00PM - 8:00PM",
            eventInfo: "Discussion on Porters Five forces and how these forces shape a companies marketing strategies, with industry examples",
            presenterInfo: "Abhinav is an MBA from IIM, brings with him a total experience of 8 years primarily in Marketing"
        },
        {
            eventName: "Event1",
            eventDate: "03rd August - 2024",
            eventTime: "6:00PM - 8:00PM",
            eventInfo: "Discussion on Porters Five forces and how these forces shape a companies marketing strategies, with industry examples",
            presenterInfo: "Abhinav is an MBA from IIM, brings with him a total experience of 8 years primarily in Marketing"
        },
        {
            eventName: "Event1",
            eventDate: "03rd August - 2024",
            eventTime: "6:00PM - 8:00PM",
            eventInfo: "Discussion on Porters Five forces and how these forces shape a companies marketing strategies, with industry examples",
            presenterInfo: "Abhinav is an MBA from IIM, brings with him a total experience of 8 years primarily in Marketing"
        },
        {
            eventName: "Event1",
            eventDate: "03rd August - 2024",
            eventTime: "6:00PM - 8:00PM",
            eventInfo: "Discussion on Porters Five forces and how these forces shape a companies marketing strategies, with industry examples",
            presenterInfo: "Abhinav is an MBA from IIM, brings with him a total experience of 8 years primarily in Marketing"
        },
        {
            eventName: "Event1",
            eventDate: "03rd August - 2024",
            eventTime: "6:00PM - 8:00PM",
            eventInfo: "Discussion on Porters Five forces and how these forces shape a companies marketing strategies, with industry examples",
            presenterInfo: "Abhinav is an MBA from IIM, brings with him a total experience of 8 years primarily in Marketing"
        },
        {
            eventName: "Event1",
            eventDate: "03rd August - 2024",
            eventTime: "6:00PM - 8:00PM",
            eventInfo: "Discussion on Porters Five forces and how these forces shape a companies marketing strategies, with industry examples",
            presenterInfo: "Abhinav is an MBA from IIM, brings with him a total experience of 8 years primarily in Marketing"
        }
    ];

    const PresentersSideData: RightSideType[] = [
        {
            name: "Abhinav",
            discription: "graduate from IIM brings with him 8+ years of experience in Marketing."
        },
        {
            name: "Abhinav",
            discription: "graduate from IIM brings with him 8+ years of experience in Marketing."
        },
        {
            name: "Abhinav",
            discription: "graduate from IIM brings with him 8+ years of experience in Marketing."
        },
        {
            name: "Abhinav",
            discription: "graduate from IIM brings with him 8+ years of experience in Marketing."
        }
    ]
    return (
        <div className='flex gap-3'>
            <div className='w-4/5'>
                <EventsTab />
                <div className='grid grid-cols-3 gap-3'>
                    {
                        EventData.map((items, index) => {
                            return (
                                <div className='mainCard border-solid border border-[#B1D4DF] rounded-[20px] p-3'>
                                    <EventCard
                                        eventData={items}
                                        index={index} 
                                        eventDetails="Upcoming Events"/>
                                </div >
                            )
                        })
                    }
                </div>
            </div>
            <div className='w-1/5 flex flex-col gap-3 px-[13px] border-l border-solid border-[#B1D4DF] '>
                <div className=' sticky top-[70px]'>
                    {
                        PresentersSideData.map((items) => {
                            return (
                                <div className='mainCard rightCardContainer border-solid border border-[#B1D4DF] rounded-[20px] p-3 mb-3'>
                                    <RightSideCard rightSideData={items} />
                                </div>
                            )
                        })
                    }
                    <div className='flex justify-end'>
                        <Link to="/presenters-list">
                            <Button className='px-0 pb-0' label="See all Presenters" link />
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}


export default UpcomingEvents;
