
import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "./useAxiosPublic";

const useAllDeliveryMen = () => {
    const axiosPublic = useAxiosPublic();
    const { data: allDeliveryMen = [], refetch } = useQuery({
        queryKey: ['allDeliveryMen'],
        queryFn: async () => {
            const res = await axiosPublic.get('/allDeliveryMen');
            return res.data
        }
    })
    return [allDeliveryMen, refetch]
};

export default useAllDeliveryMen;