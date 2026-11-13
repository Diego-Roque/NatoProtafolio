"""Detecta el borde blanco de una imagen (BMP 24/32-bit sin comprimir).

Uso: python3 -I whitebounds.py preview.bmp FULL_W FULL_H
Imprime "top left height width" en coordenadas de la imagen completa,
listo para `sips -c height width --cropOffset top left`.
"""
import struct
import sys


def load_bmp(path):
    data = open(path, "rb").read()
    off = struct.unpack_from("<I", data, 10)[0]
    w, h = struct.unpack_from("<ii", data, 18)
    bpp = struct.unpack_from("<H", data, 28)[0] // 8
    flip = h > 0
    h = abs(h)
    stride = (w * bpp + 3) & ~3
    rows = []
    for y in range(h):
        base = off + y * stride
        rows.append([sum(data[base + x * bpp: base + x * bpp + 3]) / 3 for x in range(w)])
    if flip:
        rows.reverse()
    return w, h, rows


def is_white(vals, thresh=232, ratio=0.9):
    return sum(1 for v in vals if v >= thresh) >= ratio * len(vals)


def main():
    path, fw, fh = sys.argv[1], int(sys.argv[2]), int(sys.argv[3])
    w, h, px = load_bmp(path)
    top = 0
    while top < h // 4 and is_white(px[top]):
        top += 1
    bottom = h - 1
    while bottom > h * 3 // 4 and is_white(px[bottom]):
        bottom -= 1
    col = lambda x: [px[y][x] for y in range(top, bottom + 1)]
    left = 0
    while left < w // 4 and is_white(col(left)):
        left += 1
    right = w - 1
    while right > w * 3 // 4 and is_white(col(right)):
        right -= 1
    # margen de seguridad de 1px de preview para no dejar restos de blanco
    pad = 1
    top, left = min(top + pad, h - 1), min(left + pad, w - 1)
    bottom, right = max(bottom - pad, top), max(right - pad, left)
    sx, sy = fw / w, fh / h
    t, l = int(top * sy), int(left * sx)
    hh, ww = int((bottom + 1) * sy) - t, int((right + 1) * sx) - l
    print(t, l, hh, ww)


main()
