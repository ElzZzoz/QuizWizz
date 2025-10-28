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
  Students,
} from "./pages";
import { AuthLayout, MasterLayout } from "./components";
import { ROUTES } from "./services/Endpoints/Endpoints";
// --- QueryClient and QueryClientProvider removed ---
// --- ModalProvider removed (now in main.tsx) ---
import { Modal } from "./components/Quizzes/modal/Modal"; // Only UI component

// --- queryClient instance removed ---

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
        { path: ROUTES.STUDENTS.slice(1), element: <Students /> },
        { path: ROUTES.RESULTS.slice(1), element: <Results /> },
      ],
    },
  ]);

  return (
    // --- Provider wrappers removed ---
    <>
      <RouterProvider router={routes} />

      <Toaster
        position="top-center"
        gutter={12}
        containerStyle={{ margin: "8px", zIndex: 99999 }}
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

      <Modal />
    </>
  );
}

export default App;
