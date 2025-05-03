import { BrowserRouter, Routes, Route } from "react-router-dom";
import { LandingPage } from "../pages/Landing/LandingPage";
import { Register } from "../pages/Register/Register";
import { Login } from "../pages/Login/Login";
export const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/cadastro" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<LandingPage />} />
      </Routes>
    </BrowserRouter>
  );
};