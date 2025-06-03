import { useState } from "react";
import { Button, GreenButton, RedButton } from "../Button/Button";
import {
  LabeledInputDark,
  LabeledTextareaDark,
} from "../LabeledInput/LabeledInput";

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

interface SessionCardProps {
  session: Session;
  type?: "admin" | "user";
}

function slugifySystemName(system: string) {
  return system
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/\s+/g, "-");
}

export const SessionCard = ({ session, type = "user" }: SessionCardProps) => {
  const [expanded, setExpanded] = useState(false);
  const [isRejecting, setIsRejecting] = useState(false);
  
  // Estados para edição
  
  const [editedSession, setEditedSession] = useState<Session>(session);
  const [rejectionReason, setRejectionReason] = useState("");
  
  const iconUrl = `/${slugifySystemName(session.system)}-logo.svg`;

  const handleInputChange = (
    field: keyof Session,
    value: string | number | Date | null | undefined
  ) => {
    setEditedSession(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleDateChange = (dateString: string) => {
    const date = dateString ? new Date(dateString) : null;
    handleInputChange('date', date);
  };

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

  const handleReject = () => {
    if (!isRejecting) {
      setIsRejecting(true);
      return;
    }

    // Lógica para rejeição com motivo

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
    
    console.log("Sessão rejeitada:", rejectedSession);
    alert("Sessão rejeitada com sucesso!");
    setIsRejecting(false);
  };

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
                  {session.system} | {session.date?.toLocaleDateString()}, {session.period === "manha"
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
              <span className="font-bold">Data:</span>{" "}
              {session.date?.toLocaleDateString() || "Não definida"}
            </div>
            <div>
              <span className="font-bold">Período:</span>{" "}
              {session.period === "manha"
                ? "Manhã"
                : session.period === "tarde"
                ? "Tarde"
                : "Noite"}
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
        <Button
          name={expanded ? "Inscreva-se" : "Saiba mais +"}
          onClick={() => setExpanded((v) => !v)}
          type="button"
          className="w-full justify-center mt-6 py-3"
        />
      </div>
    );
  }

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
                  {session.system} | {session.date?.toLocaleDateString()}, {session.period === "manha"
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
          <div>
            <span className="font-bold">Mestre:</span> {editedSession.master}
          </div>
          <div>
            <span className="font-bold">Requisitos:</span>
            <div>{editedSession.requirements}</div>
          </div>
          <div>
            <span className="font-bold">Datas possíveis:</span>
            <div>
              {editedSession.possibledate
                .map((date) => date.toLocaleDateString())
                .join(", ")}
            </div>
          </div>
        </div>

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
                <LabeledInputDark
                  id="period"
                  label="Período"
                  value={editedSession.period}
                  options={[
                    { value: "manha", label: "Manhã" },
                    { value: "tarde", label: "Tarde" },
                    { value: "noite", label: "Noite" },
                  ]}
                  onChange={(e) => handleInputChange('period', e.target.value as "manha" | "tarde" | "noite")}
                />
                <LabeledInputDark
                  id="date"
                  label="Data"
                  type="select"
                  options={session.possibledate.map((date) => ({
                    value: date.toISOString().split('T')[0],
                    label: date.toLocaleDateString(),
                  }))}
                  value={editedSession.date ? editedSession.date.toISOString().split('T')[0] : ''}
                  onChange={(e) => handleDateChange(e.target.value)}
                />
                <LabeledInputDark
                  id="room"
                  label="Sala"
                  value={editedSession.room}
                  onChange={(e) => handleInputChange('room', e.target.value)}
                />
                {isRejecting && (
                  <LabeledTextareaDark
                    id="rejectionReason"
                    label="Motivo da Rejeição"
                    value={rejectionReason}
                    onChange={(e) => setRejectionReason(e.target.value)}
                    rows={3}
                  />
                )}
                <div className="flex space-x-4">
                  <GreenButton
                    name="Aprovar"
                    onClick={handleApprove}
                    type="button"
                  />
                  <RedButton
                    name={isRejecting ? "Confirmar Rejeição" : "Rejeitar Sessão"}
                    onClick={handleReject}
                    type="button"
                    className="flex-1 justify-centerpy-2.5"
                  />
                </div>
              </div>
            </div>
          </div>
        )}

        <Button
          name={expanded ? "Fechar Detalhes" : "Ver Detalhes"}
          onClick={() => setExpanded((v) => !v)}
          type="button"
          className="w-full justify-center mt-6 py-3"
        />
      </div>
    );
  }
  
  return null;
};