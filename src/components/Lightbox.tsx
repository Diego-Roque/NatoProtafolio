import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from 'react'
import {
  AnimatePresence,
  motion,
  useMotionValue,
  useReducedMotion,
  useTransform,
  type PanInfo,
} from 'motion/react'
import { ArrowLeft, ArrowRight, X } from '@phosphor-icons/react'
import { img, type Work } from '../content'

type LightboxState = { group: Work[]; index: number; source: string } | null
type Ctx = { open: (work: Work, group?: Work[], source?: string) => void; activeKey: string | null }

/** La misma pieza puede aparecer en varias secciones: la clave incluye la sección de origen. */
export const layoutKey = (source: string, id: string) => `work-${source}-${id}`

const LightboxCtx = createContext<Ctx>({ open: () => {}, activeKey: null })
export const useLightbox = () => useContext(LightboxCtx)

const spring = { type: 'spring', bounce: 0, duration: 0.45 } as const

export function LightboxProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<LightboxState>(null)

  const open = useCallback((work: Work, group: Work[] = [work], source = 'x') => {
    const index = Math.max(0, group.findIndex((w) => w.id === work.id))
    setState({ group, index, source })
  }, [])
  const close = useCallback(() => setState(null), [])
  const step = useCallback(
    (dir: 1 | -1) =>
      setState((s) => (s ? { ...s, index: (s.index + dir + s.group.length) % s.group.length } : s)),
    [],
  )

  const work = state ? state.group[state.index] : null
  const key = work && state ? layoutKey(state.source, work.id) : null
  const value = useMemo(() => ({ open, activeKey: key }), [open, key])

  return (
    <LightboxCtx.Provider value={value}>
      {children}
      <AnimatePresence>
        {work && state && (
          <LightboxView
            key="lightbox"
            work={work}
            layoutId={key!}
            count={state.group.length}
            index={state.index}
            onClose={close}
            onStep={step}
          />
        )}
      </AnimatePresence>
    </LightboxCtx.Provider>
  )
}

function LightboxView({
  work,
  layoutId,
  count,
  index,
  onClose,
  onStep,
}: {
  work: Work
  layoutId: string
  count: number
  index: number
  onClose: () => void
  onStep: (d: 1 | -1) => void
}) {
  const reduce = useReducedMotion()
  const y = useMotionValue(0)
  // El fondo se aclara mientras arrastras hacia abajo: feedback continuo, no solo al soltar.
  const scrim = useTransform(y, [0, 320], [0.92, 0.35])
  const scale = useTransform(y, [0, 320], [1, 0.88])
  const [loaded, setLoaded] = useState<string | null>(null)

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
      if (e.key === 'ArrowRight' && count > 1) onStep(1)
      if (e.key === 'ArrowLeft' && count > 1) onStep(-1)
    }
    window.addEventListener('keydown', onKey)
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      window.removeEventListener('keydown', onKey)
      document.body.style.overflow = prev
    }
  }, [onClose, onStep, count])

  const onDragEnd = (_: unknown, info: PanInfo) => {
    // Se decide por velocidad o por distancia: un flick corto también cierra.
    if (info.offset.y > 140 || info.velocity.y > 650) onClose()
  }

  const landscape = work.w > work.h

  return (
    <motion.div
      role="dialog"
      aria-modal="true"
      aria-label={work.title}
      className="fixed inset-0 z-50 flex flex-col items-center justify-center px-4 py-6 md:px-10"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: reduce ? 0.15 : 0.25 }}
    >
      <motion.button
        aria-label="Cerrar"
        onClick={onClose}
        className="absolute inset-0 cursor-zoom-out bg-ink"
        style={{ opacity: scrim }}
      />

      <motion.figure
        layoutId={reduce ? undefined : layoutId}
        transition={spring}
        drag={reduce ? false : 'y'}
        dragConstraints={{ top: 0, bottom: 0 }}
        dragElastic={{ top: 0.08, bottom: 0.8 }}
        onDragEnd={onDragEnd}
        style={{ y, scale }}
        className="relative z-10 flex max-h-full cursor-grab flex-col items-center active:cursor-grabbing"
      >
        <div
          className="relative overflow-hidden bg-ink-2 paper-shadow"
          style={{
            aspectRatio: `${work.w} / ${work.h}`,
            height: landscape ? 'auto' : 'min(82dvh, 1400px)',
            width: landscape ? 'min(92vw, 1500px)' : 'auto',
            maxWidth: '92vw',
            maxHeight: '82dvh',
          }}
        >
          {/* Miniatura primero, la versión completa encima cuando termina de cargar */}
          <img src={img(work.file, true)} alt="" aria-hidden className="absolute inset-0 h-full w-full object-cover" />
          <img
            key={work.file}
            src={img(work.file)}
            alt={work.alt}
            width={work.w}
            height={work.h}
            decoding="async"
            onLoad={() => setLoaded(work.file)}
            className="absolute inset-0 h-full w-full object-cover transition-opacity duration-300"
            style={{ opacity: loaded === work.file ? 1 : 0 }}
            draggable={false}
          />
        </div>
        <figcaption className="mt-4 flex w-full items-baseline justify-between gap-6 text-paper">
          <span className="display-cond text-xl md:text-2xl">{work.title}</span>
          <span className="label text-paper-dim">{work.detail}</span>
        </figcaption>
      </motion.figure>

      <div className="absolute right-4 top-4 z-20 flex gap-2 md:right-6 md:top-6">
        {count > 1 && (
          <>
            <IconButton label="Anterior" onClick={() => onStep(-1)}>
              <ArrowLeft size={18} weight="bold" />
            </IconButton>
            <span className="label glass flex items-center rounded-full px-3 text-paper-dim">
              {index + 1}/{count}
            </span>
            <IconButton label="Siguiente" onClick={() => onStep(1)}>
              <ArrowRight size={18} weight="bold" />
            </IconButton>
          </>
        )}
        <IconButton label="Cerrar" onClick={onClose}>
          <X size={18} weight="bold" />
        </IconButton>
      </div>
    </motion.div>
  )
}

function IconButton({ label, onClick, children }: { label: string; onClick: () => void; children: ReactNode }) {
  return (
    <button
      aria-label={label}
      onClick={onClick}
      className="glass grid size-10 place-items-center rounded-full text-paper transition-transform duration-100 active:scale-95"
    >
      {children}
    </button>
  )
}
