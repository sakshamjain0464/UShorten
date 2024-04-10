import axios from "axios";

const deleteUrl = async (shortID, token) => {
    try {
        const reqURL = `${import.meta.env.VITE_REACT_BACKEND_URL}/api/url/delete`
        console.log(token);
        const response = await axios.delete(reqURL, {
            headers: {
                Authorization: token
            },
            data: {
                shortID
            }
        });

        return response.data;
    } catch (error) {
        console.error(error);
        if(error.response.status === 500) {
            return 500;
        }
        return null;
    }
}

export default deleteUrl;