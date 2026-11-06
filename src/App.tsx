import { FormEvent, useCallback, useEffect, useRef, useState } from "react";
import { NorthOpsByline, Wordmark } from "./components/Logo";
import {
  PRODUCT_NAME,
  customers,
  mismatch,
  nav,
  pillars,
  roleOptions,
  roles,
  steps,
  tools,
} from "./content";

type Page = "home" | "privacy" | "terms";

const ROLE_STEP = 520; // px of scrolling per role in "Who it's for"
const PROMO_KEY = "firebids-promo-dismissed";
const PROMO_SNOOZE_MS = 7 * 24 * 60 * 60 * 1000;
const PROMO_DELAY_MS = 40_000;

function scrollToId(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
}

function promoDismissedRecently() {
  try {
    const at = Number(window.localStorage.getItem(PROMO_KEY) || 0);
    return at > 0 && Date.now() - at < PROMO_SNOOZE_MS;
  } catch {
    return false;
  }
}

function rememberPromo() {
  try {
    window.localStorage.setItem(PROMO_KEY, String(Date.now()));
  } catch {
    /* storage unavailable: the card just shows again next visit */
  }
}

export default function App() {
  const [page, setPage] = useState<Page>("home");

  function go(next: Page) {
    setPage(next);
    window.scrollTo({ top: 0 });
  }

  function onNav(href: string) {
    if (page !== "home") {
      setPage("home");
      window.setTimeout(() => scrollToId(href.slice(1)), 40);
      return;
    }
    scrollToId(href.slice(1));
  }

  return (
    <>
      <a className="skip" href="#main">
        Skip to content
      </a>
      <div className="banner">
        <p>
          Now booking demos for fire protection contractors.{" "}
          <a href="#demo" onClick={(e) => { e.preventDefault(); onNav("#demo"); }}>
            Book a demo
          </a>
        </p>
      </div>
      <header className="nav">
        <div className="nav-inner">
          <button type="button" className="brand" onClick={() => go("home")} aria-label={`${PRODUCT_NAME} by NorthOps, home`}>
            <Wordmark />
            <NorthOpsByline />
          </button>
          <nav className="nav-links" aria-label="Main">
            {nav.map((item) => (
              <a
                key={item.label}
                href={item.href}
                onClick={(e) => { e.preventDefault(); onNav(item.href); }}
              >
                {item.label}
              </a>
            ))}
            <a className="btn" href="#demo" onClick={(e) => { e.preventDefault(); onNav("#demo"); }}>
              Book a demo
            </a>
          </nav>
        </div>
      </header>

      {page === "home" ? (
        <Home onNav={onNav} />
      ) : (
        <main id="main" className="legal">
          {page === "privacy" ? <Privacy /> : <Terms />}
        </main>
      )}

      <footer className="footer">
        <div className="wrap">
          <button type="button" className="footer-brand" onClick={() => go("home")} aria-label={`${PRODUCT_NAME} home`}>
            <Wordmark tone="light" />
            <NorthOpsByline tone="light" />
          </button>
          <div className="footer-links">
            <button type="button" onClick={() => onNav("#product")}>Product</button>
            <button type="button" onClick={() => onNav("#demo")}>Contact</button>
            <button type="button" onClick={() => go("privacy")}>Privacy</button>
            <button type="button" onClick={() => go("terms")}>Terms</button>
            <span>© 2026 NorthOps LLC</span>
          </div>
        </div>
      </footer>
    </>
  );
}

function Home({ onNav }: { onNav: (href: string) => void }) {
  const [role, setRole] = useState(0);
  const [promo, setPromo] = useState<"waiting" | "open" | "closed" | "sent">(
    () => (promoDismissedRecently() ? "closed" : "waiting"),
  );
  const [demoInView, setDemoInView] = useState(false);
  const rolesRef = useRef<HTMLDivElement>(null);

  const openPromo = useCallback(() => {
    setPromo((p) => (p === "waiting" ? "open" : p));
  }, []);

  useEffect(() => {
    function onScroll() {
      const vh = window.innerHeight || 800;
      const how = document.getElementById("how");
      if (how && how.getBoundingClientRect().bottom < vh) openPromo();
      const demo = document.getElementById("demo");
      setDemoInView(!!demo && demo.getBoundingClientRect().top < vh * 0.85);
      const track = rolesRef.current;
      if (track) {
        const passed = -track.getBoundingClientRect().top;
        const next = Math.max(0, Math.min(roles.length - 1, Math.floor((passed + ROLE_STEP / 2) / ROLE_STEP)));
        setRole(next);
      }
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    const timer = window.setTimeout(openPromo, PROMO_DELAY_MS);
    onScroll();
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      window.clearTimeout(timer);
    };
  }, [openPromo]);

  function jumpToRole(i: number) {
    const track = rolesRef.current;
    setRole(i);
    if (!track) return;
    const top = track.getBoundingClientRect().top + window.scrollY + i * ROLE_STEP;
    window.scrollTo({ top, behavior: "smooth" });
  }

  function closePromo() {
    rememberPromo();
    setPromo("closed");
  }

  const active = roles[role];
  const marquee = [0, 1, 2].flatMap((copy) => tools.map((t) => ({ ...t, copy })));

  return (
    <main id="main">
      {/* Hero */}
      <section className="hero has-grid" id="top">
        <div className="grid-bg" aria-hidden="true" />
        <div className="wrap">
          <div className="hero-row">
            <div className="hero-copy">
              <h1>
                Win more.
                <br />
                Bid faster.
                <br />
                <em>Better margins.</em>
              </h1>
              <p>Bid software that turns a finished sprinkler design into a priced, ready-to-send bid.</p>
              <a className="btn" href="#demo" onClick={(e) => { e.preventDefault(); onNav("#demo"); }}>
                Book a demo
              </a>
            </div>
            <div className="panel">
              <div className="card">
                <div className="card-head">
                  <div>
                    <p className="card-kicker">Review before send</p>
                    <p className="card-title">Riverside Medical · priced bid</p>
                  </div>
                  <span className="tag tag-orange">2 mismatches</span>
                </div>
                {mismatch.map((m) => (
                  <div key={m.item} className={m.flag ? "check-row flag" : "check-row"}>
                    <div className="grow">
                      <p className="item">{m.item}</p>
                      <p className="note">{m.note}</p>
                    </div>
                    <span className={m.flag ? "tag tag-orange" : "tag tag-green"}>{m.tag}</span>
                    <span className="amount">{m.amount}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trusted by */}
      <section className="trusted" aria-label="Trusted by">
        <div className="wrap">
          <p className="eyebrow">Trusted by</p>
          <ul>
            {customers.map((c) => (
              <li key={c.name}>
                <img src={c.src} alt={c.name} style={{ height: c.height }} />
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Get your bid out first */}
      <section className="product" id="product">
        <div className="wrap">
          <div className="center">
            <p className="eyebrow hl brand-mark">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M13 2 4 14h7l-1 8 9-12h-7l1-8z" />
              </svg>
              {PRODUCT_NAME}
            </p>
            <h2 className="section-title">Get your bid out first.</h2>
            <p className="lede">
              The stocklist comes straight from HydraCAD or AutoSPRINK design software, priced through live supplier
              APIs, so you never update a price book again. Every bid tracked in one place, from design to sent.
            </p>
          </div>
          <div className="pillars">
            {pillars.map((p) => (
              <div key={p.title}>
                <h3>{p.title}</h3>
                <p>{p.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Integrations */}
      <section className="integrations tint" id="integrations">
        <p className="eyebrow">
          Connects to the <span className="hl">tools you already use</span>
        </p>
        <div className="marquee">
          <ul className="marquee-track">
            {marquee.map((t) => (
              <li key={`${t.copy}-${t.name}`} className="tool" aria-hidden={t.copy > 0 ? true : undefined}>
                <span className="tool-logo">
                  <img src={t.src} alt={t.copy > 0 ? "" : t.name} style={{ height: t.height, width: "auto", maxWidth: 150, objectFit: "contain" }} />
                </span>
                <span className={t.tone === "green" ? "tag tag-green" : "tag tag-orange"}>{t.kind}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* How it works */}
      <section className="how has-grid" id="how">
        <div className="grid-bg" aria-hidden="true" />
        <div className="wrap">
          <h2 className="section-title">From finished design to a sent bid.</h2>
          <ol className="steps">
            {steps.map((s) => (
              <li key={s.n}>
                <div className="step-art">
                  <p className="eyebrow">{s.label}</p>
                  {s.chips.map((c) => (
                    <div key={c.a} className="step-chip">
                      <span>{c.a}</span>
                      <span className={`c-${c.tone}`}>{c.b}</span>
                    </div>
                  ))}
                </div>
                <h3>
                  <span>[{s.n}]</span> {s.title}
                </h3>
                <p>{s.body}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Who it's for: pinned while scrolling */}
      <section className="tint" aria-label="Who it's for">
        <div className="wrap roles-track" ref={rolesRef} style={{ height: 640 + (roles.length - 1) * ROLE_STEP }}>
          <div className="roles-pin">
            <div className="roles-copy">
              <p className="eyebrow hl">Who it's for</p>
              <div className="roles-list">
                {roles.map((r, i) => (
                  <div key={r.title} className={i === role ? "role on" : "role"}>
                    <button type="button" aria-pressed={i === role} onClick={() => jumpToRole(i)}>
                      {r.title}
                    </button>
                    {i === role ? (
                      <div className="role-detail">
                        <p className="role-lead">{r.lead}</p>
                        <p className="role-body">{r.body}</p>
                      </div>
                    ) : null}
                  </div>
                ))}
              </div>
            </div>
            <div className="roles-card">
              <div className="card" aria-live="polite">
                <div className="card-head">
                  <div>
                    <p className="card-kicker">{active.card.kicker}</p>
                    <p className="card-title">{active.card.title}</p>
                  </div>
                  <span className="tag tag-green">{active.card.badge}</span>
                </div>
                {active.card.stats ? (
                  <div className="stat-grid">
                    {active.card.stats.map((s) => (
                      <div key={s.label}>
                        <strong>{s.n}</strong>
                        <span>{s.label}</span>
                      </div>
                    ))}
                  </div>
                ) : null}
                {active.card.rows.map((r) => (
                  <div key={r.a} className="row">
                    <div className="grow">
                      <p className="item">{r.a}</p>
                      <p className="note">{r.b}</p>
                    </div>
                    <span className={`row-value v-${r.tone}`}>{r.c}</span>
                  </div>
                ))}
              </div>
              <div className="dots" aria-hidden="true">
                {roles.map((r, i) => (
                  <span key={r.title} className={i === role ? "on" : ""} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonial */}
      <section className="proof">
        <div className="wrap">
          <figure className="quote-card">
            <div className="quote-head">
              <img src="/clients/total-fire-protection.png" alt="Total Fire Protection" />
              <span className="tag tag-green">Testimonial</span>
            </div>
            <blockquote>“We have all the information. We just need to gather it in one easy spot.”</blockquote>
            <figcaption>
              <strong>Jason Bowman</strong>
              <span> · Estimator, Total Fire Protection</span>
            </figcaption>
          </figure>
        </div>
      </section>

      <DemoSection />

      {(promo === "open" || promo === "sent") && !demoInView ? (
        <Promo
          sent={promo === "sent"}
          onClose={closePromo}
          onSent={() => {
            rememberPromo();
            setPromo("sent");
          }}
        />
      ) : null}
    </main>
  );
}

function DemoSection() {
  const [sent, setSent] = useState<string | null>(null);
  const [error, setError] = useState("");

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const first = String(data.get("first") ?? "").trim();
    const last = String(data.get("last") ?? "").trim();
    const email = String(data.get("email") ?? "").trim();
    const company = String(data.get("company") ?? "").trim();
    if (!first || !last || !company) {
      setError("Add your name and company so we know who the demo is for.");
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError("Use a work email so we can send the demo details.");
      return;
    }
    setError("");
    setSent(first);
  }

  return (
    <section className="demo tint" id="demo">
      <div className="wrap center">
        <h2 className="section-title">See {PRODUCT_NAME} on your next bid.</h2>
        <p className="lede">
          Bring a recent design and we'll walk it from stocklist to priced bid. Pricing is built around your team, so
          talk to us and we'll scope it with you.
        </p>
        <div className="form-card" style={{ textAlign: "left" }}>
          {sent ? (
            <div className="thanks" role="status">
              <h3>Thanks, {sent}. You're on the list.</h3>
              <p>Bring a recent design to the demo and we'll walk it from stocklist to priced bid.</p>
              <button type="button" className="btn" onClick={() => setSent(null)}>
                Submit another
              </button>
            </div>
          ) : (
            <form onSubmit={onSubmit} noValidate aria-label="Book a demo">
              <div className="fields">
                <label>
                  First name
                  <input name="first" autoComplete="given-name" required />
                </label>
                <label>
                  Last name
                  <input name="last" autoComplete="family-name" required />
                </label>
                <label>
                  Work email
                  <input name="email" type="email" autoComplete="email" required />
                </label>
                <label>
                  Phone number
                  <input name="phone" type="tel" autoComplete="tel" />
                </label>
                <label>
                  Company
                  <input name="company" autoComplete="organization" required />
                </label>
                <label>
                  Your role
                  <select name="role" defaultValue="Estimator">
                    {roleOptions.map((r) => (
                      <option key={r}>{r}</option>
                    ))}
                  </select>
                </label>
                <div className="fields-divider">
                  <p className="title">
                    About your company <span>(optional)</span>
                  </p>
                  <p className="hint">Helps us set up the demo around how you bid today.</p>
                </div>
                <label>
                  Estimators on your team
                  <select name="estimators" defaultValue="">
                    <option value="">Select</option>
                    <option>1</option>
                    <option>2–3</option>
                    <option>4–10</option>
                    <option>More than 10</option>
                  </select>
                </label>
                <label>
                  Bids per month
                  <select name="bids_per_month" defaultValue="">
                    <option value="">Select</option>
                    <option>Under 10</option>
                    <option>10–25</option>
                    <option>25–50</option>
                    <option>More than 50</option>
                  </select>
                </label>
                <label>
                  Design software
                  <select name="design_software" defaultValue="">
                    <option value="">Select</option>
                    <option>HydraCAD</option>
                    <option>AutoSPRINK</option>
                    <option>Both</option>
                    <option>Other</option>
                  </select>
                </label>
                <label>
                  Your suppliers
                  <input name="suppliers" placeholder="e.g. Core & Main, Viking" />
                </label>
              </div>
              {error ? (
                <p className="form-error" role="alert">
                  {error}
                </p>
              ) : null}
              <button type="submit" className="btn btn-block">
                Book a demo
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}

function Promo({ sent, onClose, onSent }: { sent: boolean; onClose: () => void; onSent: () => void }) {
  return (
    <aside className="promo" aria-label="Book a demo">
      <button type="button" className="promo-close" aria-label="Close" onClick={onClose}>
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
          <path d="M6 6l12 12M18 6 6 18" />
        </svg>
      </button>
      {sent ? (
        <>
          <h2>Thanks. We'll be in touch.</h2>
          <p>Bring a recent design to the demo and we'll walk it from stocklist to priced bid.</p>
        </>
      ) : (
        <>
          <h2>Want to see {PRODUCT_NAME} on one of your bids?</h2>
          <p>Leave your details and we'll set up a demo with a recent design.</p>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              onSent();
            }}
          >
            <label>
              Work email
              <input type="email" name="promo_email" autoComplete="email" required />
            </label>
            <label>
              Company
              <input type="text" name="promo_company" autoComplete="organization" required />
            </label>
            <button type="submit" className="btn">
              Book a demo
            </button>
          </form>
        </>
      )}
    </aside>
  );
}

function Privacy() {
  return (
    <article>
      <h1>Privacy</h1>
      <p>
        {PRODUCT_NAME} is a product of NorthOps LLC. This page describes how the marketing site handles information
        you give us.
      </p>
      <h2>What you send</h2>
      <p>
        The demo forms ask for your name, work email, phone number, company, role, and optional details about your
        team. Submitting confirms on this page and does not send those details to a server yet.
      </p>
      <h2>Product data</h2>
      <p>
        Job files, supplier pricing, and labor rates are not collected on this page. Those stay inside the{" "}
        {PRODUCT_NAME} product under the agreement you sign with NorthOps.
      </p>
      <h2>Contact</h2>
      <p>Questions about privacy go through the demo form on the homepage.</p>
    </article>
  );
}

function Terms() {
  return (
    <article>
      <h1>Terms</h1>
      <p>
        This website introduces {PRODUCT_NAME}, bid software for fire protection contractors, from NorthOps LLC.
        Browsing the site doesn't create a customer agreement.
      </p>
      <h2>Demos and pricing</h2>
      <p>
        A demo is a conversation. Pricing is scoped to your team and isn't published as a fixed plan on this site.
        Nothing here is an offer to sell a specific package.
      </p>
      <h2>The product</h2>
      <p>
        Screens on this page are sample jobs so you can see the workspace. They aren't a customer's bid, and they
        aren't a promise of a particular win rate or hours saved.
      </p>
      <h2>Contact</h2>
      <p>Use the demo form to talk with NorthOps about using {PRODUCT_NAME}.</p>
    </article>
  );
}
