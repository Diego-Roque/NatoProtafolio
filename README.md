# NATO · Portafolio

Portafolio de diseño gráfico: pósters, portadas y gráfica para bandas y tocadas.

Vite + React + TypeScript + Tailwind v4, con Motion y componentes de [React Bits](https://reactbits.dev).

## Desarrollo

```bash
npm install
npm run dev
npm run build
```

## Textos

Todos los textos, títulos y datos de contacto están en `src/content.ts`.

## Imágenes

Las imágenes optimizadas (WebP a resolución original) viven en `public/img/`.
Para regenerarlas desde las fotos originales clasificadas en `../portafolio/`:

```bash
bash scripts/optimize.sh
```

Requiere `sips` (macOS) y `cwebp` (`brew install webp`).
