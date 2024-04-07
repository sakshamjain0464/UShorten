import { Link } from "react-router-dom";
import { FaLink } from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../redux/slices/userSlice";

const Navbar = () => {
  const login = useSelector((state) => state.user.login);
  const dispatch = useDispatch();

  return (
    <div className="sm:h-[10vh] h-fit w-full bg-emerald-950 py-3 px-20 flex sm:flex-row flex-col sm:justify-between justify-center items-center">
      <div className="flex items-center cursor-pointer">
        <FaLink className="text-white mr-2 text-2xl" />
        <Link>
          <h1 className="text-3xl text-white tracking-widest font-semibold">
            UShorten
          </h1>
        </Link>
      </div>
      <ul className="h-full flex gap-x-3 items-center font-medium sm:text-lg text-sm sm:mt-0 mt-3 tracking-wider">
        {!login ? (
          <>
            <li className="border-2 border-white bg-orange-700 px-4 py-2 rounded-md">
              <Link to="/login" className="text-white">
                Login
              </Link>
            </li>
            <li className="border-2 border-white px-4 py-2 hover:bg-orange-600 rounded-md">
              <Link to="/signup" className="text-white">
                Signup
              </Link>
            </li>
          </>
        ) : (
          <li className="border-2 border-white text-white cursor-pointer bg-orange-700 px-4 py-2 rounded-md"
            onClick={() => {
              dispatch(logout());
            }}
          >
            Logout
          </li>
        )}
      </ul>
    </div>
  );
};

export default Navbar;
