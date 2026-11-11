import type { Localized } from "./site";

/** Licences and certificates as listed on LinkedIn (read on 2026-11-11). Titles are kept as issued. */
export type Certificate = {
  title: string;
  issuer: "FIAP" | "Alura";
  issued: string; // YYYY-MM
  credentialId: string;
  /** Direct public credential page, when the issuer has one. */
  url?: string;
};

export const certificatesSource = "https://www.linkedin.com/in/tiagoalcan/details/certifications/";

export const certificates: Certificate[] = [
  { title: "Hardening e Configuração de Servidores", issuer: "FIAP", issued: "2025-06", credentialId: "157f5669d9c02e583ff5ba7ea895405a" },
  { title: "Big Data", issuer: "FIAP", issued: "2025-05", credentialId: "d0e6778af4a3223823eea4fecfb338f7" },
  {
    title: "Certificação Linux LPI Essentials: Command Line Basics",
    issuer: "Alura",
    issued: "2025-03",
    credentialId: "1e5ee2f5-706f-463e-add1-42f74ad0870a",
    url: "https://cursos.alura.com.br/certificate/1e5ee2f5-706f-463e-add1-42f74ad0870a",
  },
  { title: "Cloud Fundamentals, Administration and Solution Architect", issuer: "FIAP", issued: "2024-10", credentialId: "72b6e2a9ae5c0d5ec9198b78960ca83d" },
  { title: "Blockchain Advanced", issuer: "FIAP", issued: "2024-09", credentialId: "5ebb161501b7df73f144d636e80952f5" },
  { title: "Blockchain", issuer: "FIAP", issued: "2024-09", credentialId: "611287eccfa7e00d664adaac095f3fe3" },
  { title: "Linux Fundamentos", issuer: "FIAP", issued: "2023-10", credentialId: "350299a43395bc449cfe5a52316ecd91" },
  { title: "Gestão de Infraestrutura de TI", issuer: "FIAP", issued: "2023-10", credentialId: "b122aac67df3b937a23ac80b1a0b338c" },
  { title: "Multimídia e Criatividade", issuer: "FIAP", issued: "2023-10", credentialId: "0e6629a540f734aa655a14769a1f990b" },
  { title: "Formação Social e Sustentabilidade", issuer: "FIAP", issued: "2022-10", credentialId: "8da0ccb7b2225649373bef239f310126" },
];

export const certificateIssuerNote: Localized = {
  "pt-BR": "Os certificados da FIAP são emitidos na plataforma da faculdade e exigem o código da credencial; por isso o link leva à lista no LinkedIn.",
  en: "FIAP certificates are issued on the college's platform and need the credential code, so the link goes to the list on LinkedIn.",
};
