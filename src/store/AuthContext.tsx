import { createContext, type ReactNode, useContext, useState } from "react";

type isAuthenticatedContextValue = {
  isAuthenticated: boolean;
  setIsAuthenticated: (auth: boolean) => void;
};

const AuthContext = createContext<isAuthenticatedContextValue | null>(null);

export default function AuthContextProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  return (
    <AuthContext.Provider value={{ isAuthenticated, setIsAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const authCtx = useContext(AuthContext);
  if (!authCtx) {
    throw new Error(
      "Authentication context is null...please use Authentication Context within Authentication Context Provider",
    );
  }
  return authCtx
};
