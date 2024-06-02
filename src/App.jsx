import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ScreenAppLayout from "./screens/AppLayout.jsx";
import ScreenDashboard from "./screens/Dashboard.jsx";
import ScreenDiamondValuationItem from "./screens/DiamondValuation/Item.jsx";
import ScreenDiamondValuationList from "./screens/DiamondValuation/List.jsx";
import ScreenResult from "./screens/Record/Result.jsx";
import ScreenValuationRequestItem from "./screens/ValuationRequest/Item.jsx";
import ScreenValuationRequestList from "./screens/ValuationRequest/List.jsx";
import ScreenValuationRequestDetailItem from "./screens/ValuationRequestDetail/Item.jsx";
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
            element: <ScreenValuationRequestList />,
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
