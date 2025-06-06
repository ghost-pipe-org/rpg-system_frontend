import { useEffect, useState } from "react";
import { LayoutComponents } from "../../components/Layouts";
import { Title } from "../../components/Title";
import { SessionCard } from "../../components/SessionCard";
import { Link } from "react-router-dom";
import { api } from "../../services/api";

interface Session {
  id: string;
  title: string;
  system: string;
  period: "manha" | "tarde" | "noite";
  date?: Date | null;
  possibledate: Date[];
  description: string;
  master: string;
  room: string;
  slots: number;
  requirements: string;
  iconUrl?: string;
  status?: string;
}

const mockAvailableSessions: Session[] = [
{
    id: "1",
    title: "Guardiões do Hiato",
    system: "D&D",
    period: "noite",
    possibledate: [new Date("2024-07-01T19:00:00")],
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
    period: "tarde",
    possibledate: [new Date("2024-07-02T14:00:00")],
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod  tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim  veniam, quis nostrud exercitation ullamco laboris nisi ut ",
    master: "Carlos GM",
    room: "B02",
    slots: 0,
    requirements: "Nenhum.",
    iconUrl: "/op-icon.png",
  },
];

export const Sessions = () => {
  const [sessions, setSessions] = useState<Session[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simular carregamento
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
            <p className="text-white text-center font-prompt">
              Carregando...
            </p>
          )}
          {!loading && sessions.length === 0 && (
            <p className="text-white text-center font-prompt">
              Não há sessões disponíveis no momento.{" "}
            </p>
          )}

          {!loading &&
            sessions.map((session) => (
              <SessionCard key={session.id} session={session} /> // Corrigir key prop
            ))
          }
          {!loading && (
            <div className="text-center mt-4">
              <Link
                to="/sessoes/criar"
                className="text-indigo-400 hover:underline hover:text-cyan-500"
              >
                Criar sessão
              </Link>
            </div>
          )}
        </div>
      </div>
    </LayoutComponents>
  );
};
