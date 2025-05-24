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

const mockSessions: Session[] = [
  {
    id: "1",
    title: "Guardiões do Hiato",
    system: "D&D",
    period: "Noite",
    description: "Aventura épica em mundos desconhecidos.",
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
    description: "Mistérios e investigações sobrenaturais.",
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
      setSessions(mockSessions);
      setLoading(false);
    }, 800);
  }, []);

  return (
    <LayoutComponents>
      <div className="w-full max-w-lg mx-auto">
        <h1 className="text-2xl font-prompt text-[#B8B8FF] mb-6 text-center">Sessões Disponíveis</h1>
        {loading && <p className="text-white text-center">Carregando...</p>}
        {!loading && sessions.length === 0 && (
          <p className="text-white text-center">Nenhuma sessão disponível.</p>
        )}
        {sessions.map((session) => (
          <SessionCard key={session.id} session={session} />
        ))}
      </div>
    </LayoutComponents>
  );
};