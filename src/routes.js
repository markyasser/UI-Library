import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import DietPlanPage from "./pages/DietPlanPage";
import DashboardPage from "./pages/DashboardPage";

const AppRoutes = () => (
  <Routes>
    <Route path="/create-diet-plan" element={<DietPlanPage />} />
    <Route path="/" element={<DashboardPage />} />
  </Routes>
);

export default AppRoutes;
