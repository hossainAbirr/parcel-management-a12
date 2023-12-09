import useAuth from "./useAuth";
import { useQuery } from '@tanstack/react-query';
import useAxiosPublic from "./useAxiosPublic";

const useUserRole = () => {
    const { user, loading } = useAuth();
    const axiosPublic = useAxiosPublic();
    const { data: isUserRole, isPending: isUserRoleLoading } = useQuery({
        queryKey: [user?.email, 'isUserRole'],
        enabled: !loading,
        queryFn: async () => {
            const res = await axiosPublic.get(`/users/role/${user.email}`)
            console.log('from use admin', res.data);
            return res.data;
        }
    })
    return [isUserRole, isUserRoleLoading]
};

export default useUserRole;