import { useEffect, useState } from "react";
import { useParams } from "react-router";
import useAuthUser from "../hooks/useAuthUser";
import { useQuery } from "@tanstack/react-query";
import { getStreamToken } from "../config/api";
import { StreamChat } from "stream-chat";

import { toast } from "react-hot-toast";
import ChatLoader from "../components/ChatLoader";
import {
  Channel,
  ChannelHeader,
  Chat,
  MessageList,
  Window,
  MessageComposer,
} from "stream-chat-react";
import CallButton from "../components/CallButton";

export default function ChatPage() {
  const { id: targetUserId } = useParams();
  const [chatClient, setChatClient] = useState(null);
  const [channel, setChannel] = useState(null);
  const [loading, setLoading] = useState(true);
  const { authUser } = useAuthUser();
  const STREAM_API_KEY = import.meta.env.VITE_STREAM_API_KEY;

  const { data } = useQuery({
    queryKey: ["streamToken"],
    queryFn: getStreamToken,
    enabled: !!authUser, //ép kiểu thành boolean
  });
  const handleVideoCall = () => {
    if (channel) {
      const callUrl = `${window.location.origin}/call/${channel.id}`;
      channel.sendMessage({
        text: `Join me here ${callUrl}`,
      });
      toast.success("Video call link has been sent");
    }
  };
  useEffect(() => {
    const initialChat = async (params) => {
      if (!data?.token || !authUser) {
        return;
      }
      try {
        console.log(authUser);
        console.log(data.token);
        console.log(STREAM_API_KEY);
        const streamClient = StreamChat.getInstance(STREAM_API_KEY);
        await streamClient.connectUser(
          {
            id: authUser._id.toString(),
            name: authUser.fullName,
            image: authUser.profilePic,
          },
          data.token,
        );
        const channelId = [authUser._id, targetUserId].sort().join("-");
        const currentChannel = streamClient.channel("messaging", channelId, {
          members: [authUser._id, targetUserId],
        });
        await currentChannel.watch();
        setChatClient(streamClient);
        setChannel(currentChannel);
      } catch (error) {
        console.log(error);
        toast.error("Cannot connect to chat");
      } finally {
        setLoading(false);
      }
    };
    initialChat();
    return () => {
      if (chatClient) {
        chatClient.disconnectUser();
      }
    };
  }, [data, authUser, targetUserId]);
  if (loading) {
    return <ChatLoader />;
  }
  return (
    <div className="h-[93vh]">
      <Chat client={chatClient}>
        <Channel channel={channel} cus>
          <div className="w-full relative">
            <Window>
              <ChannelHeader />
              <CallButton handleVideoCall={handleVideoCall} />

              <MessageList />
              <MessageComposer focus />
            </Window>
          </div>
        </Channel>
      </Chat>
    </div>
  );
}
