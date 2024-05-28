import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ScreenAppLayout from "./screens/AppLayout.jsx";
import ScreenValuationRequestItem from "./screens/ValuationRequest/Item.jsx";
import ScreenValuationRequestList from "./screens/ValuationRequest/List.jsx";
import ScreenValuationRequestDetailItem from "./screens/ValuationRequestDetail/Item.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <ScreenAppLayout />,
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
            element: <ScreenValuationRequestList />,
          },
          {
            path: ":requestId",
            element: <ScreenValuationRequestItem />,
          },
          {
            path: ":requestId/:detailId",
            element: <ScreenValuationRequestDetailItem />,
          },
        ],
      },
    ],
  },
]);

export default function App() {
  return <RouterProvider router={router} />;
}
