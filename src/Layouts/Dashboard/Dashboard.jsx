import { NavLink, Outlet } from "react-router-dom";
import { BsGraphUp } from "react-icons/bs";
import { FaUsers } from 'react-icons/fa';
import deliveryMen from '../../assets/delivery-man.png'
import parcel from '../../assets/parcel.png'
import { MdHome, MdOutlineReviews } from "react-icons/md";
import { CiCircleList } from "react-icons/ci";
import { FaBookOpenReader } from "react-icons/fa6";
import { ImProfile } from "react-icons/im";
import useGradient from "../../hooks/useGradientBg";
const Dashboard = () => {
    const gradientBg = useGradient();
    const isAdmin = true
    const isDelivery = false
    return (
        <div className="font-fontInter flex">
            <div className={`w-64 min-h-screen bg-[#d6ccc2] pt-12 pl-8`}>
                <h2 className="font-fontInter font-black text-2xl">BISTRO BOSS</h2>
                <h2 className="font-fontCinzel font-bold text-lg tracking-[5.80px]">Restaurant</h2>
                <ul className="menu space-y-6 mt-16">
                    {
                        isAdmin ? <>
                            <li>
                                <NavLink className="flex gap-3 items-center font-medium font-fontCinzel" to={`/dashboard/statistics`}>
                                    <BsGraphUp className="w-6 h-6"></BsGraphUp>
                                    Statistics
                                </NavLink>
                            </li>
                            <li>
                                <NavLink className="flex gap-3 items-center font-medium font-fontCinzel" to={`/dashboard/allParcel`}>
                                    <img className="w-[24px]" src={parcel} alt="" />
                                    All Parcels
                                </NavLink>
                            </li>
                            <li>
                                <NavLink className="flex gap-3 items-center font-medium font-fontCinzel" to={`/dashboard/allDeliveryMen`}>
                                    <img className="w-[24px]" src={deliveryMen} alt="" />
                                    All Delivery Men
                                </NavLink>
                            </li>
                            <li>
                                <NavLink className="flex gap-3 items-center font-medium font-fontCinzel" to={`/dashboard/allUsers`}>
                                    <FaUsers className="w-6 h-6"></FaUsers>
                                    All Users
                                </NavLink>
                            </li>
                        </>
                            :
                            isDelivery ?
                                <>
                                    <li>
                                        <NavLink className="flex gap-3 items-center font-medium font-fontCinzel" to={`/dashboard/userHome`}>
                                            <CiCircleList className="w-6 h-6"></CiCircleList>
                                            My Delivery List
                                        </NavLink>
                                    </li>
                                    <li>
                                        <NavLink className="flex gap-3 items-center font-medium font-fontCinzel" to={`/dashboard/userHome`}>
                                            <MdOutlineReviews className="w-6 h-6"></MdOutlineReviews>
                                            My Reviews
                                        </NavLink>
                                    </li>
                                </>
                                :
                                <>
                                    <li>
                                        <NavLink className="flex gap-3 items-center font-medium font-fontCinzel" to={`/dashboard/updateProfile`}>
                                            <ImProfile className="w-6 h-6"></ImProfile>
                                            My Profile
                                        </NavLink>
                                    </li>
                                    <li>
                                        <NavLink className="flex gap-3 items-center font-medium font-fontCinzel" to={`/dashboard/bookParcel`}>
                                            <FaBookOpenReader className="w-6 h-6"></FaBookOpenReader>
                                            Book A Parcel
                                        </NavLink>
                                    </li>
                                    <li>
                                        <NavLink className="flex gap-3 items-center font-medium font-fontCinzel" to={`/dashboard/myParcel`}>
                                            <img className="w-[24px]" src={parcel} alt="" />
                                            My Parcels
                                        </NavLink>
                                    </li>
                                </>
                    }
                    <li>
                        <NavLink className="flex gap-3 items-center font-medium font-fontCinzel" to={`/`}>
                            <MdHome className="text-2xl"></MdHome>
                            Home
                        </NavLink>
                    </li>
                </ul>
            </div>
            {/* dashboard content  */}
            <div className="flex-1 pt-12 px-12">
                <Outlet></Outlet>

            </div>
        </div>
    );
};

export default Dashboard;