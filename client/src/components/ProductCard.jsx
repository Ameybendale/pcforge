import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext.jsx";
import "./ProductCard.css";

export default function ProductCard({ product }) {
  const { addItem } = useCart();

  return (
    <div className="card">
      <Link to={`/product/${product.slug}`} className="shot">
        <svg width="90" height="90" viewBox="0 0 90 90" fill="none">
          <rect x="2" y="2" width="86" height="86" rx="4" fill="none" stroke="#3a3a42" />
          <circle cx="45" cy="45" r="26" stroke="#55555e" />
        </svg>
      </Link>
      <Link to={`/product/${product.slug}`}>
        <h4>{product.name}</h4>
      </Link>
      <div className="spec mono">
        {product.specs?.[0] ? `${product.specs[0].label}: ${product.specs[0].value}` : product.brand}
      </div>
      <div className="row">
        <span className="price mono">${product.price}</span>
        <button className="addbtn mono" onClick={() => addItem(product)}>
          ADD
        </button>
      </div>
    </div>
  );
}
