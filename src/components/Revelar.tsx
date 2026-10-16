"use client";

import { useEffect } from "react";

// Mostra cada [data-reveal] quando entra na tela, em cascata dentro da sua seção,
// e o esconde de novo quando sai, para a animação se repetir sempre que voltar.
// Sem script, a classe "js" não existe e tudo já aparece.
export function Revelar() {
  useEffect(() => {
    const alvos = Array.from(document.querySelectorAll<HTMLElement>("[data-reveal]"));
    const timers = new Map<Element, ReturnType<typeof setTimeout>>();

    // Atraso em cascata por seção, guardado para ser reaplicado a cada entrada.
    const porSecao = new Map<Element, HTMLElement[]>();
    for (const el of alvos) {
      const secao = el.closest("section, footer") ?? document.body;
      const lista = porSecao.get(secao) ?? [];
      lista.push(el);
      porSecao.set(secao, lista);
    }
    for (const lista of porSecao.values()) {
      lista.forEach((el, i) => {
        el.dataset.atraso = `${Math.min(i, 8) * 75}ms`;
      });
    }

    const mostrar = (el: HTMLElement) => {
      el.style.transitionDelay = el.dataset.atraso ?? "";
      el.classList.add("visivel");
      // Depois da entrada, tira o atraso para o hover responder na hora.
      timers.set(
        el,
        setTimeout(() => {
          el.style.transitionDelay = "";
          el.classList.add("revelado");
        }, 1600),
      );
    };

    const esconder = (el: HTMLElement) => {
      clearTimeout(timers.get(el));
      el.style.transitionDelay = "0ms";
      el.classList.remove("visivel", "revelado");
    };

    const observador = new IntersectionObserver(
      (entradas) => {
        for (const entrada of entradas) {
          const el = entrada.target as HTMLElement;
          const naTela = el.classList.contains("visivel");
          if (entrada.isIntersecting && entrada.intersectionRatio >= 0.12 && !naTela) mostrar(el);
          else if (!entrada.isIntersecting && naTela) esconder(el);
        }
      },
      { rootMargin: "0px 0px -8% 0px", threshold: [0, 0.12] },
    );
    alvos.forEach((el) => observador.observe(el));

    // O topo anima com CSS ao carregar; quando ele sai e volta, reinicia essas animações.
    const hero = document.querySelector<HTMLElement>(".hero");
    let heroSaiu = false;
    const observadorHero = new IntersectionObserver((entradas) => {
      for (const entrada of entradas) {
        if (!entrada.isIntersecting) heroSaiu = true;
        else if (heroSaiu) {
          heroSaiu = false;
          hero?.getAnimations({ subtree: true }).forEach((a) => {
            a.cancel();
            a.play();
          });
        }
      }
    });
    if (hero) observadorHero.observe(hero);

    return () => {
      observador.disconnect();
      observadorHero.disconnect();
      timers.forEach(clearTimeout);
    };
  }, []);

  return null;
}
