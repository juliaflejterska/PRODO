import React from "react";
import Expenses from "../components/Expenses/Expenses";

const ExpensesPage: React.FC = () => {
  return (
    <section
      className="min-vw-100 min-vh-100 d-flex justify-content-center align-items-center"
      style={{
        backgroundImage:
          "url(https://images.unsplash.com/photo-1580637250481-b78db3e6f84b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1931&q=80)",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <Expenses />
    </section>
  );
};

export default ExpensesPage;
