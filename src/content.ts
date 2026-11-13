/*
  Todos los textos del portafolio viven aquí.
  Cambia contacto, descripciones o títulos sin tocar los componentes.
*/

export type Work = {
  id: string
  /** nombre del archivo en public/img (sin extensión) */
  file: string
  w: number
  h: number
  title: string
  detail: string
  alt: string
}

export const img = (file: string, small = false) => `/img/${file}${small ? '-sm' : ''}.webp`

export const contact = {
  // TODO: reemplaza con tus datos reales
  email: 'hola@ejemplo.com',
  instagram: '@nato.placeholder',
  instagramUrl: 'https://instagram.com/',
}

export const nav = [
  { label: 'Plastilina', href: '#plastilina' },
  { label: 'Lumberjacks', href: '#lumberjacks' },
  { label: 'Jawelin', href: '#jawelin' },
  { label: 'Carteles', href: '#carteles' },
  { label: 'Contacto', href: '#contacto' },
]

export const hero = {
  eyebrow: 'Diseño gráfico para la escena',
  name: 'NATO',
  sub: 'Pósters, portadas y gráfica para bandas y tocadas independientes. Hecho a mano, impreso en la pared.',
  cta: 'Ver trabajo',
}

/* ---------- Plastilina / 90 Segundos ---------- */

export const plastilina = {
  title: 'Plastilina',
  band: '90 Segundos',
  body: 'La identidad completa del disco: portada, singles, póster con tracklist y una serie de carteles para cada presentación. Manga en blanco y negro, un violeta que no se negocia y mucha caricatura de los 2000.',
  poster: {
    id: 'pl-tracklist',
    file: '90segundos-plastilina-poster-tracklist',
    w: 2730,
    h: 3640,
    title: 'Póster con tracklist',
    detail: '90 Segundos, Plastilina',
    alt: 'Póster de 90 Segundos: los tres integrantes vistos con lente ojo de pez y el tracklist de Plastilina abajo',
  } satisfies Work,
  covers: [
    {
      id: 'pl-cover',
      file: '90segundos-portada-plastilina',
      w: 2192,
      h: 2192,
      title: 'Portada del disco',
      detail: 'Plastilina',
      alt: 'Portada de Plastilina: chica manga en blanco y negro con el título en letras de plastilina violeta',
    },
    {
      id: 'pl-eye',
      file: '90segundos-portada-ojo-morado',
      w: 1170,
      h: 1174,
      title: 'Single',
      detail: 'Ojo en violeta',
      alt: 'Portada de single: acercamiento a un ojo manga con una estrella en la pupila, en violeta',
    },
    {
      id: 'pl-eyes',
      file: '90segundos-portada-single-ojos-morados',
      w: 1170,
      h: 1160,
      title: 'Single',
      detail: 'Mirada en violeta',
      alt: 'Portada de single: rostro manga enojado con ojos estrellados, en violeta y blanco',
    },
    {
      id: 'pl-bn',
      file: '90segundos-portada-single-manga-bn',
      w: 1170,
      h: 1170,
      title: 'Single',
      detail: 'Manga en blanco y negro',
      alt: 'Portada de single: chica manga de cabello largo en blanco y negro con el logo de 90 Segundos',
    },
    {
      id: 'pl-belly',
      file: '90segundos-portada-single-ombligo',
      w: 1170,
      h: 1161,
      title: 'Single',
      detail: 'Piercing y estoperoles',
      alt: 'Portada de single: ilustración manga de un torso con piercing de estrella y cinturón con estoperoles',
    },
  ] satisfies Work[],
  dates: [
    {
      id: 'pl-mayo9',
      file: '90segundos-plastilina-poster-mayo9-pizza',
      w: 1383,
      h: 1961,
      title: 'Presentación, 9 de mayo',
      detail: 'Tony el Gordo, Coyoacán',
      alt: 'Cartel saturado de Plastilina: niño comiendo pizza con un tamagotchi y letras de colores',
    },
    {
      id: 'pl-junio26',
      file: '90segundos-plastilina-poster-junio26-brackets',
      w: 1398,
      h: 1977,
      title: 'Presentación, 26 de junio',
      detail: 'Las Hamacas, Texcoco',
      alt: 'Cartel de Plastilina: boca con brackets mordiendo televisores con los nombres de las bandas',
    },
    {
      id: 'pl-julio31',
      file: '90segundos-plastilina-poster-julio31-cereal',
      w: 2730,
      h: 3770,
      title: 'Presentación, 31 de julio',
      detail: 'Ciudad Neza',
      alt: 'Cartel de Plastilina: niño gritando entre cereal de colores y un pug',
    },
  ] satisfies Work[],
}

/* ---------- Lumberjacks ---------- */

export const lumberjacks = {
  title: '5 años, 6 bateristas y 1000 caguamas',
  band: 'Lumberjacks',
  body: 'Un solo concepto para toda la gira de aniversario. Cambian la sede, la fecha y la paleta. La tipografía chorreada y la banda al centro se quedan.',
  hint: 'Arrastra',
  posters: [
    {
      id: 'lj-sep19',
      file: 'lumberjacks-5anos-sep19-rojo-blanco',
      w: 1393,
      h: 1982,
      title: '19 de septiembre',
      detail: 'Alexander Multiforo, Texcoco',
      alt: 'Cartel rojo de Lumberjacks con la banda en blanco y negro sobre muro de ladrillo',
    },
    {
      id: 'lj-sep25',
      file: 'lumberjacks-5anos-sep25-azul',
      w: 2203,
      h: 3125,
      title: '25 de septiembre',
      detail: 'Foro Cultural 304, Toluca',
      alt: 'Cartel azul de Lumberjacks con la banda vista desde arriba',
    },
    {
      id: 'lj-oct23',
      file: 'lumberjacks-5anos-oct23-rojo',
      w: 1413,
      h: 1987,
      title: '23 de octubre',
      detail: 'Foro Echo, especial de Halloween',
      alt: 'Cartel rojo de Halloween de Lumberjacks con murciélagos, arañas y la banda de corbata',
    },
    {
      id: 'lj-nov7',
      file: 'lumberjacks-5anos-nov7-pastel',
      w: 1393,
      h: 1940,
      title: '7 de noviembre',
      detail: 'Rockera Bar, Chimalhuacán',
      alt: 'Cartel de Lumberjacks con un pastel de cumpleaños y las caras de la banda en el betún',
    },
    {
      id: 'lj-nov21',
      file: 'lumberjacks-5anos-nov21-amarillo',
      w: 1398,
      h: 1950,
      title: '21 de noviembre',
      detail: 'Unidad Infonavit, Aragón',
      alt: 'Cartel amarillo de Lumberjacks con textura de muro grafiteado y la banda con capuchas',
    },
  ] satisfies Work[],
}

/* ---------- Jawelin ---------- */

export const jawelin = {
  eyebrow: 'Multiforo 246, 7 de noviembre',
  title: 'Jawelin',
  body: 'Fiesta de disfraces de seis bandas. Un póster principal en rojo sangre, el after, y un anuncio por banda con trama de periódico para soltar en redes día por día.',
  main: {
    id: 'jw-main',
    file: 'jawelin-poster-principal',
    w: 1398,
    h: 1961,
    title: 'Póster principal',
    detail: 'Jawelin, fiesta de disfraces',
    alt: 'Póster de Jawelin: cara caricaturizada gritando frente a un micrófono con dientes, sobre rojo chorreado',
  } satisfies Work,
  after: {
    id: 'jw-after',
    file: 'jawelin-poster-after',
    w: 1393,
    h: 1961,
    title: 'After',
    detail: 'Rhadian, DJ Thinner, Rhamses',
    alt: 'Póster del after de Jawelin: carita sonriente malvada con huesos cruzados sobre rojo',
  } satisfies Work,
  bands: [
    {
      id: 'jw-sadfields',
      file: 'jawelin-anuncio-sadfields',
      w: 3221,
      h: 2480,
      title: 'Sadfields',
      detail: 'Shoegaze',
      alt: 'Anuncio halftone de Sadfields: tres siluetas a contraluz',
    },
    {
      id: 'jw-demencia',
      file: 'jawelin-anuncio-demencia-infantil',
      w: 3221,
      h: 2480,
      title: 'Demencia Infantil',
      detail: 'Art punk',
      alt: 'Anuncio halftone de Demencia Infantil: seis integrantes amontonados sonriendo',
    },
    {
      id: 'jw-uklao',
      file: 'jawelin-anuncio-uklao',
      w: 3221,
      h: 2480,
      title: 'Uklao',
      detail: 'Emo',
      alt: 'Anuncio halftone de Uklao: cuatro integrantes, uno con lentes blancos',
    },
    {
      id: 'jw-pinguino',
      file: 'jawelin-anuncio-el-dia-que-el-pinguino-volo',
      w: 3221,
      h: 2480,
      title: 'El día que el pingüino voló',
      detail: 'Emo',
      alt: 'Anuncio halftone de El día que el pingüino voló tocando en vivo',
    },
    {
      id: 'jw-off',
      file: 'jawelin-anuncio-off-president',
      w: 3221,
      h: 2480,
      title: 'Off President',
      detail: 'Punk',
      alt: 'Anuncio halftone de Off President: tres integrantes vistos desde abajo',
    },
  ] satisfies Work[],
}

/* ---------- Marquee ---------- */

export const marquee = [
  '90 Segundos',
  'Lumberjacks',
  'Boisad',
  'Demencia Infantil',
  'Sadfields',
  'Uklao',
  'Off President',
  'Mal y Tarde',
  'Feather Landscape',
  'Ephemeral Teens',
  'Burdeles',
  'Pareidolia',
]

/* ---------- Más carteles ---------- */

export const more = {
  title: 'Más carteles',
  body: 'Festivales, cumpleaños convertidos en tocada y eventos de recaudación.',
  items: [
    {
      id: 'mc-frankofest',
      file: 'poster-frankofest',
      w: 2459,
      h: 3447,
      title: 'Frankofest',
      detail: 'Cuchilla de Padierna, 1 de agosto',
      alt: 'Cartel de Frankofest: collage psicodélico con una televisión vieja, una rana y letras a mano',
    },
    {
      id: 'mc-tatisponk',
      file: 'poster-tatisponk-fest-horizontal',
      w: 1536,
      h: 1044,
      title: 'Tatisponk Fest',
      detail: 'Cumpleaños, 1 de mayo',
      alt: 'Cartel en blanco y negro de Tatisponk Fest: un pug con cresta punk y collar de picos',
    },
    {
      id: 'mc-navidarks',
      file: 'poster-navidarks',
      w: 1378,
      h: 1930,
      title: 'Navidarks',
      detail: 'Foro Cultural 304, evento de recaudación',
      alt: 'Cartel de Navidarks: árbol de navidad con adornos de cabezas de muñeco rotas',
    },
    {
      id: 'mc-division',
      file: 'poster-division-del-norte',
      w: 1388,
      h: 1930,
      title: 'La División del Norte',
      detail: 'Café Madrid, 21 de noviembre',
      alt: 'Cartel de La División del Norte: calavera revolucionaria con sombrero y tipografía de western',
    },
    {
      id: 'mc-pcp',
      file: 'pcp-portada-soya',
      w: 1161,
      h: 1167,
      title: 'Soya',
      detail: 'Portada para PCP',
      alt: 'Portada de Soya de PCP: osito de gomita rojo atravesado con alfileres entre gomitas de colores',
    },
  ] satisfies Work[],
}

/* ---------- En vivo ---------- */

export const live = {
  title: 'Desde la tocada',
  body: 'La escena para la que diseño, vista desde el frente del escenario.',
  photos: [
    { file: 'vivo-cabello-verde-rastros-luz', w: 1920, h: 1371, alt: 'Guitarrista de cabello verde cantando con rastros de luz' },
    { file: 'vivo-retrato-traje-morado', w: 1080, h: 1512, alt: 'Músico con disfraz morado bebiendo de una botella en el escenario' },
    { file: 'vivo-guitarrista-desde-abajo', w: 1920, h: 1371, alt: 'Guitarrista con gorro visto desde abajo, guitarra llena de stickers' },
    { file: 'vivo-gorro-blanco-horizontal', w: 1512, h: 1080, alt: 'Guitarrista con gorro blanco y playera azul frente al micrófono' },
    { file: 'vivo-headbang-calido', w: 1920, h: 1372, alt: 'Cantante con el cabello en movimiento bajo luz cálida' },
    { file: 'vivo-escenario-ladrillo', w: 1920, h: 1079, alt: 'Banda tocando frente a un muro de ladrillo con proyecciones' },
  ],
}

/* ---------- Contacto ---------- */

export const contactSection = {
  title: '¿Tienes una tocada?',
  body: 'Carteles, portadas, identidad para un disco o la gira completa. Cuéntame la fecha y el cartel.',
  cta: 'Escríbeme',
}
