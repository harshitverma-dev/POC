import { Route, Routes } from "react-router-dom";
import UpcomingEvents from "../pages/UpcomingEvents";
import AddEvent from "../pages/AddEvent";
import EditProfile from "../pages/EditProfile";
import ChangePassword from "../pages/ChangePassword";
import SeeAllPresentersMain from "../pages/SeeAllPresentersMain";
import MyEevents from "../pages/MyEvents";
import AddNewPresenter from "../pages/AddNewPresenter";
import PresentersTableList from "../pages/PresentersTable";
import AddSubAdmin from "../pages/AddSubAdmin";
// import { AccessControl } from "../accessControl/AccessControl";
import ProtectedRoute from "../components/ProtectedRoutes";
import SubAdminTable from "../pages/SubAdminTable";
import AddStudent from "../pages/AddStudent";
// import AddNewUser from "../pages/AddNewPresenter";
// AccessControl
interface propsI{
    userRole: string | any
}
const AppRoutes: React.FC<propsI> = ({userRole}) => {
    const publicPath = [
        {
            path: "/",
            element: <UpcomingEvents />
        },
        {
            path: "/presenters-list",
            element: <SeeAllPresentersMain />
        },
        {
            path: '/my-events',
            element : <MyEevents/>
        },
        {
            path: "/upcoming-events",
            element: <UpcomingEvents />
        },
    ];
    const protectedPath = [
        {
            path: "/add-event",
            element: <AddEvent />
        },
        {
            path: "/edit-profile",
            element: <EditProfile />
        },
        {
            path: "/change-password",
            element: <ChangePassword />
        },
        {
            path: "/add-product",
            element: <UpcomingEvents />
        },
        {
            path: "/add-new-presenter",
            element: <AddNewPresenter/>
        },
        {
            path: "/presenters-table",
            element: <PresentersTableList/>

        },
        {
            path: "/add-sub-admin",
            element: <AddSubAdmin/>
        },
        {
            path: "/sub-admin-table",
            element: <SubAdminTable/>

        },
        {
            path: "/add-student",
            element: <AddStudent/>

        }
    ]
    return (
        <Routes>
            {
                protectedPath?.map((items, index) => {
                    return <Route key={index} path={items.path} element={<ProtectedRoute path={items.path} userRole={userRole}> {items.element} </ProtectedRoute>} />
                })
            }
   {
                publicPath?.map((items, index) => {
                    return <Route key={index} path={items.path} element={items.element} />
                })
            }

        </Routes>
    )
}

export default AppRoutes;
