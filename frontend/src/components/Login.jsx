import { useState } from "react";
import login from "../utils/login";
import { useDispatch, useSelector } from "react-redux";
import { setLogin } from "../redux/slices/userSlice";
import { useNavigate, Link } from "react-router-dom";
import GoogleButton from "./GoogleButton";
import { TailSpin } from "react-loader-spinner";
import toast from "react-hot-toast";

const Login = () => {
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const dispatch = useDispatch();
  const loggedin = useSelector((state) => state.user.login);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    const data = await login(username, password);
    if (data) {

      if(data === 500){
        toast.error("Internal Server Error!")
        setLoading(false);
        return;
      }

      if(data === 400){
        toast.error("Invalid Credentials!")
        setLoading(false);
        return;
      }

      dispatch(setLogin({ id: data.userId, token: data.token }));
      navigate("/");
    } 
    else{
      toast.error("Error Logging In!")
    }

    setLoading(false);
  };

  return (
    <div className="w-full h-full flex items-center justify-center">
      {!loggedin ? (
        <div className="max-h-full h-fit max-w-full md:w-[30%] sm:w-1/2 w-full">
          <h1 className="sm:text-4xl text-3xl font-semibold text-center mb-3 text-orange-700">
            Login!
          </h1>
          <form
            className="flex flex-col gap-5 p-5 text-center"
            onSubmit={handleLogin}>
            <input
              type="text"
              minLength={8}
              className="p-2 rounded-md border-2 border-gray-300 focus:outline-none"
              placeholder="Username"
              onInvalid={(e) => {
                e.target.setCustomValidity(
                  "Username must be at least 8 characters long!"
                );
              }}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
            <input
              type="password"
              minLength={8}
              className="p-2 rounded-md border-2 border-gray-300 focus:outline-none"
              placeholder="Password"
              onInvalid={(e) => {
                e.target.setCustomValidity(
                  "Password must be at least 8 characters long!"
                );
              }}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            {loading ? (
              <div className="w-full flex justify-center">
                <TailSpin
                visible={true}
                height="40"
                width="40"
                color="#c2410c"
                ariaLabel="tail-spin-loading"
                radius="1"
                wrapperStyle={{}}
                wrapperClass=""
              />
              </div>
            ) : (
              <button
                type="submit"
                className="p-2 rounded-md bg-red-700 text-white font-semibold">
                Login
              </button>
            )}

            <GoogleButton />

            <p>OR</p>

            <Link
              to="/signup"
              className="p-2 rounded-md bg-red-700 text-white font-semibold text-center">
              SignUp
            </Link>
          </form>
        </div>
      ) : (
        <h1 className="text-3xl font-semibold text-center text-green-700">
          You are already logged in!
        </h1>
      )}
    </div>
  );
};

export default Login;
