import { create } from "zustand";
import { axiosInstance } from "../lib/axios";
import toast from "react-hot-toast";
import { useAuthStore } from "./useAuthStore";

export const useChatStore = create((set, get) => ({
    messages: [],
    users: [],
    selectedUser: null,
    isUsersLoading: false,
    isMessageLoading: false,

    getUsers: async () => {
        set({ isUsersLoading: true })
        try {
            const res = await axiosInstance.get("/message/users");
            set({ users: res.data })
            set({ isUsersLoading: false })
        } catch (error) {
            console.log(error)
            toast.error(error.response.data)
            set({ isUsersLoading: false })
        } finally {

            set({ isUsersLoading: false })
        }
    },

    getMessages: async (userId) => {
        set({ isMessageLoading: true })
        console.log("getmessage user id", userId)

        try {
            const res = await axiosInstance.get(`/message/${userId}`);
            set({ messages: res.data })
            console.log("user messages", res.data)
            set({ isMessageLoading: false })
        } catch (error) {
            console.log(error)
            toast.error(error.response.data)
        }
        finally {
            set({ isMessageLoading: false })
        }
    },

    setSelectedUser: (selectUser) => {
        console.log("selectUser in setSelectedUser function", selectUser)
        set({ selectedUser: selectUser })
        console.log("selectedUser is ", selectUser)
    },

    sendMessage: async (messageData) => {
        const { selectedUser, messages } = get();
        console.log("messageData is ", messageData)
        console.log("selectedUser isssssssss", selectedUser)
        try {
            const res = await axiosInstance.post(`/message/send/${selectedUser._id}`, messageData);
            const newMessage = res.data.message ; 
            console.log("newMessage" , newMessage )
            set({ messages: [...messages, res.data] })
        } catch (error) {
            console.log(error);
            toast.error(error)
        }
    },

    subscribeToMessages: () => {
        const { selectedUser } = get();
        if (!selectedUser) return;
        const socket = useAuthStore.getState().socket;

        //optimize
        socket.on("newMessage", (newMessage) => {
            set({
                messages: [...get().messages, newMessage]
            })
        })
    },

    unsubscribeFromMessages: ()=>{
        const socket = useAuthStore.getState().socket;
        socket.off("newMessage")
    }

}))