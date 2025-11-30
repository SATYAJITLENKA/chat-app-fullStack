import React from "react";
import { useAuthStore } from "../store/useAuthStore";
import avatar from "../assets/profile.svg"
import { Link } from "react-router-dom";
import { useChatStore } from "../store/useChatStore";
const Navbar = () => {
  const { authUser, logout  } = useAuthStore();
  const {selectedUser} = useChatStore()
  function hadleLogout() {
    logout();
  }
  return (
    <div>
      <div className="navbar bg-base-100 shadow-sm">
        <div className="flex-1">
          <p className="btn btn-ghost text-xl">
            {
              selectedUser?.fullname
            }
          </p>
        </div>
        <div className="flex-none">
          {authUser ? (
            <div className="dropdown dropdown-end">
              <div
                tabIndex={0}
                role="button"
                className="btn btn-ghost btn-circle avatar"
              >
                <div className="w-10 rounded-full">
                  <img
                    alt="Tailwind CSS Navbar component"
                    src={ authUser.profilePic || avatar}
                  />
                </div>
              </div>
              <ul
                tabIndex="-1"
                className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
              >
                <li>
                  <Link to="/profile" className="justify-between" >
                    Profile
                  </Link>
                </li>
                <li>
                  <Link to="/settings">Settings</Link>
                </li>
                <li>
                  <a onClick={hadleLogout}>Logout</a>
                </li>
              </ul>
            </div>
          ) : (
            <p>Settings</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
