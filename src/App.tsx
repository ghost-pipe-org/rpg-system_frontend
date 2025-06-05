import { AuthProvider } from "./context/auth";
import { AppRouter } from "./routes/AppRouter";
import { useEffect } from "react";

export const App = () => {
  useEffect(() => {
    fetch("");
  }, []);

  return (
    <AuthProvider>
      <AppRouter />
    </AuthProvider>
  );
};
