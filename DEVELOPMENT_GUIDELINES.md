# Regras de Desenvolvimento - Ruptura Final

Este documento define os padrões técnicos e de infraestrutura para este projeto. Siga estas diretrizes em cada interação.

---

## 🛠 1. Tecnologias Core
*   **Frontend**: React + Vite + TypeScript.
*   **Estilização**: Tailwind CSS (utilizar apenas classes utilitárias, evitar CSS externo).
*   **Componentes UI**: Shadcn/UI via MCP do Shadcn para criação de componentes e elementos.
*   **Animações**: Framer Motion (para transições dinâmicas e efeitos de scroll).
*   **Smooth Scroll**: Lenis (https://github.com/darkroomengineering/lenis/blob/main/README.md).
*   **Icons**: Flaticon - `npm i @flaticon/flaticon-uicons`.
*   **Tipografia**: Fonte **North Bay Grotesk** Para títulos. Para fonte de corpo utilize a skill específica para a escolha de uma fonte que não seja tão padrão.

---

## 🎨 2. Identidade Visual

*   **Paleta principal**:
    *   Background: preto não-puro (ex: `#0A0A0A` ou `#111111`)
    *   Primary / Highlights: laranja (`#fc4612`)
    *   Texto: branco
*   **Estética**: Moderna, profissional e premium. Dark com energia e autoridade.
*   **Botões (CTAs)**: Bordas sem arredondamento, texto em maiúsculo. Cor primária laranja.
*   **Tipografia**: Bold para títulos; regular para corpo; palavras-chave de gatilho em bold.

---

## 📁 3. Estrutura de Pastas e Caminhos
*   `/src/components/sections`: Componentes de seções inteiras da página (LP-style).
*   `/src/components/ui`: Componentes atômicos e reutilizáveis (botões, cards, inputs, form).
*   `/public/assets`: TODAS as imagens, ícones e arquivos estáticos.
*   **Caminhos de Assets**: Sempre use caminhos relativos sem a barra inicial para garantir compatibilidade (ex: `src="assets/foto.webp"` em vez de `src="/assets/foto.webp"`).
*   **Assets esperados no projeto** (serão fornecidos pelo cliente via Drive):
    *   `public/assets/marcelo-hero.webp` — Foto principal de Marcelo Toledo (hero)
    *   `public/assets/marcelo-secondary.webp` — Foto secundária (se aplicável)
    *   `public/assets/logo-nd.svg` (ou `.webp`) — Logo da Nova Dimensão, usado no rodapé

---

## 🚀 4. Deploy e Produção (Vercel)
O projeto é publicado na **Vercel**. Mantenha os seguintes padrões:
*   **`vercel.json`**: Arquivo na raiz com rewrite para SPA (`"source": "/(.*)"` → `"/index.html"`).
*   **Build command**: `vite build` (detectado automaticamente pela Vercel).
*   **Output dir**: `dist` (padrão do Vite).
*   **Variáveis de ambiente**: Configuradas no painel da Vercel quando necessário (integração do formulário).
*   Não há Dockerfile, build.sh ou configuração de servidor.

---

## 📝 5. Git e Fluxo de Trabalho
*   **Commits**: Frequentes e descritivos em português (ex: `feat: adiciona seção FAQ`, `fix: alinhamento mobile hero`).
*   **SEO & Social**: O arquivo `index.html` deve sempre conter meta tags de título, descrição e `og:image`.
*   **Simplicidade**: Mantenha o código limpo, evite bibliotecas pesadas desnecessárias.

---

## 🎯 6. Regras de Negócio

*   **Objetivo**: Landing page de captação de leads para Marcelo Toledo.
*   **Formulário do Hero**: Campos — Nome, E-Mail, WhatsApp. Ao submeter, redirecionar para a página de agradecimento (a ser desenvolvida). Integração de dados a definir posteriormente.
*   **CTAs secundários**: Todos os botões fora do formulário devem ancorar para a seção Hero (`#hero`) para incentivar o preenchimento do form.
*   **Mobile-First**: Prioridade de validação e refinamento é sempre a experiência mobile.
*   **Responsividade**: Usar classes utilitárias do Tailwind. Em desktop (base 1920px), converter medidas para `vw`. Em mobile, usar `px` centralizando e justificando elementos ao centro.
*   **Performance**: Site rápido e leve. Evitar bibliotecas pesadas e imagens não otimizadas.
*   **SEO**: Boas práticas + meta tags completas.
*   **Acessibilidade**: Boas práticas de acessibilidade aplicadas.
*   **KISS / DRY / YAGNI**: Código simples, sem repetição, sem funcionalidades desnecessárias.
*   **Separation of Concerns**: Componentes reutilizáveis, código organizado.

---

## 🧪 7. Hero — Variantes de Teste (A/B)

O Hero possui **3 versões de teste** que variam apenas em **Headline** e **Subtítulo**. O layout, formulário e demais elementos são idênticos entre as versões.

O controle é feito por uma **constante no código** (`HERO_VARIANT: 1 | 2 | 3`) localizada em `src/config/hero.ts`. Para alternar a versão exibida, basta mudar o valor dessa constante.

```ts
// src/config/hero.ts
export const HERO_VARIANT: 1 | 2 | 3 = 1;
```

> ✏️ Os copies de cada variante serão fornecidos pelo cliente e inseridos em `src/config/hero.ts` junto com a constante de controle.

---

## 📄 8. Estrutura e Conteúdo da Landing Page

A landing page é composta por **5 seções + rodapé**:

---

### Seção 1 — Hero (com variantes A/B)

*   **Layout**: Duas colunas em desktop, coluna única em mobile.
*   **Coluna Esquerda** (todo o conteúdo alinhado à esquerda):
    *   Pill "07 DE MAIO | AO VIVO, ONLINE E GRATUITO" (com ícones contextuais)
    *   Headline (variável por `HERO_VARIANT`)
    *   Subtítulo (variável por `HERO_VARIANT`)
    *   Formulário: campos Nome, E-Mail (com validador), WhatsApp (máscara `(00) 00000-0000`)
    *   CTA: **GARANTIR MINHA VAGA NA RUPTURA FINAL**
    *   Disclaimer abaixo do CTA: *Acesso 100% gratuito. Seus dados não serão compartilhados com terceiros.*
*   **Coluna Direita**: Foto de Marcelo Toledo (`public/assets/marcelo-hero.webp`) ocupando 100% da altura da seção, sem cortes.
*   **ID da seção**: `id="hero"` — todos os CTAs da página ancoram aqui.

#### Copies das 3 Variantes (`src/config/hero.ts`)

**V1**
> **Headline:** Sua motivação dá início às mudanças. Sua estrutura interna explica porque você não continua.
> **Subtítulo:** Um hábito leva em média 3 meses para se formar. A maioria desiste antes de 30 dias porque constroem comportamentos sobre emoção em vez de estrutura. Na **Ruptura Final** te mostro o caminho para sair desse ciclo de vez.

**V2**
> **Headline:** O que você faz quando ninguém está olhando é a única prova de quem você é.
> **Subtítulo:** Este é um chamado para você que está disposto a esculpir sua melhor versão com **disciplina, autoconhecimento e desconforto intencional!**

**V3**
> **Headline:** Você não está esperando o momento certo. Está evitando o custo de mudar.
> **Subtítulo:** Cada ciclo que você repete tem um preço que é cobrado todos os dias. Na **Ruptura Final**, você descobre o que está na raiz desse padrão e como interrompê-lo de vez.

---

### Seção 2 — Por Que

*   **Layout**: Conteúdo centralizado e justificado ao centro.
*   **Título**: +30 milhões de **pessoas impactadas** mensalmente com reflexões para repensar sua forma de viver: **Chegou a hora da sua Ruptura Final!**
*   **Subtítulo / Corpo**:

> Depois de mergulhar no gelo por mais de 550 dias, eu validei algo que muitas pessoas levam anos para entender:
>
> **"Motivação não sustenta mudança.** Cada decisão adiada tem um **custo muito alto** e seus comportamentos mostram o **porquê você ainda não é quem você quer ser!"**
>
> Só que a banheira de gelo foi o MEU CAMINHO. Para encontrar o seu você precisa romper com as amarras invisíveis que ainda te prendem na vida mediana.
>
> E nesse encontro, eu quero te mostrar como encontrar o seu caminho e despertar a **melhor versão** que existe dentro de você. Sem motivação barata e sem atalhos que não te levam a lugar nenhum.

---

### Seção 3 — Mecanismo

*   **Layout**: Conteúdo alinhado à direita da página; textos justificados à esquerda. Boxes posicionados um abaixo do outro. Depois será inserida imagem de background.
*   **Título**: Na **Ruptura Final** você entende o mecanismo e como ajustar as engrenagens.
*   **Subtítulo**: Uma imersão online que vai pôr em "xeque" quem você almeja ser:
*   **Box 1** *(ícone contextual)*: Entenda a diferença crucial entre **buscar um resultado e cultivar um padrão**, e por que somente o segundo está sob seu controle efetivo;
*   **Box 2** *(ícone contextual)*: A chave para a mudança: por que tentar mudar o comportamento é **ineficaz sem antes transformar** a sua auto imagem (quem você acredita ser);
*   **Box 3** *(ícone contextual)*: Os aprendizados sobre constância revelados por **500 dias ininterruptos** de desconforto intencional.
*   **Disclaimer** *(dentro de box com cor sutilmente destacada)*: "A disciplina, a resiliência, o confronto e o desconforto tem o poder de mudar sua vida, seus resultados e todas as áreas da sua vida."
*   **CTA**: GARANTIR MINHA VAGA NA IMERSÃO → ancora para `#hero`

---

### Seção 4 — Sobre

*   **Layout**: Conteúdo alinhado à direita; textos justificados à esquerda. Lado esquerdo reservado para foto de Marcelo (`public/assets/marcelo-secondary.webp`) — inserção posterior.
*   **Título** *(citação)*: "Todo dia eu preciso provar para mim mesmo que ainda sou capaz de fazer o que é difícil."
*   **Subtítulo**: Quem está por trás da imersão "Ruptura Final"?
*   **Corpo**:

> O que eu falo não veio de uma vida que sempre funcionou. Fui atleta, programador, empreendedor. Quebrei. Passei por separação, por falência, por momentos em que precisei decidir quem eu queria ser quando tudo havia desmoronado.
>
> Fui sócio e diretor de engenharia no Nubank. Escrevi livros que chegaram às listas de bestseller. Tenho 1,7 milhão de seguidores. Nada disso veio antes da queda, tudo veio depois, porque parei de buscar motivação e aprendi a construir estrutura.
>
> Todo dia de manhã eu entro na banheira de gelo. 550 dias consecutivos. Não por hype. Porque existe uma pergunta que precisa ser respondida antes de qualquer outra: **você ainda consegue fazer o que é difícil quando não quer?** A banheira é o laboratório. Quem aprende a não negociar com o desconforto físico para de negociar com o desconforto da mudança.
>
> Eu sei o que é reconstruir do zero. E sei o que separa quem reconstrói de quem repete o ciclo. Na Ruptura Final, vou mostrar esse mecanismo.

*   **CTA**: ME INSCREVER NA RUPTURA FINAL → ancora para `#hero`

---

### Seção 5 — FAQ

*   **Layout**: Conteúdo centralizado na página. FAQ minimalista e funcional (accordion).
*   **Título**: Perguntas Frequentes

**P1:** Este evento é pago?
> Não. A Ruptura Final é um evento 100% gratuito por um único motivo: Queremos despertar o maior número de pessoas que conseguirmos.
>
> Para garantir uma vaga e não perder absolutamente nada sobre o evento (materiais complementares, avisos sobre a live e o link da imersão ao vivo que acontecerá no dia 07 de maio, é preciso que você se inscreva nesta página e entre para o GRUPO VIP do WhatsApp!

**P2:** Preciso ter feito algo antes para assistir?
> Não. A live é aberta para qualquer pessoa que quer entender o mecanismo por trás da mudança de comportamento. Nenhum conhecimento prévio é necessário.
>
> O objetivo é transformar vidas, construir homens e mulheres mais corajosos, disciplinados, focados, determinados e felizes!

**P3:** Por que preciso me inscrever se é gratuita?
> O link de acesso aos materiais de apoio da live e a transmissão ao vivo só será enviado para quem se inscrever (e entrar no GRUPO VIP DO WHATSAPP).

---

### Rodapé

*   **Texto de copyright**: © 2026 Marcelo Toledo | marcelotoledo.com — Todos os dados coletados são usados exclusivamente para envio do acesso à live e comunicações relacionadas ao evento.
*   **Crédito**: Desenvolvido por: **Nova Dimensão** — texto "Nova Dimensão" em bold, com link para `https://escala.novadimensaohub.com.br`.

---

## 9. Dados e Placeholders

*   **Fotos**: Disponíveis via Drive — serão baixadas e adicionadas em `public/assets/` antes do desenvolvimento das seções visuais.
*   **Link de obrigado**: URL da página de agradecimento a definir (usar `/obrigado` como placeholder).
*   **Integração do formulário**: Ferramenta/destino dos dados a definir posteriormente.
*   **Paleta exata**: Tokens de cor a refinar com o cliente.
