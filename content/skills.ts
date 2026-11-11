import type { Localized } from "./site";

/** Where a skill was used: at work, in a published case, or both. */
export type SkillLevel = "work" | "both" | "project";

/** `experience` points to the Experience page; a string is a project slug. */
export type SkillEvidence = "experience" | (string & {});

export type Skill = {
  name: string;
  level: SkillLevel;
  what: Localized;
  evidence: SkillEvidence[];
  featured?: boolean;
};

export const skills: Skill[] = [
  {
    name: "Prometheus e PromQL",
    level: "work",
    what: {
      "pt-BR": "Métricas, consultas e alertas de um sistema com mais de 1 milhão de transações por dia.",
      en: "Metrics, queries and alerts for a system handling more than 1 million transactions a day.",
    },
    evidence: ["experience", "observabilidade-pagamentos"],
    featured: true,
  },
  {
    name: "Grafana",
    level: "work",
    what: {
      "pt-BR": "Painéis que o cliente lê sem conhecer a consulta por trás.",
      en: "Dashboards the client reads without knowing the query behind them.",
    },
    evidence: ["experience", "observabilidade-pagamentos"],
    featured: true,
  },
  {
    name: "Java e Spring Boot",
    level: "work",
    what: {
      "pt-BR": "Ferramentas internas, integrações REST e a instrumentação das métricas no código.",
      en: "Internal tools, REST integrations and the metrics instrumentation in code.",
    },
    evidence: ["experience", "observabilidade-pagamentos"],
    featured: true,
  },
  {
    name: "TypeScript e Vue",
    level: "work",
    what: {
      "pt-BR": "Ferramentas internas usadas pelo time.",
      en: "Internal tools used by the team.",
    },
    evidence: ["experience"],
  },
  {
    name: "Linux e Shell",
    level: "work",
    what: {
      "pt-BR": "Scripts que restabelecem os serviços depois que um servidor reinicia.",
      en: "Scripts that bring services back after a server restarts.",
    },
    evidence: ["experience"],
    featured: true,
  },
  {
    name: "Docker",
    level: "both",
    what: {
      "pt-BR": "Deploys versionados e publicados como imagens, iguais em todo ambiente.",
      en: "Versioned deployments published as images, the same in every environment.",
    },
    evidence: ["experience", "padronizacao-deploys", "aws-terraform"],
    featured: true,
  },
  {
    name: "AWS",
    level: "both",
    what: {
      "pt-BR": "CloudWatch, EC2, MSK e S3 no trabalho; EC2 e RDS em sub-rede privada no projeto da pós.",
      en: "CloudWatch, EC2, MSK and S3 at work; EC2 and RDS in a private subnet in the postgraduate project.",
    },
    evidence: ["experience", "aws-terraform"],
    featured: true,
  },
  {
    name: "Terraform",
    level: "project",
    what: {
      "pt-BR": "Um ambiente inteiro descrito como código e reproduzível com um comando.",
      en: "A whole environment described as code and reproducible with one command.",
    },
    evidence: ["aws-terraform"],
    featured: true,
  },
  {
    name: "Kafka e RabbitMQ",
    level: "work",
    what: {
      "pt-BR": "Operação de mensageria em produção.",
      en: "Running messaging in production.",
    },
    evidence: ["experience"],
  },
  {
    name: "SQL",
    level: "work",
    what: {
      "pt-BR": "Consultas no dia a dia de suporte a produção.",
      en: "Day-to-day queries in production support.",
    },
    evidence: ["experience"],
  },
  {
    name: "JMeter",
    level: "work",
    what: {
      "pt-BR": "Testes de carga traduzidos em recomendação de servidor para o cliente.",
      en: "Load tests turned into a server recommendation for the client.",
    },
    evidence: ["experience", "teste-carga-dimensionamento", "testes-bdd"],
    featured: true,
  },
  {
    name: "BDD e Postman",
    level: "work",
    what: {
      "pt-BR": "Critérios de qualidade escritos como cenários que cliente e time leem do mesmo jeito.",
      en: "Quality criteria written as scenarios the client and the team read the same way.",
    },
    evidence: ["experience", "testes-bdd"],
  },
  {
    name: "Python e Pandas",
    level: "project",
    what: {
      "pt-BR": "Dashboard de risco e oportunidade de crédito em Streamlit; API do MoziCash em FastAPI.",
      en: "Credit risk and opportunity dashboard in Streamlit; MoziCash's API in FastAPI.",
    },
    evidence: ["challenge-santander", "mozicash"],
    featured: true,
  },
  {
    name: "React",
    level: "project",
    what: {
      "pt-BR": "Interface do MoziCash e a base do clone-tabnews em Next.js.",
      en: "MoziCash's interface and the clone-tabnews foundation in Next.js.",
    },
    evidence: ["mozicash", "clone-tabnews"],
  },
  {
    name: "IA aplicada",
    level: "both",
    what: {
      "pt-BR": "Skill do Claude que gera manuais no padrão da empresa; agente financeiro do MoziCash.",
      en: "A Claude skill that writes manuals in the company standard; MoziCash's finance agent.",
    },
    evidence: ["skill-documentacao", "mozicash", "pipeline-agentes"],
    featured: true,
  },
  {
    name: "Grafos e modelagem de risco",
    level: "project",
    what: {
      "pt-BR": "Cadeia de suprimentos de cada empresa como peso no modelo de risco de crédito.",
      en: "Each company's supply chain as a weight in the credit risk model.",
    },
    evidence: ["risco-credito-grafos", "challenge-santander"],
  },
];
