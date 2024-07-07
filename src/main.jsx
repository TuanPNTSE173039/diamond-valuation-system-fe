import { createTheme, ThemeProvider } from "@mui/material";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import pdfMake from "pdfmake/build/pdfmake";

import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import App from "./App.jsx";
import "./index.css";
import { store } from "./redux/store.js";

pdfMake.fonts = {
  Roboto: {
    normal:
      "https://cdnjs.cloudflare.com/ajax/libs/pdfmake/0.1.66/fonts/Roboto/Roboto-Regular.ttf",
    bold: "https://cdnjs.cloudflare.com/ajax/libs/pdfmake/0.1.66/fonts/Roboto/Roboto-Medium.ttf",
    italics:
      "https://cdnjs.cloudflare.com/ajax/libs/pdfmake/0.1.66/fonts/Roboto/Roboto-Italic.ttf",
    bolditalics:
      "https://cdnjs.cloudflare.com/ajax/libs/pdfmake/0.1.66/fonts/Roboto/Roboto-MediumItalic.ttf",
  },
};
pdfMake.tableLayouts = {
  receiptLayout: {
    hLineWidth: function (i, node) {
      if (i === 0 || i === node.table.body.length) {
        return 0;
      }
      return i === node.table.headerRows ? 1 : 0.8;
    },
    vLineWidth: function (i) {
      return 0;
    },
    hLineColor: function (i) {
      return i === 1 ? "black" : "#aaa";
    },
    paddingLeft: function (i) {
      return i === 0 ? 0 : 8;
    },
    paddingRight: function (i, node) {
      return i === node.table.widths.length - 1 ? 0 : 8;
    },
  },
};
const theme = createTheme({
  palette: {
    primary: {
      main: "#3f51b5",
      white: "#ffffff",
    },
    secondary: {
      main: "#f50057",
    },
    status: {
      color: "#eff3f5",
      pending: "#33595e",
      processing: "#30cb83",
      received: "#2133a1",
      cancelled: "#e74c3c",
      sealing: "#f39c12",
      completed: "#9b59b6",
      finished: "#f1c40f",
      valuating: "#54a0ff",
      valuated: "#b33771",
      assessing: "#30cb83",
      assessed: "#2133a1",
      approved: "#3FA2F6",
    },
    highlight: { white: "#ffffff" },
  },
  typography: {
    button: {
      textTransform: "none",
    },
  },
});
const queryClient = new QueryClient();
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <Provider store={store}>
        <QueryClientProvider client={queryClient}>
          <App />
          {/*<ReactQueryDevtools*/}
          {/*  initialIsOpen={false}*/}
          {/*  buttonPosition="bottom-left"*/}
          {/*/>*/}
        </QueryClientProvider>
      </Provider>
    </ThemeProvider>
  </React.StrictMode>,
);
