
import banner2 from '../../assets/banner2.webp';
import useGradient from '../../hooks/useGradient';

const Banner = () => {
    const color = useGradient();
    return (
        <div className="hero min-h-screen" style={{ backgroundImage: `url(${banner2})` }}>
            <div className="hero-overlay bg-opacity-60"></div>
            <div className="hero-content text-center text-neutral-content">
                <div className="max-w-md">
                    <h1 className={`mb-5 text-5xl font-bold ${color}`}>Welcome to Parcel Management</h1>

                    <div className="join">
                        <input className={`input input-bordered join-item hover:outline-dashed hover:outline-warning`} placeholder="Search here" />
                        <button className={`btn join-item rounded-r-full`}> <span className={`${color}`}>Search</span></button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Banner;
