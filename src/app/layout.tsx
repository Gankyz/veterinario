import type { Metadata, Viewport } from "next";
import { Hanken_Grotesk } from "next/font/google";
import "./globals.css";
import { clinica } from "@/lib/clinica";

const hanken = Hanken_Grotesk({
  variable: "--font-hanken",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

export const metadata: Metadata = {
  title: `${clinica.nome} · ${clinica.descricao}`,
  description:
    "Clínica para cães e gatos na Vila Madalena, São Paulo. Consultas sem pressa, exames no local e agendamento pelo WhatsApp.",
};

export const viewport: Viewport = {
  themeColor: "#ffffff",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    // suppressHydrationWarning: o script abaixo adiciona a classe "js" antes do React carregar.
    <html lang="pt-BR" className={hanken.variable} suppressHydrationWarning>
      <head>
        {/* Marca a página como "com script" antes da pintura, para as entradas animadas não piscarem. */}
        <script
          dangerouslySetInnerHTML={{
            __html: "document.documentElement.classList.add('js')",
          }}
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
