import { more } from '../content'
import { Reveal } from './Reveal'
import { WorkCard } from './WorkCard'

const tilts = [-2.5, 2, -1, 3, -2]

/* Pared de carteles: masonry con columnas CSS, cada pieza con su cinta. */
export function MorePosters() {
  return (
    <section id="carteles" className="relative scroll-mt-20 py-24 md:py-32">
      <div className="mx-auto max-w-[1400px] px-4 md:px-8">
        <Reveal>
          <h2 className="display text-[clamp(2.6rem,6.5vw,5.5rem)] text-paper">{more.title}</h2>
          <p className="mt-5 max-w-[50ch] leading-relaxed text-paper-dim">{more.body}</p>
        </Reveal>

        <div className="mt-14 columns-1 gap-8 sm:columns-2 lg:columns-3 [&>*]:mb-14">
          {more.items.map((w, i) => (
            <Reveal key={w.id} delay={(i % 3) * 0.07} className="break-inside-avoid px-2 pt-3">
              <WorkCard source="mc" work={w} group={more.items} tilt={tilts[i]} tape />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
