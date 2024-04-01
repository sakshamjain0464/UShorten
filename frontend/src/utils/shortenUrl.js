import axios from "axios";

const shortenUrl = async (url) => {
  try {
    const reqURL = `${import.meta.env.VITE_REACT_BACKEND_URL}/url/shorten`
    console.log(reqURL);
    const response = await axios.post(reqURL, {
      url: url,
    });
    return response.data.shortID;
  } catch (error) {
    console.error(error);
    return null;
  }
}

export default shortenUrl;