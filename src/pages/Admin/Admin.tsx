import { useEffect, useState } from "react";
import { LayoutComponents } from "../../components/Layouts";
import { Title } from "../../components/Title";
import { SessionCard } from "../../components/SessionCard";

interface Session {
  id: string;
  title: string;
  system: string;
  period: "manha" | "tarde" | "noite";
  possibledate: Date[]; 
  date: null | Date;
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
    period: "noite",
    possibledate: [
      new Date("2023-11-15"),
      new Date("2023-11-22"),
      new Date("2023-11-29"),
    ],
    date: null,
    description:
      "Aventura épica em mundos desconhecidos. Os jogadores serão transportados para terras misteriosas onde precisarão desvendar enigmas antigos, enfrentar criaturas lendárias e tomar decisões que podem mudar o destino de todo o reino.",
    master: "Ana Mestre",
    room: "A01",
    slots: 3,
    requirements: "Trazer ficha pronta.",
    iconUrl: "/dnd-icon.png",
  }
];

export const Admin = () => {
  const [sessions, setSessions] = useState<Session[]>([]);
  const [loading, setLoading] = useState(true);
    
  useEffect(() => {
    setTimeout(() => {
      setSessions(mockAvailableSessions);
      setLoading(false);
    }, 800);
  }, []);

  return (
    <LayoutComponents withNavbar={false}>
      <div className="w-85">
        <div>
          <Title name="Sessões para Verificação" />
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
            <SessionCard key={session.id} session={session} type="admin"/>
          ))}
        </div>
      </div>
    </LayoutComponents>
  );
};
