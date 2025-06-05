import { useState } from "react";
import { useLocation, Link } from "react-router-dom";

// Separador visual entre os links
const Separator: React.FC = () => <span>•</span>;

// Classe base para links de navegação
const navLinkClass =
  "hover:text-[#11C0BB] text-gray-300 transition-colors duration-200 text-lg font-prompt py-2";

export default function Navbar() {
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);

  // Verifica se está em uma página de autenticação
  const isAuthPage = ["/cadastro", "/login"].includes(location.pathname);

  // Função para redirecionar para a página de login
  return (
    <nav
      className="flex justify-between items-center px-6 py-4 mb-6 bg-black border-b-2 border-transparent bg-clip-border"
      style={{
        borderImage: "linear-gradient(to right, #2E1F7A, #1C1C2A, #11C0B8) 1",
      }}
    >
      {/* Logo */}
      <div className="flex items-center">
        <Link to="/">
          <img src="/logo.svg" alt="Logo" className="h-9" />
        </Link>
      </div>

      {/* Links de navegação central (ocultos em páginas de autenticação) */}
      {!isAuthPage && (
        <div className="hidden md:flex items-center gap-4 text-white font-prompt gap-x-6 absolute left-1/2 transform -translate-x-1/2">
          <Link to="/eventos" className={navLinkClass}>
            eventos
          </Link>
          <Separator />
          <Link to="/" className={navLinkClass}>
            início
          </Link>
          <Separator />
          <Link to="/sessoes" className={navLinkClass}>
            sessões
          </Link>
        </div>
      )}

      {/* Botão do menu mobile */}
      <button
        className="md:hidden"
        aria-label="Abrir menu"
        onClick={() => setMenuOpen((open) => !open)}
      >
        <img src="/menu.svg" alt="Menu Hamburguer" className="h-8" />
      </button>

      {/* Botão de login */}
      {!isAuthPage && (
    <Link
      to="/login"
      className="hidden md:flex items-center justify-center px-4 py-1 bg-transparent border-2 border-[#11D0BB] hover:border-[#5439E0] font-normal rounded-md transition-all duration-300 shadow-md hover:shadow-lg active:scale-95 font-prompt text-white no-underline"
    >
      Entrar
    </Link>
      )}

      {/* Menu mobile */}
      {menuOpen && !isAuthPage && (
        <div className="absolute top-full right-6 mt-2 bg-[#181824] border border-[#5439E0] rounded shadow-lg flex flex-col items-start p-4 z-50 min-w-[160px]">
          <Link
            to="/eventos"
            className={navLinkClass}
            onClick={() => setMenuOpen(false)}
          >
            eventos
          </Link>
          <Link
            to="/"
            className={navLinkClass}
            onClick={() => setMenuOpen(false)}
          >
            início
          </Link>
          <Link
            to="/sessoes"
            className={navLinkClass}
            onClick={() => setMenuOpen(false)}
          >
            sessões
          </Link>
        </div>
      )}
    </nav>
  );
}
