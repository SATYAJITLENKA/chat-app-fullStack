import { MessageCircle, Settings, User } from "lucide-react";
import React from "react";
import Sidebar from "./Sidebar";
import { useEffect } from "react";
import { useChatStore } from "../store/useChatStore";
import ChatContainer from "./ChatContainer";
import MessageInput from "./MessageInput";
import Navbar from "./Navbar";
const Home = () => {
const {selectedUser} = useChatStore();
  return (
    
    <>
      <div className="flex h-screen bg-base-200" data-theme="dark">
        {/* Sidebar */}
        <Sidebar />
        {/* Chat Area */}
        <div className="flex-1 flex flex-col">
          {/* Chat Header */}
          <div>
            {/* Chat with { selectedUser?.fullname } */}
            <Navbar/>
          </div>

          {/* Messages */}
          <ChatContainer/>
          {/* Chat Input */}
          {
            selectedUser && <MessageInput/>
          }

          
        </div>
      </div>
    </>
  );
};

export default Home;
