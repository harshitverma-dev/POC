import React from 'react'
import { EventType } from '../interface/EventInterface';
import { Button } from 'primereact/button';


interface EventProps {
    eventData: EventType,
    index: number
}

const EventCard: React.FC<EventProps> = (props) => {
    const { eventData } = props;
    console.log(props, eventData)
    return (
        <div className='flex flex-col justify-between'>
            <div className='flex justify-between items-center'>
                <h3 className='text-[20px]'>{eventData.eventName}</h3>
                {/* <div className='flex flex-col'>
                    <span>{eventData.eventDate}</span>
                    <span>{eventData.eventTime}</span>
                </div> */}
            </div>
            <p className='mt-4'>{eventData.eventInfo}</p>
            <p className='my-3'>Presenter - {eventData.presenterInfo}</p>
            <div className='eventBtnContainer flex justify-end items-center'>
                <Button size='small' label="Attend" severity="secondary" />
            </div>
        </div>
    )
}

export default EventCard;
