import React, { useState } from 'react'
import { EventType } from '../interface/EventInterface';
import { Button } from 'primereact/button';
import { LiaUserEditSolid } from "react-icons/lia";
import { Rating } from "primereact/rating";
import { Dialog } from 'primereact/dialog';
import { Dropdown } from 'primereact/dropdown';
import { InputText } from 'primereact/inputtext';
import { InputTextarea } from 'primereact/inputtextarea'
import { Calendar } from 'primereact/calendar';
// import { FloatLabel } from 'primereact/floatlabel';
import { AiOutlineDelete } from "react-icons/ai";
import { Nullable } from "primereact/ts-helpers";


interface EventProps {
    eventData: EventType,
    index: number,
    eventDetails: string
}

const EventCard: React.FC<EventProps> = (props) => {
    // const [value, setValue] = useState<any>(null);

    const { eventData, eventDetails } = props;
    const [editEventBoolean, setEditEventBoolean] = useState(false);
    const [date, setDate] = useState<Nullable<Date>>(null);

    // console.log(props, eventData)
    const [selectedCity, setSelectedCity] = useState();
    const cities = [
        { name: 'New York', code: 'NY' },
        { name: 'Rome', code: 'RM' },
        { name: 'London', code: 'LDN' },
        { name: 'Istanbul', code: 'IST' },
        { name: 'Paris', code: 'PRS' }
    ];

    const openDialogFun = () => {
        setEditEventBoolean(true);
    }
    return (
        <div className='flex flex-col justify-between'>
            <div className='flex justify-between items-center'>
                <h3 className='text-[20px]'>{eventData.eventName}</h3>
                <div className='flex flex-col'>
                    <span>{eventData.eventDate}</span>
                    <span>{eventData.eventTime}</span>
                </div>
            </div>
            <p className='mt-4'>{eventData.eventInfo}</p>
            <p className='my-3'>Presenter - {eventData.presenterInfo}</p>
            {
                (eventDetails == 'Upcoming Events' || eventDetails == '/') && <div className='eventBtnContainer flex justify-end items-center'>
                    <Button size='small' label="Attend" severity="secondary" />
                </div>
            }
            {
                eventDetails == 'To Attend' ? <div className='flex justify-between items-center'>
                    <div>Attendee - <span>115</span></div>
                    <Button size='small' label="Withdraw" severity="secondary" />
                </div> : eventDetails == 'To Present' ? <div className='flex justify-between items-center cursor-pointer'>
                    <div>Attendee - <span>115</span></div>
                    <div className='flex'> <LiaUserEditSolid size={23} onClick={openDialogFun} className='mr-2'/> <AiOutlineDelete size={23} color='red' /></div> </div> : eventDetails == 'Presented' && <div className='flex justify-between items-center cursor-pointer'>
                        <div>Attendee - <span>115</span></div>
                        <Rating value={eventData.eventRating} cancel={false} /> </div>
                //  onChange={(e: RatingChangeEvent) => setValue(e.value)} 
            }

            {
                editEventBoolean &&
                <Dialog header="Header" draggable={false} visible={editEventBoolean} style={{ width: '40vw' }} onHide={() => { if (!editEventBoolean) return; setEditEventBoolean(false); }}>
                    <p className="m-0">
                        <Dropdown value={selectedCity} onChange={(e) => setSelectedCity(e.value)} options={cities} optionLabel="name"
                            placeholder="Select a City" className="w-full mb-3" checkmark={true} highlightOnSelect={false} />
                        <Dropdown value={selectedCity} onChange={(e) => setSelectedCity(e.value)} options={cities} optionLabel="name"
                            placeholder="Select a City" className="w-full mb-3" checkmark={true} highlightOnSelect={false} />
                        <InputText type="text" placeholder="Normal" className="p-inputtext-sm w-full mb-3" value={eventData.eventInfo} />
                        <InputTextarea autoResize value={eventData.eventInfo} rows={5} className='w-full mb-3' />
                        <InputText type="text" placeholder="Normal" className="p-inputtext-sm w-full mb-3" value={eventData.eventInfo} />
                        {/* <FloatLabel> */}
                        <Calendar ariaLabel='bbbbb' showTime inputId="birth_date" hourFormat="12" value={date} onChange={(e) => setDate(e.value)} className='w-full mb-3' />
                        {/* <label htmlFor="birth_date">Birth Date</label> */}
                        {/* </FloatLabel> */}
                        <InputText type="text" placeholder="Normal" className="p-inputtext-sm w-full mb-3" value={eventData.eventInfo} />
                        <div className='text-center'>
                            <Button label="Save As Draft" className='mr-3' outlined rounded />
                            <Button label="Post" outlined rounded />
                        </div>
                    </p>
                </Dialog>
            }
        </div>
    )
}

export default EventCard;
