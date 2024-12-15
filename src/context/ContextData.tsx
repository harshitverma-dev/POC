import React, { createContext, ReactNode, useState } from 'react'
import { userPresentersI } from '../interface/Presenters';
import axios from 'axios';

export interface createContextType {
    storeUpcomingEvents: any,
    setStoreUpcomingEvents: React.Dispatch<React.SetStateAction<any>>
    isFilterForm: boolean,
    setIsFilterForm: React.Dispatch<React.SetStateAction<boolean>>,
    toggleEventTabs: boolean,
    setToggleEventTabs: React.Dispatch<React.SetStateAction<boolean>>,
    activeMainTab: string,
    setActiveMainTab: React.Dispatch<React.SetStateAction<string>>,
    activeEventSubTab: string,
    setEventSubTab: React.Dispatch<React.SetStateAction<string>>
    getAllPresentersDataByApi: () => void
    storeAllPresenters: userPresentersI[] | null
    setStoreAllPresenters: React.Dispatch<React.SetStateAction<userPresentersI[] | null>>
    presentersDetailsPopupValue: boolean,
    setPresentersDetailsPopupValue: React.Dispatch<React.SetStateAction<boolean>>,
    presentersDetailsPopup: null | userPresentersI,
    setPresentersDetailsPopup: React.Dispatch<React.SetStateAction<null | userPresentersI>>
}

interface props {
    children: ReactNode
}

export const ProductContextData = createContext<createContextType | null>(null);

const ContextData: React.FC<props> = ({ children }) => {
    const [storeUpcomingEvents, setStoreUpcomingEvents] = useState([]);
    const [isFilterForm, setIsFilterForm] = useState(false);
    const [toggleEventTabs, setToggleEventTabs] = useState(false);
    const [activeMainTab, setActiveMainTab] = useState('');
    const [activeEventSubTab, setEventSubTab] = useState('To Attend');
    const [storeAllPresenters, setStoreAllPresenters] = useState<userPresentersI[] | null>(null);
    const [presentersDetailsPopupValue, setPresentersDetailsPopupValue] = useState<boolean>(false);
    const [presentersDetailsPopup, setPresentersDetailsPopup] = useState<userPresentersI | null>(null) //working here 

    // get All Presenters ->>
    const getAllPresentersDataByApi = () => {
        axios.get('http://localhost:3000/university-student/profile/v1/presentrs?limit=50&skip=1', {
            headers: {
                Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJVUzMyNTIwOWRjN2EiLCJpc3MiOiJyYXZpbmRyYUBnbWFpbC5jb20iLCJuYW1lIjoicmF2aW5kcmEiLCJpYXQiOjE3MzM0Nzc5MDUsImV4cCI6MTczMzQ3ODgwNX0.CnHj9C0G_wEOjgAe1VlnnepYD0XlliP78DQFfC4mcs8'
            },
        }).then((response) => {
            console.log(response);
            setStoreAllPresenters(response.data.presenters);
        }).catch(err => {
            console.log(err)
        })
    }
    return (
        <ProductContextData.Provider value={{ storeUpcomingEvents, setStoreUpcomingEvents, isFilterForm, setIsFilterForm, toggleEventTabs, setToggleEventTabs, activeMainTab, setActiveMainTab, activeEventSubTab, setEventSubTab, getAllPresentersDataByApi, storeAllPresenters, setStoreAllPresenters, presentersDetailsPopupValue, setPresentersDetailsPopupValue, presentersDetailsPopup, setPresentersDetailsPopup }}>
            {children}
        </ProductContextData.Provider>
    )
}

export default ContextData;
