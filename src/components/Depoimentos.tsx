"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";
import { depoimentos } from "@/lib/clinica";

function iniciais(nome: string) {
  return nome
    .split(" ")
    .map((p) => p[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

// Carrossel de depoimentos: setas, bolinhas, troca sozinho a cada 5s e pausa com o mouse em cima.
export function Depoimentos() {
  const [atual, setAtual] = useState(0);
  const [pausado, setPausado] = useState(false);
  const total = depoimentos.length;
  const regiao = useRef<HTMLDivElement>(null);

  const ir = useCallback((i: number) => setAtual((i + total) % total), [total]);

  useEffect(() => {
    if (pausado || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = setInterval(() => setAtual((a) => (a + 1) % total), 5000);
    return () => clearInterval(id);
  }, [pausado, total]);

  return (
    <div
      className="carrossel"
      ref={regiao}
      onMouseEnter={() => setPausado(true)}
      onMouseLeave={() => setPausado(false)}
      onFocus={() => setPausado(true)}
      onBlur={() => setPausado(false)}
      role="region"
      aria-roledescription="carrossel"
      aria-label="Depoimentos de tutores"
    >
      <button className="seta seta-esq" onClick={() => ir(atual - 1)} aria-label="Depoimento anterior">
        <ChevronLeft size={22} aria-hidden="true" />
      </button>

      <div className="carrossel-janela">
        {depoimentos.map((d, i) => (
          <figure
            key={d.nome}
            className="depoimento"
            data-ativo={i === atual}
            aria-hidden={i !== atual}
            aria-roledescription="slide"
            aria-label={`${i + 1} de ${total}`}
          >
            <div className="depoimento-topo">
              {d.foto ? (
                <span className="avatar avatar-foto">
                  <Image src={d.foto} alt={d.fotoAlt} fill sizes="64px" />
                </span>
              ) : (
                <span className="avatar" aria-hidden="true">{iniciais(d.nome)}</span>
              )}
              <div>
                <figcaption>
                  <strong>{d.nome}</strong>
                  <span>{d.pet}</span>
                </figcaption>
                <div className="estrelas" aria-label="5 de 5 estrelas">
                  {Array.from({ length: 5 }).map((_, k) => (
                    <Star key={k} size={16} fill="currentColor" strokeWidth={0} aria-hidden="true" />
                  ))}
                </div>
              </div>
            </div>
            <blockquote>“{d.texto}”</blockquote>
          </figure>
        ))}
      </div>

      <button className="seta seta-dir" onClick={() => ir(atual + 1)} aria-label="Próximo depoimento">
        <ChevronRight size={22} aria-hidden="true" />
      </button>

      <div className="pontos-carrossel">
        {depoimentos.map((d, i) => (
          <button
            key={d.nome}
            className="ponto-carrossel"
            aria-label={`Ver depoimento ${i + 1}`}
            aria-current={i === atual}
            onClick={() => ir(i)}
          />
        ))}
      </div>
    </div>
  );
}
