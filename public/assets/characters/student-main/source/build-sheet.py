"""Monta student-main.png (160x160) a partir das saídas brutas do PixelLab.

Uso (a partir da raiz do repositório):
    python public/assets/characters/student-main/source/build-sheet.py

Regras (docs/characters/B-01-FICHA-ESTUDANTE.md):
- quadro 32x40, 5 colunas (idle, walk-0..3) x 4 linhas (south, west, east, north);
- âncora dos pés em (16, 38); linha 39 livre;
- só translação inteira, sem reamostragem; alfa binário.

Alinhamento:
- x: deslocamento fixo por direção, calculado pelo centro dos pés do idle
  (3 linhas inferiores opacas), para o corpo não deslizar entre quadros;
- y: cada quadro tem a linha opaca mais baixa levada à linha 38.
"""
from pathlib import Path
from PIL import Image

ROOT = Path(__file__).resolve().parent
RAW = ROOT / "pixellab" / "Idle"
OUT_DIR = ROOT.parent
PREVIEW = ROOT.parents[4] / "docs" / "characters" / "evidencias" / "B-01-folha-preview.png"

FW, FH = 32, 40
ANCHOR_X, ANCHOR_Y = 16, 38
DIRECTIONS = ["south", "west", "east", "north"]
# Ordem do template walking-4-frames do PixelLab -> colunas da ficha.
# frame_001 e frame_003 são contatos (passo aberto); 000 e 002 são passagens.
# Ficha: walk-0 contato, walk-1 passagem, walk-2 contato, walk-3 passagem.
WALK_ORDER = [1, 2, 3, 0]
ANIM_OFFSET = 12  # o canvas 64x64 da animação centraliza o canvas 40x40 da rotação


def opaque_rows(im):
    a = im.getchannel("A")
    w, h = im.size
    return [y for y in range(h) if any(a.getpixel((x, y)) for x in range(w))]


def feet_center_x(im):
    a = im.getchannel("A")
    w, _ = im.size
    rows = opaque_rows(im)[-3:]
    xs = [x for y in rows for x in range(w) if a.getpixel((x, y))]
    return (min(xs) + max(xs) + 1) / 2


def binarize(im):
    px = im.load()
    w, h = im.size
    for y in range(h):
        for x in range(w):
            r, g, b, a = px[x, y]
            px[x, y] = (r, g, b, 255) if a >= 128 else (0, 0, 0, 0)
    return im


def place(src, dx_canvas):
    """Cola src no quadro 32x40 com deslocamento x fixo e pés na linha 38."""
    bottom = opaque_rows(src)[-1]
    dy = ANCHOR_Y - bottom
    out = Image.new("RGBA", (FW, FH), (0, 0, 0, 0))
    bb = src.getbbox()
    crop = src.crop(bb)
    x, y = bb[0] + dx_canvas, bb[1] + dy
    if x < 1 or x + crop.width > FW - 1 or y < 1 or y + crop.height > FH - 1:
        raise SystemExit(f"quadro fora da área útil: x={x} y={y} {crop.size}")
    out.alpha_composite(crop, (x, y))
    return out


def main():
    sheet = Image.new("RGBA", (FW * 5, FH * 4), (0, 0, 0, 0))
    for row, d in enumerate(DIRECTIONS):
        idle = binarize(Image.open(RAW / "rotations" / f"{d}.png").convert("RGBA"))
        dx = round(ANCHOR_X - feet_center_x(idle))
        frames = [place(idle, dx)]
        for i in WALK_ORDER:
            f = binarize(Image.open(RAW / "animations" / "walk-skel" / d / f"frame_{i:03d}.png").convert("RGBA"))
            frames.append(place(f, dx - ANIM_OFFSET))
        for col, fr in enumerate(frames):
            sheet.alpha_composite(fr, (col * FW, row * FH))
    sheet.save(OUT_DIR / "student-main.png")

    # Prévia 4x (nearest) sobre fundo neutro, com grade e linha da âncora.
    bg = Image.new("RGBA", sheet.size, (217, 209, 187, 255))
    bg.alpha_composite(sheet)
    big = bg.resize((sheet.width * 4, sheet.height * 4), Image.NEAREST)
    px = big.load()
    for r in range(4):
        y = (r * FH + ANCHOR_Y) * 4 + 3
        for x in range(big.width):
            if px[x, y][3] and px[x, y][:3] == (217, 209, 187):
                px[x, y] = (231, 196, 108, 255)
    for c in range(1, 5):
        for y in range(big.height):
            px[c * FW * 4, y] = (61, 121, 120, 255)
    for r in range(1, 4):
        for x in range(big.width):
            px[x, r * FH * 4] = (61, 121, 120, 255)
    PREVIEW.parent.mkdir(parents=True, exist_ok=True)
    big.save(PREVIEW)


if __name__ == "__main__":
    main()
