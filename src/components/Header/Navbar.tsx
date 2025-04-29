import { useLocation } from "react-router-dom";

export const Navbar = () => {
  const location = useLocation();

  const isAuthPage =
    location.pathname === "/cadastro" || location.pathname === "/login";

  return (
    <nav
      className={`flex justify-between items-center px-6 py-4 mb-8 ${
        isAuthPage ? "bg-black" : "bg-indigo-800"
      } border-b-1 border-transparent bg-clip-border`}
      style={{
        borderImage: "linear-gradient(to right, #2E1F7A, #1C1C2A, #11C0B8) 1",
      }}
    >
      <div className="flex items-center">
        <img src="/logo.svg" alt="Logo" className="h-8" />
      </div>
      {isAuthPage ? (
        <div className="text-white text-lg font-prompt">
          <img src="./menu.svg" alt="Menu Hamburguer" />
        </div>
      ) : (
        <button className="text-white font-prompt">Menu</button>
      )}
    </nav>
  );
};
