export function Wordmark({ tone = "dark" }: { tone?: "dark" | "light" }) {
  return (
    <img
      className="firebid-logo"
      src={tone === "light" ? "/firebid-logo-on-dark.png" : "/firebid-logo.png"}
      alt="FireBid"
    />
  );
}

export function NorthOpsLogo({ tone = "dark" }: { tone?: "dark" | "light" }) {
  return (
    <span className={`byline byline-${tone}`}>
      <span className="byline-word">by</span>
      <img className="northops-mark" src="/northops-mark.png" alt="NorthOps" />
    </span>
  );
}
