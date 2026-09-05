import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <section
      className="container"
      style={{
        paddingTop: 200,
        paddingBottom: 160,
        textAlign: "center",
        minHeight: "60vh",
      }}
    >
      <h1 style={{ fontFamily: "var(--display)", fontSize: 64, fontWeight: 700 }}>404</h1>
      <p className="mono" style={{ color: "var(--steel)", marginTop: 12 }}>
        This component isn't in the archive.
      </p>
      <Link
        to="/"
        className="mono"
        style={{ display: "inline-block", marginTop: 28, color: "var(--silver)" }}
      >
        ← Back to home
      </Link>
    </section>
  );
}
