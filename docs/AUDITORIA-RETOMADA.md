# Auditoria da retomada — 14/11/2026

## Arquivos e escopo

- A cópia integral do plano canônico passou na comparação byte a byte com a origem.
- O trecho compilado inclui jardim, recepção e sala, com arte, avatar estático, câmera, colisões e interações. A arte do ambiente usa um fundo composto. O mapa Tiled registra os obstáculos e pontos de interesse. Peças modulares, oclusão e animações direcionais continuam pendentes.
- O build gerou `dist/`. As imagens, o mapa e o runtime Phaser copiados para o build coincidem byte a byte com as respectivas origens. A checagem de tipos e os nove testes passaram.

## Dependências e execução local

- `npm ls --all` confirmou Phaser 3.90.0, EventEmitter3 5.0.1 e TypeScript 5.9.3. O lockfile aponta para o registry oficial, registra hashes de integridade e não sinaliza scripts de instalação. A instalação original usou `--ignore-scripts`.
- Uso de disco observado: 169 MB em dependências, 43 MB no cache local e 6,8 MB no build. A retomada reutilizou a instalação. A revisão de origem, versões e configuração não inclui uma varredura atualizada de vulnerabilidades dos pacotes.
- A prévia serve os arquivos de `dist/` em `127.0.0.1:4173`, com limite de dez minutos. A sessão anterior expirou durante a retomada. O reinício usou a mesma porta, endereço e limite. O servidor foi encerrado após o teste, e a porta ficou sem processo escutando.

## Verificações no navegador

- Na sessão anterior, confirmei a colisão na fachada e diante de uma mesa, a passagem do jardim à recepção e da recepção à sala, e as interações de boas-vindas e do quadro.
- Na retomada, confirmei o carregamento em WebGL, a pausa, a retomada com movimento, a visão geral e a ausência de erros e avisos no console da aba testada.

## Cadência de quadros

- O FPS anterior do Phaser contava chamadas do navegador, inclusive as que o limitador descartava. A leitura dava cerca de 111–120 FPS enquanto o P95 dos intervalos observados ficava perto de 25 ms.
- O medidor agora calcula o FPS e o P95 a partir dos mesmos intervalos entre atualizações do cenário. Ele só coleta dados enquanto está aberto.
- Ajustei o limiar interno do limitador de 60 para 62, mantendo o alvo de 60 FPS. A folga evita que pequenas variações perto de 16,67 ms façam o Phaser esperar um terceiro ciclo de uma tela de 120 Hz.
- No navegador integrado, a amostra após caminhar e abrir a visão geral registrou 60 FPS e P95 de 17,5 ms em 180 intervalos. O resultado fica abaixo da meta de 20 ms nessa amostra. A validação formal em notebook de referência, as medições de CPU/GPU e memória e a conferência de todos os obstáculos ainda estão pendentes.
