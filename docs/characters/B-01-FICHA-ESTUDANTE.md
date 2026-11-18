# B-01.1 — Ficha do estudante-base AB-3 (proposta)

**Linear:** NIC-60 · **Data:** 18/11/2026 · **Status:** **PROPOSTA, aguardando aprovação do responsável**
**Base:** `docs/ART-BIBLE-V1.1.md` (§5.2, §6, §7), guia operacional B-01 no Linear e código atual de `src/`.

> Este documento não altera código, não gera sprites e não instala ferramentas. Ele fixa o contrato que a produção (NIC-61) e o QA (NIC-62) vão seguir. As decisões marcadas com **[DECIDIR]** precisam do aceite do responsável antes de NIC-61.

## 1. Auditoria do que existe hoje

| Item | Cenário original (`?original=1`) | Trecho modular (padrão) |
|---|---|---|
| Arte do avatar | `student-v1.png`, 1199 × 1312, alta resolução, reduzido para 55 px de altura | Gerado em código (`src/modular-art.ts`), quadros de **24 × 32 px** |
| Âncora | `setOrigin(.5, .99)` | `setOrigin(.5, 31/32)`: pés 1 px acima da base do quadro |
| Quadros | 1 estático | 4 direções × 3 quadros (neutro, passo A, passo B), ciclo `0,1,0,2` |
| Avanço da animação | — | Por **distância percorrida**: 1 quadro a cada 7 px, ciclo de 28 px |
| Ordem das linhas | — | `directions = ['south','west','east','north']` (`src/core/steps.ts`) |
| Colisão | círculo r = 8 (padrão de `move`) | círculo **r = 4** nos pés (`footRadius`) |
| Sombra | elipse 24 × 9 | elipse **12 × 5**, objeto separado |
| Profundidade | fixa | `depth = y + 0.1` (sombra em `y`) |
| Filtro | — | avatar `NEAREST`; tiles `LINEAR`; jogo com `pixelArt: false`, `roundPixels: false` |
| Zoom | `fit × 1,3` | `fit × 1,3` → cerca de **3,1×** numa janela 1366 × 768 (fracionário) |

Geometria relevante do mapa `reception.tmj` (480 × 320 px, grade 16):

- Porta: **32 px** de largura × 16. Interior da recepção: 112 px de altura útil (7 células).
- Bancada 66 × 23, banco 49 × 16, troncos de árvore 15 × 17.

**Conclusões da auditoria**

1. O contrato físico já está separado da arte: colisão, câmera e profundidade seguem o ponto dos pés. Trocar o desenho **não exige** mexer em `steps.ts` nem em `navigation.ts`.
2. O avatar provisório (24 × 32) tem a mesma densidade de pixel que os tiles de 16 px. O `student-v1.png` não tem, e por isso não serve de base técnica, só de referência de identidade.
3. O zoom é fracionário e o jogo roda com `pixelArt: false`. Um sprite 32 × 40 em `NEAREST` com zoom ≈ 3,1 terá colunas de 3 e 4 pixels de tela alternadas. Isso precisa ser observado no QA (NIC-62) e é assunto de PERF/câmera, não desta ficha. Não mudar filtro e escala ao mesmo tempo (Art Bible §5.3).

## 2. Dimensão do quadro

Comparação em escala no mapa real: [`evidencias/B-01-comparacao-escala.png`](evidencias/B-01-comparacao-escala.png) (silhuetas aproximadas, zoom 3×, ao lado da porta).

| Opção | Altura visível | Relação com a porta (32) | Relação com a sala (112) | Leitura |
|---|---|---|---|---|
| 24 × 32 (atual) | 2 células | corpo ~14 px, folga ampla | 27 % | pequeno para ler roupa/mochila |
| **32 × 40 (recomendada)** | 2,5 células | corpo ~18–20 px, folga visual ok | 34 % | espaço para cabelo, mochila e passo sem inflar a cena |
| 32 × 48 | 3 células | corpo ~18–20 px | 41 % | domina a recepção; bancada e banco parecem miniatura |

**[DECIDIR] Proposta: 32 × 40 px por quadro.** 32 × 48 só volta à mesa se o QA em escala real mostrar que 40 px não lê bem. Isso confirma a hipótese da Art Bible §5.2 e do guia.

Regras de ocupação dentro do quadro 32 × 40:

- Corpo (silhueta sem balanço de braço): **18–20 px de largura**, ~36–37 px de altura.
- Margem lateral reservada para braço/mochila no balanço e para perfis leste/oeste.
- Nenhum pixel opaco nas colunas 0 e 31 nem na linha 0 (evita bleed na folha).

## 3. Âncora (ponto dos pés)

- **Ponto de contato no chão: pixel (16, 38)** em todos os quadros, contado a partir de (0, 0) no canto superior esquerdo.
- Linha 39 fica livre (1 px de respiro, igual ao contrato atual de 31/32).
- **Origem no Phaser: `setOrigin(0.5, 38/40)` = `(0.5, 0.95)`.**
- A sola dos dois pés, quando apoiados, encosta na linha 38. No passo, o pé que sobe pode ir para 36–37; o pé de apoio **nunca** sai da linha 38.
- Colisão continua `footRadius = 4`, centrada na âncora. A sombra continua sendo objeto separado, centrada na âncora; sugestão inicial **14 × 5** (ajuste fino no QA).

## 4. Direções, estados e quadros

| Linha (y) | Direção | Coerente com `directions` |
|---|---|---|
| 0 | south (frente) | índice 0 |
| 1 | west (esquerda) | índice 1 |
| 2 | east (direita) | índice 2 |
| 3 | north (costas) | índice 3 |

| Coluna (x) | Quadro | Nome no atlas |
|---|---|---|
| 0 | idle | `south-idle` |
| 1 | walk 1: contato, pé direito à frente | `south-walk-0` |
| 2 | walk 2: passagem | `south-walk-1` |
| 3 | walk 3: contato, pé esquerdo à frente | `south-walk-2` |
| 4 | walk 4: passagem | `south-walk-3` |

**Total: 20 quadros** (4 idle + 16 walk), como no guia.

- Avanço por distância, igual ao atual: manter **7 px por quadro** dá ciclo de 28 px (1,75 célula), que casa com o passo de grade de 16 px sem patinar visivelmente. A cadência é verificada no QA, não fixada aqui.
- Idle tem 1 quadro. Respiração em 2 quadros fica fora do escopo até o mínimo ser aprovado.

**[DECIDIR] Leste e oeste desenhados separadamente (sem `flipX`).** A mochila e a alça são assimétricas, e a Art Bible §7.1 pede desenho próprio quando o espelho gera erro. Custo extra: 5 quadros. Alternativa: espelhar e aceitar a mochila trocando de ombro.

## 5. Folha (spritesheet) e metadados

- **Uma PNG RGBA de 160 × 160 px** (5 colunas × 4 linhas de 32 × 40), sem margem e sem espaçamento, fundo totalmente transparente (alfa 0 ou 255, sem semitransparência nas bordas).
- Carregamento previsto em B-02: `this.load.spritesheet('student-main', url, { frameWidth: 32, frameHeight: 40 })`. Índice do quadro = `linha × 5 + coluna`.
- JSON ao lado com a convenção, para não depender de números mágicos no código:

```json
{
  "id": "student-main",
  "version": "b01-v1",
  "frame": { "width": 32, "height": 40 },
  "anchor": { "x": 16, "y": 38, "originX": 0.5, "originY": 0.95 },
  "directions": ["south", "west", "east", "north"],
  "columns": ["idle", "walk-0", "walk-1", "walk-2", "walk-3"],
  "walk": { "pixelsPerFrame": 7 },
  "collision": { "footRadius": 4 },
  "shadow": { "width": 14, "height": 5 }
}
```

**[DECIDIR] Caminhos no repositório:**

```text
public/assets/characters/student-main/
  student-main.png
  student-main.json
  source/                 # arquivo editável (.aseprite ou .pxo) e quadros brutos
docs/characters/
  B-01-FICHA-ESTUDANTE.md         # este documento
  B-01-PERSONAGEM-DEFINITIVO.md   # gerado em NIC-61/62: procedência, licença, limitações
  evidencias/
```

`public/assets/student-v1.png` e `src/modular-art.ts` continuam intocados até B-02.

## 6. Direção visual do estudante-base

Personalidade (guia B-01): inteligente, simpático, moderno, acessível; jovem adulto, não infantil.

- **Proporção:** cerca de 2,5–3 cabeças de altura; cabeça ~12–13 px de largura. Pernas legíveis o bastante para o passo ler em 4 quadros.
- **Silhueta reconhecível sem rosto:** cabelo de volume simples, mochila pequena visível nas costas e no perfil, jaqueta de recorte limpo.
- **Rosto:** 2 pixels de olho na frente; sem boca desenhada ou 1 px no máximo. Nada de expressão complexa.
- **Identidade:** a Art Bible §7.1 não trava rosto, etnia ou gênero no cânone. Este é o **estudante-base da prova técnica**, não a identidade única do produto. Avatares diversos vêm depois, reaproveitando proporção, âncora e folha.

Paleta (a partir da Art Bible §4, ainda proposta; máximo de ~14 cores no sprite):

| Uso | Cor | Origem |
|---|---|---|
| Jaqueta base | `#3D7978` | Azul-petróleo |
| Jaqueta luz | `#70A68A` | Folhagem luz (sage) |
| Jaqueta sombra / selout | `#203F39` | Folhagem escura |
| Painel/camiseta | `#ECE6D7` | Parede marfim |
| Calça | `#2B3A42` | já usada no provisório |
| Tênis | `#ECE6D7` + sombra `#B8B09D` | marfim / caminho sombra |
| Mochila | `#9B7557` + luz `#C7A27C` | Madeira / madeira-luz |
| Cabelo, pele | 2–3 tons cada, a definir no primeiro rascunho | livres, sem travar no cânone |
| Contorno | *selout* por material; evitar preto puro | Art Bible §6.2 |

Proibido: preto puro como contorno universal, `#77D0CC` (ciano) como cor dominante, `#E7C46C` (reservado a missão), acessórios chamativos, fantasia medieval.

## 7. Critérios de aceite (entrada do NIC-62)

1. Lado a lado com o trecho modular, no zoom real do navegador, o estudante lê como AB-3.
2. Mesma pessoa nas 4 direções e nos 20 quadros: altura, largura, paleta e acessórios constantes.
3. Pé de apoio na linha 38 em todos os quadros; alternar quadros não desloca câmera, colisão nem sombra.
4. Ciclo sem saltos, jitter, bordas cortadas, bleed ou alfa parcial.
5. Lê sem sombra.
6. Folha carrega como `spritesheet` no Phaser 3.90.0 sem mexer em `steps.ts`/`navigation.ts`.
7. Procedência, ferramenta, prompt/versão, licença e custo registrados.
8. **Aceite visual explícito do responsável** antes de B-02.

## 8. Riscos

- **Ferramenta de geração (NIC-61):** PixelLab e serviços parecidos são externos, podem ser pagos e têm termos de uso próprios. Precisa de escolha e autorização antes de qualquer conta, upload ou custo. Aseprite/Pixelorama exigem instalação, então também dependem de autorização (AGENTS.md).
- **Consistência por IA:** quadros gerados costumam variar de identidade. Mitigação: gerar a partir de uma referência aprovada e corrigir à mão; rejeitar quadros que mudam a pessoa.
- **Zoom fracionário:** pode gerar pixels irregulares no sprite em `NEAREST`. Medir em NIC-62 e tratar junto com PERF-01, sem trocar filtro e escala ao mesmo tempo.
- **32 px numa porta de 32 px:** a colisão (8 px) passa folgada, mas a arte pode parecer apertada se o corpo passar de 20 px.

## 9. O que precisa de aceite agora

1. Quadro **32 × 40**, âncora **(16, 38)**, origem `(0.5, 0.95)`.
2. **20 quadros**, folha 5 × 4 na ordem south, west, east, north.
3. Leste e oeste **desenhados separadamente**.
4. Caminhos em `public/assets/characters/student-main/` e `docs/characters/`.
5. Paleta inicial da seção 6.
