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
