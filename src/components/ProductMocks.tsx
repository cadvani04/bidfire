const lines = [
  { item: "Viking VK302 pendent", size: '1/2"', qty: "186", unit: "18.40", ext: "3,422.40", vendor: "Viking" },
  { item: "Sch 40 black pipe", size: '2"', qty: "420 ft", unit: "4.15", ext: "1,743.00", vendor: "Core & Main" },
  { item: "Sch 10 black pipe", size: '1"', qty: "860 ft", unit: "1.92", ext: "1,651.20", vendor: "Galloup" },
  { item: "90° elbow, black", size: '2"', qty: "64", unit: "6.80", ext: "435.20", vendor: "Etna" },
  { item: "Tee, black", size: '1"', qty: "112", unit: "3.25", ext: "364.00", vendor: "Etna" },
  { item: "Grooved coupling", size: '2"', qty: "48", unit: "9.10", ext: "436.80", vendor: "Viking" },
];

function Money({ value }: { value: string }) {
  return <span className="num">${value}</span>;
}

export function WorkspaceMock() {
  return (
    <div className="mock mock-workspace" aria-hidden="true">
      <div className="mock-top">
        <div>
          <p className="mock-kicker">Sample job · HydraCAD import</p>
          <h3>Riverside Medical</h3>
          <p className="mock-sub">Wet system · 412 stocklist lines</p>
        </div>
        <span className="pill pill-green">Ready to send</span>
      </div>
      <div className="mock-body">
        <aside className="mock-side">
          <p className="mock-side-label">Bids</p>
          <div className="bid-row active">
            <span className="dot dot-orange" />
            Riverside Medical
            <small>Pricing</small>
          </div>
          <div className="bid-row">
            <span className="dot" />
            Lakeview Clinic
            <small>Sent</small>
          </div>
          <div className="bid-row">
            <span className="dot" />
            North Hall School
            <small>Draft</small>
          </div>
          <div className="bid-row">
            <span className="dot" />
            Harbor Warehouse
            <small>Won</small>
          </div>
        </aside>
        <div className="mock-main">
          <table>
            <thead>
              <tr>
                <th>Item</th>
                <th>Qty</th>
                <th>Unit</th>
                <th>Ext</th>
              </tr>
            </thead>
            <tbody>
              {lines.slice(0, 5).map((line) => (
                <tr key={line.item}>
                  <td>
                    <strong>{line.item}</strong>
                    <span>
                      {line.size} · {line.vendor}
                    </span>
                  </td>
                  <td className="num">{line.qty}</td>
                  <td>
                    <Money value={line.unit} />
                  </td>
                  <td>
                    <Money value={line.ext} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="mock-totals">
            <div>
              <span>Material</span>
              <strong>$8,052.60</strong>
            </div>
            <div>
              <span>Labor · 312 hrs</span>
              <strong>$26,520.00</strong>
            </div>
            <div className="grand">
              <span>Bid total</span>
              <strong>$34,572.60</strong>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

const flagged = [
  {
    item: "Viking VK302 pendent",
    detail: "Design 186 · price file 174",
    flag: "Qty",
    ext: "3,422.40",
  },
  {
    item: "Sch 40 black pipe, 2\"",
    detail: "Live $4.15 · contract $3.88",
    flag: "Price",
    ext: "1,743.00",
  },
  {
    item: "Sch 10 black pipe, 1\"",
    detail: "Matches design and contract",
    flag: "",
    ext: "1,651.20",
  },
  {
    item: "Labor, fitter",
    detail: "312 hrs from your rate card",
    flag: "",
    ext: "26,520.00",
  },
];

export function MismatchMock() {
  return (
    <div className="mock mock-mismatch" aria-hidden="true">
      <div className="mock-top">
        <div>
          <p className="mock-kicker">Review before send</p>
          <h3>Riverside Medical · priced bid</h3>
        </div>
        <span className="pill pill-amber">2 mismatches</span>
      </div>
      <ul className="flag-list">
        {flagged.map((row) => (
          <li key={row.item} className={row.flag ? "is-flagged" : ""}>
            <div>
              <strong>{row.item}</strong>
              <span>{row.detail}</span>
            </div>
            {row.flag ? <em>{row.flag}</em> : <em className="ok">Match</em>}
            <b>${row.ext}</b>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function PipelineMock() {
  const stages = [
    { name: "Draft", count: 4 },
    { name: "Pricing", count: 6 },
    { name: "Sent", count: 9 },
    { name: "Won", count: 11 },
  ];
  return (
    <div className="mock mock-pipeline" aria-hidden="true">
      <div className="pipe-head">
        <div className="winrate">
          <svg viewBox="0 0 36 36" className="ring">
            <circle cx="18" cy="18" r="14" />
            <circle cx="18" cy="18" r="14" className="ring-value" />
          </svg>
          <div>
            <strong>41%</strong>
            <span>Win rate, this quarter</span>
          </div>
        </div>
        <p>Sample pipeline</p>
      </div>
      <div className="stages">
        {stages.map((stage) => (
          <div key={stage.name}>
            <b>{stage.count}</b>
            <span>{stage.name}</span>
          </div>
        ))}
      </div>
      <ul className="pipe-jobs">
        <li>
          <span>Riverside Medical</span>
          <em>Sent · $34.6k</em>
        </li>
        <li>
          <span>Lakeview Clinic</span>
          <em>Pricing · $18.2k</em>
        </li>
        <li>
          <span>Harbor Warehouse</span>
          <em className="won">Won · $52.0k</em>
        </li>
      </ul>
    </div>
  );
}

export function EstimatorMock() {
  return (
    <div className="mock mock-estimator" aria-hidden="true">
      <div className="mock-top">
        <div>
          <p className="mock-kicker">Estimator view</p>
          <h3>Stocklist from the design</h3>
        </div>
        <span className="pill pill-green">412 lines</span>
      </div>
      <table>
        <thead>
          <tr>
            <th>Item</th>
            <th>Qty</th>
            <th>Ext</th>
          </tr>
        </thead>
        <tbody>
          {lines.slice(0, 4).map((line) => (
            <tr key={line.item}>
              <td>
                <strong>{line.item}</strong>
                <span>{line.vendor}</span>
              </td>
              <td className="num">{line.qty}</td>
              <td>
                <Money value={line.ext} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export function DesignerMock() {
  return (
    <div className="mock" aria-hidden="true">
      <div className="mock-top">
        <div>
          <p className="mock-kicker">Design software</p>
          <h3>Finished file, ready to price</h3>
        </div>
        <span className="pill pill-green">Handed off</span>
      </div>
      <div className="art">
        <div className="file-card">
          <span className="file-ext">HCAD</span>
          <div>
            <strong>Riverside_Medical.hcad</strong>
            <span>HydraCAD design software</span>
          </div>
        </div>
        <div className="file-card">
          <span className="file-ext alt">AS</span>
          <div>
            <strong>Or an AutoSPRINK file</strong>
            <span>Same handoff, stocklist from the design</span>
          </div>
        </div>
        <div className="art-row">
          <span>Price book</span>
          <em>Untouched</em>
        </div>
      </div>
    </div>
  );
}

export function PurchasingMock() {
  const suppliers = ["Etna", "Galloup", "Viking", "Core & Main"];
  return (
    <div className="mock" aria-hidden="true">
      <div className="mock-top">
        <div>
          <p className="mock-kicker">Purchasing</p>
          <h3>Price book stays current</h3>
        </div>
        <span className="pill pill-green">Live</span>
      </div>
      <div className="art">
        {suppliers.map((name) => (
          <div className="art-row" key={name}>
            <span>{name}</span>
            <em>Live API</em>
          </div>
        ))}
        <div className="art-row">
          <span>Manual price book edits</span>
          <em>None</em>
        </div>
      </div>
    </div>
  );
}

export function StepArt({ step }: { step: 1 | 2 | 3 | 4 }) {
  if (step === 1) {
    return (
      <div className="art" aria-hidden="true">
        <p>Distributors</p>
        {["Viking", "Core & Main", "Etna"].map((name) => (
          <div key={name} className="art-row">
            <span>{name}</span>
            <em>Connected</em>
          </div>
        ))}
      </div>
    );
  }
  if (step === 2) {
    return (
      <div className="art art-import" aria-hidden="true">
        <div className="file-card">
          <span className="file-ext">HCAD</span>
          <div>
            <strong>Riverside_Medical.hcad</strong>
            <span>HydraCAD · finished design</span>
          </div>
        </div>
        <div className="file-card muted">
          <span className="file-ext alt">AS</span>
          <div>
            <strong>Or drop an AutoSPRINK file</strong>
            <span>Stocklist builds from the design</span>
          </div>
        </div>
      </div>
    );
  }
  if (step === 3) {
    return (
      <div className="art" aria-hidden="true">
        <p>Priced bid</p>
        <div className="art-row warn">
          <span>Heads · qty mismatch</span>
          <em>Flag</em>
        </div>
        <div className="art-row">
          <span>Pipe · contract price</span>
          <em>OK</em>
        </div>
        <div className="art-row">
          <span>Labor · your rate card</span>
          <em>OK</em>
        </div>
      </div>
    );
  }
  return (
    <div className="art art-track" aria-hidden="true">
      {["Designed", "Priced", "Sent", "Won or lost"].map((label, index) => (
        <div key={label} className={index < 3 ? "track done" : "track"}>
          <i />
          <span>{label}</span>
        </div>
      ))}
    </div>
  );
}
