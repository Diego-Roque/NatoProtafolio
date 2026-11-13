import { useRef, useState } from 'react'
import { motion, useReducedMotion } from 'motion/react'
import { ArrowDown } from '@phosphor-icons/react'
import TextPressure from './bits/TextPressure'
import { hero, img, jawelin, lumberjacks, more, plastilina, type Work } from '../content'
import { layoutKey, useLightbox } from './Lightbox'

/* Piezas regadas en el collage. Posición en % del hero (solo desktop). */
const scattered: { work: Work; left: string; top: string; width: string; tilt: number }[] = [
  { work: jawelin.main, left: '58%', top: '13%', width: 'clamp(180px, 17vw, 270px)', tilt: -5 },
  { work: plastilina.covers[0], left: '76%', top: '20%', width: 'clamp(170px, 15vw, 250px)', tilt: 4 },
  { work: lumberjacks.posters[1], left: '64%', top: '50%', width: 'clamp(160px, 14vw, 230px)', tilt: 7 },
  { work: more.items[0], left: '82%', top: '56%', width: 'clamp(150px, 13vw, 215px)', tilt: -3 },
]

const heroGroup = scattered.map((s) => s.work)

export function Hero() {
  const ref = useRef<HTMLElement>(null)
  const reduce = useReducedMotion()

  return (
    <section ref={ref} id="top" className="relative isolate min-h-[100dvh] overflow-hidden">
      {/* Fondo: foto en vivo oscurecida con trama halftone */}
      <div className="absolute inset-0 -z-10">
        <img
          src={img('vivo-guitarrista-cabello-verde-stickers')}
          alt=""
          aria-hidden
          fetchPriority="high"
          className="h-full w-full object-cover object-[30%_40%] opacity-55 saturate-[0.85]"
        />
        <div className="halftone" />
        <div className="absolute inset-0 bg-[linear-gradient(100deg,var(--color-ink)_8%,rgb(14_13_16/0.82)_42%,rgb(14_13_16/0.35)_75%,rgb(14_13_16/0.6))]" />
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-ink to-transparent" />
      </div>

      <div className="mx-auto grid min-h-[100dvh] max-w-[1400px] grid-cols-1 content-center px-4 pb-14 pt-24 md:grid-cols-12 md:px-8">
        <div className="relative z-10 md:col-span-6 lg:col-span-6">
          <motion.p
            className="label mb-5 text-violet"
            initial={reduce ? false : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          >
            {hero.eyebrow}
          </motion.p>

          <motion.div
            className="-ml-1 h-[clamp(110px,19vw,300px)] w-full max-w-[640px] text-paper"
            initial={reduce ? false : { opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
          >
            <TextPressure
              text={hero.name}
              fontFamily="Archivo Variable"
              fontUrl=""
              flex={false}
              className="!text-left"
              width
              weight
              italic={false}
              alpha={false}
              stroke={false}
              scale
              radius={260}
              idle="wave"
              textColor="#ece9e2"
              minFontSize={40}
            />
          </motion.div>

          <motion.p
            className="mt-6 max-w-[42ch] text-lg leading-relaxed text-paper-dim md:text-xl"
            initial={reduce ? false : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.18, ease: [0.16, 1, 0.3, 1] }}
          >
            {hero.sub}
          </motion.p>

          <motion.a
            href="#plastilina"
            className="mt-9 inline-flex items-center gap-2 rounded-full bg-paper px-6 py-3.5 font-semibold text-ink transition-transform duration-100 active:scale-[0.97]"
            initial={reduce ? false : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.26, ease: [0.16, 1, 0.3, 1] }}
          >
            {hero.cta}
            <ArrowDown size={18} weight="bold" />
          </motion.a>
        </div>

        {/* Móvil: las piezas se apilan como un abanico, sin arrastre */}
        <div className="relative mt-14 flex h-[300px] justify-center md:hidden" aria-label="Trabajos destacados">
          {scattered.slice(0, 3).map((s, i) => (
            <MobilePiece key={s.work.id} work={s.work} index={i} tilt={s.tilt} />
          ))}
        </div>
      </div>

      {/* Desktop: piezas arrastrables sueltas sobre el collage */}
      <div className="pointer-events-none absolute inset-0 hidden md:block">
        {scattered.map((s, i) => (
          <DraggablePiece key={s.work.id} constraints={ref} {...s} index={i} />
        ))}
      </div>

    </section>
  )
}

let topZ = 10

function DraggablePiece({
  work,
  left,
  top,
  width,
  tilt,
  index,
  constraints,
}: {
  work: Work
  left: string
  top: string
  width: string
  tilt: number
  index: number
  constraints: React.RefObject<HTMLElement | null>
}) {
  const reduce = useReducedMotion()
  const { open, activeKey } = useLightbox()
  const [z, setZ] = useState(index + 1)
  const dragged = useRef(false)

  return (
    <motion.div
      className="pointer-events-auto absolute cursor-grab touch-none active:cursor-grabbing"
      style={{ left, top, width, zIndex: z }}
      initial={reduce ? false : { opacity: 0, y: 60, rotate: tilt * 2.2, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, rotate: tilt, scale: 1 }}
      transition={{ type: 'spring', bounce: 0.25, duration: 0.9, delay: 0.35 + index * 0.09 }}
      drag={!reduce}
      dragConstraints={constraints}
      dragElastic={0.16}
      // Inercia con proyección de momentum: al soltar sigue la velocidad del cursor y frena.
      dragTransition={{ power: 0.22, timeConstant: 260, bounceStiffness: 280, bounceDamping: 24 }}
      whileDrag={{ scale: 1.05, rotate: tilt * 0.4 }}
      onPointerDown={() => {
        dragged.current = false
        setZ(++topZ)
      }}
      onDragStart={() => {
        dragged.current = true
      }}
      onTap={() => {
        if (!dragged.current) open(work, heroGroup, 'hero')
      }}
    >
      <motion.div
        layoutId={reduce ? undefined : layoutKey('hero', work.id)}
        className="tape paper-shadow relative bg-ink-2"
        style={{ aspectRatio: `${work.w} / ${work.h}`, opacity: activeKey === layoutKey('hero', work.id) ? 0 : 1, ['--tape-rot' as string]: `${tilt * -1.4}deg` }}
      >
        <img
          src={img(work.file, true)}
          alt={work.alt}
          width={work.w}
          height={work.h}
          draggable={false}
          className="absolute inset-0 h-full w-full object-cover"
        />
      </motion.div>
    </motion.div>
  )
}

function MobilePiece({ work, index, tilt }: { work: Work; index: number; tilt: number }) {
  const { open } = useLightbox()
  const offsets = ['-58%', '-50%', '-42%']
  const xs = ['-28%', '0%', '28%']
  return (
    <button
      type="button"
      onClick={() => open(work, heroGroup, 'hero-m')}
      aria-label={`Abrir ${work.title}`}
      className="tape paper-shadow absolute left-1/2 top-0 w-[46%] max-w-[200px] bg-ink-2"
      style={{
        aspectRatio: `${work.w} / ${work.h}`,
        translate: `calc(${offsets[index]} + ${xs[index]}) ${index === 1 ? '-10px' : '14px'}`,
        rotate: `${tilt * 1.4}deg`,
        zIndex: index === 1 ? 3 : 1,
      }}
    >
      <img src={img(work.file, true)} alt={work.alt} className="absolute inset-0 h-full w-full object-cover" draggable={false} />
    </button>
  )
}
