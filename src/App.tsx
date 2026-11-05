import { FormEvent, useState } from "react";
import { NorthOpsLogo, Wordmark } from "./components/Logo";
import { FlowAnimation } from "./components/FlowAnimation";
import {
  DesignerMock,
  EstimatorMock,
  MismatchMock,
  PipelineMock,
  PurchasingMock,
  StepArt,
} from "./components/ProductMocks";

const nav = [
  { href: "#product", label: "Product" },
  { href: "#how-it-works", label: "How it works" },
  { href: "#integrations", label: "Integrations" },
  { href: "#pricing", label: "Pricing" },
];

const tools = [
  { name: "HydraCAD", kind: "Design software", src: "/logos/hydracad.svg" },
  { name: "AutoSPRINK", kind: "Design software", src: "/logos/autosprink.svg" },
  { name: "Etna", kind: "Live API", src: "/logos/etna.png" },
  { name: "Galloup", kind: "Live API", src: "/logos/galloup.png" },
  { name: "Viking", kind: "Live API", src: "/logos/viking.png" },
  { name: "Core & Main", kind: "Live API", src: "/logos/core-and-main.svg" },
];

const customers = [
  { name: "Total Fire Protection", src: "/clients/total-fire-protection.png" },
  { name: "Victory Fire Protection", src: "/clients/victory-fire-protection.png" },
  { name: "Nielsen Studios", src: "/clients/nielsen-studios.png" },
];

const steps = [
  {
    n: 1 as const,
    title: "Connect",
    body: "Etna, Galloup, Viking, and Core & Main connect through live APIs, so you never change a price book again.",
  },
  {
    n: 2 as const,
    title: "Import",
    body: "Bring in the finished HydraCAD or AutoSPRINK design software file. BidFire builds the stocklist from it.",
  },
  {
    n: 3 as const,
    title: "Review",
    body: "Material on live pricing, labor from your rates and history, mismatches flagged for a second look.",
  },
  {
    n: 4 as const,
    title: "Send and track",
    body: "Get the bid out the door and follow it through to won or lost.",
  },
];

const roleStops = [
  {
    id: "estimators",
    label: "Estimators",
    title: "Price the design you already finished.",
    body: "No re-counting heads, pipe, and fittings. The stocklist comes off the design software and prices itself from the live price book, with mismatches flagged before the bid goes out.",
    Mock: EstimatorMock,
  },
  {
    id: "designers",
    label: "Designers",
    title: "Hand off the finished design.",
    body: "HydraCAD and AutoSPRINK stay the design software. BidFire reads the finished file, so designers are not rebuilding a price book or re-counting for the estimate.",
    Mock: DesignerMock,
  },
  {
    id: "purchasing",
    label: "Purchasing managers",
    title: "Never change the price book again.",
    body: "Etna, Galloup, Viking, and Core & Main are live APIs. Contract prices come in on their own, so the price book stays current without another manual update.",
    Mock: PurchasingMock,
  },
  {
    id: "owners",
    label: "Owners",
    title: "More bids out with the team you have.",
    body: "Estimators, designers, and purchasing stay on one bid. You see every job from design to won or lost, priced from the live price book.",
    Mock: PipelineMock,
  },
];

type Page = "home" | "privacy" | "terms";
type Role = "Estimator" | "Designer" | "Purchasing manager" | "Owner" | "Project manager" | "Other";

const roles: Role[] = ["Estimator", "Designer", "Purchasing manager", "Owner", "Project manager", "Other"];

function scrollToId(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
}

export default function App() {
  const [page, setPage] = useState<Page>("home");
  const [menuOpen, setMenuOpen] = useState(false);
  const [sent, setSent] = useState<string | null>(null);
  const [error, setError] = useState("");

  function go(next: Page) {
    setPage(next);
    setMenuOpen(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function onNav(href: string) {
    setMenuOpen(false);
    if (page !== "home") {
      setPage("home");
      window.setTimeout(() => scrollToId(href.slice(1)), 40);
      return;
    }
    scrollToId(href.slice(1));
  }

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
    <>
      <a className="skip" href="#main">
        Skip to content
      </a>
      <div className="banner">
        <p>
          Now booking demos for fire protection contractors.{" "}
          <button type="button" onClick={() => onNav("#demo")}>
            Book a demo
          </button>
        </p>
      </div>
      <header className="nav">
        <button type="button" className="brand" onClick={() => go("home")}>
          <Wordmark />
          <NorthOpsLogo />
        </button>
        <nav className={menuOpen ? "open" : ""} aria-label="Primary">
          {nav.map((item) => (
            <button key={item.href} type="button" onClick={() => onNav(item.href)}>
              {item.label}
            </button>
          ))}
          <button type="button" className="btn btn-dark nav-cta" onClick={() => onNav("#demo")}>
            Book a demo
          </button>
        </nav>
        <button
          type="button"
          className="menu"
          aria-expanded={menuOpen}
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          onClick={() => setMenuOpen((open) => !open)}
        >
          <span />
          <span />
        </button>
      </header>

      {page === "home" ? (
        <main id="main">
          <section className="hero">
            <div className="hero-copy">
              <h1>
                <span>WIN</span>
                <span>MORE.</span>
                <span>BID</span>
                <span>FASTER.</span>
                <span className="accent">BETTER</span>
                <span className="accent">MARGINS.</span>
              </h1>
              <p>
                Bid software that turns a finished sprinkler design into a priced,
                ready-to-send bid.
              </p>
              <button type="button" className="btn btn-dark" onClick={() => onNav("#demo")}>
                Book a demo
              </button>
            </div>
            <div className="frame frame-flow">
              <FlowAnimation />
            </div>
          </section>

          <section className="customers" aria-label="Trusted by">
            <p className="eyebrow">Trusted by</p>
            <ul>
              {customers.map((customer) => (
                <li key={customer.name}>
                  <img src={customer.src} alt={customer.name} />
                </li>
              ))}
            </ul>
          </section>

          <section className="integrations" id="integrations">
            <p className="eyebrow">
              Connects to the <span>tools you already use</span>
            </p>
            <ul>
              {tools.map((tool) => (
                <li key={tool.name}>
                  <img src={tool.src} alt={tool.name} />
                  <span className={tool.kind === "Design software" ? "tag tag-design" : "tag tag-price"}>
                    {tool.kind}
                  </span>
                </li>
              ))}
            </ul>
          </section>

          <section className="product" id="product">
            <p className="brand-lockup">
              <i /> BidFire
            </p>
            <h2>Get your bid out first.</h2>
            <p className="lede">
              The stocklist comes straight from HydraCAD or AutoSPRINK design software,
              priced through live supplier APIs, so you never update a price book again.
              Every bid tracked in one place, from design to sent.
            </p>
            <div className="frame frame-wide">
              <MismatchMock />
            </div>
            <div className="columns">
              <article>
                <h3>Bid faster</h3>
                <p>
                  No re-counting heads, pipe and fittings. The stocklist is read from
                  the finished design, and the handoff between estimator and designer
                  lives in one place.
                </p>
              </article>
              <article>
                <h3>Win more</h3>
                <p>
                  Bid the jobs you're passing on today, without hiring another
                  estimator. Track every bid through to won or lost.
                </p>
              </article>
              <article>
                <h3>Better margins</h3>
                <p>
                  Every supplier price stays live through its API. Labor from your rates
                  and past jobs. Mismatches flagged before the bid goes out.
                </p>
              </article>
            </div>
          </section>

          <section className="roles" aria-label="Who it's for">
            {roleStops.map((role) => (
              <article className="role-stop" id={role.id} key={role.id}>
                <div className="who">
                  <div className="who-copy">
                    <p className="eyebrow eyebrow-left">{role.label}</p>
                    <h2>{role.title}</h2>
                    <p>{role.body}</p>
                  </div>
                  <div className="frame frame-soft">
                    <role.Mock />
                  </div>
                </div>
              </article>
            ))}
          </section>

          <section className="how" id="how-it-works">
            <h2>
              From finished design to
              <br /> a sent bid.
            </h2>
            <ol>
              {steps.map((step) => (
                <li key={step.n}>
                  <div className="step-art">
                    <StepArt step={step.n} />
                  </div>
                  <h3>
                    <span>[{step.n}]</span> {step.title}
                  </h3>
                  <p>{step.body}</p>
                </li>
              ))}
            </ol>
          </section>

          <section className="proof">
            <figure>
              <figcaption>
                <img src="/clients/total-fire-protection.png" alt="" />
                <span>Testimonial</span>
              </figcaption>
              <blockquote>
                “We have all the information. We just need to gather it in one easy
                spot.”
              </blockquote>
              <p>Jason Bowman · Estimator, Total Fire Protection</p>
            </figure>
            <div className="stats">
              <article>
                <p>
                  <strong>0</strong> re-counts
                </p>
                <span>The stocklist is read from the finished design.</span>
              </article>
              <article>
                <p>
                  <strong>1</strong> place
                </p>
                <span>Every bid, from design to won or lost.</span>
              </article>
            </div>
          </section>

          <section className="cta" id="pricing">
            <h2>See BidFire on your next bid.</h2>
            <p>
              Bring a recent design and we'll walk it from stocklist to priced bid.
              Pricing is built around your team, so talk to us and we'll scope it with
              you.
            </p>
            <div className="form-card" id="demo">
              {sent ? (
                <div className="thanks" role="status">
                  <h3>Thanks, {sent}. You're on the list.</h3>
                  <p>
                    Bring a recent design to the demo and we'll walk it from stocklist
                    to priced bid.
                  </p>
                  <button
                    type="button"
                    className="btn btn-dark"
                    onClick={() => setSent(null)}
                  >
                    Submit another
                  </button>
                </div>
              ) : (
                <form onSubmit={onSubmit} noValidate>
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
                        {roles.map((role) => (
                          <option key={role}>{role}</option>
                        ))}
                      </select>
                    </label>
                  </div>
                  {error ? (
                    <p className="form-error" role="alert">
                      {error}
                    </p>
                  ) : null}
                  <button type="submit" className="btn btn-dark btn-block">
                    Book a demo
                  </button>
                </form>
              )}
            </div>
          </section>
        </main>
      ) : (
        <main id="main" className="legal">
          {page === "privacy" ? <Privacy /> : <Terms />}
        </main>
      )}

      <footer className="footer">
        <div className="footer-brands">
          <Wordmark tone="light" />
          <NorthOpsLogo tone="light" />
        </div>
        <div className="footer-links">
          <button type="button" onClick={() => onNav("#product")}>
            Product
          </button>
          <button type="button" onClick={() => onNav("#demo")}>
            Contact
          </button>
          <button type="button" onClick={() => go("privacy")}>
            Privacy
          </button>
          <button type="button" onClick={() => go("terms")}>
            Terms
          </button>
          <span>© 2026 NorthOps LLC</span>
        </div>
      </footer>
    </>
  );
}

function Privacy() {
  return (
    <article>
      <h1>Privacy</h1>
      <p>
        BidFire is a product of NorthOps LLC. This page describes how the marketing
        site handles information you give us.
      </p>
      <h2>What you send</h2>
      <p>
        The demo form asks for your name, work email, phone number, company, and
        role. Submitting it confirms on this page and does not send those details
        to a server yet. Don't put anything in the form you wouldn't want in a
        demo request once delivery is connected.
      </p>
      <h2>Product data</h2>
      <p>
        Job files, vendor pricing, and labor rates are not collected on this page.
        Those stay inside the BidFire product under the agreement you sign with
        NorthOps.
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
        This website introduces BidFire, bid software for fire protection
        contractors, from NorthOps LLC. Browsing the site doesn't create a customer
        agreement.
      </p>
      <h2>Demos and pricing</h2>
      <p>
        A demo is a conversation. Pricing is scoped to your team and isn't published
        as a fixed plan on this site. Nothing here is an offer to sell a specific
        package.
      </p>
      <h2>The product</h2>
      <p>
        Screens on this page are sample jobs so you can see the workspace. They
        aren't a customer's bid, and they aren't a promise of a particular win rate
        or hours saved.
      </p>
      <h2>Contact</h2>
      <p>Use the demo form to talk with NorthOps about using BidFire.</p>
    </article>
  );
}
