import { Outlet } from "react-router-dom";
import NavBar from '../../components/Shared/NavBar/NavBar'
// import NavBar2 from '../../components/Shared/NavBar/NavBar2'

const MainLayout = () => {
    return (
        <div>
            <NavBar></NavBar>
            {/* <NavBar2></NavBar2> */}
            <Outlet></Outlet>
        </div>
    );
};

export default MainLayout;