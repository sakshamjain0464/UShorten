import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import fetchUrl from "../utils/fetchUrl";

function Redirection() {
  const [fetched, setFetched] = useState(true);
  const [url, setUrl] = useState('');
  const { shortID } = useParams();

  const handleRedirect = async () => {
    const originalUrl = await fetchUrl(shortID);
    if (originalUrl) {
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
  });

  return (
    <div className="h-full w-full sm:p-10 p-4 flex items-center justify-center text-center tracking-wider">
      {fetched && (
        <div className="overflow-hidden">
          {url ? (
            <>
                <h1 className="mb-3 sm:text-5xl text-2xl font-semibold tracking-wider">Redirecting to</h1>
                <a href={url} className="sm:text-xl min-w-fit text-base text-orange-600 underline text-wrap break-words text-ellipsis">{url}</a>
            </>
          ) : (
            <>
                <h1 className="mb-3 sm:text-5xl text-2xl font-semibold tracking-wider"><span className="block mb-3">404</span>URL Not Found!</h1>
                <a href="localhost:5713" className="sm:text-xl min-w-fit text-base text-orange-600 underline text-wrap break-words text-ellipsis">Create Your URL Now!</a>
            </>
          )
        }
        </div>
      )}
    </div>
  );
}

export default Redirection;