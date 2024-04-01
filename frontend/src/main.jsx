import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import router from "./router.jsx";
import { RouterProvider } from "react-router-dom";
import { store } from "./redux/store";
import { Provider } from "react-redux";

ReactDOM.createRoot(document.getElementById("root")).render(
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
);
