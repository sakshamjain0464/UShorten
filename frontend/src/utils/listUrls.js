import axios from "axios";

const fetchUrl = async (token) => {
    try {
        const reqURL = `${import.meta.env.VITE_REACT_BACKEND_URL}/api/url/list`
        console.log(reqURL);
        const response = await axios.post(reqURL, {},{
            headers: {
                Authorization: token
            }
        });
        return response.data;
      } catch (error) {
        console.error(error);
        return null;
      }
}

export default fetchUrl;