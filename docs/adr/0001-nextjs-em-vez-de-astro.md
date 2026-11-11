# ADR 0001 · Next.js em vez de Astro

- **Status:** aceito
- **Data:** 2026-11-11

## Contexto

O portfólio é quase todo conteúdo estático, com poucas áreas interativas (tema, filtro, paleta de comandos, formulário e um grafo 3D). Duas opções foram consideradas a sério: Astro e Next.js.

Astro entrega menos JavaScript por padrão e tem rotas por idioma embutidas. Next.js é o framework React mais pedido em vagas, e o Tiago já trabalha com React.

## Decisão

Usar **Next.js com App Router, React e TypeScript estrito**, com geração estática de todas as páginas.

## Motivos

- O portfólio também é uma amostra de código. Next.js e React aparecem com mais frequência nas vagas das trilhas de software e AI.
- Server Components permitem chegar perto do custo de JavaScript do Astro, desde que a disciplina de "ilhas de cliente" seja seguida (ver [design patterns](../03-design-patterns.md), padrão 1).
- React Three Fiber, escolhido para o 3D, é nativo de React.

## Consequências

- É preciso vigiar o tamanho do JavaScript. O orçamento está no [system design](../02-system-design.md) e é verificado no CI.
- Internacionalização exige uma biblioteca (ver ADR 0002).
- A regra "`use client` só nas folhas" passa a ser obrigatória.
