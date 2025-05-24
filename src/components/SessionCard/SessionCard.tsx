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

export const SessionCard = ({ session }: SessionCardProps) => {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="bg-[#19192A] rounded-xl p-4 mb-6 shadow-lg border border-[#5439E0]">
      <div className="flex items-center gap-4">
        <img
          src={session.iconUrl || "/logo.svg"}
          alt="Ícone"
          className="w-10 h-10"
        />
        <div>
          <h2 className="text-lg font-prompt text-white font-semibold">{session.title}</h2>
          <p className="text-xs text-[#adadad]">
            {session.system} | {session.period}
          </p>
        </div>
      </div>
      <p className="text-white text-sm mt-3">{session.description}</p>
      {expanded && (
        <div className="mt-4 text-sm text-white space-y-1">
          <div>
            <span className="font-bold">Mestre:</span> {session.master}
          </div>
          <div>
            <span className="font-bold">Sala:</span> {session.room}
          </div>
          <div>
            <span className="font-bold">Vagas disponíveis:</span> {session.slots}
          </div>
          <div>
            <span className="font-bold">Requisitos de participação:</span>
            <div>{session.requirements}</div>
          </div>
        </div>
      )}
      <button
        className={`w-full mt-4 py-2 rounded-md font-prompt text-white bg-cyan-400 hover:bg-cyan-600 transition-all`}
        onClick={() => setExpanded((v) => !v)}
      >
        {expanded ? "Inscreva-se" : "Saiba mais +"}
      </button>
    </div>
  );
};