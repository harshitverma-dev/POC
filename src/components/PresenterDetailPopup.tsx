import React, { useContext } from 'react'
import { ProductContextData } from '../context/ContextData';
import { Dialog } from 'primereact/dialog';
import { Avatar } from 'primereact/avatar';

const PresenterDetailPopup: React.FC = () => {
    const context = useContext(ProductContextData);
    if (!context) {
        throw new Error('it should not be null');
    }
    const { presentersDetailsPopupValue, presentersDetailsPopup, setPresentersDetailsPopupValue } = context;

    const headerElementForPopup = (
        <div className="inline-flex items-center justify-content-center gap-2">
            <Avatar label={String(presentersDetailsPopup?.name.split(' ')[0]).slice(0, 1).toUpperCase() + String(presentersDetailsPopup?.name.split(' ')[1]).slice(0, 1).toUpperCase()} size="large" shape="circle" className='poppins-font'/>
            <div className='flex flex-col'>
                <span className='flex items-center'>
                    <span className="capitalize font-bold white-space-nowrap text-[18px] md:text-[22px] poppins-font">{presentersDetailsPopup?.name}</span>
                </span>
            </div>
        </div>
    );
    return (
        <Dialog position={'top'} draggable={false} dismissableMask header={headerElementForPopup} visible={presentersDetailsPopupValue} onHide={() => { if (!presentersDetailsPopupValue) return; setPresentersDetailsPopupValue(false);  }} className='w-full md:max-w-[65vw]'>
            <p className="m-0 pb-3 text-[14px] md:text-[15px]" style={{fontFamily: 'poppins'}}>
                <span className='font-bold poppins-font'>About :- </span>
                {presentersDetailsPopup?.introduction}
            </p>
            {
                (presentersDetailsPopup?.techExpertise !== undefined && presentersDetailsPopup?.techExpertise.length > 0) && <p className="m-0 text-[14px] md:text-[15px]">
                    <span className='font-bold poppins-font'>Skills :- </span>
                    {
                        presentersDetailsPopup?.techExpertise.map((items, index, itemsList) => <span className='text-[11px] lg:text-[14px] text-[#818181] mr-[5px]'>{items}{itemsList.length -1 !== index &&<span>,</span>}</span>)
                    }
                </p>
            }

        </Dialog>
    )
}

export default PresenterDetailPopup
