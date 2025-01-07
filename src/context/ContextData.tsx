import React, { createContext, ReactNode, useEffect, useState } from 'react'
import { userPresentersI } from '../interface/Presenters';
import axios from 'axios';
import { EventType } from '../interface/EventInterface';

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
    loginForm: loginFormI,
    setLoginForm: React.Dispatch<React.SetStateAction<loginFormI>>,
    isStoreAllUpcomingEventsLoader: boolean,
    loginUserDetail: any | null,
    setLoginUserDetail: React.Dispatch<React.SetStateAction<any | null>>,
    getAllPastEventsDataByApi: () => void,
    storeAllPastEvents: EventType[] | [],
    setStoreAllPastEvents:React.Dispatch<React.SetStateAction<any>>,
    getAllSubAdminListDataByApi: ()=> void,
    storeAllSubAdminList: userPresentersI[] | [],
    setStoreAllSubAdminList :React.Dispatch<React.SetStateAction<userPresentersI[] | []>>
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
    const [loginForm, setLoginForm] = useState<loginFormI>({
        userEmail: '',
        userPassword: ''
    })
    const [isStoreAllUpcomingEventsLoader, setIsStoreAllUpcomingEventsLoader] = useState<boolean>(false)
    const [loginUserDetail, setLoginUserDetail] = useState<any | null>(null);
    const [storeAllPastEvents, setStoreAllPastEvents] = useState<EventType[] | []>([])
    const [storeAllSubAdminList, setStoreAllSubAdminList] = useState<userPresentersI[] | []>([]);

    // get All Presenters ->>
    const getAllPresentersDataByApi = () => {
        axios.get('http://localhost:3000/university-student/profile/v1/presentrs?limit=0&skip=1').then((response) => {
            console.log(response);
            setStoreAllPresenters(response.data.presenters);
        }).catch(err => {
            console.log(err)
        })
    }

    // get Upcoming all Events ->>
    const getAllUpcomingEventsDataByApi = () => {
        setIsStoreAllUpcomingEventsLoader(true);
        axios.get('http://localhost:3000/university-student/events/v1/events?limit=0&skip=1', {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('userAccessToken')}`
            },
        }).then((response) => {
            console.log(response);
            setStoreAllUpcomingEvents(response.data.events)
            setIsStoreAllUpcomingEventsLoader(false)
        }).catch((err) => {
            console.log(err, 'err')
            // setTimeout(()=>{
            setIsStoreAllUpcomingEventsLoader(false)
            // }, 5000)
        })
    }

    // get Past all Events ->> 
    const getAllPastEventsDataByApi = () => {
        // setIsStoreAllUpcomingEventsLoader(true);
        axios.get('http://localhost:3000/university-student/events/v1/past-events?limit=0&skip=1', {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('userAccessToken')}`
            },
        }).then((response) => {
            console.log(response, 'kkkkkk');
            setStoreAllPastEvents(response.data)
            // setIsStoreAllUpcomingEventsLoader(false)
        }).catch((err) => {
            console.log(err, 'err')
            // setTimeout(()=>{
            // setIsStoreAllUpcomingEventsLoader(false)
            // }, 5000)
        })
    }

    // get sub admin list ->>
    const getAllSubAdminListDataByApi = () =>{
        axios.get('http://localhost:3000/university-student/profile/v1/users?limit=0&skip=1&role=SUBADMIN', {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('userAccessToken')}`
            },
        }).then((response)=>{
            setStoreAllSubAdminList(response.data)
            console.log(response);
        }).catch(err=>{
            console.log(err)
        })
    }

    useEffect(() => {
        let getLoginUserData = localStorage.getItem('userProfile')
        if (getLoginUserData) {
            let userProfileData = JSON.parse(getLoginUserData);
            setLoginUserDetail(userProfileData);
        } else {
            setLoginUserDetail(null);
        }
    }, [])



    return (
        <ProductContextData.Provider value={{ storeAllUpcomingEvents, setStoreAllUpcomingEvents, isFilterForm, setIsFilterForm, toggleEventTabs, setToggleEventTabs, activeMainTab, setActiveMainTab, activeEventSubTab, setEventSubTab, getAllPresentersDataByApi, storeAllPresenters, setStoreAllPresenters, presentersDetailsPopupValue, setPresentersDetailsPopupValue, presentersDetailsPopup, setPresentersDetailsPopup, getAllUpcomingEventsDataByApi, logInPopupValue, setLoginPopupValue, loginForm, setLoginForm, isStoreAllUpcomingEventsLoader, loginUserDetail, setLoginUserDetail, getAllPastEventsDataByApi, storeAllPastEvents, setStoreAllPastEvents, getAllSubAdminListDataByApi, storeAllSubAdminList, setStoreAllSubAdminList }}>
            {children}
        </ProductContextData.Provider>
    )
}

export default ContextData;
