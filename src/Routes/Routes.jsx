import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../Layouts/MainLayout/MainLayout";
import Home from "../Pages/Home/Home";
import Login from "../Pages/LogIn/Login";
import Registration from "../Pages/Registration/Registration";
import Dashboard from "../Layouts/Dashboard/Dashboard";
import BookParcel from "../Pages/Dashboard/BookParcel/BookParcel";
import PrivateRoute from "./PrivateRoute";
import MyParcel from "../Pages/Dashboard/MyParcel/MyParcel";
import UpdateBooking from "../Pages/Dashboard/UpdateBooking/UpdateBooking";
import UpdateProfile from "../Pages/Dashboard/UpdateProfile/UpdateProfile";
import AllParcel from "../Pages/Dashboard/AllParcel/AllParcel";
import AllDeliveryMen from "../Pages/Dashboard/AllDeliveryMen/AllDeliveryMen";
import AllUsers from "../Pages/Dashboard/AllUsers/AllUsers";

const myRouter = createBrowserRouter([
    {
        path: "/",
        element: <MainLayout></MainLayout>,
        children: [
            {
                path: '/',
                element: <Home></Home>
            },
            {
                path: '/login',
                element: <Login></Login>
            },
            {
                path: '/register',
                element: <Registration></Registration>
            }
        ]
    },
    {
        path: '/dashboard',
        element: <Dashboard></Dashboard>,
        children: [

            // user routes 
            {
                path: '/dashboard/bookParcel',
                element: <PrivateRoute><BookParcel></BookParcel></PrivateRoute>
            },
            {
                path: '/dashboard/myParcel',
                element: <PrivateRoute><MyParcel></MyParcel></PrivateRoute>,
            },
            {
                path: '/dashboard/updateProfile',
                element: <PrivateRoute><UpdateProfile></UpdateProfile></PrivateRoute>,
            },
            {
                path: '/dashboard/updateBooking/:id',
                element: <PrivateRoute><UpdateBooking></UpdateBooking></PrivateRoute>,
            },

            // admin routes 
            {
                path:'/dashboard/allParcel',
                element: <PrivateRoute><AllParcel></AllParcel></PrivateRoute>
            },
            {
                path:'/dashboard/allDeliveryMen',
                element: <PrivateRoute><AllDeliveryMen></AllDeliveryMen></PrivateRoute>
            },
            {
                path:'/dashboard/allUsers',
                element: <PrivateRoute><AllUsers></AllUsers></PrivateRoute>
            }
        ]
    }
]);

export default myRouter 