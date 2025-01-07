import React from 'react'
import { EventType } from '../interface/EventInterface';
import { Button } from 'primereact/button';
import { LiaUserEditSolid } from "react-icons/lia";
// import { Rating } from "primereact/rating";
// import { Dialog } from 'primereact/dialog';
// import { Dropdown } from 'primereact/dropdown';
// import { InputText } from 'primereact/inputtext';
// import { InputTextarea } from 'primereact/inputtextarea'
// import { Calendar } from 'primereact/calendar';
// import { FloatLabel } from 'primereact/floatlabel';
import { AiOutlineDelete } from "react-icons/ai";
import axios from 'axios';
// import { Nullable } from "primereact/ts-helpers";


interface EventProps {
    eventData: EventType,
    index: number,
    eventDetails: string
}

const EventCard: React.FC<EventProps> = (props) => {
    // const [value, setValue] = useState<any>(null);


    const { eventData, eventDetails } = props;
    // const [editEventBoolean, setEditEventBoolean] = useState(false);
    // const [date, setDate] = useState<Nullable<Date>>(null);

    // console.log(props, eventData)
    // const [selectedCity, setSelectedCity] = useState();
    // const cities = [
    //     { name: 'New York', code: 'NY' },
    //     { name: 'Rome', code: 'RM' },
    //     { name: 'London', code: 'LDN' },
    //     { name: 'Istanbul', code: 'IST' },
    //     { name: 'Paris', code: 'PRS' }
    // ];

    const openDialogFun = () => {
        // setEditEventBoolean(true);
    }

    const getCorrectTime = (date: any) => {
        let hours = date.getHours();
        const minutes = date.getMinutes();
        const ampm = hours >= 12 ? 'PM' : 'AM';
        hours = hours % 12;
        hours = hours ? hours : 12;
        const minutesString = minutes < 10 ? `0${minutes}` : minutes;
        return `${hours}:${minutesString} ${ampm}`;
    }
    // console.log(eventData)
    const modifiedEventDate = (date: any) => {
        let updatedDate = new Date(date);
        let modifiedTrimFormate = updatedDate.toString().split(' ').slice(0, 5);

        let modifiedFormate = `${modifiedTrimFormate[0]}, ${modifiedTrimFormate[2]} ${modifiedTrimFormate[1]} ${modifiedTrimFormate[3]}, ${getCorrectTime(updatedDate)}`;
        console.log(modifiedFormate, modifiedTrimFormate)
        return modifiedFormate;
    }

    const postAttendEventByApi = () => {
        axios.post(`http://localhost:3000/university-student/events/v1/attend/${eventData?._id}`,{}, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('userAccessToken')}`
            },
        }).then((response) => {
            console.log(response)
        }).catch(err => {
            console.log(err)
        })
    }
    return (
        <div className='flex flex-col justify-between'>
            <div className='flex justify-between items-center'>
                <h3 className='text-[20px] text-xl font-medium text-[#474747] capitalize w-1/2'>{eventData.eventName ?? 'sdsd'}</h3>
                <div className='flex flex-col text-[15px] text-[#5e5e5e] w-1/2 items-end'>
                    <span>{modifiedEventDate(eventData.toDateTime)}</span>
                    {/* <span>{eventData.eventTime}</span> */}
                </div>
            </div>
            <p className='mt-4 text-[15px] text-[#5e5e5e]'>{eventData.description}</p>
            <p className='my-3 text-[15px] text-[#5e5e5e]'>Presenter - {eventData.presenterId}</p>
            {
                (eventDetails == 'Upcoming Events' || eventDetails == '/') && <div className='eventBtnContainer flex justify-end items-center'>
                    <Button size='small' onClick={postAttendEventByApi} label="Attend" severity="secondary" />
                </div>
            }
            {
                eventDetails == 'To Attend' ? <div className='flex justify-between items-center text-[#474747]'>
                    <div>Attendee - <span>115</span></div>
                    <Button size='small' label="Withdraw" severity="secondary" />
                </div> : eventDetails == 'To Present' ? <div className='flex justify-between items-center cursor-pointer text-[#474747]'>
                    <div>Attendee - <span>115</span></div>
                    <div className='flex text-[#474747]'> <LiaUserEditSolid size={23} onClick={openDialogFun} className='mr-2' /> <AiOutlineDelete size={23} color='red' /></div> </div> : eventDetails == 'Presented' && <div className='flex justify-between items-center cursor-pointer'>
                        <div className='text-[#474747]'>Attendee - <span>115</span></div>
                        {/* <Rating value={eventData.eventRating} cancel={false} /> */}
                    </div>
                //  onChange={(e: RatingChangeEvent) => setValue(e.value)} 
            }
            {/* 
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
                        <Calendar ariaLabel='bbbbb' showTime inputId="birth_date" hourFormat="12" value={date} onChange={(e) => setDate(e.value)} className='w-full mb-3' />
                        <InputText type="text" placeholder="Normal" className="p-inputtext-sm w-full mb-3" value={eventData.eventInfo} />
                        <div className='text-center'>
                            <Button label="Save As Draft" className='mr-3' outlined rounded />
                            <Button label="Post" outlined rounded />
                        </div>
                    </p>
                </Dialog>
            } */}
        </div>
    )
}

export default EventCard;
