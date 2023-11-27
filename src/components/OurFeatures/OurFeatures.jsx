import Lottie from 'lottie-react';
import guardian from '../../assets/guardian.json'
import useGradient from '../../hooks/useGradient';
import fastDelivary from '../../assets/fast-delivary (1).json'
import arrival from '../../assets/delivary-arrival.json'
import useGradientBg from "../../hooks/useGradientBg";
import { useRef } from 'react';
import CountUp  from 'react-countup';
import useMyCountUp from '../../hooks/MyCountUp';
import MyCountUp from '../../hooks/MyCountUp';
const OurFeatures = () => {
    const countUpRef = useRef(null);
    const gradientText = useGradient();
    const gradientBg = useGradientBg();
    
    return (
        <section>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 lg:gap-10 lg:grid-cols-3 mt-20">
                <div className="card shadow-xl image-full">
                    <figure>
                        <Lottie animationData={guardian}></Lottie>
                    </figure>
                    <div className="card-body justify-center items-center ">
                        <div>
                            <h2 className={`text-4xl font-bold text-center mb-5 ${gradientText}`}>Guardians of Your Packages</h2>
                            <p className='text-center'>Rest easy, your parcels are under the watchful care of our delivery guardians</p>
                        </div>
                    </div>
                </div>
                <div className="card shadow-xl image-full">
                    <figure>
                        <Lottie animationData={fastDelivary}></Lottie>
                    </figure>
                    <div className="card-body justify-center items-center ">
                        <div>
                            <h2 className={`text-4xl font-bold text-center mb-5 ${gradientText}`}>Lightning-Fast Delivery</h2>
                            <p className='text-center'>Get your parcels in record time with our super-fast delivery service</p>
                        </div>
                    </div>
                </div>
                <div className="card shadow-xl image-full">
                    <figure>
                        <Lottie animationData={arrival}></Lottie>
                    </figure>
                    <div className="card-body justify-center items-center ">
                        <div>
                            <h2 className={`text-4xl font-bold text-center mb-5 ${gradientText}`}>Express Dispatch, Express Arrival</h2>
                            <p className='text-center'>Our express delivery ensures your parcels reach their destination swiftly.</p>
                        </div>
                    </div>
                </div>
            </div>
            <div className={`h-[300px] ${gradientBg} my-16 rounded-lg`}>
                <div className='flex justify-between items-center h-full px-24'>
                    <div className='space-y-4'>
                        <h2 className='text-white font-semibold text-center text-2xl'>Parcel Booked</h2>
                        <MyCountUp start={0} end={3} decimal={1}></MyCountUp>
                    </div>
                    <div className='space-y-4'>
                        <h2 className='text-white font-semibold text-center text-2xl'>Parcel Delivered</h2>
                        <MyCountUp start={0} end={2} decimal={1}></MyCountUp>
                    </div>
                    <div className='space-y-4'>
                        <h2 className='text-white font-semibold text-center text-2xl'>Our Users</h2>
                        <MyCountUp start={0} end={5} decimal={1}></MyCountUp>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default OurFeatures;