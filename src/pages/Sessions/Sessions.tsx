import { useEffect, useState } from "react";
import { LayoutComponents } from "../../components/Layouts";
import { Title } from "../../components/Title";
import { SessionCard } from "../../components/SessionCard/SessionCard";

interface Session {
  id: string;
  title: string;
  system: string;
  period: "manha" | "tarde" | "noite";
  date?: Date | null;
  possibledate?: Date[];
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
    title: "Sessão de Teste",
    system: "Sistema de Exemplo",
    period: "manha",
    date: null,
    possibledate: [new Date("2023-10-01"), new Date("2023-10-02")],
    description: "Descrição da sessão de teste.",
    master: "Mestre Exemplo",
    room: "Sala 101",
    slots: 5,
    requirements: "Requisitos da sessão de teste.",
    iconUrl: "/example-icon.svg",
  },
];

export const Sessions = () => {
  const [sessions, setSessions] = useState<Session[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simula carregamento
    const timer = setTimeout(() => {
      setSessions(mockAvailableSessions);
      setLoading(false);
    }, 800);
    return () => clearTimeout(timer);
  }, []);

  return (
    <LayoutComponents withNavbar>
      <div className="w-85">
        <Title name="Sessões Disponíveis" />
        <div className="w-full max-w-lg mx-auto">
          {loading && (
            <p className="text-white text-center font-pixelsans">
              Carregando...
            </p>
          )}

          {!loading && sessions.length === 0 && (
            <p className="text-white text-center font-pixelsans">
              Nenhuma sessão disponível.
            </p>
          )}

          {!loading &&
            sessions.map((session) => (
              <SessionCard key={session.id} session={session} />
            ))}
        </div>
      </div>
    </LayoutComponents>
  );
};
