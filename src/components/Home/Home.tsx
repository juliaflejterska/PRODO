import React, { useContext } from "react";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import AuthContext from "../../context/auth-context";
import Quotes from "./Quotes";

const Home: React.FC = () => {
  const authenticationContext = useContext(AuthContext);
  const isLoggedIn: boolean = authenticationContext.isLoggedIn;

  return (
    <div
      className="px-5 d-flex flex-column justify-content-center align-items-center"
      style={{ textAlign: "center" }}
    >
      <h1 style={{ fontSize: "5rem", fontWeight: "bold" }}>PRODO</h1>
      {!isLoggedIn && (
        <>
          <h2>
            track your productivity like a&nbsp;
            <span style={{ fontWeight: "bold" }}>pro&nbsp;🚀</span>
          </h2>
          <Link to="/login" className="nav-link p-0">
            <Button
              variant="dark"
              className="mt-5"
              style={{ fontSize: "1.25rem" }}
            >
              LOG IN / SIGN UP
            </Button>
          </Link>
        </>
      )}
      {isLoggedIn && <Quotes />}
    </div>
  );
};

export default Home;
