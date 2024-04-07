import axios  from "axios";

const signup = async (username, password, email) => {
    try {
        const reqURL = `${import.meta.env.VITE_REACT_BACKEND_URL}/api/users/signup`;
        console.log(reqURL);
        const body = { username, password, email };
        const response = await axios.post(reqURL, body);
        return response.data;
    } catch (error) {
        console.error(error);
        return null;
    }
};

export default signup;