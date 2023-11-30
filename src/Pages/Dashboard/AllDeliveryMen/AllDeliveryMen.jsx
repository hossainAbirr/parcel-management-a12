import useAllDeliveryMen from "../../../hooks/useAllDeliveryMen";


const AllDeliveryMen = () => {
    const [allDeliveryMen, refetch] = useAllDeliveryMen();

    console.log(allDeliveryMen);
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