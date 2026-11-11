# ADR 0006 · Conteúdo em MDX no repositório

- **Status:** aceito
- **Data:** 2026-11-11

## Contexto

O conteúdo do site é pequeno (cerca de oito projetos, duas experiências, três formações) e muda poucas vezes por ano. Só o Tiago edita. As opções eram um CMS externo ou arquivos no próprio repositório.

## Decisão

Conteúdo em **arquivos MDX e TypeScript dentro do repositório**, validados com Zod no build.

## Motivos

- Sem serviço externo, sem custo e sem chave de API.
- Conteúdo versionado junto com o código: cada mudança tem histórico e revisão.
- MDX permite usar componentes (`MetricPanel`, `CaseStudy.Step`) no meio do texto.
- A validação impede publicar um projeto incompleto ou sem tradução.

## Consequências

- Publicar conteúdo exige um commit. Para um único autor técnico, isso é aceitável.
- As páginas não leem os arquivos diretamente; passam pelo repositório de conteúdo (ver [design patterns](../03-design-patterns.md), padrão 3). Se um CMS fizer sentido no futuro, só esse módulo muda.
- Vídeos ficam em `public/`. Se o volume crescer, migram para um armazenamento de mídia, sem mudar o modelo.
