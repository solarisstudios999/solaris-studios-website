export const studio = {
  name: "Solaris Studios",
  tagline: "Creative Branding & Digital Agency",
  email: "hello@solarisstudios.co.in",
  instagram: "@solaris_studios_",
  instagramUrl: "https://instagram.com/solaris_studios_",
  phone: "+91 9187416656",
  phoneHref: "tel:+919187416656",
  whatsappNumber: "919187416656",
  whatsappHref: "https://wa.me/919187416656",
  location: "Bangalore, India",
  yearFounded: 2026,
};

// Draft copy - the two facts are confirmed (met 2006, Solaris is the first
// thing built together). The wording is mine and is meant to be edited.
export const origin = {
  metYear: 2006,
  nowYear: 2026,
  lead:
    "years since class 1. Solaris is the first thing we have built together.",
  note:
    "A two-person studio lives or dies on whether the two people trust each other. We settled that a long time before we started one.",
  thenCaption: "Class 1, 2006. Circled, the two of us.",
  nowCaption: "Bangalore, 2026.",
  // Percentages of the class photo, so the ring tracks the image at any size.
  ring: { cx: 49, cy: 21, rx: 16, ry: 19 },
  photos: [
    {
      key: "then",
      src: "/assets/about/then.webp",
      alt: "A class photograph from 2006. Fifteen children in blue and red school tracksuits stand in rows outside the school building. Two boys in the back row, Samarth and Dhanush, are circled.",
    },
    {
      key: "now",
      src: "/assets/about/now.webp",
      alt: "Samarth and Dhanush photographed together in Bangalore in 2026, twenty years after the class photograph.",
    },
  ],
};

// THE TEARDOWN - one layer built for review.
// Both frames are real renders of the live store. The stripped one was made by
// switching that layer off on the real site and re-shooting, not by inventing a
// "before". Framed as a teardown of the finished thing, never as history.
export const teardown = {
  caption: "Both frames are the live store. The lower one is the same page with its identity switched off.",
  layers: {
    on: {
      src: "/assets/work/aarna/teardown/l0-launch.webp",
      label: "As it ships",
      alt: "The Aarna storefront as it ships: its own serif typeface, warm burgundy palette and logo mark.",
    },
    off: {
      src: "/assets/work/aarna/teardown/l1-no-identity.webp",
      label: "Identity removed",
      strips: "Brand Identity - typeface, colour, the mark",
      alt: "The same Aarna storefront with the identity switched off: system sans-serif, neutral greys, the logo replaced by a plain box. Layout, photography and copy are unchanged.",
    },
  },
};

export const team = [
  {
    name: "Samarth Vaibhav",
    role: "Web Development Architect",
    bio: "Leads the studio's technical practice - architecture, performance, and the engineering behind every brand we ship.",
    phone: "+91 6366 26 2628",
    phoneHref: "tel:+916366262628",
    initial: "SV",
  },
  {
    name: "Dhanush",
    role: "Creative Systems Developer",
    bio: "Builds the systems that hold a brand together - components, patterns, and the connective tissue between brand and product.",
    phone: "+91 63804 45641",
    phoneHref: "tel:+916380445641",
    initial: "D",
  },
];

export const services = [
  {
    slug: "brand-identity",
    title: "Brand Identity",
    body: "A visual direction that holds up across a launch, a press hit, and a quiet Tuesday morning.",
    detail: "Logo systems, art direction, guidelines, launch assets.",
    deliverables: ["Logo systems", "Art direction", "Guidelines", "Launch kit"],
  },
  {
    slug: "web-experience",
    title: "Web Experience",
    body: "Sharp, fast websites with clear structure and motion that earns its place.",
    detail: "Next.js builds, interaction systems, motion design, technical QA.",
    deliverables: ["Next.js builds", "Interaction systems", "Motion design", "Technical QA"],
  },
  {
    slug: "content-creation",
    title: "Content Creation",
    body: "A practical content system so the brand stays active without burning out your team.",
    detail: "Campaign concepts, social systems, copy direction, production planning.",
    deliverables: ["Campaigns", "Social systems", "Copy direction", "Production planning"],
  },
  {
    slug: "brand-strategy",
    title: "Brand Strategy",
    body: "Positioning, voice, and naming, so every decision after has a reason behind it.",
    detail: "Positioning, voice, naming, messaging.",
    deliverables: ["Positioning", "Voice", "Naming", "Messaging"],
  },
  {
    slug: "seo",
    title: "SEO & Discovery",
    body: "Technical SEO and content architecture for the kind of growth that does not depend on ads.",
    detail: "Technical SEO, content architecture, schema, search strategy.",
    deliverables: ["Technical SEO", "Content architecture", "Schema", "Search strategy"],
  },
];

// Real, attributable client quotes only. The homepage section renders itself
// only when this array has entries, so adding one here brings the section back
// with no other change needed:
//   { quote: "...", author: "Name", role: "Title, Company" }
export const testimonials = [];

// Four facts, set once and still, in place of the old scrolling ticker.
export const proofPoints = [
  { value: "1", label: "live store shipped" },
  { value: "20", label: "years, the two of us" },
  { value: "2", label: "people, on purpose" },
  { value: "2026", label: "founded in Bangalore" },
];

export const processStages = [
  {
    title: "Discover",
    body: "We get close to the business, the audience, the offer, and what has been difficult to explain so far.",
    deliverables: ["Stakeholder interviews", "Audience review", "Competitive scan", "Brief alignment"],
    duration: "Week 1",
  },
  {
    title: "Position",
    body: "We turn what we learn into a clear direction: who you are speaking to, what you stand for, and what needs to be said first.",
    deliverables: ["Positioning statement", "Messaging hierarchy", "Voice notes", "Naming (if needed)"],
    duration: "Week 1-2",
  },
  {
    title: "Design",
    body: "We build the visual and verbal system: identity, layouts, language, content direction, and the details that make it feel like you.",
    deliverables: ["Identity system", "Page designs", "Copy direction", "Component library"],
    duration: "Week 2-4",
  },
  {
    title: "Build",
    body: "We bring the website or campaign system to life with clean implementation, useful motion, and careful testing.",
    deliverables: ["Next.js build", "Motion + interaction", "Content load", "Cross-device QA"],
    duration: "Week 4-6",
  },
  {
    title: "Launch",
    body: "We help prepare the pieces your team needs to go live with confidence, from assets to messaging to final QA.",
    deliverables: ["Launch checklist", "Analytics + SEO", "Launch comms", "Handoff docs"],
    duration: "Week 6",
  },
  {
    title: "Improve",
    body: "After launch, we look at what is working, what people respond to, and what should be sharpened next.",
    deliverables: ["Performance review", "Iteration sprint", "Content updates", "Roadmap"],
    duration: "Ongoing",
  },
];

// Every launch is presented the same way: one full-width case panel with a
// browser frame you can step through. Adding the next project means adding an
// entry here plus its screenshots - no new component, no new CSS.
//
// shots[] drives the switcher. `path` is shown in the frame's URL bar, so it
// should be the real route on the client's live site.
export const projects = [
  {
    slug: "aarna",
    title: "Aarna",
    tagline: "Slow-made fashion, built to sell.",
    domain: "shopaarna.in",
    url: "https://shopaarna.in",
    status: "Live",
    meta: [
      { term: "Sector", detail: "Fashion, D2C" },
      { term: "Scope", detail: "Design, build, launch" },
      { term: "Stack", detail: "Next.js" },
    ],
    lines: [
      {
        term: "Problem",
        detail:
          "A new slow-fashion label by Arpitha Abhishek needed a store that felt like the brand - not a Shopify template.",
      },
      {
        term: "Build",
        detail:
          "Complete custom ecommerce on Next.js: storefront, product pages, cart, accounts, and search - with the brand's soft, editorial voice carried through every screen.",
      },
      {
        term: "Outcome",
        detail:
          "A live store at shopaarna.in that looks handmade, loads fast, and is entirely theirs.",
      },
    ],
    shots: [
      {
        label: "Collection",
        path: "shopaarna.in/wardrobe",
        src: "/assets/work/aarna/collection.jpg",
        alt: "The Aarna collection grid: four cotton dresses and tops shown with their names, fabric notes and prices.",
      },
      {
        label: "Storefront",
        path: "shopaarna.in",
        src: "/assets/work/aarna/storefront.jpg",
        alt: "The Aarna storefront homepage: a full-width hero of a model in a printed cotton dress, with the wardrobe navigation above it.",
      },
      {
        label: "Product",
        path: "shopaarna.in/product/breezy-burgandy-dress",
        src: "/assets/work/aarna/product.jpg",
        alt: "An Aarna product page showing a single dress with its detail photography, description and add-to-cart.",
      },
    ],

  },
];
