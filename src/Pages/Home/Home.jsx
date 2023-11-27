import { Container } from "@mui/material";
import Banner from "../../components/Banner/Banner";
import OurFeatures from "../../components/OurFeatures/OurFeatures";
import useGradient from "../../hooks/useGradient";
const Home = () => {
    const gradientText = useGradient();
    
    return (
        <div>
            <Banner></Banner>
            <h2 className={`mt-24 text-5xl font-bold text-center ${gradientText}`}>Our Feature Section</h2>
            <Container>
                <OurFeatures></OurFeatures>
            </Container>
        </div>
    );
};

export default Home;