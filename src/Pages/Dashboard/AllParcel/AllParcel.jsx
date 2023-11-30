import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../../hooks/useAxiosPublic";
import useAllDeliveryMen from "../../../hooks/useAllDeliveryMen";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";

const AllParcel = () => {
    const axiosPublic = useAxiosPublic();
    const [bookingId, setBookingId] = useState(null);
    const [deliveryMenId, setDeliveryMenId] = useState(null)
    const [approximateDeliveryDate, setApproximateDeliveryDate] = useState(null)
    const [isClicked, setIsClicked] = useState(false);
    console.log(deliveryMenId, approximateDeliveryDate, bookingId, isClicked);

    const { data: parcels = [] } = useQuery({
        queryKey: ['parcels'],
        queryFn: async () => {
            const res = await axiosPublic.get('/allBookings');
            return res.data
        }
    })
    const [allDeliveryMen, refetch] = useAllDeliveryMen();

    const handleDeliveryMenId = (e) => {
        setDeliveryMenId(e.target.value)
        setIsClicked(false)
    }
    const handleDate = (e) => {
        setApproximateDeliveryDate(e.target.value)
        setIsClicked(false)
    }

    useEffect(() => {
        try {
            const handleAssign = async (id) => {
                console.log(deliveryMenId, approximateDeliveryDate, bookingId, isClicked);
                const updated = {
                    deliveryMenId: deliveryMenId,
                    approximateDeliveryDate: approximateDeliveryDate,
                }
                console.log(id);
                const res = await axiosPublic.patch(`/updateDeliveryMen/${id}`, updated)
                if (res.data.modifiedCount) {
                    Swal.fire({
                        title: "Good job!",
                        text: "Data updated successfully!",
                        icon: "success"
                    });
                    // setBookingId(null)
                    setIsClicked(null)
                    // setDeliveryMenId(null)
                    // setApproximateDeliveryDate(null)
                }
            }
            if (isClicked) {
                handleAssign(bookingId)
            }
        } catch (error) {
            setBookingId(null)
            setIsClicked(null)
            setDeliveryMenId(null)
            setApproximateDeliveryDate(null)
        }
    }, [bookingId, deliveryMenId, approximateDeliveryDate, isClicked, axiosPublic])


    return (
        <div>
            <div className="overflow-x-auto">
                <table className="table">
                    {/* head */}
                    <thead>
                        <tr>
                            <th></th>
                            <th>Booker</th>
                            <th>Booker Phone</th>
                            <th>Booking Date</th>
                            <th>Requested Delivery Date</th>
                            <th>Cost</th>
                            <th>Status</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {/* row 1 */}
                        {
                            parcels.map((parcel, idx) => <tr key={parcel._id}>
                                <th>{idx + 1}</th>
                                <td>{parcel?.bookingUserName}</td>
                                <td>{parcel?.bookingUserPhone}</td>
                                <td>{parcel?.bookingDate}</td>
                                <td>{parcel?.requestedDeliveryDate}</td>
                                <td>{parcel?.deliveryPrice}</td>
                                <td>{parcel?.status}</td>
                                <td>
                                    <button onClick={() => { setBookingId(parcel._id), document.getElementById('my_modal_2').showModal() }} className="btn btn-xs">Manage</button>
                                    <dialog id="my_modal_2" className="modal">
                                        <div className="modal-box">
                                            <h3 className="text-lg text-center mb-3">Choose A delivery Men</h3>
                                            <form onSubmit={() => setBookingId(parcel._id)} method="dialog" >
                                                <select
                                                    className="select select-bordered w-full "
                                                    name="deliveryMenId"
                                                    id=""
                                                    onChange={(e) => handleDeliveryMenId(e)}
                                                >
                                                    <option disabled selected>Select A Delivery Men</option>
                                                    {allDeliveryMen.map((deliveryMen) =>
                                                        <option key={deliveryMen._id} value={deliveryMen._id}>
                                                            {deliveryMen.name}
                                                        </option>
                                                    )}
                                                </select>
                                                <label className="label">
                                                    <span className="label-text"
                                                    >Select An Approximate Delivery Date (within next 7 working
                                                        days)</span
                                                    >
                                                </label>
                                                <input
                                                    onChange={(e) => handleDate(e)}
                                                    type="date"
                                                    name="approximateDeliveryDate"
                                                    placeholder="Type here"
                                                    className="input input-bordered w-full my-3"
                                                />
                                                <button onClick={() => setIsClicked(true)} className="btn">Assign Delivery Men</button>
                                            </form>
                                        </div>
                                        <form method="dialog" className="modal-backdrop">
                                            <button>close</button>
                                        </form>
                                    </dialog>
                                </td>
                            </tr>)
                        }
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AllParcel;