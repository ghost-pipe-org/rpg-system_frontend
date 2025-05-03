import { Github, Instagram, Mail } from "lucide-react";

export const Footer = () => {
  return (
    <footer className="flex flex-col justify-center items-center mt-8">
      <div
        className="w-screen"
        style={{
          backgroundImage: `url('/footer_background.svg')`, // Caminho relativo à pasta public
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          height: "14rem",
        }}
      >
        <div className="flex flex-row mx-auto w-full justify-center px-5 pb-2 mt-5 pr-4 ml-4 sm:ml-0 sm:pr-0 gap-3">
          {" "}
          {/* Conteúdo do footer 1*/}
          <div className="flex flex-col justify-center gap-1">
            {/* Sobre Nos*/}
            <h2 className=" font-prompt text-base font-medium text-[#11C0B8] drop-shadow-lg">
              Sobre Nós
            </h2>
            <p className="font-prompt text-xs font-light text-white my-1 mb-3 sm:w-2xs w-48">
              Este projeto é um oferecimento da Ghost Pipe! Uma equipe de
              estudantes dedicados a produzir soluções de forma open source para
              nossa instituição. Para saber mais, acesse nossas redes sociais.
            </p>
          </div>
          <div className="flex flex-col max-w-sm gap-1">
            {" "}
            {/* Siga nos*/}
            <h2 className="font-prompt text-base font-medium text-[#11C0B8]">
              Siga-nos
            </h2>
            <a
              href="#"
              className="font-light font-prompt text-white flex items-center gap-2 text-xs hover:text-[#11C0B8] my-0.5"
            >
              <Github /> Github
            </a>
            <a
              href="#"
              className="font-light font-prompt text-white flex items-center gap-2 text-xs hover:text-[#11C0B8] my-0.5"
            >
              <Instagram /> <span className="hidden sm:inline">Instagram</span>
              <span className="sm:hidden">Insta</span>
            </a>
            <a
              href="#"
              className="font-light font-prompt text-white flex items-center gap-2 text-xs hover:text-[#11C0B8] my-0.5"
            >
              <Mail /> <span className="hidden sm:inline">nosso@email.com</span>
              <span className="sm:hidden">Email</span>
            </a>
          </div>
        </div>
      </div>

      <div
        className="flex flex-col sm:flex-row flex-wrap justify-center items-center gap-4 md:gap-8 w-full bg-[#2E1F7A] py-4 relative z-20 border-t-2 border-transparent bg-clip-border"
        style={{
          borderImage: "linear-gradient(to right, #2E1F7A, #5439E0) 1",
        }}
      >
        {" "}
        {/* patrocinadores*/}
        <img src="/logo-uepb.svg" alt="Logo da UEPB" />
        <img src="/logo-cacc.svg" alt="Logo do centro" />
        <img src="/logo-curso.svg" alt="Logo do curso" />
        <img src="/logo.svg" alt="Logo" />
      </div>
    </footer>
  );
};
