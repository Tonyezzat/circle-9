import { HeroUIProvider } from "@heroui/react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";
import ProtectedAuthRoute from "./ProtectedRoutes/ProtectedAuthRoute";
import ProtectedRoutes from "./ProtectedRoutes/ProtectedRoutes";
import AuthContextProvider from "./contexts/authContext";
import AuthLayout from "./layouts/AuthLayout";
import MainLayout from "./layouts/MainLayout";
import Feed from "./pages/Feed";
import NotFound from "./pages/NotFound";
import Profile from "./pages/Profile";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import PostDetails from "./pages/PostDetails";
const router = createBrowserRouter([
  {
    path: "",
    element: <AuthLayout />,
    children: [
      {
        path: "signup",
        element: (
          <ProtectedAuthRoute>
            <SignUp />
          </ProtectedAuthRoute>
        ),
      },
      {
        path: "signin",
        element: (
          <ProtectedAuthRoute>
            <SignIn />
          </ProtectedAuthRoute>
        ),
      },
    ],
  },
  {
    path: "",
    element: <MainLayout />,
    children: [
      {
        index: true,
        element: (
          <ProtectedRoutes>
            <Feed />
          </ProtectedRoutes>
        ),
      },
      {
        path: "profile",
        element: (
          <ProtectedRoutes>
            <Profile />
          </ProtectedRoutes>
        ),
      },
      {
        path: "posts/:postId",
        element: (
          <ProtectedRoutes>
            <PostDetails />
          </ProtectedRoutes>
        ),
      },
      { path: "*", element: <NotFound /> },
    ],
  },
]);

function App() {
  return (
    <>
      <AuthContextProvider>
        <HeroUIProvider>
          <RouterProvider router={router}></RouterProvider>
        </HeroUIProvider>
      </AuthContextProvider>
    </>
  );
}

export default App;
