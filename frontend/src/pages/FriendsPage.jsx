import { useGetFriends } from "../hooks/useFriends";
import { Link } from "react-router-dom";
import { UserIcon } from "lucide-react";
import NoFriend from "../components/NoFriendFound";
import FriendCard from "../components/FriendCard";
import useSocketStore from "../store/useSocketStore";

export default function FriendsPage() {
  const { friends, loadingFriends } = useGetFriends();
  const { onlineUsers } = useSocketStore();

  const onlineFriends = friends?.filter((friend) => onlineUsers.includes(friend._id)) || [];

  return (
    <div className="p-4 sm:p-6 lg:p-8 ">
      <div className="container mx-auto space-y-10 ">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 ">
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">
            Your Friends
          </h2>
          <Link to="/notifications" className="btn btn-outline btn-sm">
            <UserIcon className="mr-2 size-4" />
            Friend Requests
          </Link>
        </div>
        {loadingFriends ? (
          <div className="flex justify-center py-12">
            <span className="loading loading-spinner"></span>
          </div>
        ) : friends?.length === 0 ? (
          <NoFriend />
        ) : (
          <div className="space-y-10">
            {/* Online Friends Section */}
            {onlineFriends.length > 0 && (
              <section>
                <h3 className="text-xl sm:text-2xl font-semibold mb-4 flex items-center gap-2">
                  <span className="size-3 rounded-full bg-success inline-block"></span>
                  Online Friends ({onlineFriends.length})
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                  {onlineFriends.map((friend) => {
                    return <FriendCard key={friend._id} friend={friend} />;
                  })}
                </div>
              </section>
            )}

            {/* All Friends Section */}
            <section>
              <h3 className="text-xl sm:text-2xl font-semibold mb-4 text-base-content/70">
                All Friends ({friends?.length || 0})
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {friends?.map((friend) => {
                  return <FriendCard key={friend._id} friend={friend} />;
                })}
              </div>
            </section>
          </div>
        )}
      </div>
    </div>
  );
}
