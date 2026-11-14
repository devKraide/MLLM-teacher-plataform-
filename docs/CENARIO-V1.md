# Plano de ação — primeiro trecho da escola

## Entrega desta etapa

Jardim, recepção e uma sala, com direção de arte baseada na segunda referência. Preparar uma composição de cenário e a base TypeScript/Phaser para percorrê-la. Não declarar a V1 completa antes de verificar aparência, movimento e colisões no navegador.

1. Preservar a auditoria canônica integral e registrar a sequência cenário primeiro.
2. Gerar uma composição original de escola em pixel art, com entradas e trajetos legíveis.
3. Preparar um mapa Tiled com camadas de imagem, limites, objetos e áreas de interação, separado do código.
4. Implementar personagem de navegação provisório, WASD/setas, colisões, câmera, interação contextual e pausa.
5. Conferir origem e dependências antes de solicitar autorização para instalar e executar a prévia.
6. Validar no navegador e ajustar colisões à arte. Somente depois expandir e substituir o fundo composto por tiles e elementos de primeiro plano modulares onde a profundidade exigir.

## Direção visual

Futurismo acolhedor, vegetação verde-azulada, caminhos claros, arquitetura marfim, vidros e discretos detalhes ciano. Referência para acabamento e perspectiva: segunda imagem do usuário. Sem câmera isométrica, sem aparência de blocos 3D. A primeira arte é um fundo composto para validar direção visual; não é um tileset modular acabado.

## Estrutura técnica

- TypeScript e Phaser 3.90.0, com WebGL obrigatório e aviso se indisponível.
- Sem frameworks extras para este trecho. Interface de navegação em HTML/CSS; React permanece reservado aos painéis de aplicação.
- Phaser e TypeScript são dependências locais com versões fixadas. Não usar CDN em tempo de execução.
- Build explícito: compilação TypeScript, cópia do runtime Phaser e assets para `dist/`. Sem hooks de instalação próprios.
- Servidor de prévia escrito com APIs nativas do Node, apenas em 127.0.0.1, só leitura de `dist/`, sem upload, sem execução de comandos e com encerramento automático em 10 minutos.
- Scripts não instalam dependências, não apagam diretórios, não alteram configurações do sistema e não abrem o navegador automaticamente.
- Lógica pura de navegação testável sem instalar pacotes. Dados de mapa separados para migração posterior para tiles modulares.

## Limites de validação

Testes unitários de navegação não demonstram FPS nem qualidade da renderização. Instalação, compilação com dependências e execução no navegador dependem da confirmação específica prevista em AGENTS.md. Não iniciar automaticamente serviços para contornar essa confirmação.

## Critérios da primeira prévia

- Explorar jardim, entrar na recepção e alcançar a sala sem atravessar paredes e móveis delimitados.
- Mover diagonalmente sem aumentar velocidade e evitar atravessar paredes após uma pausa da aba.
- Exibir locais e pontos de interação; não simular professores de IA ativos.
- Pausar explicitamente ou ao ocultar a aba e recuperar sem movimento preso.
- Exibir status técnico apenas quando solicitado; registrar medição real antes de afirmar desempenho.
- Próximo refinamento visual: personagens definitivos, elementos de oclusão e tiles editáveis.
