import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../../hooks/useAxiosPublic";

const AllDeliveryMen = () => {
    const axiosPublic = useAxiosPublic();
    const { data: allDeliveryMen = [], refetch } = useQuery({
        queryKey: ['allDeliveryMen'],
        queryFn: async () => {
            const res = await axiosPublic.get('/allDeliveryMen');
            console.log(res.data);
            return res.data
        }
    })

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
                            <th>Delivered Psrcels</th>
                            <th>Review</th>
                        </tr>
                    </thead>
                    <tbody>
                        {/* row 1 */}
                        {
                            allDeliveryMen.map((deliveryMan, idx) => <tr key={deliveryMan._id}>
                                <th>{idx + 1}</th>
                                <td>{deliveryMan?.name}</td>
                                <td>{deliveryMan?.phone}</td>
                                <td>{deliveryMan?.deliveredParcel}</td>
                                <td>{deliveryMan?.averageReview}</td>
                            </tr>)
                        }
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AllDeliveryMen;