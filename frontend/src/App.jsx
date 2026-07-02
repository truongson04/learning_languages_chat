import { Navigate, Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import SignUpPage from "./pages/SignUpPage";
import LoginPage from "./pages/LoginPage";
import NotificationPage from "./pages/NotificationPage";
import CallPage from "./pages/CallPage";
import ChatPage from "./pages/ChatPage";
import OnBoardingPage from "./pages/OnboardingPage";
import FriendsPage from "./pages/FriendsPage";
import MessagesPage from "./pages/MessagesPage";
import { toast, Toaster } from "react-hot-toast";

import useAuthUser from "./hooks/useAuthUser.js";
import Loader from "./components/Loader.jsx";
import Layout from "./components/Layout.jsx";
import useThemeStore from "./store/useThemeStore.js";
import useSocketStore from "./store/useSocketStore.js";
import { useEffect } from "react";
import { useQueryClient, useQuery } from "@tanstack/react-query";
import { getStreamToken } from "./config/api.js";
import useChatStore from "./store/useChatStore.js";



export default function App() {
  const { isLoading, authUser } = useAuthUser();
  const { theme } = useThemeStore();
  const { connectSocket, disconnectSocket, socket } = useSocketStore();
  const queryClient = useQueryClient();
  const { initializeChat, disconnectChat } = useChatStore();

  const { data: tokenData } = useQuery({
    queryKey: ["streamToken"],
    queryFn: getStreamToken,
    enabled: !!authUser && authUser.isOnboarded,
  });

  useEffect(() => {
    if (authUser && authUser.isOnboarded) {
      connectSocket(authUser._id);
    } else {
      disconnectSocket();
    }
  }, [authUser, connectSocket, disconnectSocket]);

  useEffect(() => {
    if (authUser && authUser.isOnboarded && tokenData?.token) {
      initializeChat(
        authUser._id,
        authUser.fullName,
        authUser.profilePic,
        tokenData.token
      );
    }
  }, [authUser, tokenData, initializeChat]);

  useEffect(() => {
    if (!authUser) {
      disconnectChat();
    }
  }, [authUser, disconnectChat]);

  useEffect(() => {
    if (!socket) return;

    const handleNewFriendRequest = (requestDetails) => {
      queryClient.invalidateQueries({ queryKey: ["friendRequests"] });
      toast.success(`${requestDetails.sender.fullName} sent you a friend request!`);
    };

    const handleFriendRequestCancelled = () => {
      queryClient.invalidateQueries({ queryKey: ["friendRequests"] });
    };

    socket.on("newFriendRequest", handleNewFriendRequest);
    socket.on("friendRequestCancelled", handleFriendRequestCancelled);

    return () => {
      socket.off("newFriendRequest", handleNewFriendRequest);
      socket.off("friendRequestCancelled", handleFriendRequestCancelled);
    };
  }, [socket, queryClient]);
  if (isLoading) {
    return <Loader />;
  }

  return (
    <>
      <div data-theme={theme} className="h-screen">
        <Routes>
          <Route
            path="/"
            element={
              authUser && authUser.isOnboarded ? (
                <Layout>
                  <HomePage />
                </Layout>
              ) : (
                <Navigate to={authUser ? "/onboarding" : "/login"} />
              )
            }
          />
          <Route
            path="/friends"
            element={
              authUser && authUser.isOnboarded ? (
                <Layout>
                  <FriendsPage />
                </Layout>
              ) : (
                <Navigate to={authUser ? "/onboarding" : "/login"} />
              )
            }
          />
          <Route
            path="/messages"
            element={
              authUser && authUser.isOnboarded ? (
                <Layout>
                  <MessagesPage />
                </Layout>
              ) : (
                <Navigate to={authUser ? "/onboarding" : "/login"} />
              )
            }
          />
          <Route
            path="/signup"
            element={
              authUser ? (
                <Navigate to={authUser.isOnboarded ? "/" : "/onboarding"} />
              ) : (
                <SignUpPage />
              )
            }
          />
          <Route
            path="/login"
            element={
              authUser ? (
                authUser.isOnboarded ? (
                  <Navigate to="/" />
                ) : (
                  <Navigate to="/onboarding" />
                )
              ) : (
                <LoginPage />
              )
            }
          />
          <Route
            path="/notifications"
            element={
              authUser && authUser.isOnboarded ? (
                <Layout showSideBar={true}>
                  <NotificationPage />
                </Layout>
              ) : (
                <Navigate to={!authUser ? "/login" : "/onboarding"} />
              )
            }
          />
          <Route
            path="/call/:id"
            element={
              authUser && authUser.isOnboarded ? (
                <CallPage />
              ) : (
                <Navigate to={!authUser ? "/login" : "/onboarding"} />
              )
            }
          />
          <Route
            path="/chat/:id"
            element={
              authUser && authUser.isOnboarded ? (
                <Layout showSideBar={false}>
                  <ChatPage />
                </Layout>
              ) : (
                <Navigate to={!authUser ? "/login" : "onboarding"} />
              )
            }
          />
          <Route
            path="/onboarding"
            element={
              authUser ? (
                authUser.isOnboarded ? (
                  <Navigate to="/" />
                ) : (
                  <OnBoardingPage />
                )
              ) : (
                <Navigate to="/login" />
              )
            }
          />
          <Route
            path="/profile"
            element={
              authUser && authUser.isOnboarded ? (
                <Layout>
                  <OnBoardingPage />
                </Layout>
              ) : (
                <Navigate to={authUser ? "/onboarding" : "/login"} />
              )
            }
          />
        </Routes>
        <Toaster />
      </div>
    </>
  );
}
