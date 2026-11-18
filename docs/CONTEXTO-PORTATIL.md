# Campus — contexto portátil para explorar ideias

Recorte de 14/11/2026. **Desenvolvimento principal pausado a pedido do usuário.** Este arquivo é autossuficiente para abrir outros chats. Reúne o estado real do protótipo, as decisões aprovadas, a próxima etapa e, ao final, o plano canônico, o complemento operacional e as regras na íntegra.

## Mensagem de abertura para os chats paralelos

> Quero explorar uma ideia em paralelo. Use este arquivo como contexto do projeto homologado. O desenvolvimento principal está pausado. Trate a ideia nova como hipótese e trabalhe em modo de análise por padrão. Se eu pedir um protótipo, faça em ambiente ou cópia isolada com autorização específica. Qualquer adoção no projeto principal depende da minha decisão explícita. Se surgir uma dúvida material ou um risco para meu Mac, pare e me avise antes de agir.

O documento pode ser usado sem acesso ao projeto. Os caminhos citados são relativos à raiz e servem para consulta quando esse acesso estiver autorizado. Mantenha arquivos e resultados de cada experimento separados. Autorizações anteriores para instalação ou execução não se transferem a um experimento diferente. Nenhum chat deve editar o plano congelado, o código, os assets ou os artefatos do projeto principal como parte da exploração.

## O produto que queremos

Uma pequena escola de idiomas na web, com visual de RPG 2D em pixel art e professores de IA. A escola deve ser moderna, futurista e acolhedora, com jardim, recepção, caminhos, vegetação detalhada, paredes claras, vidro e iluminação tecnológica discreta. A visão é de cima, com profundidade por camadas, sombras e sobreposição. A segunda imagem da conversa original, com floresta, caminhos e lago, é a principal referência de acabamento. Para discutir essa referência em outro chat, anexe a imagem novamente. Para mostrar a interpretação atual, anexe `public/assets/campus-v1.png`.

Cada aluno entra com perfil e avatar, vê os outros, anda pela escola e inicia ou retoma aulas. O piloto previsto é privado, por convite, principalmente no Brasil, em navegador de computador, para até seis alunos por turma e sem webcam. Inclui dois professores de inglês configuráveis por painel, instruções e materiais, aulas guiadas e conversação livre por voz e texto. Há início, pausa, retomada, objetivos, progresso individual e feedback privado. A memória individual e o histórico coletivo têm funções separadas. A escola completa deverá ter duas salas individuais e uma coletiva. **Campus** é o nome exibido na prévia atual.

A referência para voz entre pessoas é a fluidez de uma chamada no Meet. A resposta da IA tem metas próprias, medidas até o início audível da primeira fala relevante. O produto prioriza qualidade da conversa, estabilidade, fluidez visual e custo, nessa ordem.

## Decisões aprovadas

- **O plano inteiro e a auditoria estão canonizados.** A ordem aprovada depois é **cenário primeiro**. A sala técnica de voz continua obrigatória antes de considerar a experiência coletiva validada e antes de integrar o sistema pedagógico completo. O apêndice preserva a redação original e seu contexto histórico.
- **Base web preservada.** TypeScript, Phaser 3.90.0, WebGL e mapas no formato Tiled. HTML e CSS na interface atual. React fica reservado para painéis de aplicação quando necessário. Aseprite é uma ferramenta de autoria prevista. C/C++, WebAssembly ou infraestrutura própria só voltam à mesa diante de um gargalo medido que justifique a mudança.
- **A referência é o comportamento de FireRed.** A auditoria mostrou que Pokémon FireRed no Game Boy Advance monta o mundo com peças reutilizáveis e camadas, verifica o movimento na célula seguinte e coordena passos, câmera e prioridades de desenho. O código reconstruído usa C e assembly. Na web, adotamos os princípios do mapa e da movimentação, com identidade e arte próprias. Movimento em grade é o ponto de partida. Movimento livre em quatro direções continua disponível para comparação no mesmo trecho.
- **60 FPS é teto explícito.** O alvo de navegação é cadência de cerca de 16,67 ms, com P95 até 20 ms no equipamento de referência: notebook comum com 8 GB de RAM e vídeo integrado. A velocidade deve depender do tempo. Em telas de frequência fixa como 144 Hz, o monitor pode apresentar intervalos desiguais mesmo que o jogo respeite o teto. P95 e teto precisam de verificações distintas.
- **Segurança do Mac tem prioridade máxima.** Os detalhes estão no Apêndice C. Em caso de risco identificado ou efeito perigoso incerto, explique a ação, o risco concreto, a alternativa, a reversão e o limite dela. Aguarde autorização antes de executar. Desenvolvimento autorizado não implica autorização para instalar ferramentas, expor serviços, usar dados privados ou rodar carga intensa.

Referências técnicas da auditoria: [mapa e câmera do FireRed](https://github.com/pret/pokefirered/blob/master/src/field_camera.c), [movimento no FireRed](https://github.com/pret/pokefirered/blob/master/src/field_player_avatar.c#L524-L538), [camadas do Phaser 3.90](https://docs.phaser.io/api-documentation/3.90.0/class/tilemaps-tilemap#createLayer) e [agendamento de quadros no navegador](https://developer.mozilla.org/en-US/docs/Web/API/Window/requestAnimationFrame).

## Onde paramos

| Parte | Estado verificado |
| --- | --- |
| Protótipo original | Jardim, recepção e uma sala sobre uma ilustração única, com avatar estático, colisões e interações por proximidade. O link **Cenário original** ou o parâmetro `?original=1` permite comparar. A imagem serve de referência artística. |
| Trecho modular | Abre por padrão. Tem piso e caminhos montados em tiles, jardim, entrada e recepção. A porta fecha e bloqueia a passagem, o tronco é sólido e a copa pode cobrir o avatar. A arte e os quadros de animação são provisórios. A sala do protótipo original ainda não foi reconstruída nesse formato. |
| Movimento e câmera | Avatar com caminhada animada em quatro direções. O modo grade interpola o passo de uma célula e termina o passo iniciado ao soltar a tecla. O modo livre permite parar entre células. A câmera segue a posição no mundo, separada do desenho do avatar. No protótipo anterior, essa separação e os ajustes de renderização reduziram a tremida relatada pelo usuário. |
| Controles | WASD ou setas para andar, E para operar a porta quando o avatar está próximo e voltado para ela. Escape ou botão para pausar. **Movimento: grade** alterna os modos, **Ver campus** mostra a visão geral e **···** abre as métricas. |
| Limite e medição | O controlador usa o relógio do navegador, descarta intervalos de desenho perdidos e impede um 61º desenho em uma janela móvel de um segundo. A simulação de frequências entre 60 e 240 Hz passou. O painel coleta tempos após a renderização no Phaser. A última amostra modular registrou **59,3 FPS e P95 de 25,8 ms**, acima da meta de 20 ms. A amostra de **60 FPS e P95 de 17,3 ms** era do protótipo original com o limitador anterior. |
| Verificação | Último build, checagem de tipos e **14 testes** passaram antes da pausa. No navegador foram conferidos a porta fechada, a passagem com a porta aberta, a seleção do modo livre, a oclusão pela copa e o acesso ao cenário original. Faltam teste formal no equipamento de referência, medições de CPU/GPU e memória e conferência visual de todas as colisões. |
| Sistema de aulas | Voz, IA, persistência, contas e multiplayer estão planejados. O estado executável atual é um cenário individual local. A prévia de teste foi encerrada. |

Ao retomar o projeto principal, o primeiro trabalho aprovado é investigar a cadência sob o teto de 60 e comparar os dois modos com a mesma arte e câmera. O teste deve cobrir andar, virar, parar, atravessar a porta e passar por trás da árvore. Depois de validar esse trecho, vale traduzir a qualidade da arte original para peças reutilizáveis e ampliar para a sala. Até a retomada explícita, esse roteiro serve apenas como referência.

## Como localizar a implementação

- `src/main.ts` escolhe a cena e instala o limite de quadros. `src/core/frame-cap.ts` contém o controlador. `src/scene.ts` reúne a cena original e o código compartilhado de câmera, interface, pausa e medição.
- `src/modular-scene.ts` carrega o mapa Tiled e controla porta, profundidade e troca de modo. `src/core/steps.ts` contém os dois modos de andar, `src/core/navigation.ts` as colisões básicas e `studentFrame` (também em `src/core/steps.ts`) escolhe o quadro do estudante B-01 em `public/assets/characters/student-main/`.
- `public/maps/reception.tmj` e `public/assets/modular-tiles.png` formam o trecho modular. `public/maps/campus.tmj`, `public/assets/campus-v1.png` e `public/assets/student-v1.png` pertencem ao protótipo original.
- `docs/CENARIO-V1.md` registra a primeira entrega. `docs/AUDITORIA-RETOMADA.md` registra as medições anteriores à migração. `docs/ASSETS.md` registra a origem da arte. `docs/SEGURANCA-DEPENDENCIAS.md` descreve a instalação. São documentos históricos em parte. Para o estado na pausa, use a tabela acima.
- O projeto usa Node.js 22.18 ou superior. `package-lock.json` fixa Phaser 3.90.0, TypeScript 5.9.3 e EventEmitter3 5.0.1. As dependências já estavam instaladas localmente. Os comandos de referência, para uma retomada autorizada, são `npm run check`, `npm test`, `npm run build` e `npm run preview`. A prévia lê `dist/`, escuta só em `127.0.0.1:4173` e encerra em até dez minutos. Esta lista documenta o fluxo para uso futuro.

## Arquitetura futura para avaliar ideias

Colyseus e Node.js estão previstos para presença e sincronização, com atualizações a 15–20 Hz, resposta local imediata e interpolação de outros avatares. Supabase está previsto para contas e persistência. WebRTC e LiveKit são a base de mídia. A voz humana tem caminho próprio, independente do jogo, do banco e do modelo. Um professor atende por sessão, com faixas e identidade dos alunos separadas.

A fase de aulas compara áudio direto com transcrição, geração e síntese em fluxo contínuo. GPT-Live é candidato inicial, com disponibilidade e compatibilidade a verificar nessa fase. A coordenação tem de lidar com sobreposição de falas, interrupções e pausas, além de carregar materiais antes da conversa e tirar indexação e relatórios do caminho crítico. A localização da mídia, do serviço do professor e da inferência deve ser medida separadamente a partir do Brasil. O apêndice inclui as metas, os cenários de falha, a comparação com Meet e a regra de avanço.

## O que trazer de volta de um experimento

Traga a hipótese, a decisão sugerida, o que mudaria no plano, o ambiente do teste, os resultados, suas limitações e o custo de adotar ou reverter a ideia. Para propostas de cenário, compare no mesmo trecho e equipamento. Para voz, meça até a reprodução da resposta relevante no navegador. Identifique o que foi observado, o que é preferência e o que ainda é uma suposição. Um resultado paralelo pode embasar uma decisão do usuário para o projeto principal.


## Apêndice A — Plano e auditoria canônicos, na íntegra

Fonte: `docs/PLANO-CANONICO-INTEGRAL.md`.

# Auditoria e plano revisado: escola virtual com prioridade em fluidez

## 1. Parecer da auditoria

**O projeto é viável, mas o plano anterior era insuficiente para assegurar a experiência que você descreveu.** Ele escolhia tecnologias adequadas, porém não estabelecia limites de latência, isolamento entre componentes nem critérios objetivos de aprovação.

Esta é uma auditoria de arquitetura e documentação. Ainda não existe implementação para medir; os números abaixo são **metas de aceitação, não resultados comprovados**.

A referência ao Meet se divide em dois requisitos:

- **Conversa entre alunos:** áudio contínuo, pouca demora, interrupções naturais e estabilidade durante a aula.
- **Professor de IA:** além de transportar áudio, precisa compreender, decidir e responder. Essa demora adicional precisa ser medida e reduzida.

Os principais problemas encontrados foram:

| Lacuna do plano anterior | Correção |
|---|---|
| Transcrição → resposta textual → síntese pode acumular espera | Comparar essa abordagem com modelos de áudio direto antes de fixar a integração |
| Um jogo fluido não garante uma chamada fluida | Separar mídia, movimentação e processamento pedagógico |
| Microfones separados não resolvem automaticamente uma conversa coletiva com IA | Construir e validar a coordenação de participantes, interrupções e respostas |
| Região de hospedagem indefinida | Medir o percurso Brasil → mídia → professor → modelo → navegador |
| “Tempo de resposta” sem definição | Medir até a reprodução efetiva no dispositivo do aluno |
| Ausência de testes prolongados | Exigir aulas completas com seis participantes e falhas simuladas |

**Construir infraestrutura própria será uma opção quando as medições justificarem.** Reimplementar transporte de áudio por antecipação não demonstra ganho de desempenho; a primeira escolha será usar componentes maduros e substituir os gargalos identificados.

## 2. Metas obrigatórias do piloto

Ambiente de referência: seis alunos no Brasil, notebooks com 8 GB de RAM e vídeo integrado, navegador de computador e conexão doméstica estável. Sem webcams no piloto.

“P95” significa que 95% das observações precisam ficar abaixo do limite.

| Aspecto | Meta de aceitação |
|---|---|
| Áudio entre alunos | Atraso de ponta a ponta de até 250 ms no P95 |
| Resposta comum do professor | Mediana até 800 ms; P95 até 1,5 s entre fim da pergunta e início audível de resposta relevante |
| Interrupção do professor | Parar a fala em até 300 ms no P95 após início de uma interrupção válida |
| Respeito à fala do aluno | Cortar indevidamente menos de 5% das falas no roteiro de teste, incluindo pausas de iniciantes |
| Mapa durante a aula | Alvo de 60 FPS; intervalo entre quadros no P95 até 20 ms no equipamento de referência |
| Entrada na aula | Áudio conectado em até 5 s no P95, após permissões e autenticação |
| Estabilidade | Três sessões de 60 minutos, sem falhas fatais, respostas duplicadas ou degradação progressiva |

Essas metas serão medidas em condições de rede documentadas. Redes degradadas terão testes próprios, sem prometer os mesmos números em qualquer conexão.

Respostas que dependam de consultas externas terão métricas separadas, mas permanecerão no relatório geral. Um “hmm”, som de espera ou “estou pensando” não contará como resposta relevante para atingir a meta.

## 3. Arquitetura revisada

**Chamada de voz independente do jogo**

- Usar WebRTC com LiveKit como implementação inicial, distribuindo o áudio entre alunos diretamente pela infraestrutura de mídia.
- O áudio humano não passará pelo Colyseus, banco de dados ou LLM.
- Manter a conexão de voz fora do ciclo de vida do mapa: abrir painéis, trocar cenários ou reduzir efeitos não poderá desconectar a aula.
- Uma única saída de áudio do professor será distribuída à turma. Não haverá seis professores gerando respostas independentes.

O LiveKit distingue participantes e faixas de mídia, mas a coordenação pedagógica coletiva será responsabilidade da aplicação. [Documentação de mídia](https://docs.livekit.io/transport/media/)

**Professor com resposta rápida**

- Comparar duas arquiteturas: áudio direto com um modelo de voz em tempo real; e transcrição contínua por participante com geração e síntese em streaming.
- Usar GPT-Live como candidato inicial de áudio direto. Sua capacidade de ouvir enquanto fala e delegar trabalho ao backend é documentada; isso ainda não comprova compreensão correta de uma turma com seis pessoas. [Documentação oficial](https://developers.openai.com/api/docs/guides/live)
- Na alternativa por transcrição, iniciar o processamento enquanto o áudio chega, sem esperar arquivos completos nem a conclusão de toda a resposta para começar a reprodução.
- Selecionar a arquitetura que passe nos testes de qualidade e latência. Entre opções aprovadas, priorizar menor P95 de resposta; custo será o desempate.
- Identificação de alunos, pausas, falas simultâneas e correções serão critérios eliminatórios. Áudio direto não será escolhido apenas por parecer mais rápido em uma conversa individual.

**Coordenação coletiva**

- Manter identidade, atividade de voz e transcrição por participante. Não presumir que misturar seis microfones preserve a autoria para o modelo.
- Construir um coordenador por aula para evitar respostas concorrentes, lidar com entradas e saídas e cancelar áudio pendente após interrupções.
- Preservar conversa aberta. Em sobreposições incompreensíveis, pedir esclarecimento sem inventar quem falou.
- Ajustar detecção de fim de fala para quem está aprendendo inglês: uma pausa para pensar não pode ser tratada automaticamente como encerramento.
- Atualizar o histórico para refletir o trecho do professor realmente reproduzido, evitando que a IA presuma que uma explicação interrompida foi ouvida.

**Trabalho pedagógico fora do caminho crítico**

- Carregar perfil, configuração do professor e materiais da atividade antes da conversa.
- Manter contexto ativo compacto e pré-carregar a próxima atividade.
- Processar PDFs, indexar materiais, gerar relatórios e consolidar progresso em tarefas separadas.
- Salvar eventos de forma assíncrona, com identificadores para evitar duplicação e checkpoints recuperáveis.
- Operações que exigem confirmação persistida só serão anunciadas como concluídas depois dessa confirmação.

**Mapa e interface leves**

- Manter React, TypeScript e Phaser para a escola em pixel art.
- Usar atlas de sprites, desenho apenas dos elementos visíveis, iluminação predominantemente pré-calculada e carregamento por ambiente.
- Atualizar movimentação pelo Colyseus a 15–20 Hz, com resposta local imediata e interpolação dos demais avatares.
- Evitar renderizar toda a interface React a cada quadro ou fragmento de transcrição.
- Reduzir partículas e efeitos quando necessário, preservando prioridade para áudio e controles.

**Localização e infraestrutura**

- Manter os processos de mídia e IA aquecidos durante aulas; não depender de inicialização sob demanda a cada fala.
- Comparar a hospedagem do serviço do professor em São Paulo e no leste dos EUA, medindo o trajeto completo até o modelo.
- Começar com roteamento gerenciado do LiveKit. Se o transporte reprovar as metas, comparar com LiveKit hospedado em São Paulo antes de considerar mudanças mais profundas.
- Não presumir que presença de um serviço no Brasil signifique que agentes e inferência também executem aqui. A documentação distingue essas regiões. [Regiões do LiveKit](https://docs.livekit.io/deploy/admin/regions/endpoints/)

## 4. Validação antes de construir a escola completa

**Etapa inicial: uma sala técnica, seis alunos e um professor.** Ela terá microfones, transcrição e telemetria, sem depender de arte final.

O roteiro incluirá:

- Perguntas curtas, respostas longas, sotaque brasileiro, troca entre português e inglês e pausas para pensar.
- Alunos interrompendo o professor, dois alunos falando juntos e comentários como “aham” que não deveriam cancelar uma explicação.
- Uso com fones e com alto-falantes, verificando eco.
- Entrada tardia, saída, queda de rede e reconexão.
- Banco lento, serviço de IA indisponível e processamento de materiais durante a aula.
- Comparação com uma chamada no Meet usando os mesmos dispositivos e redes, como referência de experiência entre pessoas.

Instrumentar o navegador e o servidor. Métricas do servidor ajudam a localizar atrasos, mas não bastam: a própria documentação do LiveKit informa que algumas medidas de reprodução não incluem a entrega até o cliente. [Referência de métricas](https://docs.livekit.io/reference/agents-js/interfaces/agents.llm.MetricsReport.html)

Executar pelo menos 100 trocas de fala por arquitetura candidata, incluindo cenários difíceis. Depois, realizar os três testes de 60 minutos com a opção selecionada e o mapa ativo.

**Regra de avanço:** construir a escola completa somente após comprovar a qualidade da conversa. Se nenhuma arquitetura atingir as metas, registrar o componente responsável e iterar nele; não reduzir silenciosamente o requisito nem apresentar a demonstração como concluída.

## 5. Produto preservado e prioridades

A entrega continua incluindo:

- Escola futurista em pixel art, recepção, jardim e salas.
- Perfis e avatares, acesso privado por convite.
- Dois professores configuráveis por painel e materiais.
- Aulas guiadas e conversação livre, por voz e texto.
- Início, pausa, retomada e progresso individual.
- Aulas coletivas com até seis alunos e feedback privado.
- Gamificação inicial por objetivos de aula e progresso visível.

**A prioridade passa a ser: qualidade da conversa, estabilidade, desempenho visual e, depois, otimização de custo.** O uso continuará sendo medido, mas economia não justificará uma experiência que reprove os critérios definidos.

O primeiro marco demonstrável será uma aula de inglês fluida com seis pessoas e um professor de IA. A escola visual será construída sobre essa base validada.

## Apêndice B — Complemento operacional e sequência aprovada, na íntegra

Fonte: `PLANO-CONGELADO.md`.

# Plano congelado — V1 do cenário da escola

Registrado em 14/11/2026, a partir das decisões desta conversa.

## Fonte canônica integral

O usuário confirmou que TODO o plano e auditoria está canonizado. A cópia integral, sem alterações, está em `docs/PLANO-CANONICO-INTEGRAL.md`, originada do PLAN.md selecionado na conversa. Este documento é um complemento operacional, não uma substituição resumida. A única mudança de sequência já autorizada é começar pelo cenário; a validação da voz continua obrigatória antes da integração pedagógica completa. O plano de execução do cenário está em `docs/CENARIO-V1.md`.

## 1. Prioridade e limites

A regra máxima de segurança do Mac está em `AGENTS.md` e deve ser seguida antes de qualquer ação. O congelamento preserva as decisões atuais até que o usuário peça revisão; não significa que elas sejam imutáveis para versões futuras.

O foco imediato é construir o cenário. Professores de IA, áudio, contas e multiplayer permanecem planejados para etapas posteriores. Este documento não representa uma instalação, implementação ou validação já realizada.

## 2. Direção visual e primeira entrega

- Escola pequena, moderna, futurista e acolhedora, em pixel art 2D vista de cima, com profundidade por camadas, sombras e sobreposição.
- A segunda imagem enviada pelo usuário é a principal referência de acabamento, densidade de detalhes e linguagem visual. Adaptar a estética à escola, usando arte original ou licenciada.
- Vegetação detalhada, jardim, caminhos, áreas de convivência, paredes claras, janelas e iluminação tecnológica discreta.
- Primeira entrega: jardim conectado à recepção e a uma sala, exploráveis no navegador do computador.
- Personagem com movimento por WASD/setas, câmera, colisões, portas e pontos de interação.
- Definir uma composição visual e escala coerentes; construir primeiro um pequeno trecho acabado antes de ampliar o mapa.
- A escola completa planejada terá duas salas individuais e uma coletiva. Essa expansão vem após validar o primeiro trecho.

## 3. Base técnica congelada

| Parte | Decisão |
| --- | --- |
| Linguagem do cenário | TypeScript |
| Motor 2D | Phaser |
| Renderização | WebGL, com uso da GPU |
| Mapas | Formato compatível com Tiled, com camadas e objetos de interação |
| Arte | Sprites, tilesets e atlas; Aseprite como ferramenta de autoria prevista, sem exigir instalação para começar |
| Interface de aplicação | React e CSS quando necessários; não usar React para movimentar os sprites a cada quadro |
| C/C++ e WebAssembly | Fora da V1; avaliar futuramente apenas diante de gargalo computacional medido |

Ferramentas de autoria previstas não estão automaticamente autorizadas para instalação. Arquivos compatíveis podem ser preparados no projeto sem instalar esses editores.

Separar chão, paredes, decoração, elementos que cobrem personagens, colisões e pontos de interação. Identificar ambientes, portas e posições dos NPCs para futura integração, sem implementar antecipadamente o backend.

Usar atlas, descarte de elementos fora da câmera, iluminação predominantemente pré-calculada e carregamento por ambiente. Manter a estrutura do mapa independente de futuras conexões de voz e IA.

## 4. Validação do cenário

- Conferir coerência de perspectiva, escala, paleta, sombras e animações no navegador, além da composição de referência.
- Validar movimento, colisões, portas, sobreposição de objetos e legibilidade dos caminhos.
- Equipamento de referência: notebook comum com 8 GB de RAM e vídeo integrado. Se o equipamento disponível for diferente, registrar a diferença; não declarar equivalência sem teste.
- Alvo: 60 FPS, com intervalo entre quadros no P95 até 20 ms nas condições documentadas. Isso é meta, não desempenho já comprovado.
- Medir carregamento, CPU, GPU quando observável e memória. Fazer verificações limitadas e interromper diante de pressão de recursos ou comportamento anormal. Não executar estresse sem avaliação e autorização conforme `AGENTS.md`.
- Evitar dependências grandes e efeitos gráficos cujo benefício não justifique o custo medido.

## 5. Arquitetura futura preservada

- Piloto privado para o usuário e convidados, principalmente no Brasil, em navegador de computador.
- Até seis alunos por turma, com voz, texto e conversa aberta.
- Colyseus e Node.js para presença e sincronização; Supabase para contas e persistência; WebRTC e LiveKit como base inicial de mídia.
- Dois professores de inglês configuráveis por painel e materiais, com aulas guiadas, prática livre e retomada. Separar memória individual de histórico coletivo.
- Comparar áudio direto e pipeline de transcrição/geração/síntese em streaming antes de fixar a integração de IA. Modelos, versões, disponibilidade e compatibilidade serão verificados na fase correspondente.
- Separar mídia, lógica do jogo e tarefas pedagógicas. Um único professor compartilhado por sessão; áudio entre alunos independente do modelo e do banco de dados.
- Testar identificação de participantes, interrupções, pausas de alunos iniciantes, falas simultâneas e recuperação de falhas.
- Medir localização de mídia, serviço do professor e inferência separadamente; não presumir execução integral no Brasil.
- Usar infraestrutura própria ou módulos C/C++ apenas se medições demonstrarem necessidade e vantagem, respeitando a regra de segurança.

### Metas da auditoria para a fase de aulas

| Aspecto | Meta |
| --- | --- |
| Áudio entre alunos | P95 de atraso ponta a ponta até 250 ms |
| Resposta comum da IA | Mediana até 800 ms e P95 até 1,5 s, do fim da pergunta ao início audível de resposta relevante |
| Interrupção válida | Parar a fala do professor em até 300 ms no P95 |
| Cortes indevidos de fala | Menos de 5% no roteiro de teste, incluindo pausas de iniciantes |
| Entrada na aula | Áudio conectado em até 5 s no P95, após autenticação e permissões |
| Estabilidade | Três sessões de 60 minutos com seis participantes, sem falhas fatais, respostas duplicadas ou degradação progressiva |

P95 significa que 95% das observações devem ficar dentro do limite. Documentar rede, hardware, amostra e método de medição. Medir reprodução no navegador; recebimento do primeiro áudio no servidor não basta. Separar respostas com consultas externas sem removê-las do relatório geral.

Esses testes pertencem à fase posterior de aulas e não autorizam carga intensiva no Mac. O cenário pode ser desenvolvido primeiro; a qualidade da conversa ainda precisará ser comprovada antes da integração pedagógica completa.

## Apêndice C — Regras de segurança e escopo, na íntegra

Fonte: `AGENTS.md`.

# Instruções do projeto

## Regra máxima: segurança do Mac do usuário

Esta regra foi estabelecida explicitamente pelo usuário em 14/11/2026 e tem prioridade sobre conveniência, desempenho, prazo e autonomia de execução.

Antes de cada ação, avaliar seus efeitos sobre o Mac, o macOS, os dados, a privacidade e os recursos da máquina. Se houver qualquer possibilidade identificada de causar dano ou impacto negativo fora das alterações locais esperadas e reversíveis do projeto, PARAR antes da ação e perguntar ao usuário. Quando não for possível determinar os efeitos de uma ação potencialmente perigosa, tratá-la como pendente de avaliação, não como segura.

Explicar de forma pragmática:

- A ação e por que ela é necessária.
- O risco concreto e o que pode ser afetado.
- Uma alternativa de menor risco, quando existir.
- Como desfazer a alteração, incluindo limites da reversão.
- A autorização específica necessária.

Não prometer risco zero, minimizar riscos, dramatizá-los ou interpretar autorização para desenvolver como autorização para ações perigosas. Uma aprovação específica não autoriza ações diferentes ou riscos novos. Respeitar autorizações explícitas já dadas para a mesma ação e o mesmo risco.

### Operações de baixo impacto no escopo autorizado

Leitura dos arquivos pertinentes e criação/edição de arquivos de texto do próprio projeto podem prosseguir quando forem locais, limitadas e reversíveis e não houver risco adicional identificado. Conferir arquivos existentes antes de sobrescrever. Não modificar trabalho do usuário sem necessidade.

### Ações que exigem avaliação e confirmação prévia de riscos

- Usar sudo, instalar pacotes globais, alterar macOS, permissões, configurações de segurança, shell, serviços ou inicialização da máquina.
- Executar instaladores, scripts remotos, binários desconhecidos ou comandos copiados de fontes externas sem inspeção. Tratar scripts de instalação e lifecycle de dependências como execução de código, não como simples download.
- Instalar dependências: primeiro inspecionar origem, versão, scripts, destino, efeitos e possibilidade de execução transitiva. Havendo risco ou efeitos incertos, apresentar a avaliação e aguardar autorização antes de executar. Não iniciar geradores de projeto que baixem e executem código implicitamente.
- Apagar arquivos ou diretórios, realizar limpezas amplas, sobrescrever dados existentes ou alterar arquivos fora do projeto.
- Ler ou transmitir credenciais e dados privados sem necessidade e autorização; publicar conteúdo, abrir acesso externo ou expor serviços à rede.
- Iniciar processos persistentes, serviços em segundo plano, contêineres, testes de estresse, cargas intensivas de CPU/GPU ou operações com consumo de disco/memória não delimitado.

Para desenvolvimento local, preferir processos em primeiro plano e acesso apenas por loopback. Antes de iniciá-los, inspecionar os comandos e dependências; se houver risco identificado, aguardar confirmação. Encerrar processos iniciados pelo agente quando deixarem de ser necessários, sem encerrar processos do usuário.

Não contornar uma restrição usando outra ferramenta. Não instalar nada nem iniciar testes de carga apenas para verificar se uma operação seria segura.

## Decisões congeladas e escopo atual

Ler `docs/PLANO-CANONICO-INTEGRAL.md` e `PLANO-CONGELADO.md` antes de implementar. O plano COMPLETO e a auditoria estão canonizados, não apenas a escolha de tecnologias. O primeiro arquivo preserva integralmente o plano selecionado pelo usuário; o segundo registra o foco atual e a alteração de sequência autorizada (cenário primeiro). Não alterar silenciosamente o documento integral. O trabalho ativo é a V1 do cenário; seguir `docs/CENARIO-V1.md`. Não reabrir as decisões nem expandir para voz, IA e multiplayer sem direcionamento do usuário.

Usar TypeScript e Phaser com WebGL como base do cenário. React/CSS fica reservado à interface quando necessário. C/C++, WebAssembly, troca de motor, nova infraestrutura e instalação de ferramentas não fazem parte da V1 por padrão.

Não confundir planejamento com autorização para instalar ferramentas ou executar ações sujeitas à regra de segurança. Reportar o que foi realmente implementado e medido; metas de desempenho não são resultados comprovados.
