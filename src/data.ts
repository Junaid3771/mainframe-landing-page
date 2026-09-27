export type Project = {
  slug: string
  name: string
  tagline: string
  category: string
  year: string
  disciplines: string[]
  headline: string
  description: string
  challenge: string
  approach: string
  colors: string[]
  deliverables: string[]
}
export const projects: Project[] = [
  {
    slug: 'forma',
    name: 'Forma',
    tagline: 'A new shape of movement.',
    category: 'BRAND STRATEGY / IDENTITY',
    year: '2026',
    disciplines: ['Branding', 'Motion'],
    headline: 'Movement, with a different mindset.',
    description:
      'An imagined movement studio for people who want to feel good, not fit a mould. Forma explores a more human approach to wellbeing through an identity that is grounded, expressive, and always in motion.',
    challenge:
      'Move beyond the visual clichés of performance culture. Create a welcoming world that speaks to everyday progress rather than perfection.',
    approach:
      'A flexible circular form becomes the heart of the identity. Expressive crimson meets warm whites, generous typography, and language that invites everyone in.',
    colors: ['#c21d48', '#430817', '#fff1f5', '#fa7291'],
    deliverables: [
      'Brand positioning',
      'Visual identity',
      'Motion direction',
      'Brand guidelines',
    ],
  },
  {
    slug: 'offscript',
    name: 'Offscript',
    tagline: 'Culture without a template.',
    category: 'ART DIRECTION / DIGITAL',
    year: '2026',
    disciplines: ['Branding', 'Digital'],
    headline: 'For the ones who don’t follow the script.',
    description:
      'A self-initiated identity and digital direction for an imagined independent culture platform. Offscript brings emerging voices together with a visual language that is bold, immediate, and unapologetically expressive.',
    challenge:
      'Build a platform with a distinct point of view while leaving space for many different creative voices.',
    approach:
      'Oversized typography and a vivid red palette frame an editorial system that feels like a living cultural noticeboard. Every element can remix while remaining recognisable.',
    colors: ['#e92a48', '#21030a', '#fff1f5', '#bd0c30'],
    deliverables: [
      'Creative direction',
      'Identity system',
      'Editorial design',
      'Website concept',
    ],
  },
  {
    slug: 'noma',
    name: 'Noma',
    tagline: 'Everyday, reconsidered.',
    category: 'IDENTITY / PACKAGING',
    year: '2026',
    disciplines: ['Branding'],
    headline: 'A little less ordinary. A little more considered.',
    description:
      'A conceptual everyday-care brand exploring the beauty of simple rituals. Noma pairs tactile forms and a quiet identity with a warm, approachable voice.',
    challenge:
      'Find a distinctive expression for everyday essentials without leaning on clinical minimalism or unsupported sustainability claims.',
    approach:
      'Warm burgundy tones, confident lowercase typography, and soft silhouettes create an inviting visual world. The packaging concept is designed to feel at home, rather than on display.',
    colors: ['#750d29', '#33202a', '#f8e9e9', '#c64362'],
    deliverables: [
      'Naming concept',
      'Visual identity',
      'Packaging concepts',
      'Art direction',
    ],
  },
  {
    slug: 'signal',
    name: 'Signal',
    tagline: 'Less noise. More connection.',
    category: 'DIGITAL / MOTION',
    year: '2026',
    disciplines: ['Digital', 'Motion'],
    headline: 'Find the connection that matters.',
    description:
      'An exploration of what a more focused digital community could look and feel like. Signal imagines an interface where ideas have space to breathe and meaningful connections come first.',
    challenge:
      'Express a complex network through a simple, memorable identity, and make the technology feel approachable.',
    approach:
      'An orbital graphic language visualises connection. A restrained grid, luminous red, and purposeful motion create a coherent direction across brand and product surfaces.',
    colors: ['#dc244f', '#180e15', '#fff0f4', '#720822'],
    deliverables: [
      'Product direction',
      'Digital identity',
      'Interface concept',
      'Motion studies',
    ],
  },
]
export const products = [
  {
    id: 'print',
    name: 'Stay Open — Edition 001',
    category: 'Prints',
    description:
      'A typographic studio print concept. A reminder to keep a little room for the unexpected.',
  },
  {
    id: 'tote',
    name: 'The Good Ideas Tote',
    category: 'Objects',
    description:
      'A carry-everywhere canvas tote concept, with plenty of room for your next big idea.',
  },
  {
    id: 'notebook',
    name: 'Another Direction Notebook',
    category: 'Objects',
    description:
      'A pocket for unfinished thoughts. An unruled notebook concept for sketches, lists, and what-ifs.',
  },
]
export const roles = [
  {
    slug: 'brand-designer',
    title: 'Brand Designer',
    type: 'Independent collaborator',
    description:
      'For designers who can take a clear idea and build a whole world around it.',
    skills: [
      'A portfolio showing thoughtful identity systems and strong typography.',
      'The ability to explain the thinking behind your decisions.',
      'An interest in exploring ideas across print, digital, and motion.',
      'A collaborative approach and care for the final details.',
    ],
  },
  {
    slug: 'creative-developer',
    title: 'Creative Developer',
    type: 'Independent collaborator',
    description:
      'For developers who see the browser as a creative medium and care about how things feel.',
    skills: [
      'Experience building accessible, responsive web experiences.',
      'Confidence with modern JavaScript, React, and CSS.',
      'A considered approach to animation and performance.',
      'A portfolio of working projects with attention to interaction details.',
    ],
  },
  {
    slug: 'motion-designer',
    title: 'Motion Designer',
    type: 'Independent collaborator',
    description:
      'For people who know that the way something moves is part of who it is.',
    skills: [
      'A reel showing a strong sense of rhythm and visual storytelling.',
      'Experience translating brand identities into motion systems.',
      'A willingness to experiment across techniques and tools.',
      'Clear communication and thoughtful delivery of production assets.',
    ],
  },
]
