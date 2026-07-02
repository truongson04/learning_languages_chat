import { useState } from "react";
import { useGetFriends } from "../hooks/useFriends";
import useChatStore from "../store/useChatStore";
import useAuthUser from "../hooks/useAuthUser";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { XIcon } from "lucide-react";

export default function CreateGroupModal({ isOpen, onClose }) {
  const { friends, loadingFriends } = useGetFriends();
  const { chatClient } = useChatStore();
  const { authUser } = useAuthUser();
  const [groupName, setGroupName] = useState("");
  const [selectedFriends, setSelectedFriends] = useState([]);
  const [isCreating, setIsCreating] = useState(false);
  const navigate = useNavigate();

  if (!isOpen) return null;

  const handleToggleFriend = (friendId) => {
    setSelectedFriends((prev) =>
      prev.includes(friendId)
        ? prev.filter((id) => id !== friendId)
        : [...prev, friendId]
    );
  };

  const handleCreateGroup = async () => {
    if (!groupName.trim()) {
      return toast.error("Please enter a group name");
    }
    if (selectedFriends.length === 0) {
      return toast.error("Please select at least one friend");
    }

    setIsCreating(true);
    try {
      const channelId = `group-${crypto.randomUUID()}`;
      const channel = chatClient.channel("messaging", channelId, {
        name: groupName,
        members: [authUser._id, ...selectedFriends],
      });
      await channel.watch();
      toast.success("Group created successfully!");
      onClose();
      navigate(`/chat/${channelId}`);
    } catch (error) {
      console.error(error);
      toast.error("Failed to create group");
    } finally {
      setIsCreating(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="bg-base-100 rounded-xl shadow-2xl w-full max-w-md max-h-[90vh] flex flex-col overflow-hidden">
        <div className="p-4 border-b border-base-200 flex justify-between items-center bg-base-200/50">
          <h2 className="text-xl font-bold">Create Group Chat</h2>
          <button onClick={onClose} className="btn btn-ghost btn-circle btn-sm">
            <XIcon className="size-5" />
          </button>
        </div>

        <div className="p-4 flex-1 overflow-y-auto">
          <div className="form-control mb-4">
            <label className="label">
              <span className="label-text font-medium">Group Name</span>
            </label>
            <input
              type="text"
              placeholder="E.g., English Study Group"
              className="input input-bordered w-full"
              value={groupName}
              onChange={(e) => setGroupName(e.target.value)}
              disabled={isCreating}
            />
          </div>

          <div className="form-control">
            <label className="label">
              <span className="label-text font-medium">
                Select Members ({selectedFriends.length})
              </span>
            </label>
            
            {loadingFriends ? (
              <div className="flex justify-center py-4">
                <span className="loading loading-spinner"></span>
              </div>
            ) : friends?.length === 0 ? (
              <p className="text-center py-4 opacity-70 text-sm">
                You don't have any friends yet.
              </p>
            ) : (
              <div className="space-y-2 mt-2 max-h-60 overflow-y-auto pr-2">
                {friends?.map((friend) => (
                  <label
                    key={friend._id}
                    className="flex items-center gap-3 p-2 rounded-lg hover:bg-base-200 cursor-pointer transition-colors border border-transparent hover:border-base-300"
                  >
                    <input
                      type="checkbox"
                      className="checkbox checkbox-primary checkbox-sm"
                      checked={selectedFriends.includes(friend._id)}
                      onChange={() => handleToggleFriend(friend._id)}
                      disabled={isCreating}
                    />
                    <div className="avatar">
                      <div className="w-8 rounded-full">
                        <img src={friend.profilePic} alt={friend.fullName} />
                      </div>
                    </div>
                    <span className="flex-1 text-sm font-medium">
                      {friend.fullName}
                    </span>
                  </label>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="p-4 border-t border-base-200 bg-base-200/50 flex justify-end gap-2">
          <button
            className="btn btn-ghost"
            onClick={onClose}
            disabled={isCreating}
          >
            Cancel
          </button>
          <button
            className="btn btn-primary"
            onClick={handleCreateGroup}
            disabled={isCreating || selectedFriends.length === 0 || !groupName.trim()}
          >
            {isCreating ? (
              <span className="loading loading-spinner loading-sm"></span>
            ) : (
              "Create Group"
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
