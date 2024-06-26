import { Link } from "react-router-dom";
import { useState } from "react";
import signup from "../utils/signup";
import { useNavigate } from "react-router-dom";
import GoogleButton from "./GoogleButton";
import { TailSpin } from "react-loader-spinner";
import toast from "react-hot-toast";

function Signup() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleSignUp = async (e) => {
    e.preventDefault();
    setLoading(true);
    const response = await signup(username, password, email);

    if (response !== 402 && response !== 500 && response !== null) {
      toast.success("Signup Successful");
      navigate("/login");
    } else if(response === 402) {
      toast.error("User Already Exists! Please Login");
    }else  {
      toast.error("Error Signing Up! Please try again later!");
    }
    setLoading(false);
  };

  return (
    <div className="w-full h-full flex items-center justify-center">
      <div className="max-h-full h-fit max-w-full md:w-[30%] sm:w-1/2 w-full">
        <h1 className="sm:text-4xl text-3xl font-semibold text-center mb-3 text-orange-700">
          Signup
        </h1>
        <form
          className="flex flex-col gap-5 p-5 text-center"
          onSubmit={handleSignUp}>
          <input
            type="text"
            minLength={8}
            className="p-2 rounded-md border-2 border-gray-300 focus:outline-none"
            placeholder="Username"
            value={username}
            onInvalid={(e) => {
              e.target.setCustomValidity(
                "Username must be at least 8 characters long!"
              );
            }}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          <input
            type="email"
            className="p-2 rounded-md border-2 border-gray-300 focus:outline-none"
            placeholder="Email"
            value={email}
            onInvalid={(e) => {
              e.target.setCustomValidity("Please Enter a valid E-mail");
            }}
            onChange={(e) => setEmail(e.target.value)}
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
            value={password}
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
                Signup
              </button>
            )}

          <GoogleButton />


          <p>OR</p>

          <Link
            to="/login"
            className="p-2 rounded-md bg-red-700 text-white font-semibold text-center">
            Login
          </Link>
        </form>
      </div>
    </div>
  );
}

export default Signup;
