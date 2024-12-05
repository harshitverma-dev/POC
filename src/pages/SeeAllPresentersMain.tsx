import React from 'react'
import { PresenterType, RightSideType } from '../interfaces/EventInterface';
import RightSideCard from '../components/RightSideCard';
// import EventsTab from '../components/EventsTab';
import { Button } from 'primereact/button';
import PresentersCard from '../components/PresentersCard';
import { useNavigate } from 'react-router-dom';

const SeeAllPresentersMain: React.FC = () => {
    const navigate = useNavigate()
    const presenterData: PresenterType[] = [
        {
            presenterName: "Kritika Kumari",
            presenterDiscription: "Kritika, a graduate from NIT Jamshedpur in CSC,  brings with her a total of 15 years of experience in AI/ML and Big data technologies. She has worked with companies like Hexaware Technologies, Axtria, McKinsey and BCG, and has managed positions like VP and Director. Expertise - Big Data, GenAI, Snowflake, Azure, Stakeholder Management, Team Building",
        },
        {
            presenterName: "Abhi gupta",
            presenterDiscription: "Kritika, a graduate from NIT Jamshedpur in CSC,  brings with her a total of 15 years of experience in AI/ML and Big data technologies. She has worked with companies like Hexaware Technologies, Axtria, McKinsey and BCG, and has managed positions like VP and Director. Expertise - Big Data, GenAI, Snowflake, Azure, Stakeholder Management, Team Building",
        },
        {
            presenterName: "Soniya raj",
            presenterDiscription: "Kritika, a graduate from NIT Jamshedpur in CSC,  brings with her a total of 15 years of experience in AI/ML and Big data technologies. She has worked with companies like Hexaware Technologies, Axtria, McKinsey and BCG, and has managed positions like VP and Director.",
        },
        {
            presenterName: "Akash manar",
            presenterDiscription: "Kritika, a graduate from NIT Jamshedpur in CSC,  brings with her a total of 15 years of experience in AI/ML and Big data technologies. She has worked with companies like Hexaware Technologies, Axtria, McKinsey and BCG, and has managed positions like VP and Director. Expertise - Big Data, GenAI, Snowflake, Azure, Stakeholder Management, Team Building",
        },
        {
            presenterName: "Shivam Singh",
            presenterDiscription: "Kritika, a graduate from NIT Jamshedpur in CSC,  brings with her a total of 15 years of experience in AI/ML and Big data technologies. She has worked with companies like Hexaware Technologies, Axtria, McKinsey and BCG, and has managed positions like VP and Director. Expertise - Big Data, GenAI, Snowflake, Azure, Stakeholder Management, Team Building",
        },
        {
            presenterName: "Abhinav kumar",
            presenterDiscription: "Discussion on Porters Five forces and how these forces shape a companies marketing strategies, with industry examples",
        },
        {
            presenterName: "Rajat gupta",
            presenterDiscription: "Kritika, a graduate from NIT Jamshedpur in CSC,  brings with her a total of 15 years of experience in AI/ML and Big data technologies. She has worked with companies like Hexaware Technologies, Axtria, McKinsey and BCG, and has managed positions like VP and Director. Expertise - Big Data, GenAI, Snowflake, Azure, Stakeholder Management, Team Building",
        },
    ];

    const PresentersSideData: RightSideType[] = [
        {
            name: "Porter's Five",
            discription: "Discussion on Porters Five forces and how these forces shape a companies marketing strategies, with industry examples"
        },
        {
            name: "Porter's Five",
            discription: "Discussion on Porters Five forces and how these forces shape a companies marketing strategies, with industry examples"
        },
        {
            name: "Porter's Five",
            discription: "Discussion on Porters Five forces and how these forces shape a companies marketing strategies, with industry examples"
        },
        {
            name: "Porter's Five",
            discription: "Discussion on Porters Five forces and how these forces shape a companies marketing strategies, with industry examples"
        }
    ]
    return (
        <div className='flex gap-3'>
            <div className='w-4/5'>
                {/* <EventsTab /> */}
                <div className='grid grid-cols-3 gap-3'>
                    {
                        presenterData.map((items, index) => {
                            return (
                                <div className='mainCard border-solid border border-[#B1D4DF] rounded-[20px] p-3'>
                                    <PresentersCard
                                        presentersData={items}
                                        index={index} />
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
                        <Button className='px-0 pb-0' label="See all upcoming Events" link onClick={() => navigate('/upcoming-events')} />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SeeAllPresentersMain
