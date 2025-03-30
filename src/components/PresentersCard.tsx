import React, { useContext } from 'react'
import { Avatar } from 'primereact/avatar';
import { Button } from 'primereact/button';
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
                    <Avatar className='w-[30px] h-[30px]' label={String(presentersData.name.split(' ')[0]).slice(0, 1).toUpperCase() + String(presentersData.name.split(' ')[1]).slice(0, 1).toUpperCase()} size="normal" shape="circle" />
                    <h5 className='ml-2 lg:ml-3 capitalize font-medium text-[16px] lg:text-xl text-[#474747]'>{presentersData.name}</h5>
                </div>
                <p className='mt-3 mb-2 text-[13px] lg:text-[15px] text-[#818181] textinThreeLine'>{presentersData.introduction}</p>
                <p className="mt-4">
                    <span className='flex flex-wrap gap-1'>
                        <span className='text-[#474747] text-[14px] font-bold lg:text-[16px] font-normal'>Skills:- </span>
                        {
                            presentersData?.techExpertise.map((items, index, itemsList) => <span className='text-[11px] lg:text-[14px] text-[#818181]'>{items}{itemsList.length -1 !== index &&<span>,</span>}</span>)
                        }
                    </span>
                </p>
            </div>
            <div className='flex justify-end'>
                <Button className='!px-0 !pb-0 !pt-2 text-[12px] lg:text-[15px]' label="Read Full Profile" link onClick={handlePopupData} />
            </div>
        </div>
    )
}

export default PresentersCard;
