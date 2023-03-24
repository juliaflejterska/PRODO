import { useContext, useState } from "react";
import { AuthForm } from "../components/Auth/AuthForm";
import AuthContext from "../context/auth-context";

const LoginPage: React.FC = () => {
  const API_URL: string = "https://identitytoolkit.googleapis.com/v1/accounts";

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const authenticationContext = useContext(AuthContext);

  const handleFetch = (url: string, email: string, password: string): void => {
    setIsLoading(true);

    fetch(`${API_URL}:${url}?key=AIzaSyAyQE1d89NcjxsGakghI1HdErfhDU499aQ`, {
      method: "POST",
      body: JSON.stringify({
        email,
        password,
        returnSecureToken: true,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        setIsLoading(false);

        if (res.ok) {
          return res.json();
        }

        if (!res.ok) {
          return res.json().then((data) => {
            throw new Error("Authentication failed.");
          });
        }
      })
      .then((data) => {
        authenticationContext.login(data.idToken);
      })
      .catch((err: Error) => {
        alert(err.message);
        setIsLoading(false);
      });
  };

  const handleLogin = (email: string, password: string): void => {
    handleFetch("signInWithPassword", email, password);
  };

  const handleRegister = (email: string, password: string): void => {
    handleFetch("signUp", email, password);
  };

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
      <AuthForm onLogin={handleLogin} onRegister={handleRegister} />
    </section>
  );
};

export default LoginPage;
