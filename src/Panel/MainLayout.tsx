import React from "react";
import ContentLayout from "./ContentLayout";
import SideBarLayout from "./SideBarLayout";
import TopbarLayout from "./TopbarLayout";
import AppRoutes from "../routes/AppRoutes";

interface propsI{
    userRole: string | any
}

const MainLayout: React.FC<propsI> = ({userRole}) => {
    return (
        <>
            <TopbarLayout userRole={userRole}/>
            <SideBarLayout />
            <ContentLayout>
                {/* <div className="w-70"> */}
                    <AppRoutes userRole={userRole}/>
                {/* </div> */}
            </ContentLayout>
        </>
    )
}

export default MainLayout;
