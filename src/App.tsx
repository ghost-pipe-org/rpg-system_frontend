import "./global.css";
import { AppRouter } from "./routes/AppRouter";
import { useEffect } from "react";


export const App = () => {
  useEffect(() => {
    fetch("")
  }, []);

  return <AppRouter />;
};
