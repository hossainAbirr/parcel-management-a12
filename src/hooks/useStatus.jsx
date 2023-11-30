
import Swal from "sweetalert2";
import useAxiosPublic from "./useAxiosPublic";
import useBookings from "./useBookings";

const useStatus = (statusText) => {
  const axiosPublic = useAxiosPublic();

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
