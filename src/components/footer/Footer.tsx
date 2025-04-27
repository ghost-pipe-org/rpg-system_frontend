import { Github, Instagram, Mail } from 'lucide-react';

export const Footer = () => {
    return (
        <footer
            className="flex flex-col justify-center items-center  mt-8 gap-2"
            style={{
                backgroundImage: `url('/footer_background.svg')`, // Caminho relativo à pasta public
                backgroundRepeat: 'no-repeat',
                backgroundSize: 'cover',
                height: '16rem',
            }}
        >
            <div className="flex justify-between pl-21 pr-5 gap-3 pb-2 mt-5 border-b-1 border-b-indigo-700"> {/* Conteúdo do footer 1*/}
                <div className="flex flex-col max-w-sm">{/* Sobre Nos*/}
                    <h2 className=" font-prompt text-base font-medium text-[#11C0B8] drop-shadow-lg" >Sobre Nos</h2>
                    <p className="font-prompt text-xs font-light text-white my-1 mb-3">Este projeto é um oferecimento da Ghost Pipe Org. 
                    Uma equipe de estudantes dedicados a produzir soluções de forma open source para nossa instituição.</p>
                </div>
                <div className="flex flex-col max-w-sm"> {/* Siga nos*/}
                    <h2 className="font-prompt text-base font-medium text-[#11C0B8]">Siga-nos</h2>
                    <a href="#" className="font-light font-prompt text-white flex items-center gap-2 text-xs hover:text-[#11C0B8] my-0.5">
                        <Github /> Github
                    </a>
                    <a href="#" className="font-light font-prompt text-white flex items-center gap-2 text-xs hover:text-[#11C0B8] my-0.5">
                        <Instagram /> Instagram
                    </a>
                    <a href="#" className="font-light font-prompt text-white flex items-center gap-2 text-xs hover:text-[#11C0B8] my-0.5">
                        <Mail /> nosso@email.com
                    </a>
                </div>
            </div>
            <div className='flex flex-row justify-evenly gap-4 mb-5'> {/* patrocinadores*/}
                <img src="/logo-uepb.svg" alt="Logo da UEPB" />
                <img src="/logo-cacc.svg" alt="Logo do centro" />
                <img src="/logo-curso.svg" alt="Logo do curso" />
                <img src="/logo.svg" alt="Logo" />

            </div>
        </footer>
    )
}