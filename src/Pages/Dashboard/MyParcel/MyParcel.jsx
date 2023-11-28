import { useEffect, useState } from "react";
import useBookings from "../../../hooks/useBookings";
import { FaRegQuestionCircle } from "react-icons/fa";
import componentLoading from '../../../assets/loading.json'
import Lottie from "lottie-react";
import { Link } from "react-router-dom";
const MyParcel = () => {
    const [filterText, setFilterText] = useState('');
    const [bookings, , isLoading] = useBookings(filterText);
    const [mapedBookings, setMapedBookings] = useState([]);
    const [isShow, setIsShow] = useState(false);
    console.log(isLoading);

    useEffect(() => {
        const filteredData = bookings.filter(parcel => parcel.status.toLowerCase().includes(filterText.toLowerCase()))
        setMapedBookings(filteredData);
        if (filteredData.length === 0) {
            setMapedBookings(bookings)
        }
        console.log(filteredData, 'filtered data');
    }, [bookings, filterText])

    if (isLoading) {
        return <div className="flex h-screen justify-center items-center">
            <Lottie animationData={componentLoading} loop={true}></Lottie>
        </div>
    }


    console.log(filterText);
    return (
        <div className="overflow-x-auto">
            <table className="table table-zebra">
                {/* head */}
                <thead>
                    <tr>
                        <th></th>
                        <th>Parcel Type</th>
                        <th>Requested Delivery Date</th>
                        <th>Approximate Delivery Date</th>
                        <th>Booking Date</th>
                        <th>Delivery Men ID</th>
                        <th>Status</th>
                        <th className="flex gap-3 justify-center items-center">
                            Action
                            <div className={` ${!isShow ? 'hidden' : 'block'} fixed right-32 top-28 bg-gray-200 text-[#4a5759] p-5 rounded-md space-y-4 text-lg`}>
                                <h3>You can update the booking only if the booking status is ‘pending’.</h3>
                                <h3>User can cancel the booking only the status is ‘pending’
                                </h3>
                            </div>
                            <button onClick={() => setIsShow(!isShow)} className="btn btn-sm"><FaRegQuestionCircle></FaRegQuestionCircle></button>
                        </th>
                        <th>
                            <select onChange={(e) => setFilterText(e.target.value)} className="select select-bordered select-sm w-full max-w-xs">
                                <option disabled selected>Small</option>
                                <option >Pending</option>
                                <option >Delivered</option>
                                <option >On The Way</option>
                                <option >Returned</option>
                            </select>
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {/* row 1 */}
                    {
                        mapedBookings.map((booking, idx) => (<tr key={idx}>
                            <th>{idx + 1}</th>
                            <td>{booking.parcelType}</td>
                            <td>{booking.requestedDeliveryDate}</td>
                            <td>{booking.approximateDeliveryDate}</td>
                            <td>{booking.bookingDate}</td>
                            <td>{booking.deliveryMen}</td>
                            <td className="capitalize">{booking.status}</td>
                            <td className="flex gap-2 ">
                                {booking.status === 'pending' &&
                                    <>
                                        <Link to={`/dashboard/updateBooking/${booking._id}`} className="btn btn-outline btn-xs">Update</Link >
                                        <button className="btn btn-outline btn-xs">Cancel</button>
                                    </>
                                }
                                {
                                    booking.status === 'delivered' &&
                                    <>
                                        <button className="btn btn-xs btn-outline">Review</button>
                                    </>
                                }
                            </td>

                        </tr>))
                    }
                </tbody>
            </table>
        </div >
    );
};

export default MyParcel;