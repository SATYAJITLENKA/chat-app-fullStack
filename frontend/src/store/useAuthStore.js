import { create } from "zustand";
import { axiosInstance } from "../lib/axios";
import toast from 'react-hot-toast';
const SOCKET_URL = import.meta.env.MODE === "development"? "http://localhost:8000" :"/";
import { io } from "socket.io-client";


export const useAuthStore = create((set, get) => ({
    authUser: null,
    isCheckingAuth: true,
    isSigningUp: false,
    isLoggingIng: false,
    isUpdateProfile: false,
    onlineUsers: [],
    socket: null,

    checkAuth: async () => {
        try {
            const res = await axiosInstance.get("/auth/check")
            console.log("res is ", res)
            set({ authUser: res.data })
            get().connectSocket();
        } catch (error) {
            console.log("error in checkauth", error)
            set({ authUser: null })
        } finally {
            set({ isCheckingAuth: false })
        }
    },

    signup: async (data) => {
        set({ isSigningUp: true })
        try {
            const res = await axiosInstance.post("/auth/signup", data);
            console.log("singup", res.data)
            set({ authUser: res.data });
            set({ isCheckingAuth: false })
            toast.success("Account created successfully");
            get().connectSocket();
        } catch (error) {
            console.log("error in signupStore", error.response.data.message)
            // toast.error(error.response.data.message)
        } finally {
            set({ isSigningUp: false })
        }
    },

    login: async (data) => {
        try {
            const res = await axiosInstance.post("/auth/login", data);
            set({ authUser: res.data });
            set({ isCheckingAuth: false });
            toast.success("Login successfully")
            get().connectSocket();
        } catch (error) {
            console.log("error in loginStore", error);
            toast.error(error.response.data.message)
        }
    },

    logout: async () => {
        try {
            await axiosInstance.post("/auth/logout");
            set({ authUser: null });
            toast.success("Logged out successfully");
            get().disconnectSocket();
        } catch (error) {
            console.log(error)
            toast.error(error.response.data.message)
        }
    },

    updateProfile: async (data) => {
        try {
            set({ isUpdateProfile: true })
            const res = await axiosInstance.put("/auth/update-profile", data);
            set({ authUser: res.data })
            toast.success("Profile updated successfully");
        } catch (error) {
            console.log(error.response.data)
            toast.error(error.response.data);
        }
    },

    connectSocket: () => {
        const { authUser } = get();
        console.log(authUser._id)
        if (!authUser ||  get().socket?.conected) return;
        const socket = io(SOCKET_URL, {
            query: {
                userId: authUser._id
            },
            withCredentials: true

        });
        // socket.connect();
        set({ socket: socket })

        socket.on("connect", () => console.log("socket connected:", socket.id));
        socket.on("disconnect", (reason) => {
            console.log("socket disconnected:", reason);
            set({ socket: null, onlineUsers: [] });
        });
        // listen for the server event (name must match server)
        socket.on("getOnlineUsers", (userIds) => {
            set({ onlineUsers: userIds });
        });
    },

    disconnectSocket: () => {
        if (get().socket?.connected) get().socket.disconnect();
    }


}));