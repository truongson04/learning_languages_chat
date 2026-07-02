import { create } from "zustand";
import { StreamChat } from "stream-chat";
import { toast } from "react-hot-toast";

const useChatStore = create((set, get) => ({
  chatClient: null,
  unreadCount: 0,
  initializeChat: async (userId, userName, userImage, token) => {
    if (get().chatClient) return get().chatClient;

    const apiKey = import.meta.env.VITE_STREAM_API_KEY;
    const client = StreamChat.getInstance(apiKey);

    try {
      await client.connectUser(
        {
          id: userId,
          name: userName,
          image: userImage,
        },
        token,
      );

      set({
        chatClient: client,
        unreadCount: client.user.unread_channels || 0,
      });

      client.on("message.new", (event) => {
        if (event.user.id !== userId) {
          set((state) => ({ unreadCount: state.unreadCount + 1 }));

          const isCurrentlyChatting =
            window.location.pathname === `/chat/${event.user.id}`;
          if (!isCurrentlyChatting) {
            toast.success(
              `New message from ${event.user.name || "User"}: "${event.message.text}"`,
            );
          }
        }
      });

      client.on("notification.mark_read", (event) => {
        set({ unreadCount: event.unread_channels || 0 });
      });

      client.on("notification.message_new", (event) => {
        set({ unreadCount: event.unread_channels || 0 });
      });

      return client;
    } catch (error) {
      console.error("Error connecting Stream Chat user:", error);
    }
  },
  disconnectChat: async () => {
    const client = get().chatClient;
    if (client) {
      try {
        await client.disconnectUser();
      } catch (error) {
        console.error("Error disconnecting Stream Chat user:", error);
      }
      set({ chatClient: null, unreadCount: 0 });
    }
  },
}));

export default useChatStore;
