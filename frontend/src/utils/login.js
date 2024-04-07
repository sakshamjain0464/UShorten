import axios from "axios";

const login = async (username, password) => {
    try {
        const reqURL = `${import.meta.env.VITE_REACT_BACKEND_URL}/api/users/login`;
        console.log(reqURL);
        const body = { username, password };
        const response = await axios.post(reqURL, body);
        return response.data;
    } catch (error) {
        console.error(error);
        return null;
    }
};

export default login;
