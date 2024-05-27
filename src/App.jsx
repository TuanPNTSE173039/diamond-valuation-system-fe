import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ScreenAppLayout from "./screens/AppLayout.jsx";
import ScreenDiamondsList from "./screens/Diamonds/List.jsx";
import ValuationNote from "./screens/ValuationNote.jsx";
import ScreenValuationRequestDetail from "./screens/ValuationRequest/Detail.jsx";
import ScreenValuationRequestList from "./screens/ValuationRequest/List.jsx";

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
            element: <ScreenValuationRequestDetail />,
          },
          {
            path: ":requestId/:diamondId",
            element: <ValuationNote />,
          },
        ],
      },
      {
        path: "diamonds",
        children: [
          {
            index: true,
            element: <ScreenDiamondsList />,
          },
        ],
      },
    ],
  },
]);

export default function App() {
  return <RouterProvider router={router} />;
}
