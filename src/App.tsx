import React, { useContext } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";

import HomePage from "./pages/HomePage";
import AuthPage from "./pages/AuthPage";
import ExpensesPage from "./pages/ExpensesPage";
import CalendarPage from "./pages/CalendarPage";
import GoalsPage from "./pages/GoalsPage";
import AuthContext from "./context/auth-context";
import Layout from "./components/Layout/Layout";

const App: React.FC = () => {
  const authenticationContext = useContext(AuthContext);

  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<HomePage />}></Route>

          {!authenticationContext.isLoggedIn && (
            <Route path="/login" element={<AuthPage />} />
          )}

          {authenticationContext.isLoggedIn && (
            <>
              <Route path="/calendar" element={<CalendarPage />}></Route>
              <Route path="/expenses" element={<ExpensesPage />}></Route>
              <Route path="/goals" element={<GoalsPage />}></Route>
            </>
          )}

          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Layout>
    </Router>
  );
};

export default App;
