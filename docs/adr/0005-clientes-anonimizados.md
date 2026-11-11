# ADR 0005 · Clientes anonimizados

- **Status:** aceito
- **Data:** 2026-11-11

## Contexto

Parte importante da experiência do Tiago foi construída em sistemas de clientes do setor financeiro. Citar os nomes daria mais peso ao portfólio, mas o site é público e o Tiago não é dono dessa informação.

## Decisão

**Nenhum cliente é citado pelo nome**, em nenhuma página, no README do GitHub nem no currículo para download. O texto usa "grandes instituições financeiras brasileiras" e mantém os números que descrevem a escala, como "mais de 1 milhão de transações por dia".

## Exceção registrada em 2026-11-11

Por decisão do Tiago, o **currículo em PDF** (`public/cv`, gerado de `docs/cv`) cita os clientes pelo nome e traz o telefone, como no currículo que ele já envia a recrutadores. As páginas do site e o README continuam anonimizados.

## Regras derivadas

- Nenhum print de ambiente real, nome de host, endpoint interno ou diagrama de arquitetura do cliente.
- Painéis e telas de projetos confidenciais são **recriados com dados fictícios**, e a página avisa isso de forma explícita.
- Projetos confidenciais levam `confidential: true` no frontmatter (ver [modelo de conteúdo](../04-modelo-de-conteudo.md)).
- O CI falha se o build contiver um termo da lista de termos proibidos.

## Consequências

- Menos impacto imediato para quem reconheceria os nomes.
- Nenhum risco de confidencialidade, e uma demonstração de cuidado com dados de terceiros, que é um ponto valorizado no setor financeiro.
- Em entrevista, o Tiago pode detalhar o contexto verbalmente, se for apropriado.
