/* eslint-disable */
// @ts-nocheck
// Componentes del sistema de diseño de Platita.pe (Claude Design), portados
// desde su bundle compilado. Generado; editar con cuidado.
"use client";
import React from "react";
import { resetConsent } from "@/lib/analytics";

const __ds_ns = {};

const __ds_scope = {};

(__ds_ns.__errors = __ds_ns.__errors || []);

// components/cards/Card.jsx
try { (() => {
const {
  useState
} = React;
const V = {
  default: {
    background: "#ffffff",
    border: "1px solid #d2dcea",
    boxShadow: "var(--shadow-card)"
  },
  lavender: {
    background: "#ffffff",
    border: "1px solid #e6e3f5",
    boxShadow: "0 1px 4px rgba(28,15,76,0.06), 0 4px 20px rgba(28,15,76,0.04)"
  },
  featured: {
    background: "#ffffff",
    border: "1px solid #6cdcff",
    boxShadow: "var(--shadow-card-featured)"
  },
  highlight: {
    background: "var(--grad-highlight)",
    border: "1px solid rgba(188,69,233,0.4)",
    boxShadow: "var(--shadow-highlight)",
    color: "#fff"
  },
  glass: {
    background: "rgba(255,255,255,0.04)",
    border: "1px solid rgba(255,255,255,0.1)",
    backdropFilter: "blur(16px)",
    color: "#fff"
  },
  info: {
    background: "rgba(108,220,255,0.06)",
    border: "1px solid rgba(108,220,255,0.28)"
  }
};
function Card({
  children,
  variant = "default",
  radius = 24,
  padding = 24,
  hoverLift,
  style
}) {
  const [h, setH] = useState(false);
  return /*#__PURE__*/React.createElement("div", {
    onMouseEnter: () => setH(true),
    onMouseLeave: () => setH(false),
    style: {
      borderRadius: radius,
      padding,
      position: "relative",
      overflow: "hidden",
      fontFamily: "var(--font-sans)",
      transition: "all .3s",
      transform: hoverLift && h ? "translateY(-" + (hoverLift === true ? 8 : hoverLift) + "px)" : "none",
      ...V[variant],
      ...style
    }
  }, children);
}
Object.assign(__ds_scope, { Card });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/cards/Card.jsx", error: String((e && e.message) || e) }); }

// components/cards/StatTile.jsx
try { (() => {
const T = {
  lavender: ["#f5f3fc", "#a234cc"],
  surface: ["#eef2f9", "#1c0f4c"],
  success: ["rgba(34,197,94,0.07)", "#16a34a"],
  cyan: ["rgba(108,220,255,0.10)", "#0097b2"],
  soft: ["#f6f7fb", "#1c0f4c"]
};
function StatTile({
  label,
  value,
  caption,
  tone = "surface",
  variant = "tile"
}) {
  const [bg, fg] = T[tone] || T.surface;
  if (variant === "mini") return /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      background: "#f6f7fb",
      borderRadius: 10,
      border: "1px solid #e6e9f2",
      padding: "9px 11px",
      fontFamily: "var(--font-sans)"
    }
  }, /*#__PURE__*/React.createElement("p", {
    style: {
      color: "rgba(28,15,76,0.55)",
      fontSize: "0.68rem",
      fontWeight: 800,
      letterSpacing: "0.06em",
      textTransform: "uppercase",
      margin: 0
    }
  }, label), /*#__PURE__*/React.createElement("p", {
    style: {
      color: "#1c0f4c",
      fontWeight: 800,
      fontSize: "0.9rem",
      margin: "3px 0 0"
    }
  }, value));
  return /*#__PURE__*/React.createElement("div", {
    style: {
      borderRadius: 16,
      padding: 14,
      background: bg,
      fontFamily: "var(--font-sans)"
    }
  }, /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: "0.65rem",
      fontWeight: 600,
      color: "rgba(15,10,46,0.66)",
      margin: 0
    }
  }, label), /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: 18,
      fontWeight: 900,
      margin: "4px 0 0",
      color: fg
    }
  }, value), caption ? /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: "0.62rem",
      color: "rgba(15,10,46,0.66)",
      margin: 0
    }
  }, caption) : null);
}
Object.assign(__ds_scope, { StatTile });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/cards/StatTile.jsx", error: String((e && e.message) || e) }); }

// components/core/Badge.jsx
try { (() => {
const TONES = {
  magenta: {
    color: "var(--magenta-600)",
    background: "rgba(188,69,233,0.10)",
    border: "1px solid rgba(188,69,233,0.28)"
  },
  cyan: {
    color: "var(--cyan-700)",
    background: "rgba(108,220,255,0.12)",
    border: "1px solid rgba(108,220,255,0.35)"
  },
  success: {
    color: "var(--success-600)",
    background: "rgba(34,197,94,0.10)",
    border: "1px solid transparent"
  },
  navy: {
    color: "#fff",
    background: "var(--grad-sim-badge)",
    border: "1px solid transparent"
  },
  neutral: {
    color: "var(--navy-800)",
    background: "rgba(28,15,76,0.03)",
    border: "1px solid rgba(28,15,76,0.08)"
  }
};
function Badge({
  children,
  tone = "magenta",
  icon,
  dot,
  size = "md",
  uppercase,
  style
}) {
  const t = TONES[tone] || TONES.magenta;
  const sz = size === "sm" ? {
    padding: "4px 8px",
    fontSize: 9,
    fontWeight: 800
  } : size === "lg" ? {
    padding: "8px 16px",
    fontSize: 12,
    fontWeight: 900,
    letterSpacing: "0.1em"
  } : {
    padding: "6px 12px",
    fontSize: 12,
    fontWeight: 700
  };
  return /*#__PURE__*/React.createElement("span", {
    style: {
      display: "inline-flex",
      alignItems: "center",
      gap: 6,
      borderRadius: 9999,
      whiteSpace: "nowrap",
      fontFamily: "var(--font-sans)",
      textTransform: uppercase ? "uppercase" : undefined,
      ...t,
      ...sz,
      ...style
    }
  }, dot ? /*#__PURE__*/React.createElement("span", {
    style: {
      width: 6,
      height: 6,
      borderRadius: "50%",
      background: "currentColor",
      boxShadow: "0 0 6px currentColor",
      animation: "pulse-dot 2s infinite",
      flexShrink: 0
    }
  }) : null, icon, children);
}
Object.assign(__ds_scope, { Badge });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Badge.jsx", error: String((e && e.message) || e) }); }

// components/core/Button.jsx
try { (() => {
const {
  useState
} = React;
const SIZES = {
  sm: {
    padding: "8px 20px",
    fontSize: 14,
    borderRadius: 9999
  },
  md: {
    padding: "16px 32px",
    fontSize: 16,
    borderRadius: 9999
  },
  hero: {
    padding: "17px 36px",
    fontSize: 16,
    borderRadius: 14
  },
  card: {
    padding: "11px",
    fontSize: "0.82rem",
    fontWeight: 800,
    borderRadius: 12
  },
  block: {
    padding: "16px",
    fontSize: 18,
    borderRadius: 16
  }
};
function Button({
  children,
  variant = "gradient",
  size = "md",
  href,
  onClick,
  fullWidth,
  disabled,
  loading,
  trailingArrow,
  icon,
  type = "button",
  style
}) {
  const [h, setH] = useState(false);
  const s = SIZES[size] || SIZES.md;
  const base = {
    display: fullWidth ? "flex" : "inline-flex",
    width: fullWidth ? "100%" : undefined,
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    fontFamily: "var(--font-sans)",
    fontWeight: 700,
    textDecoration: "none",
    cursor: disabled ? "not-allowed" : "pointer",
    border: "none",
    opacity: disabled || loading ? 0.7 : 1,
    transition: "all .3s ease",
    ...s
  };
  const V = {
    gradient: {},
    outline: {
      background: h ? "rgba(255,255,255,0.08)" : "transparent",
      border: "1px solid " + (h ? "rgba(255,255,255,0.4)" : "rgba(255,255,255,0.2)"),
      color: "#fff",
      fontWeight: 600,
      transform: h ? "translateY(-1px)" : "none"
    },
    light: {
      background: h ? "rgba(28,15,76,0.08)" : "#ffffff",
      border: "1px solid rgba(28,15,76,0.12)",
      color: "var(--magenta-600)",
      fontWeight: 800
    },
    link: {
      background: "transparent",
      padding: 0,
      color: h ? "var(--magenta-600)" : "var(--navy-800)",
      fontSize: "0.95rem",
      fontWeight: 700
    },
    whatsapp: {
      background: "var(--whatsapp-dark)",
      color: "#fff",
      boxShadow: "0 4px 20px rgba(37,211,102,0.3)",
      opacity: h ? 0.9 : 1,
      borderRadius: 12,
      padding: "10px 20px",
      fontSize: 14
    }
  };
  const Tag = href ? "a" : "button";
  const content = /*#__PURE__*/React.createElement(React.Fragment, null, loading ? /*#__PURE__*/React.createElement("svg", {
    width: "20",
    height: "20",
    viewBox: "0 0 24 24",
    fill: "none",
    style: {
      animation: "spin 1s linear infinite"
    }
  }, /*#__PURE__*/React.createElement("circle", {
    cx: "12",
    cy: "12",
    r: "10",
    stroke: "currentColor",
    strokeWidth: "4",
    opacity: ".25"
  }), /*#__PURE__*/React.createElement("path", {
    fill: "currentColor",
    opacity: ".75",
    d: "M4 12a8 8 0 018-8v8H4z"
  })) : icon, /*#__PURE__*/React.createElement("span", null, loading ? "Enviando..." : children), trailingArrow && !loading ? /*#__PURE__*/React.createElement("span", {
    "aria-hidden": "true"
  }, "\u2192") : null);
  return /*#__PURE__*/React.createElement(Tag, {
    href: href,
    type: href ? undefined : type,
    onClick: disabled ? undefined : onClick,
    disabled: href ? undefined : disabled,
    className: variant === "gradient" ? "btn-gradient" : undefined,
    onMouseEnter: () => setH(true),
    onMouseLeave: () => setH(false),
    style: {
      ...base,
      ...V[variant],
      ...style
    }
  }, content);
}
Object.assign(__ds_scope, { Button });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Button.jsx", error: String((e && e.message) || e) }); }

// components/core/Eyebrow.jsx
try { (() => {
function Eyebrow({
  children,
  variant = "plain",
  color,
  align = "left",
  style
}) {
  const c = color || (variant === "rule" ? "var(--magenta-600)" : variant === "dark" ? "var(--cyan-400)" : "var(--navy-800)");
  const rule = /*#__PURE__*/React.createElement("span", {
    style: {
      height: 2,
      width: variant === "dark" ? 28 : 24,
      background: c,
      flexShrink: 0
    }
  });
  const wrap = {
    display: "inline-flex",
    alignItems: "center",
    gap: variant === "plain" ? 8 : 10,
    fontFamily: "var(--font-sans)",
    color: c,
    textTransform: "uppercase",
    justifyContent: align === "center" ? "center" : "flex-start",
    ...style
  };
  if (variant === "rule") return /*#__PURE__*/React.createElement("div", {
    style: {
      ...wrap,
      fontSize: 12,
      fontWeight: 900,
      letterSpacing: "0.16em"
    }
  }, rule, children);
  if (variant === "dark") return /*#__PURE__*/React.createElement("div", {
    style: {
      ...wrap,
      fontSize: "0.72rem",
      fontWeight: 900,
      letterSpacing: "0.18em"
    }
  }, rule, children, rule);
  if (variant === "dot") return /*#__PURE__*/React.createElement("span", {
    style: {
      ...wrap,
      fontSize: 12,
      fontWeight: 700,
      letterSpacing: "0.1em"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 6,
      height: 6,
      borderRadius: "50%",
      background: "var(--cyan-400)",
      boxShadow: "0 0 6px #6cdcff",
      animation: "pulse-dot 1.5s infinite"
    }
  }), children);
  return /*#__PURE__*/React.createElement("span", {
    style: {
      ...wrap,
      fontSize: 12,
      fontWeight: 700,
      letterSpacing: "0.1em"
    }
  }, children);
}
Object.assign(__ds_scope, { Eyebrow });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Eyebrow.jsx", error: String((e && e.message) || e) }); }

// components/core/Icon.jsx
try { (() => {
// Platita.pe custom icon set — duotone, 24px grid, rounded geometry (echoes Nunito's rounded terminals).
// Each glyph = [soft accent fill layer, line layer]. Line: round caps/joins, 3–3.5px corner radii.
const P = {
  check: ['', '<path d="M5 12.5l4.2 4.2L19 7"/>'],
  trending: ['<path d="M3.5 17.5l5.5-5.5 4 4 7.5-7.5V20h-17z"/>', '<path d="M3.5 17l5.5-5.5 4 4 7-7"/><path d="M15 8h5v5"/>'],
  calendarCheck: ['<path d="M3.5 8.5a3.5 3.5 0 013.5-3.5h10a3.5 3.5 0 013.5 3.5V10h-17z"/>', '<rect x="3.5" y="5" width="17" height="15.5" rx="3.5"/><path d="M8 3v4M16 3v4M3.5 10h17"/><path d="M9 15.2l2 2 4-4"/>'],
  calendar: ['<path d="M3.5 8.5a3.5 3.5 0 013.5-3.5h10a3.5 3.5 0 013.5 3.5V10h-17z"/>', '<rect x="3.5" y="5" width="17" height="15.5" rx="3.5"/><path d="M8 3v4M16 3v4M3.5 10h17"/><path d="M8 14h.01M12 14h.01M16 14h.01M8 17.5h.01M12 17.5h.01"/>'],
  shield: ['<path d="M12 3l7.5 3v5.5c0 4.6-3.2 8-7.5 9.5-4.3-1.5-7.5-4.9-7.5-9.5V6z"/>', '<path d="M12 3l7.5 3v5.5c0 4.6-3.2 8-7.5 9.5-4.3-1.5-7.5-4.9-7.5-9.5V6z"/><path d="M9 12l2.2 2.2L15.5 10"/>'],
  calculator: ['<rect x="7.5" y="5.5" width="9" height="4" rx="1.2"/>', '<rect x="4.5" y="2.5" width="15" height="19" rx="3.5"/><rect x="7.5" y="5.5" width="9" height="4" rx="1.2"/><path d="M8.5 13.5h.01M12 13.5h.01M15.5 13.5h.01M8.5 17.5h.01M12 17.5h.01M15.5 17.5h.01"/>'],
  userCheck: ['<circle cx="9" cy="8" r="3.5"/>', '<circle cx="9" cy="8" r="3.5"/><path d="M3 20c.6-3.4 3-5.5 6-5.5s5.4 2.1 6 5.5"/><path d="M15.5 11l2 2 3.5-3.5"/>'],
  arrowUpCircle: ['<circle cx="12" cy="12" r="9"/>', '<circle cx="12" cy="12" r="9"/><path d="M12 16.5v-9M8.5 11L12 7.5l3.5 3.5"/>'],
  award: ['<circle cx="12" cy="9" r="5.5"/>', '<circle cx="12" cy="9" r="5.5"/><path d="M8.6 13.3L7 21l5-2.5 5 2.5-1.6-7.7"/><path d="M12 6.8v4.4M9.8 9h4.4"/>'],
  fileSign: ['<path d="M14 3H7.5A2.5 2.5 0 005 5.5v13A2.5 2.5 0 007.5 21h9a2.5 2.5 0 002.5-2.5V8z"/>', '<path d="M14 3H7.5A2.5 2.5 0 005 5.5v13A2.5 2.5 0 007.5 21h9a2.5 2.5 0 002.5-2.5V8z"/><path d="M14 3v5h5"/><path d="M8.5 12.5h7"/><path d="M8.5 17c1-1.2 1.8-1.2 2.4 0s1.4 1.2 2.2 0 1.6-1 2.4 0"/>'],
  user: ['<circle cx="12" cy="8" r="4"/>', '<circle cx="12" cy="8" r="4"/><path d="M4.5 20.5c.8-3.6 3.8-6 7.5-6s6.7 2.4 7.5 6"/>'],
  mail: ['<path d="M3.5 8L12 13.5 20.5 8V8a3 3 0 00-3-3h-11a3 3 0 00-3 3z"/>', '<rect x="3.5" y="5" width="17" height="14" rx="3"/><path d="M4 7.8l8 5.5 8-5.5"/>'],
  phone: ['<rect x="6.5" y="2.5" width="11" height="19" rx="3"/>', '<rect x="6.5" y="2.5" width="11" height="19" rx="3"/><path d="M10.5 18.5h3"/>'],
  building: ['<path d="M6.5 21V5.5a2 2 0 012-2h5a2 2 0 012 2V21z"/>', '<path d="M4 21h16"/><path d="M6.5 21V5.5a2 2 0 012-2h5a2 2 0 012 2V21"/><path d="M15.5 10.5h2a2 2 0 012 2V21"/><path d="M9.5 7.5h2M9.5 11h2M9.5 14.5h2"/>'],
  pin: ['<path d="M12 21s-6.5-5.4-6.5-11a6.5 6.5 0 0113 0c0 5.6-6.5 11-6.5 11z"/>', '<path d="M12 21s-6.5-5.4-6.5-11a6.5 6.5 0 0113 0c0 5.6-6.5 11-6.5 11z"/><circle cx="12" cy="10" r="2.5"/>'],
  wallet: ['<path d="M20.5 10.5H17a2.5 2.5 0 000 5h3.5z"/>', '<rect x="3.5" y="6.5" width="17" height="13.5" rx="3"/><path d="M6.5 6.5l9-2.8a1.5 1.5 0 012 1.4v1.4"/><path d="M20.5 10.5H17a2.5 2.5 0 000 5h3.5"/><path d="M17 13h.01"/>'],
  lock: ['<rect x="5" y="10.5" width="14" height="10" rx="3"/>', '<rect x="5" y="10.5" width="14" height="10" rx="3"/><path d="M8 10.5V8a4 4 0 018 0v2.5"/><path d="M12 14.5v2"/>'],
  coins: ['<circle cx="15" cy="15" r="5.5"/>', '<ellipse cx="9.5" cy="6.5" rx="6" ry="2.5"/><path d="M3.5 6.5v4c0 1.3 2.2 2.3 5 2.5"/><path d="M3.5 10.5v3.5c0 1.2 1.8 2.2 4.3 2.4"/><circle cx="15" cy="15" r="5.5"/><path d="M15 12.5v5"/>'],
  zap: ['<path d="M13 2.5L4.5 13.5H12l-1 8 8.5-11H12z"/>', '<path d="M13 2.5L4.5 13.5H12l-1 8 8.5-11H12z"/>'],
  tag: ['<path d="M3.5 5v5.8a2 2 0 00.6 1.4l8.2 8.2a2 2 0 002.8 0l5.3-5.3a2 2 0 000-2.8l-8.2-8.2a2 2 0 00-1.4-.6H5A1.5 1.5 0 003.5 5z"/>', '<path d="M3.5 5v5.8a2 2 0 00.6 1.4l8.2 8.2a2 2 0 002.8 0l5.3-5.3a2 2 0 000-2.8l-8.2-8.2a2 2 0 00-1.4-.6H5A1.5 1.5 0 003.5 5z"/><path d="M8 8h.01"/>'],
  urbanizacion: ['<path d="M13.5 20.5V12l3.5-3 3.5 3v8.5z"/>', '<path d="M2.5 20.5h19"/><path d="M4 20.5v-6l4-3.5 4 3.5v6"/><path d="M13.5 20.5V12l3.5-3 3.5 3v8.5"/><path d="M7 20.5v-3h2v3"/><path d="M16 15h2"/>'],
  remate: ['<rect x="10.2" y="2.6" width="10" height="5.2" rx="1.6" transform="rotate(45 15.2 5.2)"/>', '<rect x="10.2" y="2.6" width="10" height="5.2" rx="1.6" transform="rotate(45 15.2 5.2)"/><path d="M12.3 10.5L4.5 18.3"/><path d="M12 21h8"/>'],
  inmueble: ['<path d="M5.5 9.2V19a1.5 1.5 0 001.5 1.5h10a1.5 1.5 0 001.5-1.5V9.2L12 4.3z"/>', '<path d="M3.5 10.5L12 4l8.5 6.5"/><path d="M5.5 9v10a1.5 1.5 0 001.5 1.5h10a1.5 1.5 0 001.5-1.5V9"/><path d="M10 20.5v-4.5a2 2 0 014 0v4.5"/>'],
  construccion: ['<rect x="12" y="13" width="7.5" height="8" rx="1.5"/>', '<path d="M2.5 21h19"/><path d="M6.5 21V3.5"/><path d="M3.5 6h15.5"/><path d="M6.5 3.5L10 6"/><path d="M16 6v3.5"/><rect x="12" y="13" width="7.5" height="8" rx="1.5"/><path d="M14.5 16.5h2.5"/>'],
  home: ['<path d="M4 10.5L12 4l8 6.5V19a1.5 1.5 0 01-1.5 1.5h-13A1.5 1.5 0 014 19z"/>', '<path d="M4 10.5L12 4l8 6.5V19a1.5 1.5 0 01-1.5 1.5H15v-4.5a3 3 0 00-6 0v4.5H5.5A1.5 1.5 0 014 19z"/>'],
  invertir: ['<rect x="15" y="7" width="4" height="11" rx="1.3"/>', '<path d="M3.5 20.5h17"/><rect x="5" y="13" width="4" height="5" rx="1.3"/><rect x="10" y="10" width="4" height="8" rx="1.3"/><rect x="15" y="7" width="4" height="11" rx="1.3"/><path d="M5 9l5-4 3 2 4-3.5"/>'],
  cartera: ['<path d="M3.5 10a3 3 0 013-3h11a3 3 0 013 3v2.5h-17z"/>', '<rect x="3.5" y="7" width="17" height="13" rx="3"/><path d="M9 7V5.5A1.5 1.5 0 0110.5 4h3A1.5 1.5 0 0115 5.5V7"/><path d="M3.5 12.5h17"/><path d="M12 11.5v2"/>'],
  perfil: ['<circle cx="12" cy="12" r="9"/>', '<circle cx="12" cy="12" r="9"/><circle cx="12" cy="10" r="3"/><path d="M6.7 18.4c1.2-2.2 3.1-3.4 5.3-3.4s4.1 1.2 5.3 3.4"/>'],
  bell: ['<path d="M6 16.5V11a6 6 0 0112 0v5.5l1.5 2h-15z"/>', '<path d="M6 16.5V11a6 6 0 0112 0v5.5l1.5 2h-15z"/><path d="M10 21.2h4"/>'],
  grid: ['<rect x="13.5" y="3.5" width="7" height="7" rx="2"/>', '<rect x="3.5" y="3.5" width="7" height="7" rx="2"/><rect x="13.5" y="3.5" width="7" height="7" rx="2"/><rect x="3.5" y="13.5" width="7" height="7" rx="2"/><rect x="13.5" y="13.5" width="7" height="7" rx="2"/>'],
  banco: ['<path d="M3.5 9L12 4l8.5 5z"/>', '<path d="M3.5 9L12 4l8.5 5z"/><path d="M5.5 9v8.5M10 9v8.5M14 9v8.5M18.5 9v8.5"/><path d="M3 20.5h18"/>'],
  cajas: ['<rect x="3.5" y="5" width="17" height="13.5" rx="3"/>', '<rect x="3.5" y="5" width="17" height="13.5" rx="3"/><circle cx="12" cy="11.75" r="3"/><path d="M12 8.75v1M12 13.75v1M9 11.75h1M14 11.75h1"/><path d="M6.5 18.5V20M17.5 18.5V20"/>'],
  fondos: ['<path d="M12 3.5a8.5 8.5 0 018.5 8.5H12z"/>', '<path d="M12 3.5a8.5 8.5 0 108.5 8.5H12z"/><path d="M14.5 2.8a7 7 0 016.7 6.7h-6.7z"/>'],
  acciones: ['<rect x="13.5" y="5.5" width="4" height="9" rx="1.2"/>', '<path d="M8.5 4v3M8.5 15v3M15.5 3.5v2M15.5 14.5v3.5"/><rect x="6.5" y="7" width="4" height="8" rx="1.2"/><rect x="13.5" y="5.5" width="4" height="9" rx="1.2"/><path d="M3 21h18"/>'],
  info: ['<circle cx="12" cy="12" r="9"/>', '<circle cx="12" cy="12" r="9"/><path d="M12 11v5.5"/><path d="M12 7.7h.01"/>'],
  diamante: ['<path d="M3.5 9.5L12 20.5l8.5-11z"/>', '<path d="M7.5 4h9l4 5.5L12 20.5 3.5 9.5z"/><path d="M3.5 9.5h17"/><path d="M10 4l-1.5 5.5L12 20.5l3.5-11L14 4"/>'],
  escalon: ['<rect x="15.5" y="4" width="4.5" height="16" rx="1.5"/>', '<rect x="4" y="14" width="4.5" height="6" rx="1.5"/><rect x="9.75" y="9" width="4.5" height="11" rx="1.5"/><rect x="15.5" y="4" width="4.5" height="16" rx="1.5"/>'],
  sparkle: ['<path d="M12 3c.6 4.2 2.8 6.4 7 7-4.2.6-6.4 2.8-7 7-.6-4.2-2.8-6.4-7-7 4.2-.6 6.4-2.8 7-7z"/>', '<path d="M12 3c.6 4.2 2.8 6.4 7 7-4.2.6-6.4 2.8-7 7-.6-4.2-2.8-6.4-7-7 4.2-.6 6.4-2.8 7-7z"/><path d="M18.5 16.5v4M16.5 18.5h4"/>'],
  celebra: ['<path d="M4 20l4.5-12 7.5 7.5z"/>', '<path d="M4 20l4.5-12 7.5 7.5z"/><path d="M14 4.5c0 1.5 1 2 2 2s2 .5 2 2"/><path d="M19 12.5l1.5-.5M15.5 3v-.5M20.5 7.5h.01M11 8.5l1-1"/>'],
  x: ['', '<path d="M7 7l10 10M17 7L7 17"/>'],
  minus: ['', '<path d="M7 12h10"/>'],
  alert: ['<circle cx="12" cy="12" r="9"/>', '<circle cx="12" cy="12" r="9"/><path d="M12 7.5v5.5"/><path d="M12 16.5h.01"/>'],
  chevronDown: ['', '<path d="M6.5 9.5L12 15l5.5-5.5"/>'],
  play: ['', '<path d="M8 5.5v13a1 1 0 001.5.9l10.4-6.5a1 1 0 000-1.8L9.5 4.6A1 1 0 008 5.5z" fill="currentColor"/>']
};
const WA = 'M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z';
const STAR = 'M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z';
const ICON_NAMES = Object.keys(P).concat(["whatsapp", "star"]);
/** variant "duotone" (default) adds a soft accent fill under the line; "line" is stroke only. */
function Icon({
  name = "check",
  size = 20,
  color = "currentColor",
  accent,
  variant = "duotone",
  strokeWidth = 1.9,
  style
}) {
  if (name === "whatsapp" || name === "star") return /*#__PURE__*/React.createElement("svg", {
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: color,
    style: style,
    "aria-hidden": "true"
  }, /*#__PURE__*/React.createElement("path", {
    d: name === "star" ? STAR : WA
  }));
  const g = P[name] || ["", ""];
  return /*#__PURE__*/React.createElement("svg", {
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    style: {
      color,
      ...style
    },
    "aria-hidden": "true"
  }, variant === "duotone" && g[0] ? /*#__PURE__*/React.createElement("g", {
    fill: accent || color,
    stroke: "none",
    opacity: 0.22,
    dangerouslySetInnerHTML: {
      __html: g[0]
    }
  }) : null, /*#__PURE__*/React.createElement("g", {
    fill: "none",
    stroke: color,
    strokeWidth: Math.min(strokeWidth, 2.2),
    strokeLinecap: "round",
    strokeLinejoin: "round",
    dangerouslySetInnerHTML: {
      __html: g[1]
    }
  }));
}
Object.assign(__ds_scope, { ICON_NAMES, Icon });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Icon.jsx", error: String((e && e.message) || e) }); }

// components/cards/CalloutChip.jsx
try { (() => {
function CalloutChip({
  children,
  icon = "trending"
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: 12,
      padding: "14px 20px",
      borderRadius: 16,
      background: "#f5f3fc",
      border: "1px solid #e0ddf2",
      fontFamily: "var(--font-sans)",
      flexShrink: 0
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: 40,
      height: 40,
      borderRadius: 12,
      background: "rgba(188,69,233,0.10)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      flexShrink: 0
    }
  }, /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: icon,
    size: 20,
    color: "#bc45e9",
    strokeWidth: 2.2
  })), /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: 14,
      fontWeight: 600,
      color: "#1c0f4c",
      margin: 0,
      maxWidth: 200
    }
  }, children));
}
Object.assign(__ds_scope, { CalloutChip });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/cards/CalloutChip.jsx", error: String((e && e.message) || e) }); }

// components/cards/FeatureRow.jsx
try { (() => {
function FeatureRow({
  mark = "S/",
  icon,
  tone = "cyan",
  text,
  accent,
  tail
}) {
  const t = tone === "cyan" ? {
    bg: "rgba(108,220,255,0.20)",
    fg: "#0e8fb0"
  } : {
    bg: "rgba(188,69,233,0.12)",
    fg: "#a234cc"
  };
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: 16,
      padding: "14px 0",
      borderBottom: "1px solid rgba(28,15,76,0.10)",
      fontFamily: "var(--font-sans)"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: 44,
      height: 44,
      flexShrink: 0,
      borderRadius: 13,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontSize: 15,
      fontWeight: 900,
      background: t.bg,
      color: t.fg
    }
  }, icon ? /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: icon,
    size: 22,
    color: t.fg
  }) : mark), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: "1.0625rem",
      fontWeight: 600,
      color: "#1c0f4c"
    }
  }, text, /*#__PURE__*/React.createElement("span", {
    style: {
      color: t.fg
    }
  }, accent), tail));
}
Object.assign(__ds_scope, { FeatureRow });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/cards/FeatureRow.jsx", error: String((e && e.message) || e) }); }

// components/cards/PlanCard.jsx
try { (() => {
const {
  useState
} = React;
const TIERS = {
  1: {
    c: "#007a96",
    icon: "wallet",
    name: "Inicial"
  },
  2: {
    c: "#3f6fd8",
    icon: "cartera",
    name: "Crecimiento"
  },
  3: {
    c: "#7a45d6",
    icon: "escalon",
    name: "Avanzado"
  },
  4: {
    c: "#a234cc",
    icon: "diamante",
    name: "Premium"
  }
};
function PlanCard({
  tier = 1,
  min = "S/ 10,000",
  rate = 14,
  accent,
  name,
  featured,
  badge = "Top",
  iconSrc
}) {
  const [h, setH] = useState(false);
  const T = TIERS[tier] || TIERS[1];
  const a = accent || T.c;
  const isTop = featured ?? tier === 4;
  const shell = isTop ? {
    background: "linear-gradient(165deg,#1c0f4c 0%,#3b1574 55%,#7a2fb0 100%)",
    border: "1px solid rgba(188,69,233,0.45)",
    boxShadow: "0 18px 48px rgba(188,69,233,0.30), 0 4px 14px rgba(28,15,76,0.18)",
    color: "#fff"
  } : {
    background: "#fff",
    border: "1px solid #d2dcea",
    boxShadow: "0 1px 3px rgba(8,10,30,0.04), 0 8px 24px rgba(8,10,30,0.06)"
  };
  const ink = isTop ? "#fff" : "#1c0f4c",
    muted = isTop ? "rgba(255,255,255,0.72)" : "rgba(15,10,46,0.66)",
    rateC = isTop ? "#fff" : a,
    hair = isTop ? "rgba(255,255,255,0.14)" : "rgba(28,15,76,0.08)";
  return /*#__PURE__*/React.createElement("div", {
    onMouseEnter: () => setH(true),
    onMouseLeave: () => setH(false),
    style: {
      position: "relative",
      borderRadius: 24,
      padding: "48px 24px 24px",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      textAlign: "center",
      gap: 16,
      fontFamily: "var(--font-sans)",
      transition: "all .3s",
      transform: h ? "translateY(-6px)" : isTop ? "translateY(-8px)" : "none",
      ...shell
    }
  }, isTop ? /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      inset: 0,
      borderRadius: 24,
      pointerEvents: "none",
      background: "radial-gradient(ellipse at 75% 10%, rgba(108,220,255,0.22) 0%, transparent 60%)"
    }
  }) : null, /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      left: "50%",
      top: 0,
      transform: "translate(-50%,-50%)",
      width: 64,
      height: 64,
      borderRadius: "50%",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      background: isTop ? "var(--grad-brand)" : "#fff",
      border: isTop ? "3px solid #fff" : "2px solid " + a,
      boxShadow: isTop ? "0 8px 24px rgba(188,69,233,0.45)" : "0 4px 12px rgba(28,15,76,0.08)"
    }
  }, iconSrc ? /*#__PURE__*/React.createElement("img", {
    src: iconSrc,
    alt: "",
    style: {
      width: 38,
      height: 38,
      objectFit: "contain"
    }
  }) : /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: T.icon,
    size: 30,
    color: isTop ? "#fff" : a,
    accent: isTop ? "#fff" : a
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative"
    }
  }, isTop && badge ? /*#__PURE__*/React.createElement("div", {
    style: {
      display: "inline-flex",
      alignItems: "center",
      gap: 4,
      marginBottom: 8,
      padding: "3px 9px",
      borderRadius: 9999,
      fontSize: 10,
      fontWeight: 900,
      letterSpacing: "0.04em",
      textTransform: "uppercase",
      whiteSpace: "nowrap",
      background: "rgba(108,220,255,0.18)",
      border: "1px solid rgba(108,220,255,0.45)",
      color: "#6cdcff"
    }
  }, /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: "sparkle",
    size: 11,
    variant: "line",
    color: "#6cdcff"
  }), badge) : null, /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: 14,
      fontWeight: 900,
      letterSpacing: "0.1em",
      textTransform: "uppercase",
      color: isTop ? "#6cdcff" : a,
      margin: 0
    }
  }, "Plan ", tier), /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: 12,
      fontWeight: 700,
      color: muted,
      margin: "2px 0 0"
    }
  }, name || T.name), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 4,
      justifyContent: "center",
      marginTop: 10
    }
  }, [1, 2, 3, 4].map(i => /*#__PURE__*/React.createElement("span", {
    key: i,
    style: {
      width: 22,
      height: 6,
      borderRadius: 9999,
      background: i <= tier ? isTop ? "var(--grad-brand-h)" : a : isTop ? "rgba(255,255,255,0.18)" : "rgba(28,15,76,0.10)"
    }
  }))), /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: 12,
      fontWeight: 700,
      color: muted,
      margin: "12px 0 0"
    }
  }, "Desde"), /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: 24,
      fontWeight: 900,
      margin: "2px 0 0",
      color: ink
    }
  }, min)), /*#__PURE__*/React.createElement("div", {
    style: {
      height: 1,
      width: "100%",
      background: hair
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative"
    }
  }, /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: 12,
      fontWeight: 600,
      color: muted,
      margin: 0
    }
  }, "Hasta"), /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: 60,
      fontWeight: 900,
      lineHeight: 1,
      margin: "6px 0 0",
      color: rateC
    }
  }, rate, "%"), /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: 12,
      fontWeight: 600,
      color: muted,
      margin: "4px 0 0"
    }
  }, "rentabilidad anual")), /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative",
      display: "flex",
      alignItems: "center",
      gap: 5,
      padding: "6px 10px",
      borderRadius: 9999,
      fontSize: 11,
      fontWeight: 700,
      whiteSpace: "nowrap",
      background: isTop ? "rgba(255,255,255,0.10)" : a + "12",
      border: "1px solid " + (isTop ? "rgba(255,255,255,0.25)" : a + "35"),
      color: isTop ? "#fff" : a
    }
  }, /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: "calendarCheck",
    size: 14,
    variant: "line",
    color: isTop ? "#fff" : a
  }), "Ingresos mensuales"));
}
Object.assign(__ds_scope, { PlanCard });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/cards/PlanCard.jsx", error: String((e && e.message) || e) }); }

// components/cards/ProjectCard.jsx
try { (() => {
const {
  useState
} = React;
function ProjectCard({
  name,
  icon = "urbanizacion",
  accent = "#007a96",
  image,
  bullets = [],
  plazo = "12 meses",
  min = "S/ 10,000",
  featured,
  cta = "Quiero invertir",
  onCta
}) {
  const [h, setH] = useState(false);
  return /*#__PURE__*/React.createElement("div", {
    onMouseEnter: () => setH(true),
    onMouseLeave: () => setH(false),
    style: {
      display: "flex",
      flexDirection: "column",
      borderRadius: 24,
      overflow: "hidden",
      background: "#fff",
      height: "100%",
      fontFamily: "var(--font-sans)",
      transition: "all .3s",
      transform: h ? "translateY(-8px)" : "none",
      border: featured ? "1px solid #6cdcff" : "1px solid #d2dcea",
      boxShadow: featured ? "var(--shadow-card-featured)" : "var(--shadow-card-lift)"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      padding: "20px 20px 0",
      display: "flex",
      alignItems: "center",
      gap: 12
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: 44,
      height: 44,
      flexShrink: 0,
      borderRadius: 16,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      background: "rgba(28,15,76,0.05)",
      border: "1px solid rgba(28,15,76,0.09)"
    }
  }, /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: icon,
    size: 22,
    color: accent
  })), /*#__PURE__*/React.createElement("h3", {
    style: {
      color: "#1c0f4c",
      fontWeight: 800,
      fontSize: "1rem",
      margin: 0,
      lineHeight: 1.2
    }
  }, name)), /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative",
      height: 150,
      margin: "16px 20px 0",
      borderRadius: 16,
      overflow: "hidden",
      background: "#1c0f4c"
    }
  }, image ? /*#__PURE__*/React.createElement("img", {
    src: image,
    alt: name,
    style: {
      width: "100%",
      height: "100%",
      objectFit: "cover",
      transition: "transform .5s",
      transform: h ? "scale(1.1)" : "none"
    }
  }) : null), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: "16px 20px 20px",
      display: "flex",
      flexDirection: "column",
      gap: 12,
      flex: 1
    }
  }, /*#__PURE__*/React.createElement("ul", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: 8,
      margin: 0,
      padding: 0,
      listStyle: "none"
    }
  }, bullets.map(b => /*#__PURE__*/React.createElement("li", {
    key: b,
    style: {
      display: "flex",
      alignItems: "flex-start",
      gap: 8
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 18,
      height: 18,
      flexShrink: 0,
      borderRadius: "50%",
      background: "rgba(28,15,76,0.06)",
      marginTop: 1,
      display: "flex",
      alignItems: "center",
      justifyContent: "center"
    }
  }, /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: "check",
    size: 13,
    color: "#1c0f4c",
    strokeWidth: 3
  })), /*#__PURE__*/React.createElement("span", {
    style: {
      color: "rgba(15,10,46,0.66)",
      fontSize: "0.78rem",
      lineHeight: 1.45
    }
  }, b)))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 8,
      marginTop: "auto"
    }
  }, /*#__PURE__*/React.createElement(__ds_scope.StatTile, {
    variant: "mini",
    label: "Plazo t\xEDpico",
    value: plazo
  }), /*#__PURE__*/React.createElement(__ds_scope.StatTile, {
    variant: "mini",
    label: "Inversi\xF3n m\xEDn.",
    value: min
  })), /*#__PURE__*/React.createElement(__ds_scope.Button, {
    size: "card",
    fullWidth: true,
    trailingArrow: true,
    onClick: onCta
  }, cta)));
}
Object.assign(__ds_scope, { ProjectCard });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/cards/ProjectCard.jsx", error: String((e && e.message) || e) }); }

// components/cards/StepCard.jsx
try { (() => {
const {
  useState
} = React;
function StepCard({
  number = "01",
  icon = "userCheck",
  iconColor = "#1c0f4c",
  title,
  description,
  highlight
}) {
  const [h, setH] = useState(false);
  const wrap = highlight ? {
    background: "var(--grad-highlight)",
    border: "1px solid rgba(188,69,233,0.4)",
    boxShadow: "var(--shadow-highlight)"
  } : {
    background: "#fff",
    border: "1px solid #e6e3f5",
    boxShadow: "0 1px 4px rgba(28,15,76,0.06), 0 4px 20px rgba(28,15,76,0.04)"
  };
  return /*#__PURE__*/React.createElement("div", {
    onMouseEnter: () => setH(true),
    onMouseLeave: () => setH(false),
    style: {
      borderRadius: 24,
      padding: 28,
      display: "flex",
      flexDirection: "column",
      gap: 16,
      position: "relative",
      overflow: "hidden",
      fontFamily: "var(--font-sans)",
      transition: "all .3s",
      transform: h ? "translateY(-8px)" : "none",
      ...wrap
    }
  }, highlight ? /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      inset: 0,
      pointerEvents: "none",
      background: "radial-gradient(ellipse at 70% 20%, rgba(108,220,255,0.15) 0%, transparent 65%)"
    }
  }) : null, /*#__PURE__*/React.createElement("div", {
    className: "gradient-text",
    style: {
      fontSize: "3.5rem",
      fontWeight: 900,
      lineHeight: 1,
      position: "relative"
    }
  }, number), /*#__PURE__*/React.createElement("div", {
    style: {
      width: 44,
      height: 44,
      borderRadius: 16,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      position: "relative",
      background: highlight ? "rgba(255,255,255,0.12)" : "rgba(28,15,76,0.06)",
      border: highlight ? "1px solid rgba(255,255,255,0.22)" : "1px solid rgba(28,15,76,0.1)"
    }
  }, /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: icon,
    size: 22,
    color: highlight ? "#fff" : iconColor
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative"
    }
  }, /*#__PURE__*/React.createElement("h3", {
    style: {
      fontWeight: 700,
      fontSize: 18,
      margin: "0 0 8px",
      color: highlight ? "#fff" : "#1c0f4c"
    }
  }, title), /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: 14,
      lineHeight: 1.625,
      margin: 0,
      color: highlight ? "rgba(255,255,255,0.68)" : "rgba(15,10,46,0.66)"
    }
  }, description)));
}
Object.assign(__ds_scope, { StepCard });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/cards/StepCard.jsx", error: String((e && e.message) || e) }); }

// components/core/ProgressBar.jsx
try { (() => {
function ProgressBar({
  value = 62,
  height = 7,
  showLabel,
  track = "rgba(28,15,76,.08)",
  style
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: 8,
      ...style
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      height,
      flex: 1,
      borderRadius: 9999,
      overflow: "hidden",
      background: track
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      height: "100%",
      width: value + "%",
      borderRadius: 9999,
      background: "var(--grad-brand-h)",
      transition: "width 1s"
    }
  })), showLabel ? /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 11,
      fontWeight: 700,
      color: "var(--magenta-600)",
      fontFamily: "var(--font-sans)"
    }
  }, value, "%") : null);
}
Object.assign(__ds_scope, { ProgressBar });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/ProgressBar.jsx", error: String((e && e.message) || e) }); }

// components/core/SectionHeader.jsx
try { (() => {
function SectionHeader({
  eyebrow,
  eyebrowVariant = "plain",
  title,
  highlight,
  after,
  subtitle,
  align = "left",
  dark,
  aside,
  style
}) {
  const center = align === "center";
  const head = /*#__PURE__*/React.createElement("div", {
    style: {
      textAlign: center ? "center" : "left"
    }
  }, eyebrow ? /*#__PURE__*/React.createElement(__ds_scope.Eyebrow, {
    variant: eyebrowVariant
  }, eyebrow) : null, /*#__PURE__*/React.createElement("h2", {
    style: {
      fontFamily: "var(--font-sans)",
      fontWeight: 900,
      fontSize: "clamp(2.25rem,4.5vw,3rem)",
      lineHeight: 1.15,
      color: dark ? "#fff" : "var(--navy-800)",
      margin: eyebrow ? "16px 0 12px" : "0 0 12px",
      textWrap: "balance"
    }
  }, title, highlight ? /*#__PURE__*/React.createElement(React.Fragment, null, " ", /*#__PURE__*/React.createElement("span", {
    className: dark ? undefined : "gradient-text",
    style: dark ? {
      color: "var(--cyan-400)"
    } : undefined
  }, highlight)) : null, after), subtitle ? /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: 16,
      lineHeight: 1.6,
      color: dark ? "var(--on-dark-muted)" : "var(--text-body)",
      margin: center ? "0 auto" : 0,
      maxWidth: center ? 576 : 448
    }
  }, subtitle) : null);
  if (!aside) return /*#__PURE__*/React.createElement("div", {
    style: {
      marginBottom: 48,
      ...style
    }
  }, head);
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexWrap: "wrap",
      alignItems: "flex-end",
      justifyContent: "space-between",
      gap: 24,
      marginBottom: 48,
      ...style
    }
  }, head, aside);
}
Object.assign(__ds_scope, { SectionHeader });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/SectionHeader.jsx", error: String((e && e.message) || e) }); }

// components/feedback/SocialToast.jsx
try { (() => {
function SocialToast({
  initials = "JL",
  name = "José L.",
  city = "Lima",
  action = "se unió a la lista de espera",
  gradient = "linear-gradient(135deg,#3f6fd8,#bc45e9)",
  style
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      background: "rgba(18,11,48,0.96)",
      border: "1px solid rgba(139,92,246,0.35)",
      backdropFilter: "blur(14px)",
      borderRadius: 18,
      padding: "12px 16px",
      display: "flex",
      alignItems: "center",
      gap: 12,
      maxWidth: 260,
      boxShadow: "var(--shadow-toast)",
      fontFamily: "var(--font-sans)",
      ...style
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: 38,
      height: 38,
      borderRadius: "50%",
      background: gradient,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontSize: 13,
      fontWeight: 700,
      color: "#fff",
      flexShrink: 0
    }
  }, initials), /*#__PURE__*/React.createElement("div", {
    style: {
      minWidth: 0
    }
  }, /*#__PURE__*/React.createElement("p", {
    style: {
      color: "#fff",
      fontSize: 13,
      fontWeight: 600,
      lineHeight: 1.25,
      margin: 0
    }
  }, name, " ", /*#__PURE__*/React.createElement("span", {
    style: {
      color: "rgba(255,255,255,0.4)",
      fontSize: 11,
      fontWeight: 400
    }
  }, "\xB7 ", city)), /*#__PURE__*/React.createElement("p", {
    style: {
      color: "rgba(255,255,255,0.5)",
      fontSize: 11,
      margin: "3px 0 0",
      lineHeight: 1.3
    }
  }, action)), /*#__PURE__*/React.createElement("span", {
    style: {
      width: 7,
      height: 7,
      borderRadius: "50%",
      background: "#22d3ee",
      flexShrink: 0,
      boxShadow: "0 0 6px rgba(34,211,238,0.8)",
      animation: "pulse-dot 2s infinite"
    }
  }));
}
Object.assign(__ds_scope, { SocialToast });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/feedback/SocialToast.jsx", error: String((e && e.message) || e) }); }

// components/feedback/TestimonialCard.jsx
try { (() => {
function TestimonialCard({
  quote,
  name,
  role,
  city,
  initials,
  gradient = "linear-gradient(135deg,#6cdcff,#3f6fd8)",
  accent = "#bc45e9",
  accentRgb = "188,69,233",
  amount = "S/ 15,000",
  compact
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      borderRadius: 24,
      padding: compact ? 24 : 48,
      background: "#fff",
      border: "1.5px solid #d2dcea",
      boxShadow: "0 8px 40px rgba(28,15,76,0.07)",
      position: "relative",
      overflow: "hidden",
      fontFamily: "var(--font-sans)"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      top: 0,
      left: "10%",
      right: "10%",
      height: 2,
      background: "linear-gradient(90deg, transparent, rgba(" + accentRgb + ",0.55), transparent)"
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: compact ? "none" : "block",
      fontSize: "9rem",
      lineHeight: 0.75,
      fontFamily: "Georgia, serif",
      color: "rgba(" + accentRgb + ",0.12)",
      position: "absolute",
      top: 20,
      left: 28,
      userSelect: "none"
    }
  }, "\u201C"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: compact ? "1fr" : "minmax(0,1fr) auto",
      gap: compact ? 24 : 40,
      alignItems: "center",
      position: "relative"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: 20
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 3
    }
  }, [1, 2, 3, 4, 5].map(s => /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    key: s,
    name: "star",
    size: 14,
    color: "#f59e0b"
  }))), /*#__PURE__*/React.createElement("p", {
    style: {
      color: "rgba(15,10,46,0.78)",
      fontSize: "1.05rem",
      lineHeight: 1.75,
      fontStyle: "italic",
      margin: 0
    }
  }, "\u201C", quote, "\u201D"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: 12
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: 44,
      height: 44,
      borderRadius: "50%",
      background: gradient,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontWeight: 800,
      fontSize: "0.9rem",
      color: "#fff",
      flexShrink: 0
    }
  }, initials), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("p", {
    style: {
      color: "#1c0f4c",
      fontWeight: 700,
      fontSize: "0.9rem",
      margin: 0
    }
  }, name), /*#__PURE__*/React.createElement("p", {
    style: {
      color: "rgba(15,10,46,0.66)",
      fontSize: "0.75rem",
      margin: "2px 0 0"
    }
  }, role, " \xB7 ", city)))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      textAlign: "center",
      gap: 12,
      borderRadius: 16,
      padding: 24,
      background: "rgba(" + accentRgb + ",0.06)",
      border: "1px solid rgba(" + accentRgb + ",0.18)"
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("p", {
    style: {
      color: "rgba(15,10,46,0.66)",
      fontSize: "0.7rem",
      fontWeight: 800,
      letterSpacing: "0.1em",
      textTransform: "uppercase",
      margin: 0
    }
  }, "Planea invertir"), /*#__PURE__*/React.createElement("p", {
    style: {
      color: accent,
      fontSize: "1.7rem",
      fontWeight: 900,
      margin: "4px 0",
      lineHeight: 1
    }
  }, amount), /*#__PURE__*/React.createElement("p", {
    style: {
      color: "rgba(15,10,46,0.66)",
      fontSize: "0.72rem",
      margin: 0
    }
  }, "al lanzamiento")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "inline-flex",
      alignItems: "center",
      gap: 6,
      padding: "5px 12px",
      borderRadius: 20,
      background: "rgba(" + accentRgb + ",0.12)",
      border: "1px solid rgba(" + accentRgb + ",0.35)",
      fontSize: "0.75rem",
      fontWeight: 700,
      color: "#1c0f4c",
      whiteSpace: "nowrap"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 6,
      height: 6,
      borderRadius: "50%",
      background: accent,
      boxShadow: "0 0 6px " + accent,
      animation: "pulse-dot 2s infinite"
    }
  }), "En lista de espera"))));
}
Object.assign(__ds_scope, { TestimonialCard });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/feedback/TestimonialCard.jsx", error: String((e && e.message) || e) }); }

// components/feedback/WhatsAppFab.jsx
try { (() => {
const {
  useState
} = React;
function WhatsAppFab({
  href = "#",
  fixed = true,
  size,
  mobile
}) {
  const [h, setH] = useState(false);
  const sz = size || (mobile ? 52 : 60);
  return /*#__PURE__*/React.createElement("a", {
    href: href,
    "aria-label": "Escr\xEDbenos por WhatsApp",
    onMouseEnter: () => setH(true),
    onMouseLeave: () => setH(false),
    style: {
      position: fixed ? "fixed" : "relative",
      bottom: fixed ? mobile ? 96 : 28 : undefined,
      right: fixed ? mobile ? 16 : 28 : undefined,
      zIndex: 999,
      width: sz,
      height: sz,
      background: "#25D366",
      borderRadius: "50%",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      transition: "all .3s",
      textDecoration: "none",
      boxShadow: h ? "0 16px 40px rgba(37,211,102,0.55)" : "0 8px 32px rgba(37,211,102,0.45)",
      transform: h ? "scale(1.12) translateY(-3px)" : "none"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      position: "absolute",
      inset: 0,
      borderRadius: "50%",
      background: "#25D366",
      animation: "wa-pulse 2.5s ease-out infinite"
    }
  }), /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: "whatsapp",
    size: 28,
    color: "#fff",
    style: {
      position: "relative",
      zIndex: 1
    }
  }));
}
Object.assign(__ds_scope, { WhatsAppFab });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/feedback/WhatsAppFab.jsx", error: String((e && e.message) || e) }); }

// components/forms/OptionButton.jsx
try { (() => {
function OptionButton({
  children,
  selected,
  onClick
}) {
  return /*#__PURE__*/React.createElement("button", {
    type: "button",
    onClick: onClick,
    style: {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      width: "100%",
      padding: "12px 16px",
      borderRadius: 16,
      fontSize: 14,
      fontWeight: 700,
      fontFamily: "var(--font-sans)",
      cursor: "pointer",
      transition: "all .2s",
      background: selected ? "rgba(188,69,233,0.08)" : "#ffffff",
      border: selected ? "1.5px solid #bc45e9" : "1px solid #d2dcea",
      color: selected ? "#a234cc" : "rgba(15,10,46,0.66)"
    }
  }, children, selected ? /*#__PURE__*/React.createElement("span", {
    style: {
      width: 20,
      height: 20,
      borderRadius: "50%",
      background: "#bc45e9",
      display: "flex",
      alignItems: "center",
      justifyContent: "center"
    }
  }, /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: "check",
    size: 12,
    color: "#fff",
    strokeWidth: 3
  })) : null);
}
Object.assign(__ds_scope, { OptionButton });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/OptionButton.jsx", error: String((e && e.message) || e) }); }

// components/forms/RangeSlider.jsx
try { (() => {
function RangeSlider({
  value = 50,
  min = 0,
  max = 100,
  step = 1,
  onChange,
  ticks,
  ariaLabel
}) {
  const pct = (value - min) / (max - min) * 100;
  return /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: "var(--font-sans)"
    }
  }, /*#__PURE__*/React.createElement("input", {
    type: "range",
    "aria-label": ariaLabel,
    min: min,
    max: max,
    step: step,
    value: value,
    onChange: e => onChange && onChange(Number(e.target.value)),
    style: {
      width: "100%",
      accentColor: "#bc45e9",
      height: 6,
      borderRadius: 99,
      appearance: "auto",
      background: "linear-gradient(90deg, #6cdcff 0%, #bc45e9 " + pct + "%, #e8edf6 " + pct + "%, #e8edf6 100%)"
    }
  }), ticks ? /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative",
      marginTop: 8,
      height: 18,
      fontSize: "0.75rem",
      fontWeight: 600,
      color: "var(--text-body)"
    }
  }, ticks.map((t, i) => {
    const p = i / (ticks.length - 1) * 100;
    return /*#__PURE__*/React.createElement("span", {
      key: i,
      style: {
        position: "absolute",
        top: 0,
        left: p + "%",
        whiteSpace: "nowrap",
        transform: i === 0 ? "none" : i === ticks.length - 1 ? "translateX(-100%)" : "translateX(-50%)"
      }
    }, t);
  })) : null);
}
Object.assign(__ds_scope, { RangeSlider });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/RangeSlider.jsx", error: String((e && e.message) || e) }); }

// components/forms/TextField.jsx
try { (() => {
const {
  useState
} = React;
const fieldBase = {
  background: "#ffffff",
  // Sin el atajo "border": React avisa al mezclarlo con borderColor (foco/error).
  borderWidth: "1.5px",
  borderStyle: "solid",
  borderColor: "#e0ddf2",
  color: "#1c0f4c",
  borderRadius: "0.9rem",
  padding: "0.875rem 1rem 0.875rem 3.1rem",
  width: "100%",
  fontSize: "0.95rem",
  fontWeight: 500,
  transition: "border-color 0.2s, box-shadow 0.2s",
  outline: "none",
  fontFamily: "var(--font-sans)"
};
const fieldFocus = {
  borderColor: "#bc45e9",
  boxShadow: "0 0 0 3px rgba(188,69,233,0.10)"
};
const fieldError = {
  borderColor: "#dc2626",
  boxShadow: "0 0 0 3px rgba(220,38,38,0.10)",
  background: "#fffafa"
};
const fieldValid = {
  borderColor: "#10b981"
};
function stateStyle(f, error, valid) {
  return {
    ...(valid && !error ? fieldValid : {}),
    ...(f ? fieldFocus : {}),
    ...(error ? fieldError : {}),
    paddingRight: error || valid ? "2.6rem" : undefined
  };
}
function FieldShell({
  label,
  hint,
  icon,
  children,
  error,
  valid
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: 6,
      fontFamily: "var(--font-sans)"
    }
  }, label ? /*#__PURE__*/React.createElement("label", {
    style: {
      fontSize: 12,
      fontWeight: 600,
      letterSpacing: "0.025em",
      color: "var(--text-body)"
    }
  }, label) : null, /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative"
    }
  }, icon ? /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      left: 8,
      top: "50%",
      transform: "translateY(-50%)",
      width: "2.1rem",
      height: "2.1rem",
      borderRadius: 9999,
      background: error ? "rgba(220,38,38,0.08)" : valid ? "rgba(16,185,129,0.10)" : "rgba(28,15,76,0.06)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      pointerEvents: "none"
    }
  }, /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: icon,
    size: 15,
    color: error ? "#dc2626" : valid ? "#059669" : "#1c0f4c"
  })) : null, children, error || valid ? /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      right: 12,
      top: "50%",
      transform: "translateY(-50%)",
      width: 22,
      height: 22,
      borderRadius: "50%",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      pointerEvents: "none",
      background: error ? "#dc2626" : "#10b981"
    }
  }, /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: error ? "minus" : "check",
    size: 13,
    variant: "line",
    strokeWidth: 2.2,
    color: "#fff"
  })) : null), error ? /*#__PURE__*/React.createElement("span", {
    role: "alert",
    style: {
      display: "flex",
      alignItems: "center",
      gap: 5,
      fontSize: "0.72rem",
      fontWeight: 700,
      color: "#dc2626"
    }
  }, /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: "alert",
    size: 13,
    color: "#dc2626"
  }), error) : hint ? /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: "0.75rem",
      color: "var(--text-body)"
    }
  }, hint) : null);
}
function TextField({
  label,
  hint,
  icon = "user",
  type = "text",
  value,
  defaultValue,
  placeholder,
  onChange,
  onBlur,
  disabled,
  name,
  error,
  valid
}) {
  const [f, setF] = useState(false);
  return /*#__PURE__*/React.createElement(FieldShell, {
    label: label,
    hint: hint,
    icon: icon,
    error: error,
    valid: valid
  }, /*#__PURE__*/React.createElement("input", {
    "aria-invalid": !!error,
    name: name,
    type: type,
    value: value,
    defaultValue: defaultValue,
    placeholder: placeholder,
    disabled: disabled,
    onChange: onChange,
    onFocus: () => setF(true),
    onBlur: e => {
      setF(false);
      onBlur && onBlur(e);
    },
    style: {
      ...fieldBase,
      ...(icon ? {} : {
        paddingLeft: "1rem"
      }),
      ...stateStyle(f, error, valid),
      opacity: disabled ? 0.45 : 1,
      colorScheme: "light"
    }
  }));
}
Object.assign(__ds_scope, { fieldBase, fieldFocus, fieldError, fieldValid, stateStyle, FieldShell, TextField });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/TextField.jsx", error: String((e && e.message) || e) }); }

// components/forms/SelectField.jsx
try { (() => {
const {
  useState
} = React;
const CHEV = "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='%231c0f4c' stroke-width='2'%3E%3Cpolyline points='6 9 12 15 18 9'/%3E%3C/svg%3E\")";
function SelectField({
  label,
  hint,
  icon = "wallet",
  options = [],
  placeholder = "— Selecciona un rango —",
  value,
  defaultValue,
  onChange,
  onBlur,
  disabled,
  name,
  error,
  valid
}) {
  const [f, setF] = useState(false);
  return /*#__PURE__*/React.createElement(__ds_scope.FieldShell, {
    label: label,
    hint: hint,
    icon: icon,
    error: error,
    valid: valid
  }, /*#__PURE__*/React.createElement("select", {
    name: name,
    value: value,
    defaultValue: defaultValue,
    onChange: onChange,
    disabled: disabled,
    "aria-invalid": !!error,
    onFocus: () => setF(true),
    onBlur: e => {
      setF(false);
      onBlur && onBlur(e);
    },
    style: {
      ...__ds_scope.fieldBase,
      ...__ds_scope.stateStyle(f, error, valid),
      appearance: "none",
      backgroundImage: CHEV,
      backgroundRepeat: "no-repeat",
      backgroundPosition: error || valid ? "right 42px center" : "right 12px center",
      paddingRight: error || valid ? "4.2rem" : "2.5rem",
      opacity: disabled ? 0.45 : 1
    }
  }, /*#__PURE__*/React.createElement("option", {
    value: ""
  }, placeholder), options.map(o => {
    const [v, l] = Array.isArray(o) ? o : [o, o];
    return /*#__PURE__*/React.createElement("option", {
      key: v,
      value: v
    }, l);
  })));
}
Object.assign(__ds_scope, { SelectField });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/SelectField.jsx", error: String((e && e.message) || e) }); }

// components/navigation/Footer.jsx
try { (() => {
const LINKS = [["Cómo funciona", "#como-funciona"], ["Planes", "#planes"], ["Simulador", "#simulador"], ["Proyectos", "#proyectos"], ["App", "#app"], ["Kids", "#kids"], ["Comparativo", "#comparativo"]];
const muted = "rgba(15,10,46,0.66)";
function Footer({
  logoSrc = "/design/isotipo.webp",
  llamaSrc,
  razonSocial = "HOLDING BERCORP GROUP S.A.C.",
  ruc = "20613498878",
  year = 2026
}) {
  return /*#__PURE__*/React.createElement("footer", {
    style: {
      position: "relative",
      padding: "64px 16px 40px",
      borderTop: "1px solid rgba(28,15,76,0.10)",
      background: "#fff",
      overflow: "hidden",
      fontFamily: "var(--font-sans)"
    }
  }, llamaSrc ? /*#__PURE__*/React.createElement("img", {
    src: llamaSrc,
    loading: "lazy",
    alt: "",
    "aria-hidden": "true",
    style: {
      position: "absolute",
      bottom: 0,
      right: 0,
      height: "110%",
      width: "auto",
      filter: "brightness(0) saturate(100%) invert(7%) sepia(72%) saturate(1700%) hue-rotate(245deg)",
      opacity: 0.05,
      transform: "translateX(20%)",
      pointerEvents: "none"
    }
  }) : null, /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative",
      zIndex: 1,
      maxWidth: 1152,
      margin: "0 auto"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexWrap: "wrap",
      alignItems: "center",
      justifyContent: "space-between",
      gap: 32
    }
  }, /*#__PURE__*/React.createElement("img", {
    src: logoSrc,
    alt: "Platita.pe",
    style: {
      height: 40,
      width: 120,
      objectFit: "contain"
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexWrap: "wrap",
      justifyContent: "center",
      gap: 24,
      fontSize: 14,
      color: muted
    }
  }, LINKS.map(([l, h]) => /*#__PURE__*/React.createElement("a", {
    key: l,
    href: h,
    style: {
      color: "inherit",
      textDecoration: "none"
    }
  }, l))), /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: 12,
      textAlign: "right",
      color: muted,
      margin: 0
    }
  }, "\xA9 ", year, " Platita.pe", /*#__PURE__*/React.createElement("br", null), "Todos los derechos reservados")), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 40,
      paddingTop: 24,
      borderTop: "1px solid rgba(28,15,76,0.10)",
      display: "flex",
      flexWrap: "wrap",
      alignItems: "center",
      justifyContent: "space-between",
      gap: 16
    }
  }, /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: 12,
      color: "rgba(15,10,46,0.66)",
      margin: 0
    }
  }, razonSocial, " \xB7 RUC ", ruc), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexWrap: "wrap",
      gap: "8px 24px",
      fontSize: 12
    }
  }, /*#__PURE__*/React.createElement("a", {
    href: "/terminos",
    style: {
      color: muted,
      textDecoration: "none"
    }
  }, "T\xE9rminos y Condiciones"), /*#__PURE__*/React.createElement("a", {
    href: "/privacidad",
    style: {
      color: muted,
      textDecoration: "none"
    }
  }, "Pol\xEDtica de Privacidad"), /*#__PURE__*/React.createElement("a", {
    href: "#cookies",
    onClick: e => { e.preventDefault(); resetConsent(); },
    style: {
      color: muted,
      textDecoration: "none"
    }
  }, "Preferencias de cookies"), /*#__PURE__*/React.createElement("a", {
    href: "/libro-de-reclamaciones",
    style: {
      display: "inline-flex",
      alignItems: "center",
      gap: 6,
      fontWeight: 700,
      color: "#1c0f4c",
      textDecoration: "none"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 20,
      height: 20,
      borderRadius: 4,
      border: "1.5px solid #1c0f4c",
      fontSize: 11,
      fontWeight: 900,
      lineHeight: 1,
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center"
    }
  }, "LR"), "Libro de Reclamaciones")))));
}
Object.assign(__ds_scope, { Footer });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/navigation/Footer.jsx", error: String((e && e.message) || e) }); }

// components/navigation/LegalTicker.jsx
try { (() => {
function LegalTicker({
  label = ["Respaldo", "Legal"],
  items = []
}) {
  const doubled = [...items, ...items];
  return /*#__PURE__*/React.createElement("div", {
    style: {
      borderTop: "1px solid rgba(28,15,76,0.08)",
      borderBottom: "1px solid rgba(28,15,76,0.08)",
      background: "#fff",
      padding: "12px 0",
      overflow: "hidden",
      fontFamily: "var(--font-sans)"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: 24,
      paddingLeft: 20
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: "0.7rem",
      fontWeight: 800,
      letterSpacing: "0.1em",
      textTransform: "uppercase",
      color: "#1c0f4c",
      flexShrink: 0,
      paddingRight: 16,
      borderRight: "1px solid rgba(28,15,76,0.15)",
      opacity: 0.7
    }
  }, label[0], /*#__PURE__*/React.createElement("br", null), label[1]), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      overflow: "hidden"
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "ticker-track"
  }, doubled.map((it, i) => /*#__PURE__*/React.createElement("span", {
    key: i,
    style: {
      display: "inline-flex",
      alignItems: "center",
      gap: 10,
      padding: "0 36px",
      flexShrink: 0,
      whiteSpace: "nowrap"
    }
  }, /*#__PURE__*/React.createElement("img", {
    src: it.src,
    alt: it.alt || "",
    style: {
      height: 28,
      width: "auto",
      objectFit: "contain"
    }
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: "0.75rem",
      fontWeight: 600,
      color: "rgba(28,15,76,0.66)",
      letterSpacing: "0.04em"
    }
  }, it.label), /*#__PURE__*/React.createElement("span", {
    style: {
      marginLeft: 26,
      opacity: 0.25,
      color: "rgba(28,15,76,0.66)"
    }
  }, "\xB7")))))));
}
Object.assign(__ds_scope, { LegalTicker });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/navigation/LegalTicker.jsx", error: String((e && e.message) || e) }); }

// components/navigation/Navbar.jsx
try { (() => {
const {
  useState
} = React;
const DEFAULT_LINKS = [["Proyectos", "#proyectos"], ["Planes", "#planes"], ["¿Cómo funciona?", "#como-funciona"], ["Simulador", "#simulador"], ["Comparativo", "#comparativo"], ["App", "#app"], ["Testimonios", "#testimonios"]];
function NavLink({
  label,
  href,
  active,
  onClick
}) {
  const [h, setH] = useState(false);
  return /*#__PURE__*/React.createElement("a", {
    href: href,
    onClick: onClick,
    onMouseEnter: () => setH(true),
    onMouseLeave: () => setH(false),
    style: {
      position: "relative",
      paddingBottom: 4,
      fontSize: 14,
      fontWeight: 600,
      whiteSpace: "nowrap",
      textDecoration: "none",
      color: active || h ? "#1c0f4c" : "rgba(15,10,46,0.66)",
      transition: "color .2s"
    }
  }, label, /*#__PURE__*/React.createElement("span", {
    style: {
      position: "absolute",
      left: 0,
      bottom: -2,
      height: 2,
      borderRadius: 9999,
      width: active || h ? "100%" : 0,
      background: "linear-gradient(90deg, #6cdcff, #bc45e9)",
      transition: "width .3s"
    }
  }));
}
function Navbar(props) {
  return props.mobile ? /*#__PURE__*/React.createElement(MobileNavbar, props) : /*#__PURE__*/React.createElement(DesktopNavbar, props);
}
function MobileNavbar({
  logoSrc = "/design/isotipo.webp",
  links = DEFAULT_LINKS,
  active,
  scrolled,
  ctaLabel = "Reserva tu lugar",
  onCta,
  onNavigate,
  fixed = false
}) {
  const [open, setOpen] = useState(false);
  const nav = (e, h) => {
    if (onNavigate) {
      e.preventDefault();
      onNavigate(h.slice(1));
    }
    setOpen(false);
  };
  const bar = {
    display: "block",
    width: 20,
    height: 2,
    background: "#1c0f4c",
    transition: "transform .2s, opacity .2s"
  };
  return /*#__PURE__*/React.createElement("nav", {
    style: {
      position: fixed ? "fixed" : "relative",
      top: 0,
      left: 0,
      right: 0,
      zIndex: 50,
      padding: scrolled ? "10px 12px 0" : 0,
      transition: "all .3s",
      fontFamily: "var(--font-sans)"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      borderRadius: scrolled ? 18 : 0,
      overflow: "hidden",
      background: scrolled ? "rgba(248,251,255,0.98)" : "rgba(255,255,255,0.92)",
      backdropFilter: "blur(20px)",
      border: scrolled ? "1px solid rgba(28,15,76,0.08)" : "none",
      boxShadow: scrolled ? "var(--shadow-nav-scrolled)" : "var(--shadow-nav)"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      height: 60,
      padding: "0 16px",
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between"
    }
  }, /*#__PURE__*/React.createElement("a", {
    href: "#",
    onClick: e => nav(e, "#")
  }, /*#__PURE__*/React.createElement("img", {
    src: logoSrc,
    alt: "Platita.pe",
    style: {
      height: 36,
      width: 108,
      objectFit: "contain",
      display: "block"
    }
  })), /*#__PURE__*/React.createElement("button", {
    onClick: () => setOpen(!open),
    "aria-label": "Men\xFA",
    style: {
      width: 44,
      height: 44,
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      gap: 6,
      background: "none",
      border: "none",
      cursor: "pointer"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      ...bar,
      transform: open ? "translateY(8px) rotate(45deg)" : "none"
    }
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      ...bar,
      opacity: open ? 0 : 1
    }
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      ...bar,
      transform: open ? "translateY(-8px) rotate(-45deg)" : "none"
    }
  }))), open ? /*#__PURE__*/React.createElement("div", {
    style: {
      padding: "8px 20px 20px",
      display: "flex",
      flexDirection: "column",
      gap: 4,
      borderTop: "1px solid rgba(12,18,55,0.08)"
    }
  }, links.map(([l, h]) => /*#__PURE__*/React.createElement("a", {
    key: h,
    href: h,
    onClick: e => nav(e, h),
    style: {
      padding: "10px 0",
      fontSize: 15,
      fontWeight: 700,
      textDecoration: "none",
      color: active === h.slice(1) ? "#a234cc" : "rgba(15,10,46,0.70)"
    }
  }, l)), /*#__PURE__*/React.createElement(__ds_scope.Button, {
    fullWidth: true,
    onClick: () => {
      setOpen(false);
      onCta && onCta();
    },
    style: {
      marginTop: 8,
      borderRadius: 9999,
      padding: "12px",
      fontSize: 14
    }
  }, ctaLabel)) : null));
}
function DesktopNavbar({
  logoSrc = "/design/isotipo.webp",
  links = DEFAULT_LINKS,
  active,
  scrolled,
  ctaLabel = "Reserva tu lugar",
  onCta,
  onNavigate,
  fixed = false,
  mobile
}) {
  return /*#__PURE__*/React.createElement("nav", {
    style: {
      position: fixed ? "fixed" : "relative",
      top: 0,
      left: 0,
      right: 0,
      zIndex: 50,
      display: "flex",
      justifyContent: "center",
      padding: scrolled ? "12px 16px 0" : 0,
      transition: "all .3s",
      fontFamily: "var(--font-sans)"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: "100%",
      maxWidth: scrolled ? 1152 : "100%",
      borderRadius: scrolled ? 20 : 0,
      overflow: "hidden",
      background: scrolled ? "rgba(248,251,255,0.98)" : "rgba(255,255,255,0.92)",
      backdropFilter: "blur(20px)",
      border: scrolled ? "1px solid rgba(28,15,76,0.08)" : "none",
      boxShadow: scrolled ? "var(--shadow-nav-scrolled)" : "var(--shadow-nav)",
      transition: "all .3s"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 1152,
      margin: "0 auto",
      padding: "0 20px",
      height: 64,
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      gap: 16
    }
  }, /*#__PURE__*/React.createElement("a", {
    href: "#",
    onClick: onNavigate ? e => {
      e.preventDefault();
      onNavigate("");
    } : undefined,
    style: {
      display: "flex",
      alignItems: "center"
    }
  }, /*#__PURE__*/React.createElement("img", {
    src: logoSrc,
    alt: "Platita.pe",
    style: {
      height: 40,
      width: 120,
      objectFit: "contain"
    }
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: 20,
      minWidth: 0
    }
  }, links.map(([l, h]) => /*#__PURE__*/React.createElement(NavLink, {
    key: h,
    label: l,
    href: h,
    active: active === h.slice(1),
    onClick: onNavigate ? e => {
      e.preventDefault();
      onNavigate(h.slice(1));
    } : undefined
  }))), /*#__PURE__*/React.createElement(__ds_scope.Button, {
    size: "sm",
    onClick: onCta,
    style: {
      fontWeight: 700,
      whiteSpace: "nowrap",
      flexShrink: 0
    }
  }, ctaLabel))));
}
Object.assign(__ds_scope, { Navbar });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/navigation/Navbar.jsx", error: String((e && e.message) || e) }); }

// components/navigation/StickyCTA.jsx
try { (() => {
function StickyCTA({
  visible = true,
  rate = 20,
  label = "Reserva tu lugar",
  onCta,
  fixed = true
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      position: fixed ? "fixed" : "relative",
      bottom: 0,
      left: 0,
      right: 0,
      zIndex: 40,
      transition: "transform .3s",
      transform: visible ? "translateY(0)" : "translateY(110%)",
      background: "rgba(255,255,255,0.96)",
      borderTop: "1px solid rgba(28,15,76,0.08)",
      backdropFilter: "blur(16px)",
      WebkitBackdropFilter: "blur(16px)",
      padding: "12px 16px 22px",
      boxShadow: "0 -8px 28px rgba(28,15,76,0.10)",
      fontFamily: "var(--font-sans)"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: 10
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      flexShrink: 0,
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      padding: "6px 10px",
      borderRadius: 12,
      background: "rgba(188,69,233,0.08)",
      border: "1px solid rgba(188,69,233,0.22)"
    }
  }, /*#__PURE__*/React.createElement("span", {
    className: "gradient-text",
    style: {
      fontWeight: 900,
      fontSize: "1.05rem",
      lineHeight: 1
    }
  }, rate, "%"), /*#__PURE__*/React.createElement("span", {
    style: {
      color: "#a234cc",
      fontSize: "0.6rem",
      fontWeight: 800,
      textTransform: "uppercase",
      letterSpacing: "0.05em"
    }
  }, "anual")), /*#__PURE__*/React.createElement(__ds_scope.Button, {
    fullWidth: true,
    onClick: onCta,
    style: {
      borderRadius: 16,
      padding: "14px",
      fontSize: 15
    }
  }, label)));
}
Object.assign(__ds_scope, { StickyCTA });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/navigation/StickyCTA.jsx", error: String((e && e.message) || e) }); }


export const DS = __ds_scope;
export default DS;
