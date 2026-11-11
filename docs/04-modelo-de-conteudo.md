# 04 · Modelo de conteúdo

## 1. Tipos de conteúdo

| Tipo | Onde fica | Formato |
|---|---|---|
| Projeto | `content/projects/<slug>/pt-BR.mdx` e `en.mdx` | MDX com frontmatter |
| Experiência | `content/experience.ts` | Dados tipados, textos nos dois idiomas |
| Formação e cursos | `content/education.ts` | Dados tipados, textos nos dois idiomas |
| Textos de interface | `messages/pt-BR.json` e `en.json` | Chave e valor |
| Currículo | `public/cv/` | PDF em PT e EN |

## 2. Projeto

### Frontmatter

| Campo | Tipo | Obrigatório | Descrição |
|---|---|---|---|
| `title` | texto | sim | Nome do projeto |
| `summary` | texto, até 180 caracteres | sim | A descrição breve que aparece ao lado do vídeo e no cartão |
| `outcome` | texto, até 90 caracteres | sim | Uma linha de resultado, para o cartão |
| `tracks` | lista: `software`, `devops`, `data`, `ai` | sim | Trilhas a que pertence |
| `status` | `done` ou `in-progress` | sim | |
| `role` | texto | sim | O que o Tiago fez |
| `period` | texto | sim | Ano ou intervalo |
| `stack` | lista de textos | sim | Tecnologias |
| `featured` | booleano | não | Aparece na página inicial |
| `order` | inteiro | sim | Ordem de exibição |
| `cover` | caminho | sim | Imagem do cartão |
| `video` | objeto: `src`, `poster`, `captions` | não | Vídeo do topo |
| `links` | lista: `label`, `href` | não | Repositório, app publicado |
| `confidential` | booleano | não | Marca que os dados exibidos são fictícios |

### Corpo: template do estudo de caso

Todo estudo de caso segue a mesma ordem. As perguntas abaixo orientam a escrita.

**Topo.** Vídeo e `summary`. Quem assiste a 30 segundos de vídeo e lê duas linhas precisa entender o que é o projeto.

**01 / Contexto**
- Qual era o problema, e para quem?
- Qual era a escala (volume, usuários, prazo)?
- O que acontecia se nada fosse feito?

**02 / Pesquisa e design**
- O que foi investigado antes de construir?
- Que protótipos ou alternativas existiram, e por que foram descartados?
- Quais foram as duas ou três decisões que mais pesaram?
- Diagramas, esboços e telas intermediárias entram aqui.

**03 / Resultado**
- O que mudou, em números?
- Como o resultado foi adotado por quem usa?
- O que o Tiago faria diferente hoje?

**Rodapé.** Stack, links e o próximo projeto.

### Aviso de confidencialidade

Projetos com `confidential: true` exibem, logo abaixo do topo, a frase: *"Os dados e as telas desta página foram recriados com valores fictícios. O cliente e os detalhes do ambiente foram omitidos."*

## 3. Projetos previstos

| Slug | Título | Trilhas | Destaque | Confidencial | Fonte de mídia |
|---|---|---|---|---|---|
| `mozicash` | MoziCash: finanças pessoais com agente de IA | Software, AI | sim | não | Gravação do app |
| `observabilidade-pagamentos` | Observabilidade de um autorizador de pagamentos | DevOps, Data | sim | sim | Painel recriado com dados fictícios |
| `skill-documentacao` | Skill de IA para documentação técnica | AI | sim | sim | Gravação com um manual de exemplo fictício |
| `pipeline-agentes` | Pipeline de CI/CD orquestrado por agentes de IA | DevOps, AI | sim | não | Gravação do pipeline (em andamento) |
| `aws-terraform` | Infraestrutura AWS com Terraform | DevOps | não | não | Diagrama e terminal; repositório público |
| `risco-credito-grafos` | Risco de crédito PJ com banco de grafos | Data, AI | não | não | Visualização do grafo |
| `testes-bdd` | Documentação de testes em BDD | Software | não | sim | Exemplo de cenário fictício |
| `projeto-restart` | Da API e do scraping ao dashboard | Data | não | não | Gravação do dashboard; repositório público |
| `challenge-santander` | Dashboard de risco e oportunidades de clientes PJ | Data, AI | sim | não | Ilustração; app publicado e repositório público |
| `teste-carga-dimensionamento` | Do teste de carga ao tamanho do servidor | DevOps, Software | não | sim | Ilustração; só a conclusão é pública |
| `padronizacao-deploys` | Deploys padronizados com Git e Docker Hub | DevOps | não | sim | Ilustração e comando fictício |

### Fatos disponíveis por projeto

**Observabilidade de um autorizador de pagamentos.** Sistema que autoriza pagamentos de crédito, com mais de 1 milhão de transações por dia. O Tiago participou de todo o caminho: instrumentação das métricas no código Java, exposição do endpoint para o Prometheus, consultas em PromQL, alertas com Alertmanager e painéis no Grafana. O desafio declarado foi construir um painel simples que gerasse valor para o cliente. Aprendizado: prototipar e organizar o conteúdo antes de construir.

**MoziCash.** Projeto pessoal **inspirado no TCC** (os dois não são o mesmo projeto, e o texto do site deve deixar isso claro). Aplicativo de finanças pessoais que responde quanto ainda se pode gastar no mês. Registro de gastos por voz ou texto, alertas de limite por categoria e sugestões de economia. Stack: React e Tailwind, Python com FastAPI, Supabase (PostgreSQL e autenticação), Google Gemini, Vercel. No TCC que o inspirou (aplicativo de organização financeira orientada a metas, com agente pessoal de IA), o Tiago liderou o time, definiu as boas práticas de desenvolvimento e organizou as entregas por prioridade.

**Skill de IA para documentação técnica.** O manual de instalação de um produto foi transformado no padrão oficial de documentação da empresa e codificado em uma skill do Claude. Ela gera manuais de instalação, implantação e mudança no formato aprovado.

**Pipeline de CI/CD com agentes.** Projeto pessoal em andamento: build, teste e deploy em Kubernetes, com agentes de IA conduzindo cada etapa.

**Infraestrutura AWS com Terraform.** Entrega da fase 1 da pós. Repositório público com Terraform, Dockerfile, Docker Compose e documento de arquitetura.

**Risco de crédito PJ.** Iniciação científica na FIAP, entre os 30 melhores. A proposta do Tiago foi usar a cadeia de suprimentos de cada empresa como peso na classificação, modelada em banco de grafos.

**Testes em BDD.** Documentação técnica de testes seguindo BDD, entregue ao cliente e adotada como parâmetro de qualidade.

## 4. Experiência

| Campo | Descrição |
|---|---|
| `company` | Nome da empresa |
| `role` | Cargo, nos dois idiomas |
| `start`, `end` | Mês e ano; `end` vazio significa atual |
| `mode` | Presencial, híbrido ou remoto |
| `highlights` | Três a seis entregas, nos dois idiomas |
| `stack` | Tecnologias do período |

### Entradas

**THCS Desenvolvimento de Software · Software Engineer · março de 2025 até hoje · híbrido**
- Liderou a implementação de monitoramento de ponta a ponta com Prometheus e Grafana em um sistema com mais de 1 milhão de transações por dia: painéis, consultas em PromQL e alertas com Alertmanager.
- Construiu e manteve integrações de API REST, incluindo fluxos de autenticação.
- Desenvolveu ferramentas internas com TypeScript, JavaScript, Java com Spring Boot e Vue.js.
- Automatizou processos internos, incluindo scripts shell que restabelecem serviços após a reinicialização de servidores Linux.
- Atuou diretamente com clientes do setor financeiro em suporte a produção e na condução de mudanças.
- Operou Kafka, RabbitMQ, SQL e serviços AWS (CloudWatch, EC2, MSK, S3); trabalhou com pipelines de CI/CD no TeamCity.

**THCS Desenvolvimento de Software · Estagiário · março de 2023 a março de 2025 · presencial**
- Padronizou e versionou os deploys de aplicações com Git e DockerHub.
- Organizou e manteve a documentação técnica de sistemas e APIs.
- Testou APIs com JMeter e Postman.
- Participou do planejamento de sprints com Kanban e Scrum.
- Primeiras experiências com Linux, Docker, SQL e virtualização com Proxmox.

## 5. Formação

### Graduação

**Bacharelado em Sistemas de Informação · FIAP · 2022 a 2025 · média 8,9 · 3.560 horas**

Disciplinas agrupadas por trilha, a partir do histórico:

| Trilha | Disciplinas |
|---|---|
| Software | Laboratório de Programação · Programação Orientada a Objetos com Java e Web · Engenharia de Software · Microservice and Web Engineering · Códigos de Alta Performance · Android com Kotlin · Desenvolvimento Cross Platform · iOS com Swift |
| DevOps e Cloud | Cloud Fundamentals, Administration and Solution Architect · Desenvolvimento de Aplicações em Sistemas Distribuídos e Cloud Computing · Network Management and Monitoring · Networking Fundamentals and Security · Linux Fundamentos · Hardening e Configuração de Servidores · Operating System Tuning · Cybersecurity for Dev |
| Data | Design e Desenvolvimento de Bancos de Dados · Programming and Database Management · Estatísticas para Soluções em TI · Enterprise Analytics and Data Warehousing · Big Data & Analytics · Análise de Negócios e Inteligência Empresarial |
| AI | AI Engineering, Cognitive and Semantic Computation & IoT |

O site mostra os nomes das disciplinas, sem notas individuais.

### Pós-graduação

**DevOps e Arquitetura Cloud (Engenharia de Plataforma e SRE) · FIAP PosTech · 360 horas, 10 meses**

| Fase | Tema |
|---|---|
| 1 | Cultura DevOps, Cloud e Arquiteturas (AWS, C4, ADRs) |
| 2 | Escalabilidade e Conteinerização (Docker, Kubernetes, Helm) |
| 3 | Automação e Segurança na Cloud (CI/CD, Terraform, DevSecOps) |
| 4 | Observabilidade e Monitoramento (Prometheus, Grafana, OpenTelemetry) |
| 5 | Multicloud, Custos e IA (SRE, FinOps, AIOps) |

### Bootcamp

**Ciência de Dados · TripleTen · dezembro de 2025 a dezembro de 2026 · mais de 500 horas**

Análise de dados com Pandas e NumPy, visualização com Matplotlib e Seaborn, machine learning com Scikit-learn, Random Forest e LightGBM, deep learning e NLP com Keras e TensorFlow, SQL avançado e introdução a PySpark.

### Cursos

AWS (Udemy) · Formação Linux LPI (Alura) · Monitoramento (Alura) · Observabilidade (Alura) · QA (Alura).

### Idiomas

Português (nativo) · Inglês (avançado) · Espanhol (intermediário).

## 6. Especificação de mídia

| Item | Especificação |
|---|---|
| Vídeo de projeto | 30 a 60 segundos, 1080p, 16:9, sem áudio ou com narração opcional |
| Formatos de vídeo | WebM (VP9 ou AV1) e MP4 (H.264) |
| Tamanho máximo do vídeo | 6 MB |
| Poster | Quadro do vídeo, em AVIF, 1600 × 900 |
| Legendas | Arquivo WebVTT por idioma, mesmo sem áudio, descrevendo o que acontece |
| Capa do cartão | 1200 × 750, AVIF |
| Retrato | Quadrado, pelo menos 800 × 800 |
| Currículo | PDF de uma ou duas páginas, com texto selecionável, sem telefone e com clientes anonimizados |

### Roteiro sugerido para cada vídeo

1. Três segundos com o problema na tela.
2. O caminho principal do produto, sem cortes rápidos.
3. Um momento de resultado (o painel preenchido, o deploy concluído).
4. Quadro final parado, que serve de poster.

## 7. Lacunas

O que ainda falta para implementar o site. Nenhuma impede os documentos, mas todas afetam o conteúdo.

| # | Lacuna | Quem resolve |
|---|---|---|
| 1 | Resolvido: o MoziCash é apresentado como projeto inspirado no TCC e o site linka `https://mozicash.vercel.app` | |
| 2 | Resolvido: o Tiago está na fase 2 de 5 da pós; o site mostra apenas "em andamento" | |
| 3 | Foto de perfil em alta resolução | Tiago |
| 4 | Vídeos e capturas: a implementação produz, e **nada entra no site sem validação do Tiago** | Implementação, validação do Tiago |
| 5 | Texto detalhado de "meu papel" para a página Sobre | Rascunho na implementação, revisão do Tiago |
| 6 | Detalhes do processo de cada estudo de caso (protótipos, alternativas descartadas) | Tiago |
| 7 | Currículo novo em PT e EN, anonimizado e sem telefone | Implementação, revisão do Tiago |
| 8 | Domínio: reaproveitar `tiagoalcan.vercel.app` ou registrar um próprio | Tiago |
| 9 | Stack e resultados do `projeto_restart` e do pipeline com agentes | Tiago |
