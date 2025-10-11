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

function App() {
  const routes = createBrowserRouter([
    {
      path: ROUTES.ROOT,
      element: <AuthLayout />, // This route provides the layout
      errorElement: <NotFound />,
      // All children are now relative to the root path "/"
      children: [
        { index: true, element: <Login /> }, // This will match the root path "/"
        { path: ROUTES.LOGIN, element: <Login /> },
        { path: ROUTES.REGISTER, element: <Register /> },
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
    <>
      <RouterProvider router={routes} />
      <Toaster
        position="top-center"
        gutter={12}
        containerStyle={{ margin: "8px" }}
        toastOptions={{
          success: {
            duration: 3000,
          },
          error: {
            duration: 4000,
          },
          style: {
            fontSize: "16px",
            maxWidth: "500px",
            padding: "16px 24px",
          },
        }}
      />
    </>
  );
}

export default App;
