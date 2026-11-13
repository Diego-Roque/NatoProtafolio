import Noise from './components/bits/Noise'
import { Contact } from './components/Contact'
import { Hero } from './components/Hero'
import { Jawelin } from './components/Jawelin'
import { LightboxProvider } from './components/Lightbox'
import { Live } from './components/Live'
import { Lumberjacks } from './components/Lumberjacks'
import { Marquee } from './components/Marquee'
import { MorePosters } from './components/MorePosters'
import { Nav } from './components/Nav'
import { Plastilina } from './components/Plastilina'

/*
  Capas (z-index):
  10-30  piezas y stickers del hero
  40     nav flotante
  50     lightbox
  60     grano de fotocopia (fijo, sin eventos)
*/
export default function App() {
  return (
    <LightboxProvider>
      <Nav />
      <main>
        <Hero />
        <Plastilina />
        <Lumberjacks />
        <Jawelin />
        <Marquee />
        <MorePosters />
        <Live />
        <Contact />
      </main>
      <Noise fixed opacity={0.07} fps={12} blendMode="overlay" contrast={0.7} zIndex={60} />
    </LightboxProvider>
  )
}
