import { jawelin } from '../content'
import { Reveal } from './Reveal'
import { WorkCard } from './WorkCard'

const group = [jawelin.main, jawelin.after, ...jawelin.bands]
const [b1, b2, ...rest] = jawelin.bands

/* Bento: 7 piezas, 7 celdas. El póster principal manda, el resto es la campaña en redes. */
export function Jawelin() {
  return (
    <section id="jawelin" className="relative scroll-mt-20 py-24 md:py-36">
      <div className="mx-auto grid max-w-[1400px] grid-cols-1 gap-12 px-4 md:grid-cols-12 md:gap-10 md:px-8">
        <Reveal className="md:col-span-5">
          <WorkCard source="jw" work={jawelin.main} group={group} tilt={-1.5} tape full />
        </Reveal>

        <div className="md:col-span-7">
          <Reveal>
            <p className="label text-violet">{jawelin.eyebrow}</p>
            <h2 className="display mt-4 text-[clamp(3rem,8vw,6.5rem)] text-paper">{jawelin.title}</h2>
            <p className="mt-6 max-w-[54ch] leading-relaxed text-paper-dim">{jawelin.body}</p>
          </Reveal>

          <div className="mt-12 grid grid-cols-2 items-start gap-4 md:gap-5">
            <Reveal className="row-span-2">
              <WorkCard source="jw" work={jawelin.after} group={group} tilt={1.5} />
            </Reveal>
            <Reveal delay={0.06}>
              <WorkCard source="jw" work={b1} group={group} tilt={-1} />
            </Reveal>
            <Reveal delay={0.12}>
              <WorkCard source="jw" work={b2} group={group} tilt={1} />
            </Reveal>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-8 sm:grid-cols-3 sm:gap-5 md:col-span-12 md:mt-4">
          {rest.map((w, i) => (
            <Reveal key={w.id} delay={i * 0.06}>
              <WorkCard source="jw" work={w} group={group} tilt={[1.5, -2, 1][i]} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
