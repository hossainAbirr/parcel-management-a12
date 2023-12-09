
import useAxiosPublic from './useAxiosPublic';
import useAuth from './useAuth';
import { useQuery } from '@tanstack/react-query';

const useCurrentUserFromDbByEmail = () => {
    const { user } = useAuth();
    const axiosPublic = useAxiosPublic()
    const { data: currentUser = [] } = useQuery({
        queryKey: [user?.email, 'currentUser'],
        queryFn: async () => {
            const res = await axiosPublic.get(`/user?email=${user?.email}`)
            return res.data
        },
    })
    return [currentUser]
};

export default useCurrentUserFromDbByEmail;