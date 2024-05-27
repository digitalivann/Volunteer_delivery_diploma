import {server} from "./requestMiddleware";
export const handleChangePictureForHub = async (event) => {
    try {
        const formData = new FormData();
        const file = event.target.files[0];
        formData.append("picture", file);
        const {data} = await server.post("/hub/picture/add", formData)
        return data ? data : ""
    } catch
        (error) {
        alert("Неможливо завантажити фото")
        if (error.response) {
            console.log(error.response.data.message);
        }
    }
}