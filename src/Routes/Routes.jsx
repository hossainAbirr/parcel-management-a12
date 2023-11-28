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
            {
                path: '/dashboard/bookParcel',
                element: <PrivateRoute><BookParcel></BookParcel></PrivateRoute>
            },
            {
                path: '/dashboard/myParcel',
                element: <PrivateRoute><MyParcel></MyParcel></PrivateRoute>,
            },
            {
                path: '/dashboard/updateBooking/:id',
                element: <PrivateRoute><UpdateBooking></UpdateBooking></PrivateRoute>,
                loader: ({params}) => fetch(`http://localhost:2132/singleBooking/${params.id}`)
            },
        ]
    }
]);

export default myRouter 