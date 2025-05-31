import { useLocation } from "react-router-dom";

export const Navbar = () => {
  const location = useLocation();

  const isAuthPage =
    location.pathname === "/cadastro" || location.pathname === "/login";
    const linkClass = (path: string) =>
    `hover:text-[#11C0B8] hover:font-bold font-light ${
      location.pathname === path ? "text-[#11C0B8] font-bold" : ""
    }`;

  return (
    <nav
      className="flex justify-between items-center px-6 py-4 mb-6 bg-black border-b-2 border-transparent bg-clip-border"
      style={{
        borderImage: "linear-gradient(to right, #2E1F7A, #1C1C2A, #11C0B8) 1",
      }}
    >
      <div className="flex items-center">
        <img src="/logo.svg" alt="Logo" className="h-8" />
      </div>
      {isAuthPage ? (
        <div></div>
      ) : (
        <div className="flex items-center justify-center text-white font-prompt gap-x-6">
          <a
            href="/"
            className={linkClass("/")}
          >
            início
          </a>
          <p className="font-extrabold">•</p>
          <a
            href="/sessoes"
            className={linkClass("/sessoes")}
          >
            sessões
          </a>
          <p className="font-extrabold">•</p>
          <a
            href="/eventos"
            className={linkClass("/eventos")}
          >
            eventos
          </a>
        </div>
      )}
      <button>
        <img src="./menu.svg" alt="Menu Hamburguer" className="h-8"/>
      </button>
    </nav>
  );
};