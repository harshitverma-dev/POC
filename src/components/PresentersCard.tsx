import React from 'react'
import { Avatar } from 'primereact/avatar';
import { Button } from 'primereact/button';
import { PresenterType } from '../interfaces/EventInterface';

interface PresentersProps {
    presentersData: PresenterType,
    index: number
}

const PresentersCard: React.FC<PresentersProps> = (props) => {
    const { presentersData } = props
    return (
        <div>
            <div className='flex justify-start items-center'>
                <Avatar label="P" size="large" shape="circle" />
                <h5 className='ml-3'>{presentersData.presenterName}</h5>
            </div>
            <p className='mt-2'>{presentersData.presenterDiscription}</p>
            <div className='flex justify-end'>
                <Button className='px-0 pb-0' label="...Read Full Profile" link onClick={() => window.open('https://react.dev', '_blank')} />
            </div>
        </div>
    )
}

export default PresentersCard;
