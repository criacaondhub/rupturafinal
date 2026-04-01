export const HERO_VARIANT: 1 | 2 | 3 = 1;

type Part = { text: string; bold?: boolean };

interface HeroContent {
  headline: string;
  subtitle: Part[];
  subtitleMobile?: Part[];
}

export const heroVariants: Record<1 | 2 | 3, HeroContent> = {
  1: {
    headline: 'Sua motivação dá início às mudanças. Sua estrutura interna explica porque você não continua.',
    subtitle: [
      { text: 'Um hábito leva em média 3 meses para se formar. A maioria desiste antes de 30 dias porque constroem comportamentos sobre emoção em vez de estrutura. Na ' },
      { text: 'Ruptura Final', bold: true },
      { text: ' te mostro o caminho para sair desse ciclo de vez.' },
    ],
    subtitleMobile: [
      { text: 'A maioria desiste antes de 30 dias porque constroem comportamentos sobre emoção em vez de estrutura. Na ' },
      { text: 'Ruptura Final', bold: true },
      { text: ' te mostro o caminho para sair desse ciclo de vez.' },
    ],
  },
  2: {
    headline: 'O que você faz quando ninguém está olhando é a única prova de quem você é.',
    subtitle: [
      { text: 'Este é um chamado para você que está disposto a esculpir sua melhor versão com ' },
      { text: 'disciplina, autoconhecimento e desconforto intencional!', bold: true },
    ],
  },
  3: {
    headline: 'Você não está esperando o momento certo. Está evitando o custo de mudar.',
    subtitle: [
      { text: 'Cada ciclo que você repete tem um preço que é cobrado todos os dias. Na ' },
      { text: 'Ruptura Final', bold: true },
      { text: ', você descobre o que está na raiz desse padrão e como interrompê-lo de vez.' },
    ],
  },
};
