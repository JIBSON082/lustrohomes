"use client";

import { useState, useEffect, useCallback, useRef, useMemo } from "react";
import Image from "next/image";

// ─────────────────────────────────────────────────
// CONSTANTS
// ─────────────────────────────────────────────────
const WHATSAPP_NUMBER = "2348000000000"; // ← Replace with actual WhatsApp number
const WHATSAPP_URL = `https://wa.me/${WHATSAPP_NUMBER}`;

const HERO_VIDEO_1 =
  "https://res.cloudinary.com/dx3k7hbnc/video/upload/v1777632548/Hero-video_egr33p.mp4";
const HERO_VIDEO_2 =
  "https://res.cloudinary.com/dx3k7hbnc/video/upload/SaveVid.Net_AQPE4buCAPwMTpt_DXF2wOWf5MzYPthNbLKMeVWJDkJ8IefN-lUBT7-LEaODGn4_ONeOzQENCu6WWN7xr8X1ADpMhcGmT9_TKwVITzA_2_v6uxeg.mp4";

const HERO_PHRASES = ["Staycation", "Signature Dining", "Investment"];

const SEARCHABLE_SECTIONS = [
  { label: "Rooms & Suites", href: "#rooms", keywords: ["rooms", "suites", "mykonos", "malibu", "seychelles", "beverly hills", "cappadocia", "santorini"] },
  { label: "Gallery", href: "#gallery", keywords: ["gallery", "photos", "images", "videos"] },
  { label: "Investment", href: "#invest", keywords: ["invest", "investment", "returns", "roi", "profit"] },
  { label: "Yankee by Lustro", href: "#yankee", keywords: ["yankee", "sister"] },
  { label: "Book Your Stay", href: `${WHATSAPP_URL}?text=I'd like to book`, keywords: ["book", "reserve", "stay"] },
  { label: "Dining", href: "#dining", keywords: ["dining", "restaurant", "food", "eat"] },
];

const HERO_NAV_LINKS = [
  { label: "Our Story",        href: "#about"   },
  { label: "Rooms & Suites",   href: "#rooms"   },
  { label: "Dining",           href: "#dining"  },
  { label: "Yankee by Lustro", href: "#yankee"  },
  { label: "Gallery",          href: "#gallery" },
  { label: "Investment",       href: "#invest"  },
  { label: "Contact",          href: "#contact" },
];


// ─────────────────────────────────────────────────
// HERO SECTION — Cinematic Video Background
// ─────────────────────────────────────────────────

function Hero() {
  const [scrolled, setScrolled] = useState(false);
  const [phraseIdx, setPhraseIdx] = useState(0);
  const [transitioning, setTransitioning] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const textRef = useRef<HTMLDivElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 60);
      if (textRef.current) {
        textRef.current.style.transform = `translateY(-${y * 0.22}px)`;
        textRef.current.style.opacity = String(Math.max(0, 1 - y / 380));
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const iv = setInterval(() => {
      setTransitioning(true);
      setTimeout(() => {
        setPhraseIdx((p) => (p + 1) % HERO_PHRASES.length);
        setTransitioning(false);
      }, 200);
    }, 3800);
    return () => clearInterval(iv);
  }, []);

  // CHANGED: Removed letterbox animation entirely.
  // Text animations now start after a short 0.3s delay
  useEffect(() => {
    const init = async () => {
      try {
        const { gsap } = await import("gsap");
        const tl = gsap.timeline({ delay: 0.3 });

        tl
          .fromTo(".hero-eyebrow",
            { opacity: 0, y: 16 },
            { opacity: 1, y: 0, duration: 0.9, ease: "power3.out" }
          )
          .fromTo(".hero-title",
            { opacity: 0, clipPath: "inset(100% 0 -30% 0)", y: 20 },
            { opacity: 1, clipPath: "inset(0% 0 -30% 0)", y: 0, duration: 1.2, ease: "expo.out" },
            "-=0.5"
          )
          .fromTo(".hero-divider",
            { scaleX: 0, opacity: 0 },
            { scaleX: 1, opacity: 1, duration: 0.9, ease: "power3.out", transformOrigin: "center" },
            "-=0.5"
          )
          .fromTo(".hero-crafted",
            { opacity: 0, y: 12 },
            { opacity: 1, y: 0, duration: 0.7, ease: "power3.out" },
            "-=0.4"
          )
          .fromTo(".hero-phrase",
            { opacity: 0, y: 18 },
            { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" },
            "-=0.4"
          );

      } catch {
        [".hero-eyebrow", ".hero-title", ".hero-divider", ".hero-crafted", ".hero-phrase"].forEach((sel) => {
          document.querySelectorAll(sel).forEach((el) => {
            (el as HTMLElement).style.opacity = "1";
            (el as HTMLElement).style.clipPath = "none";
          });
        });
      }
    };
    init();
  }, []);

  useEffect(() => {
    if (!menuOpen) return;
    const init = async () => {
      try {
        const { gsap } = await import("gsap");
        gsap.fromTo(".menu-link",
          { opacity: 0, x: -28 },
          { opacity: 1, x: 0, duration: 0.6, ease: "power3.out", stagger: 0.08, delay: 0.1 }
        );
        gsap.fromTo(".menu-cta",
          { opacity: 0, y: 14 },
          { opacity: 1, y: 0, duration: 0.5, ease: "power3.out", delay: 0.6 }
        );
      } catch {}
    };
    init();
  }, [menuOpen]);

  useEffect(() => {
    if (searchOpen) setTimeout(() => searchInputRef.current?.focus(), 100);
    else setSearchQuery("");
  }, [searchOpen]);

  useEffect(() => {
    document.body.style.overflow = menuOpen || searchOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen, searchOpen]);

  const handleSearchNavigate = (href: string) => {
    setSearchOpen(false);
    setSearchQuery("");
    if (href.startsWith("#")) {
      const el = document.querySelector(href);
      if (el) setTimeout(() => window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY, behavior: "smooth" }), 200);
    } else window.open(href, "_blank");
  };

  const searchResults = SEARCHABLE_SECTIONS.filter((s) =>
    searchQuery.length > 1 && s.keywords.some((k) => k.includes(searchQuery.toLowerCase()))
  );

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Great+Vibes&family=Tenor+Sans&display=swap');

        /* CHANGED: Removed .lb-top and .lb-bottom styles entirely */

        .hero-eyebrow  { opacity: 0; }
        .hero-title    { opacity: 0; }
        .hero-divider  { opacity: 0; }
        .hero-crafted  { opacity: 0; }
        .hero-phrase   { opacity: 0; }

        .phrase-word {
          display: block;
          transition: transform 0.85s cubic-bezier(0.16,1,0.3,1), opacity 0.6s ease;
        }
        .phrase-word.visible { transform: translateY(0); opacity: 1; }
        .phrase-word.hidden  { transform: translateY(28px); opacity: 0; }

        .underline-link { position: relative; display: inline-block; }
        .underline-link::after {
          content: '';
          position: absolute;
          bottom: -2px; left: 0;
          width: 100%; height: 1px;
          background: currentColor; opacity: 0.4;
        }
        .mobile-menu {
          transform: translateX(100%);
          transition: transform 0.45s cubic-bezier(0.16,1,0.3,1);
        }
        .mobile-menu.open { transform: translateX(0); }
        .search-overlay {
          transform: translateY(-100%);
          transition: transform 0.4s cubic-bezier(0.16,1,0.3,1);
        }
        .search-overlay.open { transform: translateY(0); }
        .menu-link { opacity: 0; }
        .menu-cta  { opacity: 0; }
      `}</style>

      {/* Search Overlay — unchanged */}
      <div className={`search-overlay fixed inset-0 z-[95] bg-cream-dark flex flex-col px-6 pt-6 pb-10 ${searchOpen ? "open" : ""}`}>
        <div className="flex items-center justify-between mb-8">
          <span className="font-cormorant text-charcoal text-lg tracking-[0.15em] uppercase font-light">Search</span>
          <button onClick={() => setSearchOpen(false)} className="text-charcoal/50 hover:text-charcoal transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-5 h-5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <div className="border-b border-charcoal/20 flex items-center gap-3 pb-3 mb-8">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-4 h-4 text-charcoal/40 flex-shrink-0">
            <circle cx="11" cy="11" r="7" /><path strokeLinecap="round" d="M16.5 16.5l3.5 3.5" />
          </svg>
          <input
            ref={searchInputRef}
            type="text"
            placeholder="Search rooms, dining, investment..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="flex-1 bg-transparent font-dm-sans text-sm text-charcoal placeholder-charcoal/30 outline-none"
          />
          {searchQuery && (
            <button onClick={() => setSearchQuery("")} className="text-charcoal/30 hover:text-charcoal">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" />
              </svg>
            </button>
          )}
        </div>
        <div className="flex flex-col gap-1">
          {searchQuery.length > 1 ? (
            searchResults.length > 0 ? searchResults.map((r) => (
              <button key={r.href} onClick={() => handleSearchNavigate(r.href)}
                className="text-left py-4 border-b border-charcoal/8 flex items-center justify-between group">
                <span className="font-cormorant text-2xl text-charcoal font-light group-hover:text-brown transition-colors">{r.label}</span>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-4 h-4 text-charcoal/30">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 18l6-6-6-6" />
                </svg>
              </button>
            )) : (
              <p className="font-dm-sans text-sm text-charcoal/35 mt-2">No results for &quot;{searchQuery}&quot;</p>
            )
          ) : (
            <>
              <p className="font-dm-sans text-[0.6rem] text-charcoal/35 uppercase tracking-[0.3em] mb-3">Quick Links</p>
              {HERO_NAV_LINKS.map((link) => (
                <button key={link.href} onClick={() => handleSearchNavigate(link.href)}
                  className="text-left py-3 border-b border-charcoal/8 flex items-center justify-between group">
                  <span className="font-cormorant text-xl text-charcoal/60 font-light group-hover:text-charcoal transition-colors">{link.label}</span>
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-4 h-4 text-charcoal/20">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 18l6-6-6-6" />
                  </svg>
                </button>
              ))}
            </>
          )}
        </div>
      </div>

      {/* Mobile Menu — unchanged */}
      <div className={`mobile-menu fixed inset-0 z-[90] bg-charcoal flex flex-col px-8 py-10 ${menuOpen ? "open" : ""}`}>
        <button onClick={() => setMenuOpen(false)} className="self-end mb-10 text-cream/40 hover:text-cream transition-colors">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
        <div className="flex flex-col gap-1">
          {HERO_NAV_LINKS.map((item) => (
            <a key={item.label} href={item.href}
              onClick={() => {
                setMenuOpen(false);
                const el = document.querySelector(item.href);
                if (el) setTimeout(() => window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY, behavior: "smooth" }), 400);
              }}
              className="menu-link py-4 border-b border-cream/8 flex items-center justify-between group"
            >
              <span className="font-cormorant text-3xl text-cream font-light tracking-wide group-hover:text-gold transition-colors">{item.label}</span>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1} className="w-4 h-4 text-cream/20 group-hover:text-gold transition-colors">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 18l6-6-6-6" />
              </svg>
            </a>
          ))}
        </div>
        <div className="mt-auto pt-8 menu-cta">
          <p className="font-dm-sans text-[0.58rem] text-cream/25 uppercase tracking-[0.3em] mb-3">Ready to experience Lustro?</p>
          <a href={`${WHATSAPP_URL}?text=I'd like to book a stay at Lustro Homes`} target="_blank" rel="noopener noreferrer"
            className="font-dm-sans text-sm text-gold tracking-[0.2em] uppercase underline-link hover:text-gold/70 transition-colors">
            Book Your Stay
          </a>
        </div>
      </div>

      {/* Navbar — unchanged */}
      <nav
        className={`fixed top-0 left-0 right-0 z-50 px-5 transition-all duration-500 ${
          scrolled
            ? "bg-cream-dark border-b border-charcoal/8 py-4"
            : "bg-transparent py-5"
        }`}
      >
        <div className="flex items-center justify-between relative">
          <button
            onClick={() => setMenuOpen(true)}
            className="flex flex-col gap-[6px]"
            aria-label="Menu"
          >
            <span className={`w-6 h-px block transition-colors duration-500 ${scrolled ? "bg-charcoal" : "bg-white"}`} />
            <span className={`w-6 h-px block transition-colors duration-500 ${scrolled ? "bg-charcoal" : "bg-white"}`} />
            <span className={`w-4 h-px block transition-colors duration-500 ${scrolled ? "bg-charcoal" : "bg-white"}`} />
          </button>

          <span className={`absolute left-[46%] -translate-x-1/2 font-cormorant font-bold tracking-[0.1em] uppercase text-[1.25rem] whitespace-nowrap transition-colors duration-500 ${
            scrolled ? "text-charcoal" : "text-white"
          }`}>
            Lustro Lagos
          </span>

          <a
            href={`${WHATSAPP_URL}?text=I'd like to book a stay at Lustro Homes`}
            target="_blank"
            rel="noopener noreferrer"
            className={`font-dm-sans text-[0.8rem] tracking-[0.28em] uppercase px-4 py-2.5 transition-all duration-500 ${
              scrolled
                ? "bg-charcoal text-cream hover:bg-brown"
                : "border border-white/50 text-white hover:bg-white/10"
            }`}
          >
            Book
          </a>
        </div>
      </nav>

      {/* Hero Section */}
      <section
        style={{
          position: "relative",
          height: "100dvh",
          overflow: "hidden",
          background: "#080808",
        }}
      >
        {/* CHANGED: Image is fully static — no scale, no animation */}
        <img
          src="https://res.cloudinary.com/dx3k7hbnc/image/upload/v1780580829/6vxk9fbdvdrmr0cyjbfv367b28_result_0_igqrjm.png"
          alt="Lustro Homes"
          className="absolute inset-0 w-full h-full object-cover"
        />

        {/* Gradient overlay */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: "linear-gradient(to top, rgba(0,0,0,0.75) 0%, rgba(0,0,0,0.15) 40%, rgba(0,0,0,0.35) 100%)",
          }}
        />

        {/* CHANGED: Letterbox bars removed entirely */}

        {/* Centered text content */}
        <div
          ref={textRef}
          className="absolute inset-0 flex flex-col items-center justify-center text-center"
          style={{ zIndex: 20, padding: "0 clamp(24px, 6vw, 80px)" }}
        >
          <p
            className="hero-eyebrow"
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: "clamp(0.7rem, 2vw, 0.95rem)",
              letterSpacing: "0.55em",
              fontStyle: "italic",
              color: "rgba(255,255,255,0.9)",
              fontWeight: "500",
              textTransform: "uppercase",
              marginBottom: "16px",
            }}
          >
            Welcome to
          </p>

          <h1
            className="hero-title font-cormorant text-white font-light leading-none"
            style={{
              fontSize: "clamp(48px, 13vw, 96px)",
              letterSpacing: "-0.01em",
              marginBottom: "24px",
              clipPath: "inset(0 0 -30% 0)",
              paddingBottom: "8px",
            }}
          >
            Lustro Homes
          </h1>

          <div
            className="hero-divider"
            style={{
              width: "72px",
              height: "1px",
              background: "linear-gradient(90deg, transparent, #C8922A 30%, #C8922A 70%, transparent)",
              marginBottom: "24px",
            }}
          />

          <p
            className="hero-crafted"
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: "clamp(0.7rem, 2vw, 0.9rem)",
              letterSpacing: "0.45em",
              fontStyle: "italic",
              color: "rgba(255,255,255,0.88)",
              fontWeight: "560",
              textTransform: "uppercase",
              marginBottom: "8px",
            }}
          >
            Crafted for
          </p>

          {/* CHANGED: minHeight increased slightly to prevent layout shift on small screens */}
          <div className="hero-phrase" style={{ minHeight: "80px", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <span
              className={`phrase-word ${transitioning ? "hidden" : "visible"}`}
              style={{
                fontFamily: "'Great Vibes', cursive",
                fontSize: "clamp(42px, 11vw, 72px)",
                color: "#C8922A",
                lineHeight: 1.2,
                whiteSpace: "nowrap",
              }}
            >
              {HERO_PHRASES[phraseIdx]}
            </span>
          </div>
        </div>
      </section>
    </>
  );
}

// Move targets outside component — never changes, no reason to recreate
const STATS_TARGETS = {
  guests: 15000,
  properties: 3,
  revenue: 2,
  delivery: 100,
};

function StatsBar() {
  const sectionRef = useRef<HTMLElement>(null);
  const [animated, setAnimated] = useState(false);
  const [counts, setCounts] = useState({
    guests: 0,
    properties: 0,
    revenue: 0,
    delivery: 0,
  });

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !animated) {
          setAnimated(true);

          const duration = 2000;
          const steps = 60;
          const interval = duration / steps;
          let step = 0;

          const timer = setInterval(() => {
            step++;
            const progress = step / steps;
            const ease = 1 - Math.pow(1 - progress, 3);

            setCounts({
              guests: Math.floor(ease * STATS_TARGETS.guests),
              properties: Math.floor(ease * STATS_TARGETS.properties),
              // Multiply by 10 internally so animation has 20 steps, not 2
              revenue: Math.floor(ease * (STATS_TARGETS.revenue * 10)) / 10,
              delivery: Math.floor(ease * STATS_TARGETS.delivery),
            });

            if (step >= steps) {
              clearInterval(timer);
              setCounts({
                guests: STATS_TARGETS.guests,
                properties: STATS_TARGETS.properties,
                revenue: STATS_TARGETS.revenue,
                delivery: STATS_TARGETS.delivery,
              });
            }
          }, interval);
        }
      },
      { threshold: 0.4 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, [animated]);

  const stats = useMemo(() => [
    {
      value: counts.guests >= STATS_TARGETS.guests
        ? "15,000+"
        : `${counts.guests.toLocaleString()}+`,
      label: "Guests Hosted",
    },
    {
      value: counts.properties >= STATS_TARGETS.properties
        ? "3"
        : `${counts.properties}`,
      label: "Iconic Properties",
    },
    {
      value: counts.revenue >= STATS_TARGETS.revenue
        ? "₦2M+"
        : `₦${counts.revenue.toFixed(1)}M+`,
      label: "Monthly Revenue",
    },
    {
      value: counts.delivery >= STATS_TARGETS.delivery
        ? "100%"
        : `${counts.delivery}%`,
      label: "Delivery Rate",
    },
  ], [counts]);

  return (
    <section
      ref={sectionRef}
      className="bg-charcoal-light py-5 md:py-7 reveal-element"  
    >
      <div className="max-w-5xl mx-auto px-6">

        {/* Header */}
        <div className="text-center mb-4">  
          <p
            className="font-cormorant text-gold/80 uppercase mb-2"
style={{ fontSize: "0.85rem", letterSpacing: "0.55em", fontWeight: 500 }}
          >
            The Numbers
          </p>
          <h2 className="font-cormorant text-3xl md:text-4xl text-cream font-light">
            A Track Record That Speaks
          </h2>
          <div
            className="mx-auto mt-4"
            style={{
              width: "48px",
              height: "1px",
              background: "linear-gradient(90deg, transparent, #C8922A, transparent)",
            }}
          />
        </div>

        {/* Stats grid — fixed iOS Safari rendering with border instead of gap-px trick */}
        <div className="grid grid-cols-2 mb-4"> 
          {stats.map((stat, i) => (
            <div
              key={stat.label}
              className="flex flex-col items-center justify-center py-3 px-4 text-center" 
              style={{
                borderRight: i % 2 === 0 ? "1px solid rgba(255,255,255,0.06)" : "none",
                borderBottom: i < 2 ? "1px solid rgba(255,255,255,0.06)" : "none",
              }}
            >
              <p
                className="font-cormorant text-gold font-light leading-none mb-2"
                style={{ fontSize: "clamp(32px, 9vw, 48px)" }}  // HEIGHT: change clamp min/max
              >
                {stat.value}
              </p>
              <p
                className="font-dm-sans text-cream/35 uppercase"
                style={{ fontSize: "0.58rem", letterSpacing: "0.35em" }}
              >
                {stat.label}
              </p>
            </div>
          ))}
        </div>

        {/* Gold divider */}
        <div
          className="mx-auto mb-4" 
          style={{
            width: "64px",
            height: "1px",
            background: "linear-gradient(90deg, transparent, #C8922A 30%, #C8922A 70%, transparent)",
          }}
        />

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <a
            href={`${WHATSAPP_URL}?text=I'd like to book a stay at Lustro Homes`}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto text-center bg-brown text-cream font-dm-sans text-sm tracking-[0.18em] uppercase px-12 py-3.5 hover:bg-brown-light transition-colors"
          >
            Book Your Stay
          </a>
          <a
            href="#invest"
            onClick={(e) => {
              e.preventDefault();
              document.querySelector("#invest")?.scrollIntoView({ behavior: "smooth" });
            }}
            className="w-full sm:w-auto text-center border border-cream/20 text-cream/60 font-dm-sans text-sm tracking-[0.18em] uppercase px-12 py-3.5 hover:border-gold hover:text-gold transition-all duration-300"
          >
            View Investment
          </a>
        </div>

      </div>
    </section>
  );
}

// ─────────────────────────────────────────────────
// ABOUT SECTION
// ─────────────────────────────────────────────────
function About() {
  return (
    <section id="about" className="bg-cream py-24 md:py-36 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-[1fr_1.4fr] gap-14 md:gap-20 items-stretch">
        {/* Left — Text */}
        <div className="reveal-element">
          <p className="font-dm-sans text-[0.65rem] text-brown uppercase tracking-[0.28em] mb-4">
            Our Story
          </p>
          <h2 className="font-cormorant text-5xl md:text-6xl text-charcoal font-light leading-[1.1] mb-6">
            Lagos Luxury,{" "}
            <em className="italic text-brown">Redefined.</em>
          </h2>
          <div className="section-line mb-8" />
          <p className="font-dm-sans text-charcoal/65 leading-[1.85] text-sm md:text-base mb-5">
            We started Lustro Homes in Yaba because we wanted to redefine what a local getaway could look like. Our dream was to build a space that pairs the comfort of your own home with the elevated luxury of a five-star stay.
          </p>
          <p className="font-dm-sans text-charcoal/65 leading-[1.85] text-sm md:text-base mb-10">
            We obsessed over every detail. Every corner of our suites and every single dish at Lustro Lagos Restaurant was chosen with you in mind. To us, this isn't just about handing over a room key. It’s about giving you a place to truly breathe, recharge, and enjoy a weekend you won’t want to end.
          </p>

          {/* Mini stats */}
          <div className="grid grid-cols-3 gap-6 pt-8 border-t border-charcoal/10">
            {[
              { value: "3", label: "Properties" },
              { value: "8,000+", label: "Total Stays" },
              { value: "24hr", label: "Hospitality" },
            ].map((s) => (
              <div key={s.label}>
                <p className="font-cormorant text-3xl md:text-4xl text-brown font-light">
                  {s.value}
                </p>
                <p className="font-dm-sans text-[0.65rem] text-charcoal/45 uppercase tracking-wider mt-1.5">
                  {s.label}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Right — Image */}
        <div className="reveal-element relative">
          <div className="img-zoom relative rounded-2xl overflow-hidden h-[520px] md:h-[680px]">
  <Image
    src="https://res.cloudinary.com/dx3k7hbnc/image/upload/q_auto,f_auto/v1777570667/living-room_ehvxbd.jpg"
    alt="Lustro Homes luxury living room interior"
    fill
    sizes="(max-width: 768px) 100vw, 60vw"
    quality={100}
    className="object-cover object-right-top"
  />
</div>
          {/* Floating glass badge */}
          <div
            className="glass absolute bottom-6 left-6 px-5 py-4 rounded-xl"
            style={{ isolation: "isolate" }}
          >
            <p className="font-dm-sans text-[0.6rem] text-cream/60 uppercase tracking-widest">
              Follow us
            </p>
            <p className="font-cormorant text-xl text-gold tracking-wide mt-0.5">
              @lustro_homes
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────────
// ROOMS & SUITES
// ─────────────────────────────────────────────────
function Rooms() {
  const [activeIdx, setActiveIdx] = useState(0);
  const [muted, setMuted] = useState(true);
  const [playing, setPlaying] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const sectionRef = useRef<HTMLElement>(null);

  const rooms = [
    {
      name: "Beverly Hills",
      tier: "Luxury Suite",
      price: "₦150,000",
      about:
        "A spacious, thoughtfully designed apartment combining modern finishes with steady power and fast internet for ultimate city living.",
      tag: "Premium",
      publicId: "Beverly_Hills_vr3clx",
    },
    {
      name: "Seychelles",
      tier: "Comfort Apartment",
      price: "₦90,000",
      about:
        "A comfort-forward apartment with modern finishes, steady power, and fast internet nestled in the heart of Lagos City.",
      tag: "Most Loved",
      publicId: "Seychelles_qqujgc",
    },
    {
      name: "Santorini",
      tier: "Weekend Suite",
      price: "₦80,000",
      about:
        "A curated weekend getaway room where tranquility meets taste for a seamless, exclusive experience.",
      tag: "Weekend Escape",
      publicId: "Santorini_zpgswd",
    },
    {
      name: "Mykonos",
      tier: "City Apartment",
      price: "₦70,000",
      about:
        "A thoughtfully designed apartment offering modern finishes, steady power, fast internet, and a serene environment in the heart of Lagos.",
      tag: "City Favourite",
      publicId: "Mykonos_zddgck",
    },
    {
      name: "Cappadocia",
      tier: "Minimal Retreat",
      price: "₦70,000",
      about:
        "A minimal luxury retreat offering ultimate comfort and a serene escape in the heart of Lagos.",
      tag: "Retreat",
      publicId: "Cappadocia_ugh3hc",
    },
    {
      name: "Malibu",
      tier: "Coastal Suite",
      price: "₦60,000",
      about:
        "A gently toned, luxuriously simple room designed to bring coastal elegance and effortless calm to your everyday life.",
      tag: "Coastal Calm",
      publicId: "Malibu_hnbazg",
    },
  ];

  const active = rooms[activeIdx];

  const getVideoUrl = (publicId: string) =>
    `https://res.cloudinary.com/dx3k7hbnc/video/upload/${publicId}.mp4`;

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          videoRef.current?.play().catch(() => {});
          setPlaying(true);
        } else {
          videoRef.current?.pause();
          setPlaying(false);
        }
      },
      { threshold: 0.4 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, [activeIdx]);

  const handleVideoEnded = () => {
    const next = (activeIdx + 1) % rooms.length;
    setActiveIdx(next);
    setPlaying(true);
  };

  const togglePlay = () => {
    if (!videoRef.current) return;
    playing ? videoRef.current.pause() : videoRef.current.play();
    setPlaying(!playing);
  };

  const toggleMute = () => {
    if (!videoRef.current) return;
    videoRef.current.muted = !muted;
    setMuted(!muted);
  };

  const goPrev = () => {
    setActiveIdx((i) => (i - 1 + rooms.length) % rooms.length);
    setPlaying(true);
  };

  const goNext = () => {
    setActiveIdx((i) => (i + 1) % rooms.length);
    setPlaying(true);
  };

  return (
    <section ref={sectionRef} id="rooms" className="bg-cream-dark py-16 md:py-24">
      <div className="max-w-5xl mx-auto px-6">

        {/* Header */}
        <div className="text-center mb-10 reveal-element">
          <p className="font-dm-sans text-[0.65rem] text-brown uppercase tracking-[0.28em] mb-4">
            Rooms & Suites
          </p>
          <h2 className="font-cormorant text-5xl md:text-6xl text-charcoal font-light">
            Find Your Perfect Room
          </h2>
          <div className="section-line mx-auto mt-6" />
        </div>

        <div className="reveal-element">

          {/* ── Main Video ── */}
          <div className="relative rounded-2xl overflow-hidden bg-charcoal select-none"
            style={{ marginBottom: 0 }}>
            <video
              ref={videoRef}
              key={active.publicId}
              src={getVideoUrl(active.publicId)}
              muted={muted}
              loop={false}
              playsInline
              disablePictureInPicture
              onClick={togglePlay}
              onEnded={handleVideoEnded}
              onLoadedMetadata={(e) => {
                Array.from(e.currentTarget.textTracks).forEach(
                  (t) => (t.mode = "hidden")
                );
                if (playing) e.currentTarget.play().catch(() => {});
              }}
              className="w-full object-cover cursor-pointer"
              style={{ maxHeight: "420px", pointerEvents: "auto" } as React.CSSProperties}
              controlsList="nodownload nofullscreen noremoteplayback"
              onContextMenu={(e) => e.preventDefault()}
            />

            {/* Tier + name overlay — top left */}
            <div className="absolute top-5 left-5 pointer-events-none">
              <span className="font-dm-sans text-[0.55rem] text-cream/60 uppercase tracking-[0.22em] mb-1 block">
                {active.tier}
              </span>
              <h3 className="font-cormorant text-3xl text-cream font-light leading-none drop-shadow-lg">
                {active.name}
              </h3>
            </div>

            {/* Tag — top right */}
            <div className="absolute top-5 right-5 pointer-events-none">
              <span className="font-dm-sans text-[0.58rem] bg-brown text-cream px-3 py-1.5 rounded-full tracking-[0.15em] uppercase">
                {active.tag}
              </span>
            </div>

            {/* Room counter — bottom centre */}
            <div className="absolute bottom-14 left-0 right-0 flex justify-center pointer-events-none">
              <span className="font-dm-sans text-[0.52rem] text-cream/45 tracking-[0.3em] uppercase">
                {activeIdx + 1} / {rooms.length}
              </span>
            </div>

            {/* Controls bar */}
            <div className="absolute bottom-0 left-0 right-0 px-5 py-4 flex items-center justify-between bg-gradient-to-t from-black/55 to-transparent">
              <button
                onClick={togglePlay}
                className="w-9 h-9 rounded-full bg-white/15 backdrop-blur-sm flex items-center justify-center hover:bg-white/25 transition-colors"
                aria-label={playing ? "Pause" : "Play"}
              >
                {playing ? (
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 text-white">
                    <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" />
                  </svg>
                ) : (
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 text-white ml-0.5">
                    <path d="M8 5.14v14l11-7-11-7z" />
                  </svg>
                )}
              </button>

              {/* Prev / Next arrows — centre */}
              <div className="flex items-center gap-5">
                <button
                  onClick={goPrev}
                  className="text-cream/60 hover:text-cream transition-colors"
                  aria-label="Previous room"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-5 h-5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                  </svg>
                </button>
                <button
                  onClick={goNext}
                  className="text-cream/60 hover:text-cream transition-colors"
                  aria-label="Next room"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-5 h-5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>

              <button
                onClick={toggleMute}
                className="w-9 h-9 rounded-full bg-white/15 backdrop-blur-sm flex items-center justify-center hover:bg-white/25 transition-colors"
                aria-label={muted ? "Unmute" : "Mute"}
              >
                {muted ? (
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 text-white">
                    <path d="M16.5 12A4.5 4.5 0 0 0 14 7.97v2.21l2.45 2.45c.03-.2.05-.41.05-.63zm2.5 0c0 .94-.2 1.82-.54 2.64l1.51 1.51A8.796 8.796 0 0 0 21 12c0-4.28-3-7.86-7-8.77v2.06c2.89.86 5 3.54 5 6.71zM4.27 3L3 4.27 7.73 9H3v6h4l5 5v-6.73l4.25 4.25c-.67.52-1.42.93-2.25 1.18v2.06A8.99 8.99 0 0 0 17.73 18l1.73 1.73L21 18.46 5.54 3 4.27 3zM12 4L9.91 6.09 12 8.18V4z" />
                  </svg>
                ) : (
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 text-white">
                    <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3A4.5 4.5 0 0 0 14 7.97v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77 0-4.28-2.99-7.86-7-8.77z" />
                  </svg>
                )}
              </button>
            </div>
          </div>

          {/* ── Detail card — directly below video, no gap ── */}
          <div className="bg-cream rounded-b-2xl px-6 py-6 shadow-sm">

            {/* Tag + tier row */}
            <div className="flex items-center gap-3 mb-3 flex-wrap">
              <span className="font-dm-sans text-[0.58rem] bg-brown text-cream px-3 py-1.5 rounded-full tracking-[0.18em] uppercase">
                {active.tag}
              </span>
              <span className="font-dm-sans text-[0.58rem] text-brown/50 uppercase tracking-[0.18em]">
                {active.tier}
              </span>
            </div>

            {/* Name + price row */}
            <div className="flex items-baseline justify-between mb-3">
              <h3 className="font-cormorant text-3xl text-charcoal font-light leading-none">
                The {active.name}
              </h3>
              <div className="flex items-baseline gap-1 flex-shrink-0 ml-3">
                <p className="font-cormorant text-2xl text-gold">{active.price}</p>
                <span className="font-dm-sans text-[0.65rem] text-charcoal/40">/ night</span>
              </div>
            </div>

            {/* Description */}
            <p className="font-dm-sans text-sm text-charcoal/55 leading-[1.8] mb-5">
              {active.about}
            </p>

            {/* CTA */}
            <a
              href={`${WHATSAPP_URL}?text=I'd like to book The ${active.name} at Lustro Homes`}
              target="_blank"
              rel="noopener noreferrer"
              className="block text-center bg-charcoal text-cream font-dm-sans text-sm py-3.5 rounded-full hover:bg-brown transition-colors"
            >
              Book This Room
            </a>
            <p className="font-dm-sans text-[0.55rem] text-charcoal/30 text-center uppercase tracking-wider mt-2">
              Instant confirmation via WhatsApp
            </p>

          </div>
        </div>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────────
// YANKEE BY LUSTRO 
// ─────────────────────────────────────────────────
function YankeeByLustro() {
  const [activeIdx, setActiveIdx] = useState(0);
  const [muted, setMuted] = useState(true);
  const [playing, setPlaying] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const sectionRef = useRef<HTMLElement>(null);

  const videos = [
    { publicId: "Yankee_by_Lustro_1_fatub8", label: "The Arrival" },
    { publicId: "Yankee_by_Lustro_2_fegw75", label: "The Interior" },
  ];

  const getVideoUrl = (publicId: string) =>
    `https://res.cloudinary.com/dx3k7hbnc/video/upload/${publicId}.mp4`;

  const getThumbUrl = (publicId: string) =>
    `https://res.cloudinary.com/dx3k7hbnc/video/upload/so_2,w_300,h_400,c_fill,q_auto,f_auto/${publicId}.jpg`;

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          videoRef.current?.play().catch(() => {});
          setPlaying(true);
        } else {
          videoRef.current?.pause();
          setPlaying(false);
        }
      },
      { threshold: 0.4 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, [activeIdx]);

  const handleVideoEnded = () => {
    const next = (activeIdx + 1) % videos.length;
    setActiveIdx(next);
    setPlaying(true);
  };

  const togglePlay = () => {
    if (!videoRef.current) return;
    playing ? videoRef.current.pause() : videoRef.current.play();
    setPlaying(!playing);
  };

  const toggleMute = () => {
    if (!videoRef.current) return;
    videoRef.current.muted = !muted;
    setMuted(!muted);
  };

  const active = videos[activeIdx];

  return (
    <section ref={sectionRef} id="yankee" className="bg-charcoal-light py-24 md:py-36">
      <div className="max-w-5xl mx-auto px-6">

        {/* Header */}
        <div className="text-center mb-16 reveal-element">
          
          <h2 className="font-cinzel text-5xl md:text-6xl text-cream font-light">
            Yankee by Lustro
          </h2>
          <div className="section-line mx-auto mt-6" />
          <p className="font-dm-sans text-cream/40 text-sm tracking-wide mt-6 max-w-md mx-auto">
            The Lustro standard, reimagined. A new address for those who refuse to settle.
          </p>
        </div>

        {/* Video Player */}
        <div className="reveal-element">
          <div className="relative rounded-2xl overflow-hidden bg-charcoal mb-4 select-none">
            <video
              ref={videoRef}
              key={active.publicId}
              src={getVideoUrl(active.publicId)}
              muted={muted}
              loop={false}
              playsInline
              disablePictureInPicture
              onClick={togglePlay}
              onEnded={handleVideoEnded}
              onLoadedMetadata={(e) => {
                Array.from(e.currentTarget.textTracks).forEach(
                  (t) => (t.mode = "hidden")
                );
                if (playing) e.currentTarget.play().catch(() => {});
              }}
              className="w-full object-cover cursor-pointer"
              style={{
                maxHeight: "520px",
                pointerEvents: "auto",
              } as React.CSSProperties}
              controlsList="nodownload nofullscreen noremoteplayback"
              onContextMenu={(e) => e.preventDefault()}
            />

            {/* Label overlay */}
           <div className="absolute top-5 left-5 pointer-events-none">
  <p className="font-cinzel text-xs text-gold uppercase tracking-[0.28em] font-semibold drop-shadow-lg">
    Yankee by Lustro
  </p>
</div>

            {/* Controls */}
            <div className="absolute bottom-0 left-0 right-0 px-5 py-4 flex items-center justify-between bg-gradient-to-t from-black/50 to-transparent">
              <button
                onClick={togglePlay}
                className="w-9 h-9 rounded-full bg-white/15 backdrop-blur-sm flex items-center justify-center hover:bg-white/25 transition-colors"
                aria-label={playing ? "Pause" : "Play"}
              >
                {playing ? (
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 text-white">
                    <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" />
                  </svg>
                ) : (
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 text-white ml-0.5">
                    <path d="M8 5.14v14l11-7-11-7z" />
                  </svg>
                )}
              </button>
              <button
                onClick={toggleMute}
                className="w-9 h-9 rounded-full bg-white/15 backdrop-blur-sm flex items-center justify-center hover:bg-white/25 transition-colors"
                aria-label={muted ? "Unmute" : "Mute"}
              >
                {muted ? (
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 text-white">
                    <path d="M16.5 12A4.5 4.5 0 0 0 14 7.97v2.21l2.45 2.45c.03-.2.05-.41.05-.63zm2.5 0c0 .94-.2 1.82-.54 2.64l1.51 1.51A8.796 8.796 0 0 0 21 12c0-4.28-3-7.86-7-8.77v2.06c2.89.86 5 3.54 5 6.71zM4.27 3L3 4.27 7.73 9H3v6h4l5 5v-6.73l4.25 4.25c-.67.52-1.42.93-2.25 1.18v2.06A8.99 8.99 0 0 0 17.73 18l1.73 1.73L21 18.46 5.54 3 4.27 3zM12 4L9.91 6.09 12 8.18V4z" />
                  </svg>
                ) : (
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 text-white">
                    <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3A4.5 4.5 0 0 0 14 7.97v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77 0-4.28-2.99-7.86-7-8.77z" />
                  </svg>
                )}
              </button>
            </div>
          </div>

          

          {/* CTA */}
          <div className="glass rounded-2xl p-5 md:p-6 text-center" style={{ isolation: "isolate" }}>
            <p className="font-dm-sans text-[0.65rem] text-gold uppercase tracking-[0.28em] mb-3">
              Now Available
            </p>
            <h3 className="font-cormorant text-3xl md:text-4xl text-cream font-light mb-4">
              Experience Yankee by Lustro
            </h3>
            <p className="font-dm-sans text-cream/45 text-sm leading-[1.85] max-w-sm mx-auto mb-5">
              The same uncompromising standard. A fresh address. Book your stay or inquire about investment opportunities.
            </p>
            <a
              href={`${WHATSAPP_URL}?text=I'm interested in Yankee by Lustro`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-brown text-cream font-dm-sans px-12 py-4 rounded-full text-sm hover:bg-brown-light transition-colors shadow-lg"
            >
              Book or Enquire
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────────
// MENU DATA
// ─────────────────────────────────────────────────
const MENU_DATA = {
  premium: {
    label: "Premium", icon: "◆",
    sections: [{
      title: "Lustro Premium",
      items: [
        { name: "Don Julio 1942", price: 500000 },
        { name: "Hennessy XO", price: 470000 },
        { name: "Martel XO", price: 420000 },
        { name: "Casamigo", price: 350000 },
        { name: "Martel Blueswift", price: 200000 },
        { name: "Belair", price: 120000 },
        { name: "Jameson Black", price: 100000 },
        { name: "Martel VS", price: 100000 },
        { name: "White Wine", price: 35000 },
        { name: "Red Wine", price: 35000 },
      ],
    },
    { title: "Chaser", items: [{ name: "Cranberry", price: 12000 }, { name: "Soda", price: 2000 }] }],
  },
  cocktails: {
    label: "Cocktails", icon: "🍸",
    sections: [{
      title: "Maple Classic Twist by Lustro",
      items: [
        { name: "Lustro Mojito", sub: "Mojito", desc: "White Rum, Fresh Mint Leaves, Lime Juice & Soda Water", price: 10000 },
        { name: "Lustro Lady", desc: "Pineapple juice, vanilla essence, passion fruit & vodka", price: 12000 },
        { name: "Lustro Ride", desc: "Dark and white rum, gin, vodka, tequila, vanilla essence, lemon juice, elder flower syrup & soda", price: 12000 },
        { name: "Lustro Fever", desc: "Gin, vodka, brandy, lemon juice & blackberry liqueur", price: 10000 },
        { name: "Golden Pina", sub: "Pina Colada", desc: "White Rum, Pineapple Juice & Coconut Cream", price: 11000 },
        { name: "Brainstorm", desc: "Bailey Irish cream, gin, whiskey & coffee liqueur", price: 12000 },
        { name: "Spicy Citrus Margarita", desc: "Tequila, triple sec, lime juice, agave syrup & cayenne pepper", price: 10000 },
        { name: "Sunset Cosmo", sub: "Cosmopolitan", desc: "Vodka, Triple Sec, Cranberry Juice & Lime Juice", price: 10000 },
        { name: "Lustro Island Rush", sub: "Long Island Iced Tea", desc: "Vodka, Tequila, White Rum, Gin, Triple Sec, Lemon Juice, Simple Syrup & Cola", price: 12000 },
        { name: "Tequila Sunrise Glow", sub: "Tequila Sunrise", desc: "Tequila, Orange Juice & Grenadine", price: 10000 },
      ],
    }],
  },
  mocktails: {
    label: "Mocktails", icon: "🍹",
    sections: [
      {
        title: "Lustro Pine · Mocktail Series",
        items: [
          { name: "Lustro Pine", desc: "Dragon fruit puree, mint leaves, lime, white sugar, sparkling water, ice cubes", price: 10000 },
          { name: "Safe Sex", desc: "Cranberry, peach syrup, orange squash & grenadine", price: 9000 },
          { name: "Golden Glow", sub: "Tropical Bliss", desc: "Pineapple juice, mango puree, lime juice, coconut cream", price: 9000 },
          { name: "Berry Luxe", sub: "Berry Fizz", desc: "Mixed Berry Puree, Lemonade & Honey Syrup", price: 9000 },
          { name: "Mandarin Spritz", desc: "Mandarin juice, Prosecco & simple syrup", price: 9000 },
          { name: "Chapman", desc: "Fanta, Sprite, Cucumber, Lemon, Grenadine and Angostura bitters", price: 9000 },
        ],
      },
      {
        title: "Shakes by Lustro",
        items: [
          { name: "Rose & Pistachio Milkshake", desc: "Milk, vanilla ice cream, rose syrup & crushed pistachios", price: 10000 },
          { name: "Strawberry Baileys Milkshake", desc: "Strawberries, Baileys Irish Cream, milk, vanilla ice cream", price: 10000 },
          { name: "Oreo Chocolate Milkshake", desc: "Oreo cookies, chocolate ice cream, milk, chocolate syrup", price: 10000 },
          { name: "Vanilla Coffee Milkshake", desc: "Milk, vanilla ice cream, espresso, vanilla extract", price: 10000 },
          { name: "Berry Dreams", desc: "Milk, strawberry ice cream, blueberry ice cream, mixed berry compote", price: 10000 },
        ],
      },
    ],
  },
  starters: {
    label: "Starters", icon: "✦",
    sections: [{
      title: "Starters",
      items: [
        { name: "Calamari Strips", desc: "Crispy Calamari served with sweet chilli sauce and ranch sauce", price: 12000 },
        { name: "Buffalo Wings", desc: "Chicken wings cooked in hot buffalo sauce, garnished with sesame seed and fresh parsley", price: 10000 },
        { name: "Honey Glazed Wings", desc: "Chicken wings glazed with honey, lemon pepper, chilli flakes garnished with parsley", price: 10000 },
        { name: "Spicy Chicken Wings", desc: "Chicken wings cooked in hot chilli sauce, onion and bell pepper", price: 10000 },
        { name: "Mayo Prawn Roll", desc: "Prawn wrapped in mayo dip with fresh salted veggies, thousand island sauce and our signature ranch sauce", price: 8000 },
      ],
    }],
  },
  mains: {
    label: "Mains", icon: "◉",
    sections: [
      {
        title: "Pastalavista",
        items: [
          { name: "Vannesa's Special", desc: "Vannesa's signature recipe, served with prawn, shredded beef, chicken breast and shrimps", price: 25000 },
          { name: "Seafood Pasta", desc: "Pasta cooked in creamy or tomato sauce with shrimps, calamari, prawn, garnished with parsley flakes", price: 20000 },
          { name: "Alfredo Pasta", desc: "Pasta cooked in creamy sauce, minced garlic, onion, chicken fillet, Parmesan cheese and fresh parsley", price: 17000 },
          { name: "Lustro Chicken Pasta", desc: "Pasta cooked in tomato plum, diced chicken breast, fresh basil, garnished with Parmesan cheese", price: 15000 },
          { name: "Lustro Beef Pasta", desc: "Pasta cooked in tomato plum, shredded beef, fresh basil, garnished with Parmesan cheese", price: 15000 },
        ],
      },
      {
        title: "Lustro Rice",
        items: [
          { name: "Lustro Jambalaya Rice", desc: "Jambalaya rice, served with chicken or spicy turkey", price: 25000 },
          { name: "Egg Fried Rice with Beef Sweet Chili Sauce", desc: "Rice stir fried with veggies, eggs, shrimps, chicken breast with beef sweet chili sauce", price: 20000 },
        ],
      },
      {
        title: "Flames & Grills by Lustro",
        items: [
          { name: "Grilled Catfish", desc: "Grilled catfish served with fries, pepper sauce and steamed veggies", price: 25000 },
          { name: "Grilled Croacker Fish", desc: "Grilled croacker fish served with fries, pepper sauce and steamed veggies", price: 25000 },
          { name: "Suya Chicken Kebab", desc: "Grilled sticked suya chicken with veggies and yam fries", price: 15000 },
        ],
      },
    ],
  },
  wraps: {
    label: "Wraps & Sides", icon: "◈",
    sections: [
      { title: "Lustro Wraps", items: [{ name: "Chicken Shawarma Wrap", price: 10000 }, { name: "Beef Shawarma Wrap", price: 10000 }] },
      { title: "Sides", items: [{ name: "Crispy French Fries", price: 5000 }, { name: "Yam Fries", price: 4000 }, { name: "Plantain", price: 3000 }] },
    ],
  },
} as const;

type MenuKey = keyof typeof MENU_DATA;

interface MenuItem {
  name: string;
  sub?: string;
  desc?: string;
  price: number;
}

interface MenuSection {
  title: string;
  items: MenuItem[];
}

const fmtPrice = (n: number) => `₦${n.toLocaleString()}`;

function MenuModal({ onClose }: { onClose: () => void }) {
  const [activeTab, setActiveTab] = useState<MenuKey>("premium");
  const cat = MENU_DATA[activeTab];

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = ""; };
  }, []);

  return (
    <div
      className="fixed inset-0 z-[100] flex flex-col"
      style={{ animation: "menuModalIn 0.4s cubic-bezier(0.25,0.46,0.45,0.94) forwards" }}
    >
     <div className="absolute inset-0 bg-[#0a0a0a] backdrop-blur-md" onClick={onClose} />
      <div
        className="relative z-10 flex flex-col h-full max-w-2xl mx-auto w-full"
        style={{ animation: "menuPanelIn 0.5s cubic-bezier(0.25,0.46,0.45,0.94) 0.1s both" }}
      >
        {/* Header */}
        <div className="flex-shrink-0 px-6 pt-8 pb-0">
          <div className="flex items-start justify-between mb-6">
            <div>
              <p className="font-dm-sans text-[0.6rem] text-gold uppercase tracking-[0.3em] mb-2">
                Lustro Lagos Restaurant
              </p>
              <h2 className="font-cormorant text-4xl text-cream font-light">
                Our <em className="italic text-gold">Menu</em>
              </h2>
            </div>
            <button
              onClick={onClose}
              className="w-10 h-10 rounded-full bg-white/8 flex items-center justify-center hover:bg-brown transition-colors flex-shrink-0 mt-1"
              aria-label="Close menu"
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-4 h-4 text-cream">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          <div className="w-full h-px bg-gradient-to-r from-gold/40 via-gold/20 to-transparent mb-0" />
          {/* Tab Bar */}
          <div className="flex gap-1 overflow-x-auto no-scrollbar py-4">
            {(Object.entries(MENU_DATA) as [MenuKey, typeof MENU_DATA[MenuKey]][]).map(([key, val]) => (
              <button
                key={key}
                onClick={() => setActiveTab(key)}
                className={`flex-shrink-0 font-dm-sans text-[0.62rem] uppercase tracking-[0.18em] px-4 py-2 rounded-full transition-all duration-300 ${
                  activeTab === key
                    ? "bg-brown text-cream shadow-md"
                    : "text-cream/45 hover:text-cream/80 border border-white/8 hover:border-white/20"
                }`}
              >
                {val.label}
              </button>
            ))}
          </div>
          <div className="w-full h-px bg-white/5" />
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto px-6 pb-10 no-scrollbar">
          <div className="text-center py-8">
            <span className="text-gold text-lg block mb-2">{cat.icon}</span>
            <h3 className="font-cormorant text-3xl text-cream italic font-light">{cat.label}</h3>
          </div>
          {(cat.sections as unknown as MenuSection[]).map((sec, si) => (
            <div key={si} className="mb-10" style={{ animation: `menuSectionIn 0.5s ease ${si * 0.08}s both` }}>
              <div className="mb-1">
                <p className="font-dm-sans text-[0.58rem] text-gold uppercase tracking-[0.3em]">{sec.title}</p>
                <div className="mt-2 h-px bg-gradient-to-r from-gold/40 to-transparent" />
              </div>
              {sec.items.map((item, ii) => (
                <div
                  key={ii}
                  className="group flex items-baseline gap-3 py-4 border-b border-white/4 hover:border-gold/20 transition-colors"
                  style={{ animation: `menuItemIn 0.4s ease ${si * 0.08 + ii * 0.04}s both` }}
                >
                  <div className="flex-1 min-w-0">
                 <p className="font-cormorant text-xl font-semibold text-cream group-hover:text-gold transition-colors leading-snug">{item.name}</p>
                    {item.sub && <p className="font-cormorant text-sm text-cream/40 italic mt-0.5">{item.sub}</p>}
                    {item.desc && <p className="font-dm-sans text-[0.65rem] text-cream/55 mt-1.5 leading-relaxed italic">{item.desc}</p>}
                  </div>
                  <div className="flex-shrink-0 w-8 border-b border-dotted border-gold/20 self-center mb-1" />
                  <p className="font-cormorant text-base text-gold font-light flex-shrink-0 tracking-wide">{fmtPrice(item.price)}</p>
                </div>
              ))}
            </div>
          ))}
          <div className="text-center pt-4 pb-2">
            <div className="flex items-center gap-4 justify-center mb-6">
              <div className="h-px flex-1 bg-gradient-to-r from-transparent to-gold/25" />
              <p className="font-cormorant text-sm text-gold/50 italic tracking-widest">Lustro Lagos</p>
              <div className="h-px flex-1 bg-gradient-to-l from-transparent to-gold/25" />
            </div>
            <a
              href={`${WHATSAPP_URL}?text=I'd like to reserve a table at Lustro Lagos Restaurant`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-brown text-cream font-dm-sans text-sm px-10 py-3.5 rounded-full hover:bg-brown-light transition-colors"
            >
              Reserve A Table
            </a>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes menuModalIn { from { opacity: 0; } to { opacity: 1; } }
        @keyframes menuPanelIn { from { opacity: 0; transform: translateY(30px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes menuSectionIn { from { opacity: 0; transform: translateY(16px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes menuItemIn { from { opacity: 0; transform: translateX(-8px); } to { opacity: 1; transform: translateX(0); } }
      `}</style>
    </div>
  );
}

// ─────────────────────────────────────────────────
// DINING SECTION
// ─────────────────────────────────────────────────
function Dining() {
  const [menuOpen, setMenuOpen] = useState(false);

  const diningImages = [
    {
      src: "https://res.cloudinary.com/dx3k7hbnc/image/upload/q_auto,f_auto/v1777641412/dining-1_kkrq3k.png",
      alt: "Lustro Lagos fine dining",
    },
    {
      src: "https://res.cloudinary.com/dx3k7hbnc/image/upload/q_auto,f_auto/v1777641433/dining-2_hazzwe.jpg",
      alt: "Lustro Lagos cocktails",
    },
    {
      src: "https://res.cloudinary.com/dx3k7hbnc/image/upload/q_auto,f_auto/v1777641470/dining-3_ff2cut.png",
      alt: "Lustro Lagos restaurant interior",
    },
    {
      src: "https://res.cloudinary.com/dx3k7hbnc/image/upload/q_auto,f_auto/v1777641487/dining-5_kediuz.jpg",
      alt: "Lustro Lagos signature cuisine",
    },
  ];

  return (
    <section id="dining" className="bg-charcoal py-24 md:py-36 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">

        {/* Section Title — TOP, bold, centered */}
        <div className="text-center mb-12 reveal-element">
          <p className="font-dm-sans text-[0.65rem] text-gold uppercase tracking-[0.28em] mb-4 font-bold">
            Signature Dining
          </p>
          <h2 className="font-cormorant text-5xl md:text-6xl text-cream font-light leading-[1.1]">
            Lustro Lagos{" "}
            <em className="italic text-gold">Restaurant</em>
          </h2>
          <div className="section-line mx-auto mt-6" />
        </div>

        {/* Image Grid — sequential animation */}
        <div className="grid grid-cols-2 gap-3 mb-14">
          <div className="flex flex-col gap-3">
            <div className="dining-img-1 relative rounded-xl overflow-hidden h-72 img-zoom">
              <Image
                src={diningImages[0].src}
                alt={diningImages[0].alt}
                fill
                sizes="(max-width: 768px) 50vw, 25vw"
                className="object-cover"
                quality={100}
              />
            </div>
            <div className="dining-img-3 relative rounded-xl overflow-hidden h-44 img-zoom">
              <Image
                src={diningImages[2].src}
                alt={diningImages[2].alt}
                fill
                sizes="(max-width: 768px) 50vw, 25vw"
                className="object-cover"
                quality={100}
              />
            </div>
          </div>

          <div className="flex flex-col gap-3">
            <div className="dining-img-2 relative rounded-xl overflow-hidden h-44 img-zoom">
              <Image
                src={diningImages[1].src}
                alt={diningImages[1].alt}
                fill
                sizes="(max-width: 768px) 50vw, 25vw"
                className="object-cover"
                quality={100}
              />
            </div>
            <div className="dining-img-4 relative rounded-xl overflow-hidden h-72 img-zoom">
              <Image
                src={diningImages[3].src}
                alt={diningImages[3].alt}
                fill
                sizes="(max-width: 768px) 50vw, 25vw"
                className="object-cover"
                quality={100}
              />
            </div>
          </div>
        </div>

        {/* Text + CTAs below images */}
        <div className="grid md:grid-cols-2 gap-10 items-start reveal-from-left">
          <div>
            <p className="font-dm-sans text-cream/60 leading-[1.85] text-sm md:text-base mb-5">
              Lustro Lagos is more than a restaurant — it's an immersive sensory
              experience. We source the finest local ingredients and reimagine
              them through a global culinary lens, delivering a menu that
              surprises, delights, and lingers long after the last bite.
            </p>
            <p className="font-dm-sans text-cream/60 leading-[1.85] text-sm md:text-base">
              Whether you're celebrating a milestone, hosting a business dinner,
              or simply treating yourself — our team is dedicated to making every
              meal an occasion. Open to both in-house guests and the public.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-4 md:justify-end md:items-start">
            <button
              onClick={() => setMenuOpen(true)}
              className="bg-brown text-cream font-dm-sans text-sm px-8 py-3.5 rounded-full hover:bg-brown-light transition-colors text-center"
            >
              Explore Lustro's Menu
            </button>
            <a
              href="https://instagram.com/lustro_lagos"
              target="_blank"
              rel="noopener noreferrer"
              className="border border-cream/20 text-cream font-dm-sans text-sm px-8 py-3.5 rounded-full hover:bg-cream/10 transition-colors text-center"
            >
              @lustro_lagos
            </a>
          </div>
        </div>
      </div>

      {menuOpen && <MenuModal onClose={() => setMenuOpen(false)} />}

      <style>{`
        @keyframes diningReveal {
          from { opacity: 0; transform: translateY(40px) scale(0.97); }
          to   { opacity: 1; transform: translateY(0) scale(1); }
        }
        .dining-img-1 { opacity: 0; animation: diningReveal 0.7s cubic-bezier(0.25,0.46,0.45,0.94) 0.1s forwards; }
        .dining-img-2 { opacity: 0; animation: diningReveal 0.7s cubic-bezier(0.25,0.46,0.45,0.94) 0.35s forwards; }
        .dining-img-3 { opacity: 0; animation: diningReveal 0.7s cubic-bezier(0.25,0.46,0.45,0.94) 0.6s forwards; }
        .dining-img-4 { opacity: 0; animation: diningReveal 0.7s cubic-bezier(0.25,0.46,0.45,0.94) 0.85s forwards; }
      `}</style>
    </section>
  );
}

// ─────────────────────────────────────────────────
// GALLERY
// ─────────────────────────────────────────────────
type GalleryItem =
  | { type: "video"; publicId: string; label: string }
  | { type: "image"; src: string; alt: string; label: string };

function Gallery() {
  const [activeIdx, setActiveIdx] = useState(0);
  const [muted, setMuted] = useState(true);
  const [playing, setPlaying] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const sectionRef = useRef<HTMLElement>(null);

  const items: GalleryItem[] = [
    { type: "video", publicId: "Lustro_Gallery_video_1_oxi2ea", label: "Lustro Life" },
    { type: "video", publicId: "Lustro_Gallery_video_2_ui7i9q", label: "The Experience" },
    { type: "video", publicId: "Lustro_Gallery_video_3_chx6hw", label: "Inside Lustro" },
    { type: "video", publicId: "Lustro_Gallery_video_4_nrxt34", label: "The Spaces" },
    { type: "image", src: "https://res.cloudinary.com/dx3k7hbnc/image/upload/q_auto,f_auto/v1777562618/hero-1_jlcvld.png", alt: "Lustro Homes exterior", label: "Exterior" },
    { type: "image", src: "https://res.cloudinary.com/dx3k7hbnc/image/upload/q_auto,f_auto/v1777642365/gallery-7_tmifgb.jpg", alt: "Lustro Lagos neon sign", label: "Neon Sign" },
    { type: "image", src: "https://res.cloudinary.com/dx3k7hbnc/image/upload/q_auto,f_auto/v1777569685/hero-3_oqrukn.jpg", alt: "Lustro Homes suite", label: "The Suite" },
    { type: "image", src: "https://res.cloudinary.com/dx3k7hbnc/image/upload/q_auto,f_auto/v1777642363/gallery-2_poa1ee.jpg", alt: "Lustro Lagos dining", label: "Dining" },
    { type: "image", src: "https://res.cloudinary.com/dx3k7hbnc/image/upload/q_auto,f_auto/v1777642372/gallery-4_qk8z3h.jpg", alt: "Lustro staircase", label: "Architecture" },
    { type: "image", src: "https://res.cloudinary.com/dx3k7hbnc/image/upload/q_auto,f_auto/v1777642363/gallery-6_sq3uy3.jpg", alt: "Lustro Homes lounge", label: "Lounge" },
    { type: "image", src: "https://res.cloudinary.com/dx3k7hbnc/image/upload/q_auto,f_auto/v1777570438/hero-5_gzikdc.png", alt: "Lustro night exterior", label: "Night View" },
    { type: "image", src: "https://res.cloudinary.com/dx3k7hbnc/image/upload/q_auto,f_auto/v1777642364/gallery-5_vapgeo.jpg", alt: "Lustro Homes amenities", label: "Amenities" },
  ];

  const activeItem = items[activeIdx];

  const getVideoUrl = (publicId: string) =>
    `https://res.cloudinary.com/dx3k7hbnc/video/upload/${publicId}.mp4`;

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          if (activeItem.type === "video") {
            videoRef.current?.play().catch(() => {});
            setPlaying(true);
          }
        } else {
          videoRef.current?.pause();
          setPlaying(false);
        }
      },
      { threshold: 0.4 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, [activeIdx, activeItem.type]);

  const handleVideoEnded = () => {
    const next = (activeIdx + 1) % items.length;
    setActiveIdx(next);
    setPlaying(true);
  };

  const togglePlay = () => {
    if (!videoRef.current) return;
    playing ? videoRef.current.pause() : videoRef.current.play();
    setPlaying(!playing);
  };

  const toggleMute = () => {
    if (!videoRef.current) return;
    videoRef.current.muted = !muted;
    setMuted(!muted);
  };

  const goPrev = () => {
    videoRef.current?.pause();
    setActiveIdx((i) => (i - 1 + items.length) % items.length);
    setPlaying(true);
  };

  const goNext = () => {
    videoRef.current?.pause();
    setActiveIdx((i) => (i + 1) % items.length);
    setPlaying(true);
  };

  return (
    <section ref={sectionRef} id="gallery" className="bg-cream py-24 md:py-36">
      <div className="max-w-5xl mx-auto px-6">

        {/* Header */}
        <div className="text-center mb-14 reveal-element">
          <p className="font-dm-sans text-[0.65rem] text-brown uppercase tracking-[0.28em] mb-4">
            Gallery
          </p>
          <h2 className="font-cormorant text-5xl md:text-6xl text-charcoal font-light">
            Life at Lustro
          </h2>
          <div className="section-line mx-auto mt-6" />
        </div>

        <div className="reveal-element">

          {/* Main Display */}
          <div
            className="relative rounded-2xl overflow-hidden bg-charcoal select-none"
            style={{ maxHeight: "520px" }}
          >

            {/* VIDEO */}
            {activeItem.type === "video" && (
              <>
                <video
                  ref={videoRef}
                  key={activeItem.publicId}
                  src={getVideoUrl(activeItem.publicId)}
                  muted={muted}
                  loop={false}
                  playsInline
                  disablePictureInPicture
                  onClick={togglePlay}
                  onEnded={handleVideoEnded}
                  onLoadedMetadata={(e) => {
                    Array.from(e.currentTarget.textTracks).forEach(
                      (t) => (t.mode = "hidden")
                    );
                    if (playing) e.currentTarget.play().catch(() => {});
                  }}
                  className="w-full object-cover cursor-pointer"
                  style={{ width: "100%", height: "auto", pointerEvents: "auto" } as React.CSSProperties}
                  controlsList="nodownload nofullscreen noremoteplayback"
                  onContextMenu={(e) => e.preventDefault()}
                />

                

                {/* Counter — top right */}
                <div className="absolute top-5 right-5 pointer-events-none">
                  <span className="font-dm-sans text-[0.52rem] text-cream/45 tracking-[0.3em] uppercase">
                    {activeIdx + 1} / {items.length}
                  </span>
                </div>

                {/* Controls */}
                <div className="absolute bottom-0 left-0 right-0 px-5 py-4 flex items-center justify-between bg-gradient-to-t from-black/55 to-transparent">
                  <button
                    onClick={togglePlay}
                    className="w-9 h-9 rounded-full bg-white/15 backdrop-blur-sm flex items-center justify-center hover:bg-white/25 transition-colors"
                    aria-label={playing ? "Pause" : "Play"}
                  >
                    {playing ? (
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 text-white">
                        <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" />
                      </svg>
                    ) : (
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 text-white ml-0.5">
                        <path d="M8 5.14v14l11-7-11-7z" />
                      </svg>
                    )}
                  </button>

                  <div className="flex items-center gap-5">
                    <button onClick={goPrev} className="text-cream/60 hover:text-cream transition-colors" aria-label="Previous">
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-5 h-5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                      </svg>
                    </button>
                    <button onClick={goNext} className="text-cream/60 hover:text-cream transition-colors" aria-label="Next">
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-5 h-5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                      </svg>
                    </button>
                  </div>

                  <button
                    onClick={toggleMute}
                    className="w-9 h-9 rounded-full bg-white/15 backdrop-blur-sm flex items-center justify-center hover:bg-white/25 transition-colors"
                    aria-label={muted ? "Unmute" : "Mute"}
                  >
                    {muted ? (
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 text-white">
                        <path d="M16.5 12A4.5 4.5 0 0 0 14 7.97v2.21l2.45 2.45c.03-.2.05-.41.05-.63zm2.5 0c0 .94-.2 1.82-.54 2.64l1.51 1.51A8.796 8.796 0 0 0 21 12c0-4.28-3-7.86-7-8.77v2.06c2.89.86 5 3.54 5 6.71zM4.27 3L3 4.27 7.73 9H3v6h4l5 5v-6.73l4.25 4.25c-.67.52-1.42.93-2.25 1.18v2.06A8.99 8.99 0 0 0 17.73 18l1.73 1.73L21 18.46 5.54 3 4.27 3zM12 4L9.91 6.09 12 8.18V4z" />
                      </svg>
                    ) : (
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 text-white">
                        <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3A4.5 4.5 0 0 0 14 7.97v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77 0-4.28-2.99-7.86-7-8.77z" />
                      </svg>
                    )}
                  </button>
                </div>
              </>
            )}

            {/* IMAGE */}
            {activeItem.type === "image" && (
              <>
                <img
                  key={activeItem.src}
                  src={activeItem.src}
                  alt={activeItem.alt}
                  className="w-full object-cover"
                  style={{ maxHeight: "420px" }}
                />

                

                {/* Counter — top right */}
                <div className="absolute top-5 right-5 pointer-events-none">
                  <span className="font-dm-sans text-[0.52rem] text-cream/45 tracking-[0.3em] uppercase">
                    {activeIdx + 1} / {items.length}
                  </span>
                </div>

                {/* Prev / Next for images */}
                <div className="absolute bottom-0 left-0 right-0 px-5 py-4 flex items-center justify-center gap-5 bg-gradient-to-t from-black/40 to-transparent">
                  <button onClick={goPrev} className="text-cream/60 hover:text-cream transition-colors" aria-label="Previous">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-5 h-5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                    </svg>
                  </button>
                  <button onClick={goNext} className="text-cream/60 hover:text-cream transition-colors" aria-label="Next">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-5 h-5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                </div>
              </>
            )}
          </div>

          {/* Prev / Next only */}
          <div className="flex items-center justify-between mt-4 px-1">
            <button
              onClick={goPrev}
              className="flex items-center gap-2 font-dm-sans text-[0.65rem] text-charcoal/50 uppercase tracking-wider hover:text-charcoal transition-colors"
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-4 h-4">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
              </svg>
              Prev
            </button>

            <span className="font-dm-sans text-[0.55rem] text-charcoal/30 uppercase tracking-[0.3em]">
              {activeIdx + 1} / {items.length}
            </span>

            <button
              onClick={goNext}
              className="flex items-center gap-2 font-dm-sans text-[0.65rem] text-charcoal/50 uppercase tracking-wider hover:text-charcoal transition-colors"
            >
              Next
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-4 h-4">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>

        </div>
      </div>

        {/* Instagram link */}
        <div className="text-center mt-12 reveal-element">
          <a
            href="https://instagram.com/lustro_homes"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 font-dm-sans text-sm text-brown hover:text-brown-light transition-colors"
          >
            <span>Follow @lustro_homes for more moments</span>
            <span className="text-base">→</span>
          </a>
        </div>
      
    </section>
  );
}

// ─────────────────────────────────────────────────
// INVESTMENT JOURNEY
// ─────────────────────────────────────────────────
function Investment() {
  const [videoOpen, setVideoOpen] = useState(false);

  const INVEST_VIDEO_EMBED =
    "https://player.cloudinary.com/embed/?cloud_name=dx3k7hbnc&public_id=Lustro_investment_jaijaq&autoplay=true&controls=true&quality=auto:best";

  const milestones = [
    {
      title: "LUSTRO 1.0 — THE BLUEPRINT",
      subtitle: "Where Yaba First Met Luxury",
      story:
        "We started with one goal — build the most sought-after shortlet experience in Yaba. What emerged was more than an apartment. It was a lifestyle statement. Signature in-house dining, world-class aesthetics, and a hospitality standard that Lagos had never seen at this level.",
      stats: [
        { value: "15,000+", label: "Guests Hosted" },
        { value: "₦2M+", label: "Monthly Revenue" },
        { value: "₦1.4M/mo", label: "Investor Profit" },
      ],
      status: "SOLD OUT & ACTIVE",
      quote: '"The proof is in the staying."',
      pricing: null,
    },
    {
      title: "LUSTRO 2.0 — THE YANKEE EDITION",
      subtitle: "Luxury Redefined on the Mainland",
      story:
        "We took everything that made 1.0 exceptional and brought it to the Lagos Mainland. Launched December 16th — sold out before the year ended. No delays. No excuses. Our investors were earning before most people even heard about it. When demand is real, results follow.",
      stats: [
        { value: "Sold Out", label: "Launch Status" },
        { value: "₦1.4M+", label: "Monthly Returns" },
        { value: "100%", label: "Satisfaction" },
      ],
      status: "SOLD OUT & DELIVERING",
      quote: '"Our standard is now everyone else\'s benchmark."',
      pricing: null,
    },
    {
      title: "LUSTRO 3.0 — THE SMART ECOSYSTEM",
      subtitle: "The Ultimate Lifestyle Sanctuary",
      story:
        "Our most ambitious project yet — and it delivered. Fully automated smart apartment units. Yaba's first in-house spa. A fully equipped professional gym. Every detail engineered for maximum occupancy, maximum returns, and a living experience that simply does not exist anywhere else on the Mainland.",
      stats: [
        { value: "Full Auto", label: "Smart Features" },
        { value: "Yaba's First", label: "In-House Spa" },
        { value: "₦1.4M/mo", label: "Investor ROI" },
      ],
      status: "COMPLETED & EARNING",
      quote: '"We don\'t build houses. We engineer the future."',
      pricing: [
        { label: "Part Ownership", value: "₦32.5M", tag: "Sold Out" },
        { label: "Full Ownership", value: "₦65M", tag: "Sold Out" },
      ],
    },
  ];

  return (
    <section id="invest" className="bg-charcoal-light py-24 md:py-36">
      <div className="max-w-4xl mx-auto px-6">

        {/* Header */}
        <div className="text-center mb-16 reveal-element">
          <p className="font-dm-sans text-[0.65rem] text-gold uppercase tracking-[0.28em] mb-4">
            Investment Journey
          </p>
          <h2 className="font-cormorant text-4xl md:text-5xl text-cream font-light leading-[1.15] mb-6">
            The Lustro Journey —{" "}
            <em className="italic text-gold">From Vision to Value</em>
          </h2>
          <p className="font-dm-sans text-cream/45 text-sm tracking-wide mb-10">
            3 Iconic Projects. 100% Delivery. A New Era.
          </p>
          {/* Opening hook */}
          <div className="text-left bg-charcoal/50 rounded-2xl p-8 border border-white/5">
            <p className="font-cormorant text-2xl md:text-3xl text-cream font-light leading-[1.6] italic">
              "Most properties sit underperforming — wrong structure, wrong
              aesthetics, wrong management. At Lustro, we proved that done
              right, a single apartment can generate over{" "}
              <span className="text-gold not-italic font-normal">
                ₦2 million every month
              </span>{" "}
              — and deliver{" "}
              <span className="text-gold not-italic font-normal">
                ₦1.4 million pure profit
              </span>{" "}
              to investors. Consistently. Every month. This is the track
              record."
            </p>
          </div>
        </div>

       
        {/* ── Bento Video Block ── */}
<div className="reveal-element mb-16">
  <div
    onClick={() => setVideoOpen(true)}
    className="relative rounded-2xl overflow-hidden cursor-pointer group"
    style={{ paddingTop: "128%" }}
  >
    {/* Actual video as background — muted, shows real content */}
    <video
      src="https://res.cloudinary.com/dx3k7hbnc/video/upload/Lustro_investment_jaijaq.mp4"
      muted
      loop
      autoPlay
      playsInline
      className="absolute inset-0 w-full h-full object-cover"
    />

    {/* Dark overlay */}
    <div className="absolute inset-0 bg-black/45 group-hover:bg-black/30 transition-all duration-700" />

    {/* Play Button — centered, clean */}
    <div className="absolute inset-0 flex flex-col items-center justify-center gap-4">
      <div className="relative w-16 h-16 rounded-full border-2 border-cream/70 flex items-center justify-center group-hover:border-gold group-hover:scale-110 transition-all duration-700">
        <div className="absolute inset-0 rounded-full border border-cream/20 scale-125 group-hover:scale-150 transition-transform duration-700 opacity-60" />
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          className="w-6 h-6 text-cream group-hover:text-gold transition-colors ml-0.5"
        >
          <path d="M8 5.14v14l11-7-11-7z" />
        </svg>
      </div>
      <p className="font-dm-sans text-[0.65rem] text-cream/60 uppercase tracking-[0.25em] group-hover:text-gold transition-colors">
        Watch the Lustro Story
      </p>
    </div>
  </div>
</div>

        {/* Timeline */}
        <div className="space-y-14">
          {milestones.map((m) => (
            <div key={m.title} className="milestone-card reveal-element">
              <div className="mb-4">
                <span className="status-badge">
                  <span className="pulse-dot" />
                  {m.status}
                </span>
              </div>
              <h3 className="font-cormorant text-2xl md:text-3xl text-cream font-light mb-1 tracking-wide">
                {m.title}
              </h3>
              <p className="font-dm-sans text-sm text-gold mb-4 tracking-wide">
                {m.subtitle}
              </p>
              <p className="font-dm-sans text-cream/55 text-sm leading-[1.85] mb-7">
                {m.story}
              </p>

              {/* Stats grid */}
              <div className="grid grid-cols-3 gap-3 mb-7">
                {m.stats.map((s) => (
                  <div
                    key={s.label}
                    className="bg-charcoal/60 rounded-xl p-4 border border-white/5 overflow-hidden flex flex-col justify-between min-h-[90px]"
                  >
                    <p className="font-cormorant text-lg md:text-2xl text-gold font-light leading-tight whitespace-nowrap">
                      {s.value}
                    </p>
                    <p className="font-dm-sans text-[0.6rem] text-cream/70 uppercase tracking-wider mt-3 leading-tight">
                      {s.label}
                    </p>
                  </div>
                ))}
              </div>

              {/* Pricing reference (3.0 only) */}
              {m.pricing && (
                <div className="flex gap-4 mb-7">
                  {m.pricing.map((p) => (
                    <div
                      key={p.label}
                      className="flex-1 bg-charcoal/40 rounded-xl p-4 border border-white/5"
                    >
                      <div className="flex items-center justify-between mb-2">
                        <p className="font-dm-sans text-[0.6rem] text-cream/35 uppercase tracking-wider">
                          {p.label}
                        </p>
                        <span className="font-dm-sans text-[0.55rem] bg-brown/30 text-brown-light border border-brown/20 px-2 py-1 rounded-full uppercase tracking-wider whitespace-nowrap">
                          {p.tag}
                        </span>
                      </div>
                      <p className="font-cormorant text-2xl text-cream/50 font-light line-through decoration-gold/50">
                        {p.value}
                      </p>
                    </div>
                  ))}
                </div>
              )}

              <p className="font-cormorant text-lg text-cream/40 italic">
                {m.quote}
              </p>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div
          className="glass mt-20 rounded-2xl p-10 md:p-14 text-center reveal-element"
          style={{ isolation: "isolate" }}
        >
          <p className="font-dm-sans text-[0.65rem] text-gold uppercase tracking-[0.28em] mb-4">
            What's Next
          </p>
          <h3 className="font-cormorant text-4xl md:text-5xl text-cream font-light mb-5">
            Built on a Track Record,{" "}
            <em className="italic text-gold">Not Promises.</em>
          </h3>
          <p className="font-dm-sans text-cream/55 text-sm leading-[1.85] max-w-md mx-auto mb-9">
            Three projects. Three sold-out launches. Three sets of investors
            earning every month. If you want to be part of what Lustro builds
            next — get in touch now.
          </p>
          <a
            href={`${WHATSAPP_URL}?text=I'm interested in upcoming Lustro Homes investment opportunities`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-brown text-cream font-dm-sans px-14 py-4 rounded-full text-sm hover:bg-brown-light transition-colors shadow-lg"
          >
            Get In Touch
          </a>
        </div>
      </div>

     
    {/* Video Modal — Full Screen */}
      {videoOpen && (
        <div
          className="fixed inset-0 z-[100] bg-black flex items-center justify-center"
          style={{ animation: "modalFadeIn 0.35s ease forwards" }}
        >
          <button
            onClick={() => setVideoOpen(false)}
            className="absolute top-5 right-5 z-10 w-11 h-11 rounded-full bg-white/10 flex items-center justify-center hover:bg-brown transition-colors"
            aria-label="Close video"
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-5 h-5 text-cream">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
          <video
            src="https://res.cloudinary.com/dx3k7hbnc/video/upload/Lustro_investment_jaijaq.mp4"
            controls
            autoPlay
            playsInline
            preload="auto"
            className="w-full h-full object-cover"
            style={{ animation: "modalScaleIn 0.4s cubic-bezier(0.25,0.46,0.45,0.94) forwards" }}
            onLoadedMetadata={(e) => {
              const video = e.currentTarget;
              Array.from(video.textTracks).forEach((track) => {
                track.mode = "hidden";
              });
            }}
          />
        </div>
      )}

    </section>
  );
}

// ─────────────────────────────────────────────────
// TESTIMONIALS
// ─────────────────────────────────────────────────
function Testimonials() {
  const reviews = [
    {
      name: "Adaeze O.",
      location: "Lekki, Lagos",
      stars: 5,
      text: "From the moment we arrived, everything was perfect. The room aesthetics, the service, the food at Lustro Lagos — I have never experienced anything like it in Nigeria.",
    },
    {
      name: "Tunde M.",
      location: "Ikeja, Lagos",
      stars: 5,
      text: "Yankee by Lustro is a different world entirely. My girls and I booked for a staycation and did not want to leave. Every corner is Instagram-worthy.",
    },
    {
      name: "Chisom E.",
      location: "Abuja",
      stars: 5,
      text: "I was visiting Lagos for a conference and chose Lustro on a recommendation. Best decision I made. The room felt like an international hotel.",
    },
  ];

  return (
    <section className="bg-cream-dark py-24 md:py-36">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-16 reveal-element">
          <p className="font-dm-sans text-[0.65rem] text-brown uppercase tracking-[0.28em] mb-4">
            Guest Reviews
          </p>
          <h2 className="font-cormorant text-5xl md:text-6xl text-charcoal font-light">
            What Our Guests Say
          </h2>
          <div className="section-line mx-auto mt-6" />
        </div>

        {/* Cards */}
        <div className="grid md:grid-cols-3 gap-8">
          {reviews.map((r, i) => (
            <div
              key={r.name}
              className="card-lift reveal-element bg-cream rounded-2xl p-8 shadow-sm"
              style={{ transitionDelay: `${i * 0.1}s` }}
            >
              {/* Stars */}
              <div className="flex gap-0.5 mb-6">
                {Array.from({ length: r.stars }).map((_, si) => (
                  <span key={si} className="text-gold text-xl leading-none">
                    ★
                  </span>
                ))}
              </div>

              {/* Quote */}
              <p className="font-cormorant text-xl text-charcoal italic leading-[1.7] mb-7">
                &ldquo;{r.text}&rdquo;
              </p>

              {/* Attribution */}
              <div className="border-t border-charcoal/8 pt-5">
                <p className="font-dm-sans text-sm font-medium text-charcoal">
                  {r.name}
                </p>
                <p className="font-dm-sans text-xs text-charcoal/45 mt-0.5">
                  {r.location}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────────
// CONTACT SECTION
// ─────────────────────────────────────────────────
function Contact() {
  const contactCards = [
    {
      icon: "📱",
      title: "WhatsApp Us",
      detail: "Chat with us directly",
      href: `${WHATSAPP_URL}?text=Hello, I'd like to make an enquiry`,
    },
    {
      icon: "📍",
      title: "Our Location",
      detail: "37 Ibukun Olu St, Akoka, Yaba",
      href: "https://maps.app.goo.gl/xF2wtFGyA51vkgba9",
    },
    {
      icon: "📸",
      title: "Instagram",
      detail: "@lustro_homes",
      href: "https://instagram.com/lustro_homes",
    },
  ];

  return (
    <section id="contact" className="relative py-28 md:py-40 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 z-0">
        <Image
          src="https://images.unsplash.com/photo-1564501049412-61c2a3083791?auto=format&fit=crop&w=1920&q=85"
          alt="Lustro Homes contact section"
          fill
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-charcoal/82" />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
        <div className="reveal-element mb-16">
          <p className="font-dm-sans text-[0.65rem] text-gold uppercase tracking-[0.28em] mb-5">
            Get In Touch
          </p>
          <h2 className="font-cormorant text-5xl md:text-7xl text-cream font-light leading-[1.1]">
            Ready to Experience{" "}
            <em className="italic text-gold">Lustro?</em>
          </h2>
        </div>

        {/* Contact cards */}
        <div className="grid md:grid-cols-3 gap-5 mb-14">
          {contactCards.map((card, i) => (
            <a
              key={card.title}
              href={card.href}
              target="_blank"
              rel="noopener noreferrer"
              className="reveal-element glass rounded-2xl p-8 text-center hover:scale-[1.02] transition-transform block"
              style={{
                isolation: "isolate",
                transitionDelay: `${i * 0.08}s`,
              }}
            >
              <span className="text-4xl mb-4 block">{card.icon}</span>
              <h3 className="font-cormorant text-2xl text-cream mb-2">
                {card.title}
              </h3>
              <p className="font-dm-sans text-sm text-cream/55">
                {card.detail}
              </p>
            </a>
          ))}
        </div>

        {/* Main CTA */}
        <div className="reveal-element">
          <a
            href={`${WHATSAPP_URL}?text=I'd like to book a stay at Lustro Homes`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-brown text-cream font-dm-sans px-14 py-4 rounded-full text-sm hover:bg-brown-light transition-colors shadow-lg"
          >
            Book Your Stay Now
          </a>
        </div>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────────
// FOOTER
// ─────────────────────────────────────────────────
function Footer() {
  const navLinks = [
    
    { label: "About", href: "#about" },
    { label: "Rooms", href: "#rooms" },
    { label: "Dining", href: "#dining" },
    { label: "Gallery", href: "#gallery" },
    { label: "Invest", href: "#invest" },
    { label: "Contact", href: "#contact" },
  ];

  const handleFooterNav = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string
  ) => {
    e.preventDefault();
    document.querySelector(href)?.scrollIntoView({ behavior: "instant" });
  };

  return (
    <footer className="bg-charcoal border-t border-white/5">
      <div className="max-w-7xl mx-auto px-6 py-16 grid md:grid-cols-3 gap-12 md:gap-16">
        {/* Col 1 — Brand */}
        <div>
          <div className="flex items-center gap-3 mb-5">
            <div className="relative w-16 h-16">
  <Image
    src="https://res.cloudinary.com/dx3k7hbnc/image/upload/q_auto,f_auto/v1777567002/lustrologo_wfervy.png"
    alt="Lustro Homes Logo"
    fill
    sizes="192px"
    quality={100}
    className="object-contain"
  />
</div>
            <span className="font-cormorant text-cream font-semibold text-xl tracking-wide">
              Lustro Homes
            </span>
          </div>
          <p className="font-dm-sans text-[0.65rem] text-gold uppercase tracking-wider mb-5">
            Staycation in Lagos · Signature Dining · Investment
          </p>
          <p className="font-dm-sans text-cream/45 text-sm leading-[1.8]">
            Lagos' most sought-after shortlet experience and signature dining
            destination, nestled in the heart of Yaba.
          </p>
        </div>

        {/* Col 2 — Navigation */}
        <div>
          <h4 className="font-dm-sans text-[0.6rem] text-cream/25 uppercase tracking-[0.25em] mb-7">
            Explore
          </h4>
          <div className="space-y-3.5">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={(e) => handleFooterNav(e, link.href)}
                className="block font-dm-sans text-sm text-cream/50 hover:text-cream transition-colors"
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>

        {/* Col 3 — Social */}
        <div>
          <h4 className="font-dm-sans text-[0.6rem] text-cream/25 uppercase tracking-[0.25em] mb-7">
            Connect
          </h4>
          <div className="space-y-4">
            <a
              href="https://instagram.com/lustro_homes"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 group"
            >
              <span className="font-dm-sans text-sm text-cream/50 group-hover:text-cream transition-colors">
                Instagram — @lustro_homes
              </span>
            </a>
            <a
              href="https://instagram.com/lustro_lagos"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 group"
            >
              <span className="font-dm-sans text-sm text-cream/50 group-hover:text-cream transition-colors">
                Instagram — @lustro_lagos
              </span>
            </a>
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 group"
            >
              <span className="font-dm-sans text-sm text-cream/50 group-hover:text-cream transition-colors">
                WhatsApp — Booking
              </span>
            </a>
            <div className="pt-4">
              <p className="font-dm-sans text-xs text-cream/30 leading-relaxed">
                37 Ibukun Olu Street,
                <br />
                Akoka, Yaba, Lagos, Nigeria
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/5">
        <div className="max-w-7xl mx-auto px-6 py-5 flex flex-col md:flex-row justify-between items-center gap-3">
          <p className="font-dm-sans text-xs text-cream/25">
            © {new Date().getFullYear()} Lustro Homes. All rights reserved.
          </p>
          <p className="font-dm-sans text-xs text-cream/25">
            Crafted with precision · Yaba, Lagos, Nigeria
          </p>
        </div>
      </div>
    </footer>
  );
}

// ─────────────────────────────────────────────────
// MAIN HOME COMPONENT
// ─────────────────────────────────────────────────
export default function Home() {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, []);
  const [navScrolled, setNavScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Scroll detection
  useEffect(() => {
    const onScroll = () => setNavScrolled(window.scrollY > 80);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Body scroll lock when mobile menu open
  useEffect(() => {
    document.body.style.overflow = mobileMenuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileMenuOpen]);

  // GSAP ScrollTrigger animations
  useEffect(() => {
    let gsapCtx: { revert: () => void } | null = null;

    const initGSAP = async () => {
      try {
        const { gsap } = await import("gsap");
        const { ScrollTrigger } = await import("gsap/ScrollTrigger");
        gsap.registerPlugin(ScrollTrigger);

        gsapCtx = gsap.context(() => {
          // Standard reveal elements
          gsap.utils.toArray<Element>(".reveal-element").forEach((el) => {
            gsap.fromTo(
              el,
              { opacity: 0, y: 50 },
              {
                opacity: 1,
                y: 0,
                duration: 0.9,
                ease: "power3.out",
                scrollTrigger: {
                  trigger: el,
                  start: "top 87%",
                  once: true,
                },
              }
            );
          });

          // Reveal from left (dining text)
          gsap.utils.toArray<Element>(".reveal-from-left").forEach((el) => {
            gsap.fromTo(
              el,
              { opacity: 0, x: -60 },
              {
                opacity: 1,
                x: 0,
                duration: 0.9,
                ease: "power3.out",
                scrollTrigger: {
                  trigger: el,
                  start: "top 87%",
                  once: true,
                },
              }
            );
          });

          // Reveal from right (dining image grid)
          gsap.utils.toArray<Element>(".reveal-from-right").forEach((el) => {
            gsap.fromTo(
              el,
              { opacity: 0, x: 60 },
              {
                opacity: 1,
                x: 0,
                duration: 0.9,
                ease: "power3.out",
                scrollTrigger: {
                  trigger: el,
                  start: "top 87%",
                  once: true,
                },
              }
            );
          });

          // Gallery stagger
          const galleryItems = gsap.utils.toArray<Element>(".gallery-item");
          if (galleryItems.length) {
            gsap.fromTo(
              galleryItems,
              { opacity: 0, y: 32 },
              {
                opacity: 1,
                y: 0,
                stagger: 0.08,
                duration: 0.7,
                ease: "power3.out",
                scrollTrigger: {
                  trigger: galleryItems[0],
                  start: "top 90%",
                  once: true,
                },
              }
            );
          }
        });
      } catch (err) {
        console.warn("GSAP initialization failed — showing content without animations:", err);
        // Fallback: make all animated elements visible
        document.querySelectorAll(
          ".reveal-element, .reveal-from-left, .reveal-from-right, .gallery-item"
        ).forEach((el) => {
          (el as HTMLElement).style.opacity = "1";
          (el as HTMLElement).style.transform = "none";
        });
      }
    };

    initGSAP();

    return () => {
      gsapCtx?.revert();
    };
  }, []);

  // Lenis smooth scroll + GSAP ticker
  useEffect(() => {
    let cleanup: (() => void) | undefined;

    const initLenis = async () => {
      try {
        const LenisModule = await import("lenis");
        const Lenis = LenisModule.default;
        const { gsap } = await import("gsap");

        const lenis = new Lenis({
          lerp: 0.1,
          smoothWheel: true,
        });

        const tickerFn = (time: number) => {
          lenis.raf(time * 1000);
        };

        gsap.ticker.add(tickerFn);
        gsap.ticker.lagSmoothing(0);

        cleanup = () => {
          gsap.ticker.remove(tickerFn);
          lenis.destroy();
        };
      } catch (err) {
        console.warn(
          "Lenis smooth scroll unavailable — using native scroll:",
          err
        );
      }
    };

    initLenis();

    return () => {
      cleanup?.();
    };
  }, []);

  return (
    <main className="overflow-x-clip">
     <Hero />
     <StatsBar />
     <About />
     <Rooms />
     <Dining />
     <YankeeByLustro />
     <Gallery />
     <Investment />
     <Testimonials />
     <Contact />
     <Footer />
    </main>
  );
}

