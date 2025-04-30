import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Register } from "../pages/Register/Register";

export const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/cadastro" element={<Register />} />
        <Route path="/login" element={<Register />} />
        <Route path="/" element={<Register />} />
      </Routes>
    </BrowserRouter>
  );
};