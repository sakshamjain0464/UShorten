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

        if(error.response.status === 500) {
          alert("Internal Server Error")
          return 500;
      }


        return null;
      }
}

export default fetchUrl;