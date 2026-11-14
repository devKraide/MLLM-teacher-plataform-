# Avaliação antes de instalar e executar

Data: 14/11/2026. A instalação e a prévia originais foram autorizadas pelo usuário e executadas. A retomada reutilizou os pacotes instalados. Veja o resultado em `VALIDACAO-INICIAL.md`.

## O que está preparado

- Phaser 3.90.0, licença MIT: https://github.com/phaserjs/phaser/blob/v3.90.0/package.json
- TypeScript 5.9.3, licença Apache-2.0: https://github.com/microsoft/TypeScript/blob/v5.9.3/package.json
- Phaser declara `eventemitter3` como dependência de runtime; a resolução foi fixada para 5.0.1 no projeto. Manifest upstream consultado: https://github.com/primus/eventemitter3/blob/5.0.1/package.json. Não declara dependências de runtime adicionais.
- Os manifests upstream consultados de Phaser, TypeScript e EventEmitter3 não declaram hooks `preinstall`, `install` ou `postinstall`. Isso não constitui auditoria completa do conteúdo distribuído. Dependências de desenvolvimento dos pacotes upstream não são instaladas como dependências deste projeto.
- O projeto bloqueia scripts automáticos de instalação via `.npmrc`, usa cache em `.npm-cache/` e não prevê instalação global, sudo nem alterações de sistema.

## Procedimento executado

Foram baixados três pacotes do registry oficial para o projeto com scripts de instalação desabilitados. O lockfile registra as versões e os hashes de integridade. A compilação usou o TypeScript local. A prévia de retomada foi encerrada após o teste.

## Riscos e limites

Pacotes de terceiros podem conter vulnerabilidades ou código malicioso. Bloquear scripts de instalação reduz uma via de execução, mas o compilador será executado no build e o Phaser no navegador. A inspeção dos manifests não elimina esse risco. A preparação consome espaço em disco; build e prévia usam CPU, memória e GPU. Não foi feita medição desse consumo.

A primeira tentativa de instalação no sandbox falhou por DNS. A liberação foi concedida para o comando específico, que usou o registry original. A abertura da porta local também passou pela liberação da ferramenta.

## Alternativa sem instalar agora

Revisar a arte e os documentos, manter o código preparado e adiar a compilação/prévia. Essa alternativa não comprova a renderização ou o desempenho do jogo.

## Reversão

Encerrar o servidor pelo terminal; ele também encerra automaticamente. Arquivos gerados ficam no projeto: `node_modules/`, `.npm-cache/`, `dist/` e lockfile. Não há remoção automática; eventual limpeza deve respeitar a regra de segurança e preservar arte e fontes.
