import { useContext, useState } from "react";
import { Navbar, Nav, Container, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import AuthContext from "../../context/auth-context";

function Navigation() {
  const authenticationContext = useContext(AuthContext);
  const isLoggedIn: boolean = authenticationContext.isLoggedIn;
  const [expanded, setExpanded] = useState(false);

  const logoutHandler = () => {
    authenticationContext.logout();
    setExpanded(false);
  };

  const handleLinkClick = () => {
    setExpanded(false);
  };

  return (
    <Navbar bg="white" expand="md" fixed="top" expanded={expanded}>
      <Container>
        <Navbar.Brand
          href="/"
          style={{ fontSize: "2.5rem", fontWeight: "bold" }}
        >
          PRODO
        </Navbar.Brand>
        <Navbar.Toggle
          aria-controls="navbar"
          onClick={() => setExpanded(!expanded)}
        />
        <Navbar.Collapse
          id="navbar"
          className="justify-content-end text-center"
        >
          <Nav className="ml-auto gap-3">
            {!isLoggedIn && (
              <Link
                to="/login"
                className="nav-link p-0"
                onClick={handleLinkClick}
              >
                <Button variant="dark" style={{ fontSize: "1.25rem" }}>
                  LOG IN / SIGN UP FREE
                </Button>
              </Link>
            )}
            {isLoggedIn && (
              <>
                <Link
                  to="/calendar"
                  className="nav-link"
                  style={{ fontSize: "1.25rem" }}
                  onClick={handleLinkClick}
                >
                  CALENDAR
                </Link>
                <Link
                  to="/expenses"
                  className="nav-link"
                  style={{ fontSize: "1.25rem" }}
                  onClick={handleLinkClick}
                >
                  EXPENSES
                </Link>
                <Link
                  to="/goals"
                  className="nav-link"
                  style={{ fontSize: "1.25rem" }}
                  onClick={handleLinkClick}
                >
                  GOALS
                </Link>
                <Button
                  onClick={logoutHandler}
                  variant="dark"
                  style={{ fontSize: "1.25rem" }}
                >
                  LOG OUT
                </Button>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Navigation;
