import React, { useContext, useEffect } from 'react'
import { RightSideType } from '../interface/EventInterface';
import RightSideCard from '../components/RightSideCard';
// import EventsTab from '../components/EventsTab';
import { Button } from 'primereact/button';
import PresentersCard from '../components/PresentersCard';
import { useNavigate } from 'react-router-dom';
import { ProductContextData } from '../context/ContextData';
import PresentersListSkeleton from '../skeletons/PresentersListSkeleton';
// import { userPresentersI } from '../interface/Presenters';
import { Dialog } from 'primereact/dialog';
import { Avatar } from 'primereact/avatar';
import { Chip } from 'primereact/chip';

import { Badge } from 'primereact/badge';


const SeeAllPresentersMain: React.FC = () => {
    const context = useContext(ProductContextData);
    if (!context) {
        throw new Error('it should not be null');
    }
    const { getAllPresentersDataByApi, storeAllPresenters, presentersDetailsPopupValue, presentersDetailsPopup, setPresentersDetailsPopupValue, setPresentersDetailsPopup } = context;
    const navigate = useNavigate()

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

    useEffect(() => {
        getAllPresentersDataByApi();
    }, [])


    const headerElementForPopup = (
        <div className="inline-flex items-center justify-content-center gap-2">
            <Avatar label={String(presentersDetailsPopup?.name.split(' ')[0]).slice(0, 1).toUpperCase() + String(presentersDetailsPopup?.name.split(' ')[1]).slice(0, 1).toUpperCase()} size="large" shape="circle" />
            <div className='flex flex-col'>
                <span className='flex items-center'>
                    <span className="font-bold white-space-nowrap text-[22px]">{presentersDetailsPopup?.name}</span>
                    <Badge className='ml-2' value={presentersDetailsPopup?.role} severity="contrast" />
                </span>
                <span className='text-[15px] font-medium text-[#ababab]'>{presentersDetailsPopup?.email}</span>
            </div>
        </div>
    );
    return (
        <>
            <div className='flex gap-3 w-full'>
                <div className='w-4/5'>
                    {/* <EventsTab /> */}
                    <div className='grid grid-cols-3 gap-3'>
                        {
                            (storeAllPresenters !== null && storeAllPresenters?.length > 0) ? storeAllPresenters?.map((items, index) => {
                                return (
                                    <div className='mainCard border-solid border border-[#B1D4DF] rounded-[20px] p-3' key={index}>
                                        <PresentersCard
                                            // key={index}
                                            presentersData={items}
                                            index={index} />
                                    </div >
                                )
                            }) : <PresentersListSkeleton />
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
            <Dialog header={headerElementForPopup} visible={presentersDetailsPopupValue} onHide={() => { if (!presentersDetailsPopupValue) return; setPresentersDetailsPopupValue(false); setPresentersDetailsPopup(null) }} style={{ width: '50vw' }} >
                <p className="m-0 pb-3">
                    <span className='font-bold'>About:- </span>
                    {presentersDetailsPopup?.introduction}
                </p>
                {
                    (presentersDetailsPopup?.techExpertise !== undefined && presentersDetailsPopup?.techExpertise.length > 0)  && <p className="m-0">
                    <span className='font-bold'>Tech Experties:- </span>
                    {
                        presentersDetailsPopup?.techExpertise.map((items) => <Chip className='mr-2 text-[14px]' label={items}/>)
                    }
                </p>
                }
                
            </Dialog>
        </>
    )
}

export default SeeAllPresentersMain
