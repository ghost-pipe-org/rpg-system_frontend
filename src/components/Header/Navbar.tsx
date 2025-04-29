import { useLocation } from "react-router-dom";

export const Navbar = () => {
  const location = useLocation();

  const isAuthPage =
    location.pathname === "/cadastro" || location.pathname === "/login";

  return (
    <nav
      className={`flex justify-between items-center px-6 py-4 mb-8 ${
        isAuthPage ? "bg-black" : "bg-black"
      } border-b-2 border-transparent bg-clip-border`}
      style={{
        borderImage: isAuthPage
          ? undefined
          : "linear-gradient(to right, #2E1F7A, #1C1C2A, #11C0B8) 1",
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
        <div className="flex space-x-4 items-center justify-center text-white font-prompt">
          <a href="/" className="hover:text-[#11C0B8] hover:font-bold font-light">
            início
          </a>
          <p className="font-extrabold">•</p>
          <a href="/sessoes" className="hover:text-[#11C0B8] hover:font-bold font-light">
            sessões
          </a>
          <p className="font-extrabold">•</p>
          <a href="/eventos" className="hover:text-[#11C0B8] hover:font-bold font-light">
            eventos
          </a>
        </div>
      )}
          <button>
            <img src="./menu.svg" alt="Menu Hamburguer" />
          </button>
    </nav>
  );
};