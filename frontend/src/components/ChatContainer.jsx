import React, { useEffect } from "react";
import { useChatStore } from "../store/useChatStore";
import { useAuthStore } from "../store/useAuthStore";
import avatar from "../assets/profile.svg";
import { useRef } from "react";

const ChatContainer = () => {
  const {
    messages,
    isMessageLoading,
    getMessages,
    selectedUser,
    unsubscribeFromMessages,
    subscribeToMessages,
  } = useChatStore();

  const { authUser } = useAuthStore();
  const messageEndRef = useRef();

  useEffect(() => {
    if (!selectedUser) return;
    getMessages(selectedUser._id);
    subscribeToMessages();
    return () => unsubscribeFromMessages();
  }, [selectedUser, getMessages, subscribeToMessages, unsubscribeFromMessages]);

  useEffect(() => {

    if(messageEndRef.current && messages){
      messageEndRef.current.scrollIntoView({behavior : "smooth"})
    }
  }, [messages]);



  return (
    <>
      <div className="flex-1 p-4 overflow-y-auto flex flex-col gap-4">
        {isMessageLoading ? (
          <p>Loading...</p>
        ) : (
          <div>
            {/* Incoming Message */}

            {messages.map((msg) => {
              if (!msg) {
                console.warn("Invalid message:", msg);
                return null;
              }
              console.log(msg);
              console.log("authUser ", authUser);
              return (
                <div
                
                  className={`chat ${
                    msg.senderId == authUser._id ? "chat-end" : "chat-start"
                  } `}
                  key={msg._id}
                  ref={messageEndRef}
                >
                  {msg.text && (
                    <>
                      <div className="chat-image avatar">
                        <div className="w-10 rounded-full">
                          <img
                            src={
                              msg.senderId === authUser._id
                                ? authUser.profilePic || avatar
                                : selectedUser.profilePic || avatar
                            }
                          />
                        </div>
                      </div>
                      {/* <div className="chat-bubble">Hey! How are you?</div> */}
                      <div className="chat-bubble chat-bubble-primary">
                        {msg.text}
                      </div>
                    </>
                  )}
                  {msg.image && (
                    <img alt="image" src={msg.image} className="h-44" />
                  )}
                </div>
              );
            })}
            {/* <div className="chat chat-start">
              <div className="chat-image avatar">
                <div className="w-10 rounded-full">
                  <img src="https://via.placeholder.com/150" />
                </div>
              </div>
              <div className="chat-bubble">Hey! How are you?</div>
            </div>  */}
            {!selectedUser && (
              <div className="flex h-screen items-center justify-center">
                <h2 className="font-bold">Welcome Back </h2>

                <p>Let's start chartig</p>
              </div>
            )}

            {/* Outgoing Message */}
          </div>
        )}
      </div>
    </>
  );
};

export default ChatContainer;
