# CAMPUS — ART BIBLE V1.1

**Identidade visual, linguagem de mundo e critérios de produção artística**\
**Documento:** `docs/ART-BIBLE-V1.1.md`\
**Versão:** 1.1 — revisão de direção visual da Etapa A (A-01.2)\
**Data:** 14/11/2026\
**Status:** **A-01 CONCLUÍDA E HOMOLOGADA — AB-3: CAMPUS VIVO**\
**Escopo:** direção artística e especificação de assets; **não** autoriza instalação, edição do jogo ou integração no branch principal.

> **Direção central após a revisão:** O Campus deve parecer um RPG 2D autoral e refinado, mas funcionar como uma escola virtual moderna. A qualidade virá de arquitetura clean, natureza cuidadosamente editada, profundidade espacial, composição legível e interações significativas — **não de maximizar a quantidade de árvores, flores, partículas e ornamentos**. O refinamento será visual e estrutural, sem presumir ganho de FPS apenas por reduzir decoração.

## Sumário executivo da revisão A-01.2 e da homologação

O responsável aprovou a paleta **em princípio** e confirmou a preferência pela **combinação A + B**: natureza cinematográfica **disciplinada por** arquitetura contemporânea, geometria navegável e baixa poluição visual. O caminho C — iluminação narrativa, mudanças de horário, Natal e eventos — **não foi rejeitado**; permanece no repertório de variantes e marcos futuros.

A imagem anteriormente aprovada é uma referência válida de acabamento, mas não mais a meta de **densidade visual**. A imagem refinada também não deve ser reproduzida literalmente: ela orienta composição e não determina o mapa final ou a proporção final dos avatares. A página 1 do PDF enviado pelo responsável, `versao refinada do que quero.pdf`, passa a ser a **referência comparativa prioritária de composição** para a primeira área. É uma imagem conceitual; não comprova modularidade, eficiência técnica, colisões nem FPS.

**Decisões e parâmetros desta revisão:**

| Tema | Direção após o feedback | Grau de fechamento |
|---|---|---|
| Identidade principal | AB-3 — Campus Vivo: AB-1 como base de clareza e estrutura, AB-2 como complemento orgânico | **Direção artística homologada** |
| Caminho C | Preservado para atmosfera, sazonais, narrativa e eventos | **Visão mantida; execução futura** |
| Imagem densa anterior | Referência de acabamento, paleta e detalhes pontuais; não modelo de densidade | **Reinterpretada por feedback explícito** |
| PDF refinado, página 1 | Melhor referência atual de hierarquia, respiro e clareza de acesso | **Referência aprovada como direção, não asset final** |
| Paleta de V1 | Preservada como base candidata, com uso mais comedido de acentos e saturação | **Aceite parcial; hex ainda não homologados** |
| Pipeline | Direção → geração de assets → revisão de pixels → Tiled → Phaser → teste | **Inalterado** |
| Engine e navegação | Phaser 3.90.0, TypeScript, WebGL, grade lógica inicial 16 px | **Inalterados** |
| Qualidade e velocidade | Avaliar composição e desempenho separadamente | **Critério obrigatório** |

**Princípio de produto:** um universo interessante deve ser rico em **possibilidades exploráveis** (lugares opcionais, pistas, personagens, aulas práticas e descobertas) e não necessariamente rico em **decoração simultaneamente visível**.

---

## 0. Fontes, precedência e limites desta revisão

Esta Art Bible **operacionaliza** o cânone visual e pedagógico já adotado, sem substituí-lo. Fontes de verdade consultadas:

1. `refs canones/CANONE-VISUAL-E-UNIVERSO-PEDAGOGICO.md` (localização **verificada na `main`** em 14/11/2026).
2. `docs/PLANO-CANONICO-INTEGRAL.md` e `PLANO-CONGELADO.md`.
3. `docs/CONTEXTO-PORTATIL.md`, `docs/ASSETS.md`, `docs/CENARIO-V1.md` e `AGENTS.md`.
4. Implementação existente: `src/main.ts`, `src/scene.ts`, `src/modular-scene.ts`, `src/modular-art.ts` e `public/maps/reception.tmj`.
5. **Feedback visual da direção do produto:** preferência A+B, C mantido, rejeição de excesso de ornamentos e intenção de expansão por espaços exploráveis.
6. **Imagem comparativa anexada pelo usuário:** `versao refinada do que quero.pdf` (1 página), comparada à imagem anterior do Campus, também enviada nesta conversa.

**Limite e ampliação da inspeção:** a versão V1 original não tinha comparação visual direta. Nesta revisão foram **visualizadas diretamente** a imagem mais densa enviada pelo responsável e a única página do PDF refinado. É possível comparar **hierarquia, composição, quantidade relativa de ornamentos e clareza dos caminhos**. Ainda não houve revisão de cada asset separadamente, inspeção formal do PNG `public/assets/campus-v1.png` em execução, validação do arquivo Tiled gerado a partir do conceito, nem teste de performance. A outra referência de floresta mencionada no cânone original ainda deve ser reaberta caso a direção do produto deseje compará-la.

**Regra de precedência:** segurança do Mac e autorizações específicas > plano integral de voz/fluidez e produto > cânone visual recém-adotado > especificações propostas aqui. Conflitos devem ser registrados e decididos pelo responsável, não resolvidos silenciosamente.

---

## 1. A identidade que o jogador deve perceber

### 1.1. Frase-diretriz (norte criativo)

**Modern clean high-detail pixel art · top-down orthographic · welcoming biophilic futurism · controlled visual density.**

Tradução operacional: **um campus vivo de ensino de idiomas, com arquitetura contemporânea como estrutura**, natureza expressiva nas bordas e áreas escolhidas, tecnologia sutil, luz consistente e percursos claros. **O aluno e os locais de interação têm prioridade perceptiva sobre a decoração.**

### 1.2. Sete atributos obrigatórios

| Atributo | O que isso significa em cena | Falha a evitar |
|---|---|---|
| Acolhedor | Jardim, bancos, interiores convidativos, escala humana | Hospital/laboratório frio |
| Futurista discreto | Vidro, painéis suaves, linhas arquitetônicas limpas, detalhes ciano | Cyberpunk neon e hologramas em toda parede |
| Natural e profundo | Massas vegetais agrupadas, sombras e vegetação com propósito | Flora espalhada uniformemente em todo pixel livre |
| RPG explorável | Portas visíveis, rotas claras, desvios opcionais e lugares memoráveis | Caminhos encobertos por arbustos e efeitos |
| Educacional | Sinalização útil, salas e objetos com função comunicativa | UI de jogo competindo com a aula |
| Autoral e consistente | Gramática de formas, luz, escala e cor repetível | Colagem de assets de estilos incompatíveis |
| Clean com profundidade | Respiro em caminhos e salas, concentrando detalhes em pontos de interesse | “Minimalismo” que remove identidade, ou densidade que compete com UX |

### 1.3. Regras de hierarquia visual

- **Primeiro olhar:** encontrar entrada, caminho principal, avatar e destino da aula sem procurar entre decorações.
- **Segundo olhar:** reconhecer materiais, arquitetura, banco, lago e zonas sociais.
- **Terceiro olhar:** descobrir detalhes opcionais, pistas, flores raras e caminhos secundários.
- **Piso/circulação:** texturas de menor contraste, poucos ornamentos e objetos com função clara.
- **Pontos de interesse:** concentração moderada de detalhes, com silhueta forte e ação legível.
- **Bordas/segredos:** maior liberdade para natureza exuberante e pequenas surpresas, desde que não prejudiquem a navegação ou o desempenho.

### 1.4. Antirreferências (exclusões)

- Não isométrico, não perspectiva 3D com ponto de fuga, não cenário "diagonal" genérico.
- Não replicar sprites, mapas, criaturas, personagens, tiles, músicas ou trade dress de Pokémon, Eastward ou CrossCode. São referências de **qualidade e comportamento**, não um catálogo para copiar.
- Não usar imagens gigantes achatadas como formato final de cenários interativos.
- Não usar gradientes fotográficos/blur generalizado para fingir profundidade em pixel art.
- Não decorar todo espaço disponível: piso e caminhos precisam respirar.
- Não deixar IA geradora redefinir a escala, os materiais ou a aparência de um personagem a cada execução.

## 2. Referências e o que extrair de cada uma

| Referência | Aprender com | Não copiar / não inferir |
|---|---|---|
| **Imagem refinada enviada (PDF, p. 1)** | Respiro, caminhos evidentes, áreas de vegetação mais seletivas, portas e salas legíveis, lago como marco secundário | Não tomar imagem como prova de assets de jogo, tiles editáveis ou FPS |
| **Imagem densa enviada anteriormente** | Qualidade de flores, texturas, árvores, materiais e clima acolhedor | Não replicar a mesma densidade na maior parte do mundo |
| **Pokémon FireRed** | Leitura top-down, movimento claro, gramática de rotas e prioridades de desenho | Não copiar arte, mapas, personagens ou conteúdo |
| **Eastward** | Acabamento de materiais e atmosfera, iluminação criteriosa | Não importar densidade máxima para cada cenário |
| **CrossCode** | Clareza de arquitetura tecnológica, contraste funcional e objetos legíveis | Não copiar interface, layouts ou assets |
| **Floresta original da conversa** | Acabamento de folhagem e profundidade, após reabertura da referência exata | Não exigir imitação de sua composição específica |

### 2.1. Comparação visual observada entre as duas composições enviadas

**Observações visuais diretas — sem medição automatizada:**

- **Caminhos:** no PDF refinado, a circulação central aparece mais aberta; na imagem densa, há mais grupos de flores e arbustos nas laterais dos percursos.
- **Vegetação:** o PDF ainda tem árvores volumosas e um lago detalhado, mas concentra ornamentação em canteiros e bordas. A composição anterior distribui pequenos pontos de alta saturação com mais frequência.
- **Escola:** as duas imagens preservam a mesma ideia de fachada marfim, recepção aberta e sala com seis mesas; no PDF os elementos competem menos com o jardim.
- **Avatar:** a página do PDF coloca um personagem pequeno próximo ao eixo de circulação. A dimensão relativa ainda deve ser testada no viewport real para acessibilidade e legibilidade.
- **Potencial de expansão:** o PDF cria mais espaço visual e alguns setores livres; a expansão real ainda exige malha de rotas, destinos e variações modulares, não apenas imagem menos carregada.

**Inferência de design, a validar:** a composição do PDF é mais adequada como **hub de entrada diurno** e baseline de estilo. A composição mais densa pode orientar **pequenos biomas, jardins secretos e cenas especiais**, mas não o corredor principal de uma aula.

**Aviso técnico:** um PNG 2D de imagem única pode ser pesado mesmo quando visualmente clean; uma cena com muitos elementos pode renderizar de modo eficiente se for bem organizada. O PDF não mede GPU, CPU, draw calls, memória, uploads de textura ou oclusão.

---

## 3. Direção visual combinada: AB-3 — Campus Vivo

**Decisão estética do responsável:** priorizar uma mistura deliberada de **A — Jardim cinematográfico** e **B — Campus contemporâneo**. O compromisso não é “50/50” em todos os cômodos: a estrutura espacial vem de B; o encanto e a identidade natural vêm de A. A variante C permanece no universo de produto, mas não dirige a cena diurna de entrada.

### 3.1. Camada estrutural B — “clean contemporary campus”

- Edifícios marfim, vidro e madeira com ritmo arquitetônico coerente.
- Percursos primários amplos, claros, sem flores e objetos espalhados aleatoriamente no caminho.
- Mobiliário com densidade realista e função: recepção, bancos, quadro, mesas, circulação.
- Tecnologia discreta: painéis e luzes ciano somente onde informam ou organizam atividades.
- Interfaces e sinalização separadas da decoração; contraste adequado ao uso educativo.

### 3.2. Camada afetiva A — “curated cinematic garden”

- Árvores como grandes silhuetas de enquadramento, e não cobertura uniforme de todo o mapa.
- Lago e vegetação como marcos navegacionais: bonitos, identificáveis e posicionados com intenção.
- Flores em grupos selecionados, não dispersas em todos os terrenos; variações de tamanho e cor sob paleta comum.
- Pequenos lugares memoráveis com identidade própria: jardim de leitura, banco sob árvore, trilha lateral, futuro acesso a casa na árvore.
- Qualidade de sombra, borda, material e animação concentrada nos elementos mais importantes.

### 3.3. Camada C — atmosfera narrativa controlada, **não descartada**

- Variações de manhã, tarde, noite e estações com iluminação e vegetação orientadas por tema.
- Natal ou outros eventos como **camadas reversíveis e opcionais**, sem deslocar colisões ou bloquear entradas.
- Eventos, pistas e gincanas podem transformar a leitura de um local sem recriar o mundo inteiro.
- A implementação e o impacto de performance dependem de experimentos separados.

### 3.4. Estudos que deram origem a AB-3

A proposta de comparação previa dois estudos no mesmo enquadramento, com o mesmo personagem e portas. A homologação adota AB-3 como combinação dos estudos AB-1 e AB-2. C permanece como variante opcional.

1. **AB-1 — Clean dominante:** arquitetura e circulação muito claras, natureza controlada.
2. **AB-2 — Jardim dominante disciplinado:** mais charme natural nos pontos de interesse, sem densidade generalizada.
3. **C-contexto — opcional:** simulação futura de iluminação, evento ou estação, sem alterar o baseline.

Critérios comuns: percurso imediatamente visível, player legível no zoom normal, ponto de interação reconhecível, materiais consistentes, beleza percebida, taxa de erros visuais e custo de integração. Nenhum estudo vira arte definitiva automaticamente.

---

## 4. Sistema de cor — paleta de trabalho, não definitiva

Paleta inicial para prototipação e comparação. O responsável indicou que **gostou da paleta**, mas não aprovou os códigos hex individualmente. **Todos os códigos abaixo permanecem propostos**, não extraídos nem calibrados por medição das imagens. A revisão regula sua distribuição, não substitui arbitrariamente as cores.

| Família / papel | Hex proposto | Uso | Limite |
|---|---|---|---|
| Folhagem escura | `#203F39` | fundo de copa, sombra natural | não cobrir caminho |
| Folhagem média | `#366F60` | corpo de folhas | base vegetal principal |
| Folhagem luz | `#70A68A` | clusters de luz | poucos pixels por massa |
| Folha quente | `#A1BD89` | variação sutil | evitar verde neon |
| Caminho claro | `#D9D1BB` | percurso de pedra | contraste contra vegetação |
| Caminho sombra | `#B8B09D` | borda e volumes | textura discreta |
| Parede marfim | `#ECE6D7` | fachada, interior claro | evitar branco chapado |
| Parede sombra | `#B9C9BF` | recuo, volume | sombra consistente |
| Azul-petróleo | `#3D7978` | estrutura, mobiliário | modular presença |
| Ciano técnico | `#77D0CC` | luz contextual, painéis | **acento**, não dominante |
| Água-base | `#4C9E9D` | lago | preservar margens legíveis |
| Água-luz | `#A1D9C5` | brilhos curtos | animação opcional |
| Madeira | `#9B7557` | bancos, portas | aquecer o espaço |
| Madeira-luz | `#C7A27C` | aresta de madeira | não contornar tudo |
| Texto escuro UI | `#243735` | interface fora da cena | verificar contraste WCAG |
| Destaque de missão | `#E7C46C` | objetivo específico, parcimonioso | não confundir com item decorativo |

**Hierarquia de cor:** arquitetura/rotas = neutros claros e quentes; áreas verdes = verdes agrupados com zonas de descanso; tecnologia = acentos ciano em poucos elementos funcionais; interação/objetivo = foco visual distinto do ornamento.

**Controle de saturação:** evitar que gramado, flores, lago, LEDs e telas estejam todos no máximo contraste. Reduzir detalhes e variações cromáticas nas áreas de circulação, mantendo o colorido em canteiros, marcos e cenas opcionais. O cenário deve continuar interessante quando visto de longe e compreensível em movimento.

**Controle de contraste:** testar legibilidade do avatar em gramado, caminho, interior e sombra. Texto da interface HTML/CSS deve buscar WCAG AA apropriado ao tamanho/uso; indicadores importantes precisam de redundância por forma/ícone, não apenas cor.

**Material ilustrativo:** `ART-BIBLE-PALETA-V1.svg`, no acervo local da Etapa A-01. O SVG contém amostras vetoriais editáveis para comparar a paleta candidata. A renderização no jogo segue pendente de validação.

## 5. Gramática espacial e escala

### 5.1. Geometria canônica preservada

- **Projeção:** top-down ortográfica com visão parcial das faces frontais das paredes, sem ponto de fuga.
- **Grade lógica existente:** 16 × 16 px, preservada na primeira comparação. `public/maps/reception.tmj` usa 30 × 20 células; isso descreve um **trecho técnico**, não o tamanho final do campus.
- **Caminhada:** manter tanto o modo em grade como o livre até os testes controlados; avatar ancorado pelos pés; colisões menores que a silhueta.
- **Mapa:** pisos, bordas, parede, objetos, canopy/foreground, colisões e gatilhos devem ser independentes.
- **Expansão:** preservar pontos de conexão para salas, caminhos laterais, bosques e áreas opcionais. Nenhum “segredo” deve ser uma promessa de interação embutida somente na textura estática.
- **Circulação:** manter um eixo de entrada → recepção → sala que permaneça visível com ornamentos desligados. Caminhos exploratórios devem oferecer escolhas, mas não confundir o trajeto do aluno em horários de aula.

### 5.2. Escala visual candidata para testar

| Elemento | Dimensão candidata | Observação |
|---|---:|---|
| Tile base | 16 × 16 px | compatível com mapa atual |
| Super-tiles artísticos | múltiplos de 16 px | edifícios/copas podem atravessar várias células |
| Estudante visível | **32 × 40 px** | hipótese, não dimensão homologada |
| Ponto de contato no chão | origem nos pés | independente da altura artística |
| Porta navegável básica | vão de 32 px ou mais | confirmar layout/testes existentes |
| Árvore | base de colisão pequena, copa maior | copa pode ocultar parcialmente avatar |
| Ponto de interação | objeto estável com ID | área visual e trigger separados |

**Nunca presumir que sprite 32 × 40 px ocupa colisão 32 × 40 px.** Física e renderização têm contratos distintos. Não ampliar todos os elementos indiscriminadamente: personagem e edifício precisam manter escala relativa crível.

### 5.3. Câmera e zoom

- Preservar a câmera atual como baseline; **não alterar `pixelArt`, `roundPixels`, `LINEAR/NEAREST` ou escala simultaneamente**.
- Comparar **mesma cena, mesmo percurso, mesmo equipamento** em pelo menos duas configurações de filtragem/zoom.
- Investigar artefatos de zoom fracionário, pixel shimmering, tremida e legibilidade antes de fixar escala de apresentação.
- Preferir imagens com resolução interna previsível e zoom integer-friendly **quando não contrariar viewport e acessibilidade**; não prometer que zoom inteiro resolverá o problema sem medir.

## 6. Padrões de desenho: silhueta, perspectiva, textura e sombras

### 6.1. Silhuetas

1. Personagens devem ser reconhecíveis **sem rosto detalhado** pelo cabelo, roupa, mochila e proporção.
2. Plantas e prédios devem possuir contorno claro à distância normal de jogo; detalhe fino entra por segundo.
3. Portas precisam ser distinguíveis de janelas e paredes, inclusive sem efeito luminoso. A prioridade das portas é maior que a de plantas decorativas.
4. Itens interativos devem ter pistas sutis e consistentes — não marcar tudo com partículas.

### 6.2. Contorno

- Priorizar *selout* (contorno colorido conforme material) ou bordas internas de sombra em vez de preto puro universal.
- Evitar linha preta muito grossa em arquitetura clara.
- Manter espessura aparente coerente entre avatar, folhagem, portas e mobiliário.
- Não exigir contorno integral em piso e grama; clusters de cor fazem a separação.

### 6.3. Textura

- Usar pixels agrupados (*clusters*) em vez de ruído aleatório por pixel.
- Piso caminhável: **baixa frequência de detalhe e contraste**; bordas de jardim e canteiros: **média**; copas e áreas periféricas: **média/alta apenas quando houver função compositiva**.
- Reservar detalhes minúsculos para áreas de pausa/observação, não para a área central de deslocamento. Evitar microflores, pontilhados e partículas em todos os cantos ao mesmo tempo.
- Materiais distintos devem ser identificáveis **mesmo sem cor** por ritmo de textura e arestas.

### 6.4. Luz e sombra

- **Fonte primária candidata:** sol de manhã/fim de manhã vindo do quadrante superior esquerdo da cena; **direção a homologar após comparação visual**.
- Sombras projetadas coerentes em todo o trecho. Priorizar iluminação pré-computada e integrada aos assets; usar runtime apenas para elementos que realmente mudam.
- Sombras dos personagens, árvore e elementos suspensos devem ajudar a explicar a altura e a ancoragem, sem simular 3D incoerente.
- Ciano é **luz funcional de interface/arquitetura**, não banho de neon na vegetação.
- Estado noturno, Natal e eventos: **variantes de iluminação/camadas**, não alteração destrutiva do mapa-base. Tratar custo por efeito como questão experimental, não automática.

## 7. Personagens e animação

### 7.1. Protagonista da primeira prova

Conceito de partida: estudante jovem adulto, visual acessível, roupa contemporânea com detalhes azul-petróleo/marfim, silhueta acolhedora. **Não travar rosto, etnia ou gênero no cânone**: o produto prevê avatares diversos e personalizáveis.

**Contrato funcional mínimo de B-01, não implementação da A-01:**

- Quatro direções: norte, sul, oeste e leste.
- Estados: idle e walk por direção; corredor/gesto opcional somente após validar o mínimo.
- Pivô/âncora dos pés consistente em todos os quadros.
- Paleta, altura, largura e acessórios constantes nos frames; sem membros que trocam de lado acidentalmente.
- Sequência de caminhada com leitura inequívoca: passos esquerdo/direito, troca de peso e retorno ao neutro.
- Cuidado com lateral espelhada: detalhes assimétricos precisam de desenhos próprios quando o espelhamento gerar erro.
- Sombra independente do sprite; teste sem sombra deve continuar legível.

**Resolução candidata:** 32 × 40 px, com quadros exportados numa grade fixa em spritesheet; o layout final da folha depende do formato que o editor e o Phaser consumirem. Não afirmar que três quadros por direção bastam para toda a animação final: medir percepção e comparar alternativas de 4–6 quadros se necessário.

### 7.2. Professor de IA e demais NPCs (futuro)

Professores precisam ser distinguíveis sem caricatura, e a identidade visual não pode implicar capacidades que o sistema de voz ainda não tem. Em sessão de aula, **concentração e fala têm prioridade**: evitar animações automáticas insistentes e elementos visuais piscantes.

### 7.3. Tratamento de IA generativa

- Gerar conceito e variações **a partir de referência de personagem aprovada**; não solicitar personagem novo do zero para cada pose.
- Validar transparência, silhueta, continuidade de roupa e textura, consistência de pixel size, posicionamento e animação em loop.
- Corrigir no Pixelorama/Aseprite; rejeitar quadros em que a identidade do personagem muda.
- Exportar PNG com alfa e registrar fonte editável, prompt, versão/modelo, licença e custo.

## 8. Cenário modular: jardim, recepção e sala

### 8.1. Biblioteca de assets da Etapa C

| Família | Exemplos mínimos | Renderização/collision |
|---|---|---|
| Pisos | grama, pedra, bordas, transições, piso interno | tile layers, colisão só se aplicável |
| Vegetação | flores, arbustos, troncos, copas, plantas internas | copa foreground, tronco com colisão independente |
| Água | margem, superfície, cantos, detalhes leves | margem e risco de atravessar separados |
| Edificação | base, parede, fachada, janela, porta aberta/fechada | objetos e portas com IDs estáveis |
| Mobiliário | recepção, bancos, mesas, cadeiras, luminárias | footprint pequeno quando aplicável |
| Informativo | placa, quadro, painel de aula, interação | sem texto ilegível em pixels minúsculos |
| Ambientação | luz, sombra, partículas mínimas | desligável quando necessário |

### 8.2. Camadas padronizadas para Tiled (proposta)

1. `ground`: grama, água, pedra, piso interno.
2. `ground_details`: flores baixas, manchas de textura, marcas.
3. `structures_back`: paredes, janelas e fundos de móveis.
4. `objects_low`: objetos até altura dos pés do personagem.
5. `actors`: jogadores/NPCs posicionados por Y + offsets consistentes.
6. `foreground_canopy`: copas, telhados e objetos que podem cobrir atores.
7. `lighting`: composições pré-calculadas ou efeitos limitados.
8. `collision_objects`: formas físicas independentes da arte.
9. `interaction_objects`: IDs, regiões e pontos de ação.

**Nota:** nomes acima são contratos de proposta; não correspondem integralmente às duas camadas do `reception.tmj` atual (`ground` e `objects`). Migrar só mediante implementação isolada e revisão de compatibilidade.

### 8.3. Composição de referência da primeira cena (PDF refinado)

- **Topo:** escola em recorte superior, com recepção e primeira sala didática distinguíveis. Entrada central e sala claramente acessíveis.
- **Centro:** um eixo de circulação com personagem em destaque; caminhos de pedra com bordas e proporções constantes.
- **Laterais próximas:** bancos e canteiros como pequenos destinos de exploração; não repetir flores coloridas em todo gramado.
- **Bordas distantes:** massas de árvores que delimitam e emolduram o campus. Canópias funcionam como camadas de profundidade, não como camuflagem de destinos essenciais.
- **Água:** lago pequeno à esquerda como marco de orientação e possível contexto pedagógico, com margens e colisões claras.
- **Interiores:** recepção acolhedora e sala com seis posições, mobiliário funcional, boa circulação e painéis de leitura acessíveis.
- **Interação:** porta acionável, árvore com oclusão correta, objeto informativo. Nesta fase, interações de aula são **conceituais** e não se anunciam como implementadas.
- **Expansão:** prever conexão visual/plausível para caminhos opcionais, zonas de descoberta e futuras construções; não projetar um mundo gigante antes de provar uma única área.

### 8.4. Três níveis de densidade de conteúdo

| Zona | Estilo desejado | O que deve ser evitado |
|---|---|---|
| **Percurso e local de aula** | Clean, poucos ornamentos, formas facilmente identificáveis | Decoração no piso, brilho excessivo, entradas escondidas |
| **Jardins, convivência e marcos** | Detalhes moderados, vegetal expressivo, uma ou duas atrações por ponto | Vários efeitos e cores disputando a mesma atenção |
| **Desvios secretos e áreas de narrativa** | Maior liberdade de vegetação, objetos contextuais, pistas sutis | Poluição visual gratuita, caminhos impossíveis de decifrar |

**Regra:** profundidade de exploração vem de relações entre lugares, objetivos e revelações, **não do número de sprites simultaneamente em tela**. O jogador deve poder ignorar a exploração opcional e seguir diretamente para uma aula.

### 8.5. Preparação para expansão, sem implementação prematura

Conceitos permitidos no planejamento: casa na árvore, biblioteca escondida, laboratório de idiomas, praça de conversação, espaços sazonais e trajetos com segredos. Cada área deve existir por uma função de aprendizagem, narrativa ou socialização e possuir **pelo menos uma forma clara de conexão** com o mundo. Esses são candidatos, não escopo aprovado da primeira entrega.

## 9. Mundo vivo e ambientes pedagógicos futuros — regras de estilo desde já

A visão canônica já permite imaginar gincanas, mudanças sazonais, aulas em objetos e investigação; o responsável reafirmou o interesse em **casas na árvore, segredos, aulas práticas guiadas por LLM e um universo que se retroalimenta**. **Não implementar estes recursos na A-01.** Preparar espaço na linguagem visual:

- **Objetos pedagógicos:** definição visual de affordance (algo examinável/interativo) com pistas consistentes; objetos precisam de IDs e propriedades, não dependem de LLM para existir.
- **Missões colaborativas:** marcadores e pistas devem ser claros para iniciantes; feedback privado não pode aparecer para toda a turma por engano.
- **Natal e demais eventos:** decoração em camadas opcionais e reversíveis, respeitando preferências culturais e acessibilidade. Não mover portas/obstáculos sem validação determinística. O evento não deve cobrir a sinalização, aumentar efeitos de forma invasiva nem prejudicar aulas em andamento.
- **Adaptação individual:** conteúdos e objetivos podem variar por aluno, mas a geometria compartilhada do multiplayer exige uma fonte de verdade comum.
- **Professor criador de gincanas:** futuramente propõe atividades estruturadas; um validador determinístico decide se cada plano cabe nos locais e regras; a IA não modifica livremente colisões/mapas de produção.
- **Descobertas e segredos:** conteúdos opcionais com pistas narrativas e pedagógicas; o usuário não precisa encontrar todos para estudar, e a existência de uma atividade não depende de um modelo gerar geometria imprevisível.
- **Casa na árvore e novos espaços:** expansões conectadas a rotas claras, liberadas por conteúdo, eventos ou curiosidade. Art assets, colisões e estado compartilhado devem ser versionados independentemente do texto da LLM.
- **Mundo que se retroalimenta:** regras e evidências de progresso podem selecionar missões, personagens e contextos; um serviço de domínio/validador controla mudanças permitidas, com consentimento e privacidade adequados.
- **Aprendizagem sem jogos:** aluno deve poder entrar numa aula ou praticar conversação sem participar de missão exploratória.

## 10. Interface durante aulas

- O mapa é o ambiente; ferramentas de ensino são interface HTML/CSS (React se necessário), não painéis desenhados em tempo real dentro da textura.
- Durante a aula, reservar uma região visual clara para controles de microfone, participantes, legenda/transcrição e progresso; nenhum elemento do mapa deve impedir ações essenciais.
- Movimento e efeitos podem reduzir/pausar durante sessões. Áudio e estado pedagógico não dependem da renderização do Phaser.
- Preferências futuras: redução de movimento, legibilidade, contraste, volume, legendas e navegação por teclado.
- Evitar indicadores pulsantes persistentes, flashes e partículas em grande quantidade.

## 11. Pipeline de arte: estágios, portas de qualidade e arquivos

**Pipeline de referência preservado do cânone (sujeito à avaliação operacional de ferramentas, custos e licenças):**

`Direção de arte → PixelLab AI (ou outra fonte autorizada) → Pixelorama/Aseprite → Tiled → Phaser + TypeScript → inspeção visual e desempenho`

**Não é uma obrigação de assinar/instalar PixelLab.** Comparar custo, controle, qualidade, licença, resolução, consistência e exportação antes da adoção operacional.

**Regra acrescentada na V1.1:** cada asset deve ser avaliado em seu **contexto de leitura**: primeiro no centro de uma rota vazia, depois em jardim e sala com fundos distintos, por fim no zoom normal do navegador. Um asset detalhado isoladamente pode ser inadequado se, ao entrar na cena, produzir ruído ou invisibilizar o aluno.

### 11.1. Portas de qualidade

| Porta | Entrada | O que deve ser comprovado | Saída |
|---|---|---|---|
| Q0 — conceito | brief + referências legais | perspectiva, silhueta, atmosfera coerentes | conceito aprovado para asset |
| Q1 — sprite/tile | geração/ilustração | pixel size, paleta, transparência, encaixe | PNG editável e metadata |
| Q2 — animação | quadros direcionais | identidade, loop, âncora, ausência de jitter | spritesheet final candidato |
| Q3 — mapa | tiles + objetos | camadas, transições, colisões, IDs | TMJ/JSON testável |
| Q4 — runtime | Phaser | câmera, sobreposição, UX, renderização | demo isolada |
| Q5 — aceite | comparação antes/depois | beleza, legibilidade, FPS/P95, bugs | decisão explícita de adoção |

### 11.2. Nomes, estrutura e proveniência (proposta para branch experimental)

```text
art-source/
  art-bible/
  characters/student-base/{concept,source,export,metadata}
  environment/{ground,foliage,architecture,interior}
  manifests/assets-v1.json
public/assets/art-v1/
  actors/student-base.png
  tiles/ground.png
  objects/foliage.png
public/maps/
  reception-art-v1.tmj
```

Nenhum desses diretórios deve ser criado na `main` automaticamente. Preferir arquivos com versionamento e sem sobrescrita da arte antiga; guardar `campus-v1.png` como comparação. Para cada asset registrar: `id`, finalidade, tamanho, variante, autoria/origem, modelo e versão, prompt principal, arquivos editáveis, licença/restrições, custo, data e revisão aprovada.

### 11.3. Modelo de prompt para geração futura — não executar automaticamente

```text
Create ONE ORIGINAL game-ready pixel-art asset for a high-detail, orthographic
TOP-DOWN 2D language-school RPG. Art direction: welcoming biophilic futurism;
ivory architecture, teal-green nature, minimal cyan technology accents.

ASSET: [e.g., tree canopy / school entrance / student walk cycle]
BASE GRID: 16 x 16 px. Requested art bounds: [width x height].
VIEW: orthographic top-down with shallow wall fronts; no isometric projection.
LIGHT: consistent upper-left daytime light; pixel-cluster shading, no blur.
PALETTE: follow the approved Campus Art Bible palette, not arbitrary colors.
STYLE: crisp deliberate pixel clusters; original shapes, no copyrighted game asset.
DELIVERABLE: transparent PNG asset or seamless tile(s), no texts/logos/background;
consistent pivot/ground contact; keep meaningful walkable space unobstructed.

REJECTION CONDITIONS: inconsistent camera angle, broken tile edge, random-pixel
noise, unstable character identity, soft photo texture, cropped silhouette,
unintended opaque background or unreadable collision footprint.
```

Não usar esse prompt isoladamente para dezenas de assets: associá-lo a referências aprovadas e validar as portas Q0–Q5.

## 12. Auditoria do estado atual e riscos de migração

**O que já estava implementado na auditoria do repositório e documentação consultados (sem nova execução na V1.1):**

- Phaser 3.90.0 + TypeScript 5.9.3 + WebGL.
- Cenário original composto; cenário modular com `reception.tmj` (30 × 20, 16 px), tileset de cinco peças e formas desenhadas no runtime.
- `src/modular-art.ts`: avatar feito com `fillRect` e três frames por orientação.
- `src/modular-scene.ts`: objetos desenhados com `Graphics`, `LINEAR` no tileset, depth pela coordenada Y e colisões/porta.
- `src/main.ts`: `pixelArt: false`, `antialias: true`, `roundPixels: false` para a arte atual.
- Documento portátil registra 14 testes aprovados e amostra modular de 59,3 FPS / P95 25,8 ms **que não atingiu a meta de P95 ≤ 20 ms**. Não foram executados testes nesta A-01.

**Consequências técnicas:**

1. Trocar **representação artística** (Graphics/placeholders → sprite/tileset) antes de trocar a engine.
2. Não reinterpretar grande arte gerada como sistema de tiles sem decomposição, edição e controle de escala.
3. Manter o ponto de contato do avatar, as portas e a oclusão; evitar reescrever a navegação na migração de arte.
4. Estabelecer baseline de câmera e frametime antes de atribuir ganhos ou perdas aos novos assets.
5. A escolha de `NEAREST` vs `LINEAR`, antialias e zoom dependerá de captura e medição no mesmo trecho.
6. A imagem refinada sugere menos ruído, mas isso **não quantifica** consumo de GPU: testar draw calls, atlas/batches, tamanho de texturas, tempo de criação de cena e frametime P95 em implementação equivalente.
7. “Clean” é um requisito de composição; não elimina a necessidade de acessibilidade, diferenciação de personagens e motivação para explorar.

## 13. Homologação A-01 e verificações de produção

**Já confirmados pela direção:** preferência por A+B, C preservado; rejeição de densidade decorativa excessiva; paleta apreciada em princípio; PDF refinado como direção comparativa mais adequada.

**A-01 está concluída e homologada conceitualmente.** Os itens em aberto documentam evidências e verificações para a produção e a integração de assets, sem adiar a homologação de AB-3:

- [x] Comparação visual da composição densa com a página única do PDF refinado.
- [x] Identificação explícita de A+B como direção principal e C como variante futura.
- [x] Regra de composição clean com detalhes seletivos e profundidade explorável futura.
- [ ] Testar a paleta candidata em cena com avatar, piso, interior, vegetação e sombra; ajustar códigos hex se necessário.
- [ ] Validar tamanho/legibilidade de sprite, escala, zoom e perspectiva no navegador; 32 × 40 px continua uma hipótese.
- [ ] Documentar a autoria e as permissões dos estudos AB-1 e AB-2 e arquivar os comparativos quando disponíveis.
- [ ] Apresentar **três amostras de assets reais**: vegetação, fachada/recepção e estudante, todos no mesmo estilo.
- [ ] Confirmar que caminhos, portas e ponto focal do aluno são legíveis no zoom normal.
- [ ] Testar o desempenho de uma vertical slice com o mesmo mapa, câmera e equipamento, sem atribuir ganhos automáticos à imagem mais limpa.
- [ ] Revisar licenças, uso de IA gerativa, proveniência, exportação editável e consistência do pipeline.
- [x] Registrar a homologação conceitual de A-01 e a escolha de AB-3 pelo responsável em 14/11/2026.

**Status A-01:** Art Bible concluída e direção AB-3 homologada. Validação técnica e aceite de assets de produção seguem em aberto.

## 14. Próximos subpassos e plano de ação imediato

| ID | Ação | Responsável | Entregável | Estado / permissão |
|---|---|---|---|---|
| **A-01.1** | Direção inicial, paleta e arquitetura artística | Estratégia + responsável | Art Bible V1 | Feito como proposta anterior |
| **A-01.2** | Revisar após comparar composição densa × PDF refinado | Estratégia + responsável | **Art Bible V1.1** | **Concluído documentalmente** |
| **A-01.3** | Comparar os estudos AB-1 e AB-2 | Arte/IA + direção | Referências para AB-3 | Base da decisão homologada; documentação das evidências em aberto |
| **A-01.4** | Testar assets e escala em prova técnica isolada | Codex/Claude + direção | Cenário de demonstração e relatório | Autorização específica; sem editar a `main` |
| **A-01.5** | Aprovar a direção artística e registrar a decisão | Responsável | Decisão A-01 homologada | **Concluído — AB-3 aprovada em 14/11/2026** |
| **B-01** | Produzir estudante definitivo e caminhada | Engenharia + arte | spritesheet, fonte, teste no Phaser | **Próxima etapa autorizada** |

**Pedido de estudo registrado durante A-01.2 (histórico):**

> Leia primeiro `AGENTS.md`, `PLANO-CONGELADO.md`, `docs/PLANO-CANONICO-INTEGRAL.md`, `refs canones/CANONE-VISUAL-E-UNIVERSO-PEDAGOGICO.md` e `docs/ART-BIBLE-V1.1.md`. Trate a página única de `versao refinada do que quero.pdf` como referência visual de composição, e a arte anterior como referência complementar de acabamento. Em modo somente-análise, levante a matriz de assets necessária a dois estudos comparáveis (AB-1 clean e AB-2 jardim disciplinado), especifique separação em camadas Tiled e pontos de integração Phaser, descreva como validar zoom/filtragem/profundidade e medições de desempenho. Não instale dependências, não altere código, não gere builds ou serviços, não rode carga e não escreva na `main` sem autorização específica. Não considere que “menos decoração” comprova ganho de FPS.

**Validação operacional futura (não executada):** desenhar/testar mapa com caminhos claros; depois sobrepor assets finais; registrar diferença de frametime, quantidade de draw calls quando observável, memória e comportamento em entrada/saída de sala. Parâmetros devem usar o mesmo equipamento e condições comparáveis; a meta de P95 ≤ 20 ms permanece.

## 15. Decisão executiva consolidada nesta revisão

**Direção homologada:** **AB-3 — Campus Vivo**, com a clareza e a estrutura de AB-1 como base e o charme orgânico de AB-2 como complemento. A imagem refinada do PDF segue como referência de composição para a cena de entrada.

**Mantido:** caminho C como futuro repertório de iluminação, narrativa, eventos e sazonalidade; Phaser, TypeScript, WebGL, Tiled, grade lógica de 16 px, sistemas atuais de movimento/câmera/colisões, metas de FPS e isolamento da voz.

**Evitar:** confundir quantidade de detalhes com qualidade, lotar caminhos com ornamentos, depender de imagem gigante como arte final, anunciar desempenho sem medição ou trocar a engine antes de evidências técnicas.

**Produzir antes de escalar:** assets originais e editáveis em AB-3, teste de legibilidade e contraste e prova de integração isolada.

**Não fazer nesta revisão:** editar o jogo, instalar ferramentas, aprovar valores de pixel/zoom não testados, implementar gincanas ou eventos, alterar geometrias compartilhadas por instruções livres da LLM, substituir a `main` ou sobrescrever o cânone anterior.

**Veredito A-01:** Art Bible concluída e direção AB-3 homologada conceitualmente. B-01 é a próxima etapa autorizada. Os parâmetros técnicos e os assets de produção seguem sujeitos aos respectivos testes de aceite.

---

## Registro de decisões e revisão

| Data | Item | Estado | Evidência |
|---|---|---|---|
| 14/11/2026 | Meta de acabamento de RPG comercial | **Aprovada como visão** | Cânone visual na `main` |
| 14/11/2026 | Pipeline de referência PixelLab → editor → Tiled → Phaser | **Aprovado como referência** | Cânone visual |
| 14/11/2026 | A+B como direção principal, C como variação futura | **Preferência visual confirmada pelo responsável** | Feedback e PDF refinado de uma página |
| 14/11/2026 | Paleta apreciada; códigos hex e sprite candidato 32 × 40 | **Preferência cromática parcial; parâmetros ainda propostos** | Feedback e Art Bible |
| 14/11/2026 | Redução de poluição e foco em exploração futura | **Diretriz visual confirmada** | Feedback sobre imagem anterior e PDF |
| 14/11/2026 | Integração e geração dos assets na `main` | **Não autorizada** | Escopo A-01 |
| 14/11/2026 | Documento V1.1 concluído como revisão | **Pronto para revisão e publicação** | Comparação de duas imagens; sem novos testes |
| 14/11/2026 | A-01 homologada e B-01 autorizada | **AB-3 — Campus Vivo** | Decisão de Nicolas Kraide registrada abaixo |

**Autoria editorial:** ChatGPT, atuando na frente de mentoria/estratégia. **Responsável pela homologação:** direção do produto.\
**Alcance da homologação:** a aprovação cobre a direção artística. Os testes de desempenho, o aceite de ferramentas e assets e as autorizações operacionais seguem seus próprios critérios. A V1 anterior e o cânone original permanecem como referências históricas.

---

## Homologação oficial da direção artística — AB-3

**Status:** APROVADO\
**Data:** 14/11/2026\
**Responsável pela aprovação:** Nicolas Kraide\
**Escopo:** direção visual oficial do Campus para produção de assets, cenários e estudos posteriores.

### Decisão homologada

Fica homologada como direção artística oficial do Campus a linguagem **AB-3 — Campus Vivo**.

AB-3 é uma direção híbrida derivada dos estudos AB-1 e AB-2, com a seguinte lógica:

- **AB-1** fornece a base principal:
  - clareza espacial
  - arquitetura contemporânea
  - composição limpa
  - legibilidade para gameplay
  - moderação visual
  - escalabilidade para expansão do mapa

- **AB-2** fornece a camada complementar:
  - charme natural
  - vegetação controlada
  - atmosfera mais calorosa
  - detalhes orgânicos pontuais
  - profundidade visual sem poluição

### Definição operacional de AB-3

AB-3 deve ser entendido como:

> **um campus clean, moderno, acolhedor e explorável, com riqueza visual controlada, arquitetura clara, vegetação elegante e espaço suficiente para gameplay, expansão futura e experiências pedagógicas contextuais.**

Essa direção existe para evitar dois extremos:

- **minimalismo excessivo**, que empobrece a identidade do mundo;
- **poluição visual excessiva**, que compromete legibilidade, expansão e usabilidade.

### Regra prática de composição

Ao produzir artes, cenários, tilesets e estudos:

- a leitura do espaço deve ser imediata;
- caminhos e áreas caminháveis devem ser óbvios;
- a arquitetura deve parecer sofisticada, contemporânea e funcional;
- a natureza deve enriquecer o cenário, não dominá-lo;
- os detalhes devem sugerir profundidade de mundo, não gerar ruído visual;
- o cenário deve preservar áreas livres para futura exploração, eventos, aulas práticas, NPCs, segredos e expansão do universo.

### Interpretação visual de AB-3

AB-3 pode ser resumido como:

- **80%** da clareza e estrutura do AB-1
- **20%** do charme orgânico e da atmosfera do AB-2

Essa proporção é uma orientação estética, não uma métrica matemática. Em caso de dúvida, priorizar:

1. legibilidade
2. clareza espacial
3. qualidade estética
4. expansão futura
5. atmosfera complementar

### Implicações para produção

AB-3 passa a orientar:

- personagem principal e NPCs
- tilesets
- recepção
- sala de aula
- jardim inicial
- futuras áreas externas
- futuras áreas secretas e exploráveis
- linguagem de iluminação
- linguagem de vegetação
- equilíbrio entre arquitetura e natureza

### Observações de desempenho e usabilidade

AB-3 **não significa** maximizar a quantidade de elementos decorativos.\
A direção oficial exige:

- beleza com controle
- detalhamento com intenção
- atmosfera com clareza
- riqueza de mundo sem poluição visual

O objetivo é construir um universo explorável e pedagogicamente expansível, sem comprometer a experiência principal.

### Resultado da Etapa A

Com a homologação de AB-3:

- a **A-01 (Art Bible)** passa a estar **aprovada conceitualmente**
- a fase seguinte autorizada é **B-01 — Primeiro personagem definitivo**

## Status de avanço

- A-01 — Art Bible: **concluída e homologada**
- Direção artística oficial: **AB-3 — Campus Vivo**
- Próxima etapa autorizada: **B-01 — Primeiro personagem definitivo**
