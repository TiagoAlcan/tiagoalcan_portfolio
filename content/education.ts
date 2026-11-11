import type { Track } from "@/lib/content/schema";
import type { Localized } from "./site";

export type EducationEntry = {
  id: string;
  title: Localized;
  school: string;
  period: Localized;
  detail: Localized;
  inProgress: boolean;
  link?: { label: Localized; href: string };
};

export const education: EducationEntry[] = [
  {
    id: "postgrad",
    title: {
      "pt-BR": "Pós-graduação em DevOps e Arquitetura Cloud",
      en: "Postgraduate program in DevOps and Cloud Architecture",
    },
    school: "FIAP PosTech",
    period: { "pt-BR": "Em andamento · 360 horas", en: "In progress · 360 hours" },
    detail: {
      "pt-BR":
        "Engenharia de plataforma e SRE: Kubernetes, IaC com Terraform, CI/CD e GitOps, DevSecOps, observabilidade, FinOps e AIOps.",
      en: "Platform engineering and SRE: Kubernetes, IaC with Terraform, CI/CD and GitOps, DevSecOps, observability, FinOps and AIOps.",
    },
    inProgress: true,
  },
  {
    id: "bootcamp",
    title: { "pt-BR": "Bootcamp de Ciência de Dados", en: "Data Science bootcamp" },
    school: "TripleTen",
    period: { "pt-BR": "Dez 2025 a dez 2026 · mais de 500 horas", en: "Dec 2025 to Dec 2026 · 500+ hours" },
    detail: {
      "pt-BR":
        "Análise de dados com Pandas e NumPy, machine learning com Scikit-learn e LightGBM, deep learning e NLP com Keras e TensorFlow, SQL avançado e introdução a PySpark.",
      en: "Data analysis with Pandas and NumPy, machine learning with Scikit-learn and LightGBM, deep learning and NLP with Keras and TensorFlow, advanced SQL and an introduction to PySpark.",
    },
    inProgress: true,
    link: {
      label: { "pt-BR": "Trabalhos do curso", en: "Coursework" },
      href: "https://github.com/TiagoAlcan/Triple-Ten-Data-Science",
    },
  },
  {
    id: "bsc",
    title: { "pt-BR": "Bacharelado em Sistemas de Informação", en: "B.Sc. in Information Systems" },
    school: "FIAP",
    period: { "pt-BR": "2022 a 2025 · média 8,9 · 3.560 horas", en: "2022 to 2025 · GPA 8.9/10 · 3,560 hours" },
    detail: {
      "pt-BR": "Iniciação científica classificada entre os 30 melhores trabalhos, sobre risco de crédito com grafos.",
      en: "Undergraduate research ranked in the top 30, on credit risk with graphs.",
    },
    inProgress: false,
  },
];

export const postgradPhases: { phase: number; theme: Localized }[] = [
  {
    phase: 1,
    theme: {
      "pt-BR": "Cultura DevOps, Cloud e Arquiteturas (AWS, C4, ADRs)",
      en: "DevOps culture, cloud and architecture (AWS, C4, ADRs)",
    },
  },
  {
    phase: 2,
    theme: {
      "pt-BR": "Escalabilidade e Conteinerização (Docker, Kubernetes, Helm)",
      en: "Scalability and containers (Docker, Kubernetes, Helm)",
    },
  },
  {
    phase: 3,
    theme: {
      "pt-BR": "Automação e Segurança na Cloud (CI/CD, Terraform, DevSecOps)",
      en: "Cloud automation and security (CI/CD, Terraform, DevSecOps)",
    },
  },
  {
    phase: 4,
    theme: {
      "pt-BR": "Observabilidade e Monitoramento (Prometheus, Grafana, OpenTelemetry)",
      en: "Observability and monitoring (Prometheus, Grafana, OpenTelemetry)",
    },
  },
  {
    phase: 5,
    theme: {
      "pt-BR": "Multicloud, Custos e IA (SRE, FinOps, AIOps)",
      en: "Multicloud, cost and AI (SRE, FinOps, AIOps)",
    },
  },
];

/** Undergraduate courses grouped by track. Course names stay as they appear on the transcript. */
export const coursesByTrack: Record<Track, string[]> = {
  software: [
    "Laboratório de Programação",
    "Programação Orientada a Objetos com Java e Web",
    "Engenharia de Software",
    "Microservice and Web Engineering",
    "Códigos de Alta Performance",
    "Android com Kotlin",
    "Desenvolvimento Cross Platform",
    "iOS com Swift",
  ],
  devops: [
    "Cloud Fundamentals, Administration and Solution Architect",
    "Desenvolvimento de Aplicações em Sistemas Distribuídos e Cloud Computing",
    "Network Management and Monitoring",
    "Networking Fundamentals and Security",
    "Linux Fundamentos",
    "Hardening e Configuração de Servidores",
    "Operating System Tuning",
    "Cybersecurity for Dev",
  ],
  data: [
    "Design e Desenvolvimento de Bancos de Dados",
    "Programming and Database Management",
    "Estatísticas para Soluções em TI",
    "Enterprise Analytics and Data Warehousing",
    "Big Data & Analytics",
    "Análise de Negócios e Inteligência Empresarial",
  ],
  ai: ["AI Engineering, Cognitive and Semantic Computation & IoT"],
};

export const shortCourses = [
  "AWS (Udemy)",
  "Formação Linux LPI (Alura)",
  "Monitoramento (Alura)",
  "Observabilidade (Alura)",
  "QA (Alura)",
];
