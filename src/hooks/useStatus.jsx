
import Swal from "sweetalert2";
import useAxiosPublic from "./useAxiosPublic";
import useBookings from "./useBookings";
import useCurrentUserFromDbByEmail from "./useCurrentUserFromDbByEmail";

const useStatus = (statusText) => {
  const axiosPublic = useAxiosPublic();
  const [currentUser] = useCurrentUserFromDbByEmail();
  const [, refetch, ,] = useBookings();
  const status = { status: statusText };
  const handleStatus = (id) => {
    console.log(id);
    axiosPublic.patch(`/updateStatus/${id}`, status)
      .then(res => {
        console.log(res.data)
        if (res.data.modifiedCount > 0) {
          Swal.fire({
            title: "Congratulations!",
            text: "Status has been updated!",
            icon: "success"
          });
          if (status.status === 'delivered') {
            const count = currentUser?.countDelivery && currentUser?.countDelivery || 0;
            const newCount = count + 1;
            const countDelivery = { countDelivery: newCount };
            axiosPublic.patch(`/countDelivery/${currentUser._id}`, countDelivery)
          }
          refetch();
        }
      })
      .catch(error => {
        console.error(error);
      })
  }
  return handleStatus;

};
export default useStatus;
