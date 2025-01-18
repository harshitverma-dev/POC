import React, { useContext } from 'react'
import { Avatar } from 'primereact/avatar';
import { Button } from 'primereact/button';
// import { PresenterType } from '../interface/EventInterface';
import { userPresentersI } from '../interface/Presenters';
import { ProductContextData } from '../context/ContextData';
import { Chip } from 'primereact/chip';

interface PresentersProps {
    presentersData: userPresentersI,
    index: number
}

const PresentersCard: React.FC<PresentersProps> = (props) => {
    const context = useContext(ProductContextData);
    if (!context) {
        throw new Error('it should not be null');
    }
    const { setPresentersDetailsPopupValue, setPresentersDetailsPopup } = context;
    const { presentersData } = props

    const handlePopupData = () => {
        setPresentersDetailsPopup(presentersData)
        setPresentersDetailsPopupValue(true)
    }
    return (
        <div className='flex flex-col justify-between h-full'>
            <div>
                <div className='flex justify-start items-center'>
                    <Avatar label={String(presentersData.name.split(' ')[0]).slice(0, 1).toUpperCase() + String(presentersData.name.split(' ')[1]).slice(0, 1).toUpperCase()} size="large" shape="circle" />
                    <h5 className='ml-3 capitalize font-medium text-xl text-[#474747]'>{presentersData.name}</h5>
                </div>
                <p className='mt-3 mb-2 text-[15px] text-[#5e5e5e] textinThreeLine'>{presentersData.introduction}</p>
                <p className="m-0">
                    <span className='text-[#474747] font-normal'>Tech Experties:- </span>
                    {
                        presentersData?.techExpertise.map((items) => <Chip className='mr-2 text-[14px] text-[#474747]' label={items} />)
                    }
                </p>
            </div>
            <div className='flex justify-end'>
                <Button className='px-0 pb-0 text-[15px]' label="Read Full Profile" link onClick={handlePopupData} />
            </div>
        </div>
    )
}

export default PresentersCard;
