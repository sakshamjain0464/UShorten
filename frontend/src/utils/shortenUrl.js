import axios from "axios";

const shortenUrl = async (url, user) => {
  try {
    const reqURL = `${import.meta.env.VITE_REACT_BACKEND_URL}/api/url/shorten`
    const response = await axios.post(reqURL, {
      url,
      userID: user?user.id:null ,
    });
    return response.data.shortID;
  } catch (error) {
    console.error(error);
    return null;
  }
}

export default shortenUrl;