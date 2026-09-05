import { useEffect, useState } from "react";
import { useParams, useSearchParams, Link } from "react-router-dom";
import ProductCard from "../components/ProductCard.jsx";
import api from "../api/client.js";
import "./Shop.css";

const categories = [
  { label: "All Parts", slug: "" },
  { label: "Processors", slug: "processors" },
  { label: "Graphics Cards", slug: "graphics-cards" },
  { label: "Memory", slug: "memory" },
  { label: "Storage", slug: "storage" },
  { label: "Motherboards", slug: "motherboards" },
  { label: "Power Supplies", slug: "power-supplies" },
  { label: "Cabinets", slug: "cabinets" },
  { label: "Cooling", slug: "cooling" },
];

export default function Shop() {
  const { category } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [pages, setPages] = useState(1);
  const page = Number(searchParams.get("page") || 1);
  const sort = searchParams.get("sort") || "";

  useEffect(() => {
    setLoading(true);
    const params = { page, limit: 12 };
    if (category) params.category = category;
    if (sort) params.sort = sort;

    api
      .get("/products", { params })
      .then((res) => {
        setProducts(res.data.products);
        setPages(res.data.pages || 1);
      })
      .catch(() => setProducts([]))
      .finally(() => setLoading(false));
  }, [category, page, sort]);

  const setSort = (value) => {
    setSearchParams((prev) => {
      const p = new URLSearchParams(prev);
      p.set("sort", value);
      p.set("page", "1");
      return p;
    });
  };

  const goToPage = (n) => {
    setSearchParams((prev) => {
      const p = new URLSearchParams(prev);
      p.set("page", n);
      return p;
    });
  };

  return (
    <section className="container shop-page">
      <div className="shop-head">
        <h1>{category ? categories.find((c) => c.slug === category)?.label ?? "Shop" : "All Parts"}</h1>
        <select className="mono sort-select" value={sort} onChange={(e) => setSort(e.target.value)}>
          <option value="">Sort: Newest</option>
          <option value="price-asc">Price: Low to High</option>
          <option value="price-desc">Price: High to Low</option>
          <option value="rating">Top Rated</option>
        </select>
      </div>

      <div className="shop-body">
        <aside className="shop-filters mono">
          {categories.map((c) => (
            <Link
              key={c.slug}
              to={c.slug ? `/shop/${c.slug}` : "/shop"}
              className={c.slug === (category || "") ? "active" : ""}
            >
              {c.label}
            </Link>
          ))}
        </aside>

        <div className="shop-results">
          {loading ? (
            <div className="prod-grid">
              {Array.from({ length: 8 }).map((_, i) => (
                <div className="card skeleton" key={i} />
              ))}
            </div>
          ) : products.length ? (
            <>
              <div className="prod-grid">
                {products.map((p) => (
                  <ProductCard key={p._id} product={p} />
                ))}
              </div>
              {pages > 1 && (
                <div className="pagination mono">
                  {Array.from({ length: pages }).map((_, i) => (
                    <button
                      key={i}
                      className={page === i + 1 ? "active" : ""}
                      onClick={() => goToPage(i + 1)}
                    >
                      {String(i + 1).padStart(2, "0")}
                    </button>
                  ))}
                </div>
              )}
            </>
          ) : (
            <p className="empty-state mono">No components found in this category yet.</p>
          )}
        </div>
      </div>
    </section>
  );
}
