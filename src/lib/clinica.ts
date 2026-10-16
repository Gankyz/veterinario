// ------------------------------------------------------------------
// CONFIGURAÇÃO DA CLÍNICA
// Para usar o site em outra clínica, troque o conteúdo deste arquivo,
// as fotos em public/fotos e as cores no topo de src/app/globals.css.
// Tudo aqui é de exemplo (clínica fictícia).
// ------------------------------------------------------------------

export const clinica = {
  nome: "Sua Marca",
  descricao: "Clínica veterinária",
  // Número de exemplo: substitua pelo WhatsApp real (formato internacional, só dígitos).
  whatsapp: "5511900000000",
  telefoneExibicao: "(11) 90000-0000",
  email: "contato@suamarca.com.br",
  endereco: "Rua Harmonia, 412",
  bairro: "Vila Madalena, São Paulo",
  crmv: "CRMV-SP 00000 (exemplo)",
  mapaBusca: "Rua Harmonia 412, Vila Madalena, São Paulo",
};

export const hero = {
  titulo: "Sua marca aqui",
  subtitulo:
    "Clínica veterinária para cães e gatos na Vila Madalena. Consultas sem pressa, exames no local e agendamento direto pelo WhatsApp.",
  // Imagem recortada (fundo transparente), assentada na base do topo.
  foto: "/fotos/hero-equipe.webp",
  fotoLargura: 1526,
  fotoAltura: 1030,
  fotoAlt: "Dois veterinários examinando um golden retriever",
};

// Ícones disponíveis: veja src/components/Icone.tsx
export const servicos = [
  { icone: "consulta", titulo: "Consultas", texto: "Clínica geral com 40 minutos por atendimento." },
  { icone: "vacina", titulo: "Vacinação", texto: "Protocolos para filhotes e reforço anual." },
  { icone: "cirurgia", titulo: "Cirurgias", texto: "Castração e cirurgias com anestesia inalatória." },
  { icone: "dentes", titulo: "Odontologia", texto: "Limpeza de tártaro e saúde bucal." },
  { icone: "exames", titulo: "Exames e imagem", texto: "Laboratório, ultrassom e raio-x no local." },
  { icone: "parasitas", titulo: "Prevenção de parasitas", texto: "Pulgas, carrapatos e vermes sob controle." },
] as const;

// Fotos de EXEMPLO (domínio público, pessoas reais que não trabalham aqui):
// troque pelas fotos e nomes da equipe da clínica. "foco" ajusta o enquadramento.
export const equipe = [
  {
    nome: "Dra. Nome Sobrenome",
    cargo: "Medicina felina",
    registro: "CRMV-UF 00000",
    foto: "/fotos/equipe/vet-1.jpg",
    foco: "30% 30%",
  },
  {
    nome: "Dra. Nome Sobrenome",
    cargo: "Clínica geral",
    registro: "CRMV-UF 00000",
    foto: "/fotos/equipe/vet-2.jpg",
    foco: "52% 30%",
  },
  {
    nome: "Dr. Nome Sobrenome",
    cargo: "Cirurgia e ortopedia",
    registro: "CRMV-UF 00000",
    foto: "/fotos/equipe/vet-dr.jpg",
    foco: "50% 30%",
  },
];

export const sobre = {
  titulo: "Sobre a clínica",
  texto:
    "Uma clínica de bairro criada por quem ama bicho. Acreditamos que todo pet merece atendimento profissional, tempo e carinho, do primeiro filhote ao check-up do idoso.",
  diferenciais: [
    { icone: "equipamento", titulo: "Equipamentos modernos" },
    { icone: "individual", titulo: "Atendimento individual" },
    { icone: "carinho", titulo: "Cuidado e carinho" },
  ],
};

// Depoimentos de EXEMPLO: troque por avaliações reais dos clientes.
// A foto é do pet (fotos CC0 de exemplo); sem "foto", aparecem as iniciais do tutor.
export const depoimentos = [
  {
    nome: "Marina S.",
    pet: "tutora do Floco",
    foto: "/fotos/pets/floco.webp",
    fotoAlt: "Floco, cachorrinho branco",
    texto:
      "O Floco tremia na porta de qualquer clínica. Aqui foi examinado sem pressa e saiu abanando o rabo. Equipe atenciosa demais!",
  },
  {
    nome: "Leo M.",
    pet: "tutor da Mia e do Chico",
    foto: "/fotos/pets/mia.webp",
    fotoAlt: "Mia, gata de olhos azuis",
    texto:
      "A sala separada para gatos faz toda a diferença. A Mia saiu da caixa de transporte sozinha, coisa que eu nunca tinha visto.",
  },
  {
    nome: "Helena C.",
    pet: "tutora do Biscoito",
    foto: "/fotos/pets/biscoito-avatar.webp",
    fotoAlt: "Biscoito, um beagle",
    texto:
      "Recebi o orçamento da castração por escrito antes de tudo e o valor final foi exatamente o combinado. Recomendo muito.",
  },
];

// Horário de funcionamento, por dia da semana (0 = domingo).
export const horarios: { dia: string; dias: number[]; abre: number | null; fecha: number | null }[] = [
  { dia: "Segunda a sexta", dias: [1, 2, 3, 4, 5], abre: 8, fecha: 20 },
  { dia: "Sábado", dias: [6], abre: 9, fecha: 14 },
  { dia: "Domingo e feriados", dias: [0], abre: null, fecha: null },
];

export function linkWhatsApp(texto: string) {
  return `https://wa.me/${clinica.whatsapp}?text=${encodeURIComponent(texto)}`;
}

export const linkMapa = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(clinica.mapaBusca)}`;
export const mapaEmbed = `https://www.google.com/maps?q=${encodeURIComponent(clinica.mapaBusca)}&output=embed`;
