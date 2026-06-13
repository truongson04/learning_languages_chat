import { Navigate, Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import SignUpPage from "./pages/SignUpPage";
import LoginPage from "./pages/LoginPage";
import NotificationPage from "./pages/NotificationPage";
import CallPage from "./pages/CallPage";
import ChatPage from "./pages/ChatPage";
import OnBoardingPage from "./pages/OnboardingPage";
import { toast, Toaster } from "react-hot-toast";

import useAuthUser from "./hooks/useAuthUser.js";
import Loader from "./components/Loader.jsx";
import Layout from "./components/Layout.jsx";
import useThemeStore from "./store/useThemeStore.js";

export default function App() {
  const { isLoading, authUser } = useAuthUser();
  const { theme } = useThemeStore();
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
            path="/call"
            element={authUser ? <CallPage /> : <Navigate to="/login" />}
          />
          <Route
            path="/chat"
            element={authUser ? <ChatPage /> : <Navigate to="/login" />}
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
        </Routes>
        <Toaster />
      </div>
    </>
  );
}
