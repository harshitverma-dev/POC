import React, { useContext } from 'react'
import { Avatar } from 'primereact/avatar';
import { Button } from 'primereact/button';
// import { PresenterType } from '../interface/EventInterface';
import { userPresentersI } from '../interface/Presenters';
import { ProductContextData } from '../context/ContextData';

interface PresentersProps {
    presentersData: userPresentersI,
    index: number
}

const PresentersCard: React.FC<PresentersProps> = (props) => {
    const context = useContext(ProductContextData);
    if (!context) {
        throw new Error('it should not be null');
    }
    const { setPresentersDetailsPopupValue , setPresentersDetailsPopup } = context;
    const { presentersData} = props

    const handlePopupData = () =>{
        setPresentersDetailsPopup(presentersData)
        setPresentersDetailsPopupValue(true)
    }
    return (
        <div>
            <div className='flex justify-start items-center'>
                <Avatar label={String(presentersData.name.split(' ')[0]).slice(0,1).toUpperCase() + String(presentersData.name.split(' ')[1]).slice(0,1).toUpperCase()} size="large" shape="circle" />
                <h5 className='ml-3 capitalize font-medium text-xl text-[#474747]'>{presentersData.name}</h5>
            </div>
            <p className='mt-2 text-[15px] text-[#5e5e5e]'>{presentersData.introduction}</p>
            <div className='flex justify-end'>
                <Button className='px-0 pb-0 text-[15px]' label="...Read Full Profile" link onClick={handlePopupData} />
            </div>
        </div>
    )
}

export default PresentersCard;
