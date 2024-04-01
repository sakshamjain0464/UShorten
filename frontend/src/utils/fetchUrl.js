import axios from "axios";

const fetchUrl = async (shortID) => {
    try {
        const reqURL = `${import.meta.env.VITE_REACT_BACKEND_URL}/verify/${shortID}`
        console.log(reqURL);
        const response = await axios.get(reqURL);
        return response.data.originalUrl;
      } catch (error) {
        console.error(error);
        return null;
      }
}

export default fetchUrl;