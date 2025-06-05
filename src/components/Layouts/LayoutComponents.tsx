import "../../global.css";
import { ReactNode } from "react";
import { Footer } from "../Footer";
import { Navbar } from "../Header";


interface LayoutComponentsProps {
  children: ReactNode;
  withNavbar?: boolean;
}

export default function LayoutComponents({ children, withNavbar }: LayoutComponentsProps) {
  return (
    <div
      className="flex flex-col w-full min-h-screen bg-[url('/bg_art.png')]  bg-fixed bg-cover bg-center"
      style={{
        backgroundImage:
          "linear-gradient(to top, rgba(28, 28, 42, 0.8), rgba(46, 41, 132, 0.8)), url('/bg_art.png')",
        backgroundBlendMode: "multiply",
      }}
    >
      {withNavbar ? <Navbar /> : <span className="h-16"></span>}
      <main className="flex-1 w-full flex items-center justify-center p-4">
        {children}
      </main>
      <Footer />
    </div>
  );
}