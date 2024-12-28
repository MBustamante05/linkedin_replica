import { Navigate, Route, Routes } from "react-router-dom";
import Layout from "./components/layout/Layout";
import HomePage from "./pages/HomePage";
import SignUpPage from "./pages/auth/SignUpPage";
import LoginPage from "./pages/auth/LoginPage";
import toast, { Toaster } from "react-hot-toast";
import { useQuery } from "@tanstack/react-query";
import { axiosInstance } from "./lib/axios";
import { AxiosError } from "axios";
import NotificationsPage from "./pages/NotificationsPage";
import NetworkPage from "./pages/NetworkPage";
import PostPage from "./pages/PostPage";

function App() {
  const { data: authUser, isLoading } = useQuery({
    queryKey: ["authUser"],
    queryFn: async () => {
      function isAxiosError(err: unknown): err is AxiosError {
        return (err as AxiosError).isAxiosError !== undefined;
      }
      try {
        const res = await axiosInstance.get("/auth/profile");
        return res.data;
      } catch (err: unknown) {
        if (isAxiosError(err)) {
          if (err.response?.status === 401) {
            return null;
          }

          toast.error(
            (err.response?.data as { message?: string }).message ||
              "Something went wrong"
          );
        }
      }
    },
  });

  if (isLoading) {
    return null;
  }
  return (
    <Layout>
      <Routes>
        <Route path="/" element={authUser ? <HomePage /> : <Navigate to={"/login"} />} />
        <Route
          path="/signup"
          element={!authUser ? <SignUpPage /> : <Navigate to={"/"} />}
        />
        <Route
          path="/login"
          element={!authUser ? <LoginPage /> : <Navigate to={"/"} />}
          
        />
        <Route
          path="/notifications"
          element={authUser ? <NotificationsPage /> : <Navigate to={"/login"} />}
          
        />
        <Route
          path="/network"
          element={authUser ? <NetworkPage /> : <Navigate to={"/login"} />}
          
        />
        <Route
          path="/post/:postId"
          element={authUser ? <PostPage /> : <Navigate to={"/login"} />}
          
        />
      </Routes>
      <Toaster />
    </Layout>
  );
}

export default App;
