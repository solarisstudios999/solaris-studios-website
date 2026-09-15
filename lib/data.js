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

export const marqueeWords = [
  "Brand Identity",
  "Web Experience",
  "Content Systems",
  "Brand Strategy",
  "SEO & Discovery",
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
        label: "Storefront",
        path: "shopaarna.in",
        src: "/assets/work/aarna/storefront.jpg",
        alt: "The Aarna storefront homepage: a full-width hero of a model in a printed cotton dress, with the wardrobe navigation above it.",
      },
      {
        label: "Collection",
        path: "shopaarna.in/wardrobe",
        src: "/assets/work/aarna/collection.jpg",
        alt: "The Aarna collection grid: four cotton dresses and tops shown with their names, fabric notes and prices.",
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
