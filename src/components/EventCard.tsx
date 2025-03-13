import React, { useContext, useRef, useState } from 'react'
import { EventType } from '../interface/EventInterface';
import { Button } from 'primereact/button';
import axios from 'axios';
import { Toast } from 'primereact/toast';
import { ProductContextData } from '../context/ContextData';
// import { userPresentersI } from '../interface/Presenters';
import { AiOutlineDelete } from 'react-icons/ai';
import { LiaUserEditSolid } from 'react-icons/lia';
import { Dialog } from 'primereact/dialog';
import { Dropdown } from 'primereact/dropdown';
import { InputText } from 'primereact/inputtext';
import { InputTextarea } from 'primereact/inputtextarea';
import { Calendar } from 'primereact/calendar';
import { IndustryList, SegmentList } from '../interface/IndustryAndSegment';
import { Nullable } from "primereact/ts-helpers";

interface EventProps {
    eventData: EventType,
    index: number,
    eventDetails: string
}

const EventCard: React.FC<EventProps> = (props) => {
    const context = useContext(ProductContextData);
    if (!context) {
        throw new Error('it should not be null');
    }
    const { getAllToAttendEventsDataByApi, getAllUpcomingEventsDataByApi,getLengthOfAllUpcomingEventsByApi, storeAllPresenters, setPresentersDetailsPopupValue, setPresentersDetailsPopup, loginUserDetail, storeAllToAttendEvents } = context;
    const toast = useRef<Toast>(null)
    const { eventData, eventDetails } = props;
    const [isLoadingForPostAttendEvent, setIsLoadingForPostAttendEvent] = useState<boolean>(false)
    const [isLoadingForWithdrawAttendEvent, setIsLoadingForWithdrawAttendEvent] = useState<boolean>(false)
    const [editEventBoolean, setEditEventBoolean] = useState<boolean>(false);
    const [storeEditEventsDetails, setStoreEditEventsDetails] = useState<any>(null)
    const [eventDate, setEventDate] = useState<Nullable<Date>>(null);
  const [CreateEventErrors, setCreateEventErrors] = useState([])


    const getCorrectTime = (date: any) => {
        let hours = date.getHours();
        const minutes = date.getMinutes();
        const ampm = hours >= 12 ? 'PM' : 'AM';
        hours = hours % 12;
        hours = hours ? hours : 12;
        const minutesString = minutes < 10 ? `0${minutes}` : minutes;
        return `${hours}:${minutesString} ${ampm}`;
    }

    const modifiedEventDate = (date: any) => {
        let updatedDate = new Date(date);
        let modifiedTrimFormate = updatedDate.toString().split(' ').slice(0, 5);
        let modifiedFormate = `${modifiedTrimFormate[0]}, ${modifiedTrimFormate[2]} ${modifiedTrimFormate[1]} ${modifiedTrimFormate[3]}, ${getCorrectTime(updatedDate)}`;
        return modifiedFormate;
    }

    const postAttendEventByApi = () => {
        setIsLoadingForPostAttendEvent(true)
        axios.post(`${import.meta.env.VITE_BASE_URL}/university-student/events/v1/attend/${eventData?._id}`, {}, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('userAccessToken')}`
            },
        }).then((response) => {
            toast?.current?.show({ severity: 'success', summary: 'Success', detail: 'Added Event to attend !' });
            console.log(response)
            setIsLoadingForPostAttendEvent(false);
            setTimeout(() => {
                getAllUpcomingEventsDataByApi()
            }, 1200)

        }).catch(err => {
            console.log(err, 'error')
            setIsLoadingForPostAttendEvent(false)
        })
    }

    const withdrawAttendEventByApi = () => {
        setIsLoadingForWithdrawAttendEvent(true)
        axios.post(`${import.meta.env.VITE_BASE_URL}/university-student/events/v1/withdraw/${eventData?._id}`, {}, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('userAccessToken')}`
            },
        }).then((response) => {
            toast?.current?.show({ severity: 'success', summary: 'Success', detail: 'Event Withdrawal Done !' });
            console.log(response)
            setIsLoadingForWithdrawAttendEvent(false)
            setTimeout(() => {
                getAllToAttendEventsDataByApi();
            }, 1200)
        }).catch(err => {
            console.log(err)
            setIsLoadingForWithdrawAttendEvent(false)
        })
    }

    const handlePresenterDetailPopupForEvent = () => {
        let getPresenterInfo = storeAllPresenters.find((item) => item._id === eventData.presenterId);
        if (!getPresenterInfo) {
            toast?.current?.show({
                severity: 'error',
                summary: 'Error',
                detail: 'Presenter information not found !'
            });
            return;
        }
        setPresentersDetailsPopup(getPresenterInfo);
        setPresentersDetailsPopupValue(true);
    }

    const isEventAlreadyAttended = () => {
        return storeAllToAttendEvents?.some((item) => item._id === eventData._id) ?? false;
    }
    const deleteEventByPresenter = (id: string) => {

        axios.delete(`${import.meta.env.VITE_BASE_URL}/university-student/events/v1/class/${id}`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('userAccessToken')}`
            }
        })
            .then(() => {
                toast.current?.show({
                    severity: 'success',
                    summary: 'Success',
                    detail: 'Event deleted successfully!'
                });
                setTimeout(() => {
                    getLengthOfAllUpcomingEventsByApi();
                    getAllUpcomingEventsDataByApi();
                }, 1200)

            })
            .catch(() => {
                toast.current?.show({
                    severity: 'error',
                    summary: 'Error',
                    detail: 'Failed to delete event'
                });
            });
    };

    const handleEditEvent = (data: any) => {
        setEditEventBoolean(true);
        setStoreEditEventsDetails(data);
        setEventDate(new Date(data.toDateTime));
    }


    const onChangeFunForEditEvent = (e: any) => {
        const { value, name } = e.target;
        setStoreEditEventsDetails({
            ...storeEditEventsDetails,
            [name]: value
        })
    }

    const updateCurrentEvent = () => {
        let url = `${import.meta.env.VITE_BASE_URL}/university-student/events/v1/class/${eventData?._id}`;
        let payload = {
            eventName: storeEditEventsDetails.eventName,
            description: storeEditEventsDetails.description,
            place: storeEditEventsDetails.place,
            // eventPrerequisite: createEventDetails.eventPrerequisite,
            industry: storeEditEventsDetails.industry,
            segment: storeEditEventsDetails.segment,
            fromDateTime: eventDate?.getTime(),
            toDateTime: eventDate?.getTime(),
            org: loginUserDetail.org
        }

        axios.patch(url, payload, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('userAccessToken')}`
            },
        }).then((response) => {
            console.log(response, 'updated event');
            setCreateEventErrors([]);
            toast.current?.show({
                severity: 'success',
                summary: 'Success',
                detail: 'Event updated successfully!'
            });
            setTimeout(()=>{
                getAllUpcomingEventsDataByApi();
            },1200)
        }).catch(err => {
            console.log(err, 'err')
            setCreateEventErrors(err?.response?.data?.message ?? []);

        })
    }
    return (
        <div className='flex flex-col justify-between h-full'>
            <div>
                <div className='flex flex-col items-start'>
                    <h3 className='text-[16px] sm:text-[18px] font-bold lg:text-xl md:font-medium text-[#474747] capitalize w-full'>{eventData.eventName}</h3>
                    <div className='flex flex-col text-[12px] sm:text-[14px] lg:text-[15px] text-[#818181] w-full xl:items-end'>
                        <span>{modifiedEventDate(eventData.toDateTime)}</span>
                    </div>
                </div>
                <p className='mt-4 text-[13px] sm:text-[14px] lg:text-[15px] text-[#818181] textinThreeLineSix'>{eventData.description}</p>
                <p className='my-2 md:my-3 text-[13px] sm:text-[14px] lg:text-[15px] text-[#818181]'><span className='font-bold text-[#0e7490] cursor-pointer' onClick={handlePresenterDetailPopupForEvent}>See Presenter's Detail</span></p>
            </div>
            <div>
                {
                    (eventDetails == 'Upcoming Events' || eventDetails == '/') && <div className='eventBtnContainer flex justify-end items-center'>
                        <Button disabled={isEventAlreadyAttended()} className='text-[12px] sm:text-[13px] lg:text-[15px]' size='small' loading={isLoadingForPostAttendEvent ? true : false} onClick={postAttendEventByApi} label={isEventAlreadyAttended() ? "Already Attending" : "Attend"} severity="secondary" />
                    </div>
                }
                {
                    eventDetails == 'To Attend' ? <div className='flex flex-col md:flex-row items-start justify-between md:items-center text-[#474747]'>
                        <div className='text-[13px] md:text-[15px]'>Attendee - <span>{eventData.attendees}</span></div>
                        <Button className='text-[12px] md:text-[15px]' size='small' loading={isLoadingForWithdrawAttendEvent ? true : false} label="Withdraw" severity="secondary" onClick={withdrawAttendEventByApi} />
                    </div> : eventDetails == 'To Present' ? <div className='flex justify-between items-center cursor-pointer text-[#474747]'>
                        <div className='text-[13px] md:text-[15px]'>Attendee - <span>{eventData.attendees}</span></div>
                        {
                            loginUserDetail._id === eventData.presenterId && <div className='flex text-[#474747]'>
                                <LiaUserEditSolid size={23} className='mr-2' onClick={() => { handleEditEvent(eventData) }} />
                                <AiOutlineDelete size={23} color='red' onClick={() => { deleteEventByPresenter(eventData?._id) }} />
                            </div>
                        }
                    </div> : eventDetails == 'Presented' && <div className='flex justify-between items-center cursor-pointer'>
                        <div className='text-[#474747] text-[13px] md:text-[15px]'>Attendee - <span>{eventData.attendees}</span></div>
                        {/* <Rating value={eventData.eventRating} cancel={false} /> */}
                    </div>
                    //  onChange={(e: RatingChangeEvent) => setValue(e.value)} 
                }
            </div>
            {
                editEventBoolean &&
                <Dialog header="Edit Event" dismissableMask className='w-full md:max-w-[65vw]' draggable={false} visible={editEventBoolean} onHide={() => { if (!editEventBoolean) return; setEditEventBoolean(false); }}>
                    {/* <p className="m-0"> */}
                        {/* <div className="card m-2"> */}
                            {/* <h3 className='text-[24px] md:text-[28px] lg:text-[32px] mb-7 text-center border-b border-[#ddd] border-solid'>Create New Event</h3> */}
                            <div className="flex flex-wrap flex-col items-start justify-start mb-3 gap-2">
                                <label htmlFor="eventName" className="">Event Name:</label>
                                <InputText id="eventName" value={storeEditEventsDetails.eventName} name='eventName' onChange={onChangeFunForEditEvent} placeholder="Enter the event name" className="mr-2 w-full" />
                            </div>
                            <div className="flex flex-wrap flex-col items-start justify-start mb-3 gap-2">
                                <label htmlFor="eventDescription" className="">Event Description:</label>
                                <InputTextarea autoResize value={storeEditEventsDetails.description} name='eventDescription' onChange={onChangeFunForEditEvent} placeholder='Description..' rows={5} cols={30} className='mr-2 w-full' />
                            </div>
                            <div className="flex flex-wrap flex-col items-start justify-start mb-3 gap-2">
                                <label htmlFor="eventPlace" className="">Event Place:</label>
                                <InputText id="eventPlace" value={storeEditEventsDetails.place} name='eventPlace' onChange={onChangeFunForEditEvent} placeholder="Enter the event place" className="mr-2 w-full" />
                            </div>
                            {/* <div className="flex flex-wrap flex-col items-start justify-start mb-3 gap-2">
                                <label htmlFor="eventPrerequisite" className="">Event Pre-Requisite:</label>
                                <InputText id="eventPrerequisite" value={storeEditEventsDetails.eventPrerequisite} name='eventPrerequisite' onChange={onChangeFunForEditEvent} placeholder="Enter Prerequisite for attendee" className="mr-2 w-full" />
                            </div> */}
                            <div className="flex flex-wrap flex-col items-start justify-start mb-3 gap-2">
                                <label htmlFor="eventIndustry" className="">Event Industry:</label>
                                {/* <InputText id="eventIndustry" value={createEventDetails.eventIndustry} name='eventIndustry' onChange={onChangeFun} placeholder="Enter Industry" className="mr-2 w-full" /> */}
                                <Dropdown value={storeEditEventsDetails.industry} name='eventIndustry' onChange={onChangeFunForEditEvent} options={IndustryList} placeholder="Select Industry" filter className="w-full md:w-14rem" />
                            </div>
                            <div className="flex flex-wrap flex-col items-start justify-start mb-3 gap-2">
                                <label htmlFor="eventSegment" className="">Event Segment:</label>
                                <Dropdown value={storeEditEventsDetails.segment} name='eventSegment' onChange={onChangeFunForEditEvent} options={SegmentList} placeholder="Select Segment" filter className="w-full md:w-14rem" />
                            </div>
                            <div className="flex flex-wrap flex-col items-start justify-start mb-3 gap-2">
                                <label htmlFor="eventDateTime" className="">Event Date/Time:</label>
                                {/* <InputText id="eventDateTime" value={createEventDetails.eventPlace} name='eventDateTime' onChange={onChangeFun} placeholder="Enter " className="mr-2 w-full" /> */}
                                <Calendar touchUI showTime numberOfMonths={1} hideOnDateTimeSelect readOnlyInput placeholder='Click to select date and time for event' hourFormat="12" value={eventDate} onChange={(e) => setEventDate(e.value)} className='w-full mb-3' />
                            </div>
                            {
                                CreateEventErrors?.map((items) => {
                                    return <div className="mb-3 text-red-500">
                                        {items}
                                    </div>
                                })
                            }
                            <Button label='Submit' onClick={updateCurrentEvent} />
                        {/* </div> */}
                    {/* </p> */}
                </Dialog>
            }
            <Toast ref={toast} />

        </div>
    )
}

export default EventCard;
