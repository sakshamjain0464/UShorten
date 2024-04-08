import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import shortenUrl from "../utils/shortenUrl";
import listUrls from "../utils/listUrls";
import deleteUrl from "../utils/deleteUrl";
import { FaClipboard, FaClipboardCheck } from "react-icons/fa";
import { IoLogoWhatsapp } from "react-icons/io";

function Home() {
  const [url, setUrl] = useState("");
  const [shortUrl, setShortUrl] = useState(null);
  const [urls, setUrls] = useState([]);
  const [copied, setCopied] = useState(false);
  const [modalClosed, setModalClosed] = useState(true);

  const login = useSelector((state) => state.user.login);
  const user = useSelector((state) => state.user.user);

  useEffect(() => {
    if (!login) return;
    const handleListUrls = async () => {
      const urls = await listUrls(user.token);
      if (!urls) {
        alert("Error in fetching URLs");
        return;
      }
      setUrls(urls);
    };
    handleListUrls();
  }, [user, login]);

  const handleSubmit = async (e) => {
    e.preventDefault();
   setModalClosed(true)
   setCopied(false)
    const shortID = await shortenUrl(url, user);
    if (!shortID) {
      alert("Error in Shortening URL");
      setShortUrl("");
      return;
    }
    setShortUrl(`localhost:5173/s/${shortID}`);
    setModalClosed(false);
    setUrls([...urls, { shortID, originalUrl: url, clicks: 0 }]);
    setUrl("");

    setTimeout(() => {
      setModalClosed(true);
    }, 20000);
  };

  const handleDelete = async (shortID) => {
    const response = await deleteUrl(shortID, user.token);
    if (!response) {
      alert("Error in deleting URL");
      return;
    }
    setUrls(urls.filter((item) => item.shortID !== shortID));
  };

  const handleDownload = () => {
    const data = urls.map((item, index) => ({
      "S.No": index + 1,
      "Short ID": item.shortID,
      "Original URL": item.originalUrl,
      Clicks: item.clicks,
    }));

    const csv = ['S.No, ShortID, Original URL, Clicks',...data.map((item) => Object.values(item).join(","))].join('\n');

    const blob = new Blob([csv], { type: "text/csv" });

    const downloadLink = document.createElement("a");
    downloadLink.href = window.URL.createObjectURL(blob);
    downloadLink.download = "urls.csv";
    downloadLink.click();
  };

  return (
    <div className="min-h-full w-full py-3 flex flex-col items-center justify-center gap-4 select-none">
      <h1 className="md:text-5xl text-3xl tracking-wider font-medium text-center">
        Create Your Short URL Now!
      </h1>
      <p className="md:text-2xl text-base text-center text-wrap break-words">
        Make short URLs at your own convinience
      </p>
      <form
        onSubmit={handleSubmit}
        className="w-full flex flex-col h-fit justify-center items-center mt-5 gap-3">
        <input
          className="border-2 border-gray-300 p-2 sm:w-[60%] w-[100%] rounded-md focus:outline-none"
          type="url"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="Enter URL"
          required
        />
        <button
          type="submit"
          className="text-xl tracking-wider font-semibold text-white bg-orange-700 hover:bg-orange-600 px-4 py-2 rounded-md">
          Submit
        </button>
      </form>

      {!modalClosed && shortUrl && (
        <div
          className={`md:w-[60%] w-full flex flex-wrap ${
            copied ? "bg-green-200" : "bg-blue-200"
          } rounded-2xl px-5 py-6 justify-between relative overflow-hidden`}>
          <p className="text-xl">{shortUrl}</p>
          <div className="flex sm:w-[40%] w-full justify-end gap-4 text-2xl">
            {copied ? (
              <FaClipboardCheck className="hover:text-green-900 cursor-pointer" />
            ) : (
              <FaClipboard
                className="hover:text-green-900 cursor-pointer"
                onClick={() => {
                  navigator.clipboard.writeText(shortUrl);
                  alert("Copied to Clipboard");
                  setCopied(true);
                }}
              />
            )}
            <a
              href={`whatsapp://send?text=My new short url using UShorten, an amazing URL shortening Service ${shortUrl}`}
              data-action="share/whatsapp/share"
              target="_blank">
              <IoLogoWhatsapp className="hover:text-green-900 cursor-pointer" />
            </a>
          </div>
          <div className="h-1 absolute left-0 bottom-0 bg-orange-600 rounded-b-md origin-left animate-modal"></div>
        </div>
      )}

      {login ? (
        <div className="w-full h-fit flex flex-col items-center">
          {urls.length ? (
            <>
              <h1 className="text-2xl font-medium text-center">Your URLs</h1>
              <div className="md:min-w-[60%] min-w-full w-full max-h-full h-fit text-center mt-5 px-5 py-6 overflow-auto  bg-white select-text">
                <table className="w-full even:bg-slate-400">
                  <thead>
                    <tr>
                      {["S.No", "Short ID", "Original URL", "Clicks"].map(
                        (item, index) => (
                          <th key={index} className="px-5 py-2 text-lg h-2">
                            {item}
                          </th>
                        )
                      )}
                    </tr>
                  </thead>
                  <tbody>
                    {urls.map((item, index) => (
                      <tr
                        key={item.shortID}
                        className="even:bg-blue-100 odd:bg-green-100 border-b border-black max-h-20">
                        <td className="px-5 pb-2 pt-5 mb-5">{index + 1}</td>
                        <td className="px-5 pb-2 pt-5 mb-5">{item.shortID}</td>
                        <td className="px-5 pb-2 pt-5 mb-5">
                          <a
                            href={item.originalUrl}
                            target="_blank"
                            className="hover:underline text-wrap break-words">
                            {item.originalUrl}
                          </a>
                        </td>
                        <td className="px-5 pb-2 pt-5 mb-5">{item.clicks}</td>
                        <td className="px-5 pb-2 pt-5 mb-5">
                          <button
                            className="px-3 py-2 uppercase font-medium select-none text-white tracking-widest rounded-md bg-orange-600 hover:bg-orange-300"
                            onClick={() => handleDelete(item.shortID)}>
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <button className="w-fit px-3 py-2 mt-3 uppercase font-medium select-none text-white tracking-widest rounded-md bg-orange-600 hover:bg-orange-300"
                onClick={handleDownload}
              >
                Export As CSV
              </button>
            </>
          ) : (
            <p className="md:text-2xl text-base text-center text-wrap break-words tracking-wider mt-3">
              No URLs Found
            </p>
          )}
        </div>
      ) : (
        <p className="md:text-2xl text-base text-center text-wrap break-words tracking-wider mt-3">
          Login to Unlock more!!!!!
        </p>
      )}
    </div>
  );
}

export default Home;
