import { useEffect, useState } from "react";
import { LayoutComponents } from "../../components/LayoutComponents/LayoutComponents";
import { SessionCard } from "../../components/SessionCard/SessionCard";

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

const mockAvailableSessions: Session[] = [
  {
    id: "1",
    title: "Guardiões do Hiato",
    system: "D&D",
    period: "Noite",
    description:
      "Aventura épica em mundos desconhecidos. Os jogadores serão transportados para terras misteriosas onde precisarão desvendar enigmas antigos, enfrentar criaturas lendárias e tomar decisões que podem mudar o destino de todo o reino.",
    master: "Ana Mestre",
    room: "A01",
    slots: 3,
    requirements: "Trazer ficha pronta.",
    iconUrl: "/dnd-icon.png",
  },
  {
    id: "2",
    title: "Combos Paranormais",
    system: "Ordem Paranormal",
    period: "Tarde",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod  tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim  veniam, quis nostrud exercitation ullamco laboris nisi ut ",
    master: "Carlos GM",
    room: "B02",
    slots: 0,
    requirements: "Nenhum.",
    iconUrl: "/op-icon.png",
  },
  // ...adicione mais sessões mock se quiser
];

export const Sessions = () => {
  const [sessions, setSessions] = useState<Session[]>([]);
  const [loading, setLoading] = useState(true);
    
  useEffect(() => {
    // Simula carregamento
    setTimeout(() => {
      setSessions(mockAvailableSessions);
      setLoading(false);
    }, 800);
  }, []);

  return (
    <LayoutComponents>
      <div className="w-85">
        <div>
          <h1 className="text-3xl font-normal font-pixelsans text-[#E2F8F8] mb-5  text-center">
            Sessões Disponíveis
          </h1>
        </div>
        <div className="w-full max-w-lg mx-auto">
          {loading && (
            <p className="text-white text-center font-pixelsans">
              Carregando...
            </p>
          )}
          {!loading && sessions.length === 0 && (
            <p className="text-white text-center font-pixelsans">Nenhuma sessão disponível.</p>
          )}
          {sessions.map((session) => (
            <SessionCard key={session.id} session={session} />
          ))}
        </div>
      </div>
    </LayoutComponents>
  );
};
