import {useEffect, useState} from "react";
import { useSelector} from "react-redux";
import shortenUrl from "../utils/shortenUrl";

function Home() {

    const [url, setUrl] = useState("");
    const [shortUrl, setShortUrl] = useState(null);

    const login = useSelector((state) => state.user.login);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const shortID = await shortenUrl(url);
        setShortUrl(`localhost:5173/${shortID}`);
    }

  return (
    <div className="h-full w-full flex flex-col items-center justify-center gap-4 select-none">
      <h1 className="md:text-5xl text-3xl tracking-wider font-medium text-center">
        Create Your Short URL Now!
      </h1>
      <p className="md:text-2xl text-base text-center text-wrap break-words">
        Make short URLs at your own convinience
      </p>
      <form onSubmit={handleSubmit} className="w-full flex flex-col h-fit justify-center items-center mt-5 gap-3">
        <input
         className="border-2 border-gray-300 p-2 sm:w-[60%] w-[100%] rounded-md focus:outline-none"
          type="url"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="Enter URL"
          required
        />
        <button type="submit" className="text-xl tracking-wider font-semibold text-white bg-orange-700 hover:bg-orange-600 px-4 py-2 rounded-md">Submit</button>
      </form>

      {
        shortUrl && <div className="select-text">{shortUrl}</div>
      }

      {login ? (
        <div className="flex flex-col gap-4 items-center">
          <p className="text-lg font-semibold">Your Short URL:</p>
          <a href="#" className="text-xl font-semibold text-blue-500">https://shortly.com/shorturl</a>
        </div>
      ) : <p className="md:text-2xl text-base text-center text-wrap break-words tracking-wider mt-3">Login to Unlock more!!!!!</p>}
    </div>
  );
}

export default Home;
