import useAuth from "./useAuth";
import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from './useAxiosPublic';


const useBookings = () => {

    const { user } = useAuth();
    console.log(user);
    const axiosPublic = useAxiosPublic();
    const { refetch, data: bookings = [], isPending: isLoading } = useQuery({
        queryKey: ['bookings', user?.email],
        // enabled: user === true,
        queryFn: async () => {
            const res = await axiosPublic.get(`/bookings?email=${user?.email}`)            
            return res.data;
        }
    })
    return [bookings, refetch, isLoading]
};

export default useBookings;
