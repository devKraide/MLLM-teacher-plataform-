# CAMPUS — Cânone de direção visual, pipeline artístico e universo pedagógico explorável

**Status:** APROVADO PELO RESPONSÁVEL DO PROJETO PARA DOCUMENTAÇÃO E PLANEJAMENTO  
**Data de adoção da visão:** 14/11/2026  
**Natureza:** complemento oficial de visão e de plano de ação visual, não substituição do plano canônico anterior  
**Destino sugerido no repositório:** `docs/CANONE-VISUAL-E-UNIVERSO-PEDAGOGICO.md`  
**Origem técnica:** `https://github.com/devKraide/MLLM-teacher-plataform-` e `docs/CONTEXTO-PORTATIL.md`  
**Escopo desta entrega:** documento, sem alteração de código, assets, dependências, instalações ou serviços.

> **Declaração de adoção.** A direção estratégica, o diagnóstico da V1, as recomendações técnicas, o pipeline visual, as referências de acabamento, o plano visual A–E e a tese de transformar o cenário em um ambiente de aprendizagem explorável passam a orientar o desenvolvimento do Campus. A Seção 1 reproduz **integral e literalmente** a auditoria aceita, sem reescrevê-la. A Seção 2 acrescenta as novas ambições explicitadas pelo responsável e critérios práticos para evitar interpretações contraditórias.

## Como este cânone se relaciona com os documentos já aprovados

1. **Não revoga** `docs/PLANO-CANONICO-INTEGRAL.md`, `PLANO-CONGELADO.md`, `docs/CENARIO-V1.md` ou `AGENTS.md`. Em particular, mantém a prioridade máxima à segurança do Mac e a obrigação de autorizações específicas para instalar dependências, executar serviços ou testes de carga e modificar dados sensíveis.
2. **Formaliza uma decisão nova de produto e de direção de arte:** melhorar radicalmente o acabamento visual da base existente, preservando Phaser + TypeScript + WebGL + mapas Tiled e o princípio de validar antes de expandir.
3. **Não confunde compromisso de visão com implementação atual.** Os sistemas de voz, multiplayer, professores de IA e universo dinâmico ainda são planejados. A aprovação deste documento não significa que já funcionem e não autoriza implementação indiscriminada.
4. **Ferramentas artísticas candidatas continuam experimentais**, especialmente PixelLab e Pixelorama. A escolha final deve seguir qualidade demonstrada, licença, custo e compatibilidade. Aseprite pode ser adotado quando necessário; não é pré-requisito para começar a etapa A.
5. **Quando houver conflito material** com uma decisão técnica já congelada, registrar a divergência e obter aprovação explícita antes de substituir a regra vigente. Esta aprovação permite planejar a nova frente; não apaga o histórico canônico.

---

# SEÇÃO 1 — Auditoria adotada, transcrição integral e literal

Esta seção é preservada **sem cortes, sem resumo, sem correção editorial e sem substituição de termos**. Suas afirmações sobre o estado do repositório e medições são um retrato da auditoria que fundamentou a decisão, não dados medidos novamente ao ler este documento.

<!-- INICIO_TRANSCRICAO_INTEGRAL -->
# **Auditoria do Campus — da V1 atual à experiência visual de alto nível**

Repositório e documentação analisados

**Minha conclusão inicial: não precisamos reconstruir o projeto do zero nem trocar de engine. Precisamos substituir o pipeline de produção visual.**

O projeto não é exatamente um jogo como Pokémon FireRed. É uma **escola virtual de idiomas com exploração em RPG 2D, professores de IA, aulas individuais e coletivas e interação entre alunos**.

A ambição visual pode ser a de um RPG comercial de alta qualidade. Mas a experiência precisa continuar sendo uma escola: bonita, explorável, acolhedora, legível e funcional durante aulas reais.

## **1. O que identifiquei no projeto atual**

Examinei o [repositório MLLM-teacher-plataform-](https://github.com/devKraide/MLLM-teacher-plataform-?utm_source=chatgpt.com), incluindo o README, as cenas TypeScript, o gerador de arte provisória, os mapas Tiled e o documento `CONTEXTO-PORTATIL.md`.

| Componente                           | Estado constatado                                |
| ------------------------------------ | ------------------------------------------------ |
| Engine                               | Phaser 3.90.0 + TypeScript + WebGL               |
| Mundo original                       | Uma ilustração inteira de 1536 × 1024 pixels     |
| Mundo modular                        | Mapa Tiled de 30 × 20 células, tiles de 16 × 16  |
| Tileset modular                      | Apenas 5 tiles básicos                           |
| Personagem modular                   | Desenhado por código, com retângulos e cores     |
| Animação                             | 3 quadros por direção, gerados programaticamente |
| Movimento                            | Modos grade e livre, com colisões                |
| Profundidade                         | Sobreposição por coordenada Y, inclusive copas   |
| Multiplayer, voz e professores de IA | Planejados, ainda não executáveis                |

O documento do projeto também registra 14 testes aprovados e uma amostra do cenário modular de 59,3 FPS, mas P95 de 25,8 ms — acima da meta de 20 ms. Não executei novos testes nem abri a aplicação em um navegador nesta análise.

### **O principal problema visual**

No código `src/modular-art.ts`, o personagem é literalmente construído com comandos como `fillRect()` para desenhar cabelo, rosto, roupas e pernas.

Em `src/modular-scene.ts`, árvores, paredes, balcões e outros elementos também são majoritariamente desenhados por primitivas geométricas.

Isso funciona para **validar colisões, câmera, movimentação e profundidade**. Não é um método adequado como pipeline principal de arte para atingir o acabamento que você quer.

O problema não é que Phaser seja visualmente limitado. É que a versão modular ainda utiliza gráficos deliberadamente provisórios.

Há, portanto, duas coisas diferentes a preservar:

- **A base técnica:** movimentação, colisões, portas, câmera, testes e estrutura do mapa.
- **A apresentação visual:** personagens, vegetação, edifícios, interiores, animações e composição — que precisam de uma nova produção artística.

E o contexto portátil estabelece que o desenvolvimento principal está pausado. Vou tratar esta proposta como uma análise de arquitetura, sem mudar os arquivos ou as decisões já aprovadas.

## **2. Qual deveria ser a nova referência visual?**

Eu deixaria FireRed como referência de **movimentação e exploração**, mas adotaria dois jogos mais modernos como referências de acabamento artístico.

[Eastward preview: a promising pixel post-apocalypse | Film Stories](https://images.openai.com/static-rsc-4/od8IaurKo0zcFgXx0c5rIaX53R1O3Btn1CuONzuB0c5_I4UYgM8pd0cmCVjS6wx0AO9B0AqGYqOQfRbbTeYTARCL3vvZFauThGuFTNrNVwkAoYrV9M3IaMQDbyrdZHycEcg0mLp9Q0BzuWtXW7Xna8tlSZWV-rh2P_iWBIvY7yM?purpose=inline)

**Eastward**

Vegetação densa, luz, sombras, objetos detalhados e cenários com personalidade.

[CrossCode - Screenshots](https://images.openai.com/static-rsc-4/D3q4VAQjQjco2H7Lu7dJmC5JxAXq4B1kNxBEciiLhhcWEjL-dX9yfCsuAIAZ6LQiIjYpgRgptSyLW4RcZ6mEytpMp5X5eMYM6S6rfIdIfsGPkKDgRxQ4_-lvp7Mjd1Zmc5hQOD_OKSUHCWegV0nJKJuKwYLx9yz6kGTbEETgaAg?purpose=inline)

**CrossCode**

Arquitetura tecnológica, ambientes urbanos, materiais e efeitos visuais.

O resultado que imagino para o Campus é uma combinação dessas qualidades, mas com arquitetura educacional contemporânea, jardim, salas sofisticadas, paredes claras e iluminação ciano discreta.

O exemplo de Eastward é relevante porque seus criadores usaram Aseprite, ferramentas próprias de automação e um sistema de iluminação avançado sobre elementos de pixel art. Ou seja, essa qualidade não vem simplesmente de gerar imagens maiores.&#x20;

[image](https://www.google.com/s2/favicons?domain=https://eastwardgame.com\&sz=32)

Eastward+1



Eu estabeleceria a seguinte direção:

**Modern high-detail pixel art, top-down orthographic, cozy biophilic futurism.**

Manteria a perspectiva ortográfica já aprovada. Não mudaria para isométrico nem para 3D.

## **3. Stack de design que eu escolheria**

| Tecnologia       | Função no Campus                                 | Decisão                            |
| ---------------- | ------------------------------------------------ | ---------------------------------- |
| PixelLab AI      | Gerar personagens, animações, tilesets e objetos | Adicionar ao pipeline experimental |
| Pixelorama       | Refinar e editar arte diretamente no navegador   | Testar primeiro                    |
| Aseprite         | Acabamento, animações, paletas e exportação      | Adotar quando necessário           |
| Tiled Map Editor | Construção das salas, jardim, colisões e camadas | Manter                             |
| Phaser 3         | Renderização, câmera, animações e interações     | Manter                             |
| TypeScript       | Lógica do jogo e validações                      | Manter                             |
| HTML/CSS e React | Interfaces de aula, painel e perfil              | Manter a separação atual           |

### **Por que PixelLab?**

Porque ele permite gerar arte mais próxima de um formato utilizável no jogo.

A documentação atual confirma suporte a personagens direcionais, animações de caminhada, spritesheets e tilesets conectáveis. O criador de tilesets trabalha com tamanhos de 16 e 32 pixels, compatíveis com o tipo de mundo que já existe no projeto.&#x20;

[image](https://www.google.com/s2/favicons?domain=https://www.pixellab.ai\&sz=32)

PixelLab Docs+1



Além disso, ele possui uma integração MCP para agentes de programação. Isso abre a possibilidade de um agente criar ou revisar assets durante o desenvolvimento, em vez de obrigar você a fazer cada exportação manual.&#x20;

[image](https://www.google.com/s2/favicons?domain=https://www.pixellab.ai\&sz=32)

PixelLab Docs



O Pixelorama integrado ao PixelLab pode funcionar no navegador. É a alternativa mais simples para experimentar sem instalar inicialmente o Aseprite.&#x20;

[image](https://www.google.com/s2/favicons?domain=https://www.pixellab.ai\&sz=32)

PixelLab Docs



### **Por que não usar só geração de imagens comum?**

O `campus-v1.png` já exemplifica a limitação: gerar uma composição inteira serve para descobrir o estilo desejado, mas não oferece separação real entre árvores, telhados, pisos, paredes, objetos e suas colisões.

Para uma escola com personagens se movimentando e entrando em salas, esses elementos precisam ser independentes.

Pipeline visual proposto

**Direção de arte**

Paleta, perspectiva, escala e referências aprovadas

**PixelLab AI**

Gera peças separadas e animações condicionadas a referências

**Pixelorama / Aseprite**

Corrige e padroniza a arte, com controle de qualidade

**Tiled**

Monta cenários, camadas, portas e objetos

**Phaser + Campus**

Jogo navegável com os sistemas técnicos existentes

## **4. Existem também alguns ajustes técnicos concretos**

A inspeção do código revelou escolhas de renderização feitas para acomodar a arte original, mas que precisam ser reavaliadas com sprites definitivos.

| Arquivo                | Situação                                                                             | Recomendação                                     |
| ---------------------- | ------------------------------------------------------------------------------------ | ------------------------------------------------ |
| `src/main.ts`          | `pixelArt: false`, `antialias: true` e `roundPixels: false`                          | Testar configurações próprias para pixel art     |
| `src/modular-scene.ts` | O tileset usa filtro `LINEAR`                                                        | Comparar com `NEAREST`                           |
| `src/scene.ts`         | O avatar original é reduzido para 55 px de altura a partir de uma imagem muito maior | Substituir por sprite criado na resolução de uso |
| `src/modular-art.ts`   | Caminhada feita com desenhos geométricos                                             | Substituir por spritesheet direcional            |

O Phaser 3.90 documenta especificamente `pixelArt: true` para renderização com pixels mais nítidos e arredondamento de posições.&#x20;

[image](https://www.google.com/s2/favicons?domain=https://docs.phaser.io\&sz=32)

Phaser Help



Contudo, **eu não ativaria essas opções indiscriminadamente**. O código atual usa escala fracionária para mostrar a composição original. Alterar filtragem e arredondamento pode melhorar a aparência modular, mas também introduzir tremidas ou prejudicar a versão original.

A escolha precisa ser testada comparando ambas as cenas com a mesma câmera e medindo a cadência.

## **5. Como fazer a primeira versão realmente bonita**

Minha proposta seria uma *vertical slice visual*, ou seja, um pedaço pequeno do Campus com acabamento próximo ao de um jogo comercial.

**Etapa A — Visual aprovado**

Criar um *art bible*: paleta, proporções, sombra, perspectiva, iluminação, regras de contorno e exemplos. Definir uma aparência consistente antes de produzir dezenas de assets.

**Etapa B — Primeiro personagem definitivo**

Um estudante com quatro direções, animação de caminhada e idle, proporção padronizada e pés alinhados ao sistema de movimentação existente.

**Etapa C — Jardim e recepção**

Substituir o tileset de cinco peças por uma biblioteca artística real, com caminhos, canteiros, árvores, fachadas e interiores. Manter colisões e profundidade funcionais.

**Etapa D — Polimento**

Animações discretas de vegetação, água, portas e iluminação. Pequenos efeitos atmosféricos, sem poluir a tela nem comprometer a meta de desempenho.

**Etapa E — Validação**

Avaliar consistência artística, proporções, fluidez, colisões, legibilidade e experiência de exploração. Comparar com a versão atual antes de considerar a migração.

Preservaria inicialmente a grade de navegação de 16 pixels. O personagem visual pode ocupar 32 × 40 pixels, por exemplo, sem obrigar a física e as colisões a adotarem essa mesma dimensão. O ponto dos pés permanece como âncora.

Isso é importante porque **mais detalhes visuais não exigem automaticamente refazer a movimentação ou aumentar a complexidade computacional**.

## **6. A profundidade precisa servir ao ensino**

Existe outra oportunidade além de deixar o Campus bonito.

Em Pokémon, explorar revela personagens, lugares e atividades. No Campus, a exploração também pode fazer parte do aprendizado.

Por exemplo, um aluno poderia caminhar até uma cafeteria da escola, conversar com um professor de IA para praticar pedidos em inglês, receber um objetivo contextual e encontrar outros estudantes em uma atividade coletiva.

As salas poderiam mudar sutilmente conforme o tipo de aula. Objetos poderiam servir de contexto para exercícios de vocabulário. O jardim poderia ter atividades exploratórias, sem transformar cada aula em um minijogo obrigatório.

Essa seria uma forma de **profundidade interativa e pedagógica**, e não apenas decorativa.

Não implementaria essas ideias agora. Elas são hipóteses de produto a validar depois que o cenário e a conversa por voz estiverem prontos.

## **7. O que a IA ainda não resolve sozinha**

A maior incerteza não é gerar uma árvore ou um estudante. É conseguir que 40 árvores, 20 NPCs, quatro salas, diferentes animações e vários estados visuais pareçam feitos pelo mesmo artista.

O PixelLab ajuda a criar os elementos. O Aseprite ajuda a revisá-los. O Tiled ajuda a organizá-los. Nenhuma dessas ferramentas garante automaticamente direção artística de nível comercial.

Para atingir algo comparável a Eastward, eu reservaria espaço no processo para **revisão humana de arte**, mesmo que pontual e contratada externamente. Um bom artista validando escala, composição e paleta pode ter mais impacto do que gerar centenas de novas imagens.

E a nova direção visual não pode competir com a finalidade principal do produto: uma aula coletiva de inglês deve continuar fluida, com interface legível, áudio estável e ausência de distrações excessivas. O plano atual estabelece essa prioridade, além do teto de 60 FPS e da validação futura de voz para seis alunos.&#x20;

CONTEXTO-PORTATIL.md

CONTEXTO-PORTATIL.md



## **Minha decisão recomendada**

**Manter Phaser + TypeScript**

Sim

**Manter Tiled e os sistemas de navegação**

Sim

**Substituir os gráficos provisórios**

Prioridade

**Testar PixelLab e Pixelorama**

Experimento isolado

**Migrar o projeto inteiro para outra engine**

Não agora

**Veredito:** o Campus já possui uma fundação técnica aproveitável. O problema imediato não é a escolha da engine. É a ausência de um pipeline de arte profissional, capaz de transformar conceitos bonitos em um mundo modular, animado e visualmente consistente.

Eu usaria **Eastward como referência de qualidade artística, FireRed como referência inicial de exploração e o PixelLab como acelerador de produção**, sempre com revisão e validação.

A primeira prova de que isso funciona seria ter **um jardim, uma recepção e um único estudante tão visualmente bem resolvidos que já parecessem parte de um jogo comercial**. Só expandiria o Campus depois desse resultado.

Nenhuma instalação, mudança de código ou alteração do plano congelado foi realizada.
<!-- FIM_TRANSCRICAO_INTEGRAL -->

---

# SEÇÃO 2 — Complemento canônico: universo pedagógico vivo e execução disciplinada

Esta seção **acrescenta** decisões de visão aprovadas após a auditoria, sem retirar nada da Seção 1. Distingue o que é *diretriz de produto*, *hipótese de recurso* e *etapa autorizada para planejamento*. Nada abaixo altera por si só o escopo operacional congelado.

## 2.1. Visão oficial de longo prazo

**Campus é um universo educacional explorável e progressivamente adaptativo.** O mapa não existe apenas para exibir a escola: ele pode criar oportunidades de aprendizagem por descoberta, interação, colaboração e contexto. O professor de IA deve, futuramente, coordenar atividades pedagógicas relacionadas ao espaço, às pessoas presentes, ao nível do aluno, aos objetivos de aprendizagem e aos eventos programados.

São **diretrizes canônicas de visão**, ainda não uma promessa de entrega na V1:

- O mundo visual deve ser acolhedor, memorável e suficientemente profundo para despertar curiosidade, sem competir com a conversa real e a atenção durante a aula.
- A descoberta de lugares, objetos e NPCs poderá ativar práticas linguísticas com intenção pedagógica verificável.
- O professor de IA poderá propor **gincanas, missões colaborativas, desafios de exploração, investigação, busca e diálogos situacionais**, configurando objetivos, materiais, dicas e critérios de conclusão.
- A experiência poderá adaptar **atividades, recomendações, dificuldade, feedback e eventos visuais** aos perfis individuais e ao contexto coletivo, respeitando consentimento, acessibilidade e limites de personalização.
- O cenário poderá apresentar **eventos e ambientes sazonais** (por exemplo, Natal) com variantes de decoração, diálogos, tarefas e encontros. Temáticas culturais serão configuráveis e não presumidas como universais.
- O próprio uso poderá alimentar um ciclo de melhoria: interação → evidência de aprendizagem → atualização de progresso → planejamento de próxima atividade → nova interação. Não confundir isso com treinamento automático de modelos usando dados dos alunos.
- O mundo poderá ganhar novas áreas e modalidades de aula à medida que a qualidade de voz, estabilidade e pedagogia forem demonstradas.

**Viabilidade:** os componentes dessas experiências são tecnicamente viáveis com engines 2D, estado compartilhado, sistemas de eventos e modelos multimodais. Sua execução confiável, custo, proteção de dados, qualidade pedagógica e escala **não estão comprovados** neste protótipo e exigem validação por etapas. Não há garantia de que um agente possa improvisar mapas, missões e avaliações em produção sem uma camada de validação.

## 2.2. Modelo de evolução recomendado para o mundo vivo (hipótese arquitetural)

Em vez de dar permissão irrestrita para uma LLM reescrever o mapa do jogo em tempo real, trabalhar futuramente com um sistema de conteúdos e eventos **estruturados, verificáveis e reversíveis**:

1. **Catálogo de mundo:** objetos e lugares com IDs estáveis, propriedades e interações permitidas (ex.: cafeteria, quadro, árvore, biblioteca, NPC, sala).
2. **Catálogo pedagógico:** objetivos de aprendizagem, habilidades, vocabulário, pré-requisitos e critérios observáveis de conclusão.
3. **Planejador do professor:** propõe missões e adaptações usando os catálogos e o contexto autorizado do aluno/turma.
4. **Validador determinístico:** confirma que objetivos, ações, locais, dificuldade, segurança, tempo e conteúdo são coerentes; rejeita propostas inválidas.
5. **Executor do jogo:** ativa apenas configurações aprovadas, eventos, pistas, marcadores, diálogos e mudanças visuais permitidas.
6. **Registro e feedback:** armazena evidências e progresso pertinentes, evita atualizações duplicadas e permite auditoria, cancelamento e recuperação.

Esse modelo favorece um **mundo reativo e pedagógico**, sem transformar a LLM no motor de física, de colisões, no servidor de voz ou na autoridade final sobre o estado compartilhado. É proposta para pesquisa posterior, não arquitetura já implementada nem nova dependência obrigatória.

## 2.3. Fronteiras do produto

- **Referência visual:** Eastward e CrossCode são referências de acabamento e de técnicas; FireRed é referência de leitura espacial e exploração. Produzir identidade própria, sem copiar personagens, mapas, sprites, trilhas ou propriedades intelectuais.
- **Referência pedagógica:** o jogo é meio; aprendizagem e qualidade de conversa são o fim. Aulas convencionais, conversação livre e acessibilidade devem continuar possíveis sem gincanas.
- **IA e multiplayer:** preservar a separação entre áudio de pessoas, coordenação do professor, estado do jogo e persistência, já prevista no plano integral.
- **Segurança e privacidade:** conteúdo adaptativo deve usar somente dados autorizados, com minimização, retenção definida, adequação de idade, moderação e governança de eventos coletivos.
- **Desempenho:** priorizar as metas e os testes no equipamento de referência; efeitos visuais opcionais nunca devem deteriorar o áudio ou mascarar falhas técnicas.

## 2.4. Pipeline artístico oficial de referência

**Direção de arte → PixelLab AI (exploração/geração) → Pixelorama e/ou Aseprite (correção e padronização) → Tiled (composição, camadas, colisões e gatilhos) → Phaser + TypeScript (renderização e interação) → avaliação visual e técnica.**

Critérios transversais:

- **Unidade visual:** definir paleta, escala, perspectiva ortográfica top-down, contornos, famílias de materiais, sombras, brilho e densidade dos detalhes na *art bible*.
- **Modularidade:** entregar tiles e objetos separados; evitar que uma única imagem achatada substitua paredes, copas, portas, interiores e personagens.
- **Contratos de arquivo:** spritesheets/atlas em PNG (com transparência adequada) e metadados de quadros quando necessário; mapas TMJ/JSON; nomes e IDs estáveis; origem e licença de cada asset documentadas.
- **Escala inicial:** preservar a grade lógica atual de 16 px como hipótese-base. A dimensão visual de personagens (por exemplo, 32 × 40 px) é **candidata**, não tamanho congelado. Fixá-la após o teste da etapa A/B.
- **Profundidade real:** controlar oclusão e origem nos pés, separar chão/parede/decoração/frente/interação e usar regiões de colisão coerentes.
- **Animação:** gerar e revisar as quatro direções, parada e caminhada; manter silhueta, paleta, eixo e volume estáveis entre frames. IA pode acelerar, mas não dispensa controle de qualidade.
- **Renderização:** testar `NEAREST` vs. `LINEAR`, `pixelArt`/`roundPixels` e escalas da câmera **em comparação controlada**. Não trocar todas as flags por intuição nem degradar o cenário original.
- **Rastreabilidade:** registrar prompts, modelos, versões, referências, correções, licença, custos e arquivos-fonte. Evitar usar assets cuja exploração comercial não esteja autorizada.

## 2.5. Primeiro plano de ação visual: A → B → C → D → E

**Sim: A–E é o primeiro plano canônico de ação da *frente visual*.** Não é o roteiro integral do produto, nem substitui o marco de qualidade de voz e o plano técnico já aprovados. Há uma pendência anterior de medição da cadência de quadros: registrar baseline e comparar os modos com a arte/câmera existentes antes de atribuir ganhos ou regressões à nova arte.

### Etapa A — Visual aprovado

**Objetivo:** fixar a identidade artística antes de produzir dezenas de assets.

**Entregáveis:** *Art Bible v1* com direção "modern high-detail pixel art, top-down orthographic, cozy biophilic futurism"; referências permitidas; paleta e materiais; proporções; resolução/zoom sugeridos; perspectiva; regras de sombra, contorno, transparência, luz e densidade; três amostras de aplicação (por exemplo: vegetação, fachada/recepção e aluno); e comparativo com a arte original.

**Aceite:** responsável aprova um único conjunto coerente de regras visuais, inclusive critérios para rejeitar resultados de IA. Não é necessário instalar ferramentas nem modificar código para produzir a primeira versão do guia.

### Etapa B — Primeiro personagem definitivo

**Objetivo:** criar um estudante realmente utilizável como asset de produção.

**Entregáveis:** sprite autoral com quatro orientações, estados idle e caminhada, spritesheet/atlas e dados de animação, arquivo-fonte editável quando aplicável, ponto de origem nos pés e teste de escala no trecho modular.

**Aceite:** aparência coerente entre direções e quadros; caminhada sem mudanças involuntárias de roupa, proporção, cor ou expressão; alinhamento às colisões; teste de legibilidade sobre os pisos e caminhos do Campus; comparação com o personagem provisório.

### Etapa C — Jardim e recepção

**Objetivo:** transformar a demonstração modular em um trecho de ambiente com acabamento visual consistente.

**Entregáveis:** biblioteca de terrenos e transições, caminhos, vegetação, árvore com tronco/copa separados, fachada, portas, elementos internos, iluminação-base e mapa Tiled em camadas. Reutilizar navegação, portas e testes em vez de reescrever sistemas estáveis.

**Aceite:** jardim e recepção percorríveis, legíveis e belos; nenhuma colisão ou prioridade de desenho incoerente; asset modular reutilizável; nenhuma dependência de um único fundo gigante para implementar profundidade.

### Etapa D — Polimento

**Objetivo:** aprimorar percepção de qualidade sem introduzir custo gráfico descontrolado.

**Entregáveis:** um pequeno conjunto de animações discretas (vegetação, água, portas), sombras/iluminação controladas, microinterações, consistência entre avatar e cenário, ajustes de câmera e mitigação de artefatos visuais.

**Aceite:** efeitos podem ser reduzidos ou desligados; navegação e áudio futuro permanecem prioritários; nenhum ganho estético é aceito sem teste de regressão visual e técnica.

### Etapa E — Validação

**Objetivo:** demonstrar que o trecho funciona e atende ao padrão artístico aprovado, não apenas que ficou bonito em uma imagem.

**Entregáveis:** comparação lado a lado com a versão anterior; testes de caminhada, mudança de direção, parada, portas e oclusão; inspeção de zoom, paleta, proporção, alinhamento e legibilidade; build e testes; relatório de FPS, P95, memória/carga quando mensuráveis e limitações do equipamento.

**Aceite:** validação no navegador e no equipamento de referência definidos no plano técnico; alvo existente de 60 FPS e P95 de intervalo entre quadros ≤ 20 ms; bugs e desvios documentados; decisão explícita do responsável antes da expansão para a sala e para outras áreas. O registro anterior de 59,3 FPS/P95 25,8 ms **não** equivale à aprovação desta etapa.

### Ordem e paralelismo

- **Agora:** realizar A e registrar baseline técnico da versão atual como trabalho de medição separado, respeitando as autorizações e a segurança do Mac.
- **Após aprovação de A:** criar B; preparar experimentos pequenos de tiles para C, sem consolidar um estilo não aprovado.
- **Após B e C:** executar D e depois E; só escalar com evidência de qualidade.
- **Em paralelo, apenas planejamento:** explorar hipóteses pedagógicas e arquiteturais do universo vivo. Não antecipar voice stack, contas ou multiplayer no código do cenário por causa desta visão.

## 2.6. Duas frentes de trabalho e divisão de responsabilidade

| Frente | Mandato | Entrega típica | Limite |
|---|---|---|---|
| **Mentoria e estratégia — ChatGPT** | Visão, benchmarking, direção artística, produto, trade-offs, pesquisa, critérios de aceite e auditoria de resultados | Arte bible, hipóteses, briefs, revisões de qualidade, decisões documentadas | Recomendar não equivale a autorizar implementação, contratação ou instalação |
| **Engenharia — Codex / Claude** | Implementação disciplinada, experimentos, integração de assets, correções, testes, medições e documentação | Branch/PR isolado, diff enxuto, evidências e checklist de aceitação | Não alterar escopo congelado sem autorização; preservar dados, segurança e reversibilidade |
| **Responsável do projeto** | Aprovar direção de arte, despesas, mudanças relevantes de escopo, integrações e adoção no principal | Decisão explícita de aprovação/reprovação e prioridade | Aprovação de visão não é aprovação irrestrita de execução |

**Contrato sugerido para cada tarefa de engenharia:** (1) hipótese/resultado esperado; (2) arquivos permitidos; (3) arquivos proibidos; (4) avaliação de risco e dependências; (5) implementação mínima reversível; (6) testes executados e não executados; (7) screenshots/artefatos comparáveis; (8) desempenho medido; (9) aprovação para adoção. Preferir um experimento por branch ou cópia isolada, sem sobrescrever a V1 homologada.

## 2.7. Registro de decisões: aprovado × experimental × futuro

| Assunto | Classificação | Consequência |
|---|---|---|
| Aumentar a qualidade visual para padrão de RPG comercial, com identidade própria | **Visão aprovada** | Norte de qualidade, não resultado já comprovado |
| Manter Phaser, TypeScript, WebGL e Tiled | **Base técnica preservada** | Não migrar de engine sem evidência e aprovação |
| Produzir mundo modular e utilizar sprites/animações de verdade | **Diretriz aprovada** | Substituir placeholders gradualmente |
| Pipeline PixelLab → editor → Tiled → Phaser | **Pipeline de referência aprovado** | Ferramentas específicas ainda precisam de testes/licenças |
| A–E como primeiro plano visual | **Plano aprovado** | Começar por Art Bible e baseline, não por gerar o mapa inteiro |
| Atividades contextualizadas em objetos e lugares | **Visão aprovada, recurso futuro** | Prototipar depois da base visual e da validação de voz |
| Gincanas geradas por professor de IA e desafios colaborativos | **Visão aprovada, hipótese de execução** | Exigir controle pedagógico, validação e moderação |
| Mudanças do mundo por eventos sazonais, como Natal | **Visão aprovada, hipótese de execução** | Usar variantes controladas e reversíveis |
| Mundo que se retroalimenta com evidências de progresso | **Visão aprovada, hipótese de arquitetura** | Definir privacidade, métricas, limites e consentimento |
| Troca de engine, C/C++/WASM e infraestrutura própria | **Não aprovados por este documento** | Só revisitar mediante gargalo medido e autorização |

## 2.8. Primeira tarefa sugerida, imediatamente após registrar o cânone

**Brief de execução A-01 — Art Bible do Campus.**

Solicitar ao engenheiro/agente, em **modo de análise ou em experimento isolado autorizado**, uma proposta comparável de direção de arte e inventário de assets. Não alterar o código principal. Entregar um arquivo `ART-BIBLE-V1.md`, com proposta de paleta, escala, grade, câmera, sombras, texturas, silhueta de personagens, referências legais, exemplos de tiles/sprites, critérios de aprovação e divergências relevantes com a arte atual; anexar três estudos visuais de referência se forem especificamente autorizados. O responsável aprovará o estilo antes da produção em escala.

**Critério de conclusão da A-01:** há uma linguagem visual única e explícita que orienta qualquer artista humano ou IA, e não apenas imagens bonitas sem regras de reprodução.

## 2.9. Regra de mudanças futuras

Este documento é uma **linha de base canônica**. Alterações de visão, critérios ou tecnologia devem aparecer em uma nova decisão datada ou revisão versionada, com justificativa, impacto, riscos, teste e aprovação. Não reescrever silenciosamente a transcrição da Seção 1. Manter o histórico de por que cada decisão foi tomada.

---

**Nota de procedência:** Seção 1 = transcrição literal do texto de auditoria fornecido pelo responsável, preservado integralmente. Seção 2 = complemento editorial elaborado a partir da autorização expressa de canonização e da nova visão comunicada em 14/11/2026. Este documento registra decisões e propostas; não declara testes novos, mudanças efetivadas no repositório nem instalações realizadas.
