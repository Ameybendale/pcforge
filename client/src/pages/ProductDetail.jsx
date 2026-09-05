import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useCart } from "../context/CartContext.jsx";
import api from "../api/client.js";
import "./ProductDetail.css";

export default function ProductDetail() {
  const { slug } = useParams();
  const [product, setProduct] = useState(null);
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);
  const { addItem } = useCart();

  useEffect(() => {
    setProduct(null);
    api
      .get(`/products/${slug}`)
      .then((res) => setProduct(res.data))
      .catch(() => setProduct(false));
  }, [slug]);

  if (product === null) {
    return <div className="container detail-loading mono">Loading component…</div>;
  }

  if (product === false) {
    return (
      <div className="container detail-loading mono">
        Component not found. <Link to="/shop">Back to shop →</Link>
      </div>
    );
  }

  const handleAdd = () => {
    addItem(product, qty);
    setAdded(true);
    setTimeout(() => setAdded(false), 1600);
  };

  return (
    <section className="container detail-page">
      <div className="breadcrumb mono">
        <Link to="/shop">Shop</Link> / <Link to={`/shop/${product.category}`}>{product.category}</Link> / {product.name}
      </div>

      <div className="detail-grid">
        <div className="detail-visual">
          <svg width="280" height="280" viewBox="0 0 280 280" fill="none">
            <rect x="6" y="6" width="268" height="268" rx="6" fill="none" stroke="#3a3a42" />
            <circle cx="140" cy="140" r="80" stroke="#55555e" />
            <circle cx="140" cy="140" r="20" fill="#1c1c1f" stroke="#9a9aa3" />
          </svg>
        </div>

        <div className="detail-info">
          <span className="mono brand-tag">{product.brand}</span>
          <h1>{product.name}</h1>
          <div className="rating mono">
            {"★".repeat(Math.round(product.rating))}
            {"☆".repeat(5 - Math.round(product.rating))} &nbsp;({product.numReviews} reviews)
          </div>

          <div className="price-row">
            <span className="mono price-big">${product.price}</span>
            {product.compareAtPrice && (
              <span className="mono price-old">${product.compareAtPrice}</span>
            )}
          </div>

          <p className="desc">{product.description}</p>

          <table className="specs-table mono">
            <tbody>
              {product.specs?.map((s) => (
                <tr key={s.label}>
                  <td>{s.label}</td>
                  <td>{s.value}</td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="buy-row">
            <div className="qty-control mono">
              <button onClick={() => setQty((q) => Math.max(1, q - 1))}>–</button>
              <span>{qty}</span>
              <button onClick={() => setQty((q) => q + 1)}>+</button>
            </div>
            <button className="add-cart-btn mono" onClick={handleAdd}>
              {added ? "ADDED ✓" : `ADD TO CART — $${product.price * qty}`}
            </button>
          </div>

          <div className="stock mono">
            {product.stock > 0 ? `${product.stock} units in stock` : "Out of stock"}
          </div>
        </div>
      </div>
    </section>
  );
}
