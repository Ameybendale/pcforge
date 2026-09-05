import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext.jsx";
import { useAuth } from "../context/AuthContext.jsx";
import "./Navbar.css";

const categories = [
  { label: "Processors", slug: "processors" },
  { label: "Graphics Cards", slug: "graphics-cards" },
  { label: "Memory", slug: "memory" },
  { label: "Storage", slug: "storage" },
];

export default function Navbar() {
  const { count } = useCart();
  const { user, logout } = useAuth();

  return (
    <nav className="nav">
      <Link to="/" className="logo">
        <span className="dot" />
        PCFORGE
      </Link>
      <div className="navlinks">
        {categories.map((c) => (
          <Link key={c.slug} to={`/shop/${c.slug}`}>
            {c.label}
          </Link>
        ))}
        <Link to="/shop">All Parts</Link>
      </div>
      <div className="nav-right">
        {user ? (
          <button className="link-btn" onClick={logout}>
            {user.name.split(" ")[0]} · Sign out
          </button>
        ) : (
          <Link to="/login" className="link-btn">
            Sign in
          </Link>
        )}
        <Link to="/cart" className="cart-pill">
          CART ({count})
        </Link>
      </div>
    </nav>
  );
}
