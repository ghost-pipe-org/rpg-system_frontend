import { BrowserRouter, Routes, Route } from "react-router-dom";
import { LandingPage } from "../pages/Landing/LandingPage";
import { Register } from "../pages/Register/RegisterPage";
import { Login } from "../pages/Login/LoginPage";
import { Sessions } from "../pages/Sessions/SessionsPage";
import { Admin } from "../pages/Admin/AdminPage";
export const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/cadastro" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<LandingPage />} />
        <Route path="/eventos" element={<LandingPage />} /> {/* Alterar posteriormente */}
        <Route path="/sessoes" element={<Sessions/>} />
        <Route path="/admin" element={<Admin />} />
      </Routes>
    </BrowserRouter>
  );
};