import { createBrowserRouter, RouterProvider } from "react-router-dom";
import BasicTabs from "./components/common/BasicTabs.jsx";
import ValuationRequestDetail from "./components/ValuationRequestDetail.jsx";
import RootLayout from "./RootLayout.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      {
        path: "/",
        element: <div>Dashboard</div>,
      },
      {
        path: "/requests",
        element: <BasicTabs />,
      },
      {
        path: "/requests/:id",
        element: <ValuationRequestDetail />,
      },
    ],
  },
]);

export default function App() {
  return <RouterProvider router={router} />;
}
