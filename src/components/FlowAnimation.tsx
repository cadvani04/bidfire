import { useEffect, useState } from "react";

const SCRIPT = [
  ["plan", 1800],
  ["hydratec", 2200],
  ["stocklist", 2000],
  ["vendors", 2300],
  ["quote", 2000],
  ["race", 2600],
] as const;

type Stage = (typeof SCRIPT)[number][0];

const ORDER: Stage[] = SCRIPT.map(([name]) => name);

const CAPTION: Record<Stage, string> = {
  plan: "Start from the floor plan",
  hydratec: "Run it through Hydratec design software",
  stocklist: "The stocklist comes off the design",
  vendors: "Live APIs with every supplier. No more price books.",
  quote: "The quote goes out",
  race: "The other bids are still behind",
};

const LINES = [
  { item: "VK302 pendent", qty: "186", price: "$18.40", vendor: "Viking", src: "/logos/viking.png" },
  { item: 'Sch 40 pipe, 2"', qty: "420 ft", price: "$4.15", vendor: "Galloup", src: "/logos/galloup.png" },
  { item: "90° elbow", qty: "64", price: "$6.80", vendor: "Etna", src: "/logos/etna.png" },
  { item: 'Coupling, 2"', qty: "48", price: "$9.20", vendor: "Core & Main", src: "/logos/core-and-main.svg" },
];

const RACE = [
  { name: "FireBid", state: "Sent", pct: "100%", pace: "fast" },
  { name: "Other bid", state: "Still pricing", pct: "46%", pace: "slow" },
  { name: "Other bid", state: "Still counting", pct: "28%", pace: "slower" },
  { name: "Other bid", state: "Still in design", pct: "14%", pace: "slowest" },
];

const HEADS = [
  [48, 60],
  [100, 60],
  [160, 60],
  [100, 36],
  [100, 150],
  [160, 150],
  [230, 150],
  [280, 150],
  [230, 128],
  [100, 176],
  [250, 60],
  [310, 60],
  [280, 96],
];

function passed(stage: Stage, mark: Stage) {
  return ORDER.indexOf(stage) >= ORDER.indexOf(mark);
}

export function FlowAnimation() {
  const [stage, setStage] = useState<Stage>("plan");
  const [cycle, setCycle] = useState(0);
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const apply = () => setReduced(media.matches);
    apply();
    media.addEventListener("change", apply);
    return () => media.removeEventListener("change", apply);
  }, []);

  useEffect(() => {
    if (reduced) {
      setStage("race");
      return;
    }
    let index = 0;
    let timer = 0;
    const run = () => {
      const [name, ms] = SCRIPT[index];
      setStage(name);
      timer = window.setTimeout(() => {
        index += 1;
        if (index >= SCRIPT.length) {
          index = 0;
          setCycle((value) => value + 1);
        }
        run();
      }, ms);
    };
    run();
    return () => window.clearTimeout(timer);
  }, [reduced]);

  const designed = passed(stage, "hydratec");
  const priced = passed(stage, "vendors");
  const sent = stage === "quote" || stage === "race";

  return (
    <div className="flow" data-stage={stage} data-reduced={reduced ? "true" : "false"}>
      <div className="flow-canvas" key={cycle}>
        <div className="scene scene-plan" aria-hidden={stage !== "plan" && stage !== "hydratec"}>
          <div className={`sheet ${designed ? "is-designed" : ""}`}>
            <svg viewBox="0 0 340 210" aria-hidden="true">
              <g className="walls" fill="none" stroke="#111" strokeWidth="2">
                <rect x="18" y="16" width="304" height="178" />
                <path d="M18 104 H190 M190 16 V194 M190 120 H322" />
              </g>
              <g className="pipe" fill="none" stroke="#163044" strokeWidth="1.7" strokeLinecap="round">
                <path d="M48 60 H160 V150 H280" />
                <path d="M100 60 V36 M100 150 V176 M230 150 V128 M250 60 H310 M280 60 V96" />
              </g>
              {HEADS.map(([x, y]) => (
                <g key={`${x}-${y}`} className="head" transform={`translate(${x} ${y})`}>
                  <circle r="4.2" fill="#fff" stroke="#163044" strokeWidth="1.4" />
                  <path d="M-2.2 0 H2.2 M0 -2.2 V2.2" stroke="#163044" strokeWidth="1" />
                </g>
              ))}
            </svg>
            <div className="sheet-meta">
              <span>Level 1</span>
              <span>2" main</span>
            </div>
          </div>
          <div className="hydratec-pass">
            <img src="/logos/hydracad.svg" alt="" />
            <em>Design complete</em>
          </div>
        </div>

        <div className={`scene scene-bid ${sent ? "is-sent" : ""}`} aria-hidden={!passed(stage, "stocklist") || stage === "race"}>
          <header>
            <strong>FireBid</strong>
            <span className={sent ? "pill pill-green" : "pill"}>{sent ? "Sent" : "Stocklist"}</span>
          </header>
          <ul>
            <li className="cols">
              <span>From the design</span>
              <b>Qty</b>
              <b>Price</b>
            </li>
            {LINES.map((line) => (
              <li key={line.item}>
                <span>{line.item}</span>
                <b>{line.qty}</b>
                <b className={`price ${priced ? "is-on" : ""}`}>
                  <img src={line.src} alt="" />
                  {line.price}
                </b>
              </li>
            ))}
          </ul>
          <div className={`quote-foot ${sent ? "is-on" : ""}`}>
            <span>Riverside Medical</span>
            <strong>$42,180</strong>
          </div>
        </div>

        <div className="scene scene-race" aria-hidden={stage !== "race"}>
          <p>Quote out</p>
          <ul>
            {RACE.map((lane) => (
              <li key={lane.state} className={lane.pace}>
                <span>
                  {lane.name}
                  <small>{lane.state}</small>
                </span>
                <i>
                  <b style={{ ["--w" as string]: lane.pct }} />
                </i>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <p className="flow-caption" aria-live="polite">
        {CAPTION[stage]}
      </p>
    </div>
  );
}
