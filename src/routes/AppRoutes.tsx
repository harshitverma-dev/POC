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
// import AddNewUser from "../pages/AddNewPresenter";

const AppRoutes: React.FC = () => {
    const routesPath = [
        {
            path: "/",
            element: <UpcomingEvents />
        },
        {
            path: "/upcoming-events",
            element: <UpcomingEvents />
        },
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
            path: "/presenters-list",
            element: <SeeAllPresentersMain />
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
            path: 'my-events',
            element : <MyEevents/>
        }
    ]
    return (
        <Routes>
            {
                routesPath?.map((items, index) => {
                    return <Route key={index} path={items.path} element={items.element} />
                })
            }
        </Routes>
    )
}

export default AppRoutes;
