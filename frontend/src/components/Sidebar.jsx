import { Link, useLocation } from "react-router";
import useAuthUser from "../hooks/useAuthUser.js";
import logoHanu from "/logo hanu.png";
import { BellIcon, HomeIcon, UserIcon } from "lucide-react";
import useNotification from "../hooks/useNotification.js";
import useChatStore from "../store/useChatStore.js";


export default function Sidebar() {
  const { authUser } = useAuthUser();
  const location = useLocation();
  const currentPath = location.pathname;
  const { friendRequests } = useNotification();
  const { unreadCount } = useChatStore();

  const hasPendingRequests = friendRequests?.request?.length > 0;
  const hasNotifications = hasPendingRequests || unreadCount > 0;

  return (
    <aside className="w-64 bg-base-200 border-r border-base-300  lg:flex flex-col h-screen sticky top-0 ">
      <div className="p-5 border-b border-base-300">
        <Link to="/">
          <img src={logoHanu} className="size-9 text-primary" />
          <span className="text-3xl font-bold font-mono bg-clip-text text-transparent bg-linear-to-r from-red-700 to-red-500 tracking-wider">
            HANU
          </span>
        </Link>
      </div>
      <nav className="flex-1 p-4 space-y-1">
        <Link
          to="/"
          className={`btn btn-ghost justify-start w-full gap-3 px-3 normal-case ${currentPath == "/" ? "btn-active" : ""}`}
        >
          <HomeIcon className="size-5 text-base-content opacity-70" />
          <span>Home</span>
        </Link>
        <Link
          to="/friends"
          className={`btn btn-ghost justify-start w-full gap-3 px-3 normal-case ${currentPath == "/friends" ? "btn-active" : ""}`}
        >
          <UserIcon className="size-5 text-base-content opacity-70" />
          <span>Friends</span>
        </Link>
        <Link
          to="/notifications"
          className={`btn btn-ghost justify-start w-full gap-3 px-3 normal-case ${currentPath == "/notifications" ? "btn-active" : ""}`}
        >
          <div className="indicator">
            {hasNotifications && (
              <span className="indicator-item badge badge-error badge-xs translate-x-1.5 translate-y-[-1.5px]"></span>
            )}
            <BellIcon className="size-5 text-base-content opacity-70" />
          </div>
          <span>Notifications</span>
        </Link>
      </nav>
      <div className="p-4 border-t border-base-300 mt-auto">
        <div className="flex items-center gap-3">
          <div className="avatar">
            <div className="w-10 rounded-full">
              <img src={authUser?.profilePic} />
            </div>
          </div>
          <div className="flex-1">
            <p className="font-semibold text-sm"> {authUser?.fullName}</p>
            <p className="text-xs text-success flex flex-row items-center gap-1">
              <span className="size-2 rounded-full bg-success inline-block"></span>
              <span className="block text-primary">Online</span>
            </p>
          </div>
        </div>
      </div>
    </aside>
  );
}
