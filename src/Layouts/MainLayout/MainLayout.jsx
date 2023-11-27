import { Outlet, useLocation } from "react-router-dom";
import NavBar from '../../components/Shared/NavBar/NavBar'

const MainLayout = () => {
    const location = useLocation();
    console.log(location);
    const pathnameLogin = location.pathname.includes('login')
    const pathnameRegister = location.pathname.includes('register')
    return (
        <div className="bg-gray-200">
            {pathnameLogin || pathnameRegister || 
                <NavBar></NavBar>
            }
            {/* <NavBar></NavBar> */}
            <Outlet></Outlet>
        </div>
    );
};

export default MainLayout;