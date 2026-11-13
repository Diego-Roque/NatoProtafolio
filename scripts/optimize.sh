#!/usr/bin/env bash
# Convierte las fotos clasificadas de ../portafolio a WebP de alta calidad en public/img.
# La versión completa conserva la resolución original (sin reescalar).
# Los originales no se tocan. Requiere: sips (macOS) y cwebp (brew install webp).
set -euo pipefail

HERE="$(cd "$(dirname "$0")/.." && pwd)"
SRC="$HERE/../portafolio"
OUT="$HERE/public/img"
TMP="$(mktemp -d)"
trap 'rm -rf "$TMP"' EXIT
mkdir -p "$OUT"

# Pósters con borde blanco irregular (capturas/escaneos): se detecta y recorta solo el blanco.
BORDERED=(
  lumberjacks-5anos-oct23-rojo lumberjacks-5anos-sep19-rojo-blanco
  lumberjacks-5anos-sep25-azul lumberjacks-5anos-nov7-pastel
  lumberjacks-5anos-nov21-amarillo jawelin-poster-principal jawelin-poster-after
  90segundos-plastilina-poster-julio31-cereal 90segundos-plastilina-poster-mayo9-pizza
  90segundos-plastilina-poster-junio26-brackets poster-navidarks
  poster-division-del-norte poster-frankofest
)

is_bordered() { local n="$1"; for b in "${BORDERED[@]}"; do [[ "$b" == "$n" ]] && return 0; done; return 1; }

for dir in hero lateral grid texturas; do
  for f in "$SRC/$dir"/*.jpeg; do
    name="$(basename "$f" .jpeg)"
    # Intermedio en PNG (sin pérdida) para no recomprimir el JPEG al recortar.
    work="$TMP/$name.png"
    sips -s format png "$f" --out "$work" >/dev/null
    if is_bordered "$name"; then
      w=$(sips -g pixelWidth "$work" | awk '/pixelWidth/{print $2}')
      h=$(sips -g pixelHeight "$work" | awk '/pixelHeight/{print $2}')
      sips -Z 400 -s format bmp "$work" --out "$TMP/prev.bmp" >/dev/null
      read -r t l ch cw < <(python3 -I "$HERE/scripts/whitebounds.py" "$TMP/prev.bmp" "$w" "$h")
      sips -c "$ch" "$cw" --cropOffset "$t" "$l" "$work" >/dev/null
      echo "  recorte $name: ${w}x${h} -> ${cw}x${ch}"
    fi
    # Versión completa: resolución original, sin reescalar, calidad alta.
    cwebp -quiet -q 92 -m 6 -sharp_yuv -metadata icc "$work" -o "$OUT/$name.webp"
    # Miniatura solo para cuadrículas (la versión completa se usa en hero y lightbox).
    sips -Z 1400 "$work" --out "$TMP/$name-s.png" >/dev/null
    cwebp -quiet -q 88 -m 6 -sharp_yuv -metadata icc "$TMP/$name-s.png" -o "$OUT/$name-sm.webp"
    echo "ok $name"
  done
done
du -sh "$OUT"
