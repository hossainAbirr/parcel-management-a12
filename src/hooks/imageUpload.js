import axios from "axios";

const imagHostingKey = import.meta.env.VITE_image_api_key;
const imgHostingApi = `https://api.imgbb.com/1/upload?key=${imagHostingKey}`;
export const imageUpload = async (img) => {
  const formData = new FormData();
  console.log(formData);
  formData.append("image", img);
  console.log(formData);
  const { data } = await axios.post(imgHostingApi, formData);
  return data;
};
