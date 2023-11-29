import { useEffect, useState } from "react";
import useBookings from "../../../hooks/useBookings";
import { FaRegQuestionCircle } from "react-icons/fa";
import componentLoading from '../../../assets/loading.json'
import Lottie from "lottie-react";
import { Link } from "react-router-dom";
import useStatus from "../../../hooks/useStatus";
import useAuth from "../../../hooks/useAuth";
const MyParcel = () => {
    const { user } = useAuth();
    const { displayName, email, photoURL } = user;
    const [filterText, setFilterText] = useState('');
    const [bookings, refetch, isLoading] = useBookings(filterText);
    const [mapedBookings, setMapedBookings] = useState([]);
    const [isShow, setIsShow] = useState(false);
    const handleStatus = useStatus('cancelled'); // give it a string as a status

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
                                        <button onClick={() => handleStatus(booking._id)} className="btn btn-outline btn-xs">Cancel</button>
                                    </>
                                }
                                {
                                    booking.status === 'delivered' &&
                                    <>
                                        <button onClick={() => document.getElementById('my_modal_1').showModal()} className="btn btn-xs btn-outline">Review</button>
                                        {/* Open the modal using document.getElementById('ID').showModal() method */}

                                        <dialog id="my_modal_1" className="modal">
                                            <div className="modal-box">
                                                <h3 className="font-bold text-lg">Hello!</h3>


                                                <form className="card-body ">
                                                    {/* name email row  */}
                                                    <div className="form-control flex-row gap-5 ">
                                                        <div className="flex-1">
                                                            <label className="label">
                                                                <span className="label-text">Name</span>
                                                            </label>
                                                            <input defaultValue={displayName} readOnly type="text" name="name" placeholder="Name" className="input input-bordered w-full" required />
                                                        </div>
                                                        <div className="flex-1">
                                                            <label className="label">
                                                                <span className="label-text">Email</span>
                                                            </label>
                                                            <input readOnly defaultValue={photoURL} type="text" name="photo" placeholder="Photo" className="input input-bordered w-full" required />
                                                        </div>
                                                    </div>
                                                    {/* phone & parcel type  */}
                                                    <div className="form-control flex-row gap-5">
                                                        <div className="flex-1">
                                                            <label className="label">
                                                                <span className="label-text">Phone Number</span>
                                                            </label>
                                                            <input type="tel" placeholder="Phone Number" name="phone" className="input input-bordered w-full" required />
                                                        </div>
                                                        <div className="flex-1">
                                                            <label className="label">
                                                                <span className="label-text">Parcel Type</span>
                                                            </label>
                                                            <input type="text" placeholder="Parcel Type" name="type" className="input input-bordered w-full" required />
                                                        </div>
                                                    </div>
                                                    <div className="form-control mt-6">
                                                        <button className="btn bg-[#f5ebe0] hover:bg-[#e29578]">Book Now</button>
                                                    </div>
                                                </form>



                                                <div className="modal-action">
                                                    <form method="dialog">
                                                        {/* if there is a button in form, it will close the modal */}
                                                        <button className="btn">Close</button>
                                                    </form>
                                                </div>
                                            </div>
                                        </dialog>
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