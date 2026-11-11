# 05 · Escopo da primeira entrega

Os documentos 00 a 04 descrevem o site completo. Este registra o que entra na primeira entrega e o que fica para depois. Decidido com o Tiago em 2026-11-11.

## Entra

| Item | Referência |
|---|---|
| Next.js (App Router, TypeScript estrito, Tailwind 4) substituindo o scaffold Vite, no mesmo repositório | ADR 0001 |
| Páginas Início, Sobre, Experiência, Projetos e Estudo de caso, em `/pt-BR` e `/en` com caminhos traduzidos | 02, seção 5 |
| Tema claro, escuro e sistema, sem flash | 02, seção 7 |
| Filtro por trilha com estado na URL | 03, padrão 10 |
| Oito estudos de caso em MDX, validados com Zod | 04 |
| Paleta de comandos com registro de comandos | 03, padrão 9 |
| Grafo 3D no herói, com três níveis de qualidade e fallback em SVG | ADR 0003 |
| Camada de anotação | 01, capítulo 10 |
| Contato por `mailto:` e botão de copiar | 02, seção 7 |
| Testes de unidade das funções puras e dos schemas | 03 |
| Nova marca "TiagoAlcan" | substitui o logo `t.a;` |

## Fica para depois

| Item | Motivo |
|---|---|
| API em FastAPI (`contact`, `health`, `metrics`) e formulário de contato | Exige provedor de e-mail e chave; o `mailto:` cobre o contato |
| Indicador de status no rodapé consultando o `health` | Depende da API |
| CI com Lighthouse e checagem de termos proibidos | Segunda etapa |
| Testes ponta a ponta com Playwright e axe | Segunda etapa |
| Vídeos dos projetos | Ainda não gravados |
| Currículo em PDF, PT e EN | Lacuna 7 do documento 04 |
| Imagem Open Graph por página | Uma imagem única nesta entrega |

## Mídia nesta entrega

- **Retrato:** não há foto disponível. O círculo do herói usa a nova marca até a foto chegar.
- **Capas:** MoziCash e AWS com Terraform usam as capturas de `capturas-para-validar/`. Os outros seis projetos usam capas SVG geradas com a paleta.
- **Telas de clientes:** nenhuma. Projetos confidenciais mostram painéis recriados com dados fictícios e o aviso do documento 04.

## Conteúdo que precisa da revisão do Tiago

Os textos de processo dos estudos de caso (ato "pesquisa e design") foram escritos só com os fatos dos documentos 00 e 04. Onde os documentos marcam lacuna, o texto é curto de propósito. A lista está no fim do relatório de entrega.

## Entrega

1. Trabalho na branch `feat/portfolio-v1`; cada push gera um preview na Vercel.
2. Depois da validação do preview, merge na `main`, que publica em `tiagoalcan.vercel.app`.
3. O link do repositório no GitHub passa a apontar para `https://tiagoalcan.vercel.app`.
