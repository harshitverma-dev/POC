import React, { useContext, useRef, useState } from 'react'
import { EventType } from '../interface/EventInterface';
import { Button } from 'primereact/button';
import axios from 'axios';
import { Toast } from 'primereact/toast';
import { ProductContextData } from '../context/ContextData';
// import { userPresentersI } from '../interface/Presenters';
import { AiOutlineDelete } from 'react-icons/ai';
import { LiaUserEditSolid } from 'react-icons/lia';

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
    const { getAllToAttendEventsDataByApi, getAllUpcomingEventsDataByApi, storeAllPresenters, setPresentersDetailsPopupValue, setPresentersDetailsPopup, loginUserDetail, storeAllToAttendEvents } = context;
    const toast = useRef<Toast>(null)
    const { eventData, eventDetails } = props;
    const [isLoadingForPostAttendEvent, setIsLoadingForPostAttendEvent] = useState<boolean>(false)
    const [isLoadingForWithdrawAttendEvent, setIsLoadingForWithdrawAttendEvent] = useState<boolean>(false)

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
                                <LiaUserEditSolid size={23} className='mr-2' />
                                <AiOutlineDelete size={23} color='red' />
                            </div>
                        }
                    </div> : eventDetails == 'Presented' && <div className='flex justify-between items-center cursor-pointer'>
                        <div className='text-[#474747] text-[13px] md:text-[15px]'>Attendee - <span>{eventData.attendees}</span></div>
                        {/* <Rating value={eventData.eventRating} cancel={false} /> */}
                    </div>
                    //  onChange={(e: RatingChangeEvent) => setValue(e.value)} 
                }
            </div>
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
            <Toast ref={toast} />
        </div>
    )
}

export default EventCard;
