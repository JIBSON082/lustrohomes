"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";

// ----------------------------------------------------------------------
// DATA CONSTANTS
// ----------------------------------------------------------------------
const WHATSAPP_NUMBER = "2340000000000"; // Replace with actual
const WHATSAPP_LINK = `https://wa.me/${WHATSAPP_NUMBER}`;

const HERO_IMAGES = [
  "https://images.unsplash.com/photo-1542314831-c6a4d14d8379?q=80&w=2000&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1566665797739-1674de7a421a?q=80&w=2000&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?q=80&w=2000&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?q=80&w=2000&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1578683010236-d716f9a3f461?q=80&w=2000&auto=format&fit=crop"
];

// ----------------------------------------------------------------------
// COMPONENTS
// ----------------------------------------------------------------------

function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "About", href: "#about" },
    { name: "Rooms", href: "#rooms" },
    { name: "Dining", href: "#dining" },
    { name: "Gallery", href: "#gallery" },
    { name: "Invest", href: "#invest" },
    { name: "Contact", href: "#contact" },
  ];

  return (
    <>
      <nav className={`fixed w-full z-50 transition-all duration-500 ${isScrolled ? "bg-cream/90 backdrop-blur-md shadow-sm py-4" : "bg-transparent py-6"}`}>
        <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
          <div className="flex items-center gap-3 cursor-pointer">
            <span className={`font-display text-2xl font-bold tracking-wider ${isScrolled ? "text-charcoal" : "text-white"}`}>LUSTRO</span>
          </div>

          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a key={link.name} href={link.href} className={`text-sm tracking-wide nav-link ${isScrolled ? "text-charcoal" : "text-white"}`}>
                {link.name}
              </a>
            ))}
          </div>

          <div className="hidden md:block">
            <a href={WHATSAPP_LINK} target="_blank" rel="noreferrer" className="bg-brown hover:bg-brown-light text-white px-6 py-2.5 rounded-full text-sm font-medium transition-colors">
              Book Now
            </a>
          </div>

          <button onClick={() => setMobileMenuOpen(true)} className={`md:hidden ${isScrolled ? "text-charcoal" : "text-white"}`}>
            <svg width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" /></svg>
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div className={`fixed inset-0 bg-charcoal z-[60] flex flex-col justify-center items-center transition-transform duration-500 ${mobileMenuOpen ? "translate-x-0" : "translate-x-full"}`}>
        <button onClick={() => setMobileMenuOpen(false)} className="absolute top-6 right-6 text-white">
          <svg width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
        </button>
        <div className="flex flex-col gap-6 text-center">
          {navLinks.map((link) => (
            <a key={link.name} href={link.href} onClick={() => setMobileMenuOpen(false)} className="font-display text-4xl text-white hover:text-gold transition-colors">
              {link.name}
            </a>
          ))}
          <a href={WHATSAPP_LINK} className="mt-8 bg-brown text-white px-8 py-3 rounded-full">Book Your Stay</a>
        </div>
      </div>
    </>
  );
}

function Hero() {
  const [activeSlide, setActiveSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % HERO_IMAGES.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative h-screen w-full overflow-hidden flex items-center justify-center bg-charcoal">
      {/* Layer 1: Backgrounds */}
      <div className="absolute inset-0 z-1" style={{ transform: 'translateZ(0)' }}>
        {HERO_IMAGES.map((src, index) => (
          <div key={index} className={`absolute inset-0 hero-slide ${index === activeSlide ? "active" : ""}`}>
            <Image src={src} alt="Lustro Homes Luxury" fill sizes="100vw" className="object-cover" priority={index === 0} quality={90} />
          </div>
        ))}
      </div>

      {/* Layer 2: Scrim */}
      <div className="absolute inset-0 z-10 hero-scrim" />

      {/* Layer 3: Glassmorphic Content */}
      <div className="relative z-20 max-w-4xl w-full px-6 text-center text-white mt-16">
        <div className="glass p-8 md:p-12 rounded-3xl inline-block mx-auto gsap-reveal">
          <span className="uppercase tracking-[0.2em] text-xs font-bold text-white/80 mb-4 block">Premium Staycation · Lagos</span>
          <h1 className="font-display text-5xl md:text-7xl leading-tight mb-6">
            Your Lagos <span className="italic text-gold">Staycation</span> Awaits.
          </h1>
          <p className="text-lg text-white/90 font-light max-w-2xl mx-auto mb-8">
            Experience unparalleled luxury, signature dining, and the ultimate city escape in the heart of Yaba.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href={WHATSAPP_LINK} className="bg-brown hover:bg-brown-light text-white px-8 py-4 rounded-full transition-colors font-medium">Book Your Stay</a>
            <a href="#rooms" className="bg-transparent border border-white/30 hover:bg-white/10 text-white px-8 py-4 rounded-full transition-colors font-medium">Explore Rooms</a>
          </div>
        </div>

        {/* Indicators */}
        <div className="flex justify-center gap-2 mt-12">
          {HERO_IMAGES.map((_, i) => (
            <button key={i} onClick={() => setActiveSlide(i)} className={`h-1.5 rounded-full transition-all duration-500 ${i === activeSlide ? "w-8 bg-brown" : "w-2 bg-white/40"}`} aria-label={`Go to slide ${i + 1}`} />
          ))}
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2 opacity-70">
        <span className="text-xs tracking-widest text-white uppercase">Scroll</span>
        <div className="w-[1px] h-12 bg-white/30 overflow-hidden relative">
          <div className="absolute top-0 left-0 w-full h-full bg-white animate-[slide-down_2s_ease-in-out_infinite]" />
        </div>
      </div>
    </section>
  );
}

function Stats() {
  const stats = [
    { value: "15,000+", label: "GUESTS HOSTED" },
    { value: "3", label: "ICONIC PROPERTIES" },
    { value: "₦2M+", label: "MONTHLY REVENUE" },
    { value: "100%", label: "DELIVERY RATE" },
  ];

  return (
    <section className="bg-charcoal text-white py-12 border-b border-white/10">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 divide-x divide-white/10 text-center">
          {stats.map((stat, i) => (
            <div key={i} className="gsap-reveal border-l-0 first:border-0 md:first:border-0 border-white/10">
              <div className="font-display text-4xl md:text-5xl text-gold mb-2">{stat.value}</div>
              <div className="text-[10px] md:text-xs tracking-widest uppercase text-white/50">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function About() {
  return (
    <section id="about" className="bg-cream py-24 md:py-32 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-16 items-center">
        <div className="gsap-reveal-left order-2 md:order-1">
          <span className="uppercase tracking-widest text-xs font-bold text-brown mb-2 block">Our Story</span>
          <h2 className="font-display text-4xl md:text-6xl text-charcoal leading-tight">Lagos Luxury, <span className="italic text-brown-light">Redefined.</span></h2>
          <div className="section-line"></div>
          <div className="space-y-6 text-charcoal-light/80 mb-8 font-light leading-relaxed">
            <p>Lustro Homes began with a singular vision: to create the most sought-after staycation experience on the Lagos Mainland. We fuse world-class interior design with localized hospitality, ensuring every guest feels an immediate sense of belonging and prestige.</p>
            <p>We don't just host; we curate lifestyles. From our signature dining experiences to our meticulously engineered smart homes, we are setting a new benchmark for luxury and investment in Nigeria.</p>
          </div>
          <div className="flex gap-6 pt-6 border-t border-charcoal/10">
            <div><span className="block font-display text-2xl text-brown">3</span><span className="text-xs uppercase tracking-wider text-charcoal/50">Properties</span></div>
            <div><span className="block font-display text-2xl text-brown">8k+</span><span className="text-xs uppercase tracking-wider text-charcoal/50">Stays</span></div>
            <div><span className="block font-display text-2xl text-brown">3yrs</span><span className="text-xs uppercase tracking-wider text-charcoal/50">Excellence</span></div>
          </div>
        </div>
        <div className="gsap-reveal-right order-1 md:order-2 relative">
          <div className="img-zoom rounded-2xl relative h-[500px] w-full shadow-2xl">
            <Image src="https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?q=80&w=1000&auto=format&fit=crop" alt="Lustro Homes Interior" fill sizes="(max-width: 768px) 100vw, 50vw" className="object-cover" />
          </div>
          <div className="absolute -bottom-6 -left-6 glass-light p-4 rounded-xl shadow-xl z-10 flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-brown flex items-center justify-center text-white">
              <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
            </div>
            <div>
              <p className="text-sm font-bold leading-tight">@lustro_homes</p>
              <p className="text-xs text-charcoal/60">Follow our journey</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Rooms() {
  const rooms = [
    {
      title: "The Studio", subtitle: "Classic Room", price: "₦50,000",
      features: ["King Bed", "Smart TV", "Fast WiFi", "AC", "En-suite"],
      img: "https://images.unsplash.com/photo-1552566626-52f8b828add9?q=80&w=1000&auto=format&fit=crop"
    },
    {
      title: "The Signature", subtitle: "Premium Suite", price: "₦85,000",
      features: ["King Bed", "Glass Shower", "Netflix Ready", "Rattan Wardrobe", "Lounge Area"],
      img: "https://images.unsplash.com/photo-1590490360182-c33d57733427?q=80&w=1000&auto=format&fit=crop"
    },
    {
      title: "The Penthouse", subtitle: "Top Floor Suite", price: "₦120,000",
      features: ["King Bed", "Panoramic View", "Private Terrace", "Smart Automation", "Butler Ready"],
      img: "https://images.unsplash.com/photo-1505693314120-0d443867891c?q=80&w=1000&auto=format&fit=crop"
    }
  ];

  return (
    <section id="rooms" className="bg-cream-dark py-24 md:py-32">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col items-center text-center mb-16 gsap-reveal">
          <span className="uppercase tracking-widest text-xs font-bold text-brown mb-2">Our Spaces</span>
          <h2 className="font-display text-4xl md:text-5xl text-charcoal">Rooms & Suites</h2>
          <div className="section-line mx-auto"></div>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {rooms.map((room, i) => (
            <div key={i} className="bg-white rounded-2xl overflow-hidden shadow-sm card-lift gsap-reveal">
              <div className="relative h-64 img-zoom">
                <Image src={room.img} alt={room.title} fill sizes="(max-width: 768px) 100vw, 33vw" className="object-cover" />
                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1.5 rounded-full text-xs font-bold shadow-sm">
                  {room.subtitle}
                </div>
              </div>
              <div className="p-8">
                <div className="flex justify-between items-end mb-4">
                  <h3 className="font-display text-3xl">{room.title}</h3>
                  <div className="text-right">
                    <span className="block text-sm text-charcoal/50">per night</span>
                    <span className="font-bold text-brown">{room.price}</span>
                  </div>
                </div>
                <div className="flex flex-wrap gap-2 mb-8">
                  {room.features.map((feat, j) => (
                    <span key={j} className="bg-cream-dark text-charcoal text-[11px] uppercase tracking-wider px-2.5 py-1 rounded-md">{feat}</span>
                  ))}
                </div>
                <a href={WHATSAPP_LINK} className="block w-full text-center border border-brown text-brown hover:bg-brown hover:text-white py-3 rounded-full transition-colors text-sm font-bold">
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

function Dining() {
  const images = [
    { src: "https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c?q=80&w=800&auto=format&fit=crop", classes: "col-span-1 row-span-2 h-full" },
    { src: "https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?q=80&w=800&auto=format&fit=crop", classes: "col-span-1 row-span-1 h-48" },
    { src: "https://images.unsplash.com/photo-1414235077428-33898ed1e829?q=80&w=800&auto=format&fit=crop", classes: "col-span-1 row-span-1 h-48" },
    { src: "https://images.unsplash.com/photo-1559339352-11d035aa65de?q=80&w=800&auto=format&fit=crop", classes: "col-span-1 row-span-2 h-full -mt-12" },
  ];

  return (
    <section id="dining" className="bg-charcoal text-white py-24 md:py-32 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-16 items-center">
        <div className="gsap-reveal-left">
          <span className="uppercase tracking-widest text-xs font-bold text-gold mb-2 block">Signature Dining</span>
          <h2 className="font-display text-4xl md:text-6xl leading-tight mb-2">Lustro Lagos <br/><span className="italic text-gold">Restaurant.</span></h2>
          <div className="section-line bg-gradient-to-r from-gold to-yellow-600"></div>
          <div className="space-y-6 text-white/70 font-light mb-10">
            <p>Gastronomy elevated. Lustro Lagos is not just an amenity—it's a destination. Our in-house chefs craft continental and local masterpieces designed to tantalize your palate.</p>
            <p>From perfectly brewed morning coffees to twilight cocktails, our dining space offers the perfect ambiance for romance, business, or unwinding after a long day in the city.</p>
          </div>
          <div className="flex flex-col sm:flex-row gap-4">
            <a href={WHATSAPP_LINK} className="bg-gold hover:bg-yellow-600 text-charcoal px-8 py-3.5 rounded-full font-bold transition-colors text-center">Reserve A Table</a>
            <a href="https://instagram.com/lustro_lagos" target="_blank" rel="noreferrer" className="border border-white/20 hover:bg-white/10 px-8 py-3.5 rounded-full transition-colors flex items-center justify-center gap-2">
              <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
              @lustro_lagos
            </a>
          </div>
        </div>
        <div className="gsap-reveal-right grid grid-cols-2 gap-4">
          {images.map((img, i) => (
            <div key={i} className={`img-zoom rounded-xl relative ${img.classes}`}>
              <Image src={img.src} alt="Dining Experience" fill sizes="(max-width: 768px) 50vw, 25vw" className="object-cover" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Gallery() {
  const images = [
    "https://images.unsplash.com/photo-1560185016-df153df1869e?q=80&w=800&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1544148103-0773bf10d330?q=80&w=800&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1572555513568-1eb86a2f77c8?q=80&w=800&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?q=80&w=800&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1600607686527-6fb886090705?q=80&w=1200&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1414235077428-33898ed1e829?q=80&w=800&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1611892440504-42a792e24d32?q=80&w=800&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1587985150436-1e626e2e8e97?q=80&w=800&auto=format&fit=crop",
  ];

  return (
    <section id="gallery" className="bg-cream py-24 md:py-32">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col items-center text-center mb-16 gsap-reveal">
          <span className="uppercase tracking-widest text-xs font-bold text-brown mb-2">Aesthetic Appeal</span>
          <h2 className="font-display text-4xl md:text-5xl text-charcoal">Gallery</h2>
          <div className="section-line mx-auto"></div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {images.map((src, i) => (
            <div key={i} className={`img-zoom rounded-xl relative gsap-reveal ${i === 0 || i === 4 ? "md:col-span-2 h-72" : "h-52"}`}>
              <Image src={src} alt="Lustro Gallery" fill sizes="(max-width: 768px) 50vw, 25vw" className="object-cover" />
            </div>
          ))}
        </div>
        <div className="mt-12 text-center gsap-reveal">
          <a href="https://instagram.com/lustro_homes" target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 text-charcoal hover:text-brown transition-colors font-medium border-b border-charcoal/20 pb-1 hover:border-brown">
            More on Instagram <span>→</span>
          </a>
        </div>
      </div>
    </section>
  );
}

function Investment() {
  const milestones = [
    {
      title: "LUSTRO 1.0 — THE BLUEPRINT", subtitle: "Where Yaba First Met Luxury",
      story: "Started with a simple goal — create the most sought-after shortlet in Yaba. Built an experience with signature in-house dining and world-class aesthetics.",
      stats: ["15,000+ Guests Hosted", "₦2M+ Monthly Revenue", "₦1.4M/mo Investor Profit"],
      status: "SOLD OUT & ACTIVE", color: "text-red-500"
    },
    {
      title: "LUSTRO 2.0 — THE YANKEE EDITION", subtitle: "Luxury Redefined on the Mainland",
      story: "Brought resort-quality living to Lagos Mainland. Yankee by Lustro — launched, sold out, delivering. No delays. No excuses. Just results.",
      stats: ["Sold Out Launch Status", "Monthly Returns", "100% Satisfaction"],
      status: "SOLD OUT & DELIVERING", color: "text-red-500"
    },
    {
      title: "LUSTRO 3.0 — THE SMART ECOSYSTEM", subtitle: "The Ultimate Lifestyle Sanctuary",
      story: "Most ambitious project yet. Fully automated smart apartments. Yaba's first in-house spa. Professional gym. Built, delivered, earning.",
      stats: ["Full Auto Smart Features", "Yaba's First In-House Spa", "₦1.4M/mo Investor ROI"],
      status: "COMPLETED & EARNING", color: "text-red-500"
    }
  ];

  return (
    <section id="invest" className="bg-charcoal-light py-24 md:py-32 text-white">
      <div className="max-w-4xl mx-auto px-6">
        <div className="mb-20 gsap-reveal">
          <h2 className="font-display text-4xl md:text-5xl text-gold mb-4">The Lustro Journey — From Vision to Value</h2>
          <p className="text-xl text-white/70 font-light">3 Iconic Projects. 100% Delivery. A New Era.</p>
        </div>

        <div className="ml-2 md:ml-6 border-l-2 border-white/10 pl-6 md:pl-10 relative">
          {milestones.map((ms, i) => (
            <div key={i} className="milestone-card mb-16 gsap-reveal">
              <div className="status-badge mb-4">
                {ms.status} <span className={`pulse-dot bg-red-500`}></span>
              </div>
              <h3 className="font-display text-2xl md:text-3xl mb-1">{ms.title}</h3>
              <h4 className="text-gold italic mb-4">{ms.subtitle}</h4>
              <p className="text-white/60 font-light leading-relaxed mb-6 max-w-2xl">{ms.story}</p>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {ms.stats.map((stat, j) => (
                  <div key={j} className="bg-white/5 rounded-lg p-3 text-sm border border-white/5">{stat}</div>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="glass mt-16 p-8 md:p-12 text-center rounded-2xl gsap-reveal">
          <h3 className="font-display text-4xl text-gold mb-4">Lustro 4.0 Is Coming.</h3>
          <p className="text-white/80 max-w-xl mx-auto mb-8 leading-relaxed font-light">
            People who moved first on 1.0, 2.0, and 3.0 are earning every month. The next evolution of luxury and smart investment is on the horizon. Don't miss out.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href={WHATSAPP_LINK} className="bg-gold hover:bg-yellow-600 text-charcoal px-8 py-3.5 rounded-full font-bold transition-colors">Get Early Access</a>
            <a href="https://instagram.com/lustro_homes" target="_blank" rel="noreferrer" className="border border-white/20 hover:bg-white/10 px-8 py-3.5 rounded-full transition-colors font-medium">Stay Connected</a>
          </div>
        </div>
      </div>
    </section>
  );
}

function Testimonials() {
  const reviews = [
    { name: "Adaeze O.", loc: "Lekki Lagos", text: "From the moment we arrived, everything was perfect. The room aesthetics, the service, the food at Lustro Lagos — I have never experienced anything like it in Nigeria." },
    { name: "Tunde M.", loc: "Ikeja Lagos", text: "Yankee by Lustro is a different world entirely. My girls and I booked for a staycation and did not want to leave. Every corner is Instagram-worthy." },
    { name: "Chisom E.", loc: "Abuja", text: "I was visiting Lagos for a conference and chose Lustro on a recommendation. Best decision I made. The room felt like an international hotel." }
  ];

  return (
    <section className="bg-cream-dark py-24 md:py-32">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-3 gap-8">
          {reviews.map((rev, i) => (
            <div key={i} className="bg-white p-8 rounded-2xl shadow-sm card-lift gsap-reveal">
              <div className="flex text-gold mb-6">
                {[1,2,3,4,5].map(s => (
                  <svg key={s} width="20" height="20" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>
                ))}
              </div>
              <p className="font-display italic text-xl text-charcoal/80 mb-6 leading-relaxed">"{rev.text}"</p>
              <div>
                <p className="font-bold text-charcoal">{rev.name}</p>
                <p className="text-xs text-charcoal/50 uppercase tracking-widest">{rev.loc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Contact() {
  return (
    <section id="contact" className="relative py-32 bg-charcoal flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 z-1" style={{ transform: 'translateZ(0)' }}>
        <Image src="https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?q=80&w=2000&auto=format&fit=crop" alt="Lustro Homes Contact" fill sizes="100vw" className="object-cover" />
      </div>
      <div className="absolute inset-0 z-10 bg-charcoal/80" />
      
      <div className="relative z-20 max-w-5xl mx-auto px-6 text-center text-white gsap-reveal">
        <h2 className="font-display text-5xl md:text-6xl mb-12">Ready to Experience <span className="italic text-gold">Lustro?</span></h2>
        
        <div className="grid md:grid-cols-3 gap-6 mb-12 text-left">
          <div className="glass p-6 rounded-2xl flex flex-col gap-2">
            <span className="text-2xl mb-2">📱</span>
            <span className="text-xs uppercase tracking-widest text-white/50">WhatsApp Us</span>
            <a href={WHATSAPP_LINK} className="font-medium hover:text-gold transition-colors">Chat for Booking</a>
          </div>
          <div className="glass p-6 rounded-2xl flex flex-col gap-2">
            <span className="text-2xl mb-2">📍</span>
            <span className="text-xs uppercase tracking-widest text-white/50">Location</span>
            <span className="font-medium">37 Ibukun Olu St, Akoka, Yaba</span>
          </div>
          <div className="glass p-6 rounded-2xl flex flex-col gap-2">
            <span className="text-2xl mb-2">📸</span>
            <span className="text-xs uppercase tracking-widest text-white/50">Instagram</span>
            <a href="https://instagram.com/lustro_homes" target="_blank" rel="noreferrer" className="font-medium hover:text-gold transition-colors">@lustro_homes</a>
          </div>
        </div>

        <a href={WHATSAPP_LINK} className="inline-block bg-brown hover:bg-brown-light text-white px-10 py-5 rounded-full font-bold text-lg transition-colors shadow-xl">
          Book Your Stay Now
        </a>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="bg-charcoal text-white pt-20 pb-8 border-t border-white/5">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-3 gap-12 mb-16">
          <div>
            <div className="font-display text-3xl font-bold tracking-wider mb-4 text-white">LUSTRO</div>
            <p className="text-gold italic mb-4 font-display text-xl">Staycation in Lagos | Signature Dining | Investment</p>
            <p className="text-white/50 text-sm font-light leading-relaxed max-w-sm">
              Redefining luxury hospitality and real estate investment on the Lagos Mainland. Built for those who demand excellence.
            </p>
          </div>
          <div className="flex flex-col gap-3">
            <h4 className="text-xs uppercase tracking-widest text-white/50 mb-4">Navigation</h4>
            {["About", "Rooms", "Dining", "Gallery", "Invest", "Contact"].map(link => (
              <a key={link} href={`#${link.toLowerCase()}`} className="text-white/80 hover:text-gold transition-colors w-fit">{link}</a>
            ))}
          </div>
          <div className="flex flex-col gap-3">
            <h4 className="text-xs uppercase tracking-widest text-white/50 mb-4">Social</h4>
            <a href="https://instagram.com/lustro_homes" target="_blank" rel="noreferrer" className="text-white/80 hover:text-gold transition-colors w-fit">Instagram @lustro_homes</a>
            <a href="https://instagram.com/lustro_lagos" target="_blank" rel="noreferrer" className="text-white/80 hover:text-gold transition-colors w-fit">Instagram @lustro_lagos</a>
            <a href={WHATSAPP_LINK} className="text-white/80 hover:text-gold transition-colors w-fit">WhatsApp Booking</a>
          </div>
        </div>
        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-white/40">
          <p>&copy; {new Date().getFullYear()} Lustro Homes. All rights reserved.</p>
          <p>37 Ibukun Olu Street, Akoka, Yaba, Lagos, Nigeria.</p>
        </div>
      </div>
    </footer>
  );
}

export default function Page() {
  useEffect(() => {
    let lenisInstance: any;

    const initAnimationSystems = async () => {
      try {
        const { default: Lenis } = await import("lenis");
        const gsapPkg = await import("gsap");
        const ScrollTriggerPkg = await import("gsap/ScrollTrigger");

        const gsap = gsapPkg.default || gsapPkg;
        const ScrollTrigger = ScrollTriggerPkg.default || ScrollTriggerPkg;

        gsap.registerPlugin(ScrollTrigger);

        lenisInstance = new Lenis();

        gsap.ticker.add((time) => {
          lenisInstance.raf(time * 1000);
        });
        gsap.ticker.lagSmoothing(0);

        // Standard up-reveal
        const reveals = document.querySelectorAll(".gsap-reveal");
        reveals.forEach((el) => {
          gsap.fromTo(el, 
            { opacity: 0, y: 50 },
            { 
              scrollTrigger: { trigger: el, start: "top 85%", once: true },
              opacity: 1, y: 0, duration: 0.9, ease: "power3.out", stagger: 0.15 
            }
          );
        });

        // Left split reveal
        const leftReveals = document.querySelectorAll(".gsap-reveal-left");
        leftReveals.forEach((el) => {
          gsap.fromTo(el, 
            { opacity: 0, x: -60 },
            { 
              scrollTrigger: { trigger: el, start: "top 85%", once: true },
              opacity: 1, x: 0, duration: 0.9, ease: "power3.out"
            }
          );
        });

        // Right split reveal
        const rightReveals = document.querySelectorAll(".gsap-reveal-right");
        rightReveals.forEach((el) => {
          gsap.fromTo(el, 
            { opacity: 0, x: 60 },
            { 
              scrollTrigger: { trigger: el, start: "top 85%", once: true },
              opacity: 1, x: 0, duration: 0.9, ease: "power3.out"
            }
          );
        });

      } catch (error) {
        console.error("Animation system failed to initialize gracefully:", error);
      }
    };

    initAnimationSystems();

    return () => {
      if (lenisInstance) {
        lenisInstance.destroy();
      }
    };
  }, []);

  return (
    <main className="relative bg-cream min-h-screen">
      <Navbar />
      <Hero />
      <Stats />
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
