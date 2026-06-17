import { use } from "react";
import useAuthUser from "../hooks/useAuthUser.js";
import { Link, useLocation } from "react-router";
import { useQueryClient } from "@tanstack/react-query";
import useLogout from "../hooks/useLogout.js";
import logoHanu from "/logo hanu.png";
import { BellIcon, LogOutIcon } from "lucide-react";
import ThemeSelector from "./ThemeSelector.jsx";
import useNotification from "../hooks/useNotification.js";
import useChatStore from "../store/useChatStore.js";
import { Menu } from "lucide-react";

export default function NavBar({ showSideBar }) {
  const { authUser } = useAuthUser();
  const location = useLocation();
  const queryClient = useQueryClient();
  const { logoutMutate, error } = useLogout();
  const { friendRequests } = useNotification();
  const { unreadCount } = useChatStore();

  const hasPendingRequests = friendRequests?.request?.length > 0;
  const hasNotifications = hasPendingRequests || unreadCount > 0;

  return (
    <nav className="bg-base-200/80 backdrop-blur-md border-b border-base-300 sticky top-0 z-30 h-16 flex items-center w-full">
      <div className="w-full px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between w-full">
          <div className="flex items-center lg:hidden gap-2">
            {showSideBar && (
              <label
                htmlFor="main-drawer"
                aria-label="open sidebar"
                className="btn btn-square btn-ghost btn-sm"
              >
                <Menu className="h-5 w-5" />
              </label>
            )}
            <Link to="/" className="flex items-center gap-2">
              <span className="text-2xl font-bold font-mono bg-clip-text text-transparent bg-linear-to-r from-red-700 to-red-500 tracking-wider">
                HANU
              </span>
            </Link>
          </div>

          <div className="hidden lg:flex items-center">
            {location.pathname === "/chat" && (
              <Link to="/" className="flex items-center gap-2.5">
                <img
                  src={logoHanu}
                  className="size-9 text-primary"
                  alt="logo"
                />
                <span className="text-3xl font-bold font-mono bg-clip-text text-transparent bg-linear-to-r from-red-700 to-red-500 tracking-wider">
                  HANU
                </span>
              </Link>
            )}
          </div>

          <div className="flex items-center gap-2 sm:gap-4 ml-auto">
            <Link to="/notifications" className="indicator">
              {hasNotifications && (
                <span className="indicator-item badge badge-error badge-xs translate-y-[4px]"></span>
              )}
              <button className="btn btn-ghost btn-circle">
                <BellIcon className="h-6 w-6 text-base-content opacity-70" />
              </button>
            </Link>
          </div>
          <ThemeSelector />
          <Link to="/profile">
            <div className="avatar cursor-pointer transition-all hover:ring-2 hover:ring-primary rounded-full">
              <div className="w-9 rounded-full">
                <img src={authUser?.profilePic} />
              </div>
            </div>
          </Link>
          <button className="btn btn-ghost btn-circle" onClick={logoutMutate}>
            <LogOutIcon className="size-6 text-base-content opacity-70" />
          </button>
        </div>
      </div>
    </nav>
  );
}
