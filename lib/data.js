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
  linkedin: "Solaris Studios",
  linkedinUrl: "https://www.linkedin.com/company/solaris-studios-bangalore/",
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
      alt: "A class photograph from 2006. Children in blue and red school tracksuits stand in rows outside the school building. Two boys in the back row, Samarth and Dhanush, are circled and in focus; every other child's face is blurred.",
    },
    {
      key: "now",
      src: "/assets/about/now.webp",
      alt: "Samarth and Dhanush photographed together in Bangalore in 2026, twenty years after the class photograph.",
    },
  ],
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
/* The free teardown. It is a promise the moment it is a button, so what is
   written here is exactly what gets delivered: a short Loom on two or three
   specific leaks, same day, no charge. It lands in WhatsApp with the message
   half-written, because the fewer words a founder has to compose the more of
   them arrive. */
export const storeTeardown = {
  label: "Free 2-minute store teardown",
  promise:
    "Send us your store. You get a short video back the same day on two or three specific things leaking sales. No charge, no call needed.",
  message: "Hi Solaris - I would like the free 2-minute teardown of my store: ",
};

/* The price ladder.

   One ratio, applied everywhere: 50 rupees to the dollar. The dollar column is
   derived from the rupee floor rather than typed beside it, and that is the
   whole point of this constant. The first draft of this ladder had each tier's
   pair set by hand, and the multiplier had drifted from 1.8x at the audit to
   3.2x at the retainer - nothing justified that curve, it had simply
   accumulated one tier at a time. Deriving the second column makes that class
   of drift impossible to reintroduce: move a rupee floor and the dollar floor
   moves with it.

   It is deliberately not the spot exchange rate, which sits nearer 85. The gap
   is a two-market decision, not an arithmetic one, and it is the same gap at
   every tier so it can be explained in one sentence if a client ever asks.

   Every figure here is a floor, shown as "From". The page says so. A ceiling
   belongs in a quote, where the scope that justifies it is also written down. */
export const USD_PER_RUPEE = 1 / 50;

/* Indian digit grouping - 1,00,000 rather than 100,000. en-IN gets this right
   and hand-rolled grouping does not. */
const inr = new Intl.NumberFormat("en-IN", {
  style: "currency",
  currency: "INR",
  maximumFractionDigits: 0,
});
const usd = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  maximumFractionDigits: 0,
});

export const price = (rupees) => ({
  inr: inr.format(rupees),
  usd: usd.format(Math.round(rupees * USD_PER_RUPEE)),
});

/* FACT NEEDED, per tier, before this page ships:
     - summary:  one line on what the tier is for
     - includes: what the buyer actually gets
     - timeline: how long it takes
   These are deliberately empty rather than drafted. Writing plausible scope for
   work the studio has not agreed to deliver is how a price page becomes a
   promise nobody remembers making. The page renders without them; it just does
   not say anything it cannot back. */
export const packages = [
  {
    slug: "teardown",
    name: "Store teardown",
    rupees: 0,
    summary: storeTeardown.promise,
    includes: [],
    timeline: "Same day",
  },
  {
    slug: "audit",
    name: "Paid audit",
    rupees: 10000,
    summary: null,
    includes: [],
    timeline: null,
  },
  {
    slug: "sprint",
    name: "Speed & CRO sprint",
    rupees: 40000,
    summary: null,
    includes: [],
    timeline: null,
  },
  {
    slug: "build-shopify",
    name: "Store build - Shopify",
    rupees: 100000,
    summary: null,
    includes: [],
    timeline: null,
  },
  {
    slug: "build-headless",
    name: "Store build - headless",
    rupees: 250000,
    summary: null,
    includes: [],
    timeline: null,
  },
  {
    slug: "retainer",
    name: "Growth retainer",
    rupees: 30000,
    per: "month",
    summary: null,
    includes: [],
    timeline: null,
  },
];

/* Clients, for the strip under the hero. Adding one is adding an entry here
   and dropping the file in /public/assets/clients - the component does not
   change, and neither does this. The file's dimensions are read off disk at
   build time, so replacing a logo is replacing the file and nothing else.

   Two things to ask a client for when collecting artwork:

   1. Transparent background. Every logo is rendered as a flat white
      silhouette, and a logo delivered on a white rectangle becomes a white
      rectangle.
   2. The horizontal lockup, not the stacked one. These sit in a row about
      40px tall; a stacked mark has to shrink until its wordmark is unreadable
      to fit that, where a horizontal one stays legible.

   Colour in the file does not matter - it is discarded. */
export const clients = [
  {
    slug: "aarna",
    name: "Aarna",
    work: "Custom ecommerce storefront",
    where: "Slow-made fashion, D2C",
    logo: "/assets/clients/aarna.png",
    url: "https://shopaarna.in",
  },
  {
    slug: "ss-motors",
    name: "SS Motors",
    work: "Content creation",
    where: "Hoskote",
    logo: "/assets/clients/ss-motors.png",
    /* Their mark has no wordmark in it, unlike the other two, so the name is
       set in type beside it. Ours, not theirs - see the note in the component.
       No `url`: no site confirmed. */
    showName: true,
  },
  {
    slug: "k-plaast",
    name: "K-Plaast",
    work: "Product catalogue design",
    where: "Nayandahalli",
    logo: "/assets/clients/k-plaast.png",
    /* The mark carries its own wordmark inside the ring, so no `showName`.
       No `url`: no site confirmed. */
  },
  {
    slug: "earthiva",
    name: "Earthiva",
    work: "Website, product catalogue, and social media management",
    where: "CSEB brick manufacturer",
    logo: "/assets/clients/earthiva.png",
    /* No `url`: earthiva.com is a parked domain that bounces to a lander, so
       linking it would send people from our portfolio to an ad page. The
       component renders an unlinked mark when this is missing. Add it back the
       day the site is live. */
  },
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
    deliverables: [
      "Identity system",
      "Page designs",
      "Copy direction",
      "Copy and content drafts with Claude, edited by people",
      "Component library",
    ],
    duration: "Week 2-4",
  },
  {
    title: "Build",
    body: "We bring the website or campaign system to life with clean implementation, useful motion, and careful testing.",
    deliverables: [
      "Next.js build",
      "AI-assisted build with Claude Code",
      "Motion + interaction",
      "Content load",
      "Cross-device QA",
    ],
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
    /* Measured with Lighthouse against the live store on the date below -
       mobile preset is Lighthouse's default, which throttles to 4G on a slow
       CPU, so it is the pessimistic number rather than the flattering one.
       The tool and the date are published with the figures on purpose: a
       founder can re-run this in a minute and get the same answer, which is
       the only reason a number like this is worth anything. Re-measure before
       editing, and move the date when you do. */
    scorecard: {
      /* Orders placed on the store between launch on 29 July 2026 and 15
         October 2026 - 78 days. The client's own figure, and it reconciles
         both ways she gave it: 147 prepaid plus 53 COD, and 20 + 65 + 71 + 44
         by month. It counts orders placed, so it includes the 22 later
         refunded in full or part, the 6 COD that came back undelivered and
         the 3 cancelled; it excludes 2 failed payments and 1 pre-launch test
         order, which are not orders.

         Said as a fact about the store, never as a result Solaris produced.
         A storefront helps orders land; it does not create demand, and
         claiming the credit would be a lie a founder can smell.

         Gross revenue is deliberately not published. It is the client's
         commercial information, not ours to put on our own website. */
      lead: {
        value: "200",
        label: "orders in the store's first 11 weeks",
        note: "29 July to 15 October 2026, prepaid and COD",
      },
      measured: "Lighthouse, 15 October 2026",
      stats: [
        { value: "99", label: "Lighthouse performance", note: "on mobile. 100 on desktop" },
        { value: "2.0s", label: "Largest paint", note: "mobile, throttled 4G" },
        { value: "0", label: "Layout shift", note: "nothing moves as it loads" },
        { value: "100", label: "SEO score", note: "accessibility 96" },
      ],
    },
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
