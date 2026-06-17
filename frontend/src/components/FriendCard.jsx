import { Link } from "react-router";
import GetFlag from "../helper/GetFlag";
import useSocketStore from "../store/useSocketStore";

export default function FriendCard({ friend }) {
  const { onlineUsers } = useSocketStore();
  const isOnline = onlineUsers.includes(friend._id);
  return (
    <div className="card bg-base-200 hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
      <div className="card-body p-4 ">
        <div className="flex items-center gap-3 mb-3 ">
          <div className="flex flex-col gap-1">
            <div className={`avatar ${isOnline ? "online" : ""}`}>
              <div className="w-12 rounded-full overflow-hidden border border-primary-700">
                <img
                  src={friend.profilePic}
                  className="object-cover size-full"
                />
              </div>
            </div>
            <h3 className="font-semibold text-sm truncate w-full text-center">
              {friend.fullName}
            </h3>
          </div>

          <div className="flex flex-wrap gap-1.5 mb-3">
            <span className="badge badge-secondary text-xs">
              {" "}
              <GetFlag language={friend.nativeLanguage} />
              Native: {friend.nativeLanguage}
            </span>
            <span className="badge badge-outline text-xs">
              <GetFlag language={friend.learningLanguage} />
              Learning:{friend.learningLanguage}
            </span>
          </div>
          <Link to={`/chat/${friend._id}`} className="btn btn-outline ">
            Message
          </Link>
        </div>
      </div>
    </div>
  );
}
