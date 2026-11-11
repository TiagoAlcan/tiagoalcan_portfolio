import type { Track } from "@/lib/content/schema";
import type { Localized } from "./site";

export type Capability = {
  track: Track;
  problem: Localized;
  builds: Localized<string[]>;
  stack: string[];
  example: string; // project slug
};

export const capabilities: Capability[] = [
  {
    track: "devops",
    problem: {
      "pt-BR": "Um sistema no ar sem métricas é uma caixa-preta: ninguém sabe o que ele está fazendo até alguém reclamar.",
      en: "A live system without metrics is a black box: nobody knows what it is doing until someone complains.",
    },
    builds: {
      "pt-BR": [
        "Monitoramento de ponta a ponta com Prometheus e Grafana",
        "Consultas em PromQL e alertas com Alertmanager",
        "Deploys versionados com Git e Docker Hub",
        "Scripts shell que restabelecem serviços após a reinicialização do servidor",
        "Infraestrutura como código com Terraform na AWS",
        "Testes de carga com JMeter e recomendação de dimensionamento",
      ],
      en: [
        "End-to-end monitoring with Prometheus and Grafana",
        "PromQL queries and Alertmanager alerts",
        "Versioned deployments with Git and Docker Hub",
        "Shell scripts that bring services back after a server restart",
        "Infrastructure as code with Terraform on AWS",
        "Load tests with JMeter and a sizing recommendation",
      ],
    },
    stack: ["Prometheus", "PromQL", "Alertmanager", "Grafana", "Docker", "Linux", "AWS", "Terraform", "JMeter"],
    example: "observabilidade-pagamentos",
  },
  {
    track: "software",
    problem: {
      "pt-BR": "Times precisam de integrações e ferramentas internas que aguentem produção, e de documentação que outra pessoa consiga executar sozinha.",
      en: "Teams need integrations and internal tools that hold up in production, and documentation someone else can follow alone.",
    },
    builds: {
      "pt-BR": [
        "Integrações de API REST, incluindo fluxos de autenticação",
        "Ferramentas internas com TypeScript, Java com Spring Boot e Vue.js",
        "Produto completo: interface, API e banco de dados",
        "Documentação técnica de sistemas, APIs e testes em BDD",
      ],
      en: [
        "REST API integrations, including authentication flows",
        "Internal tools in TypeScript, Java with Spring Boot and Vue.js",
        "A whole product: interface, API and database",
        "Technical documentation for systems, APIs and BDD tests",
      ],
    },
    stack: ["Java", "Spring Boot", "TypeScript", "Vue", "React", "FastAPI", "SQL", "REST"],
    example: "mozicash",
  },
  {
    track: "data",
    problem: {
      "pt-BR": "Dado que só o autor da consulta entende não ajuda ninguém a decidir.",
      en: "Data only the query's author understands helps nobody decide.",
    },
    builds: {
      "pt-BR": [
        "Painéis que respondem a uma pergunta sem exigir a consulta",
        "Dashboards em Streamlit com Pandas e Plotly",
        "Regras de classificação que dá para explicar",
        "Modelagem de relações em grafo",
      ],
      en: [
        "Dashboards that answer a question without requiring the query",
        "Streamlit dashboards with Pandas and Plotly",
        "Classification rules that can be explained",
        "Relationship modelling as a graph",
      ],
    },
    stack: ["SQL", "PromQL", "Kafka", "RabbitMQ", "Python", "Pandas", "Streamlit", "Plotly"],
    example: "challenge-santander",
  },
  {
    track: "ai",
    problem: {
      "pt-BR": "Trabalho repetitivo consome o tempo de quem deveria estar decidindo.",
      en: "Repetitive work eats the time of people who should be deciding.",
    },
    builds: {
      "pt-BR": [
        "Skill do Claude que codifica um padrão de documentação",
        "Agente que registra gastos por voz ou texto",
        "Pipeline de CI/CD conduzido por agentes, em andamento",
      ],
      en: [
        "A Claude skill that encodes a documentation standard",
        "An agent that logs expenses by voice or text",
        "A CI/CD pipeline driven by agents, in progress",
      ],
    },
    stack: ["Claude", "Skills", "Google Gemini", "Agentes de IA"],
    example: "skill-documentacao",
  },
];
