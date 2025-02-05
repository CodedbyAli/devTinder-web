import { useDispatch, useSelector } from "react-redux";
import { deleteUser } from "../utils/userSlice";
import { Link, useNavigate } from "react-router";
import axios from "axios";
import { BASE_URL } from "../utils/constants";

const Navbar = () => {
  const user = useSelector((store) => store.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try{
      await axios.post(BASE_URL+'/logout', {}, {withCredentials:true});
      dispatch(deleteUser());
      return navigate('/login');
    }
    catch(err)
    {
      // 
    }
  }

  return (
    <>
      <div className="navbar bg-base-200">
        <div className="flex-1">
          <Link to='/' className="btn btn-ghost text-xl">🧑 DevTinder</Link>
        </div>
        {user ? (<p>Welcome, {user.data.firstName}</p>) : ''}
        <div className="flex-none gap-2 mx-6">
          {user ? (<div className="dropdown dropdown-end">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle avatar"
            >
              <div className="w-10 rounded-full">
                <img
                  alt="Tailwind CSS Navbar component"
                  src={user.data.imageUrl}
                />
              </div>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
            >
              <li>
                <Link to='/profile' className="justify-between">
                  Profile
                  <span className="badge">New</span>
                </Link>
              </li>
              <li>
                <a>Settings</a>
              </li>
              <li>
                <button onClick={handleLogout}>Logout</button>
              </li>
            </ul>
          </div>) : ''}
        </div>
      </div>
    </>
  );
};

export default Navbar;
