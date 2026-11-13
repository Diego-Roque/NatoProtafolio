import { img, live } from '../content'
import { Reveal } from './Reveal'

/* Franja a sangre con scroll-snap nativo: fotos de la escena con trama de fotocopia. */
export function Live() {
  return (
    <section aria-labelledby="live-title" className="relative py-20 md:py-28">
      <div className="mx-auto max-w-[1400px] px-4 md:px-8">
        <Reveal>
          <h2 id="live-title" className="display-cond text-[clamp(2.4rem,5vw,4rem)] text-paper">
            {live.title}
          </h2>
          <p className="mt-3 max-w-[48ch] text-paper-dim">{live.body}</p>
        </Reveal>
      </div>

      <div className="mt-10 flex snap-x snap-mandatory gap-3 overflow-x-auto px-4 pb-4 [scrollbar-width:none] md:px-8 [&::-webkit-scrollbar]:hidden">
        {live.photos.map((p) => (
          <figure
            key={p.file}
            className="group relative h-[clamp(260px,48vh,520px)] shrink-0 snap-start overflow-hidden bg-ink-2"
            style={{ aspectRatio: `${p.w} / ${p.h}` }}
          >
            <img
              src={img(p.file)}
              alt={p.alt}
              width={p.w}
              height={p.h}
              loading="lazy"
              decoding="async"
              draggable={false}
              className="h-full w-full object-cover grayscale-[0.6] transition duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.03] group-hover:grayscale-0"
            />
            <div className="halftone opacity-30 transition-opacity duration-500 group-hover:opacity-0" />
          </figure>
        ))}
      </div>
    </section>
  )
}
