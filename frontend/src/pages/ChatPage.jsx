import { useEffect, useState } from "react";
import { useParams } from "react-router";
import useAuthUser from "../hooks/useAuthUser";
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
import useChatStore from "../store/useChatStore";

export default function ChatPage() {
  const { id: targetUserId } = useParams();
  const { chatClient } = useChatStore();
  const [channel, setChannel] = useState(null);
  const [loading, setLoading] = useState(true);
  const { authUser } = useAuthUser();

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
    if (!chatClient || !targetUserId || !authUser) {
      return;
    }

    const setupChannel = async () => {
      setLoading(true);
      try {
        let channelId;
        let currentChannel;

        if (targetUserId.includes("-") || targetUserId.startsWith("group-")) {
          channelId = targetUserId;
          currentChannel = chatClient.channel("messaging", channelId);
        } else {
          channelId = [authUser._id, targetUserId].sort().join("-");
          currentChannel = chatClient.channel("messaging", channelId, {
            members: [authUser._id, targetUserId],
          });
        }
        
        await currentChannel.watch();
        setChannel(currentChannel);
      } catch (error) {
        console.log(error);
        toast.error("Cannot connect to chat");
      } finally {
        setLoading(false);
      }
    };

    setupChannel();
  }, [chatClient, targetUserId, authUser]);

  if (loading) {
    return <ChatLoader />;
  }
  return (
    <div className="h-[calc(100vh-4rem)]">
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
