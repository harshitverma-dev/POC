import React, { useContext, useState } from 'react'
import { Dropdown } from 'primereact/dropdown';
import { InputText } from 'primereact/inputtext';
import { InputTextarea } from 'primereact/inputtextarea'
import { Calendar } from 'primereact/calendar';
// import { FloatLabel } from 'primereact/floatlabel';
import { Nullable } from "primereact/ts-helpers";
import { Button } from 'primereact/button';
import axios from 'axios';
import { ProductContextData } from '../context/ContextData';
import { useNavigate } from 'react-router-dom';
import { IndustryList, SegmentList } from '../interface/IndustryAndSegment';

const AddEvent: React.FC = () => {
    const [eventData, setEventDate] = useState<Nullable<Date>>(null);
    const [createEventDetails, setCreateEventDetails] = useState({
        eventName: '',
        eventDescription: '',
        eventPlace: '',
        eventPrerequisite: '',
        eventIndustry: '',
        eventSegment: ''
    })
    // const []
    const [CreateEventErrors, setCreateEventErrors] = useState([])
    const context = useContext(ProductContextData);
    if (!context) {
        throw new Error('it should not be null');
    }
    const { loginUserDetail, getLengthOfAllUpcomingEventsByApi, getLengthOfAllPastEventsByApi} = context;
    const navigate = useNavigate()

    const onChangeFun = (e: any) => {
        const { value, name } = e.target;
        setCreateEventDetails({
            ...createEventDetails,
            [name]: value
        })
    }

    const modifiedDateTime = eventData && eventData.getTime();


    // console.log(props, eventData)
    // const [selectedCity, setSelectedCity] = useState();
    // const cities = [
    //     { name: 'New York', code: 'NY' },
    //     { name: 'Rome', code: 'RM' },
    //     { name: 'London', code: 'LDN' },
    //     { name: 'Istanbul', code: 'IST' },
    //     { name: 'Paris', code: 'PRS' }
    // ];

    const saveEvent = () => {
        let url = `${import.meta.env.VITE_BASE_URL}/university-student/events/v1/class`;
        let payload = {
            eventName: createEventDetails.eventName,
            description: createEventDetails.eventDescription,
            place: createEventDetails.eventPlace,
            eventPrerequisite: createEventDetails.eventPrerequisite,
            industry: createEventDetails.eventIndustry,
            segment: createEventDetails.eventSegment,
            fromDateTime: modifiedDateTime,
            toDateTime: modifiedDateTime,
            org: loginUserDetail.org
        }

        axios.post(url, payload, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('userAccessToken')}`
            },
        }).then((response) => {
            console.log(response, 'save event');
            setCreateEventErrors([]);
            navigate('/')
            getLengthOfAllUpcomingEventsByApi();
            getLengthOfAllPastEventsByApi();
        }).catch(err => {
            console.log(err, 'err')
            setCreateEventErrors(err?.response?.data?.message ?? []);

        })
    }

    return (
        // create
        // <div>
        //     <InputText type="text" placeholder="Normal" className="p-inputtext-sm w-full mb-3" value={'sss'} />
        //     <InputTextarea autoResize value={'ss'} rows={5} className='w-full mb-3' />
        //     <InputText type="text" placeholder="Normal" className="p-inputtext-sm w-full mb-3" value={'ss'} />
        //     <Calendar ariaLabel='bbbbb' showTime inputId="birth_date" hourFormat="12" value={date} onChange={(e) => setDate(e.value)} className='w-full mb-3' />
        //     <label htmlFor="birth_date">Birth Date</label>
        //     </FloatLabel>
        //     <InputText type="text" placeholder="Normal" className="p-inputtext-sm w-full mb-3" value={'ss'} />
        // </div>
        <div className='w-full md:w-1/2 m-auto addEventContainer rounded p-5'>
            <div className="card">
                <h3 className='text-[24px] md:text-[28px] lg:text-[32px] mb-7 text-center border-b border-[#ddd] border-solid'>Create New Event</h3>
                <div className="flex flex-wrap flex-col items-start justify-start mb-3 gap-2">
                    <label htmlFor="eventName" className="">Event Name:</label>
                    <InputText id="eventName" value={createEventDetails.eventName} name='eventName' onChange={onChangeFun} placeholder="Enter the event name" className="mr-2 w-full" />
                </div>
                <div className="flex flex-wrap flex-col items-start justify-start mb-3 gap-2">
                    <label htmlFor="eventDescription" className="">Event Description:</label>
                    <InputTextarea autoResize value={createEventDetails.eventDescription} name='eventDescription' onChange={onChangeFun} placeholder='Description..' rows={5} cols={30} className='mr-2 w-full' />
                </div>
                <div className="flex flex-wrap flex-col items-start justify-start mb-3 gap-2">
                    <label htmlFor="eventPlace" className="">Event Place:</label>
                    <InputText id="eventPlace" value={createEventDetails.eventPlace} name='eventPlace' onChange={onChangeFun} placeholder="Enter the event place" className="mr-2 w-full" />
                </div>
                <div className="flex flex-wrap flex-col items-start justify-start mb-3 gap-2">
                    <label htmlFor="eventPrerequisite" className="">Event Pre-Requisite:</label>
                    <InputText id="eventPrerequisite" value={createEventDetails.eventPrerequisite} name='eventPrerequisite' onChange={onChangeFun} placeholder="Enter Prerequisite for attendee" className="mr-2 w-full" />
                </div>
                <div className="flex flex-wrap flex-col items-start justify-start mb-3 gap-2">
                    <label htmlFor="eventIndustry" className="">Event Industry:</label>
                    {/* <InputText id="eventIndustry" value={createEventDetails.eventIndustry} name='eventIndustry' onChange={onChangeFun} placeholder="Enter Industry" className="mr-2 w-full" /> */}
                    <Dropdown value={createEventDetails.eventIndustry} name='eventIndustry' onChange={onChangeFun} options={IndustryList} placeholder="Select Industry" filter className="w-full md:w-14rem" />
                </div>
                <div className="flex flex-wrap flex-col items-start justify-start mb-3 gap-2">
                    <label htmlFor="eventSegment" className="">Event Segment:</label>
                    <Dropdown value={createEventDetails.eventSegment} name='eventSegment' onChange={onChangeFun} options={SegmentList} placeholder="Select Segment" filter className="w-full md:w-14rem" />
                </div>
                <div className="flex flex-wrap flex-col items-start justify-start mb-3 gap-2">
                    <label htmlFor="eventDateTime" className="">Event Date/Time:</label>
                    {/* <InputText id="eventDateTime" value={createEventDetails.eventPlace} name='eventDateTime' onChange={onChangeFun} placeholder="Enter " className="mr-2 w-full" /> */}
                    <Calendar touchUI showTime numberOfMonths={1} hideOnDateTimeSelect readOnlyInput placeholder='Click to select date and time for event' hourFormat="12" value={eventData} onChange={(e) => setEventDate(e.value)} className='w-full mb-3' />
                </div>
                {
                    CreateEventErrors?.map((items) => {
                        return <div className="mb-3 text-red-500">
                            {items}
                        </div>
                    })
                }
                <Button label='Submit' onClick={saveEvent} />
            </div>
        </div>
    )
}

export default AddEvent
