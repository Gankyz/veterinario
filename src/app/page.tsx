import Image from "next/image";
import { ArrowRight, Clock, Heart, MapPin, MessageCircle, PawPrint, Phone, Stethoscope } from "lucide-react";
import { AbertoAgora } from "@/components/AbertoAgora";
import { CupomWhatsApp } from "@/components/CupomWhatsApp";
import { Depoimentos } from "@/components/Depoimentos";
import { Icone } from "@/components/Icone";
import { Revelar } from "@/components/Revelar";
import {
  clinica,
  equipe,
  hero,
  horarios,
  linkMapa,
  linkWhatsApp,
  mapaEmbed,
  servicos,
  sobre,
} from "@/lib/clinica";

// Foto de domínio público (CC0), não exige crédito.
import fotoAgendar from "../../public/fotos/cao-grama-cc0.jpg";


const mensagemPadrao = `Olá, ${clinica.nome}! Queria marcar uma consulta.`;

function iniciais(nome: string) {
  return nome
    .replace(/^(Dra?\.)\s+/, "")
    .split(" ")
    .map((p) => p[0])
    .join("")
    .slice(0, 2);
}

const NovaAba = () => <span className="sr-only"> (abre em nova aba)</span>;

export default function Home() {
  return (
    <>
      <Revelar />

      {/* ---------------- Cabeçalho ---------------- */}
      <header className="cabecalho">
        <div className="container cabecalho-linha">
          <a className="logo" href="#topo" aria-label={`${clinica.nome}, ${clinica.descricao}, início`}>
            <span className="logo-marca">
              <PawPrint size={20} aria-hidden="true" />
            </span>
            <span className="logo-nome">{clinica.nome}</span>
            <span className="logo-desc">{clinica.descricao}</span>
          </a>
          <nav className="menu" aria-label="Principal">
            <a href="#servicos">Serviços</a>
            <a href="#equipe">Equipe</a>
            <a href="#sobre">Sobre</a>
            <a href="#contato">Contato</a>
            <a className="botao" href="#agendar">
              Agendar
            </a>
          </nav>
        </div>
      </header>

      <main>
        {/* ---------------- Hero ---------------- */}
        <section className="hero" id="topo" aria-labelledby="titulo">
          <div className="container hero-grade">
            <div className="hero-texto">
              <h1 id="titulo">{hero.titulo}</h1>
              <p className="hero-sub">{hero.subtitulo}</p>
              <div className="hero-acoes">
                <a className="botao" href={linkWhatsApp(mensagemPadrao)} target="_blank" rel="noopener noreferrer">
                  <MessageCircle size={20} aria-hidden="true" />
                  Agendar pelo WhatsApp
                  <NovaAba />
                </a>
                <a className="botao botao-contorno" href="#servicos">
                  Nossos serviços
                  <ArrowRight className="seta-icone" size={18} aria-hidden="true" />
                </a>
              </div>
              <AbertoAgora className="hero-status" />
            </div>
            <div className="hero-arte">
              <div className="hero-circulo" aria-hidden="true" />
              <div className="hero-pata" aria-hidden="true">
                <svg viewBox="0 0 100 100" fill="currentColor">
                  <ellipse cx="22" cy="40" rx="10" ry="13" transform="rotate(-22 22 40)" />
                  <ellipse cx="40" cy="22" rx="10.5" ry="14" transform="rotate(-6 40 22)" />
                  <ellipse cx="62" cy="22" rx="10.5" ry="14" transform="rotate(6 62 22)" />
                  <ellipse cx="80" cy="40" rx="10" ry="13" transform="rotate(22 80 40)" />
                  <path d="M51 48c-11 0-26 15-28 28-1.7 10.6 7 16 15 13.6 4.5-1.4 8.2-3.3 13-3.3s8.5 1.9 13 3.3c8 2.4 16.7-3 15-13.6C77 63 62 48 51 48Z" />
                </svg>
              </div>
              <Image
                className="hero-recorte"
                src={hero.foto}
                alt={hero.fotoAlt}
                width={hero.fotoLargura}
                height={hero.fotoAltura}
                priority
                sizes="(max-width: 1000px) 100vw, 55vw"
              />
              <div className="hero-cartao">
                <span className="icone-circulo">
                  <Stethoscope size={22} aria-hidden="true" />
                </span>
                <div>
                  <strong>Consulta sem pressa</strong>
                  <span>40 minutos com o veterinário</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ---------------- Serviços ---------------- */}
        <section className="secao" id="servicos" aria-labelledby="titulo-servicos">
          <div className="container duas-colunas">
            <div className="intro">
              <h2 id="titulo-servicos" data-reveal>
                Nossos serviços
              </h2>
              <p data-reveal>
                Tudo o que o seu cão ou gato precisa, do primeiro filhote ao check-up do idoso, feito aqui mesmo na
                clínica.
              </p>
              <a className="botao botao-contorno" href="#agendar" data-reveal>
                Agendar consulta
                <ArrowRight className="seta-icone" size={18} aria-hidden="true" />
              </a>
            </div>
            <ul className="servicos-grade">
              {servicos.map((s) => (
                <li className="servico" key={s.titulo} data-reveal>
                  <span className="icone-circulo">
                    <Icone nome={s.icone} size={28} />
                  </span>
                  <h3>{s.titulo}</h3>
                  <p>{s.texto}</p>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* ---------------- Equipe ---------------- */}
        <section className="secao secao-suave" id="equipe" aria-labelledby="titulo-equipe">
          <div className="container duas-colunas">
            <div className="intro">
              <h2 id="titulo-equipe" data-reveal>
                Profissionais perto de você
              </h2>
              <p data-reveal>
                Veterinários experientes que conhecem cada paciente pelo nome e cuidam dele como se fosse da família.
              </p>
              <a className="botao botao-contorno" href={linkWhatsApp(mensagemPadrao)} target="_blank" rel="noopener noreferrer" data-reveal>
                Fale com a equipe
                <ArrowRight className="seta-icone" size={18} aria-hidden="true" />
                <NovaAba />
              </a>
            </div>
            <ul className="equipe-grade">
              {equipe.map((m, i) => (
                <li className="membro" key={i} data-reveal>
                  <div className="membro-foto">
                    {m.foto ? (
                      <Image src={m.foto} alt={`Foto de exemplo: ${m.cargo}`} fill sizes="(max-width: 640px) 96px, 280px" style={{ objectPosition: m.foco }} />
                    ) : (
                      <span aria-hidden="true">{iniciais(m.nome)}</span>
                    )}
                  </div>
                  <div className="membro-info">
                    <h3>{m.nome}</h3>
                    <p>
                      {m.cargo}
                      <br />
                      {m.registro}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* ---------------- Sobre + depoimentos ---------------- */}
        <section className="secao" id="sobre" aria-labelledby="titulo-sobre">
          <div className="container sobre-grade">
            <div className="intro">
              <h2 id="titulo-sobre" data-reveal>
                {sobre.titulo}
              </h2>
              <p data-reveal>{sobre.texto}</p>
              <ul className="diferenciais">
                {sobre.diferenciais.map((d) => (
                  <li key={d.titulo} data-reveal>
                    <span className="icone-circulo">
                      <Icone nome={d.icone} size={22} />
                    </span>
                    {d.titulo}
                  </li>
                ))}
              </ul>
            </div>
            <div data-reveal>
              <h2 className="depo-titulo">O que dizem os tutores</h2>
              <Depoimentos />
            </div>
          </div>
        </section>

        {/* ---------------- Agendar ---------------- */}
        <section className="secao secao-suave" id="agendar" aria-labelledby="titulo-agendar">
          <div className="container agendar-grade">
            <div className="intro">
              <h2 id="titulo-agendar" data-reveal>
                Agende pelo WhatsApp
              </h2>
              <p data-reveal>
                Preencha o formulário e a mensagem já vai pronta. A equipe responde em horário comercial e confirma o
                melhor horário para você.
              </p>
              <div className="agendar-foto" data-reveal="obturador">
                <Image src={fotoAgendar} alt="Border collie deitado na grama" sizes="(max-width: 1000px) 100vw, 40vw" />
              </div>
            </div>
            <CupomWhatsApp />
          </div>
        </section>

        {/* ---------------- Contato ---------------- */}
        <section className="secao" id="contato" aria-labelledby="titulo-contato">
          <div className="container contato-grade">
            <div className="intro">
              <h2 id="titulo-contato" data-reveal>
                Estamos pertinho de você
              </h2>
              <ul className="contato-lista">
                <li data-reveal>
                  <span className="icone-circulo">
                    <MapPin size={20} aria-hidden="true" />
                  </span>
                  <span>
                    {clinica.endereco}
                    <br />
                    <span className="texto-suave">{clinica.bairro}</span>
                  </span>
                </li>
                <li data-reveal>
                  <span className="icone-circulo">
                    <Phone size={20} aria-hidden="true" />
                  </span>
                  <a href={linkWhatsApp(mensagemPadrao)} target="_blank" rel="noopener noreferrer">
                    {clinica.telefoneExibicao} (WhatsApp)
                    <NovaAba />
                  </a>
                </li>
                <li data-reveal>
                  <span className="icone-circulo">
                    <Clock size={20} aria-hidden="true" />
                  </span>
                  <dl className="horas">
                    {horarios.map((h) => (
                      <div key={h.dia} style={{ display: "contents" }}>
                        <dt>{h.dia}</dt>
                        <dd>{h.abre != null ? `${h.abre}h às ${h.fecha}h` : "Fechado"}</dd>
                      </div>
                    ))}
                  </dl>
                </li>
              </ul>
              <div className="contato-acoes" data-reveal>
                <a className="botao" href={linkMapa} target="_blank" rel="noopener noreferrer">
                  Como chegar
                  <ArrowRight className="seta-icone" size={18} aria-hidden="true" />
                  <NovaAba />
                </a>
                <AbertoAgora />
              </div>
            </div>
            <div className="mapa" data-reveal="obturador">
              <iframe
                src={mapaEmbed}
                title={`Mapa: ${clinica.endereco}, ${clinica.bairro}`}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>
        </section>
      </main>

      {/* ---------------- Rodapé ---------------- */}
      <footer className="rodape">
        <div className="container">
          <div className="pegadas" aria-hidden="true" data-reveal>
            {Array.from({ length: 8 }).map((_, i) => (
              <span key={i} style={{ transitionDelay: `${i * 140}ms` }}>
                <PawPrint size={22} />
              </span>
            ))}
          </div>
          <div className="rodape-linha">
            <a className="logo" href="#topo">
              <span className="logo-marca">
                <PawPrint size={20} aria-hidden="true" />
              </span>
              <span className="logo-nome">{clinica.nome}</span>
              <span className="logo-desc">{clinica.descricao}</span>
            </a>
            <span className="rodape-carinho">
              © 2026 {clinica.nome} · {clinica.crmv} · Com carinho pelo seu pet
              <Heart size={14} fill="currentColor" aria-hidden="true" />
            </span>
          </div>
        </div>
      </footer>
    </>
  );
}
