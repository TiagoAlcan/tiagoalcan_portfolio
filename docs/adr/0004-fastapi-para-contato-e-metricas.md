# ADR 0004 · FastAPI para contato e métricas

- **Status:** aceito, com um ponto a verificar na implementação
- **Data:** 2026-11-11

## Contexto

O site precisa de pouco backend: receber o formulário de contato e expor um estado de saúde. O Tiago definiu que, havendo backend, a linguagem é **Python**.

A alternativa mais simples seria um Route Handler do próprio Next.js, em TypeScript. Ela foi descartada pela restrição de linguagem e porque Python com FastAPI é relevante para as trilhas de dados e AI.

## Decisão

Uma **API pequena em FastAPI**, com três endpoints: `POST /api/contact`, `GET /api/health` e `GET /api/metrics`.

## Motivos

- Atende à restrição de linguagem.
- Pydantic dá validação e documentação OpenAPI sem esforço extra.
- O Tiago já usa FastAPI no MoziCash.

## Consequências

- O repositório passa a ter duas linguagens e dois conjuntos de dependências. O CI precisa testar as duas.
- O envio de e-mail fica atrás de uma interface, para trocar de provedor e para testar (ver [design patterns](../03-design-patterns.md), padrão 8).
- O link `mailto:` continua sempre visível, de modo que uma falha na API não impede o contato.

## Limites conhecidos

- **Sem estado entre chamadas.** Em ambiente serverless, contadores em memória se perdem. `/api/metrics` começa expondo apenas informação de build e o resultado do `health`. Contadores reais exigiriam um armazenamento externo e ficam para depois.
- **Limite de taxa.** Pelo mesmo motivo, o limite de requisições é aplicado na borda da hospedagem, e não dentro da função.

## A verificar antes de implementar

A forma de hospedar funções Python ao lado de uma aplicação Next.js muda entre versões da plataforma. Antes de escrever a API, conferir a documentação atual da Vercel e registrar aqui a configuração adotada. Se a convivência no mesmo projeto se mostrar frágil, a API vai para um projeto separado, sem alterar o contrato dos endpoints.
