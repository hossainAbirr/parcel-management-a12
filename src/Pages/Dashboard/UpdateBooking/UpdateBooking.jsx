import { useEffect, useState } from "react";
import useAuth from "../../../hooks/useAuth";
import useAxiosPublic from "../../../hooks/useAxiosPublic";
import Swal from "sweetalert2";
import { useLoaderData } from "react-router-dom";
const UpdateBooking = () => {
    // states 
    const [weight, setWeight] = useState(0);
    const [price, setPrice] = useState(0);
    const { user } = useAuth();
    const { displayName, email } = user;
    const axiosPublic = useAxiosPublic();
    const loadedData = useLoaderData();
    const { _id, bookingUserPhone, parcelType, recieverName, deliveryAddress, recieverPhone, latitude, longitude, requestedDeliveryDate, deliveryPrice
    } = loadedData;

    useEffect(() => {
        let currentPrice;
        if (weight >= 1 && weight < 2) {
            currentPrice = 50
        } else if (weight >= 2 && weight < 3) {
            currentPrice = 100
        } else if (weight >= 3) {
            currentPrice = 150
        }
        setPrice(currentPrice);
        if (isNaN(weight) || '') {
            setPrice(0)
        }
    }, [weight]);


    // functionalities 
    const handleChange = (e) => {
        const currentWeight = parseFloat(e.target.value);
        setWeight(currentWeight);
        console.log(currentWeight);
    }
    const handleUpdateSubmit = async (e) => {
        e.preventDefault();
        const form = e.target;
        const bookingUserPhone = form.phone.value;
        const type = form.type.value;
        const weight = form.weight.value;
        const recieverName = form.recieverName.value;
        const recieverPhone = form.recieverPhone.value;
        const deliveryAddress = form.deliveryAddress.value;
        const latitude = form.latitude.value;
        const longitude = form.longitude.value;
        const requestedDeliveryDate = form.requestedDeliveryDate.value;

        const booking = {
            bookingUserPhone: bookingUserPhone,
            parcelType: type,
            weight: weight,
            recieverName: recieverName,
            deliveryAddress: deliveryAddress,
            recieverPhone: recieverPhone,
            latitude: latitude,
            longitude: longitude,
            deliveryPrice: price,
            requestedDeliveryDate: requestedDeliveryDate,
        }
        axiosPublic.patch(`/updateBooking/${_id}`, booking)
            .then(res => {
                console.log(res.data);
                if (res.data.modifiedCount > 0) {
                    Swal.fire({
                        title: "Good job!",
                        text: "You've Updated your parcel successfully!",
                        icon: "success"
                    });
                }
            })
            .catch(error => {
                console.error(error);
            })
    }
    return (
        <div className=" mb-20">
            <h2 className={`text-4xl font-bold text-center my-5`}>Update Your Parcel</h2>
            <div className="card shrink-0 w-full shadow-2xl  bg-[#e3d5ca]">
                <form onSubmit={handleUpdateSubmit} className="card-body ">
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
                            <input readOnly defaultValue={email} type="email" name="email" placeholder="email" className="input input-bordered w-full" required />
                        </div>
                    </div>
                    {/* phone & parcel type  */}
                    <div className="form-control flex-row gap-5">
                        <div className="flex-1">
                            <label className="label">
                                <span className="label-text">Phone Number</span>
                            </label>
                            <input type="tel" defaultValue={bookingUserPhone} placeholder="Phone Number" name="phone" className="input input-bordered w-full" required />
                        </div>
                        <div className="flex-1">
                            <label className="label">
                                <span className="label-text">Parcel Type</span>
                            </label>
                            <input type="text" defaultValue={parcelType} placeholder="Parcel Type" name="type" className="input input-bordered w-full" required />
                        </div>
                    </div>
                    {/* parcel weght and reciever's name  */}
                    <div className="form-control flex-row gap-5">
                        <div className="flex-1">
                            <label className="label">
                                <span className="label-tex">Parcel Weight</span>
                            </label>
                            <input onChange={handleChange} defaultValue={weight} type="tel" placeholder="Parcel Weight" name="weight" className="input input-bordered w-full" required />
                        </div>
                        <div className="flex-1">
                            <label className="label">
                                <span className="label-text">Reciever&apos;s Name</span>
                            </label>
                            <input type="text" defaultValue={recieverName} placeholder="Reciever's Name" name="recieverName" className="input input-bordered w-full" required />
                        </div>
                    </div>
                    {/* recievers phone and parcel delivery address  */}
                    <div className="form-control flex-row gap-5">
                        <div className="flex-1">
                            <label className="label">
                                <span className="label-text">Reciever&apos;s Phone Number</span>
                            </label>
                            <input type="tel" defaultValue={recieverPhone} placeholder="Reciever's Phone Number" name="recieverPhone" className="input input-bordered w-full" required />
                        </div>
                        <div className="flex-1">
                            <label className="label">
                                <span className="label-text">Parcel Delivery Address</span>
                            </label>
                            <input type="text" defaultValue={deliveryAddress} placeholder="Parcel Delivery Address" name="deliveryAddress" className="input input-bordered w-full" required />
                        </div>
                    </div>
                    {/* longitude latitude  */}
                    <div className="form-control flex-row gap-5">
                        <div className="flex-1">
                            <label className="label">
                                <span className="label-text">Delivery Address Latitude</span>
                            </label>
                            <input type="number" defaultValue={latitude} placeholder="Delivery Address Latitude" name="latitude" className="input input-bordered w-full" required />
                        </div>
                        <div className="flex-1">
                            <label className="label">
                                <span className="label-text">Delivery Address longitude</span>
                            </label>
                            <input type="number" defaultValue={longitude} placeholder="Delivery Address longitude" name="longitude" className="input input-bordered w-full" required />
                        </div>
                    </div>

                    {/* price and delivery date  */}
                    <div className="form-control flex-row gap-5">
                        <div className="flex-1">
                            <label className="label">
                                <span className="label-text">Price</span>
                            </label>
                            <input value={price} defaultValue={deliveryPrice} readOnly type="number" name="price" className="input input-bordered w-full" required />
                        </div>
                        <div className="flex-1">
                            <label className="label">
                                <span className="label-text">Requested Delivery Date</span>
                            </label>
                            <input type="date" defaultValue={requestedDeliveryDate} placeholder="Requested Delivery Date" name="requestedDeliveryDate" className="input input-bordered w-full" required />
                        </div>
                    </div>
                    <div className="form-control mt-6">
                        <button className="btn bg-[#f5ebe0] hover:bg-[#e29578]">Update Now</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default UpdateBooking;