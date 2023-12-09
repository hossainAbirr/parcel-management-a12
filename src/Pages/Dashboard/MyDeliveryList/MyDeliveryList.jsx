import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../../hooks/useAxiosPublic";
import useAuth from "../../../hooks/useAuth";
import useCurrentUserFromDbByEmail from "../../../hooks/useCurrentUserFromDbByEmail";
import { useEffect, useState } from "react";
import useStatus from "../../../hooks/useStatus";
import axios from "axios";
import Swal from "sweetalert2";

const MyDeliveryList = () => {
    const { user } = useAuth();
    const axiosPublic = useAxiosPublic();
    const [currentUser] = useCurrentUserFromDbByEmail();
    const [myDeliveryList, setMyDeliveryList] = useState([]);
    const [statusText, setStatusText] = useState(null);
    let status = statusText?.delivered && statusText?.delivered || statusText?.cancelled
    console.log(status);
    const handleStatus = useStatus(status);

    useEffect(() => {
        axios.get(`https://parcel-management-server-green.vercel.app/myDelivery/${currentUser._id}`)
            // .then(res => res.json())
            .then(res => setMyDeliveryList(res.data))
    }, [currentUser._id, axiosPublic])

    useEffect(() => {
        if (statusText) {
            console.log('status Text', statusText);
            Swal.fire({
                title: "Are you sure?",
                text: "You won't be able to revert this!",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Yes, delete it!"
            }).then(async (result) => {
                if (result.isConfirmed) {
                    handleStatus(statusText.id)
                    console.log('status Text', statusText);
                    setStatusText(null)
                }
            });
        }
    }, [statusText, handleStatus])

    return (
        <div>
            <div className="overflow-x-auto">
                <table className="table">
                    {/* head */}
                    <thead>
                        <tr>
                            <th></th>
                            <th>Booker Name</th>
                            <th>Receivers Name</th>
                            <th>Booker Phone</th>
                            <th>Requested Delivery Date</th>
                            <th>Approximate Delivery Date</th>
                            <th>Recievers phone</th>
                            <th>Receivers Address</th>
                            <th></th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {/* row 1 */}
                        {
                            myDeliveryList.map((myDelivery, idx) => <tr key={myDelivery._id}>
                                <th>{idx + 1}</th>
                                <td>{myDelivery?.bookingUserName}</td>
                                <td>{myDelivery?.recieverName}</td>
                                <td>{myDelivery?.bookingUserPhone}</td>
                                <td>{myDelivery?.requestedDeliveryDate}</td>
                                <td>{myDelivery?.approximateDeliveryDate}</td>
                                <td className="space-y-3">
                                    <p>{myDelivery?.recieverPhone}</p>

                                </td>
                                <td className="space-y-2 flex flex-col items-center gap-2">
                                    <p className="text-center capitalize">{myDelivery?.deliveryAddress}</p>
                                    <button className="btn btn-xs btn-warning">View Map</button>
                                </td>
                                <td></td>
                                <td className="space-y-3">
                                    <div className="flex justify-center items-center gap-2">
                                        <button onClick={() => setStatusText({ delivered: false, cancelled: 'cancelled', id: myDelivery._id })} className="btn btn-xs btn-error">Cancel</button>
                                        <button onClick={() => setStatusText({ delivered: 'delivered', cancelled: false, id: myDelivery._id })} className="btn btn-xs btn-warning">Delivered</button>
                                    </div>
                                </td>
                            </tr>)
                        }
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default MyDeliveryList;