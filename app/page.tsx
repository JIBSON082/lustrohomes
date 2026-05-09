"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import Image from "next/image";

// ─────────────────────────────────────────────────
// CONSTANTS
// ─────────────────────────────────────────────────
const WHATSAPP_NUMBER = "2348000000000"; // ← Replace with actual WhatsApp number
const WHATSAPP_URL = `https://wa.me/${WHATSAPP_NUMBER}`;

const NAV_LINKS = [
     
  { label: "About", href: "#about" },
  { label: "Rooms", href: "#rooms" },
  { label: "Dining", href: "#dining" },
  { label: "Gallery", href: "#gallery" },
  { label: "Invest", href: "#invest" },
  { label: "Contact", href: "#contact" },
];

// ─────────────────────────────────────────────────
// NAVBAR
// ─────────────────────────────────────────────────
function Navbar({
  scrolled,
  menuOpen,
  setMenuOpen,
}: {
  scrolled: boolean;
  menuOpen: boolean;
  setMenuOpen: (v: boolean) => void;
}) {
  const handleNavClick = useCallback(
    (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
      e.preventDefault();
      setMenuOpen(false);
      const target = document.querySelector(href);
      if (target) {
        target.scrollIntoView({ behavior: "instant" });
      }
    },
    [setMenuOpen]
  );

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? "bg-cream/92 backdrop-blur-md shadow-sm border-b border-charcoal/5"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          {/* Logo */}
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
            className="flex items-center gap-3 group"
          >
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
            <span
              className={`font-cormorant font-semibold text-xl tracking-wide transition-colors ${
                scrolled ? "text-charcoal" : "text-cream"
              }`}
            >
              Lustro Homes
            </span>
          </a>

          {/* Desktop links */}
          <div className="hidden md:flex items-center gap-8">
            <a
  href="#"
  onClick={(e) => {
    e.preventDefault();
    setMenuOpen(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }}
  className="font-cormorant text-3xl text-cream hover:text-gold transition-colors tracking-wide"
>
  Home
</a>
{NAV_LINKS.map((link, i) => (
  <a
    key={link.label}
    href={link.href}
    onClick={(e) => handleNavClick(e, link.href)}
    className="font-cormorant text-4xl text-cream hover:text-gold transition-colors tracking-wide"
    style={{ animationDelay: `${i * 0.05}s` }}
  >
    {link.label}
  </a>
))}
            <a
              href={`${WHATSAPP_URL}?text=I'd like to book a stay at Lustro Homes`}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-brown text-cream font-dm-sans text-sm px-5 py-2.5 rounded-full hover:bg-brown-light transition-colors shadow-md"
            >
              Book Now
            </a>
          </div>

          {/* Hamburger */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden flex flex-col justify-center gap-[5px] w-8 h-8 relative z-50"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
          >
            <span
              className={`block w-6 h-[1.5px] transition-all duration-300 origin-center ${
                menuOpen
                  ? "rotate-45 translate-y-[6.5px] bg-cream"
                  : scrolled
                  ? "bg-charcoal"
                  : "bg-cream"
              }`}
            />
            <span
              className={`block w-6 h-[1.5px] transition-all duration-300 ${
                menuOpen
                  ? "opacity-0 bg-cream"
                  : scrolled
                  ? "bg-charcoal"
                  : "bg-cream"
              }`}
            />
            <span
              className={`block w-6 h-[1.5px] transition-all duration-300 origin-center ${
                menuOpen
                  ? "-rotate-45 -translate-y-[6.5px] bg-cream"
                  : scrolled
                  ? "bg-charcoal"
                  : "bg-cream"
              }`}
            />
          </button>
        </div>
      </nav>

     
      {/* Mobile Menu Overlay */}
<div
  className={`mobile-menu ${
    menuOpen ? "open" : ""
  } fixed inset-0 z-40 bg-charcoal flex flex-col items-center justify-center`}
>
  <div className="flex flex-col items-center gap-5">
    {[{ label: "Home", href: "#" }, ...NAV_LINKS].map((link, i) => (
      <a
        key={link.label}
        href={link.href}
        onClick={(e) => {
          e.preventDefault();
          setMenuOpen(false);
          if (link.href === "#") {
            window.scrollTo({ top: 0, behavior: "smooth" });
          } else {
            document.querySelector(link.href)?.scrollIntoView({ behavior: "smooth" });
          }
        }}
        className="font-cormorant text-4xl text-cream hover:text-gold transition-colors tracking-wide"
        style={{
          opacity: menuOpen ? 1 : 0,
          transform: menuOpen ? "translateY(0)" : "translateY(20px)",
          transition: `opacity 0.4s ease ${i * 0.07}s, transform 0.4s ease ${i * 0.07}s`,
        }}
      >
        {link.label}
      </a>
    ))}
    <a
      href={`${WHATSAPP_URL}?text=I'd like to book a stay at Lustro Homes`}
      target="_blank"
      rel="noopener noreferrer"
      className="mt-4 bg-brown text-cream font-dm-sans px-10 py-3.5 rounded-full text-sm hover:bg-brown-light transition-colors"
      style={{
        opacity: menuOpen ? 1 : 0,
        transform: menuOpen ? "translateY(0)" : "translateY(20px)",
        transition: `opacity 0.4s ease 0.56s, transform 0.4s ease 0.56s`,
      }}
    >
      Book Your Stay
    </a>
    <div
      className="mt-4 flex gap-6"
      style={{
        opacity: menuOpen ? 1 : 0,
        transition: `opacity 0.4s ease 0.63s`,
      }}
    >
      <a
        href="https://instagram.com/lustro_homes"
        target="_blank"
        rel="noopener noreferrer"
        className="font-dm-sans text-xs text-cream/50 hover:text-gold transition-colors tracking-widest uppercase"
      >
        @lustro_homes
      </a>
      <a
        href="https://instagram.com/lustro_lagos"
        target="_blank"
        rel="noopener noreferrer"
        className="font-dm-sans text-xs text-cream/50 hover:text-gold transition-colors tracking-widest uppercase"
      >
        @lustro_lagos
      </a>
    </div>
  </div>
</div>
    </>
  );
}

// ─────────────────────────────────────────────────
// HERO SECTION — Cinematic Video Background
// ─────────────────────────────────────────────────
const HERO_VIDEO_URL =
  "https://res.cloudinary.com/dx3k7hbnc/video/upload/v1777632548/Hero-video_egr33p.mp4";

const HERO_PHRASES = ["Staycation", "Dining", "Investment"];

function Hero() {
  const [modalOpen, setModalOpen] = useState(false);
  const [phraseIdx, setPhraseIdx] = useState(0);
  const [animating, setAnimating] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setAnimating(true);
      setTimeout(() => {
        setPhraseIdx((prev) => (prev + 1) % HERO_PHRASES.length);
        setAnimating(false);
      }, 600);
    }, 3800);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const initAnim = async () => {
      try {
        const { gsap } = await import("gsap");
        const tl = gsap.timeline({ delay: 0.5 });
        tl.fromTo(
          ".hero-text",
          { opacity: 0, y: 40 },
          { opacity: 1, y: 0, duration: 1.1, ease: "power3.out" }
        )
          .fromTo(
            ".hero-play",
            { opacity: 0, scale: 0.85 },
            { opacity: 1, scale: 1, duration: 0.7, ease: "back.out(1.4)" },
            "-=0.5"
          )
          .fromTo(
            ".hero-ctas",
            { opacity: 0, y: 18 },
            { opacity: 1, y: 0, duration: 0.7, ease: "power3.out" },
            "-=0.3"
          );
      } catch {
        [".hero-text", ".hero-play", ".hero-ctas"].forEach((sel) => {
          document.querySelectorAll(sel).forEach((el) => {
            (el as HTMLElement).style.opacity = "1";
            (el as HTMLElement).style.transform = "none";
          });
        });
      }
    };
    initAnim();
  }, []);

  useEffect(() => {
    document.body.style.overflow = modalOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [modalOpen]);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Great+Vibes&display=swap');

        .phrase-mask {
          padding-bottom: 8px;
        }
        .phrase-word {
          display: block;
          will-change: transform, opacity;
          transition: transform 0.65s cubic-bezier(0.16,1,0.3,1), opacity 0.45s ease;
        }
        .phrase-word.visible {
          transform: translateY(0%);
          opacity: 1;
        }
        .phrase-word.exit {
          transform: translateY(-110%);
          opacity: 0;
        }
        @keyframes rotateCircle {
          from { transform: rotate(0deg); }
          to   { transform: rotate(360deg); }
        }
        @keyframes modalFadeIn {
          from { opacity: 0; }
          to   { opacity: 1; }
        }
        @keyframes modalScaleIn {
          from { opacity: 0; transform: scale(0.96); }
          to   { opacity: 1; transform: scale(1); }
        }
      `}</style>

      <section
        id="hero"
        className="relative h-[100dvh] w-full overflow-hidden bg-charcoal"
      >
        {/* Background Video */}
        <div
          className="absolute inset-0 z-0"
          style={{ transform: "translateZ(0)", willChange: "transform" }}
        >
          <video
            src={HERO_VIDEO_URL}
            autoPlay
            muted
            loop
            playsInline
            className="w-full h-full object-cover"
          />
        </div>

        {/* Gradient overlay */}
        <div className="absolute inset-0 z-10 bg-gradient-to-t from-black/85 via-black/10 to-transparent" />

        {/* Hero Content */}
        <div className="relative z-20 flex flex-col justify-end h-full px-6 pb-8">

          {/* Text + Play button row */}
          <div className="flex items-end justify-between mb-5">

            {/* Left — Crafted for + script word */}
            <div className="hero-text" style={{ opacity: 0 }}>
              <div className="flex items-center gap-3 mb-2">
                <div className="w-6 h-px bg-gold/60" />
                <p
                  className="font-dm-sans text-cream/50 uppercase"
                  style={{ fontSize: "0.85rem", letterSpacing: "0.35em" }}
                >
                  Crafted for
                </p>
              </div>
              <div className="phrase-mask">
                <span
                  className={`phrase-word ${animating ? "exit" : "visible"}`}
                  style={{
                    fontFamily: "'Great Vibes', cursive",
                    fontSize: "clamp(42px, 11vw, 58px)",
                    color: "#C8922A",
                    lineHeight: 1.05,
                  }}
                >
                  {HERO_PHRASES[phraseIdx]}
                </span>
              </div>
            </div>

            {/* Right — Rotating play button */}
            <div
              className="hero-play flex-shrink-0 ml-3 mb-1"
              style={{ opacity: 0 }}
            >
              <button
                onClick={() => setModalOpen(true)}
                className="relative w-[160px] h-[160px] flex items-center justify-center group"
                aria-label="Watch for more"
              >
                <svg
                  viewBox="0 0 160 160"
                  className="absolute inset-0 w-full h-full"
                  style={{ animation: "rotateCircle 9s linear infinite" }}
                >
                  <defs>
                    <path
                      id="circle-path-hero"
                      d="M 80,80 m -60,0 a 60,60 0 1,1 120,0 a 60,60 0 1,1 -120,0"
                    />
                  </defs>
                  <text
                    style={{
                      fontSize: "12px",
                      letterSpacing: "5px",
                      fill: "#C8922A",
                      fontFamily: "DM Sans, sans-serif",
                    }}
                  >
                    <textPath href="#circle-path-hero">
                      WATCH FOR MORE ·
                    </textPath>
                  </text>
                </svg>
                <div className="relative w-16 h-16 rounded-full border border-cream/60 flex items-center justify-center bg-white/10 backdrop-blur-sm group-hover:scale-110 group-hover:border-gold transition-all duration-500">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="w-6 h-6 text-cream group-hover:text-gold transition-colors ml-0.5"
                  >
                    <path d="M8 5.14v14l11-7-11-7z" />
                  </svg>
                </div>
              </button>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="hero-ctas flex flex-row gap-3 w-full" style={{ opacity: 0 }}>
            <a
              href={`${WHATSAPP_URL}?text=I'd like to book a stay at Lustro Homes`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 text-center bg-brown text-cream font-dm-sans text-[0.9rem] py-4 rounded-full hover:bg-brown-light transition-colors shadow-lg"
            >
              Book Your Stay
            </a>
            <a
              href="#rooms"
              onClick={(e) => {
                e.preventDefault();
                const target = document.querySelector("#rooms");
                if (target) {
                  const y = target.getBoundingClientRect().top + window.scrollY;
                  window.scrollTo({ top: y, behavior: "instant" });
                }
              }}
              className="flex-1 text-center border border-cream/35 text-cream font-dm-sans text-[0.9rem] py-4 rounded-full hover:bg-cream/10 transition-colors"
            >
              Explore Rooms
            </a>
          </div>
        </div>
      </section>

      {/* Full Screen Modal */}
      {modalOpen && (
        <div
          className="fixed inset-0 z-[100] bg-black flex items-center justify-center"
          style={{ animation: "modalFadeIn 0.35s ease forwards" }}
        >
          <button
            onClick={() => setModalOpen(false)}
            className="absolute top-5 right-5 z-10 w-11 h-11 rounded-full bg-white/10 flex items-center justify-center hover:bg-brown transition-colors"
            aria-label="Close video"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              className="w-5 h-5 text-cream"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
          <video
            src={HERO_VIDEO_URL}
            controls
            autoPlay
            playsInline
            className="w-full h-full object-cover"
            style={{
              animation: "modalScaleIn 0.4s cubic-bezier(0.25,0.46,0.45,0.94) forwards",
            }}
            onLoadedMetadata={(e) => {
              Array.from(e.currentTarget.textTracks).forEach(
                (t) => (t.mode = "hidden")
              );
            }}
          />
        </div>
      )}
    </>
  );
}


// ─────────────────────────────────────────────────
// STATS BAR
// ─────────────────────────────────────────────────
function StatsBar() {
  const stats = [
    { number: "15,000+", label: "Guests Hosted" },
    { number: "3", label: "Iconic Properties" },
    { number: "₦2M+", label: "Monthly Revenue" },
    { number: "100%", label: "Delivery Rate" },
  ];

  return (
    <section className="bg-charcoal py-16">
      <div className="max-w-6xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-10">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="reveal-element text-center md:border-r md:border-white/5 last:border-0"
          >
            <p className="font-cormorant text-4xl md:text-5xl text-gold font-light leading-none mb-2">
              {stat.number}
            </p>
            <p className="font-dm-sans text-[0.65rem] text-white/45 uppercase tracking-[0.2em]">
              {stat.label}
            </p>
          </div>
        ))}
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
            Born in the creative heart of Yaba, Lustro Homes was forged with a
            single, uncompromising vision — to deliver a shortlet experience
            that rivals the world's finest. Every corner, every amenity, every
            interaction is curated to make you feel something rare: true luxury
            in your own city.
          </p>
          <p className="font-dm-sans text-charcoal/65 leading-[1.85] text-sm md:text-base mb-10">
            From our signature in-house dining experience at Lustro Lagos
            Restaurant, to our meticulously appointed suites, we don't just
            offer a place to stay — we deliver an editorial moment in your life
            that you'll carry long after checkout.
          </p>

          {/* Mini stats */}
          <div className="grid grid-cols-3 gap-6 pt-8 border-t border-charcoal/10">
            {[
              { value: "3", label: "Properties" },
              { value: "8,000+", label: "Total Stays" },
              { value: "3 yrs", label: "Of Excellence" },
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

  const handleSelect = (i: number) => {
    setActiveIdx(i);
    setPlaying(true);
  };

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

  return (
    <section ref={sectionRef} id="rooms" className="bg-cream-dark py-24 md:py-36">
      <div className="max-w-5xl mx-auto px-6">

        {/* Header */}
        <div className="text-center mb-16 reveal-element">
          <p className="font-dm-sans text-[0.65rem] text-brown uppercase tracking-[0.28em] mb-4">
            Rooms & Suites
          </p>
          <h2 className="font-cormorant text-5xl md:text-6xl text-charcoal font-light">
            Find Your Perfect Room
          </h2>
          <div className="section-line mx-auto mt-6" />
        </div>

        {/* Gallery Block */}
        <div className="reveal-element">

          {/* Main Video Player */}
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
                maxHeight: "480px",
                pointerEvents: "auto",
              } as React.CSSProperties}
              controlsList="nodownload nofullscreen noremoteplayback"
              onContextMenu={(e) => e.preventDefault()}
            />

            {/* Room name overlay */}
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

            {/* Custom Controls */}
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

          {/* Thumbnail Strip */}
          <div className="flex gap-2.5 overflow-x-auto pb-1 no-scrollbar mb-8">
            {rooms.map((room, i) => (
              <button
                key={room.name}
                onClick={() => handleSelect(i)}
                className={`relative flex-shrink-0 rounded-xl overflow-hidden transition-all duration-500 ${
                  activeIdx === i
                    ? "ring-2 ring-gold scale-[1.06] opacity-100"
                    : "opacity-40 hover:opacity-75"
                }`}
                style={{ width: "88px", height: "112px" }}
              >
                <img
                  src={getThumbUrl(room.publicId)}
                  alt={room.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <p className="absolute bottom-2 left-0 right-0 font-dm-sans text-[0.5rem] text-cream text-center uppercase tracking-wider px-1 truncate">
                  {room.name}
                </p>
              </button>
            ))}
          </div>

          {/* Room Detail Card */}
          <div className="bg-cream rounded-2xl p-8 md:p-10 flex flex-col md:flex-row md:items-center gap-8 shadow-sm">

            {/* Left — Info */}
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-4 flex-wrap">
                <span className="font-dm-sans text-[0.58rem] bg-brown text-cream px-3 py-1.5 rounded-full tracking-[0.18em] uppercase">
                  {active.tag}
                </span>
                <span className="font-dm-sans text-[0.58rem] text-brown/50 uppercase tracking-[0.18em]">
                  {active.tier}
                </span>
              </div>
              <h3 className="font-cormorant text-4xl md:text-5xl text-charcoal font-light mb-1 leading-none">
                The {active.name}
              </h3>
              <div className="flex items-baseline gap-2 mb-5">
                <p className="font-cormorant text-3xl text-gold">
                  {active.price}
                </p>
                <span className="font-dm-sans text-xs text-charcoal/40">
                  / night
                </span>
              </div>
              <p className="font-dm-sans text-sm text-charcoal/55 leading-[1.9]">
                {active.about}
              </p>
            </div>

            {/* Right — CTA */}
            <div className="md:w-52 flex-shrink-0 flex flex-col gap-3">
              <a
                href={`${WHATSAPP_URL}?text=I'd like to book The ${active.name} at Lustro Homes`}
                target="_blank"
                rel="noopener noreferrer"
                className="block text-center bg-charcoal text-cream font-dm-sans text-sm py-4 rounded-full hover:bg-brown transition-colors"
              >
                Book This Room
              </a>
              <p className="font-dm-sans text-[0.58rem] text-charcoal/30 text-center uppercase tracking-wider">
                Instant confirmation via WhatsApp
              </p>
            </div>

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
    { publicId: "Yankee_by_Lustro_3_aqx3ji", label: "The Experience" },
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
          <p className="font-dm-sans text-[0.65rem] text-gold uppercase tracking-[0.28em] mb-4">
            Sister Property
          </p>
          <h2 className="font-cormorant text-5xl md:text-6xl text-cream font-light">
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
                maxHeight: "480px",
                pointerEvents: "auto",
              } as React.CSSProperties}
              controlsList="nodownload nofullscreen noremoteplayback"
              onContextMenu={(e) => e.preventDefault()}
            />

            {/* Label overlay */}
            <div className="absolute top-5 left-5 pointer-events-none">
              <p className="font-dm-sans text-[0.55rem] text-gold/70 uppercase tracking-[0.22em] mb-1">
                Yankee by Lustro
              </p>
              <h3 className="font-cormorant text-3xl text-cream font-light leading-none drop-shadow-lg">
                {active.label}
              </h3>
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

          {/* Thumbnail Strip */}
          <div className="flex gap-2.5 overflow-x-auto pb-1 no-scrollbar mb-10">
            {videos.map((video, i) => (
              <button
                key={video.publicId}
                onClick={() => { setActiveIdx(i); setPlaying(true); }}
                className={`relative flex-shrink-0 rounded-xl overflow-hidden transition-all duration-500 ${
                  activeIdx === i
                    ? "ring-2 ring-gold scale-[1.06] opacity-100"
                    : "opacity-40 hover:opacity-75"
                }`}
                style={{ width: "88px", height: "112px" }}
              >
                <img
                  src={getThumbUrl(video.publicId)}
                  alt={video.label}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <p className="absolute bottom-2 left-0 right-0 font-dm-sans text-[0.5rem] text-cream text-center uppercase tracking-wider px-1 truncate">
                  {video.label}
                </p>
              </button>
            ))}
          </div>

          {/* CTA */}
          <div className="glass rounded-2xl p-8 md:p-10 text-center" style={{ isolation: "isolate" }}>
            <p className="font-dm-sans text-[0.65rem] text-gold uppercase tracking-[0.28em] mb-3">
              Now Available
            </p>
            <h3 className="font-cormorant text-3xl md:text-4xl text-cream font-light mb-4">
              Experience Yankee by Lustro
            </h3>
            <p className="font-dm-sans text-cream/45 text-sm leading-[1.85] max-w-sm mx-auto mb-8">
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
  const thumbsRef = useRef<HTMLDivElement>(null);

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

  const getVideoThumb = (publicId: string) =>
    `https://res.cloudinary.com/dx3k7hbnc/video/upload/so_2,w_300,h_400,c_fill,q_auto,f_auto/${publicId}.jpg`;

  useEffect(() => {
    const container = thumbsRef.current;
    if (!container) return;
    const activeThumb = container.children[activeIdx] as HTMLElement;
    if (activeThumb) {
      activeThumb.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "center" });
    }
  }, [activeIdx]);

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

  const handleSelect = (i: number) => {
    videoRef.current?.pause();
    setActiveIdx(i);
    setPlaying(true);
  };

  const handleVideoEnded = () => {
    const nextVideoIdx = items.findIndex(
      (item, i) => i > activeIdx && item.type === "video"
    );
    if (nextVideoIdx !== -1) {
      setActiveIdx(nextVideoIdx);
      setPlaying(true);
    } else {
      setPlaying(false);
    }
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

          {/* Main Display — portrait frame, centered */}
          <div
            className="relative rounded-2xl overflow-hidden bg-charcoal mb-4 select-none"
            style={{ height: "70vh", maxWidth: "400px", margin: "0 auto" }}
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
                  className="absolute inset-0 w-full h-full cursor-pointer"
                  style={{ objectFit: "cover", pointerEvents: "auto" } as React.CSSProperties}
                  controlsList="nodownload nofullscreen noremoteplayback"
                  onContextMenu={(e) => e.preventDefault()}
                />

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

                {/* Counter */}
                <div className="absolute top-5 right-5 pointer-events-none">
                  <span className="font-dm-sans text-[0.55rem] text-cream/50 uppercase tracking-[0.2em]">
                    {activeIdx + 1} / {items.length}
                  </span>
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
                  className="absolute inset-0 w-full h-full"
                  style={{ objectFit: "cover" }}
                />
                {/* Counter */}
                <div className="absolute top-5 right-5 pointer-events-none">
                  <span className="font-dm-sans text-[0.55rem] text-cream/50 uppercase tracking-[0.2em]">
                    {activeIdx + 1} / {items.length}
                  </span>
                </div>
              </>
            )}
          </div>

          {/* Thumbnail Strip */}
          <div
            ref={thumbsRef}
            className="flex gap-2.5 overflow-x-auto pb-1 no-scrollbar"
            style={{ maxWidth: "400px", margin: "0 auto" }}
          >
            {items.map((item, i) => (
              <button
                key={i}
                onClick={() => handleSelect(i)}
                className={`relative flex-shrink-0 rounded-xl overflow-hidden transition-all duration-300 ${
                  activeIdx === i
                    ? "ring-2 ring-gold scale-[1.06] opacity-100"
                    : "opacity-40 hover:opacity-75"
                }`}
                style={{ width: "88px", height: "112px" }}
              >
                <img
                  src={item.type === "video" ? getVideoThumb(item.publicId) : item.src}
                  alt={item.type === "video" ? item.label : item.alt}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/65 to-transparent" />
                {item.type === "video" && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 text-white/80">
                      <path d="M8 5.14v14l11-7-11-7z" />
                    </svg>
                  </div>
                )}
              </button>
            ))}
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
      href: "https://maps.google.com/?q=37+Ibukun+Olu+Street+Akoka+Yaba+Lagos+Nigeria",
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
    <main className="overflow-x-hidden">
      <Navbar
        scrolled={navScrolled}
        menuOpen={mobileMenuOpen}
        setMenuOpen={setMobileMenuOpen}
      />
      <Hero />
      <StatsBar />
      <About />
      <Rooms />
      <Dining />
      <Gallery />
      <Investment />
      <Testimonials />
      <Contact />
      <Footer />
    </main>
  );
}

