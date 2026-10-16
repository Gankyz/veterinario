import {
  Bug,
  Heart,
  HandHeart,
  Microscope,
  Scissors,
  ShieldCheck,
  Smile,
  Stethoscope,
  Syringe,
  type LucideProps,
} from "lucide-react";

// Nomes usados em src/lib/clinica.ts. Para um ícone novo, importe do lucide-react e adicione aqui.
const icones = {
  consulta: Stethoscope,
  vacina: Syringe,
  cirurgia: Scissors,
  dentes: Smile,
  exames: Microscope,
  parasitas: Bug,
  equipamento: ShieldCheck,
  individual: HandHeart,
  carinho: Heart,
};

export type NomeIcone = keyof typeof icones;

export function Icone({ nome, ...props }: { nome: string } & LucideProps) {
  const Componente = icones[nome as NomeIcone] ?? Heart;
  return <Componente aria-hidden="true" strokeWidth={1.75} {...props} />;
}
