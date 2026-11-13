import { Fragment } from 'react'
import { Asterisk } from '@phosphor-icons/react'
import ScrollVelocity from './bits/ScrollVelocity'
import { marquee } from '../content'

const Star = () => <Asterisk size="0.55em" weight="bold" className="mx-[0.35em] inline-block align-middle text-violet" />

const row = (names: string[]) => (
  <>
    {names.map((n) => (
      <Fragment key={n}>
        {n}
        <Star />
      </Fragment>
    ))}
  </>
)

/* Único marquee de la página: el cartel de bandas con las que se ha trabajado. */
export function Marquee() {
  const half = Math.ceil(marquee.length / 2)
  return (
    <section aria-label="Bandas" className="border-y border-paper/10 py-10 md:py-14">
      <ScrollVelocity
        texts={[row(marquee.slice(0, half)), row(marquee.slice(half))]}
        velocity={38}
        numCopies={3}
        className="display-cond text-paper"
        scrollerClassName="!text-[clamp(2.6rem,7vw,6rem)] !leading-none !font-[800] !tracking-[-0.01em] !drop-shadow-none"
        parallaxClassName="py-1"
        outlineAlternate
        draggable
        fadeEdges
      />
    </section>
  )
}
