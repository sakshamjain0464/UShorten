import axios  from "axios";

const signup = async (username, password, email) => {
    try {
        const reqURL = `${import.meta.env.VITE_REACT_BACKEND_URL}/api/users/signup`;
        console.log(reqURL);
        const body = { username, password, email };
        const response = await axios.post(reqURL, body);

        

        return response.data;
    } catch (error) {

        if(error.response.status === 500) {
            return 500;
        }

        if(error.response.status === 402) {
            return 402;
        }

        console.error(error);
        return null;
    }
};

export default signup;