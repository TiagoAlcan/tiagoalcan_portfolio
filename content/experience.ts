import type { Localized } from "./site";

export type ExperienceEntry = {
  company: string;
  role: Localized;
  start: string; // YYYY-MM
  end: string | null; // null means current
  mode: Localized;
  highlights: Localized<string[]>;
  stack: string[];
};

export const experience: ExperienceEntry[] = [
  {
    company: "THCS Desenvolvimento de Software",
    role: { "pt-BR": "Software Engineer", en: "Software Engineer" },
    start: "2025-03",
    end: null,
    mode: { "pt-BR": "Híbrido · São Paulo", en: "Hybrid · São Paulo" },
    highlights: {
      "pt-BR": [
        "Liderei a implementação de monitoramento de ponta a ponta com Prometheus e Grafana em um sistema com mais de 1 milhão de transações por dia: painéis, consultas em PromQL e alertas com Alertmanager.",
        "Construí e mantive integrações de API REST, incluindo fluxos de autenticação.",
        "Desenvolvi ferramentas internas com TypeScript, JavaScript, Java com Spring Boot e Vue.js.",
        "Automatizei processos internos, incluindo scripts shell que restabelecem serviços após a reinicialização de servidores Linux.",
        "Atuei diretamente com clientes do setor financeiro em suporte a produção e na condução de mudanças.",
        "Operei Kafka, RabbitMQ, SQL e serviços AWS (CloudWatch, EC2, MSK, S3), e trabalhei com pipelines de CI/CD no TeamCity.",
      ],
      en: [
        "Led the end-to-end monitoring rollout with Prometheus and Grafana for a system handling more than 1 million transactions a day: dashboards, PromQL queries and Alertmanager alerts.",
        "Built and maintained REST API integrations, including authentication flows.",
        "Developed internal tools in TypeScript, JavaScript, Java with Spring Boot and Vue.js.",
        "Automated internal processes, including shell scripts that bring services back after a Linux server restarts.",
        "Worked directly with financial-sector clients on production support and change management.",
        "Operated Kafka, RabbitMQ, SQL and AWS services (CloudWatch, EC2, MSK, S3), and worked with CI/CD pipelines on TeamCity.",
      ],
    },
    stack: [
      "Java",
      "Spring Boot",
      "TypeScript",
      "Vue",
      "Prometheus",
      "PromQL",
      "Grafana",
      "Alertmanager",
      "Kafka",
      "RabbitMQ",
      "SQL",
      "AWS",
      "TeamCity",
      "Linux",
    ],
  },
  {
    company: "THCS Desenvolvimento de Software",
    role: { "pt-BR": "Estagiário", en: "Intern" },
    start: "2023-03",
    end: "2025-03",
    mode: { "pt-BR": "Presencial · São Paulo", en: "On-site · São Paulo" },
    highlights: {
      "pt-BR": [
        "Padronizei e versionei os deploys de aplicações com Git e DockerHub.",
        "Organizei e mantive a documentação técnica de sistemas e APIs.",
        "Testei APIs com JMeter e Postman.",
        "Participei do planejamento de sprints com Kanban e Scrum.",
        "Tive as primeiras experiências com Linux, Docker, SQL e virtualização com Proxmox.",
      ],
      en: [
        "Standardized and versioned application deployments with Git and DockerHub.",
        "Organized and maintained technical documentation for systems and APIs.",
        "Tested APIs with JMeter and Postman.",
        "Took part in sprint planning with Kanban and Scrum.",
        "Got my first hands-on experience with Linux, Docker, SQL and Proxmox virtualization.",
      ],
    },
    stack: ["Git", "DockerHub", "Docker", "JMeter", "Postman", "Linux", "SQL", "Proxmox"],
  },
];
