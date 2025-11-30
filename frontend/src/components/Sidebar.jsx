import { MessageCircle, Settings, User } from "lucide-react";
import React, { useEffect } from "react";
import { useChatStore } from "../store/useChatStore";
import profilePic from "../assets/profile.svg";
import { useAuthStore } from "../store/useAuthStore";
import { Link } from "react-router-dom";

const Sidebar = () => {
  const { getUsers, users, setSelectedUser, messages, getMessages } =
    useChatStore();
  const { onlineUsers } = useAuthStore();
  const handleSelectedUser = (singleUser) => {
    console.log("User is runnig", singleUser);
    setSelectedUser(singleUser);
    getMessages(singleUser._id);
  };
  useEffect(() => {
    getUsers();
  }, []);

  return (
    <div className="w-72 bg-base-100 shadow-xl border-r border-base-300 flex flex-col">
      <div className="p-4 text-2xl font-bold border-b border-base-300">
        Chat App
      </div>

      {/* Sidebar Items */}
      <div className="flex flex-col p-4 gap-3 flex-1 overflow-y-auto">
        {users.map((signleUser) => {
          return (
            <button
              className="btn btn-ghost justify-start gap-3 text-base"
              onClick={() => handleSelectedUser(signleUser)}
            >
              <div className="relative w-fit">
                <img
                  className="size-10 rounded-full"
                  src={signleUser.profilePic || profilePic}
                />
                {onlineUsers.includes(signleUser._id) && (
                  <>
                    <span className="indicator-item status status-success absolute bottom-0 right-1"></span>
                  </>
                )}
              </div>{" "}
              <div className="flex flex-col items-start gap-1">
                
              {signleUser.fullname}
              {onlineUsers.includes(signleUser._id) && <p className="text-xs">online</p>}
              
              </div>
            </button>
            // <p>{user.fullname}</p>
          );
        })}

        <Link to="/" className="btn btn-ghost justify-start gap-3 text-base">
          <User size={20} /> Profile
        </Link>
        <Link to="/settings" className="btn btn-ghost justify-start gap-3 text-base">
          <Settings size={20} /> Settings
        </Link>
      </div>
    </div>
  );
};

export default Sidebar;
