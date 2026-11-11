# Portfólio · Tiago Alcântara

Site em [tiagoalcan.vercel.app](https://tiagoalcan.vercel.app). O conceito é uma frase: **eu torno sistemas visíveis**.

Os documentos de design foram escritos antes do código e estão em [`docs/`](docs/README.md): visão, design system, system design, padrões de código, modelo de conteúdo e ADRs. O que entrou nesta primeira entrega está em [`docs/05-escopo-v1.md`](docs/05-escopo-v1.md).

## Stack

Next.js 16 (App Router, geração estática) · React 19 · TypeScript estrito · Tailwind CSS 4 · next-intl (PT-BR e EN) · next-themes · MDX validado com Zod · React Three Fiber · cmdk · camada de anotação com [Looseleaf](https://github.com/kevintngo/looseleaf).

## Rodar

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # gera todas as páginas; falha se faltar tradução ou frontmatter
npm test           # funções puras, schemas e paridade das mensagens
npm run lint
```

## Onde fica cada coisa

| Caminho | O que tem |
|---|---|
| `content/projects/<slug>/` | Estudo de caso em `pt-BR.mdx` e `en.mdx` |
| `content/*.ts` | Experiência, formação e dados do site, nos dois idiomas |
| `messages/` | Textos de interface |
| `src/app/[locale]/` | Páginas |
| `src/components/` | `sections`, `case-study`, `command-palette`, `three`, `layout`, `brand` |
| `src/components/ui/` | Primitivos do site e os componentes de anotação do Looseleaf |
| `src/lib/content/` | Schemas e repositório de conteúdo: o único módulo que lê arquivos |
| `src/styles/tokens.css` | Os cinco hex da paleta e os tokens semânticos |
| `docs/brand/` | Opções de marca e os traçados SVG |

## Adicionar um projeto

Crie `content/projects/<slug>/pt-BR.mdx` e `en.mdx` com o frontmatter descrito em `docs/04-modelo-de-conteudo.md`. Nenhum componente precisa mudar. O build falha com uma mensagem clara se um campo obrigatório ou um dos idiomas faltar.

## Trocar a marca

`src/components/brand/marks.ts` traz as quatro opções. A constante `ACTIVE_MARK` escolhe a que aparece no site: hoje é a **D · Prompt**, nas versões clara e escura, com o cursor piscando. A **A · Grafo** continua guardada ali e segue viva no grafo do herói. O favicon está em `src/app/icon.svg`.

## Privacidade

Nenhum cliente é citado pelo nome e nenhuma tela de ambiente real aparece no site (ADR 0005). Projetos confidenciais mostram ilustrações com dados fictícios e avisam isso na página.
