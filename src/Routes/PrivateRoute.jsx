import { Navigate, useLocation } from "react-router-dom";
import componentLoading from '../assets/loading.json'
import Lottie from "lottie-react";
import useAuth from "../hooks/useAuth";
const PrivateRoute = ({ children }) => {
    const location = useLocation();
    const { user, loading } = useAuth();
    if (loading) {
        return <div className="flex h-screen justify-center items-center">
            <Lottie animationData={componentLoading} loop={true}></Lottie>
        </div>
    }
    if (user) {
        return children
    }
    return (
        <Navigate to='/login' state={location.pathname} replace>

        </Navigate >
    );
};

export default PrivateRoute;