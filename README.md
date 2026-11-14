# Campus — cenário V1

Primeiro trecho da escola: jardim, recepção e uma sala. Trabalho local, em TypeScript + Phaser + WebGL. O plano integral permanece canonizado; cenário primeiro é apenas a sequência atual.

- `docs/PLANO-CANONICO-INTEGRAL.md`: cópia integral do plano selecionado pelo usuário.
- `PLANO-CONGELADO.md`: complemento operacional, decisões e metas.
- `AGENTS.md`: regra máxima de segurança do Mac.
- `docs/CENARIO-V1.md`: plano de ação do cenário.
- `docs/SEGURANCA-DEPENDENCIAS.md`: avaliação da instalação e da prévia local.
- `docs/AUDITORIA-RETOMADA.md`: auditoria, resultados no navegador e pendências. `docs/VALIDACAO-INICIAL.md` registra a etapa anterior à instalação.
- `public/assets/campus-v1.png`: primeira composição original de arte.
- `public/maps/campus.tmj`: mapa Tiled com limites, regiões e pontos de interação.

## Estado

O trecho modular abre por padrão. Ele tem um caminho no jardim, uma árvore que pode encobrir o personagem, uma porta interativa e a recepção. Use **Movimento: grade** para alternar entre passos em grade e deslocamento livre. Use **Cenário original** para ver a versão anterior.

O teto de renderização agora passa por um controlador de 60 quadros por segundo. Os testes simulam telas de 60 a 240 Hz. A cadência no navegador continua em avaliação. Na primeira medição do trecho modular após a troca do limitador, o painel registrou 59,3 FPS e P95 de 25,8 ms, acima da meta de 20 ms.

O primeiro trecho está compilado e foi testado no navegador. A checagem de tipos e os nove testes de mapa e navegação passaram. Uma amostra local de 180 intervalos registrou 60 FPS e P95 de 17,5 ms. A validação no equipamento de referência ainda está pendente.

O primeiro fundo é uma composição única para validar direção visual. A migração para peças e oclusões modulares faz parte do refinamento seguinte; o avatar é inicial e não possui animações direcionais definitivas.

## Comandos

Com as dependências já instaladas nesta pasta, execute os comandos na raiz do projeto.

```sh
npm run check
npm run build
npm run preview
```

Abra `http://127.0.0.1:4173` enquanto a prévia estiver rodando. Ela termina em dez minutos ou com Ctrl+C. Para reinstalar em outro checkout, use o lockfile com `npm ci --ignore-scripts --no-audit --no-fund` após a avaliação prevista em `AGENTS.md`. O cache fica na pasta do projeto.

Verificação independente das dependências:

```sh
node --experimental-strip-types --test tests/*.test.mjs
```

WASD/setas para caminhar; E para interação próxima; Escape para pausar. Botões para ver o campus inteiro, pausar e mostrar métricas locais. O medidor é diagnóstico, não substitui os testes de aceitação da auditoria.
