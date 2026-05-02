"use client";

import { useState, useEffect, useCallback } from "react";
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
function Hero() {
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    const initAnim = async () => {
      try {
        const { gsap } = await import("gsap");
        const tl = gsap.timeline({ delay: 0.6 });
        tl.fromTo(
          ".hero-eyebrow",
          { opacity: 0, y: 22 },
          { opacity: 1, y: 0, duration: 0.9, ease: "power3.out" }
        )
          .fromTo(
            ".hero-title",
            { opacity: 0, y: 32 },
            { opacity: 1, y: 0, duration: 1, ease: "power3.out" },
            "-=0.5"
          )
          .fromTo(
            ".hero-sub",
            { opacity: 0, y: 24 },
            { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" },
            "-=0.5"
          )
          .fromTo(
            ".hero-play",
            { opacity: 0, scale: 0.85 },
            { opacity: 1, scale: 1, duration: 0.7, ease: "back.out(1.4)" },
            "-=0.4"
          )
          .fromTo(
            ".hero-ctas",
            { opacity: 0, y: 18 },
            { opacity: 1, y: 0, duration: 0.7, ease: "power3.out" },
            "-=0.3"
          );
      } catch (err) {
        document
          .querySelectorAll(
            ".hero-eyebrow,.hero-title,.hero-sub,.hero-play,.hero-ctas"
          )
          .forEach((el) => {
            (el as HTMLElement).style.opacity = "1";
            (el as HTMLElement).style.transform = "none";
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
      <section
        id="hero"
        className="relative h-screen overflow-hidden bg-charcoal"
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

        {/* Dark Overlay — stronger at bottom where text sits */}
        <div className="absolute inset-0 z-10 bg-gradient-to-t from-black/85 via-black/30 to-black/10" />

        {/* Hero Content — pinned to bottom */}
        <div className="relative z-20 flex flex-col justify-end h-full px-6 pb-10 md:pb-14" >
          {/* Watch for more — top left of content area */}
          <button
            onClick={() => setModalOpen(true)}
            className="hero-play group mb-8 flex items-center gap-3 w-fit"
            style={{ opacity: 0 }}
            aria-label="Watch for more"
          >
            <div className="relative w-12 h-12 rounded-full border-2 border-cream/60 flex items-center justify-center group-hover:border-gold group-hover:scale-110 transition-all duration-400">
              <div className="absolute inset-0 rounded-full border border-cream/20 scale-125 group-hover:scale-150 transition-transform duration-500 opacity-60" />
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-5 h-5 text-cream group-hover:text-gold transition-colors ml-0.5"
              >
                <path d="M8 5.14v14l11-7-11-7z" />
              </svg>
            </div>
            <span className="font-dm-sans text-[0.65rem] text-cream/70 uppercase tracking-[0.25em] group-hover:text-gold transition-colors">
              Watch for more
            </span>
          </button>

          {/* Eyebrow */}
          <p
            className="hero-eyebrow font-dm-sans text-[0.65rem] text-gold uppercase tracking-[0.35em] mb-4"
            style={{ opacity: 0 }}
          >
            Premium Staycation · Lagos
          </p>

          {/* Headline */}
          <h1
            className="hero-title font-cormorant text-5xl sm:text-6xl md:text-7xl text-cream font-light leading-[1.08] mb-4 max-w-2xl"
            style={{ opacity: 0 }}
          >
            Your Lagos{" "}
            <em className="text-gold" style={{ fontStyle: "italic" }}>
              Staycation
            </em>{" "}
            Awaits.
          </h1>

          {/* Subtext */}
          <p
            className="hero-sub font-dm-sans text-cream/65 text-sm leading-relaxed mb-8 max-w-sm"
            style={{ opacity: 0 }}
          >
            World-class comfort woven with Nigerian soul — unforgettable stays
            and signature dining in the heart of Yaba, Lagos.
          </p>

          {/* CTA Buttons */}
          <div
            className="hero-ctas flex flex-row gap-3"
            style={{ opacity: 0 }}
          >
            <a
              href={`${WHATSAPP_URL}?text=I'd like to book a stay at Lustro Homes`}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-brown text-cream font-dm-sans text-sm px-9 py-3.5 rounded-full hover:bg-brown-light transition-colors shadow-lg w-fit"
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
              className="border border-cream/35 text-cream font-dm-sans text-sm px-9 py-3.5 rounded-full hover:bg-cream/10 transition-colors w-fit"
            >
              Explore Rooms
            </a>
          </div>
        </div>
      </section>

      {/* ── Full Screen Modal Player ── */}
      {modalOpen && (
        <div
          className="fixed inset-0 z-[100] bg-black flex items-center justify-center"
          style={{ animation: "modalFadeIn 0.35s ease forwards" }}
        >
          {/* Close Button */}
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

          {/* Full Screen Native Video — no Cloudinary branding */}
          <video
            src={HERO_VIDEO_URL}
            controls
            autoPlay
            playsInline
            className="w-full h-full object-cover"
            style={{ animation: "modalScaleIn 0.4s cubic-bezier(0.25,0.46,0.45,0.94) forwards" }}
          />
        </div>
      )}

      <style>{`
        @keyframes modalFadeIn {
          from { opacity: 0; }
          to   { opacity: 1; }
        }
        @keyframes modalScaleIn {
          from { opacity: 0; transform: scale(0.96); }
          to   { opacity: 1; transform: scale(1); }
        }
      `}</style>
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
interface Room {
  name: string;
  tier: string;
  price: string;
  features: string[];
  image: string;
  tag: string;
}

function Rooms() {
  const rooms: Room[] = [
    {
      name: "The Studio",
      tier: "Classic Room",
      price: "₦50,000",
      features: ["King Bed", "Smart TV", "Fast WiFi", "AC", "En-suite"],
      image:
        "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?auto=format&fit=crop&w=800&q=85",
      tag: "Most Popular",
    },
    {
      name: "The Signature",
      tier: "Premium Suite",
      price: "₦85,000",
      features: [
        "King Bed",
        "Glass Shower",
        "Netflix Ready",
        "Rattan Wardrobe",
        "Lounge Area",
      ],
      image:
        "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=800&q=85",
      tag: "Best Value",
    },
    {
      name: "The Penthouse",
      tier: "Top Floor Suite",
      price: "₦120,000",
      features: [
        "King Bed",
        "Panoramic View",
        "Private Terrace",
        "Smart Automation",
        "Butler Ready",
      ],
      image:
        "https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=800&q=85",
      tag: "Premium",
    },
  ];

  return (
    <section id="rooms" className="bg-cream-dark py-24 md:py-36">
      <div className="max-w-7xl mx-auto px-6">
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

        {/* Room Cards */}
        <div className="grid md:grid-cols-3 gap-8">
          {rooms.map((room, i) => (
            <div
              key={room.name}
              className="card-lift reveal-element bg-cream rounded-2xl overflow-hidden shadow-sm"
              style={{ transitionDelay: `${i * 0.08}s` }}
            >
              {/* Image */}
              <div className="img-zoom relative h-64">
                <Image
                  src={room.image}
                  alt={room.name}
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-cover"
                />
                <div className="absolute top-4 left-4">
                  <span className="bg-brown text-cream font-dm-sans text-[0.6rem] px-3 py-1.5 rounded-full tracking-wider uppercase">
                    {room.tag}
                  </span>
                </div>
              </div>

              {/* Body */}
              <div className="p-7">
                <p className="font-dm-sans text-[0.6rem] text-brown uppercase tracking-[0.22em] mb-1.5">
                  {room.tier}
                </p>
                <h3 className="font-cormorant text-3xl text-charcoal font-light mb-1">
                  {room.name}
                </h3>
                <div className="flex items-baseline gap-1.5 mb-5">
                  <p className="font-cormorant text-2xl text-gold">
                    {room.price}
                  </p>
                  <span className="font-dm-sans text-xs text-charcoal/40">
                    / night
                  </span>
                </div>

                {/* Feature pills */}
                <div className="flex flex-wrap gap-2 mb-7">
                  {room.features.map((f) => (
                    <span
                      key={f}
                      className="font-dm-sans text-[0.65rem] bg-cream-dark text-charcoal/65 px-3 py-1.5 rounded-full"
                    >
                      {f}
                    </span>
                  ))}
                </div>

                {/* CTA */}
                <a
                  href={`${WHATSAPP_URL}?text=I'd like to book ${room.name} at Lustro Homes`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block text-center bg-charcoal text-cream font-dm-sans text-sm py-3.5 rounded-full hover:bg-brown transition-colors"
                >
                  Book This Room
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────────
// DINING SECTION
// ─────────────────────────────────────────────────
function Dining() {
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
      <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-14 md:gap-20 items-center">
        {/* Left — Text */}
        <div className="reveal-from-left order-2 md:order-1">
          <p className="font-dm-sans text-[0.65rem] text-gold uppercase tracking-[0.28em] mb-4">
            Signature Dining
          </p>
          <h2 className="font-cormorant text-5xl md:text-6xl text-cream font-light leading-[1.1] mb-6">
            Lustro Lagos{" "}
            <em className="italic text-gold">Restaurant</em>
          </h2>
          <div className="section-line mb-8" />
          <p className="font-dm-sans text-cream/60 leading-[1.85] text-sm md:text-base mb-5">
            Lustro Lagos is more than a restaurant — it's an immersive sensory
            experience. We source the finest local ingredients and reimagine
            them through a global culinary lens, delivering a menu that
            surprises, delights, and lingers long after the last bite.
          </p>
          <p className="font-dm-sans text-cream/60 leading-[1.85] text-sm md:text-base mb-10">
            Whether you're celebrating a milestone, hosting a business dinner,
            or simply treating yourself — our team is dedicated to making every
            meal an occasion. Open to both in-house guests and the public.
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-4">
            <a
              href={`${WHATSAPP_URL}?text=I'd like to reserve a table at Lustro Lagos Restaurant`}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-brown text-cream font-dm-sans text-sm px-8 py-3.5 rounded-full hover:bg-brown-light transition-colors text-center"
            >
              Reserve A Table
            </a>
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

        {/* Right — Asymmetric 2×2 Image Grid */}
        {/* Layout: tall-left | short-right / short-left | tall-right */}
        <div className="reveal-from-right order-1 md:order-2 grid grid-cols-2 gap-3">
          {/* Left column */}
          <div className="flex flex-col gap-3">
            <div className="img-zoom relative rounded-xl overflow-hidden h-72">
              <Image
                src={diningImages[0].src}
                alt={diningImages[0].alt}
                fill
                sizes="(max-width: 768px) 50vw, 25vw"
                className="object-cover"
              />
            </div>
            <div className="img-zoom relative rounded-xl overflow-hidden h-44">
              <Image
                src={diningImages[2].src}
                alt={diningImages[2].alt}
                fill
                sizes="(max-width: 768px) 50vw, 25vw"
                className="object-cover"
              />
            </div>
          </div>

          {/* Right column */}
          <div className="flex flex-col gap-3">
            <div className="img-zoom relative rounded-xl overflow-hidden h-44">
              <Image
                src={diningImages[1].src}
                alt={diningImages[1].alt}
                fill
                sizes="(max-width: 768px) 50vw, 25vw"
                className="object-cover"
              />
            </div>
            <div className="img-zoom relative rounded-xl overflow-hidden h-72">
              <Image
                src={diningImages[3].src}
                alt={diningImages[3].alt}
                fill
                sizes="(max-width: 768px) 50vw, 25vw"
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────────
// GALLERY
// ─────────────────────────────────────────────────
function Gallery() {
  const galleryImages = [
    {
      src: "https://res.cloudinary.com/dx3k7hbnc/image/upload/q_auto,f_auto/v1777562618/hero-1_jlcvld.png",
      alt: "Lustro Homes exterior",
    },
    {
      src: "https://res.cloudinary.com/dx3k7hbnc/image/upload/q_auto,f_auto/v1777642365/gallery-7_tmifgb.jpg",
      alt: "Lustro Lagos neon sign",
    },
    {
      src: "https://res.cloudinary.com/dx3k7hbnc/image/upload/q_auto,f_auto/v1777569685/hero-3_oqrukn.jpg",
      alt: "Lustro Homes suite",
    },
    {
      src: "https://res.cloudinary.com/dx3k7hbnc/image/upload/q_auto,f_auto/v1777642363/gallery-2_poa1ee.jpg",
      alt: "Lustro Lagos dining",
    },
    {
      src: "https://res.cloudinary.com/dx3k7hbnc/image/upload/q_auto,f_auto/v1777642372/gallery-4_qk8z3h.jpg",
      alt: "Lustro staircase architecture",
    },
    {
      src: "https://res.cloudinary.com/dx3k7hbnc/image/upload/q_auto,f_auto/v1777642363/gallery-6_sq3uy3.jpg",
      alt: "Lustro Homes lounge",
    },
    {
      src: "https://res.cloudinary.com/dx3k7hbnc/image/upload/q_auto,f_auto/v1777570438/hero-5_gzikdc.png",
      alt: "Lustro Homes night exterior",
    },
    {
      src: "https://res.cloudinary.com/dx3k7hbnc/image/upload/q_auto,f_auto/v1777642364/gallery-5_vapgeo.jpg",
      alt: "Lustro Homes amenities",
    },
  ];

  return (
    <section id="gallery" className="bg-cream py-24 md:py-36">
      <div className="max-w-7xl mx-auto px-6">
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

        <div className="columns-2 md:columns-3 gap-3">
  {galleryImages.map((img) => (
    <div
      key={img.src}
      className="gallery-item img-zoom relative rounded-xl overflow-hidden break-inside-avoid mb-3"
    >
      <Image
        src={img.src}
        alt={img.alt}
        width={600}
        height={400}
        sizes="(max-width: 768px) 50vw, 33vw"
        className="object-cover w-full h-auto"
        quality={100}
      />
    </div>
  ))}
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

        {/* Timeline */}
        <div className="space-y-14">
          {milestones.map((m) => (
            <div key={m.title} className="milestone-card reveal-element">
              {/* Status */}
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
        {/* Label + Sold Out on same row */}
        <div className="flex items-center justify-between mb-2">
          <p className="font-dm-sans text-[0.6rem] text-cream/35 uppercase tracking-wider">
            {p.label}
          </p>
          <span className="font-dm-sans text-[0.55rem] bg-brown/30 text-brown-light border border-brown/20 px-2 py-1 rounded-full uppercase tracking-wider whitespace-nowrap">
            {p.tag}
          </span>
        </div>
        {/* Price below */}
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

        {/* Bottom CTA — credibility focused */}
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
