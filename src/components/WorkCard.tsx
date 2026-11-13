import { motion, useReducedMotion } from 'motion/react'
import { img, type Work } from '../content'
import { layoutKey, useLightbox } from './Lightbox'

type Props = {
  work: Work
  group?: Work[]
  /** sección de origen, para que el lightbox crezca desde esta instancia */
  source: string
  className?: string
  /** rotación de collage en grados */
  tilt?: number
  tape?: boolean
  /** usa la versión completa en vez de la miniatura (piezas grandes) */
  full?: boolean
  caption?: boolean
  eager?: boolean
}

export function WorkCard({ work, group, source, className = '', tilt = 0, tape = false, full = false, caption = true, eager = false }: Props) {
  const { open, activeKey } = useLightbox()
  const reduce = useReducedMotion()
  const lk = layoutKey(source, work.id)
  const hidden = activeKey === lk

  return (
    <figure className={`group ${className}`} style={{ rotate: `${tilt}deg` }}>
      <motion.button
        type="button"
        layoutId={reduce ? undefined : lk}
        transition={{ type: 'spring', bounce: 0, duration: 0.45 }}
        onClick={() => open(work, group, source)}
        aria-label={`Abrir ${work.title}`}
        className={`relative block w-full cursor-zoom-in overflow-visible bg-ink-2 paper-shadow ${tape ? 'tape' : ''}`}
        style={{ aspectRatio: `${work.w} / ${work.h}`, opacity: hidden ? 0 : 1 }}
        whileHover={reduce ? undefined : { y: -4, rotate: tilt ? -tilt * 0.6 : 0.6 }}
        whileTap={{ scale: 0.98 }}
      >
        <img
          src={img(work.file, !full)}
          alt={work.alt}
          width={work.w}
          height={work.h}
          loading={eager ? 'eager' : 'lazy'}
          decoding="async"
          draggable={false}
          className="absolute inset-0 h-full w-full object-cover"
        />
      </motion.button>
      {caption && (
        <figcaption className="mt-3 flex items-baseline justify-between gap-4">
          <span className="display-cond text-lg text-paper">{work.title}</span>
          <span className="label text-right text-mute">{work.detail}</span>
        </figcaption>
      )}
    </figure>
  )
}
