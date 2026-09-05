import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./ExplodedHero.css";

gsap.registerPlugin(ScrollTrigger);

// Resting position of each part BEFORE explode — this is what makes it
// look like an assembled PC at scroll = 0. Values are px offsets from
// the rig's center.
const rest = {
  "p-mobo": { x: 35, y: -5 },
  "p-cpu": { x: -25, y: -145 },
  "p-cool": { x: -25, y: -145 }, // sits directly on the CPU
  "p-ram1": { x: 25, y: -115 },
  "p-ram2": { x: 52, y: -115 },
  "p-gpu": { x: 35, y: 75 },
  "p-ssd": { x: 135, y: 165 },
  "p-psu": { x: 35, y: 175 },
};

// Additional movement added ON TOP of rest as the user scrolls.
const explodeDelta = {
  "p-mobo": { x: -170, y: 10, r: -3 },
  "p-cpu": { x: -150, y: -60, r: -10 },
  "p-cool": { x: 0, y: -180, r: 20 },
  "p-ram1": { x: -15, y: -170, r: -8 },
  "p-ram2": { x: 60, y: -170, r: 8 },
  "p-gpu": { x: 215, y: 5, r: 5 },
  "p-ssd": { x: 150, y: -50, r: 6 },
  "p-psu": { x: -15, y: 150, r: 0 },
};

// Where each label ends up (absolute offset from rig center), placed
// just beyond that part's fully-exploded position.
const labelPos = {
  "l-case": { x: 0, y: 260 },
  "l-mobo": { x: -280, y: 5 },
  "l-cpu": { x: -300, y: -205 },
  "l-cool": { x: -25, y: -365 },
  "l-ram": { x: 60, y: -320 },
  "l-gpu": { x: 340, y: 80 },
  "l-ssd": { x: 350, y: 115 },
  "l-psu": { x: 30, y: 365 },
};

const partStyle = (id) => ({
  left: `calc(50% + ${rest[id].x}px)`,
  top: `calc(50% + ${rest[id].y}px)`,
});

export default function ExplodedHero() {
  const wrapRef = useRef(null);
  const rigRef = useRef(null);
  const fillRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: wrapRef.current,
          start: "top top",
          end: "bottom bottom",
          scrub: 0.6,
          onUpdate: (self) => {
            if (fillRef.current) fillRef.current.style.height = self.progress * 100 + "%";
          },
        },
      });

      tl.to({}, { duration: 0.15 });

      Object.entries(explodeDelta).forEach(([id, cfg]) => {
        tl.to(`#${id}`, { x: cfg.x, y: cfg.y, rotation: cfg.r, duration: 1, ease: "power2.out" }, "<0.02");
      });

      // case fades out (opens up) instead of moving
      tl.to("#p-case", { opacity: 0.12, duration: 1 }, "<");

      Object.entries(labelPos).forEach(([id, cfg]) => {
        tl.to(`#${id}`, { opacity: 1, x: cfg.x, y: cfg.y, duration: 0.6, ease: "power1.out" }, "<0.1");
      });

      gsap.to(".hero-text", {
        opacity: 0,
        y: -20,
        ease: "none",
        scrollTrigger: { trigger: wrapRef.current, start: "10% top", end: "26% top", scrub: true },
      });

      gsap.to(rigRef.current, {
        scale: 1.04,
        scrollTrigger: { trigger: wrapRef.current, start: "top top", end: "bottom bottom", scrub: 1 },
      });
    }, wrapRef);

    return () => ctx.revert();
  }, []);

  return (
    <div className="hero-wrap" ref={wrapRef}>
      <div className="hero-pin">
        <div className="grid-bg" />

        <div className="hero-text">
          <div className="hero-eyebrow">
            PCFORGE / <b>COMPONENT ARCHIVE</b> 
          </div>
          <div className="hero-headline">
            Every part.
            <br />
            Precisely placed.
            
          </div>
        </div>

        <div className="rig-wrap">
          <div className="rig" ref={rigRef}>
            {/* Case shell */}
            <div className="part" id="p-case" style={partStyle("p-mobo") && { left: "50%", top: "50%" }}></div>
            <div className="part" id="p-case" style={partStyle("p-mobo") && { left: "50%", top: "50%" }}>
              <svg width="400" height="460" viewBox="0 0 400 460" fill="none">
                <rect x="4" y="4" width="392" height="452" rx="12" stroke="#33333a" strokeWidth="2" />
                {/* front intake strip */}
                <rect x="4" y="4" width="60" height="452" rx="12" stroke="#33333a" strokeWidth="1.2" />
                <circle cx="34" cy="90" r="20" stroke="#2b2b30" strokeWidth="1" />
                <circle cx="34" cy="150" r="20" stroke="#2b2b30" strokeWidth="1" />
                <circle cx="34" cy="210" r="20" stroke="#2b2b30" strokeWidth="1" />
                {/* io / power button */}
                <circle cx="34" cy="30" r="6" stroke="#55555e" strokeWidth="1.2" />
                {/* glass panel hint on main chamber */}
                <rect x="80" y="24" width="300" height="412" rx="6" stroke="#242428" strokeWidth="1" strokeDasharray="4 5" />
                {/* feet */}
                <rect x="20" y="448" width="30" height="8" rx="2" stroke="#33333a" />
                <rect x="350" y="448" width="30" height="8" rx="2" stroke="#33333a" />
              </svg>
            </div>

            {/* Motherboard */}
            <div className="part" id="p-mobo" style={partStyle("p-mobo")}>
              <svg width="260" height="340" viewBox="0 0 260 340" fill="none">
                <rect x="1" y="1" width="258" height="338" rx="4" fill="#141417" stroke="#3a3a42" strokeWidth="1.5" />
                <rect x="16" y="16" width="56" height="56" rx="2" stroke="#55555e" />
                <line x1="16" y1="96" x2="96" y2="96" stroke="#2b2b30" />
                <line x1="16" y1="106" x2="96" y2="106" stroke="#2b2b30" />
                <line x1="16" y1="116" x2="96" y2="116" stroke="#2b2b30" />
                <rect x="16" y="230" width="228" height="34" fill="none" stroke="#2b2b30" />
                <rect x="150" y="16" width="90" height="20" fill="none" stroke="#2b2b30" />
                <rect x="150" y="44" width="90" height="20" fill="none" stroke="#2b2b30" />
              </svg>
            </div>

            {/* CPU */}
            <div className="part" id="p-cpu" style={partStyle("p-cpu")}>
              <svg width="70" height="70" viewBox="0 0 70 70" fill="none">
                <rect x="2" y="2" width="66" height="66" rx="3" fill="#1c1c1f" stroke="#c9c9d0" strokeWidth="1.4" />
                <rect x="16" y="16" width="38" height="38" fill="none" stroke="#55555e" />
              </svg>
            </div>

            {/* GPU */}
            <div className="part" id="p-gpu" style={partStyle("p-gpu")}>
              <svg width="230" height="90" viewBox="0 0 230 90" fill="none">
                <rect x="1" y="1" width="228" height="62" rx="4" fill="#161619" stroke="#3a3a42" strokeWidth="1.5" />
                <circle cx="55" cy="32" r="24" stroke="#55555e" strokeWidth="1.2" />
                <circle cx="135" cy="32" r="24" stroke="#55555e" strokeWidth="1.2" />
                <rect x="1" y="66" width="55" height="10" fill="#1c1c1f" stroke="#3a3a42" />
              </svg>
            </div>

            {/* RAM x2 */}
            <div className="part" id="p-ram1" style={partStyle("p-ram1")}>
              <svg width="18" height="130" viewBox="0 0 18 130" fill="none">
                <rect x="1" y="1" width="16" height="128" fill="#18181b" stroke="#9a9aa3" strokeWidth="1.2" />
                <line x1="1" y1="28" x2="17" y2="28" stroke="#3a3a42" />
              </svg>
            </div>
            <div className="part" id="p-ram2" style={partStyle("p-ram2")}>
              <svg width="18" height="130" viewBox="0 0 18 130" fill="none">
                <rect x="1" y="1" width="16" height="128" fill="#18181b" stroke="#9a9aa3" strokeWidth="1.2" />
                <line x1="1" y1="28" x2="17" y2="28" stroke="#3a3a42" />
              </svg>
            </div>

            {/* SSD */}
            <div className="part" id="p-ssd" style={partStyle("p-ssd")}>
              <svg width="80" height="32" viewBox="0 0 80 32" fill="none">
                <rect x="1" y="1" width="78" height="30" rx="3" fill="#161619" stroke="#55555e" strokeWidth="1.2" />
                <rect x="8" y="8" width="24" height="16" fill="none" stroke="#33333a" />
              </svg>
            </div>

            {/* PSU */}
            <div className="part" id="p-psu" style={partStyle("p-psu")}>
              <svg width="150" height="80" viewBox="0 0 150 80" fill="none">
                <rect x="1" y="1" width="148" height="78" rx="3" fill="#141417" stroke="#3a3a42" strokeWidth="1.5" />
                <circle cx="75" cy="40" r="24" stroke="#55555e" strokeWidth="1.2" />
                <circle cx="75" cy="40" r="4" fill="#55555e" />
              </svg>
            </div>

            {/* Cooler */}
            <div className="part" id="p-cool" style={partStyle("p-cool")}>
              <svg width="90" height="90" viewBox="0 0 90 90" fill="none">
                <circle cx="45" cy="45" r="43" stroke="#c9c9d0" strokeWidth="1.4" />
                <circle cx="45" cy="45" r="9" fill="#1c1c1f" stroke="#9a9aa3" />
                <g stroke="#55555e">
                  <line x1="45" y1="6" x2="45" y2="27" />
                  <line x1="45" y1="63" x2="45" y2="84" />
                  <line x1="6" y1="45" x2="27" y2="45" />
                  <line x1="63" y1="45" x2="84" y2="45" />
                </g>
              </svg>
            </div>

            {/* Labels */}
            <div className="label" id="l-case">
              <span className="tick" />
              <b>Cabinet</b>
            </div>
            <div className="label" id="l-mobo">
              <span className="tick" />
              <b>Motherboard</b>
            </div>
            <div className="label" id="l-cpu">
              <span className="tick" />
              <b>CPU</b>
            </div>
            <div className="label" id="l-gpu">
              <span className="tick" />
              <b>GPU</b>
            </div>
            <div className="label" id="l-ram">
              <span className="tick" />
              <b>RAM</b>
            </div>
            <div className="label" id="l-ssd">
              <span className="tick" />
              <b>SSD</b>
            </div>
            <div className="label" id="l-psu">
              <span className="tick" />
              <b>PSU</b>
            </div>
            <div className="label" id="l-cool">
              <span className="tick" />
              <b>Cooler</b>
            </div>
          </div>
        </div>

        <div className="progress-rail">
          <div className="progress-fill" ref={fillRef} />
        </div>
        </div>
    </div>
  );
}