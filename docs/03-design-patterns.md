# 03 · Design patterns

Padrões de código adotados no portfólio. Cada um traz o problema que resolve, a regra e um exemplo curto. Os exemplos são ilustrativos; nomes e assinaturas finais são definidos na implementação.

## Resumo

| # | Padrão | Onde se aplica |
|---|---|---|
| 1 | Server Components por padrão, ilhas de cliente | Todas as páginas |
| 2 | Conteúdo como dados tipados | `content/` e `src/lib/content/` |
| 3 | Repositório de conteúdo | Acesso a projetos, experiência, formação |
| 4 | Componentes compostos | Estudo de caso |
| 5 | Strategy para qualidade do 3D | Grafo do herói |
| 6 | Melhoria progressiva | Filtro, formulário, 3D, paleta de comandos |
| 7 | Tokens semânticos | Todo o CSS |
| 8 | Adaptador para serviços externos | Envio de e-mail na API |
| 9 | Registro de comandos | Paleta de comandos |
| 10 | Estado na URL | Filtro por trilha |

---

## 1. Server Components por padrão, ilhas de cliente

**Problema.** Marcar tudo como componente de cliente envia JavaScript desnecessário e piora o carregamento.

**Regra.** Todo componente é de servidor, a menos que precise de estado, efeito ou API do navegador. `"use client"` fica na **folha** da árvore, nunca em layouts ou páginas.

**Ilhas permitidas:** `ThemeToggle`, `LocaleSwitch`, `TrackSelector`, `CommandPalette`, `ContactForm`, `HeroGraph`, `VideoPlayer`.

```tsx
// Página: servidor. Busca conteúdo e renderiza HTML.
export default async function HomePage({ params }: Props) {
  const { locale } = await params;
  const projects = await getFeaturedProjects(locale);
  return (
    <>
      <Hero />
      <TrackSelector />            {/* ilha de cliente */}
      <ProjectGrid projects={projects} />
    </>
  );
}
```

**Sinal de alerta:** um `"use client"` em arquivo de `app/`.

## 2. Conteúdo como dados tipados

**Problema.** Conteúdo solto em JSX ou em MDX sem validação quebra em silêncio: um campo esquecido só aparece em produção.

**Regra.** Todo conteúdo tem um schema Zod. O build falha se um campo obrigatório faltar ou se um projeto não tiver os dois idiomas.

```ts
export const projectSchema = z.object({
  title: z.string().min(1),
  summary: z.string().max(180),
  tracks: z.array(z.enum(["software", "devops", "data", "ai"])).min(1),
  status: z.enum(["done", "in-progress"]),
  role: z.string(),
  stack: z.array(z.string()),
  featured: z.boolean().default(false),
  order: z.number().int(),
  video: z.object({ src: z.string(), poster: z.string(), captions: z.string() }).optional(),
  links: z.array(z.object({ label: z.string(), href: z.string().url() })).default([]),
});

export type Project = z.infer<typeof projectSchema>;
```

O tipo TypeScript sai do schema. Não existe interface escrita à mão em paralelo.

## 3. Repositório de conteúdo

**Problema.** Se as páginas lerem arquivos diretamente, trocar a origem do conteúdo (por exemplo, para um CMS) exige mexer em todas elas.

**Regra.** Páginas e componentes só acessam conteúdo por funções de `src/lib/content/`. Só esse módulo sabe que existe um sistema de arquivos e MDX.

```ts
export async function getProjects(locale: Locale): Promise<Project[]>;
export async function getFeaturedProjects(locale: Locale): Promise<Project[]>;
export async function getProject(slug: string, locale: Locale): Promise<ProjectWithBody | null>;
export async function getExperience(locale: Locale): Promise<ExperienceEntry[]>;
export async function getEducation(locale: Locale): Promise<EducationEntry[]>;
```

**Consequência.** Os testes de página usam um repositório falso em memória.

## 4. Componentes compostos

**Problema.** Um componente `CaseStudy` com vinte props fica rígido, e cada projeto tem pesos diferentes entre contexto, processo e resultado.

**Regra.** O estudo de caso é montado com subcomponentes. O autor escolhe, no MDX, quais usar e em que ordem; a estrutura visual e semântica vem pronta.

```mdx
<CaseStudy.Context>
  O sistema autorizava mais de 1 milhão de transações por dia...
</CaseStudy.Context>

<CaseStudy.Process>
  <CaseStudy.Step title="Protótipo em papel">...</CaseStudy.Step>
  <CaseStudy.Step title="Primeira versão com dados reais">...</CaseStudy.Step>
</CaseStudy.Process>

<CaseStudy.Result>
  <MetricPanel label="Transações por dia" value="1M+" />
</CaseStudy.Result>
```

Cada subcomponente renderiza uma `section` com título, rótulo numerado (`01 / contexto`) e âncora.

## 5. Strategy para qualidade do 3D

**Problema.** O mesmo grafo que roda bem em desktop trava um celular intermediário, e algumas pessoas não querem animação.

**Regra.** Uma função decide o nível de qualidade; o componente só recebe a decisão.

```ts
type Tier = "high" | "low" | "static";

export function pickTier(env: {
  reducedMotion: boolean;
  webgl: boolean;
  saveData: boolean;
  cores: number;
  coarsePointer: boolean;
}): Tier {
  if (env.reducedMotion || !env.webgl || env.saveData) return "static";
  if (env.coarsePointer || env.cores <= 4) return "low";
  return "high";
}
```

| Nível | Comportamento |
|---|---|
| `high` | Grafo completo, partículas, resposta ao cursor |
| `low` | Menos nós e partículas, sem pós-processamento, taxa de quadros limitada |
| `static` | SVG pré-renderizado, sem carregar a biblioteca 3D |

`pickTier` é função pura e tem teste de unidade para cada combinação.

## 6. Melhoria progressiva

**Problema.** Um site que depende de JavaScript para mostrar conteúdo falha para leitores de tela mal suportados, conexões ruins e indexadores.

**Regra.** O HTML entregue pelo servidor já contém tudo. JavaScript só acrescenta conforto.

| Recurso | Sem JavaScript | Com JavaScript |
|---|---|---|
| Filtro por trilha | Links para `?trilha=devops`, resolvidos no servidor | Filtra sem recarregar |
| Formulário de contato | `mailto:` sempre visível | Envio com validação e confirmação |
| Grafo 3D | Imagem estática | Canvas animado |
| Paleta de comandos | Menu de navegação normal | Atalho `Ctrl+K` |
| Tema | Segue o sistema por CSS (`prefers-color-scheme`) | Escolha manual lembrada |

## 7. Tokens semânticos

**Problema.** Hex espalhado em componentes torna o tema escuro frágil e quebra o contraste sem ninguém perceber.

**Regra.** Componentes usam só tokens semânticos (`--bg`, `--text`, `--accent`). Os cinco hex da paleta aparecem uma única vez, em `tokens.css`. Uma regra de lint proíbe cor literal fora desse arquivo.

```css
:root {
  --cream: #f2edd5;
  --deep: #04261e;
  --bg: var(--cream);
  --text: var(--deep);
}
[data-theme="dark"] {
  --bg: var(--deep);
  --text: var(--cream);
}
```

## 8. Adaptador para serviços externos

**Problema.** Chamar o provedor de e-mail direto do endpoint prende a API a um fornecedor e dificulta o teste.

**Regra.** O endpoint depende de uma interface. A implementação real e a de teste são trocadas por injeção de dependência do FastAPI.

```python
class Mailer(Protocol):
    async def send(self, message: ContactMessage) -> None: ...

@router.post("/contact", status_code=202)
async def contact(payload: ContactIn, mailer: Mailer = Depends(get_mailer)) -> None:
    await mailer.send(payload.to_message())
```

Nos testes, `get_mailer` devolve um objeto que só guarda as mensagens em uma lista.

## 9. Registro de comandos

**Problema.** Uma paleta de comandos com `if` para cada ação cresce sem controle e esquece traduções.

**Regra.** Cada comando é um objeto registrado em uma lista. A paleta só percorre a lista.

```ts
type Command = {
  id: string;
  labelKey: string;          // chave de tradução
  keywords: string[];
  run: (ctx: CommandContext) => void;
};

export const commands: Command[] = [
  { id: "go-projects", labelKey: "cmd.goProjects", keywords: ["projetos", "projects"], run: (c) => c.navigate("/projects") },
  { id: "toggle-theme", labelKey: "cmd.toggleTheme", keywords: ["tema", "theme", "dark"], run: (c) => c.toggleTheme() },
  { id: "copy-email", labelKey: "cmd.copyEmail", keywords: ["email", "contato"], run: (c) => c.copy(EMAIL) },
];
```

Adicionar um comando é acrescentar um item à lista e uma chave nas mensagens.

## 10. Estado na URL

**Problema.** Um filtro guardado só em estado de componente se perde ao recarregar e não pode ser compartilhado.

**Regra.** O filtro de trilha vive no parâmetro de busca (`?trilha=data`). Isso permite enviar a alguém o link já filtrado, funciona sem JavaScript e mantém o botão "voltar" coerente.

---

## Convenções gerais

| Tema | Convenção |
|---|---|
| Nomes | Componentes em `PascalCase`, arquivos de componente com o mesmo nome; funções e variáveis em `camelCase` |
| Idioma do código | Inglês em código e commits; português nos documentos e no conteúdo PT |
| Textos de interface | Nunca literais em componentes; sempre chave em `messages/` |
| Imports | Alias `@/` para `src/`; sem caminhos relativos longos |
| Erros | Página `not-found` e `error` por idioma, com link para o início |
| Testes | Unidade para funções puras e schemas; ponta a ponta para fluxos (trocar idioma, tema, filtrar, enviar contato) |
| Acessibilidade | Todo componente interativo tem teste com axe |
| Commits | Conventional Commits |

## O que evitar

- Biblioteca de estado global. O site não tem estado compartilhado que justifique.
- Buscar dados no cliente para conteúdo que já existe no build.
- Animação controlada por JavaScript quando CSS resolve.
- Componentes "genéricos" criados antes de existir um segundo uso.
