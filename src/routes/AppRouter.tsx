import { BrowserRouter, Routes, Route } from "react-router-dom";
import { LandingPage } from "../pages/Landing/LandingPage";
import { Register } from "../pages/Register/Register";
import { Login } from "../pages/Login/Login";
import { Sessions } from "../pages/Sessions/Sessions";
export const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/cadastro" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<LandingPage />} />
        <Route path="/sessoes" element={<Sessions/>} />
      </Routes>
    </BrowserRouter>
  );
};