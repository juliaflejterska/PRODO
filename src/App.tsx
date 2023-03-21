import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";

import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import ExpensesPage from "./pages/ExpensesPage";
import CalendarPage from "./pages/CalendarPage";
import GoalsPage from "./pages/GoalsPage";

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />}></Route>
        <Route path="/login" element={<LoginPage />}></Route>
        <Route path="/calendar" element={<CalendarPage />}></Route>
        <Route path="/expenses" element={<ExpensesPage />}></Route>
        <Route path="/goals" element={<GoalsPage />}></Route>

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
};

export default App;
