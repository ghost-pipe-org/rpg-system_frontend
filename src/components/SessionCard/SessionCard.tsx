import { useState } from "react";

interface Session {
  id: string;
  title: string;
  system: string;
  period: string;
  description: string;
  master: string;
  room: string;
  slots: number;
  requirements: string;
  iconUrl?: string;
}

interface SessionCardProps {
  session: Session;
}

function slugifySystemName(system: string) {
  return system
    .normalize("NFD") // Remove acentos
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/\s+/g, "-"); // Espaços por hífen
}

export const SessionCard = ({ session }: SessionCardProps) => {
  const [expanded, setExpanded] = useState(false);

  const iconUrl = `/${slugifySystemName(session.system)}-logo.svg`;
  console.log("Icon URL:", iconUrl);

  return (
    <div className="bg-[#060609] rounded-sm p-4 mb-6 shadow-lg border border-[#5439E0]">
      <div className="flex flex-row items-start gap-2">
        <div className="flex-shrink-0">
          <img src={iconUrl} alt="Ícone" className="w-13 h-13 object-contain" />
        </div>
        <div>
          <div className="flex items-center gap-4">
            <div>
              <h2 className="text-2xl font-pixelsans text-[#E2F8F8] font-semibold">
                {session.title}
              </h2>
              <p className="text-xs font-normal font-prompt text-[#adadad]">
                {session.system} | {session.period}
              </p>
            </div>
          </div>
          <p className="text-[#E2F8F8] text-xs mt-3 font-prompt">
            {session.description}
          </p>
        </div>
      </div>

      {expanded && (
        <div className="mt-6 text-xs text-[#E2F8F8] space-y-1 font-prompt flex flex-col gap-2">
          <div
            className="justify-center items-center relative z-20 border-t-1 border-transparent bg-clip-border w-full pb-1"
            style={{
              borderImage: "linear-gradient(#2E1F7A, #5439E0) 1",
            }}
          ></div>
          <div>
            <span className="font-bold">Mestre:</span> {session.master}
          </div>
          <div>
            <span className="font-bold">Sala:</span> {session.room}
          </div>
          <div>
            <span className="font-bold">Vagas disponíveis:</span>{" "}
            {session.slots}
          </div>
          <div>
            <span className="font-bold">Requisitos de participação:</span>
            <div>{session.requirements}</div>
          </div>
        </div>
      )}
      <button
        className={`w-full mt-6 py-2 rounded-md font-prompt text-white bg-cyan-400 hover:bg-cyan-600 transition-all`}
        onClick={() => setExpanded((v) => !v)}
      >
        {expanded ? "Inscreva-se" : "Saiba mais +"}
      </button>
    </div>
  );
};
