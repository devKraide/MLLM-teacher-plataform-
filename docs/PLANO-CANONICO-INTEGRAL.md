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
