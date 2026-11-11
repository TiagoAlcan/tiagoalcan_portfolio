# ADR 0003 · React Three Fiber para o 3D

- **Status:** aceito
- **Data:** 2026-11-11

## Contexto

O Tiago pediu elementos em 3D feitos com JavaScript. O conceito do herói é um grafo de serviços com partículas em fluxo (ver [visão e ideação](../00-visao-e-ideacao.md)). 3D em um portfólio tem um risco conhecido: prejudicar o carregamento e a acessibilidade.

Alternativas: Three.js puro, React Three Fiber (R3F), ou simular profundidade com CSS e SVG.

## Decisão

Usar **React Three Fiber com drei**, em **um único lugar** do site (o herói), carregado sob demanda e com versão estática em SVG.

## Motivos

- R3F descreve a cena como componentes React, o que combina com o resto do código e é mais fácil de manter que Three.js imperativo.
- É a combinação que o mercado reconhece para 3D em React.
- CSS e SVG não dariam a sensação de fluxo e profundidade que o conceito pede.

## Consequências

- O 3D nunca faz parte do carregamento inicial. Ele entra por importação dinâmica depois que a página fica ociosa.
- Existem três níveis de qualidade, escolhidos por uma função pura (ver [design patterns](../03-design-patterns.md), padrão 5).
- O canvas é decorativo. Nenhuma informação existe só nele.
- O chunk do 3D tem orçamento próprio de 250 kB comprimido.
- Se o custo se mostrar alto demais nas medições, a versão SVG vira o padrão e o 3D fica restrito a desktop.
