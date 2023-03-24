import React, { useState } from "react";

interface AuthContextProps {
  token: string | null;
  isLoggedIn: boolean;
  login: (token: string) => void;
  logout: () => void;
}

export const AuthContext = React.createContext<AuthContextProps>({
  token: null,
  isLoggedIn: false,

  login: (token: string) => {},
  logout: () => {},
});

interface AuthContextProviderProps {
  children: React.ReactNode;
}

export const AuthContextProvider: React.FC<AuthContextProviderProps> = (
  props
) => {
  const localStorageToken = localStorage.getItem("token");
  const [token, setToken] = useState<string | null>(localStorageToken);
  const isLoggedIn = !!token;

  const logoutHandler = () => {
    setToken(null);
    localStorage.removeItem("token");
  };

  const loginHandler = (token: string) => {
    setToken(token);
    localStorage.setItem("token", token);
  };

  const contextValue: AuthContextProps = {
    token,
    isLoggedIn,
    login: loginHandler,
    logout: logoutHandler,
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
