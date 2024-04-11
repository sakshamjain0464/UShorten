import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import fetchUrl from "../utils/fetchUrl";
import { ColorRing } from "react-loader-spinner";

function Redirection() {
  const [fetched, setFetched] = useState(false);
  const [url, setUrl] = useState("");
  const { shortID } = useParams();

  const handleRedirect = async () => {
    const originalUrl = await fetchUrl(shortID);
    if (originalUrl) {
      if (originalUrl === 500) {
        alert("Internal Server Error");
        window.location.href = "https://u-shorten-tan.vercel.app/";
        setFetched(true);
        setUrl(null);
        return;
      }
      setFetched(true);
      setUrl(originalUrl);
      window.location.href = originalUrl;
    } else {
      setFetched(true);
      setUrl(null);
    }
  };

  useEffect(() => {
    handleRedirect();
    console.log("Redirecting to", shortID);
  }, []);

  return (
    <div className="h-full w-full sm:p-10 p-4 flex items-center justify-center text-center tracking-wider">
      {fetched ? (
        <div className="overflow-hidden">
          {url ? (
            <>
              <h1 className="mb-3 sm:text-5xl text-2xl font-semibold tracking-wider">
                Redirecting to
              </h1>
              <a
                href={url}
                className="sm:text-xl min-w-fit text-base text-orange-600 underline text-wrap break-words text-ellipsis">
                {url}
              </a>
            </>
          ) : (
            <>
              <h1 className="mb-3 sm:text-5xl text-2xl font-semibold tracking-wider">
                <span className="block mb-3">404</span>URL Not Found!
              </h1>
              <Link
                to="/"
                className="sm:text-xl min-w-fit text-base text-orange-600 underline text-wrap break-words text-ellipsis">
                Create Your URL Now!
              </Link>
            </>
          )}
        </div>
      ) : (
        <ColorRing
          visible={true}
          height="80"
          width="80"
          ariaLabel="color-ring-loading"
          wrapperStyle={{}}
          wrapperClass="color-ring-wrapper"
          colors={["#e15b64", "#f47e60", "#f8b26a", "#abbd81", "#849b87"]}
        />
      )}
    </div>
  );
}

export default Redirection;
