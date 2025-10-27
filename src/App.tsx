import "@/styles/Global.css";
import { Toaster } from "react-hot-toast";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import {
  Login,
  Register,
  ForgetPass,
  ResetPassword,
  ChangePass,
  Dashboard,
  Quizzes,
  Groups,
  Results,
  NotFound,
} from "./pages";
import { AuthLayout, MasterLayout } from "./components";
import { ROUTES } from "./services/Endpoints/Endpoints";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ModalProvider } from "./components/Quizzes/modal/ModalContext";
import { Modal } from "./components/Quizzes/modal/Modal"; // Only UI component

const queryClient = new QueryClient();

function App() {
  const routes = createBrowserRouter([
    {
      path: ROUTES.ROOT,
      element: <AuthLayout />,
      errorElement: <NotFound />,
      children: [
        { index: true, element: <Login /> },
        { path: "signin", element: <Login /> },
        { path: "signup", element: <Register /> },
        { path: ROUTES.FORGET_PASSWORD, element: <ForgetPass /> },
        { path: ROUTES.RESET_PASSWORD, element: <ResetPassword /> },
        { path: ROUTES.CHANGE_PASSWORD, element: <ChangePass /> },
      ],
    },
    {
      path: ROUTES.DASHBOARD,
      element: <MasterLayout />,
      errorElement: <NotFound />,
      children: [
        { index: true, element: <Dashboard /> },
        { path: ROUTES.QUIZZES.slice(1), element: <Quizzes /> },
        { path: ROUTES.GROUPS.slice(1), element: <Groups /> },
        { path: ROUTES.RESULTS.slice(1), element: <Results /> },
      ],
    },
  ]);

  return (
    <QueryClientProvider client={queryClient}>
      <ModalProvider>
        <RouterProvider router={routes} />

        <Toaster
          position="top-center"
          gutter={12}
          containerStyle={{ margin: "8px" }}
          toastOptions={{
            success: { duration: 3000 },
            error: { duration: 4000 },
            style: {
              fontSize: "16px",
              maxWidth: "500px",
              padding: "16px 24px",
            },
          }}
        />

        {/* ✅ Now Modal is allowed to use useModal() */}
        <Modal />
      </ModalProvider>
    </QueryClientProvider>
  );
}

export default App;
