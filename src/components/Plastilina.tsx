import { plastilina } from '../content'
import { Reveal } from './Reveal'
import { WorkCard } from './WorkCard'

const all = [plastilina.poster, ...plastilina.covers, ...plastilina.dates]
const [cover, ...singles] = plastilina.covers
const coverTilts = [-2, 1.5, -1, 2.5]
const dateTilts = [-3, 2, -1.5]

/* Split fijo: el póster con tracklist se queda pegado mientras la serie pasa a la derecha. */
export function Plastilina() {
  return (
    <section id="plastilina" className="relative scroll-mt-20 py-24 md:py-36">
      <div className="mx-auto grid max-w-[1400px] grid-cols-1 gap-14 px-4 md:grid-cols-12 md:gap-10 md:px-8">
        <div className="md:col-span-5">
          <div className="md:sticky md:top-24">
            <Reveal>
              <h2 className="display text-[clamp(3rem,5.6vw,5.4rem)] text-paper">{plastilina.title}</h2>
              <p className="display-cond mt-2 text-2xl text-violet">{plastilina.band}</p>
              <p className="mt-6 max-w-[48ch] leading-relaxed text-paper-dim">{plastilina.body}</p>
            </Reveal>
            <Reveal delay={0.1} className="mt-10 max-w-[420px] md:max-w-[min(340px,38dvh)]">
              <WorkCard source="pl" work={plastilina.poster} group={all} tilt={-1.5} tape full />
            </Reveal>
          </div>
        </div>

        <div className="md:col-span-7 md:pt-40">
          <Reveal>
            <WorkCard source="pl" work={cover} group={all} tilt={1} full className="md:ml-10" />
          </Reveal>

          <div className="mt-16 grid grid-cols-2 gap-x-5 gap-y-10 md:gap-x-8">
            {singles.map((w, i) => (
              <Reveal key={w.id} delay={(i % 2) * 0.08} className={i % 2 ? 'md:translate-y-16' : ''}>
                <WorkCard source="pl" work={w} group={all} tilt={coverTilts[i]} />
              </Reveal>
            ))}
          </div>

          <h3 className="display-cond mt-28 text-3xl text-paper md:text-4xl">Fechas de presentación</h3>
          <div className="mt-8 grid grid-cols-1 gap-10 sm:grid-cols-3 sm:gap-5">
            {plastilina.dates.map((w, i) => (
              <Reveal key={w.id} delay={i * 0.08} className={i === 1 ? 'sm:translate-y-10' : ''}>
                <WorkCard source="pl" work={w} group={all} tilt={dateTilts[i]} tape />
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
