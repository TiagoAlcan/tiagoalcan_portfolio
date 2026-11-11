# ADR 0002 · next-intl para os idiomas

- **Status:** aceito
- **Data:** 2026-11-11

## Contexto

O site precisa existir em PT-BR e EN, com URLs próprias para cada idioma (bom para SEO e para compartilhar), troca de idioma que mantém a página atual e caminhos traduzidos (`/sobre` e `/about`).

O App Router do Next.js não traz internacionalização pronta. As alternativas eram escrever a solução à mão com um segmento `[locale]` ou usar uma biblioteca.

## Decisão

Usar **`next-intl`**, com prefixo de idioma sempre presente na URL (`/pt-BR/...` e `/en/...`) e caminhos localizados.

## Motivos

- Funciona com Server Components e geração estática.
- Resolve caminhos traduzidos, `hreflang`, formatação de datas e números e plurais.
- Mensagens tipadas: uma chave ausente vira erro de compilação.

## Consequências

- Textos de interface ficam em `messages/pt-BR.json` e `messages/en.json`. Nenhum texto literal em componente.
- Conteúdo longo (estudos de caso) fica em MDX, um arquivo por idioma, e não nos arquivos de mensagens.
- PT-BR é o idioma padrão quando o navegador não indica preferência.
- A raiz `/` passa por um redirecionamento, que precisa ser considerado nos testes e no sitemap.
