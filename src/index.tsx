import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter, Route, Routes } from "react-router-dom";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<h1>Welcome to the App</h1>} />
        <Route path="/login" element={<h1>Login Page</h1>} />

        {/* Dashboard Routes */}
        <Route path="/dashboard" element={<App />}>
          {/* <Route
            path="invoice/documents"
            element={<h1>Invoice Document Page</h1>}
          /> */}
          <Route path="invoice">
            <Route path="documents" element={<h1>Invoice Document Page</h1>} />
            <Route path="templates" element={<h1>Invoice Template Page</h1>} />
          </Route>
          <Route path="offer-letter">
            <Route
              path="documents"
              element={<h1>Offer Letter Document Page</h1>}
            />
            <Route
              path="templates"
              element={<h1>Offer Letter Template Page</h1>}
            />
          </Route>
          <Route path="setting" element={<h1>Setting Page</h1>} />
        </Route>
      </Routes>
    </BrowserRouter>
    {/* <App /> */}
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
