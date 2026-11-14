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
