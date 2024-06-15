import { createBrowserRouter, RouterProvider } from "react-router-dom";
import AppLayout from "./components/AppLayout.jsx";
import AuthGuard from "./components/Auth/AuthGuard.jsx";
import GuestGuard from "./components/Auth/GuestGuard.jsx";
import AuthSignIn from "./components/Auth/SignIn.jsx";
import Dashboard from "./components/Dashboard.jsx";
import DetailItem from "./components/Detail/Item.jsx";
import ScreenResult from "./components/Record/ScreenResult.jsx";
import RequestItem from "./components/Request/Item.jsx";
import RequestList from "./components/Request/List.jsx";
import DiamondValuationItem from "./components/Valuation/Item.jsx";
import DiamondValuationList from "./components/Valuation/List.jsx";
import "react-toastify/dist/ReactToastify.css";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <AuthGuard>
        <AppLayout />
      </AuthGuard>
    ),
    children: [
      {
        index: true,
        element: <Dashboard />,
      },
      {
        path: "requests",
        children: [
          {
            index: true,
            element: <RequestList />,
          },
          {
            path: ":requestId",
            children: [
              {
                index: true,
                element: <RequestItem />,
              },
              {
                path: ":detailId",
                element: <DetailItem />,
              },
              {
                path: "result",
                element: <ScreenResult />,
              },
            ],
          },
        ],
      },
      {
        path: "valuations",
        children: [
          {
            index: true,
            element: <DiamondValuationList />,
          },
          {
            path: ":valuationId",
            element: <DiamondValuationItem />,
          },
        ],
      },
    ],
  },
  {
    path: "/auth",
    children: [
      {
        path: "login",
        element: (
          <GuestGuard>
            <AuthSignIn />
          </GuestGuard>
        ),
      },
    ],
  },
]);

export default function App() {
  return <RouterProvider router={router} />;
}
