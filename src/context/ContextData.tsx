import React, { createContext, ReactNode, useEffect, useState } from 'react'
import { userPresentersI } from '../interface/Presenters';
import axios from 'axios';
import { EventType } from '../interface/EventInterface';
import { IndustrySegemntType } from '../interface/IndustryAndSegment';

export interface createContextType {
    // storeAllUpcomingEvents: any,
    setStoreAllUpcomingEvents: React.Dispatch<React.SetStateAction<any>>
    isFilterForm: boolean,
    setIsFilterForm: React.Dispatch<React.SetStateAction<boolean>>,
    toggleEventTabs: boolean,
    setToggleEventTabs: React.Dispatch<React.SetStateAction<boolean>>,
    activeMainTab: string,
    setActiveMainTab: React.Dispatch<React.SetStateAction<string>>,
    activeEventSubTab: string,
    setEventSubTab: React.Dispatch<React.SetStateAction<string>>
    getAllPresentersDataByApi: () => void
    storeAllPresenters: userPresentersI[] | []
    setStoreAllPresenters: React.Dispatch<React.SetStateAction<userPresentersI[] | []>>
    presentersDetailsPopupValue: boolean,
    setPresentersDetailsPopupValue: React.Dispatch<React.SetStateAction<boolean>>,
    presentersDetailsPopup: null | userPresentersI,
    setPresentersDetailsPopup: React.Dispatch<React.SetStateAction<null | userPresentersI>>
    getAllUpcomingEventsDataByApi: () => void,
    storeAllUpcomingEvents: EventType[] | [],
    logInPopupValue: boolean,
    setLoginPopupValue: React.Dispatch<React.SetStateAction<boolean>>,
    initateForgetPasswordPopupValue: boolean,
    setInitateForgetPasswordPopupValue: React.Dispatch<React.SetStateAction<boolean>>,
    loginForm: loginFormI,
    setLoginForm: React.Dispatch<React.SetStateAction<loginFormI>>,
    appLoader: boolean,
    // isStoreAllToAttendEventsLoader: boolean,
    // isstoreAllPastEventsLoader: boolean,
    // isStoreAllToPresentersLoader: boolean
    loginUserDetail: any | null,
    setLoginUserDetail: React.Dispatch<React.SetStateAction<any | null>>,
    getAllPastEventsDataByApi: () => void,
    storeAllPastEvents: EventType[] | [],
    setStoreAllPastEvents: React.Dispatch<React.SetStateAction<any>>,
    getAllSubAdminListDataByApi: () => void,
    storeAllSubAdminList: userPresentersI[] | [],
    setStoreAllSubAdminList: React.Dispatch<React.SetStateAction<userPresentersI[] | []>>,
    getAllToAttendEventsDataByApi: () => void
    storeAllToAttendEvents: EventType[] | []
    limitForUpcomingEvents: number,
    skipForUpcomingEvents: number,
    setLimitForUpcomingEvent: React.Dispatch<React.SetStateAction<number>>,
    setSkipForUpcomingEvent: React.Dispatch<React.SetStateAction<number>>,
    getLengthOfAllUpcomingEventsByApi: () => void,
    storeLengthOfUpcomingEvents: number,
    onPageChangeForUpcoming: (e: any) => void,
    limitForPastEvents: number,
    skipForPastEvents: number,
    setLimitForPastEvent: React.Dispatch<React.SetStateAction<number>>,
    setSkipForPastEvent: React.Dispatch<React.SetStateAction<number>>,
    getLengthOfAllPastEventsByApi: () => void,
    storeLengthOfPastEvents: number,
    filterFields: IndustrySegemntType,
    setFilterFields: React.Dispatch<React.SetStateAction<IndustrySegemntType>>,
    applyFilterData: () => void,
    removeFilter: () => void
    forgetPasswordForEmail: string
    setForgetPasswordForEmail: React.Dispatch<React.SetStateAction<string>>,
    setToggleSidebar: React.Dispatch<React.SetStateAction<boolean>>,
    toggleSidebar: boolean
    // storeAllUnratedEvents: EventType[] | [],
    // setStoreAllUnratedEvents: React.Dispatch<React.SetStateAction<EventType[] | []>>,
    // currentEventToRate : EventType | null,
    // setCurrentEventToRate: React.Dispatch<React.SetStateAction<EventType | null>>,
    // ratingPopupVisible: boolean,
    // setRatingPopupVisible: React.Dispatch<React.SetStateAction<boolean>>,
}

interface props {
    children: ReactNode
}

interface loginFormI {
    userEmail: string,
    userPassword: string | any
}

export const ProductContextData = createContext<createContextType | null>(null);

const ContextData: React.FC<props> = ({ children }) => {
    // const [storeUpcomingEvents, setStoreUpcomingEvents] = useState([]);
    const [isFilterForm, setIsFilterForm] = useState(false);
    const [toggleEventTabs, setToggleEventTabs] = useState(false);
    const [activeMainTab, setActiveMainTab] = useState('');
    const [activeEventSubTab, setEventSubTab] = useState('To Attend');
    const [storeAllPresenters, setStoreAllPresenters] = useState<userPresentersI[] | []>([]);
    const [presentersDetailsPopupValue, setPresentersDetailsPopupValue] = useState<boolean>(false);
    const [presentersDetailsPopup, setPresentersDetailsPopup] = useState<userPresentersI | null>(null);
    const [storeAllUpcomingEvents, setStoreAllUpcomingEvents] = useState<EventType[] | []>([]);
    const [logInPopupValue, setLoginPopupValue] = useState<boolean>(false)
    const [initateForgetPasswordPopupValue, setInitateForgetPasswordPopupValue] = useState<boolean>(false)
    const [loginForm, setLoginForm] = useState<loginFormI>({
        userEmail: '',
        userPassword: ''
    })
    const [appLoader, setAppLoader] = useState<boolean>(true);
    // const [isStoreAllToAttendEventsLoader, setIsStoreAllToAttendEventsLoader] = useState<boolean>(true);
    // const [isStoreAllToPresentersLoader, setIsStoreAllToPresentersLoader] = useState<boolean>(true)
    // const [isstoreAllPastEventsLoader, setIsStoreAllPastEventLoader] = useState<boolean>(true);
    const [loginUserDetail, setLoginUserDetail] = useState<any | null>(null);
    const [storeAllPastEvents, setStoreAllPastEvents] = useState<EventType[] | []>([])
    const [storeAllSubAdminList, setStoreAllSubAdminList] = useState<userPresentersI[] | []>([]);
    const [storeAllToAttendEvents, setStoreAllToAttendEvents] = useState<EventType[] | []>([])
    const [limitForUpcomingEvents, setLimitForUpcomingEvent] = useState<number>(6);
    const [skipForUpcomingEvents, setSkipForUpcomingEvent] = useState<number>(0)
    const [storeLengthOfUpcomingEvents, setStoreLengthOfUpcomingEvent] = useState<number>(0)
    const [limitForPastEvents, setLimitForPastEvent] = useState<number>(6);
    const [skipForPastEvents, setSkipForPastEvent] = useState<number>(0)
    const [storeLengthOfPastEvents, setStoreLengthOfPastEvent] = useState<number>(0)
    const [filterFields, setFilterFields] = useState<IndustrySegemntType>({
        industry: '',
        segment: ''
    })
    const [forgetPasswordForEmail, setForgetPasswordForEmail] = useState<string>('')
    const [toggleSidebar, setToggleSidebar] = useState<boolean>(false);
    // for event Rating
    // const [storeAllUnratedEvents, setStoreAllUnratedEvents] = useState<EventType[] | []>([])
    // const [currentEventToRate, setCurrentEventToRate] = useState<EventType | null>(null);
    // const [ratingPopupVisible, setRatingPopupVisible] = useState<boolean>(false);
    // IndustrySegemntType

    // const [UpcomingE]

    // get All Presenters ->>
    const getAllPresentersDataByApi = () => {
        setAppLoader(true);
        axios.get(`${import.meta.env.VITE_BASE_URL}/university-student/profile/v1/presentrs?limit=0&skip=0`).then((response) => {
            // console.log(response);
            setAppLoader(false);
            setStoreAllPresenters(response.data.presenters);
        }).catch(err => {
            console.log(err);
            setAppLoader(false);
        })
    }

    // get Upcoming all Events ->>
    const getLengthOfAllUpcomingEventsByApi = () => {
        setAppLoader(true);
        axios.get(`${import.meta.env.VITE_BASE_URL}/university-student/events/v1/events?limit=0&skip=0&industry=''&segment=''`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('userAccessToken')}`
            },
        }).then((response) => {
            console.log('pk')
            setStoreLengthOfUpcomingEvent(response.data.events.length);
            setAppLoader(false)
        }).catch((err) => {
            console.log(err, 'err');
            setAppLoader(false)
        })
    }
    const getAllUpcomingEventsDataByApi = () => {
        setAppLoader(true);
        axios.get(`${import.meta.env.VITE_BASE_URL}/university-student/events/v1/events?limit=${limitForUpcomingEvents}&skip=${skipForUpcomingEvents}&industry=${filterFields.industry}&segment=${filterFields.segment}`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('userAccessToken')}`
            },
        }).then((response) => {
            // console.log(response, `${import.meta.env.VITE_BASE_URL}/university-student/events/v1/events?limit=${limitForUpcomingEvents}&skip=${skipForUpcomingEvents}&industry=${filterFields.industry}&segment=${filterFields.segment}`);
            setStoreAllUpcomingEvents(response.data.events)
            setAppLoader(false)
            console.log('pk1')
        }).catch((err) => {
            console.log(err, 'err')
            // setTimeout(()=>{
            setAppLoader(false)
            // }, 5000)
        })
    }



    // get Past all Events ->> 
    const getLengthOfAllPastEventsByApi = () => {
        setAppLoader(true);
        axios.get(`${import.meta.env.VITE_BASE_URL}/university-student/events/v1/past-events?limit=0&skip=0&industry=''&segment=''`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('userAccessToken')}`
            },
        }).then((response) => {
            setStoreLengthOfPastEvent(response.data.length);
            setAppLoader(false)
            console.log(response, 'kp')
        }).catch((err) => {
            console.log(err, 'err')
            setAppLoader(false)
        })
    }
    const getAllPastEventsDataByApi = () => {
        setAppLoader(true)
        axios.get(`${import.meta.env.VITE_BASE_URL}/university-student/events/v1/past-events?limit=${limitForPastEvents}&skip=${skipForPastEvents}&industry=${filterFields.industry}&segment=${filterFields.segment}`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('userAccessToken')}`
            },
        }).then((response) => {
            setStoreAllPastEvents(response.data)
            setAppLoader(false)
        }).catch((err) => {
            console.log(err, 'err')
            setAppLoader(false)
        })
    }

    // get sub admin list ->>
    const getAllSubAdminListDataByApi = () => {
        setAppLoader(true);
        axios.get(`${import.meta.env.VITE_BASE_URL}/university-student/profile/v1/users?limit=0&skip=0&role=SUBADMIN`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('userAccessToken')}`
            },
        }).then((response) => {
            setStoreAllSubAdminList(response.data)
            // console.log(response);
            setAppLoader(false);
        }).catch(err => {
            console.log(err)
            setAppLoader(false);
        })
    }

    // get all to attend Events list ->> 
    const getAllToAttendEventsDataByApi = () => {
        setAppLoader(true)
        axios.get(`${import.meta.env.VITE_BASE_URL}/university-student/events/v1/to-attend`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('userAccessToken')}`
            },
        }).then((response) => {
            console.log(response, 'to attend');
            setStoreAllToAttendEvents(response.data);
            setAppLoader(false);
            // let unratedEvents = response.data.filter((event:EventType)=> !event.rating)
            // if(unratedEvents.length > 0){
            //     setStoreAllUnratedEvents(unratedEvents)
            //     setCurrentEventToRate(unratedEvents[0])
            //     setRatingPopupVisible(true);
            // }
        }).catch(err => {
            console.log(err)
            setAppLoader(false);
        })
    }

    useEffect(() => {
        let getLoginUserData = localStorage.getItem('userProfile')
        if (getLoginUserData) {
            let userProfileData = JSON.parse(getLoginUserData);
            getLengthOfAllUpcomingEventsByApi();
            getLengthOfAllPastEventsByApi();
            setLoginUserDetail(userProfileData);
        } else {
            setLoginUserDetail(null);
        }
    }, [])


    const onPageChangeForUpcoming = (event: any) => {
        setLimitForUpcomingEvent(event.rows);
        setSkipForUpcomingEvent(event.first)
    }

    useEffect(() => {
        getAllUpcomingEventsDataByApi();
    }, [limitForUpcomingEvents, skipForUpcomingEvents])



    const applyFilterData = () => {
        getLengthOfAllUpcomingEventsByApi();
        getAllUpcomingEventsDataByApi();
        getLengthOfAllPastEventsByApi();
        getAllPastEventsDataByApi();
        setIsFilterForm(false)
    }

    // const initateForgetPasword = () =>{
    //     console.log()
    // }

    const removeFilter = () => {
        setFilterFields({
            industry: '',
            segment: ''
        })
        getLengthOfAllUpcomingEventsByApi();
        getAllUpcomingEventsDataByApi();
        getLengthOfAllPastEventsByApi();
        getAllPastEventsDataByApi();
        setIsFilterForm(false)
    }






    return (
        <ProductContextData.Provider value={{ storeAllUpcomingEvents, setStoreAllUpcomingEvents, isFilterForm, setIsFilterForm, toggleEventTabs, setToggleEventTabs, activeMainTab, setActiveMainTab, activeEventSubTab, setEventSubTab, getAllPresentersDataByApi, storeAllPresenters, setStoreAllPresenters, presentersDetailsPopupValue, setPresentersDetailsPopupValue, presentersDetailsPopup, setPresentersDetailsPopup, getAllUpcomingEventsDataByApi, logInPopupValue, setLoginPopupValue, loginForm, setLoginForm, loginUserDetail, setLoginUserDetail, getAllPastEventsDataByApi, storeAllPastEvents, setStoreAllPastEvents, getAllSubAdminListDataByApi, storeAllSubAdminList, setStoreAllSubAdminList, getAllToAttendEventsDataByApi, storeAllToAttendEvents, setLimitForUpcomingEvent, setSkipForUpcomingEvent, limitForUpcomingEvents, skipForUpcomingEvents, getLengthOfAllUpcomingEventsByApi, storeLengthOfUpcomingEvents, onPageChangeForUpcoming, getLengthOfAllPastEventsByApi, storeLengthOfPastEvents, skipForPastEvents, limitForPastEvents, setLimitForPastEvent, setSkipForPastEvent, filterFields, setFilterFields, applyFilterData, initateForgetPasswordPopupValue, setInitateForgetPasswordPopupValue, forgetPasswordForEmail, setForgetPasswordForEmail, removeFilter, appLoader, toggleSidebar, setToggleSidebar }}>
            {children}
        </ProductContextData.Provider>
    )
}

export default ContextData;
