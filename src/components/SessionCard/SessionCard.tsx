import { useState } from "react";
import { DefaultButton, GreenButton, RedButton } from "../Buttons";
import { LabeledInputDark, LabeledTextareaDark } from "../Inputs";

// Interface para a sessão
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

// Props do componente SessionCard
interface SessionCardProps {
  session: Session;
  type?: "admin" | "user";
}

// Função utilitária para gerar slug do nome do sistema
function slugifySystemName(system: string) {
  return system
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/\s+/g, "-");
}

// Componente principal
export const SessionCard = ({ session, type = "user" }: SessionCardProps) => {
  // Estados para controle de expansão, rejeição e edição
  const [expanded, setExpanded] = useState(false);
  const [isRejecting, setIsRejecting] = useState(false);
  const [editedSession, setEditedSession] = useState<Session>(session);
  const [rejectionReason, setRejectionReason] = useState("");

  // URL do ícone do sistema
  const iconUrl = `/${slugifySystemName(session.system)}-logo.svg`;

  // Manipula mudanças nos campos de edição
  const handleInputChange = (
    field: keyof Session,
    value: string | number | Date | null | undefined,
  ) => {
    setEditedSession((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  // Manipula mudança de data (converte string para Date)
  const handleDateChange = (dateString: string) => {
    const date = dateString ? new Date(dateString) : null;
    handleInputChange("date", date);
  };

  // Aprova a sessão (simulação: salva no localStorage)
  const handleApprove = () => {
    const approvedSession = {
      ...editedSession,
      status: "approved",
      approvedAt: new Date().toISOString(),
    };
    const approvedSessions = JSON.parse(
      localStorage.getItem("approvedSessions") || "[]",
    );
    approvedSessions.push(approvedSession);
    localStorage.setItem("approvedSessions", JSON.stringify(approvedSessions));

    console.log("Sessão aprovada:", approvedSession);
    alert("Sessão aprovada com sucesso!");
  };

  // Rejeita a sessão (simulação: salva no localStorage)
  const handleReject = () => {
    if (!isRejecting) {
      setIsRejecting(true);
      return;
    }
    const rejectedSession = {
      ...editedSession,
      status: "rejected",
      rejectionReason,
      rejectedAt: new Date().toISOString(),
    };
    const rejectedSessions = JSON.parse(
      localStorage.getItem("rejectedSessions") || "[]",
    );
    rejectedSessions.push(rejectedSession);
    localStorage.setItem("rejectedSessions", JSON.stringify(rejectedSessions));
    alert("Sessão rejeitada com sucesso!");
    setIsRejecting(false);
  };

  // Renderização para usuário comum
  if (type === "user") {
    return (
      <div className="bg-[#060609] rounded-sm p-4 mb-6 shadow-lg border border-[#5439E0]">
        <div className="flex flex-row items-start gap-2">
          <div className="flex-shrink-0">
            <img
              src={iconUrl}
              alt="Ícone"
              className="w-13 h-13 object-contain"
            />
          </div>
          <div>
            <div className="flex items-center gap-4">
              <div>
                <h2 className="text-2xl font-pixelsans text-[#E2F8F8] font-semibold">
                  {session.title}
                </h2>
                <p className="text-xs font-normal font-prompt text-[#adadad]">
                  {session.system} | {session.date?.toLocaleDateString()}{" "}
                  {session.period === "manha"
                    ? "Manhã"
                    : session.period === "tarde"
                      ? "Tarde"
                      : "Noite"}
                </p>
              </div>
            </div>
            <p className="text-[#E2F8F8] text-xs mt-3 font-prompt">
              {session.description}
            </p>
          </div>
        </div>

        {/* Detalhes extras */}
        {expanded && (
          <div className="mt-6 text-xs text-[#E2F8F8] space-y-1 font-prompt flex flex-col gap-2">
            <div
              className="justify-center items-center relative z-20 border-t-1 border-transparent bg-clip-border w-full pb-1"
              style={{
                borderImage: "linear-gradient(#2E1F7A, #5439E0) 1",
              }}
            ></div>
            <Detail label="Mestre" value={session.master} />
            <Detail label="Sala" value={session.room} />
            <Detail
              label="Data"
              value={session.date?.toLocaleDateString() || "Não definida"}
            />
            <Detail
              label="Período"
              value={
                session.period === "manha"
                  ? "Manhã"
                  : session.period === "tarde"
                    ? "Tarde"
                    : "Noite"
              }
            />
            <Detail label="Vagas disponíveis" value={session.slots} />
            <Detail
              label="Requisitos de participação"
              value={session.requirements}
            />
          </div>
        )}

        {/* Botão de expandir/recolher */}
        <DefaultButton
          name={expanded ? "Inscreva-se" : "Saiba mais +"}
          onClick={() => setExpanded((v) => !v)}
          type="button"
          className="w-full justify-center mt-6 py-3"
        />
      </div>
    );
  }

  // Renderização para admin (edição e aprovação/rejeição)
  if (type === "admin") {
    return (
      <div className="bg-[#060609] rounded-sm p-4 mb-6 shadow-lg border border-[#5439E0]">
        <div className="flex flex-row items-start gap-2">
          <div className="flex-shrink-0">
            <img
              src={iconUrl}
              alt="Ícone"
              className="w-13 h-13 object-contain"
            />
          </div>
          <div>
            <div className="flex items-center gap-4">
              <div>
                <h2 className="text-2xl font-pixelsans text-[#E2F8F8] font-semibold">
                  {editedSession.title}
                </h2>
                <p className="text-xs font-normal font-prompt text-[#adadad]">
                  {session.system} | {session.date?.toLocaleDateString()},{" "}
                  {session.period === "manha"
                    ? "Manhã"
                    : session.period === "tarde"
                      ? "Tarde"
                      : "Noite"}
                </p>
              </div>
            </div>
            <p className="text-[#E2F8F8] text-xs mt-3 font-prompt">
              {editedSession.description}
            </p>
          </div>
        </div>
        <div className="mt-6 text-xs text-[#E2F8F8] space-y-1 font-prompt flex flex-col gap-2">
          <Detail label="Mestre" value={editedSession.master} />
          <Detail label="Requisitos" value={editedSession.requirements} />
          <Detail
            label="Datas possíveis"
            value={editedSession.possibledate
              .map((date) => date.toLocaleDateString())
              .join(", ")}
          />
        </div>

        {/* Área de edição e aprovação/rejeição */}

        {expanded && (
          <div className="mt-6 text-xs text-[#E2F8F8] space-y-3 font-prompt flex flex-col gap-2">
            <div
              className="justify-center items-center relative z-20 border-t-1 border-transparent bg-clip-border w-full pb-1"
              style={{
                borderImage: "linear-gradient(#2E1F7A, #5439E0) 1",
              }}
            ></div>
            <div className="space-y-4">
              <div className="space-y-1">
                {/* Campos editáveis */}
                <div className="mb-4">
                  <label
                    htmlFor="period"
                    className="block text-sm text-white mb-1 font-bold font-prompt"
                  >
                    Período
                  </label>
                  <select
                    id="period"
                    value={editedSession.period}
                    onChange={(e) =>
                      handleInputChange(
                        "period",
                        e.target.value as "manha" | "tarde" | "noite",
                      )
                    }
                    className="w-full bg-[#0f0f15] border border-[#5439E0] rounded px-3 py-2 text-white text-sm focus:outline-none focus:ring-2 focus:ring-[#5439E0]"
                  >
                    <option value="manha">Manhã</option>
                    <option value="tarde">Tarde</option>
                    <option value="noite">Noite</option>
                  </select>
                </div>

                <div className="mb-4">
                  <label
                    htmlFor="date"
                    className="block text-sm text-white mb-1 font-bold font-prompt"
                  >
                    Data
                  </label>
                  <select
                    id="date"
                    value={
                      editedSession.date
                        ? editedSession.date.toISOString().split("T")[0]
                        : ""
                    }
                    onChange={(e) => handleDateChange(e.target.value)}
                    className="w-full bg-[#0f0f15] border border-[#5439E0] rounded px-3 py-2 text-white text-sm focus:outline-none focus:ring-2 focus:ring-[#5439E0]"
                  >
                    <option value="">Selecione uma data</option>
                    {session.possibledate.map((date) => (
                      <option
                        key={date.toISOString()}
                        value={date.toISOString().split("T")[0]}
                      >
                        {date.toLocaleDateString()}
                      </option>
                    ))}
                  </select>
                </div>
                <LabeledInputDark
                  id="room"
                  label="Sala"
                  value={editedSession.room}
                  onChange={(e) => handleInputChange("room", e.target.value)}
                />
                {/* Campo para motivo da rejeição */}
                {isRejecting && (
                  <LabeledTextareaDark
                    id="rejectionReason"
                    label="Motivo da Rejeição"
                    value={rejectionReason}
                    onChange={(e) => setRejectionReason(e.target.value)}
                    rows={3}
                  />
                )}
                {/* Botões de ação */}
                <div className="flex space-x-4">
                  <GreenButton
                    name="Aprovar"
                    onClick={handleApprove}
                    type="button"
                  />
                  <RedButton
                    name={
                      isRejecting ? "Confirmar Rejeição" : "Rejeitar Sessão"
                    }
                    onClick={handleReject}
                    type="button"
                    className="flex-1 justify-center py-2.5"
                  />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Botão de expandir/recolher */}
        <DefaultButton
          name={expanded ? "Fechar Detalhes" : "Ver Detalhes"}
          onClick={() => setExpanded((v) => !v)}
          type="button"
          className="w-full justify-center mt-6 py-3"
        />
      </div>
    );
  }

  // Caso não seja user nem admin
  return null;
};

// Componente auxiliar para exibir detalhes
function Detail({ label, value }: { label: string; value: React.ReactNode }) {
  return (
    <div>
      <span className="font-bold">{label}:</span> {value}
    </div>
  );
}
