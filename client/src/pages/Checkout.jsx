import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useCart } from "../context/CartContext.jsx";
import { useAuth } from "../context/AuthContext.jsx";
import api from "../api/client.js";
import "./Checkout.css";

export default function Checkout() {
  const { items, subtotal, clearCart } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ line1: "", city: "", state: "", postalCode: "", country: "" });
  const [placing, setPlacing] = useState(false);
  const [error, setError] = useState("");
  const [placed, setPlaced] = useState(null);

  const shipping = subtotal > 500 || subtotal === 0 ? 0 : 15;
  const tax = +(subtotal * 0.08).toFixed(2);
  const total = +(subtotal + shipping + tax).toFixed(2);

  if (!user) {
    return (
      <section className="container checkout-page">
        <h1>Checkout</h1>
        <p className="mono empty-cart">
          Please <Link to="/login">sign in</Link> to complete checkout.
        </p>
      </section>
    );
  }

  if (items.length === 0 && !placed) {
    return (
      <section className="container checkout-page">
        <h1>Checkout</h1>
        <p className="mono empty-cart">
          Your cart is empty. <Link to="/shop">Browse parts →</Link>
        </p>
      </section>
    );
  }

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setPlacing(true);
    try {
      const { data } = await api.post("/orders", {
        items: items.map((i) => ({
          product: i._id,
          name: i.name,
          price: i.price,
          qty: i.qty,
        })),
        shippingAddress: form,
        paymentMethod: "COD",
        itemsPrice: subtotal,
        shippingPrice: shipping,
        taxPrice: tax,
        totalPrice: total,
      });
      setPlaced(data);
      clearCart();
    } catch (err) {
      setError(err.response?.data?.message || "Could not place order");
    } finally {
      setPlacing(false);
    }
  };

  if (placed) {
    return (
      <section className="container checkout-page">
        <h1>Order placed</h1>
        <p className="mono confirm">
          Order <b>#{placed._id.slice(-8).toUpperCase()}</b> confirmed — total ${placed.totalPrice.toFixed(2)}.
        </p>
        <Link to="/shop" className="checkout-btn mono" style={{ display: "inline-block", marginTop: 24 }}>
          CONTINUE SHOPPING
        </Link>
      </section>
    );
  }

  return (
    <section className="container checkout-page">
      <h1>Checkout</h1>
      <div className="checkout-grid">
        <form onSubmit={handleSubmit} className="checkout-form">
          <label className="mono">
            Address
            <input name="line1" required value={form.line1} onChange={handleChange} />
          </label>
          <div className="form-row">
            <label className="mono">
              City
              <input name="city" required value={form.city} onChange={handleChange} />
            </label>
            <label className="mono">
              State
              <input name="state" required value={form.state} onChange={handleChange} />
            </label>
          </div>
          <div className="form-row">
            <label className="mono">
              Postal code
              <input name="postalCode" required value={form.postalCode} onChange={handleChange} />
            </label>
            <label className="mono">
              Country
              <input name="country" required value={form.country} onChange={handleChange} />
            </label>
          </div>
          {error && <p className="mono error-text">{error}</p>}
          <button className="checkout-btn mono" disabled={placing}>
            {placing ? "PLACING ORDER…" : `PLACE ORDER — $${total}`}
          </button>
        </form>

        <div className="order-summary">
          {items.map((i) => (
            <div className="summary-row mono" key={i._id}>
              <span>
                {i.name} × {i.qty}
              </span>
              <span>${(i.price * i.qty).toFixed(2)}</span>
            </div>
          ))}
          <div className="summary-row mono muted">
            <span>Shipping</span>
            <span>{shipping === 0 ? "Free" : `$${shipping}`}</span>
          </div>
          <div className="summary-row mono muted">
            <span>Tax</span>
            <span>${tax}</span>
          </div>
          <div className="summary-row mono total-row">
            <span>Total</span>
            <span>${total}</span>
          </div>
        </div>
      </div>
    </section>
  );
}
