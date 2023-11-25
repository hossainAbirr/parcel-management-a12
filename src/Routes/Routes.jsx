import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../Layouts/MainLayout/MainLayout";

const myRouter = createBrowserRouter([
    {
        path: "/",
        element: <MainLayout></MainLayout>,
    },
]);

export default myRouter 