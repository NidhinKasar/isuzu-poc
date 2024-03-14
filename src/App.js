import React, { Component, Suspense } from "react";
import {
  BrowserRouter,
  Route,
  Routes,
} from "react-router-dom";
import { Spin } from "antd";

const Dashboard = React.lazy(() => import("./Pages/Dashboard/Dashboard.jsx"));
const Reports = React.lazy(() => import("./Pages/Reports/Reports.jsx"))

const loading = <Spin />;

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <Suspense fallback={loading}>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/reports" element={<Reports />} />
            <Route path="/dashboard" element={<Dashboard />} />
          </Routes>
        </Suspense>
      </BrowserRouter>
    );
  }
}

export default App;
