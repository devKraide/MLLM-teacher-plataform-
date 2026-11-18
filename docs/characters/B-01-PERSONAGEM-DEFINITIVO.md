# B-01.2 — Estudante-base: produção do sprite

**Linear:** NIC-61 · **Data:** 18/11/2026 · **Status:** **produzido, aguardando QA (NIC-62) e aceite visual do responsável**
**Contrato:** [`B-01-FICHA-ESTUDANTE.md`](B-01-FICHA-ESTUDANTE.md) · **Direção:** `docs/ART-BIBLE-V1.1.md` §4, §6, §7

> Nada em `src/` foi alterado. A integração no Phaser é B-02.

## 1. Arquivos

| Arquivo | Conteúdo |
|---|---|
| `public/assets/characters/student-main/student-main.png` | Folha 160 × 160, 5 colunas (idle, walk-0..3) × 4 linhas (south, west, east, north), quadros 32 × 40, fundo transparente, alfa só 0/255 |
| `public/assets/characters/student-main/student-main.json` | Metadados idênticos ao JSON da ficha §5 |
| `public/assets/characters/student-main/source/pixellab/` | Saída bruta do PixelLab, sem edição (ZIP de exportação descompactado: rotações 40 × 40 das 8 direções, animações 64 × 64, `metadata.json`) |
| `public/assets/characters/student-main/source/build-sheet.py` | Script que monta a folha e a prévia a partir da saída bruta (só Pillow, já presente na máquina) |
| `docs/characters/evidencias/B-01-folha-preview.png` | Prévia 4× (nearest) sobre fundo caminho claro, com grade |

Para remontar: `python public/assets/characters/student-main/source/build-sheet.py`.

## 2. Ferramenta e procedência

- **Ferramenta:** PixelLab (pixellab.ai), acessado pelo servidor MCP `pixellab` registrado no escopo de usuário do Claude Code.
- **Conta/plano:** trial, 40 gerações.
- **ID do personagem no PixelLab:** `3bed325b-e56b-4c30-a0de-92d5f643d958` (grupo `8f6fa1d0-7603-46a8-afec-c7345c29dee8`).
- **Data:** 18/11/2026.

### Etapas e prompts

1. **Referência (8 rotações, 40 × 40)** — `create_character`, modo `v3`, `view: low top-down`, `outline: selective outline`, `detail: medium detail`, `size: 40`. Prompt:

   > young adult university student, casual clean modern outfit: short open zip jacket in dark teal blue (#3D7978) with soft sage green highlights (#70A68A), ivory off-white t-shirt (#ECE6D7), dark slate blue-grey trousers (#2B3A42), light ivory sneakers, small brown leather backpack (#9B7557) on the back with straps visible, simple short dark brown hair, friendly approachable, slim proportions about 3 heads tall, full body standing straight

   As rotações south/west/east/north viraram os quadros **idle**. Leste e oeste são vistas geradas separadamente (não espelhadas): a mochila aparece do lado certo em cada perfil.

2. **Caminhada, tentativa 1 (descartada)** — `animate_character`, modo `template`, clipe `walking-4-frames`, só south. O modelo redesenhou o personagem com 53 cores novas: tênis vermelhos, jaqueta mais saturada, mochila diferente. **Rejeitado por mudar a identidade** (Art Bible §7.3). Permanece na conta do PixelLab como animação `walk`; os quadros brutos estão em `source/pixellab/Idle/animations/walk/south/` só como registro e não entram na folha.

3. **Caminhada, tentativa 2 (usada)** — `animate_character`, modo `skeleton-v3`, clipe `walking-4-frames`, uma direção por chamada (o trial só permite 1 geração simultânea), animação `walk-skel`. Sem prompt adicional: o modelo reposiciona o próprio personagem sobre o esqueleto do clipe. Os quadros usam **somente cores que já existem no idle** da mesma direção (verificado por script).

### Montagem (o que foi feito fora do PixelLab)

- **Sem reamostragem.** Só recorte e translação inteira.
- **x:** um deslocamento fixo por direção, calculado pelo centro dos pés do idle, para o corpo não deslizar entre os quadros.
- **y:** em cada quadro, a linha opaca mais baixa vai para a linha 38. Resultado: todos os 20 quadros têm o último pixel opaco na linha 38; linha 39, colunas 0/31 e linha 0 vazias.
- **Ordem do ciclo:** o clipe do PixelLab começa na passagem. Reordenei para a ficha: walk-0 = `frame_001` (contato), walk-1 = `frame_002` (passagem), walk-2 = `frame_003` (contato), walk-3 = `frame_000` (passagem).
- Alfa forçado para 0/255 (a saída já vinha binária; o passo só garante).

## 3. Custo

| Etapa | Gerações |
|---|---|
| Referência v3, 8 direções, 40 px | 2 |
| Caminhada template (descartada), 1 direção | 1 |
| Caminhada skeleton-v3, 4 direções × 3 | 12 |
| **Total** | **15 de 40 do trial** (saldo: 25) |

Nenhum crédito em dinheiro foi usado (saldo em USD: 0,00).

## 4. Licença e termos

- Termos: <https://pixellab.ai/termsofservice>.
- Segundo a documentação do próprio PixelLab (consulta pela ferramenta de ajuda do MCP), **as imagens geradas podem ser usadas comercialmente**, inclusive em lojas como a Steam. A restrição citada é não usar as saídas para treinar modelos concorrentes. Lojas podem exigir que o uso de IA seja declarado.
- **Pendente:** eu não li o texto integral dos termos, nem confirmei se o plano trial tem regra diferente dos planos pagos. Antes de publicar comercialmente, o responsável deve conferir os termos vigentes.

## 5. Avaliação honesta da qualidade

**O que está bom**

- Identidade estável: mesma pessoa nas 4 direções e nos 20 quadros. Cabelo, jaqueta, camiseta, calça e mochila se mantêm, e a caminhada não introduz cores novas.
- Silhueta lê sem rosto: cabelo, mochila marrom e jaqueta azul.
- Leste e oeste são desenhos próprios, com a mochila do lado certo.
- O passo lê como esquerdo/direito nos perfis. Na frente e nas costas a leitura é mais fraca (pernas curtas, pouca abertura).
- Contorno escuro colorido (`#0E0321`, roxo quase preto), sem preto puro.

**Problemas e limitações vistos**

1. **Âncora / balanço vertical:** como cada quadro tem o pé mais baixo levado à linha 38, nos contatos o corpo sobe 1 px em relação ao idle e às passagens (nos dados brutos, o pé da frente desce 1 px nos contatos por causa da perspectiva top-down). O balanço é de 1 px e está nos dados medidos; precisa ser julgado em movimento no NIC-62. A alternativa seria manter o corpo fixo e deixar o pé da frente ir para a linha 39, o que quebraria a regra da ficha.
2. **Paleta fora do proposto:** a jaqueta saiu **azul** (`#366D8C` e tons), não azul-petróleo `#3D7978`; quase não há luz sage `#70A68A`. Tênis vieram marfim/caramelo. O sprite tem **56 cores** no total (37–46 por direção), bem acima do teto de ~14 da ficha §6. Uma redução de paleta e o ajuste da jaqueta para o petróleo podem ser feitos depois (`reduce_colors` do PixelLab ou edição manual), mas não fiz agora para não mexer na identidade sem aprovação.
3. **Proporção:** o personagem está mais "chibi" que o pedido (cabeça grande em relação ao corpo, pernas curtas). Corpo de 17–18 px de largura e 35 px de altura, dentro da faixa da ficha.
4. **Quadros irregulares:** west walk-3 tem o rosto e o cabelo um pouco diferentes do idle; east walk-0 inclina o tronco. Nada que troque a pessoa, mas vale olhar no QA.
5. **Idle de 1 quadro**, como na ficha (sem respiração).
6. **Visão:** o PixelLab desenha em "low top-down" (~20°, 3/4 de RPG). Não existe opção ortográfica pura para personagem; o cenário atual aceita bem essa leitura, mas é uma diferença em relação ao pedido "top-down ortográfico".
7. O teste em escala real dentro do jogo (zoom fracionário ~3,1×, filtro `NEAREST`) não foi feito aqui: é NIC-62/B-02.
