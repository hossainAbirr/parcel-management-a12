import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../../hooks/useAxiosPublic";
import useAuth from "../../../hooks/useAuth";
import { useState } from "react";
import Swal from "sweetalert2";
import { imageUpload } from "../../../hooks/imageUpload";

const UpdateProfile = () => {
    const axiosPublic = useAxiosPublic();
    const [selectedImage, setSelectedImage] = useState(null);
    const { user, updateUserProfile } = useAuth();
    console.log(user);
    const { data: currentUser, refetch } = useQuery({
        queryKey: ['currentUser'],
        queryFn: async () => {
            const res = await axiosPublic.get(`/user?email=${user?.email}`)
            console.log(res.data);
            return res.data
        },
    })
    const handleChangeFile = (e) => {
        const image = e.target.files[0];
        console.log(image);
        setSelectedImage(image);
    }

    const handleUploadBtn = async () => {
        if (!selectedImage) {
            Swal.fire({
                title: 'Error!',
                text: 'No files were selected',
                icon: 'error',
            })
            return;
        }

        const imageUrl = await imageUpload(selectedImage);
        console.log(imageUrl.success);

        const res = await updateUserProfile(user, user.displayName, imageUrl)
        console.log(res);
            // .then(() => {
            //     Swal.fire({
            //         title: 'Congratulation!',
            //         text: 'Your profile has been updated',
            //         icon: 'success',
            //     })
            // })
            // .cathc(error => {
            //     console.error(error);
            // })

    }

    return (
        <div className="max-w-md p-8 sm:flex sm:space-x-6 dark:bg-gray-900 dark:text-gray-100">
            <div className="flex-shrink-0 w-full mb-6 h-44 sm:h-32 sm:w-32 sm:mb-0">
                <img src={user.photoURL} alt="" className="object-cover object-center w-full h-full rounded dark:bg-gray-500" />
            </div>
            <div className="flex flex-col space-y-4">
                <div>
                    <h2 className="text-2xl font-semibold">{user?.displayName}</h2>
                    <span className="text-sm dark:text-gray-400 capitalize">{currentUser?.role}</span>
                </div>
                <div className="space-y-1">
                    <span className="flex items-center space-x-2">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" aria-label="Email address" className="w-4 h-4">
                            <path fill="currentColor" d="M274.6,25.623a32.006,32.006,0,0,0-37.2,0L16,183.766V496H496V183.766ZM464,402.693,339.97,322.96,464,226.492ZM256,51.662,454.429,193.4,311.434,304.615,256,268.979l-55.434,35.636L57.571,193.4ZM48,226.492,172.03,322.96,48,402.693ZM464,464H48V440.735L256,307.021,464,440.735Z"></path>
                        </svg>
                        <span className="dark:text-gray-400">{user?.email}</span>
                    </span>
                    <span className="flex items-center space-x-2">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" aria-label="Phonenumber" className="w-4 h-4">
                            <path fill="currentColor" d="M449.366,89.648l-.685-.428L362.088,46.559,268.625,171.176l43,57.337a88.529,88.529,0,0,1-83.115,83.114l-57.336-43L46.558,362.088l42.306,85.869.356.725.429.684a25.085,25.085,0,0,0,21.393,11.857h22.344A327.836,327.836,0,0,0,461.222,133.386V111.041A25.084,25.084,0,0,0,449.366,89.648Zm-20.144,43.738c0,163.125-132.712,295.837-295.836,295.837h-18.08L87,371.76l84.18-63.135,46.867,35.149h5.333a120.535,120.535,0,0,0,120.4-120.4v-5.333l-35.149-46.866L371.759,87l57.463,28.311Z"></path>
                        </svg>
                        <span className="dark:text-gray-400">{currentUser?.phone}</span>
                    </span>
                    <div className="space-x-2">
                        <input type="file" onChange={handleChangeFile} className="file-input file-input-bordered file-input-xs w-full max-w-xs mb-3" />
                        <button onClick={handleUploadBtn} className="btn btn-xs">Upload Photo</button>
                        <button className="btn btn-xs">Update</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UpdateProfile;