import { useEffect, useState } from "react";
import useAuth from "../../../hooks/useAuth";
import useAxiosPublic from "../../../hooks/useAxiosPublic";
import Swal from "sweetalert2";

const BookParcel = () => {

    const { user } = useAuth();
    const { displayName, email } = user;
    const axiosPublic = useAxiosPublic();
    const [weight, setWeight] = useState(0);
    const [price, setPrice] = useState(0);

    const miliSecondsInADay = 24 * 60 * 60 * 1000;
    const bookingDateObject = new Date();
    const approximateDeliveryDate = new Date(bookingDateObject.getTime() + 7 * miliSecondsInADay)
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    const formattedDate = approximateDeliveryDate.toLocaleDateString('en-US', options);
    const formattedBookingDate = bookingDateObject.toLocaleDateString('en-US', options)
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


    const handleChange = (e) => {
        const currentWeight = parseFloat(e.target.value);
        setWeight(currentWeight);
        console.log(currentWeight);
    }
    const handleBookSubmit = async (e) => {
        e.preventDefault();
        const form = e.target;
        const bookingUserName = form.name.value;
        const bookingUserEmail = form.email.value;
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
            bookingUserName: bookingUserName,
            bookingUserEmail: bookingUserEmail,
            bookingUserPhone: bookingUserPhone,
            parcelType: type,
            weight: weight,
            recieverName: recieverName,
            deliveryAddress: deliveryAddress,
            recieverPhone: recieverPhone,
            latitude: parseFloat(latitude),
            longitude: parseFloat(longitude),
            requestedDeliveryDate: requestedDeliveryDate,
            approximateDeliveryDate: formattedDate,
            bookingDate: formattedBookingDate,
            deliveryPrice: price,
            status: 'pending'
        }
        const res = await axiosPublic.post('/bookings', booking)
        console.log(res.data);
        if(res.data.acknowledged){
            Swal.fire({
                title: "Good job!",
                text: "You've booked your parcel successfully!",
                icon: "success"
              });
        }
    }
    return (
        <div className=" mb-20">
            <h2 className={`text-4xl font-bold text-center my-5`}>Book A Parcel</h2>
            <div className="card shrink-0 w-full shadow-2xl  bg-[#e3d5ca]">
                <form onSubmit={handleBookSubmit} className="card-body ">
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
                            <input type="tel" placeholder="Phone Number" name="phone" className="input input-bordered w-full" required />
                        </div>
                        <div className="flex-1">
                            <label className="label">
                                <span className="label-text">Parcel Type</span>
                            </label>
                            <input type="text" placeholder="Parcel Type" name="type" className="input input-bordered w-full" required />
                        </div>
                    </div>
                    {/* parcel weght and reciever's name  */}
                    <div className="form-control flex-row gap-5">
                        <div className="flex-1">
                            <label className="label">
                                <span className="label-tex">Parcel Weight</span>
                            </label>
                            <input onChange={handleChange} type="tel" placeholder="Parcel Weight" name="weight" className="input input-bordered w-full" required />
                        </div>
                        <div className="flex-1">
                            <label className="label">
                                <span className="label-text">Reciever&apos;s Name</span>
                            </label>
                            <input type="text" placeholder="Reciever's Name" name="recieverName" className="input input-bordered w-full" required />
                        </div>
                    </div>
                    {/* recievers phone and parcel delivery address  */}
                    <div className="form-control flex-row gap-5">
                        <div className="flex-1">
                            <label className="label">
                                <span className="label-text">Reciever&apos;s Phone Number</span>
                            </label>
                            <input type="tel" placeholder="Reciever's Phone Number" name="recieverPhone" className="input input-bordered w-full" required />
                        </div>
                        <div className="flex-1">
                            <label className="label">
                                <span className="label-text">Parcel Delivery Address</span>
                            </label>
                            <input type="text" placeholder="Parcel Delivery Address" name="deliveryAddress" className="input input-bordered w-full" required />
                        </div>
                    </div>
                    {/* longitude latitude  */}
                    <div className="form-control flex-row gap-5">
                        <div className="flex-1">
                            <label className="label">
                                <span className="label-text">Delivery Address Latitude</span>
                            </label>
                            <input type="text" placeholder="Delivery Address Latitude" name="latitude" className="input input-bordered w-full" required />
                        </div>
                        <div className="flex-1">
                            <label className="label">
                                <span className="label-text">Delivery Address longitude</span>
                            </label>
                            <input type="text" placeholder="Delivery Address longitude" name="longitude" className="input input-bordered w-full" required />
                        </div>
                    </div>

                    {/* price and delivery date  */}
                    <div className="form-control flex-row gap-5">
                        <div className="flex-1">
                            <label className="label">
                                <span className="label-text">Price</span>
                            </label>
                            <input value={price} readOnly type="number" name="price" className="input input-bordered w-full" required />
                        </div>
                        <div className="flex-1">
                            <label className="label">
                                <span className="label-text">Requested Delivery Date</span>
                            </label>
                            <input type="date" placeholder="Requested Delivery Date" name="requestedDeliveryDate" className="input input-bordered w-full" required />
                        </div>
                    </div>
                    <div className="form-control mt-6">
                        <button className="btn bg-[#f5ebe0] hover:bg-[#e29578]">Book Now</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default BookParcel;