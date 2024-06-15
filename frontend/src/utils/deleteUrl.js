import axios from "axios";

const deleteUrl = async (shortID, token) => {
    try {
        const reqURL = `${import.meta.env.VITE_REACT_BACKEND_URL}/api/url/delete`
        const response = await axios.delete(reqURL, {
            headers: {
                Authorization: token,
                'Access-Control-Allow-Origin': '*',
                mode: 'no-cors',
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