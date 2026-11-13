import { ArrowUpRight, InstagramLogo } from '@phosphor-icons/react'
import Magnet from './bits/Magnet'
import { contact, contactSection, hero } from '../content'
import { Reveal } from './Reveal'

export function Contact() {
  return (
    <section id="contacto" className="relative scroll-mt-20 overflow-hidden border-t border-paper/10 pt-24 md:pt-36">
      <div className="mx-auto max-w-[1400px] px-4 md:px-8">
        <Reveal>
          <h2 className="display max-w-[12ch] text-[clamp(3rem,9vw,8rem)] text-paper">{contactSection.title}</h2>
          <p className="mt-6 max-w-[46ch] text-lg leading-relaxed text-paper-dim">{contactSection.body}</p>
        </Reveal>

        <Reveal delay={0.1} className="mt-12 flex flex-col items-start gap-6 sm:flex-row sm:items-center">
          <Magnet padding={80} magnetStrength={3} maxOffset={18}>
            <a
              href={`mailto:${contact.email}`}
              className="inline-flex items-center gap-3 rounded-full bg-violet px-8 py-4 text-lg font-semibold text-ink transition-transform duration-100 active:scale-[0.97]"
            >
              {contactSection.cta}
              <ArrowUpRight size={20} weight="bold" />
            </a>
          </Magnet>
          <div className="flex flex-col gap-1">
            <a href={`mailto:${contact.email}`} className="font-mono text-paper underline-offset-4 hover:underline">
              {contact.email}
            </a>
            <a
              href={contact.instagramUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 font-mono text-paper-dim underline-offset-4 hover:text-paper hover:underline"
            >
              <InstagramLogo size={18} /> {contact.instagram}
            </a>
          </div>
        </Reveal>
      </div>

      <footer className="mx-auto mt-28 flex max-w-[1400px] items-end justify-between gap-6 px-4 pb-8 md:px-8">
        <span className="display select-none text-[clamp(4rem,18vw,15rem)] leading-[0.8] text-ink-3" aria-hidden>
          {hero.name}
        </span>
        <div className="label shrink-0 pb-2 text-right text-mute">
          <a href="#top" className="hover:text-paper">
            Volver arriba
          </a>
          <p className="mt-1">© {new Date().getFullYear()} {hero.name}</p>
        </div>
      </footer>
    </section>
  )
}
