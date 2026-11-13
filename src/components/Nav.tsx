import { motion, useReducedMotion } from 'motion/react'
import { contactSection, hero, nav } from '../content'

export function Nav() {
  const reduce = useReducedMotion()
  return (
    <motion.header
      className="fixed inset-x-0 top-3 z-40 flex justify-center px-3 md:top-5"
      initial={reduce ? false : { y: -24, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ type: 'spring', bounce: 0, duration: 0.6, delay: 0.2 }}
    >
      <nav
        aria-label="Principal"
        className="glass flex h-12 w-full max-w-[860px] items-center justify-between gap-4 rounded-full pl-5 pr-1.5"
      >
        <a href="#top" className="display text-lg tracking-[-0.04em] text-paper" aria-label="NATO, inicio">
          {hero.name}
        </a>
        <ul className="hidden items-center gap-6 md:flex">
          {nav.slice(0, -1).map((item) => (
            <li key={item.href}>
              <a
                href={item.href}
                className="whitespace-nowrap text-sm font-medium text-paper-dim transition-colors hover:text-paper"
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>
        <a
          href="#contacto"
          className="whitespace-nowrap rounded-full bg-violet px-4 py-2 text-sm font-semibold text-ink transition-transform duration-100 active:scale-[0.97]"
        >
          {contactSection.cta}
        </a>
      </nav>
    </motion.header>
  )
}
