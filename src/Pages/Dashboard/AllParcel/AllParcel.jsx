import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../../hooks/useAxiosPublic";

const AllParcel = () => {
    const axiosPublic = useAxiosPublic();
    const { data: parcels = [] } = useQuery({
        queryKey: ['parcels'],
        queryFn: async () => {
            const res = await axiosPublic.get('/allBookings');
            console.log(res.data);
            return res.data
        }
    })

    const {data: allDeliveryMen = [] , refetch} = useQuery({
        queryKey: ['allDeliveryMen'],
        queryFn: async () => {
            const role = {role: 'provider'}
            const res = axiosPublic.get('/allDeliveryMen', role)
            console.log(res.data);
            return (await res).data
        }
    })
    console.log(parcels);
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
                                    <button className="btn btn-xs">Manage</button>
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