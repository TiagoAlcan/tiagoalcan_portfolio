import type { Track } from "@/lib/content/schema";
import type { Localized } from "./site";

export type EducationEntry = {
  id: "postgrad" | "bootcamp" | "bsc";
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

/** The bootcamp's modules, as listed on TripleTen's Brazilian program page (read on 2026-11-11). */
export const bootcampModules: { title: Localized; weeks: number; topics: Localized }[] = [
  { title: { "pt-BR": "Python básico", en: "Basic Python" }, weeks: 2, topics: { "pt-BR": "Fundamentos, laços, condicionais e introdução ao pandas", en: "Fundamentals, loops, conditionals and an introduction to pandas" } },
  { title: { "pt-BR": "Continuação de Python básico", en: "Basic Python, continued" }, weeks: 2, topics: { "pt-BR": "Dicionários, funções, pandas e introdução ao pré-processamento", en: "Dictionaries, functions, pandas and an introduction to preprocessing" } },
  { title: { "pt-BR": "Manipulação de dados", en: "Data wrangling" }, weeks: 3, topics: { "pt-BR": "Dados ausentes e duplicados, tipos, correlações, gráficos e engenharia de atributos", en: "Missing and duplicate data, types, correlations, charts and feature engineering" } },
  { title: { "pt-BR": "Análise Estatística de Dados", en: "Statistical Data Analysis" }, weeks: 3, topics: { "pt-BR": "Estatística descritiva, probabilidade e testes de hipótese", en: "Descriptive statistics, probability and hypothesis testing" } },
  { title: { "pt-BR": "Ferramentas de Desenvolvimento de Software", en: "Software Development Tools" }, weeks: 3, topics: { "pt-BR": "Linha de comando, ambientes, Git e GitHub, Python intermediário", en: "Command line, environments, Git and GitHub, intermediate Python" } },
  { title: { "pt-BR": "Projeto Integrado 1", en: "Integrated Project 1" }, weeks: 1, topics: { "pt-BR": "Previsão de vendas de videogames", en: "Video game sales forecasting" } },
  { title: { "pt-BR": "Coleta e Armazenamento de Dados (SQL)", en: "Data Collection and Storage (SQL)" }, weeks: 2, topics: { "pt-BR": "Extração de dados da web, SQL, SQL avançado e relações entre tabelas", en: "Web data extraction, SQL, advanced SQL and table relationships" } },
  { title: { "pt-BR": "Introdução ao Aprendizado Automático", en: "Introduction to Machine Learning" }, weeks: 2, topics: { "pt-BR": "Scikit-learn, qualidade de modelo e regressão", en: "Scikit-learn, model quality and regression" } },
  { title: { "pt-BR": "Aprendizado Supervisionado", en: "Supervised Learning" }, weeks: 2, topics: { "pt-BR": "Preparação de atributos, métricas de classificação e regressão, classes desbalanceadas", en: "Feature preparation, classification and regression metrics, imbalanced classes" } },
  { title: { "pt-BR": "Aprendizado Automático para os Negócios", en: "Machine Learning in Business" }, weeks: 2, topics: { "pt-BR": "Métricas de negócio, testes A/B, bootstrapping e rotulagem de dados", en: "Business metrics, A/B tests, bootstrapping and data labeling" } },
  { title: { "pt-BR": "Álgebra Linear", en: "Linear Algebra" }, weeks: 2, topics: { "pt-BR": "Vetores, distâncias, matrizes e regressão linear", en: "Vectors, distances, matrices and linear regression" } },
  { title: { "pt-BR": "Métodos Numéricos", en: "Numerical Methods" }, weeks: 2, topics: { "pt-BR": "Análise de algoritmos, gradiente descendente e gradient boosting", en: "Algorithm analysis, gradient descent and gradient boosting" } },
  { title: { "pt-BR": "Séries Temporais", en: "Time Series" }, weeks: 2, topics: { "pt-BR": "Tendência, sazonalidade, criação de atributos e previsão", en: "Trend, seasonality, feature creation and forecasting" } },
  { title: { "pt-BR": "Aprendizado Automático para Textos", en: "Machine Learning for Texts" }, weeks: 2, topics: { "pt-BR": "Vetorização de texto, bag of words, TF-IDF, embeddings e BERT", en: "Text vectorization, bag of words, TF-IDF, embeddings and BERT" } },
  { title: { "pt-BR": "Visão Computacional", en: "Computer Vision" }, weeks: 2, topics: { "pt-BR": "Redes totalmente conectadas e convolucionais com Keras", en: "Fully connected and convolutional networks with Keras" } },
  { title: { "pt-BR": "Aprendizado Não Supervisionado", en: "Unsupervised Learning" }, weeks: 2, topics: { "pt-BR": "Clusterização e detecção de anomalias", en: "Clustering and anomaly detection" } },
  { title: { "pt-BR": "Projeto Final", en: "Final Project" }, weeks: 2, topics: { "pt-BR": "Simulação do trabalho de um cientista de dados júnior", en: "A simulation of a junior data scientist's work" } },
];

/** What each program left me with, in my own words. Only what is already done or underway. */
export const learned: Record<EducationEntry["id"], Localized<string[]>> = {
  postgrad: {
    "pt-BR": [
      "Fase 1 concluída: coloquei uma API de feature flags na AWS com VPC, sub-rede pública para a aplicação e privada para o banco.",
      "Descrever a infraestrutura em Terraform, para criar, destruir e recriar o ambiente igual.",
      "Auditar a própria aplicação pelos 12 fatores: 8 atendidos, 3 parciais e 1 não atendido.",
      "Estimar custo antes de provisionar, e que paridade entre desenvolvimento e produção dá mais trabalho que fazer o Docker rodar.",
    ],
    en: [
      "Phase 1 done: I put a feature-flag API on AWS with a VPC, a public subnet for the application and a private one for the database.",
      "Describing infrastructure in Terraform, so the environment can be created, destroyed and recreated identically.",
      "Auditing our own application against the twelve factors: 8 met, 3 partially met and 1 not met.",
      "Estimating cost before provisioning, and that dev/prod parity is more work than getting Docker to run.",
    ],
  },
  bootcamp: {
    "pt-BR": [
      "Python e pandas aplicados a dados reais, do carregamento à conclusão.",
      "Pré-processamento: padronizar cabeçalhos, tratar valores ausentes e remover duplicados antes de qualquer análise.",
      "Formular uma hipótese e testá-la nos dados, em vez de procurar um resultado.",
      "Receber revisão de código de profissionais a cada projeto e corrigir até o aceite.",
    ],
    en: [
      "Python and pandas applied to real data, from loading to conclusion.",
      "Preprocessing: standardizing headers, handling missing values and removing duplicates before any analysis.",
      "Stating a hypothesis and testing it on the data, instead of hunting for a result.",
      "Getting code review from professionals on every project and fixing it until it is accepted.",
    ],
  },
  bsc: {
    "pt-BR": [
      "Base de engenharia de software em várias frentes: Java e web, microsserviços, mobile, bancos de dados, redes, Linux e cloud.",
      "Pesquisa: na iniciação científica, classificada entre os 30 melhores trabalhos, propus usar a cadeia de suprimentos como peso em um modelo de risco de crédito, com banco de grafos.",
      "Liderança: no trabalho de conclusão, conduzi o time de um aplicativo de finanças pessoais com agente de IA.",
      "Levar um problema de negócio até um produto entregue, nos desafios com empresas parceiras.",
    ],
    en: [
      "A software engineering foundation across several fronts: Java and web, microservices, mobile, databases, networking, Linux and cloud.",
      "Research: in my undergraduate research, ranked in the top 30, I proposed using the supply chain as a weight in a credit risk model, with a graph database.",
      "Leadership: in the capstone project, I led the team behind a personal finance app with an AI agent.",
      "Taking a business problem all the way to a delivered product, in the challenges with partner companies.",
    ],
  },
};
