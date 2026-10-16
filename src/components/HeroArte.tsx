"use client";

import { useEffect, useRef, type ReactNode } from "react";

// Segura as animações do topo (coração, foto, patinha, cartão) até a foto da equipe carregar,
// para tudo entrar junto. Se a foto demorar demais, solta assim mesmo.
export function HeroArte({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const soltar = () => el.classList.add("pronta");
    const foto = el.querySelector<HTMLImageElement>(".hero-recorte");
    if (!foto || foto.complete) {
      soltar();
      return;
    }
    foto.addEventListener("load", soltar, { once: true });
    foto.addEventListener("error", soltar, { once: true });
    const limite = setTimeout(soltar, 2500);
    return () => {
      foto.removeEventListener("load", soltar);
      foto.removeEventListener("error", soltar);
      clearTimeout(limite);
    };
  }, []);

  return (
    <div ref={ref} className="hero-arte">
      {children}
    </div>
  );
}
