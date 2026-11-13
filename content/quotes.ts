import type { Localized } from "./site";

export type Quote = { text: Localized; author: string };

/** Lines from people who shaped computing. The footer shows one at a time and moves on every 30 minutes. */
export const quotes: Quote[] = [
  {
    text: {
      "pt-BR": "Programas devem ser escritos para pessoas lerem e, só por acaso, para máquinas executarem.",
      en: "Programs must be written for people to read, and only incidentally for machines to execute.",
    },
    author: "Abelson & Sussman",
  },
  {
    text: { "pt-BR": "Simplicidade é pré-requisito para confiabilidade.", en: "Simplicity is prerequisite for reliability." },
    author: "Edsger W. Dijkstra",
  },
  {
    text: {
      "pt-BR": "Só conseguimos enxergar um pouco à frente, mas já dá para ver muita coisa que precisa ser feita.",
      en: "We can only see a short distance ahead, but we can see plenty there that needs to be done.",
    },
    author: "Alan Turing",
  },
  {
    text: { "pt-BR": "Otimização prematura é a raiz de todo mal.", en: "Premature optimization is the root of all evil." },
    author: "Donald Knuth",
  },
  {
    text: {
      "pt-BR": "A Máquina Analítica tece padrões algébricos assim como o tear de Jacquard tece flores e folhas.",
      en: "The Analytical Engine weaves algebraical patterns just as the Jacquard loom weaves flowers and leaves.",
    },
    author: "Ada Lovelace",
  },
  {
    text: { "pt-BR": "Controlar a complexidade é a essência da programação.", en: "Controlling complexity is the essence of computer programming." },
    author: "Brian Kernighan",
  },
  {
    text: { "pt-BR": "A melhor maneira de prever o futuro é inventá-lo.", en: "The best way to predict the future is to invent it." },
    author: "Alan Kay",
  },
  {
    text: {
      "pt-BR": "Só existem duas coisas difíceis em ciência da computação: invalidar cache e dar nome às coisas.",
      en: "There are only two hard things in computer science: cache invalidation and naming things.",
    },
    author: "Phil Karlton",
  },
  {
    text: { "pt-BR": "O propósito da computação é a compreensão, não os números.", en: "The purpose of computing is insight, not numbers." },
    author: "Richard Hamming",
  },
  {
    text: { "pt-BR": "Faça funcionar, faça direito, faça rápido.", en: "Make it work, make it right, make it fast." },
    author: "Kent Beck",
  },
  {
    text: {
      "pt-BR": "Qualquer tolo escreve código que um computador entende. Bons programadores escrevem código que pessoas entendem.",
      en: "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
    },
    author: "Martin Fowler",
  },
  {
    text: {
      "pt-BR": "Todo sistema complexo que funciona evoluiu de um sistema simples que funcionava.",
      en: "A complex system that works is invariably found to have evolved from a simple system that worked.",
    },
    author: "John Gall",
  },
];
