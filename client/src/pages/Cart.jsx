import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext.jsx";
import "./Cart.css";

export default function Cart() {
  const { items, removeItem, updateQty, subtotal } = useCart();
  const navigate = useNavigate();

  if (items.length === 0) {
    return (
      <section className="container cart-page">
        <h1>Your cart</h1>
        <p className="empty-cart mono">
          No components added yet. <Link to="/shop">Browse parts →</Link>
        </p>
      </section>
    );
  }

  return (
    <section className="container cart-page">
      <h1>Your cart</h1>

      <div className="cart-list">
        {items.map((item) => (
          <div className="cart-row" key={item._id}>
            <div className="cart-thumb">
              <svg width="46" height="46" viewBox="0 0 46 46" fill="none">
                <rect x="1" y="1" width="44" height="44" rx="3" fill="none" stroke="#3a3a42" />
              </svg>
            </div>
            <div className="cart-name">
              <Link to={`/product/${item.slug}`}>{item.name}</Link>
              <span className="mono brand">{item.brand}</span>
            </div>
            <div className="cart-qty mono">
              <button onClick={() => updateQty(item._id, Math.max(1, item.qty - 1))}>–</button>
              <span>{item.qty}</span>
              <button onClick={() => updateQty(item._id, item.qty + 1)}>+</button>
            </div>
            <div className="cart-price mono">${(item.price * item.qty).toFixed(2)}</div>
            <button className="cart-remove mono" onClick={() => removeItem(item._id)}>
              REMOVE
            </button>
          </div>
        ))}
      </div>

      <div className="cart-summary">
        <div className="summary-row mono">
          <span>Subtotal</span>
          <span>${subtotal.toFixed(2)}</span>
        </div>
        <div className="summary-row mono muted">
          <span>Shipping</span>
          <span>Calculated at checkout</span>
        </div>
        <button className="checkout-btn mono" onClick={() => navigate("/checkout")}>
          PROCEED TO CHECKOUT
        </button>
      </div>
    </section>
  );
}
