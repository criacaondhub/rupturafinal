export const HERO_VARIANT: 1 | 2 | 3 = 1;

type Part = { text: string; bold?: boolean; primary?: boolean };

interface HeroContent {
  headline: Part[];
  subtitle: Part[];
  subtitleMobile?: Part[];
}

export const heroVariants: Record<1 | 2 | 3, HeroContent> = {
  1: {
    headline: [
      { text: 'Motivação dá início às mudanças.', primary: true },
      { text: ' Estrutura interna te faz desistir.' },
    ],
    subtitle: [
      { text: 'A maioria das pessoas ' },
      { text: 'desistem', bold: true },
      { text: ' de construir bons hábitos porque constroem comportamentos sobre ' },
      { text: 'emoções.', bold: true },
      { text: ' Na ' },
      { text: 'Ruptura Final', bold: true },
      { text: ' te mostro o caminho para sair desse ciclo de vez e se transformar em uma pessoa altamente disciplinada!' },
    ],
  },
  2: {
    headline: [
      { text: 'O que você faz quando ninguém está olhando é a ' },
      { text: 'única prova de quem você é.', primary: true },
    ],
    subtitle: [
      { text: 'Mais que um evento, isso é um ' },
      { text: 'chamado', bold: true },
      { text: ' para você que está disposto a ' },
      { text: 'esculpir sua melhor versão com disciplina e autoconhecimento.', bold: true },
      { text: ' Chegou a sua hora de mudar!' },
    ],
  },
  3: {
    headline: [
      { text: 'Você não está esperando o momento certo. ' },
      { text: 'Está evitando o custo de mudar.', primary: true },
    ],
    subtitle: [
      { text: 'Cada ciclo que você repete tem um preço que é cobrado todos os dias. Na ' },
      { text: 'Ruptura Final', bold: true },
      { text: ', você descobre o que está na raiz desse padrão e como interrompê-lo de vez. ' },
      { text: 'Transforme desculpas em resultado e construa a melhor versão de si mesmo(a)!', bold: true },
    ],
  },
};
