import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../../hooks/useAxiosPublic";
import useBookings from "../../../hooks/useBookings";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";

const AllUsers = () => {
    const [roleText, setRoleText] = useState(null);
    const [userId, setUserId] = useState(null);
    const axiosPublic = useAxiosPublic();
    const { data: usersInDatabase = [], refetch } = useQuery({
        queryKey: ['usersInDatabase'],
        queryFn: async () => {
            const res = await axiosPublic.get('/users');
            return res.data
        }
    })
    const [bookings] = useBookings();
    const filterredBookings = bookings.filter(booking => booking.deliveryPrice)
    console.log(filterredBookings);
    const totalSpent = filterredBookings.reduce((acc, curr) => curr?.deliveryPrice && acc + curr.deliveryPrice, 0)
    console.log(bookings);
    useEffect(() => {
        const handleRole = async (id) => {
            if (roleText) {
                const role = { role: roleText }
                console.log(roleText);
                try {
                    const res = await axiosPublic.patch(`/updateRole/${id}`, role);
                    console.log(res.data);
                    if (res?.data?.modifiedCount > 0) {
                        refetch();
                        Swal.fire({
                            title: "Good job!",
                            text: `Making ${roleText} successful!`,
                            icon: "success"
                        });
                        setRoleText(null)
                    }
                } catch (error) {
                    console.error('Error updating role:', error);
                }
            }
        }

        if (roleText && userId) {
            handleRole(userId)
        }
    }, [roleText, userId, refetch, axiosPublic])


    return (
        <div>
            <div className="overflow-x-auto">
                <table className="table">
                    {/* head */}
                    <thead>
                        <tr>
                            <th></th>
                            <th>Name</th>
                            <th>Phone</th>
                            <th>Booked Parcels</th>
                            <th>Spent</th>
                            <th>Make Admin</th>
                            <th>Make Delivery Man</th>

                        </tr>
                    </thead>
                    <tbody>
                        {/* row 1 */}
                        {
                            usersInDatabase.map((deliveryMan, idx) => <tr key={deliveryMan._id}>
                                <th>{idx + 1}</th>
                                <td>{deliveryMan?.name}</td>
                                <td>{deliveryMan?.phone}</td>
                                <td>{bookings.length}</td>
                                <td></td>
                                <td className="capitalize">{deliveryMan.role}</td>
                                <td>
                                    <button onClick={() => { setRoleText('admin'), setUserId(deliveryMan._id) }} className="btn btn-xs">Make Admin</button>
                                </td>
                                <td>
                                    <button onClick={() => { setRoleText('provider'), setUserId(deliveryMan._id) }} className="btn btn-xs">Make Delivery-Man</button>
                                </td>
                            </tr>)
                        }
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AllUsers;