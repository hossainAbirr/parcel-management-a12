
import axios  from 'axios';

const axiosPublic = axios.create({
    baseURL: 'http://localhost:2132',

})
const useAxiosPublic = () => {
    return axiosPublic
};

export default useAxiosPublic;