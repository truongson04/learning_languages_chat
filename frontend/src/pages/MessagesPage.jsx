import { useState } from "react";
import { Chat, ChannelList } from "stream-chat-react";
import useChatStore from "../store/useChatStore";
import useAuthUser from "../hooks/useAuthUser";
import { UsersIcon } from "lucide-react";
import { useNavigate } from "react-router-dom";
import CreateGroupModal from "../components/CreateGroupModal";
import ChatLoader from "../components/ChatLoader";

export default function MessagesPage() {
  const { chatClient } = useChatStore();
  const { authUser } = useAuthUser();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();

  if (!chatClient || !authUser) {
    return <ChatLoader />;
  }

  const filters = { members: { $in: [authUser._id] } };
  const sort = { last_message_at: -1 };
  const options = { state: true, watch: true, presence: true };

  const handleChannelSelect = (channel) => {
    navigate(`/chat/${channel.id}`);
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8 h-[calc(100vh-4rem)] flex flex-col">
      <div className="container mx-auto h-full flex flex-col max-w-5xl">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">
            Messages
          </h2>
          <button
            className="btn btn-primary btn-sm"
            onClick={() => setIsModalOpen(true)}
          >
            <UsersIcon className="mr-2 size-4" />
            Create Group Chat
          </button>
        </div>

        <div className="flex-1 bg-base-200 rounded-xl overflow-hidden shadow-lg border border-base-300 relative">
          <Chat client={chatClient}>
            <div className="h-full w-full custom-channel-list">
              <ChannelList
                filters={filters}
                sort={sort}
                options={options}
                onSelect={handleChannelSelect}
              />
            </div>
          </Chat>
        </div>
      </div>

      <CreateGroupModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
}
