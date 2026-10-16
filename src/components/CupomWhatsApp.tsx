"use client";

import { useState, type FormEvent } from "react";
import { MessageCircle } from "lucide-react";
import { clinica, linkWhatsApp } from "@/lib/clinica";

const motivos = [
  { valor: "uma consulta", rotulo: "Consulta" },
  { valor: "vacinas", rotulo: "Vacinas" },
  { valor: "exames", rotulo: "Exames" },
  { valor: "uma castração", rotulo: "Castração" },
  { valor: "uma limpeza de tártaro", rotulo: "Limpeza de tártaro" },
  { valor: "um retorno", rotulo: "Retorno" },
];

const periodos = [
  { valor: "de manhã", rotulo: "De manhã" },
  { valor: "à tarde", rotulo: "À tarde" },
  { valor: "no começo da noite", rotulo: "Depois das 18h" },
  { valor: "no sábado", rotulo: "No sábado" },
];

function montarMensagem(d: { tutor: string; pet: string; especie: string; motivo: string; periodo: string }) {
  const tutor = d.tutor.trim();
  const pet = d.pet.trim();
  const animais: Record<string, string> = { cao: "cachorro", gato: "gato", outro: "pet" };
  const animal = animais[d.especie] ?? "pet";
  const quem = tutor ? `Sou ${tutor} e queria` : "Queria";
  const paraQuem = pet ? `para ${pet}, meu ${animal},` : `para meu ${animal},`;
  return `Olá, ${clinica.nome}! ${quem} marcar ${d.motivo} ${paraQuem} de preferência ${d.periodo}.`;
}

// O que a pessoa preenche vira, ao vivo, a mensagem que vai para o WhatsApp.
export function CupomWhatsApp() {
  const [dados, setDados] = useState({
    tutor: "",
    pet: "",
    especie: "cao" as string,
    motivo: motivos[0].valor,
    periodo: periodos[0].valor,
  });

  const mensagem = montarMensagem(dados);
  const link = linkWhatsApp(mensagem);

  const mudar = (campo: keyof typeof dados) => (e: { target: { value: string } }) =>
    setDados((d) => ({ ...d, [campo]: e.target.value }));

  const enviar = (e: FormEvent) => {
    e.preventDefault();
    window.open(link, "_blank", "noopener");
  };

  return (
    <form className="formulario" onSubmit={enviar} data-reveal>
      <div className="dupla">
        <div className="campo-grupo">
          <label htmlFor="tutor">Seu nome</label>
          <input id="tutor" className="campo" placeholder="Ex.: Marina" autoComplete="given-name" value={dados.tutor} onChange={mudar("tutor")} />
        </div>
        <div className="campo-grupo">
          <label htmlFor="pet">Nome do pet</label>
          <input id="pet" className="campo" placeholder="Ex.: Floco" value={dados.pet} onChange={mudar("pet")} />
        </div>
      </div>

      <div className="tripla">
        <div className="campo-grupo">
          <label htmlFor="especie">Espécie</label>
          <select id="especie" className="campo" value={dados.especie} onChange={mudar("especie")}>
            <option value="cao">Cão</option>
            <option value="gato">Gato</option>
            <option value="outro">Outro</option>
          </select>
        </div>
        <div className="campo-grupo">
          <label htmlFor="motivo">Motivo</label>
          <select id="motivo" className="campo" value={dados.motivo} onChange={mudar("motivo")}>
            {motivos.map((m) => (
              <option key={m.valor} value={m.valor}>{m.rotulo}</option>
            ))}
          </select>
        </div>
        <div className="campo-grupo">
          <label htmlFor="periodo">Período</label>
          <select id="periodo" className="campo" value={dados.periodo} onChange={mudar("periodo")}>
            {periodos.map((p) => (
              <option key={p.valor} value={p.valor}>{p.rotulo}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="previa" aria-live="polite">
        <span>Sua mensagem</span>
        <p>{mensagem}</p>
      </div>

      <a
        className="botao botao-largo"
        href={link}
        target="_blank"
        rel="noopener noreferrer"
        onClick={(e) => {
          e.preventDefault();
          window.open(link, "_blank", "noopener");
        }}
      >
        <MessageCircle size={20} aria-hidden="true" />
        Enviar pelo WhatsApp
        <span className="sr-only"> (abre em nova aba)</span>
      </a>
    </form>
  );
}
