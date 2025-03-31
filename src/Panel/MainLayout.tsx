import React, { useContext, useEffect } from "react";
import ContentLayout from "./ContentLayout";
import SideBarLayout from "./SideBarLayout";
import TopbarLayout from "./TopbarLayout";
import AppRoutes from "../routes/AppRoutes";
import { ProductContextData } from "../context/ContextData";
import { useLocation } from "react-router-dom";

interface propsI {
    userRole: string | any
}



const MainLayout: React.FC<propsI> = ({ userRole }) => {
    const loactionRoute = useLocation()
    const context = useContext(ProductContextData);
    if (!context) {
        throw new Error('it should not be null');
    }
    const { setExcelBulkUserFile,  inputfileValue } = context;

    useEffect(()=>{
        // console.log(loactionRoute.pathname, 'changing path');
        setExcelBulkUserFile(null)
        if (inputfileValue.current) {
            inputfileValue.current.value = "";
        }
    }, [loactionRoute.pathname])
    return (
        <>
            <TopbarLayout userRole={userRole} />
            <SideBarLayout />
            <ContentLayout>
                {/* <div className="w-70"> */}
                <AppRoutes userRole={userRole} />
                {/* </div> */}
            </ContentLayout>
        </>
    )
}

export default MainLayout;
