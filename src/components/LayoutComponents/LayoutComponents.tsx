import { ReactNode } from "react";
import { Footer } from "../Footer/Footer";
import { Navbar } from "../Header/Navbar";
import "../../global.css";

interface LayoutComponentsProps {
  children: ReactNode;
  type?: "admin" | "user";
}

export const LayoutComponents = ({ children, type }: LayoutComponentsProps) => {
  if (type === "admin") {
    return (
      <div
        className="flex flex-col w-full h-full min-h-screen bg-[url('/bg_art.png')] bg-cover bg-center "
        style={{
          backgroundImage:
            "linear-gradient(to top, rgba(28, 28, 42, 0.8), rgba(46, 41, 132, 0.8)), url('/bg_art.png')",
          backgroundBlendMode: "multiply",
        }}
      >
        <main className="flex-1 w-full flex items-center justify-center p-4">
          {children}
        </main>
      </div>
    );
  }

  if (type === "user") {
    return (
      <div
        className="flex flex-col w-full h-full min-h-screen bg-[url('/bg_art.png')] bg-cover bg-center "
        style={{
          backgroundImage:
            "linear-gradient(to top, rgba(28, 28, 42, 0.8), rgba(46, 41, 132, 0.8)), url('/bg_art.png')",
          backgroundBlendMode: "multiply",
        }}
      >
        <Navbar />
        <main className="flex-1 w-full flex items-center justify-center p-4">
          {children}
        </main>
        <Footer />
      </div>
    );
  }
};
