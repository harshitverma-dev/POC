import React, { createContext, ReactNode,  useState } from 'react'
// export interface createContextType {
//     productListState: ProductsDataType[],
//     setProductListState: React.Dispatch<React.SetStateAction<ProductsDataType[]>>
//     chartData: IChartData,
//     chartOptions: IChartOptions,
//     setChartData: React.Dispatch<React.SetStateAction<IChartData>>,
//     setChartOptions: React.Dispatch<React.SetStateAction<IChartOptions>>,
//     lightDarkMode: Boolean,
//     setLightDarkMode: React.Dispatch<React.SetStateAction<Boolean>>,
//     addNewProduct: IaddNewProduct,
//     setAddNewProduct : React.Dispatch<React.SetStateAction<IaddNewProduct>>
// }


export interface createContextType{
    storeUpcomingEvents : any,
    setStoreUpcomingEvents : React.Dispatch<React.SetStateAction<any>>
    isFilterForm : boolean,
    setIsFilterForm: React.Dispatch<React.SetStateAction<boolean>>,
    toggleEventTabs : boolean,
    setToggleEventTabs:React.Dispatch<React.SetStateAction<boolean>>,
    activeMainTab: string,
    setActiveMainTab: React.Dispatch<React.SetStateAction<string>>,
    activeEventSubTab: string,
    setEventSubTab: React.Dispatch<React.SetStateAction<string>>
}

interface props {
    children: ReactNode
}

// interface IaddNewProduct {
//     product_title: string
//     product_image: string,
//     product_category: string,
//     product_tags: []
// }

export const ProductContextData = createContext<createContextType | null>(null);

const ContextData: React.FC<props> = ({ children }) => {
    const [storeUpcomingEvents, setStoreUpcomingEvents] = useState([]);
    const [isFilterForm, setIsFilterForm] = useState(false);
    const [toggleEventTabs, setToggleEventTabs] = useState(false);
    const [activeMainTab, setActiveMainTab] = useState('');
    const [activeEventSubTab, setEventSubTab] = useState('To Attend');
    return (
        <ProductContextData.Provider value={{ storeUpcomingEvents, setStoreUpcomingEvents, isFilterForm, setIsFilterForm,toggleEventTabs, setToggleEventTabs, activeMainTab, setActiveMainTab, activeEventSubTab, setEventSubTab}}>
            {children}
        </ProductContextData.Provider>
    )
}

export default ContextData;
