import React, { useContext } from 'react'
import { ProductContextData } from '../context/ContextData';
// import { Avatar, Badge } from 'flowbite-react';
import { Chip } from 'primereact/chip';
import { Dialog } from 'primereact/dialog';
import { Avatar } from 'primereact/avatar';
import { Badge } from 'primereact/badge';

const PresenterDetailPopup: React.FC = () => {
    const context = useContext(ProductContextData);
    if (!context) {
        throw new Error('it should not be null');
    }
    const { presentersDetailsPopupValue, presentersDetailsPopup, setPresentersDetailsPopupValue } = context;

    const headerElementForPopup = (
        <div className="inline-flex items-center justify-content-center gap-2">
            <Avatar label={String(presentersDetailsPopup?.name.split(' ')[0]).slice(0, 1).toUpperCase() + String(presentersDetailsPopup?.name.split(' ')[1]).slice(0, 1).toUpperCase()} size="large" shape="circle" />
            <div className='flex flex-col'>
                <span className='flex items-center'>
                    <span className="capitalize font-bold white-space-nowrap text-[18px] md:text-[22px]">{presentersDetailsPopup?.name}</span>
                    <Badge className='ml-2' value={presentersDetailsPopup?.role} severity="contrast" />
                </span>
                <span className='text-[14px] md:text-[15px] font-medium text-[#ababab]'>{presentersDetailsPopup?.email}</span>
            </div>
        </div>
    );
    return (
        <Dialog position={'top'} draggable={false} dismissableMask header={headerElementForPopup} visible={presentersDetailsPopupValue} onHide={() => { if (!presentersDetailsPopupValue) return; setPresentersDetailsPopupValue(false);  }} className='w-full md:max-w-[65vw]'>
            <p className="m-0 pb-3 text-[14px] md:text-[15px]">
                <span className='font-bold'>About:- </span>
                {presentersDetailsPopup?.introduction}
            </p>
            {
                (presentersDetailsPopup?.techExpertise !== undefined && presentersDetailsPopup?.techExpertise.length > 0) && <p className="m-0 text-[14px] md:text-[15px]">
                    <span className='font-bold'>Tech Experties:- </span>
                    {
                        presentersDetailsPopup?.techExpertise.map((items) => <Chip className='mr-1 md:mr-2 text-[11px] md:text-[14px] text-[#474747]' label={items} />)
                    }
                </p>
            }

        </Dialog>
    )
}

export default PresenterDetailPopup
