import React from "react";
import { Link } from "react-router-dom";

const HomePage: React.FC = () => {
  return (
    <div>
      <Link to="/login">login</Link>
      <Link to="/calendar">calendar</Link>
      <Link to="/expenses">expenses</Link>
      <Link to="/goals">goals</Link>
    </div>
  );
};

export default HomePage;
