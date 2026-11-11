# 01 · Design system

## 1. Paleta de origem

Cinco cores, definidas pelo Tiago:

| Nome | Hex | Papel |
|---|---|---|
| Creme | `#F2EDD5` | Fundo do tema claro, texto do tema escuro |
| Vermelho | `#E7390D` | Destaque forte, usado com restrição |
| Laranja | `#F26716` | Cor de ação e destaque principal |
| Verde | `#084A24` | Superfícies do tema escuro, títulos do tema claro |
| Verde profundo | `#04261E` | Fundo do tema escuro, texto do tema claro |

## 2. Contraste medido

Razões de contraste WCAG calculadas para cada par relevante. O mínimo é 4,5 para texto normal e 3,0 para texto grande (a partir de 24 px, ou 18,66 px em negrito) e para componentes de interface.

| Primeiro plano | Fundo | Razão | Texto normal | Texto grande e UI |
|---|---|---|---|---|
| Verde profundo | Creme | 13,72 | Passa | Passa |
| Verde | Creme | 8,86 | Passa | Passa |
| Creme | Verde | 8,86 | Passa | Passa |
| Laranja | Verde profundo | 5,17 | Passa | Passa |
| Verde profundo | Laranja | 5,17 | Passa | Passa |
| Vermelho | Verde profundo | 3,83 | **Falha** | Passa |
| Vermelho | Creme | 3,58 | **Falha** | Passa |
| Creme | Vermelho | 3,58 | **Falha** | Passa |
| Laranja | Verde | 3,34 | **Falha** | Passa |
| Laranja | Creme | 2,65 | **Falha** | **Falha** |
| Vermelho | Verde | 2,48 | **Falha** | **Falha** |

### Regras que saem da tabela

1. **Laranja sobre creme nunca carrega informação.** No tema claro, laranja é só preenchimento de botão (com texto verde profundo por cima) ou decoração.
2. **Vermelho nunca é cor de texto corrido.** Serve para títulos grandes, ícones, bordas e o sublinhado de links.
3. **Botão principal, nos dois temas:** fundo laranja, texto verde profundo (5,17).
4. **Texto creme sobre vermelho é proibido** em tamanho normal.
5. **Vermelho sobre verde e laranja sobre verde em tamanho normal são proibidos.** Em cartões verdes do tema escuro, o texto é creme.
6. **Cor nunca é o único sinal.** Estado (ativo, erro, em andamento) sempre vem com texto ou ícone.

## 3. Tokens semânticos

Os componentes usam apenas tokens semânticos. Nenhum hex aparece fora de `tokens.css`.

| Token | Tema claro | Tema escuro | Uso |
|---|---|---|---|
| `--bg` | Creme | Verde profundo | Fundo da página |
| `--surface` | Creme escurecido 4% | Verde | Cartões, painéis |
| `--surface-inverse` | Verde profundo | Creme | Blocos de destaque invertidos |
| `--text` | Verde profundo | Creme | Texto principal |
| `--text-muted` | Verde profundo a 72% | Creme a 72% | Texto de apoio |
| `--heading` | Verde | Creme | Títulos |
| `--accent` | Vermelho | Laranja | Destaque em texto grande, ícones, sublinhados |
| `--action-bg` | Laranja | Laranja | Fundo do botão principal |
| `--action-text` | Verde profundo | Verde profundo | Texto do botão principal |
| `--border` | Verde profundo a 16% | Creme a 16% | Divisórias |
| `--focus` | Verde | Laranja | Anel de foco |

Os valores com transparência são gerados com `color-mix()` e **precisam ter o contraste medido na implementação**: `--text-muted` tem de ficar em 4,5 ou mais sobre `--bg` e sobre `--surface`. Se não ficar, a porcentagem sobe.

### Cores por trilha

As quatro trilhas não ganham cores novas, porque a paleta só tem cinco. Elas se distinguem por **ícone e rótulo**, e o botão ativo usa `--action-bg`. Isso mantém a identidade e evita depender de cor para diferenciar.

## 4. Tipografia

Proposta inicial, a validar com texto real nas duas línguas (acentos, cedilha, palavras longas em português):

| Papel | Família | Motivo |
|---|---|---|
| Display (títulos) | Fraunces | Serifa com personalidade; combina com a paleta quente e foge do visual padrão de portfólio de dev |
| Texto | Instrument Sans | Sans neutra e legível em tamanhos pequenos |
| Mono | JetBrains Mono | Motivo de terminal: rótulos de seção, métricas, paleta de comandos |
| Manuscrita | Kevin Sans | Só na camada de anotação (capítulo 10): notas de margem, legendas, sticky notes |

Todas são carregadas com `next/font`, com `display: swap` e subconjunto latino, para não causar mudança de layout.

### Escala

Fluida, com `clamp()`, de 375 px a 1440 px de largura.

| Passo | Tamanho | Uso |
|---|---|---|
| `display` | 44 → 88 px | Nome no herói |
| `h1` | 36 → 56 px | Título de página |
| `h2` | 28 → 40 px | Título de seção |
| `h3` | 22 → 28 px | Título de cartão |
| `body-lg` | 18 → 20 px | Parágrafo de abertura |
| `body` | 16 → 17 px | Texto corrido |
| `small` | 14 px | Legendas, metadados |
| `mono-label` | 12 → 13 px, maiúsculas, espaçado | Rótulos de seção |

Largura máxima de linha para texto corrido: 68 caracteres. Altura de linha: 1,6 no corpo e 1,1 em display.

## 5. Espaço, forma e grade

- **Espaçamento**: escala de 4 px (4, 8, 12, 16, 24, 32, 48, 64, 96, 128).
- **Raios**: 8 px em controles, 16 px em cartões, círculo completo no retrato e nos botões de trilha.
- **Grade**: 12 colunas, largura máxima de 1200 px, margem lateral de 16 px no celular e 32 px a partir de 768 px.
- **Breakpoints**: 640, 768, 1024 e 1280 px. O layout é pensado primeiro para 375 px.
- **Sombras**: quase nenhuma. Profundidade vem de contraste entre `--bg` e `--surface` e de bordas finas.

## 6. Componentes

### Primitivos

| Componente | Notas |
|---|---|
| `Button` | Variantes: principal, secundário (contorno), texto. Altura mínima de 44 px |
| `Link` | Sublinhado sempre visível em texto corrido; seta para links externos |
| `Tag` | Tecnologias e trilhas; não é clicável, a menos que seja filtro |
| `Card` | Superfície com borda; a versão clicável tem o cartão inteiro como alvo |
| `ThemeToggle` | Claro, escuro e sistema; `aria-pressed` e rótulo textual |
| `LocaleSwitch` | PT e EN; mantém a página atual ao trocar |
| `MonoLabel` | Rótulo de seção no formato `01 / contexto` |
| `Kbd` | Atalhos de teclado |

### Compostos

| Componente | Notas |
|---|---|
| `SiteHeader` | Marca, navegação, idioma, tema, botão da paleta de comandos. Vira menu em tela pequena |
| `Hero` | Retrato circular, nome, frase, grafo 3D ao fundo |
| `TrackSelector` | Quatro botões circulares; é um grupo de botões de alternância, navegável por teclado |
| `ProjectCard` | Capa, título, uma linha de resultado, trilhas |
| `StatStrip` | Três ou quatro números grandes com legenda |
| `Timeline` | Experiência e formação; lista ordenada semântica |
| `CaseStudy` | `Hero` (vídeo e resumo), `Context`, `Process`, `Result`, `Stack`, `Next` |
| `MetricPanel` | Painel no estilo dashboard: título, valor, série temporal simples |
| `VideoPlayer` | Poster, controles nativos, legendas, sem reprodução automática com som |
| `CommandPalette` | Diálogo modal com busca; foco preso dentro e `Esc` fecha |
| `ContactSection` | E-mail com copiar, links e formulário |
| `SiteFooter` | Links, status do site, crédito |

## 7. Movimento

- **Propósito primeiro.** Animação indica mudança de estado ou orienta o olhar. Nada se move só para decorar texto. As marcas da camada de anotação (capítulo 10) seguem esta regra: elas se desenham para apontar algo, uma única vez.
- **Duração**: 150 a 250 ms em controles; 400 a 600 ms em revelações de seção.
- **Curva**: saída suave (`cubic-bezier(0.22, 1, 0.36, 1)`).
- **Revelação por rolagem**: deslocamento curto (16 px) e opacidade, uma vez por elemento.
- **Transição entre páginas**: a capa do projeto se transforma no topo do estudo de caso (View Transitions), quando o navegador suporta.
- **`prefers-reduced-motion`**: remove revelações e transições de página, troca o grafo 3D por imagem estática e mantém só mudanças de opacidade.

## 8. 3D

O grafo do herói é o único elemento 3D do site.

| Regra | Detalhe |
|---|---|
| Não bloqueia conteúdo | O texto do herói é HTML e aparece antes; o canvas carrega depois, por importação dinâmica |
| Três níveis de qualidade | Alta (desktop), baixa (celular: menos nós, sem pós-processamento), estática (SVG) |
| Quando usar a versão estática | `prefers-reduced-motion`, sem WebGL, economia de dados, ou queda de quadros detectada |
| Pausa | A animação para quando o herói sai da tela ou a aba perde o foco |
| Acessibilidade | O canvas é decorativo (`aria-hidden`); nenhuma informação existe só nele |
| Cores | Lê os tokens do tema; trocar de tema troca o grafo |

## 9. Acessibilidade

Meta: **WCAG 2.2 nível AA** nos dois temas e nos dois idiomas.

- Navegação completa por teclado, com ordem de foco igual à ordem visual.
- Anel de foco visível de 2 px com deslocamento, na cor `--focus`.
- Link "pular para o conteúdo" como primeiro elemento focável.
- Um `h1` por página e hierarquia de títulos sem saltos.
- `lang` correto no `html` (`pt-BR` ou `en`).
- Alvos de toque de pelo menos 44 × 44 px.
- Vídeos com legendas e sem reprodução automática com áudio.
- Formulário com rótulos visíveis, mensagens de erro associadas ao campo e anúncio de sucesso.

## 10. Camada de anotação

O conceito do site é "tornar sistemas visíveis". A camada de anotação é a tradução visual disso: sobre a interface limpa, marcas feitas à mão apontam o que importa, como alguém que rabisca um painel impresso numa revisão de incidente. A interface continua sendo a do capítulo 6; a anotação é uma **segunda voz**, usada com parcimônia.

### Origem

Os componentes vêm do [Looseleaf](https://github.com/kevintngo/looseleaf) (MIT), um registry no formato shadcn: o código é copiado para `src/components/ui/` e passa a ser nosso. Ele desenha tudo em SVG, com animação em CSS, sem biblioteca de movimento. Só entram os componentes listados abaixo; o restante do registry (formulários, menus, blocos) **não** é usado, porque a interface base é própria.

### Componentes de anotação

| Componente | Origem | Onde aparece | Limite |
|---|---|---|---|
| `Underline` | Looseleaf | A palavra "visíveis" no herói; um termo por título de seção | Um por título |
| `Circled` | Looseleaf | O número mais importante de uma faixa de números ou de um estudo de caso | Um por bloco |
| `Highlight` | Looseleaf | Uma frase-chave em texto corrido de estudo de caso | Um por seção |
| `Handwritten note` | Fonte Kevin Sans do Looseleaf | Nota de margem ao lado do número em destaque e legenda das capturas | Só a partir de 1024 px na faixa de números |
| `Tape` | Looseleaf | Fita que prende a capa dos cartões de projeto e as capturas dos estudos de caso, em moldura própria | Inclinação máxima de 2° na moldura |
| `Stamp` | Looseleaf | Estado do projeto: "EM ANDAMENTO", "DADOS FICTÍCIOS" | Sempre com o texto do estado; nunca só o desenho |
| `StickyNote` | Looseleaf | As curiosidades de produção (o `man curiosity` do README) na página Sobre | Até cinco, em grade |
| `Squiggle` | Looseleaf | Divisória entre os três atos do estudo de caso | Substitui a linha reta, não se soma a ela |
| `Typewriter` | Looseleaf | A linha `$ whoami` do herói | Uma vez por visita; texto final já presente no HTML |
| `Marquee` | Looseleaf | Faixa de stack na página inicial | Pausa no foco e no cursor; tem botão de pausa |

### Componentes próprios no mesmo espírito

| Componente | O que é | Onde aparece |
|---|---|---|
| `Sparkline` | Série temporal em SVG, traço único, sem eixos | Dentro do `MetricPanel` e na faixa de números |
| `StatusDot` | Ponto com pulso lento e rótulo textual ("no ar", "em andamento") | Rodapé e cartões |
| `TerminalFrame` | Moldura de janela de terminal com barra de título em mono | Blocos de comando nos estudos de caso |
| `GridBackdrop` | Malha pontilhada sutil, em `--border` | Fundo de seções de destaque e fallback estático do grafo |

### Regras

1. **Tinta vem dos tokens.** A cor de traço é `--accent` (vermelho no claro, laranja no escuro) ou `--text`. Nenhuma cor "de papelaria" do Looseleaf (amarelo marca-texto, azul caneta) entra sem ser remapeada para a paleta. O marca-texto usa laranja a 35% sobre creme e laranja a 30% sobre verde profundo, com o contraste do texto por cima medido.
2. **Papel vem dos tokens.** Molduras e sticky notes usam `--surface` e `--surface-inverse`, não branco puro.
3. **Letra de mão nunca carrega informação sozinha.** A fonte manuscrita (Kevin Sans) aparece só em notas de margem, legendas de capturas e sticky notes, com tamanho mínimo de 18 px. Texto corrido, navegação, botões e números continuam nas três famílias do capítulo 4.
4. **Uma anotação por dobra.** Se duas marcas competem na mesma tela, uma sai. Anotação em tudo é anotação em nada.
5. **Decorativo é decorativo.** Traços, fitas e setas são `aria-hidden`. O texto anotado continua sendo texto real, selecionável e lido normalmente.
6. **Movimento.** As marcas se desenham uma vez ao entrar na tela, em 400 a 600 ms. Com `prefers-reduced-motion`, já aparecem desenhadas. `Typewriter` e `Marquee` ficam estáticos.
7. **Sem JavaScript, nada some.** O conteúdo anotado é HTML do servidor; a marca é acréscimo.
8. **Orçamento.** Kevin Sans é a quarta fonte e a única exceção ao limite de três do system design: carrega com `display: swap`, só o peso regular, e nunca está na primeira dobra como elemento de LCP.

### Convivência com os tokens

O tema do Looseleaf espera os nomes de variável do shadcn (`--background`, `--foreground`, `--primary`…). Eles são definidos em `tokens.css` **como apelidos** dos tokens semânticos do capítulo 3, de modo que a paleta continua tendo uma única fonte. Dois nomes colidem: `--accent` e `--border` têm outro sentido no shadcn. Para evitar ambiguidade, os tokens semânticos do site são expostos ao Tailwind com prefixo próprio (`--color-site-accent`, `--color-site-border`), e os componentes do site usam só esses.

## 11. Tom de voz

| | PT-BR | EN |
|---|---|---|
| Pessoa | Primeira pessoa do singular | First person singular |
| Registro | Direto, sem jargão desnecessário | Direct, plain |
| Verbos | De ação: construí, medi, automatizei | Built, measured, automated |
| Evitar | "Apaixonado por tecnologia", superlativos | "Passionate", "ninja", superlatives |

O inglês **não é tradução literal**. Cada texto é escrito para soar natural no idioma, e termos técnicos ficam como o mercado usa (`deploy`, `dashboard` e `pipeline` não são traduzidos em português).
