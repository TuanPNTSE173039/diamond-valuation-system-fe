import { createBrowserRouter, RouterProvider } from "react-router-dom";
import BasicTabs from "./components/common/BasicTabs.jsx";
import ValuationRequestDetail from "./components/valuation-request/ValuationRequestDetail.jsx";
import RootLayout from "./screens/RootLayout.jsx";
import ValuationNote from "./screens/ValuationNote.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      {
        index: true,
        element: <div>Dashboard</div>,
      },
      {
        path: "requests",
        children: [
          {
            index: true,
            element: <BasicTabs />,
          },
          {
            path: ":requestId",
            element: <ValuationRequestDetail />,
          },
          {
            path: ":requestId/:diamondId",
            element: <ValuationNote />,
          },
        ],
      },
    ],
  },
]);

export default function App() {
  return <RouterProvider router={router} />;
}
