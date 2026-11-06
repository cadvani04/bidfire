// Product name used across the site. Change it here (the logo files in /public are separate).
export const PRODUCT_NAME = "FireBids";

export type Tone = "green" | "orange";

export const nav = [
  { href: "#product", label: "Product" },
  { href: "#how", label: "How it works" },
  { href: "#integrations", label: "Integrations" },
  { href: "#demo", label: "Pricing" },
];

export const customers = [
  { name: "Total Fire Protection", src: "/clients/total-fire-protection.png", height: 56 },
  { name: "Victory Fire Protection", src: "/clients/victory-fire-protection.png", height: 46 },
  { name: "Nielsen Studios", src: "/clients/nielsen-studios.png", height: 36 },
];

export const tools = [
  { name: "HydraCAD", src: "/logos/hydracad.svg", kind: "Design software", tone: "green" as Tone, height: 40 },
  { name: "AutoSPRINK", src: "/logos/autosprink.svg", kind: "Design software", tone: "green" as Tone, height: 20 },
  { name: "Etna", src: "/logos/etna.png", kind: "Live API", tone: "orange" as Tone, height: 24 },
  { name: "Galloup", src: "/logos/galloup.png", kind: "Live API", tone: "orange" as Tone, height: 38 },
  { name: "Viking", src: "/logos/viking.png", kind: "Live API", tone: "orange" as Tone, height: 30 },
  { name: "Core & Main", src: "/logos/core-and-main.svg", kind: "Live API", tone: "orange" as Tone, height: 36 },
];

export const mismatch = [
  { item: "Viking VK302 pendent", note: "Design 186 · price file 174", tag: "Qty", flag: true, amount: "$3,422.40" },
  { item: 'Sch 40 black pipe, 2"', note: "Live $4.15 · contract $3.88", tag: "Price", flag: true, amount: "$1,743.00" },
  { item: 'Sch 10 black pipe, 1"', note: "Matches design and contract", tag: "Match", flag: false, amount: "$1,651.20" },
  { item: "Labor, fitter", note: "312 hrs from your rate card", tag: "Match", flag: false, amount: "$26,520.00" },
];

export const pillars = [
  {
    title: "Bid faster",
    body: "No re-counting heads, pipe and fittings. The stocklist is read from the finished design, and the handoff between estimator and designer lives in one place.",
  },
  {
    title: "Win more",
    body: "Bid the jobs you're passing on today, without hiring another estimator. Track every bid through to won or lost.",
  },
  {
    title: "Better margins",
    body: "Every supplier price stays live through its API. Labor from your rates and past jobs. Mismatches flagged before the bid goes out.",
  },
];

type Chip = { a: string; b: string; tone: "ok" | "flag" | "muted" };

export const steps: { n: number; title: string; label: string; body: string; chips: Chip[] }[] = [
  {
    n: 1,
    title: "Connect your suppliers",
    label: "Your suppliers",
    body: "We connect your suppliers during onboarding, so your contract prices flow into every bid and the price book stays current.",
    chips: [
      { a: "Your heads supplier", b: "Connected", tone: "ok" },
      { a: "Your pipe and fittings supplier", b: "Connected", tone: "ok" },
      { a: "Your contract prices", b: "Live", tone: "ok" },
    ],
  },
  {
    n: 2,
    title: "Import",
    label: "Design file",
    body: `Bring in the finished HydraCAD or AutoSPRINK design software file. ${PRODUCT_NAME} builds the stocklist from it.`,
    chips: [
      { a: "Riverside_Medical.hcad", b: "HydraCAD", tone: "muted" },
      { a: "Or an AutoSPRINK file", b: "AutoSPRINK", tone: "muted" },
    ],
  },
  {
    n: 3,
    title: "Review",
    label: "Priced bid",
    body: "Material on live pricing, labor from your rates and history, mismatches flagged for a second look.",
    chips: [
      { a: "Heads · qty mismatch", b: "Flag", tone: "flag" },
      { a: "Pipe · contract price", b: "OK", tone: "ok" },
      { a: "Labor · your rate card", b: "OK", tone: "ok" },
    ],
  },
  {
    n: 4,
    title: "Send and track",
    label: "Status",
    body: "Get the bid out the door and follow it through to won or lost.",
    chips: [
      { a: "Priced", b: "Done", tone: "ok" },
      { a: "Sent", b: "Done", tone: "ok" },
      { a: "Won or lost", b: "Tracking", tone: "muted" },
    ],
  },
];

type Row = { a: string; b: string; c: string; tone: "ink" | "ok" | "muted" };

export type Role = {
  title: string;
  lead: string;
  body: string;
  card: {
    kicker: string;
    title: string;
    badge: string;
    stats?: { n: string; label: string }[];
    rows: Row[];
  };
};

export const roles: Role[] = [
  {
    title: "Estimators",
    lead: "Price the design you already finished.",
    body: "No re-counting heads, pipe, and fittings. The stocklist comes off the design software and prices itself from the live price book, with mismatches flagged before the bid goes out.",
    card: {
      kicker: "Estimator view",
      title: "Stocklist from the design",
      badge: "412 lines",
      rows: [
        { a: "Viking VK302 pendent", b: "Viking · 186", c: "$3,422.40", tone: "ink" },
        { a: "Sch 40 black pipe", b: "Core & Main · 420 ft", c: "$1,743.00", tone: "ink" },
        { a: "Sch 10 black pipe", b: "Galloup · 860 ft", c: "$1,651.20", tone: "ink" },
        { a: "90° elbow, black", b: "Etna · 64", c: "$435.20", tone: "ink" },
      ],
    },
  },
  {
    title: "Designers",
    lead: "Hand off the finished design.",
    body: `HydraCAD and AutoSPRINK stay the design software. ${PRODUCT_NAME} reads the finished file, so designers are not rebuilding a price book or re-counting for the estimate.`,
    card: {
      kicker: "Design software",
      title: "Finished file, ready to price",
      badge: "Handed off",
      rows: [
        { a: "Riverside_Medical.hcad", b: "HydraCAD design software", c: "Imported", tone: "ok" },
        { a: "Or an AutoSPRINK file", b: "Same handoff, stocklist from the design", c: "Supported", tone: "ok" },
        { a: "Price book", b: "No edits from the design team", c: "Untouched", tone: "ok" },
      ],
    },
  },
  {
    title: "Purchasing managers",
    lead: "Never change the price book again.",
    body: "Etna, Galloup, Viking, and Core & Main are live APIs. Contract prices come in on their own, so the price book stays current without another manual update.",
    card: {
      kicker: "Purchasing",
      title: "Price book stays current",
      badge: "Live",
      rows: [
        { a: "Etna", b: "Contract pricing", c: "Live API", tone: "ok" },
        { a: "Galloup", b: "Contract pricing", c: "Live API", tone: "ok" },
        { a: "Viking", b: "Contract pricing", c: "Live API", tone: "ok" },
        { a: "Core & Main", b: "Contract pricing", c: "Live API", tone: "ok" },
        { a: "Manual price book edits", b: "Nothing to re-key", c: "None", tone: "muted" },
      ],
    },
  },
  {
    title: "Owners",
    lead: "More bids out with the team you have.",
    body: "Estimators, designers, and purchasing stay on one bid. You see every job from design to won or lost, priced from the live price book.",
    card: {
      kicker: "Sample pipeline",
      title: "41% win rate, this quarter",
      badge: "Sample",
      stats: [
        { n: "4", label: "Draft" },
        { n: "6", label: "Pricing" },
        { n: "9", label: "Sent" },
        { n: "11", label: "Won" },
      ],
      rows: [
        { a: "Riverside Medical", b: "Sent", c: "$34.6k", tone: "ink" },
        { a: "Lakeview Clinic", b: "Pricing", c: "$18.2k", tone: "ink" },
        { a: "Harbor Warehouse", b: "Won", c: "$52.0k", tone: "ok" },
      ],
    },
  },
];

export const roleOptions = ["Estimator", "Designer", "Purchasing manager", "Owner", "Other"];
