# Validação inicial — 14/11/2026

Registro histórico anterior à instalação. Para o estado atual, consulte `AUDITORIA-RETOMADA.md`.

## Verificado

- A cópia `PLANO-CANONICO-INTEGRAL.md` é idêntica, byte a byte, ao arquivo de plano selecionado pelo usuário.
- Nove testes com o Node já disponível passaram, em aproximadamente 0,11 segundo no total: velocidade diagonal, parede estreita após atraso, deslizamento junto à parede, limites do mundo, interação próxima, entrada inválida, IDs Tiled, dimensões da imagem/spawn e conectividade do mapa.
- Verificação de sintaxe do Node passou nos quatro arquivos TypeScript e nos dois scripts locais. Essa verificação remove anotações de tipo; não substitui `tsc --noEmit`.
- JSONs válidos e IDs de HTML sem duplicações.
- Inspeção visual das duas imagens retornadas pelo gerador. A arte do campus apresenta jardim, recepção, sala e entradas conectadas; avatar é uma imagem estática inicial.
- PNG do campus: 1536 × 1024. PNG do avatar: 1199 × 1312, com canal alfa.

## Não verificado ainda

- Compilação e checagem de tipos com TypeScript/Phaser.
- Inicialização WebGL, controles, câmera e aparência no navegador.
- Correspondência visual exata de cada obstáculo com a imagem. O teste de conectividade valida apenas a geometria dos dados.
- FPS, memória, consumo de CPU/GPU e as metas de aceitação do plano completo.
- Disponibilidade/download efetivo dos pacotes npm. Consulta de manifests upstream foi feita pela ferramenta web; o terminal não resolveu o registry na tentativa de leitura.

## Estado da máquina

Nesta etapa não houve instalação, build com dependências, inicialização de servidor, abertura de porta, publicação nem alteração das configurações do macOS. Foram criados arquivos locais, copiadas as imagens geradas pela ferramenta integrada e executados testes limitados do código próprio. `node_modules/` não existe.
