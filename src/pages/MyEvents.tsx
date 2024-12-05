import React, { useContext } from 'react'
import EventCard from '../components/EventCard';
import { EventType, RightSideType } from '../interfaces/EventInterface';
import RightSideCard from '../components/RightSideCard';
import EventsTab from '../components/EventsTab';
import { Button } from 'primereact/button';
import { Link } from 'react-router-dom';
import { ProductContextData } from '../context/ContextData';

const MyEvents: React.FC = () => {
    const context = useContext(ProductContextData);
    if (!context) {
        throw new Error('it should not be null');
    }
    const { activeEventSubTab } = context;
    const EventData: EventType[] = [
        {
            eventName: "Event1",
            eventDate: "03rd August - 2024",
            eventTime: "6:00PM - 8:00PM",
            eventInfo: "aDiscussion on Porters Five forces and how these forces shape a companies marketing strategies, with industry examples",
            presenterInfo: "Abhinav is an MBA from IIM, brings with him a total experience of 8 years primarily in Marketing",
            eventRating: 2.3
        },
        {
            eventName: "Event1",
            eventDate: "03rd August - 2024",
            eventTime: "6:00PM - 8:00PM",
            eventInfo: "bDiscussion on Porters Five forces and how these forces shape a companies marketing strategies, with industry examples",
            presenterInfo: "Abhinav is an MBA from IIM, brings with him a total experience of 8 years primarily in Marketing",
            eventRating: 4
        },
        {
            eventName: "Event1",
            eventDate: "03rd August - 2024",
            eventTime: "6:00PM - 8:00PM",
            eventInfo: "cDiscussion on Porters Five forces and how these forces shape a companies marketing strategies, with industry examples",
            presenterInfo: "Abhinav is an MBA from IIM, brings with him a total experience of 8 years primarily in Marketing",
            eventRating: 4
        },
        {
            eventName: "Event1",
            eventDate: "03rd August - 2024",
            eventTime: "6:00PM - 8:00PM",
            eventInfo: "dDiscussion on Porters Five forces and how these forces shape a companies marketing strategies, with industry examples",
            presenterInfo: "Abhinav is an MBA from IIM, brings with him a total experience of 8 years primarily in Marketing",
            eventRating: 4
        },
        {
            eventName: "Event1",
            eventDate: "03rd August - 2024",
            eventTime: "6:00PM - 8:00PM",
            eventInfo: "eDiscussion on Porters Five forces and how these forces shape a companies marketing strategies, with industry examples",
            presenterInfo: "Abhinav is an MBA from IIM, brings with him a total experience of 8 years primarily in Marketing"
        },
        {
            eventName: "Event1",
            eventDate: "03rd August - 2024",
            eventTime: "6:00PM - 8:00PM",
            eventInfo: "fDiscussion on Porters Five forces and how these forces shape a companies marketing strategies, with industry examples",
            presenterInfo: "Abhinav is an MBA from IIM, brings with him a total experience of 8 years primarily in Marketing",
            eventRating: 4
        },
        {
            eventName: "Event1",
            eventDate: "03rd August - 2024",
            eventTime: "6:00PM - 8:00PM",
            eventInfo: "gDiscussion on Porters Five forces and how these forces shape a companies marketing strategies, with industry examples",
            presenterInfo: "Abhinav is an MBA from IIM, brings with him a total experience of 8 years primarily in Marketing",
            eventRating: 4
        },
        {
            eventName: "Event1",
            eventDate: "03rd August - 2024",
            eventTime: "6:00PM - 8:00PM",
            eventInfo: "hDiscussion on Porters Five forces and how these forces shape a companies marketing strategies, with industry examples",
            presenterInfo: "Abhinav is an MBA from IIM, brings with him a total experience of 8 years primarily in Marketing",
            eventRating: 4
        },
        {
            eventName: "Event1",
            eventDate: "03rd August - 2024",
            eventTime: "6:00PM - 8:00PM",
            eventInfo: "Discussion on Porters Five forces and how these forces shape a companies marketing strategies, with industry examples",
            presenterInfo: "Abhinav is an MBA from IIM, brings with him a total experience of 8 years primarily in Marketing",
            eventRating: 4
        },
        {
            eventName: "Event1",
            eventDate: "03rd August - 2024",
            eventTime: "6:00PM - 8:00PM",
            eventInfo: "Discussion on Porters Five forces and how these forces shape a companies marketing strategies, with industry examples",
            presenterInfo: "Abhinav is an MBA from IIM, brings with him a total experience of 8 years primarily in Marketing",
            eventRating: 3
        },
        {
            eventName: "Event1",
            eventDate: "03rd August - 2024",
            eventTime: "6:00PM - 8:00PM",
            eventInfo: "Discussion on Porters Five forces and how these forces shape a companies marketing strategies, with industry examples",
            presenterInfo: "Abhinav is an MBA from IIM, brings with him a total experience of 8 years primarily in Marketing",
            eventRating: 1
        },
        {
            eventName: "Event1",
            eventDate: "03rd August - 2024",
            eventTime: "6:00PM - 8:00PM",
            eventInfo: "Discussion on Porters Five forces and how these forces shape a companies marketing strategies, with industry examples",
            presenterInfo: "Abhinav is an MBA from IIM, brings with him a total experience of 8 years primarily in Marketing",
            eventRating: 3
        },
        {
            eventName: "Event1",
            eventDate: "03rd August - 2024",
            eventTime: "6:00PM - 8:00PM",
            eventInfo: "Discussion on Porters Five forces and how these forces shape a companies marketing strategies, with industry examples",
            presenterInfo: "Abhinav is an MBA from IIM, brings with him a total experience of 8 years primarily in Marketing",
            eventRating: 3.4
        },
        {
            eventName: "Event1",
            eventDate: "03rd August - 2024",
            eventTime: "6:00PM - 8:00PM",
            eventInfo: "Discussion on Porters Five forces and how these forces shape a companies marketing strategies, with industry examples",
            presenterInfo: "Abhinav is an MBA from IIM, brings with him a total experience of 8 years primarily in Marketing",
            eventRating: 5
        },
        {
            eventName: "Event1",
            eventDate: "03rd August - 2024",
            eventTime: "6:00PM - 8:00PM",
            eventInfo: "Discussion on Porters Five forces and how these forces shape a companies marketing strategies, with industry examples",
            presenterInfo: "Abhinav is an MBA from IIM, brings with him a total experience of 8 years primarily in Marketing",
            eventRating: 2
        },
        {
            eventName: "Event1",
            eventDate: "03rd August - 2024",
            eventTime: "6:00PM - 8:00PM",
            eventInfo: "Discussion on Porters Five forces and how these forces shape a companies marketing strategies, with industry examples",
            presenterInfo: "Abhinav is an MBA from IIM, brings with him a total experience of 8 years primarily in Marketing",
            eventRating: 2
        },
        {
            eventName: "Event1",
            eventDate: "03rd August - 2024",
            eventTime: "6:00PM - 8:00PM",
            eventInfo: "Discussion on Porters Five forces and how these forces shape a companies marketing strategies, with industry examples",
            presenterInfo: "Abhinav is an MBA from IIM, brings with him a total experience of 8 years primarily in Marketing",
            eventRating: 4
        },
        {
            eventName: "Event1",
            eventDate: "03rd August - 2024",
            eventTime: "6:00PM - 8:00PM",
            eventInfo: "Discussion on Porters Five forces and how these forces shape a companies marketing strategies, with industry examples",
            presenterInfo: "Abhinav is an MBA from IIM, brings with him a total experience of 8 years primarily in Marketing",
            eventRating: 5
        },
        {
            eventName: "Event1",
            eventDate: "03rd August - 2024",
            eventTime: "6:00PM - 8:00PM",
            eventInfo: "Discussion on Porters Five forces and how these forces shape a companies marketing strategies, with industry examples",
            presenterInfo: "Abhinav is an MBA from IIM, brings with him a total experience of 8 years primarily in Marketing",
            eventRating: 1
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
                            if (
                                (activeEventSubTab === 'To Attend') ||
                                (activeEventSubTab === 'To Present') ||
                                (activeEventSubTab === 'Presented')
                            ) {
                                return (
                                    <div
                                        key={index}
                                        className='mainCard border-solid border border-[#B1D4DF] rounded-[20px] p-3'
                                    >
                                        <EventCard
                                            eventData={items}
                                            index={index}
                                            eventDetails={activeEventSubTab}
                                        />
                                    </div>
                                );
                            }
                            return null;
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


export default MyEvents;

