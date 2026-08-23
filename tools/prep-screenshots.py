"""Resize the simulator captures to 2x logical width and write WebP."""
from PIL import Image
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
SRC = ROOT / "raw-screenshots"
DST = ROOT / "public" / "screenshots"
DST.mkdir(parents=True, exist_ok=True)

TARGET_W = 804  # 402 pt at 2x — sharp on retina, half the pixels of the 3x capture

for src in sorted(SRC.glob("*.png")):
    im = Image.open(src).convert("RGB")
    w, h = im.size
    im = im.resize((TARGET_W, round(h * TARGET_W / w)), Image.LANCZOS)
    out = DST / (src.stem + ".webp")
    im.save(out, "WEBP", quality=86, method=6)
    print(f"{src.name:28} {w}x{h} -> {im.size[0]}x{im.size[1]}  {out.stat().st_size/1024:6.0f} KB")
