import { useEffect, useState } from "react";
import ExplodedHero from "../components/ExplodedHero.jsx";
import CategoryGrid from "../components/CategoryGrid.jsx";
import ProductCard from "../components/ProductCard.jsx";
import api from "../api/client.js";
import "./Home.css";

export default function Home() {
  const [featured, setFeatured] = useState([]);
  const [counts, setCounts] = useState({});

  useEffect(() => {
    api
      .get("/products", { params: { featured: true, limit: 4 } })
      .then((res) => setFeatured(res.data.products))
      .catch(() => setFeatured([]));

    api
      .get("/products/categories/summary")
      .then((res) => {
        const map = {};
        res.data.forEach((c) => (map[c._id] = c.count));
        setCounts(map);
      })
      .catch(() => setCounts({}));
  }, []);

  return (
    <>
      <ExplodedHero />

      <CategoryGrid counts={counts} />

      <section className="container featured-section">
        <div className="section-head">
          <h2>Featured components</h2>
          <p className="mono">// HAND-PICKED FOR PRICE-TO-PERFORMANCE</p>
        </div>
        <div className="prod-grid">
          {featured.length
            ? featured.map((p) => <ProductCard key={p._id} product={p} />)
            : Array.from({ length: 4 }).map((_, i) => <div className="card skeleton" key={i} />)}
        </div>
      </section>
    </>
  );
}
