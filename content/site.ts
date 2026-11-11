import type { Locale } from "@/i18n/routing";
import type { Track } from "@/lib/content/schema";

export type Localized<T = string> = Record<Locale, T>;

export const SITE_URL = "https://tiagoalcan.vercel.app";

export const contact = {
  email: "tiago.gomesalcan@gmail.com",
  linkedin: "https://www.linkedin.com/in/tiagoalcan",
  github: "https://github.com/TiagoAlcan",
  whatsapp: "https://wa.me/5511994916015",
  whatsappDisplay: "+55 11 99491-6015",
} as const;

/** The résumé PDFs, rendered from docs/cv by docs/cv/build.sh. */
export const resume: Localized = {
  "pt-BR": "/cv/tiago-alcantara-cv-pt-br.pdf",
  en: "/cv/tiago-alcantara-cv-en.pdf",
};

export const tracks: Record<Track, { label: Localized; tagline: Localized; proofs: Localized }> = {
  software: {
    label: { "pt-BR": "Software", en: "Software" },
    tagline: {
      "pt-BR": "Construo e opero software que roda em produção, do endpoint à tela.",
      en: "I build and run software in production, from the endpoint to the screen.",
    },
    proofs: {
      "pt-BR": "Java e Spring Boot, TypeScript, Vue e React, integrações REST com autenticação.",
      en: "Java and Spring Boot, TypeScript, Vue and React, REST integrations with authentication.",
    },
  },
  devops: {
    label: { "pt-BR": "DevOps e Cloud", en: "DevOps & Cloud" },
    tagline: {
      "pt-BR": "Coloco sistemas no ar e deixo claro o que acontece com eles lá.",
      en: "I ship systems and make it clear what happens to them once they are live.",
    },
    proofs: {
      "pt-BR": "Prometheus, Grafana e Alertmanager, Docker, AWS, Terraform e CI/CD.",
      en: "Prometheus, Grafana and Alertmanager, Docker, AWS, Terraform and CI/CD.",
    },
  },
  data: {
    label: { "pt-BR": "Data", en: "Data" },
    tagline: {
      "pt-BR": "Transformo eventos em painéis e modelos que alguém consegue usar.",
      en: "I turn events into dashboards and models that someone can actually use.",
    },
    proofs: {
      "pt-BR": "SQL, Kafka e PromQL, Python e Pandas, risco de crédito com grafos.",
      en: "SQL, Kafka and PromQL, Python and Pandas, credit risk with graphs.",
    },
  },
  ai: {
    label: { "pt-BR": "AI", en: "AI" },
    tagline: {
      "pt-BR": "Uso IA para tirar trabalho repetitivo do caminho, com um humano no controle.",
      en: "I use AI to take repetitive work out of the way, with a human in control.",
    },
    proofs: {
      "pt-BR": "Skill de IA para documentação, agente financeiro do MoziCash, pipeline com agentes.",
      en: "An AI skill for documentation, MoziCash's finance agent, a pipeline run by agents.",
    },
  },
};

export const stats: { value: string; label: Localized; circled?: boolean }[] = [
  {
    value: "1M+",
    label: {
      "pt-BR": "transações por dia no sistema que ajudo a operar",
      en: "transactions a day in the system I help operate",
    },
    circled: true,
  },
  {
    value: "2023",
    label: {
      "pt-BR": "desde quando trabalho com sistemas em produção",
      en: "the year I started working on production systems",
    },
  },
  {
    value: "4",
    label: {
      "pt-BR": "trilhas: software, DevOps e cloud, data e AI",
      en: "tracks: software, DevOps and cloud, data and AI",
    },
  },
];

/** Illustrative transactions-per-second shape for sparklines. Not real data. */
export const illustrativeSeries = [9, 10, 9, 11, 12, 11, 13, 17, 24, 31, 27, 19, 15, 13, 12, 14, 13, 12, 11, 12, 11, 10];

export const stackMarquee = [
  "Java",
  "Spring Boot",
  "TypeScript",
  "Vue",
  "React",
  "Python",
  "SQL",
  "Prometheus",
  "PromQL",
  "Grafana",
  "Alertmanager",
  "Linux",
  "Docker",
  "AWS",
  "Kafka",
  "RabbitMQ",
  "Terraform",
  "Kubernetes",
];

export const stackByArea: { area: Localized; work: string[]; study: string[] }[] = [
  {
    area: { "pt-BR": "Software", en: "Software" },
    work: ["Java", "Spring Boot", "TypeScript", "JavaScript", "Vue", "SQL", "REST"],
    study: ["React", "Python", "FastAPI"],
  },
  {
    area: { "pt-BR": "DevOps e Cloud", en: "DevOps & Cloud" },
    work: ["Linux", "Shell", "Docker", "Docker Compose", "TeamCity", "AWS (EC2, S3, MSK, CloudWatch)", "Proxmox"],
    study: ["Kubernetes", "Terraform", "GitHub Actions"],
  },
  {
    area: { "pt-BR": "Observabilidade", en: "Observability" },
    work: ["Prometheus", "PromQL", "Alertmanager", "Grafana"],
    study: ["OpenTelemetry"],
  },
  {
    area: { "pt-BR": "Data", en: "Data" },
    work: ["SQL", "Kafka", "RabbitMQ"],
    study: ["Pandas", "NumPy", "Scikit-learn", "PySpark"],
  },
  {
    area: { "pt-BR": "AI", en: "AI" },
    work: ["Skills e automações com Claude"],
    study: ["Agentes", "LLMs em aplicações"],
  },
  {
    area: { "pt-BR": "Qualidade", en: "Quality" },
    work: ["JMeter", "Postman", "Insomnia", "BDD"],
    study: ["JUnit"],
  },
];

/** The `man curiosity` block of the GitHub README, as sticky notes. */
export const curiosities: { title: Localized; body: Localized }[] = [
  {
    title: {
      "pt-BR": "Um milhão por dia são uns 12 por segundo.",
      en: "A million a day is about 12 per second.",
    },
    body: {
      "pt-BR": "A média é calma. O que derruba um sistema é o pico, e por isso um bom painel mostra taxa por janela de tempo.",
      en: "The average is calm. Peaks take systems down, so a good dashboard shows rate over a time window.",
    },
  },
  {
    title: {
      "pt-BR": "99,9% ainda são quase 9 horas fora do ar por ano.",
      en: "99.9% is still almost 9 hours of downtime a year.",
    },
    body: {
      "pt-BR": "Cada nove a mais divide isso por dez: 99,99% são 52 minutos.",
      en: "Each extra nine divides that by ten: 99.99% is 52 minutes.",
    },
  },
  {
    title: {
      "pt-BR": "Média esconde quem está sofrendo.",
      en: "Averages hide who is hurting.",
    },
    body: {
      "pt-BR": "Com 1 milhão de requisições por dia, p99 quer dizer 10.000 requisições mais lentas que aquele número. Todo dia.",
      en: "At 1 million requests a day, p99 means 10,000 requests slower than that number. Every day.",
    },
  },
  {
    title: {
      "pt-BR": "Reiniciar não é recuperar.",
      en: "A restart is not a recovery.",
    },
    body: {
      "pt-BR": "Depois que a máquina volta, os serviços precisam subir na ordem certa. Foi isso que me fez escrever scripts de recuperação.",
      en: "After the machine comes back, services have to start in the right order. That got me writing recovery scripts.",
    },
  },
  {
    title: {
      "pt-BR": "Painel que precisa de explicação é relatório.",
      en: "If a dashboard needs explaining, it's a report.",
    },
    body: {
      "pt-BR": "Um bom painel responde a uma pergunta em cinco segundos.",
      en: "A good one answers a question in five seconds.",
    },
  },
];

export const languages: { name: Localized; level: Localized }[] = [
  { name: { "pt-BR": "Português", en: "Portuguese" }, level: { "pt-BR": "Nativo", en: "Native" } },
  { name: { "pt-BR": "Inglês", en: "English" }, level: { "pt-BR": "Avançado", en: "Advanced" } },
  { name: { "pt-BR": "Espanhol", en: "Spanish" }, level: { "pt-BR": "Intermediário", en: "Intermediate" } },
];
