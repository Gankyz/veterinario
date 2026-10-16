"use client";

import { useEffect, useState } from "react";
import { horarios } from "@/lib/clinica";

const nomesDias = ["domingo", "segunda", "terça", "quarta", "quinta", "sexta", "sábado"];

function agoraEmSaoPaulo() {
  const partes = new Intl.DateTimeFormat("en-US", {
    timeZone: "America/Sao_Paulo",
    weekday: "short",
    hour: "numeric",
    minute: "numeric",
    hourCycle: "h23",
  }).formatToParts(new Date());
  const valor = (tipo: string) => partes.find((p) => p.type === tipo)?.value ?? "";
  const dia = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].indexOf(valor("weekday"));
  return { dia, hora: Number(valor("hour")) + Number(valor("minute")) / 60 };
}

function horarioDoDia(dia: number) {
  return horarios.find((h) => h.dias.includes(dia));
}

function calcularStatus(): { aberto: boolean; texto: string } {
  const { dia, hora } = agoraEmSaoPaulo();
  const hoje = horarioDoDia(dia);

  if (hoje?.abre != null && hoje.fecha != null && hora >= hoje.abre && hora < hoje.fecha) {
    return { aberto: true, texto: `Aberto agora, fecha às ${hoje.fecha}h` };
  }
  if (hoje?.abre != null && hora < hoje.abre) {
    return { aberto: false, texto: `Fechado agora, abre hoje às ${hoje.abre}h` };
  }
  for (let i = 1; i <= 7; i++) {
    const proximo = (dia + i) % 7;
    const h = horarioDoDia(proximo);
    if (h?.abre != null) {
      const quando = i === 1 ? "amanhã" : nomesDias[proximo];
      return { aberto: false, texto: `Fechado agora, abre ${quando} às ${h.abre}h` };
    }
  }
  return { aberto: false, texto: "Fechado agora" };
}

// Diz se a clínica está aberta neste momento, no horário de São Paulo.
// Antes do script rodar, mostra o horário fixo.
export function AbertoAgora({ className = "" }: { className?: string }) {
  const [status, setStatus] = useState<{ aberto: boolean; texto: string } | null>(null);

  useEffect(() => {
    const atualizar = () => setStatus(calcularStatus());
    atualizar();
    const id = setInterval(atualizar, 60_000);
    return () => clearInterval(id);
  }, []);

  return (
    <p className={`status ${className}`} data-aberto={status?.aberto ? "sim" : "nao"} aria-live="polite">
      <span className="status-ponto" aria-hidden="true" />
      {status ? status.texto : "Seg a sex, 8h às 20h · sáb, 9h às 14h"}
    </p>
  );
}
