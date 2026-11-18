# CAMPUS — ART BIBLE V1

**Identidade visual, linguagem de mundo e critérios de produção artística**  
**Documento:** `docs/ART-BIBLE-V1.md`  
**Versão:** 0.1 — proposta de direção para homologação (A-01)  
**Data:** 14/11/2026  
**Status:** **PROPOSTA — NÃO HOMOLOGADA**  
**Escopo:** direção artística e especificação de assets; **não** autoriza instalação, edição do jogo ou integração no branch principal.

> **Decisão central proposta:** O Campus deve parecer um RPG 2D de alto acabamento autoral, mas funcionar como uma escola virtual moderna. A qualidade deve vir da coerência entre pixels, escala, materiais, luz, animação, legibilidade e interações — não de colocar mais detalhes em cada imagem isoladamente.

## 0. Fontes, precedência e limites desta proposta

Esta Art Bible **operacionaliza** o cânone visual e pedagógico já adotado, sem substituí-lo. Fontes de verdade consultadas:

1. `refs canones/CANONE-VISUAL-E-UNIVERSO-PEDAGOGICO.md` (localização **verificada na `main`** em 14/11/2026).
2. `docs/PLANO-CANONICO-INTEGRAL.md` e `PLANO-CONGELADO.md`.
3. `docs/CONTEXTO-PORTATIL.md`, `docs/ASSETS.md`, `docs/CENARIO-V1.md` e `AGENTS.md`.
4. Implementação existente: `src/main.ts`, `src/scene.ts`, `src/modular-scene.ts`, `src/modular-art.ts` e `public/maps/reception.tmj`.

**Limite de inspeção:** as referências descritivas e os prompts de arte foram examinados, mas **não houve uma inspeção visual direta do arquivo `public/assets/campus-v1.png` nem da segunda imagem de floresta da conversa original** nesta elaboração. Por isso, decisões de composição e semelhança com essas imagens são **hipóteses**, não aprovação visual baseada em comparação lado a lado. A versão final da Art Bible exige essa referência anexada ou visualmente acessível.

**Regra de precedência:** segurança do Mac e autorizações específicas > plano integral de voz/fluidez e produto > cânone visual recém-adotado > especificações propostas aqui. Conflitos devem ser registrados e decididos pelo responsável, não resolvidos silenciosamente.

---

## 1. A identidade que o jogador deve perceber

### 1.1. Frase-diretriz (norte criativo)

**Modern high-detail pixel art · top-down orthographic · cozy biophilic futurism.**

Tradução operacional: **um campus vivo de ensino de idiomas, cercado de natureza rica, arquitetura clara e tecnologia sutil, visto de cima, com superfícies táteis, luz consistente e personagens pequenos, expressivos e legíveis.**

### 1.2. Seis atributos obrigatórios

| Atributo | O que isso significa em cena | Falha a evitar |
|---|---|---|
| Acolhedor | Jardim, bancos, interiores convidativos, escala humana | Hospital/laboratório frio |
| Futurista discreto | Vidro, painéis suaves, linhas arquitetônicas limpas, detalhes ciano | Cyberpunk neon e hologramas em toda parede |
| Natural e profundo | Copas em camadas, sombras, flores e materiais variados | Textura ruidosa sem hierarquia |
| RPG explorável | Portas reconhecíveis, trajetos claros, lugares memoráveis | Cenário bonito, mas impossível de navegar |
| Educacional | Sinalização útil, salas e objetos com função comunicativa | UI de jogo competindo com a aula |
| Autoral e consistente | Gramática de formas, luz, escala e cor repetível | Colagem de assets de estilos incompatíveis |

### 1.3. Antirreferências (exclusões)

- Não isométrico, não perspectiva 3D com ponto de fuga, não cenário "diagonal" genérico.
- Não replicar sprites, mapas, criaturas, personagens, tiles, músicas ou trade dress de Pokémon, Eastward ou CrossCode. São referências de **qualidade e comportamento**, não um catálogo para copiar.
- Não usar imagens gigantes achatadas como formato final de cenários interativos.
- Não usar gradientes fotográficos/blur generalizado para fingir profundidade em pixel art.
- Não decorar todo espaço disponível: piso e caminhos precisam respirar.
- Não deixar IA geradora redefinir a escala, os materiais ou a aparência de um personagem a cada execução.

## 2. Referências e o que extrair de cada uma

| Referência | Aprender com | Não copiar |
|---|---|---|
| **Pokémon FireRed** | Leitura top-down, movimento claro, gramática de rotas, entradas e prioridades de desenho | Identidade visual, mapas, personagens, conteúdo |
| **Eastward** | Densidade controlada, matéria/atmosfera, vegetação detalhada, iluminação narrativa | Paleta ou sprites específicos, composição literal |
| **CrossCode** | Organização tecnológica, objetos legíveis, materiais de ambientes modernos, feedback visual | Interface, cenários e assets específicos |
| **Referência de floresta do usuário** | Acabamento, textura da vegetação, caminhos, lago, sobreposições | Posições e objetos concretos da imagem; **requer inspeção antes de homologação** |
| **Campus `campus-v1.png`** | Intenção arquitetônica, jardim/recepção/sala, enquadramento e áreas caminháveis | Tratar a composição achatada como tiles prontos |

Links de pesquisa: [Eastward](https://eastwardgame.com/) · [CrossCode](https://www.cross-code.com/) · [Pokémon FireRed (conceito de exploração)](https://en.wikipedia.org/wiki/Pok%C3%A9mon_FireRed_and_LeafGreen). O uso de referências não transfere autorização de reutilizar arte protegida.

## 3. Três caminhos de direção visual — mesma planta, linguagens distintas

**Objetivo do confronto futuro:** renderizar o *mesmo* jardim + entrada de recepção + um aluno, com o *mesmo* mapa, ângulo e escala. Mudar apenas direção artística. Não tratar texto como prova visual.

### Caminho A — Jardim cinematográfico (RECOMENDADO PARA O PRIMEIRO ESTUDO)

- Predominância de natureza rica e luminosa; arquitetura marfim e vidro recuada; tecnologia como acento.
- Árvores com 3–4 massas cromáticas bem agrupadas; copas oclusivas, troncos separados, água com reflexos pixelados comedidos.
- Luz de fim de manhã, sombras macias porém desenhadas em clusters pixelados.
- **Prós:** memorável, acolhedor, diferencia a escola; condiz com a referência de floresta descrita.
- **Risco:** detalhamento natural engolir portas, caminhos e avatar.

### Caminho B — Campus arquitetônico contemporâneo

- Formas construídas mais evidentes; piso, mobiliário e vidro dominam; verde mais organizado.
- Contraste arquitetônico e sinalização mais fortes; atmosfera de escola do futuro.
- **Prós:** leitura das salas, menos ruído, potencialmente mais barato de produzir.
- **Risco:** parecer app corporativo com plantas decorativas.

### Caminho C — Atmosfera narrativa noturna / entardecer

- Luz quente interna contra jardins frios e elementos ciano; profundidade atmosférica evidente.
- **Prós:** apelo emocional, excelente para eventos e sazonais.
- **Risco:** comprometer legibilidade para uso diário, contraste e variações de contexto.

**Proposta de decisão:** caminho **A como base diurna**; aproveitar rigor arquitetônico de **B** e reservar **C** para variantes de horário/evento. **Ainda depende de três estudos visuais autorizados e aprovação do responsável.**

## 4. Sistema de cor — paleta de trabalho, não definitiva

Paleta inicial para prototipação e comparação. **Todos os códigos abaixo são propostos, não extraídos nem medidos a partir das imagens de referência.** Evitar obrigatoriedade de cores exatas antes de inspeção visual.

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

**Hierarquia de cor:** jardim = verdes dominantes; arquitetura = neutros quentes; tecnologia = acentos ciano localizados; interação/objetivo = uma cor de foco distinta. Não usar excesso de saturação simultânea em todas as categorias.

**Controle de contraste:** testar legibilidade do avatar em gramado, caminho, interior e sombra. Texto da interface HTML/CSS deve buscar WCAG AA apropriado ao tamanho/uso; indicadores importantes precisam de redundância por forma/ícone, não apenas cor.

**Material ilustrativo:** `docs/assets/ART-BIBLE-PALETA-V1.svg` (amostras vetoriais editáveis). A paleta em SVG é uma demonstração, não evidência de renderização do jogo.

## 5. Gramática espacial e escala

### 5.1. Geometria canônica preservada

- **Projeção:** top-down ortográfica com visão parcial das faces frontais das paredes, sem ponto de fuga.
- **Grade lógica existente:** 16 × 16 px, preservada na primeira comparação. `public/maps/reception.tmj` usa 30 × 20 células; isso descreve um **trecho técnico**, não o tamanho final do campus.
- **Caminhada:** manter tanto o modo em grade como o livre até os testes controlados; avatar ancorado pelos pés; colisões menores que a silhueta.
- **Mapa:** pisos, bordas, parede, objetos, canopy/foreground, colisões e gatilhos devem ser independentes.

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
3. Portas precisam ser distinguíveis de janelas e paredes, inclusive sem efeito luminoso.
4. Itens interativos devem ter pistas sutis e consistentes — não marcar tudo com partículas.

### 6.2. Contorno

- Priorizar *selout* (contorno colorido conforme material) ou bordas internas de sombra em vez de preto puro universal.
- Evitar linha preta muito grossa em arquitetura clara.
- Manter espessura aparente coerente entre avatar, folhagem, portas e mobiliário.
- Não exigir contorno integral em piso e grama; clusters de cor fazem a separação.

### 6.3. Textura

- Usar pixels agrupados (*clusters*) em vez de ruído aleatório por pixel.
- Piso caminhável: **baixa frequência de detalhe**; bordas de jardim e canteiros: **média**; copas e áreas periféricas: **média/alta**.
- Reservar detalhes minúsculos para áreas de pausa/observação, não para a área central de deslocamento.
- Materiais distintos devem ser identificáveis **mesmo sem cor** por ritmo de textura e arestas.

### 6.4. Luz e sombra

- **Fonte primária candidata:** sol de manhã/fim de manhã vindo do quadrante superior esquerdo da cena; **direção a homologar após comparação visual**.
- Sombras projetadas coerentes em todo o trecho. Priorizar iluminação pré-computada e integrada aos assets; usar runtime apenas para elementos que realmente mudam.
- Sombras dos personagens, árvore e elementos suspensos devem ajudar a explicar a altura e a ancoragem, sem simular 3D incoerente.
- Ciano é **luz funcional de interface/arquitetura**, não banho de neon na vegetação.
- Estado noturno, Natal e eventos: **variantes de iluminação/camadas**, não alteração destrutiva do mapa-base.

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

### 8.3. Composição da primeira cena

- **Topo:** fachada + recepção reconhecíveis; entrada central clara.
- **Centro:** caminho caminhável conectando porta e jardim; contraste visual suficiente para protagonista.
- **Laterais:** vegetação em volumes e bancos, com detalhes que convidem à exploração, sem bloquear circulação.
- **Água:** lago pequeno e legível, como ponto secundário de interesse, sem virar obstáculo não explicado.
- **Interação:** porta acionável, árvore com oclusão correta, ponto de informação; funcionalidades pedagógicas **representadas visualmente**, sem simular que já funcionam.
- **Acesso:** todos os destinos essenciais fáceis de identificar sem tutorial longo.

## 9. Mundo vivo e ambientes pedagógicos futuros — regras de estilo desde já

A visão canônica já permite imaginar gincanas, mudanças sazonais, aulas em objetos e investigação. **Não implementar estes recursos na A-01.** Preparar espaço na linguagem visual:

- **Objetos pedagógicos:** definição visual de affordance (algo examinável/interativo) com pistas consistentes; objetos precisam de IDs e propriedades, não dependem de LLM para existir.
- **Missões colaborativas:** marcadores e pistas devem ser claros para iniciantes; feedback privado não pode aparecer para toda a turma por engano.
- **Natal e demais eventos:** decoração em camadas opcionais e reversíveis, respeitando preferências culturais e acessibilidade. Não mover portas/obstáculos sem validação determinística.
- **Adaptação individual:** conteúdos e objetivos podem variar por aluno, mas a geometria compartilhada do multiplayer exige uma fonte de verdade comum.
- **Professor criador de gincanas:** futuramente propõe atividades estruturadas; um validador determinístico decide se cada plano cabe nos locais e regras; a IA não modifica livremente colisões/mapas de produção.
- **Aprendizagem sem jogos:** aluno deve poder entrar numa aula ou praticar conversação sem participar de missão exploratória.

## 10. Interface durante aulas

- O mapa é o ambiente; ferramentas de ensino são interface HTML/CSS (React se necessário), não painéis desenhados em tempo real dentro da textura.
- Durante a aula, reservar uma região visual clara para controles de microfone, participantes, legenda/transcrição e progresso; nenhum elemento do mapa deve impedir ações essenciais.
- Movimento e efeitos podem reduzir/pausar durante sessões. Áudio e estado pedagógico não dependem da renderização do Phaser.
- Preferências futuras: redução de movimento, legibilidade, contraste, volume, legendas e navegação por teclado.
- Evitar indicadores pulsantes persistentes, flashes e partículas em grande quantidade.

## 11. Pipeline de arte: estágios, portas de qualidade e arquivos

**Pipeline de referência aprovado no cânone:**

`Direção de arte → PixelLab AI (ou outra fonte autorizada) → Pixelorama/Aseprite → Tiled → Phaser + TypeScript → inspeção visual e desempenho`

**Não é uma obrigação de assinar/instalar PixelLab.** Comparar custo, controle, qualidade, licença, resolução, consistência e exportação antes da adoção operacional.

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

**O que já está implementado, com base no repositório e documentação consultados:**

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

## 13. Checklist verificável de aprovação A-01

A-01 só pode ser marcada como **APROVADA** quando o responsável:

- [ ] Viu lado a lado a referência principal de floresta, a arte original do Campus e os estudos com escala compatível.
- [ ] Escolheu uma direção entre A/B/C (ou uma combinação explícita), sem ambiguidade.
- [ ] Aprovou a paleta (ou alteração documentada) e o contraste do personagem nos principais pisos.
- [ ] Aprovou proporção dos personagens, tamanho de tile, câmera, materiais e sombras.
- [ ] Confirmou leitura da fachada, recepção e entrada no nível normal de zoom.
- [ ] Validou três amostras **visuais reais**, no mínimo: vegetação, fachada/recepção e estudante.
- [ ] Confirmou os critérios de rejeição de geração por IA e a política de assets originais/licenciados.
- [ ] Concordou com o pipeline e com suas portas de validação antes da produção em escala.
- [ ] Registrou uma decisão datada (APROVADA / APROVADA COM ALTERAÇÕES / REPROVADA).

**A-01 nesta entrega:** documento técnico-artístico proposto; **homologação pendente**. Não confundir uma Art Bible escrita com a conclusão visual da Etapa A.

## 14. Próximos subpassos — restritos à frente de análise/arte

| ID | Ação | Responsável | Entregável | Autorização |
|---|---|---|---|---|
| A-01.1 | Revisar esta Art Bible e a paleta | Estratégia + responsável | versão comentada | análise liberada |
| A-01.2 | Comparar imagens de referência reais | Estratégia + responsável | notas de divergências | fornecer/reabrir imagens |
| A-01.3 | Produzir **três estudos visuais do mesmo enquadramento** | Artista/IA sob direção | A/B/C lado a lado | **autorização específica de geração** conforme cânone |
| A-01.4 | Aprovar caminho e atualizar somente a Art Bible | Responsável | decisão assinada/datada | aprovação explícita |
| B-01 | Sprite de estudante definitivo e walk cycle | Codex/Claude + direção | arte e demo isoladas | **após A aprovada** |

**Primeira solicitação possível para o engenheiro (sem alterar arquivos):**

> Leia `AGENTS.md`, `PLANO-CONGELADO.md`, `docs/PLANO-CANONICO-INTEGRAL.md`, `refs canones/CANONE-VISUAL-E-UNIVERSO-PEDAGOGICO.md` e a Art Bible proposta. Em modo de **análise somente**, produza um inventário de pontos de integração para spritesheets, tilesets e camadas Tiled, uma matriz de risco de renderização (zoom, filtragem, câmera, profundidade) e um protocolo de comparação controlada com a V1. Não instale ferramentas, não inicie serviços, não rode testes de carga e não edite arquivos sem autorização específica. Preserve todas as regras de segurança do Mac e diferencie observado, previsto e hipótese.

## 15. Decisão executiva proposta

**Manter:** Phaser, TypeScript, WebGL, grade lógica de 16 px para o experimento inicial, Tiled, sistemas existentes de movimento/câmera/colisão, prioridade ao áudio e às aulas.  
**Substituir futuramente:** arte provisória construída por primitivas geométricas; cenários finais baseados em imagem única.  
**Experimentar:** PixelLab AI, Pixelorama/Aseprite, spritesheets de produção, iluminação sutil, três caminhos visuais sob um mesmo layout.  
**Não fazer agora:** trocar de engine, escalar dezenas de áreas, implementar gincanas/IA/multiplayer, instalar ferramentas sem avaliação, alterar a `main`.

**Veredito:** a melhor próxima ação não é escrever mais gameplay nem gerar um mapa gigante; é **homologar uma linguagem artística reproduzível** e só então produzir um personagem e um trecho modular de qualidade comercial.

---

## Registro de decisões e revisão

| Data | Item | Estado | Evidência |
|---|---|---|---|
| 14/11/2026 | Meta de acabamento de RPG comercial | **Aprovada como visão** | Cânone visual na `main` |
| 14/11/2026 | Pipeline de referência PixelLab → editor → Tiled → Phaser | **Aprovado como referência** | Cânone visual |
| 14/11/2026 | Caminho A como proposta principal | **Recomendado, não aprovado** | Critérios desta Art Bible; faltam estudos visuais |
| 14/11/2026 | Paleta hex e sprite candidato 32 × 40 | **Propostos, não aprovados** | Esta Art Bible |
| 14/11/2026 | Integração e geração dos assets na `main` | **Não autorizada** | Escopo A-01 |

**Autoria editorial:** ChatGPT, atuando na frente de mentoria/estratégia. **Responsável pela homologação:** direção do produto.  
**Última nota:** esta versão é uma proposta de documentação — nenhum arquivo de produção, dependência, repositório ou sistema local foi modificado.
