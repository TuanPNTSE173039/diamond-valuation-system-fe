import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ScreenAppLayout from "./screens/AppLayout.jsx";
import ScreenDashboard from "./screens/Dashboard.jsx";
import ScreenValuationRequestDetailItem from "./screens/Detail/Item.jsx";
import ScreenResult from "./screens/Record/Result.jsx";
import ScreenValuationRequestItem from "./screens/Request/Item.jsx";
import ScreenRequestList from "./screens/Request/List.jsx";
import ScreenDiamondValuationItem from "./screens/Valuation/Item.jsx";
import ScreenDiamondValuationList from "./screens/Valuation/List.jsx";
import "react-toastify/dist/ReactToastify.css";

const router = createBrowserRouter([
  {
    path: "/",
    element: <ScreenAppLayout />,
    children: [
      {
        index: true,
        element: <ScreenDashboard />,
      },
      {
        path: "requests",
        children: [
          {
            index: true,
            element: <ScreenRequestList />,
          },
          {
            path: ":requestId",
            children: [
              {
                index: true,
                element: <ScreenValuationRequestItem />,
              },
              {
                path: ":detailId",
                element: <ScreenValuationRequestDetailItem />,
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
            element: <ScreenDiamondValuationList />,
          },
          {
            path: ":valuationId",
            element: <ScreenDiamondValuationItem />,
          },
        ],
      },
    ],
  },
]);

export default function App() {
  return <RouterProvider router={router} />;
}
