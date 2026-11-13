import { useCallback, useEffect, useRef, useState } from 'react'
import { animate, motion, useMotionValue, useReducedMotion, type PanInfo } from 'motion/react'
import { ArrowLeft, ArrowRight, HandGrabbing } from '@phosphor-icons/react'
import { img, lumberjacks } from '../content'
import { layoutKey, useLightbox } from './Lightbox'
import { Reveal } from './Reveal'

const GAP = 24
const tilts = [-2, 1.5, -1, 2, -1.5]

/** Proyección de momentum de Apple (Designing Fluid Interfaces): a dónde va el gesto. */
const project = (velocity: number, decel = 0.998) => ((velocity / 1000) * decel) / (1 - decel)

export function Lumberjacks() {
  const reduce = useReducedMotion()
  const { open, activeKey } = useLightbox()
  const viewport = useRef<HTMLDivElement>(null)
  const firstCard = useRef<HTMLDivElement>(null)
  const x = useMotionValue(0)
  const [step, setStep] = useState(400)
  const [maxIndex, setMaxIndex] = useState(lumberjacks.posters.length - 1)
  const [index, setIndex] = useState(0)
  const dragged = useRef(false)
  const posters = lumberjacks.posters

  // Mide tarjeta y viewport para saber los puntos de snap.
  useEffect(() => {
    const measure = () => {
      const card = firstCard.current
      const vp = viewport.current
      if (!card || !vp) return
      const s = card.offsetWidth + GAP
      setStep(s)
      const track = posters.length * s - GAP
      const overflow = Math.max(0, track - vp.clientWidth)
      setMaxIndex(Math.min(posters.length - 1, Math.ceil(overflow / s)))
    }
    measure()
    const ro = new ResizeObserver(measure)
    if (viewport.current) ro.observe(viewport.current)
    return () => ro.disconnect()
  }, [posters.length])

  const minX = -maxIndex * step

  const goTo = useCallback(
    (i: number, velocity = 0) => {
      const next = Math.max(0, Math.min(maxIndex, i))
      setIndex(next)
      // Spring desde el valor actual en pantalla, heredando la velocidad del dedo.
      animate(x, -next * step, reduce ? { duration: 0 } : { type: 'spring', bounce: velocity ? 0.18 : 0, duration: 0.5, velocity })
    },
    [maxIndex, step, x, reduce],
  )

  useEffect(() => {
    goTo(index)
    // al re-medir se re-alinea al índice actual
  }, [step, maxIndex])

  const onDragEnd = (_: unknown, info: PanInfo) => {
    const projected = x.get() + project(info.velocity.x)
    goTo(Math.round(-projected / step), info.velocity.x)
  }

  return (
    <section id="lumberjacks" className="relative scroll-mt-20 overflow-hidden bg-ink-2 py-24 md:py-32">
      <div className="mx-auto max-w-[1400px] px-4 md:px-8">
        <Reveal>
          <p className="display-cond text-2xl text-violet">{lumberjacks.band}</p>
          <h2 className="display mt-3 max-w-[16ch] text-[clamp(2.4rem,6vw,5rem)] text-paper">{lumberjacks.title}</h2>
          <p className="mt-6 max-w-[56ch] leading-relaxed text-paper-dim">{lumberjacks.body}</p>
        </Reveal>

        <div className="mt-10 flex items-center justify-between gap-4">
          <span className="label flex items-center gap-2 text-mute">
            <HandGrabbing size={16} weight="bold" /> {lumberjacks.hint}
          </span>
          <div className="flex gap-2">
            <CarouselButton label="Anterior" disabled={index === 0} onClick={() => goTo(index - 1)}>
              <ArrowLeft size={18} weight="bold" />
            </CarouselButton>
            <CarouselButton label="Siguiente" disabled={index >= maxIndex} onClick={() => goTo(index + 1)}>
              <ArrowRight size={18} weight="bold" />
            </CarouselButton>
          </div>
        </div>
      </div>

      <div ref={viewport} className="mx-auto mt-8 max-w-[1400px] px-4 md:px-8">
        <motion.div
          className="flex cursor-grab touch-pan-y py-6 active:cursor-grabbing"
          style={{ x, gap: GAP }}
          drag="x"
          dragConstraints={{ left: minX, right: 0 }}
          dragElastic={0.12}
          dragMomentum={false}
          onDragStart={() => {
            dragged.current = true
          }}
          onPointerDown={() => {
            dragged.current = false
          }}
          onDragEnd={onDragEnd}
          aria-roledescription="carrusel"
        >
          {posters.map((w, i) => (
            <div
              key={w.id}
              ref={i === 0 ? firstCard : undefined}
              className="w-[min(72vw,340px)] shrink-0 md:w-[clamp(260px,24vw,360px)]"
            >
              <figure style={{ rotate: `${tilts[i]}deg` }}>
                <motion.button
                  type="button"
                  layoutId={reduce ? undefined : layoutKey('lj', w.id)}
                  onClick={() => {
                    if (!dragged.current) open(w, posters, 'lj')
                  }}
                  aria-label={`Abrir cartel del ${w.title}`}
                  className="tape paper-shadow relative block w-full cursor-zoom-in bg-ink-3"
                  style={{ aspectRatio: `${w.w} / ${w.h}`, opacity: activeKey === layoutKey('lj', w.id) ? 0 : 1 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <img
                    src={img(w.file, true)}
                    alt={w.alt}
                    width={w.w}
                    height={w.h}
                    loading="lazy"
                    draggable={false}
                    className="pointer-events-none absolute inset-0 h-full w-full object-cover"
                  />
                </motion.button>
                <figcaption className="mt-4">
                  <span className="display-cond block text-xl text-paper">{w.title}</span>
                  <span className="label text-mute">{w.detail}</span>
                </figcaption>
              </figure>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

function CarouselButton({
  label,
  disabled,
  onClick,
  children,
}: {
  label: string
  disabled: boolean
  onClick: () => void
  children: React.ReactNode
}) {
  return (
    <button
      type="button"
      aria-label={label}
      disabled={disabled}
      onClick={onClick}
      className="grid size-11 place-items-center rounded-full border border-paper/20 text-paper transition duration-100 hover:border-paper/50 active:scale-95 disabled:opacity-30"
    >
      {children}
    </button>
  )
}
