import { Link } from "react-router-dom";
import "./CategoryGrid.css";

const categories = [
  { n: "01", label: "Processors", slug: "processors" },
  { n: "02", label: "Graphics Cards", slug: "graphics-cards" },
  { n: "03", label: "Memory", slug: "memory" },
  { n: "04", label: "Storage", slug: "storage" },
  { n: "05", label: "Motherboards", slug: "motherboards" },
  { n: "06", label: "Power Supplies", slug: "power-supplies" },
  { n: "07", label: "Cabinets", slug: "cabinets" },
  { n: "08", label: "Cooling", slug: "cooling" },
];

export default function CategoryGrid({ counts = {} }) {
  return (
    <section className="container cat-section">
      <div className="section-head">
        <h2>Shop by component</h2>
        <p className="mono">// EVERY CATEGORY, STOCKED AND BENCHMARKED IN-HOUSE</p>
      </div>
      <div className="cat-grid">
        {categories.map((c) => (
          <Link key={c.slug} to={`/shop/${c.slug}`} className="cat">
            <span className="n mono">{c.n}</span>
            <h3>{c.label}</h3>
            <span className="count mono">{counts[c.slug] ?? "—"} items</span>
          </Link>
        ))}
      </div>
    </section>
  );
}
