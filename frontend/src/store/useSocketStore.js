import { create } from "zustand";
import { io } from "socket.io-client";

const BASE_URL = import.meta.env.VITE_NODE_ENVIRONMENT === "development" ? import.meta.env.VITE_BASE_URL.replace("/api", "") : "";

const useSocketStore = create((set, get) => ({
  socket: null,
  onlineUsers: [],
  connectSocket: (userId) => {
    if (!userId || get().socket?.connected) return;
    
    const socket = io(BASE_URL, {
      query: {
        userId,
      },
    });

    socket.connect();
    set({ socket: socket });

    socket.on("getOnlineUsers", (userIds) => {
      set({ onlineUsers: userIds });
    });
  },
  disconnectSocket: () => {
    if (get().socket?.connected) {
      get().socket.disconnect();
    }
    set({ socket: null, onlineUsers: [] });
  },
}));

export default useSocketStore;
