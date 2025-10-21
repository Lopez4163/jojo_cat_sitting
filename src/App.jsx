// src/App.jsx
import { useState } from "react";
import React from "react";


export default function App() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    neighborhood: "",
    dates: "",
    cats: "1",
    notes: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) =>
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: wire to Formspree/Resend or your backend
    setSubmitted(true);
  };

  // --- Add these near the top of App.jsx ---
const REVIEWS = [
  {
    name: "Sarah M.",
    area: "Astoria",
    text: "Daily photo updates and super thoughtful notes. Came home to a relaxed, happy kitty.",
  },
  {
    name: "Jason R.",
    area: "LIC",
    text: "Handled meds perfectly and kept the apartment tidy. 10/10 would book again.",
  },
  {
    name: "Nina P.",
    area: "Sunnyside",
    text: "My shy rescue warmed up faster than with anyone else. Excellent communication.",
  },
];

const FAQS = [
  {
    q: "How do keys and access work?",
    a: "Lockbox or concierge preferred. We can also arrange a quick handoff during the meet-and-greet.",
  },
  {
    q: "Do you give medication?",
    a: "Yes—pills, liquids, some injections. Please share vet instructions during intake.",
  },
  {
    q: "What updates will I get?",
    a: "Photos/videos and a short visit summary (feeding, litter, mood) after each visit.",
  },
  {
    q: "What’s the cancellation policy?",
    a: "48 hours for standard bookings; 7 days for major holidays. Emergencies are handled case-by-case.",
  },
  {
    q: "What areas do you cover?",
    a: "Astoria, LIC, Sunnyside, Woodside, and Jackson Heights. Other neighborhoods by request.",
  },
  {
    q: "How do I pay?",
    a: "Zelle, cash, or card. A deposit may be required for peak dates.",
  },
];

/* ---------- Hero Carousel (drop-in) ---------- */
function HeroCarousel() {
  const slides = [
    {
      src: "https://images.unsplash.com/photo-1519052537078-e6302a4968d4?auto=format&fit=crop&w=1600&q=75",
      alt: "Tabby cat lounging on a couch",
      headline: <>Trusted <span className="text-emerald-300">Cat Sitting</span> in Queens</>,
      sub: "Pet CPR/First-Aid • Daily photo updates",
      ctas: [
        { label: "Book Now", href: "#book", primary: true },
        { label: "Text Me", href: "sms:+10000000000", primary: false },
      ],
    },
    {
      src: "https://images.unsplash.com/photo-1543852786-1cf6624b9987?auto=format&fit=crop&w=1600&q=75",
      alt: "Cat by a sunny window",
      headline: <>Calm, consistent care at <span className="text-emerald-300">home</span></>,
      sub: "Kittens, seniors, shy rescues — handled with care",
      ctas: [
        { label: "See Services", href: "#services", primary: true },
        { label: "Read Reviews", href: "#reviews", primary: false },
      ],
    },
    {
      src: "https://images.unsplash.com/photo-1546443046-ed1ce6ffd1c7?auto=format&fit=crop&w=1600&q=75",
      alt: "Cozy sleeping cat",
      headline: <>Flexible visits & <span className="text-emerald-300">overnights</span></>,
      sub: "Simple pricing • Fast responses • NYC service area",
      ctas: [
        { label: "Check Availability", href: "#book", primary: true },
        { label: "FAQ", href: "#faq", primary: false },
      ],
    },
  ];

  const [index, setIndex] = React.useState(0);
  const [hovering, setHovering] = React.useState(false);
  const reducedMotion =
    typeof window !== "undefined" &&
    window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;

  const go = (dir) => setIndex((i) => (i + dir + slides.length) % slides.length);

  // Auto-advance every 5s (pause on hover / reduced motion)
  React.useEffect(() => {
    if (hovering || reducedMotion) return;
    const id = setInterval(() => go(1), 5000);
    return () => clearInterval(id);
  }, [hovering, reducedMotion]);

  // Touch/swipe support
  const startX = React.useRef(null);
  const onTouchStart = (e) => (startX.current = e.touches[0].clientX);
  const onTouchEnd = (e) => {
    if (startX.current == null) return;
    const dx = e.changedTouches[0].clientX - startX.current;
    if (dx > 50) go(-1);
    if (dx < -50) go(1);
    startX.current = null;
  };

  return (
    <section
      className="relative h-[60vh] min-h-[420px] w-full overflow-hidden md:h-[75vh] md:min-h-[560px]"
      onMouseEnter={() => setHovering(true)}
      onMouseLeave={() => setHovering(false)}
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
      aria-label="Featured photos with service highlights"
    >
      {/* Slides */}
      <div
        className="h-full w-full whitespace-nowrap transition-transform duration-700 ease-out"
        style={{ transform: `translateX(-${index * 100}%)` }}
      >
        {slides.map((s, i) => (
          <div
            key={i}
            className="relative inline-block h-full w-full align-top"
            role="group"
            aria-roledescription="slide"
            aria-label={`${i + 1} of ${slides.length}`}
          >
            <img
              src={s.src}
              alt={s.alt}
              className="h-full w-full object-cover object-center md:object-[50%_40%]"
              loading={i === 0 ? "eager" : "lazy"}
              decoding="async"
            />

            {/* Stronger overlay on mobile for legibility */}
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-900/55 to-slate-900/20 md:from-slate-950/70 md:via-slate-900/40 md:to-slate-900/10" />

            {/* Text overlay */}
            <div className="absolute inset-x-0 bottom-0 mx-auto w-full max-w-6xl px-4 pb-[env(safe-area-inset-bottom,1rem)] md:pb-16">
              <div className="max-w-full sm:max-w-xl md:max-w-2xl">
                <span className="mb-2 inline-flex w-fit items-center gap-2 rounded-full border border-white/10 bg-slate-900/40 px-2.5 py-1 text-[11px] text-emerald-200 backdrop-blur md:mb-3 md:px-3 md:text-xs">
                  Queens • Bonded & Insured • Pet CPR/First-Aid
                </span>

                {/* Fluid type with clamp() so it scales with viewport */}
                <h1 className="text-[clamp(1.6rem,6.5vw,3rem)] font-extrabold leading-[1.1] tracking-tight text-white drop-shadow">
                  {s.headline}
                </h1>

                <p className="mt-2 text-[clamp(.95rem,3.5vw,1.125rem)] text-slate-200/95 drop-shadow">
                  {s.sub}
                </p>

                <div className="mt-4 flex flex-col gap-2 sm:flex-row md:mt-6">
                  {s.ctas.map((c, k) =>
                    c.primary ? (
                      <a
                        key={k}
                        href={c.href}
                        className="inline-flex items-center justify-center gap-2 rounded-xl bg-emerald-400 px-4 py-2.5 text-[15px] font-semibold text-slate-900 shadow-lg shadow-emerald-400/30 hover:brightness-95 focus:outline-none focus:ring-2 focus:ring-emerald-300 sm:px-5 sm:py-3"
                      >
                        {c.label}
                        <svg viewBox="0 0 24 24" className="size-4 sm:size-5" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M5 12h14M13 5l7 7-7 7" />
                        </svg>
                      </a>
                    ) : (
                      <a
                        key={k}
                        href={c.href}
                        className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/15 bg-slate-900/40 px-4 py-2.5 text-[15px] font-semibold text-white backdrop-blur hover:bg-slate-900/55 focus:outline-none focus:ring-2 focus:ring-white/30 sm:px-5 sm:py-3"
                      >
                        {c.label}
                      </a>
                    )
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Controls (big tap targets on mobile) */}
      <div className="pointer-events-none absolute inset-0 flex items-center justify-between px-2">
        <button
          onClick={() => go(-1)}
          className="pointer-events-auto inline-flex size-11 items-center justify-center rounded-full border border-white/20 bg-slate-900/50 backdrop-blur hover:bg-slate-900/70 focus:outline-none focus:ring-2 focus:ring-white/40 sm:size-10"
          aria-label="Previous slide"
        >
          <svg viewBox="0 0 24 24" className="size-5" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="m15 19-7-7 7-7" />
          </svg>
        </button>
        <button
          onClick={() => go(1)}
          className="pointer-events-auto inline-flex size-11 items-center justify-center rounded-full border border-white/20 bg-slate-900/50 backdrop-blur hover:bg-slate-900/70 focus:outline-none focus:ring-2 focus:ring-white/40 sm:size-10"
          aria-label="Next slide"
        >
          <svg viewBox="0 0 24 24" className="size-5" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="m9 5 7 7-7 7" />
          </svg>
        </button>
      </div>

      {/* Dots */}
      {/* <div className="absolute inset-x-0 bottom-3 flex items-center justify-center gap-2">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => setIndex(i)}
            aria-label={`Go to slide ${i + 1}`}
            className={[
              "h-2.5 w-2.5 rounded-full border border-white/30 transition",
              i === index ? "bg-white" : "bg-white/25 hover:bg-white/40",
            ].join(" ")}
          />
        ))}
      </div> */}
    </section>
  );
}


  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 text-white selection:bg-emerald-300 selection:text-slate-900">
      {/* Top bar */}
      <header className="sticky top-0 z-40 backdrop-blur supports-[backdrop-filter]:bg-slate-900/50 bg-slate-900/60 border-b border-white/10">
        <div className="mx-auto max-w-6xl px-4">
          <div className="flex h-16 items-center justify-between">
            <a href="#" className="flex items-center gap-2">
              <div className="size-8 rounded-xl bg-emerald-400/90 shadow-lg shadow-emerald-400/30" />
              <span className="text-lg font-semibold tracking-tight">
                JoAndCats
              </span>
              <span className="ml-2 rounded-full bg-white/10 px-2 py-0.5 text-xs text-emerald-200">
                Cat Sitting and Care
              </span>
            </a>
            <nav className="hidden gap-6 md:flex">
              <a className="navlink" href="#services">Services</a>
              <a className="navlink" href="#about">About</a>
              {/* <a className="navlink" href="#gallery">Gallery</a> */}
              <a className="navlink" href="#reviews">Reviews</a>
              <a className="navlink" href="#faq">FAQ</a>
            </nav>
            <a
              href="#book"
              className="rounded-xl bg-emerald-400 px-4 py-2 text-sm font-semibold text-slate-900 shadow-lg shadow-emerald-400/30 hover:brightness-95 focus:outline-none focus:ring-2 focus:ring-emerald-300"
            >
              Book Now
            </a>
          </div>
        </div>
      </header>

      {/* Hero (carousel) */}
      <HeroCarousel />


      {/* Services */}
      <section id="services" className="mx-auto max-w-6xl px-4 py-16">
        <SectionTitle kicker="Services & Pricing" title="Simple, transparent rates" />
        <div className="mt-8 grid gap-6 md:grid-cols-3">
          {/* <Card title="30-min Visit" price="$28">
            <ul className="space-y-2 text-sm text-slate-300">
              <Li>Feeding, water refresh, litter scoop</Li>
              <Li>Playtime & cuddles</Li>
              <Li>Daily photo/video update</Li>
            </ul>
          </Card>
          <Card title="60-min Visit" price="$45" highlight>
            <ul className="space-y-2 text-sm text-slate-300">
              <Li>All from 30-min + extra enrichment</Li>
              <Li>Brushing, light tidy, plants/mail</Li>
              <Li>Great for multi-cat homes</Li>
            </ul>
          </Card> */}
          <Card title="Overnight" price="from $120">
            <ul className="space-y-2 text-sm text-slate-300">
              <Li>12 hours in-home overnight care</Li>
              <Li>Evening & morning routines</Li>
              <Li>Timid or senior cat friendly</Li>
            </ul>
          </Card>
        </div>

        <div className="mt-6 grid gap-4 rounded-2xl border border-white/10 bg-white/5 p-5 md:grid-cols-2">
          {/* <div>
            <h4 className="font-semibold text-white">Add-ons</h4>
            <p className="mt-1 text-sm text-slate-300">
              Medication (pills/injections), litter deep clean, special diets,
              plant care, mail packages. Priced per need.
            </p>
          </div> */}
          <div>
            <h4 className="font-semibold text-white">Service Area</h4>
            <p className="mt-1 text-sm text-slate-300">
              Queens • Brooklyn • Manhattan • Bronx • Nassau County 
              <br />
              (Other areas considered by request.)
            </p>
          </div>
        </div>
      </section>

      {/* About */}
      <section id="about" className="mx-auto max-w-6xl px-4 py-16">
        <SectionTitle kicker="About the Sitter" title="Hi, Josephine — your cat’s new bestie" />
        <div className="mt-8 grid items-center gap-10 md:grid-cols-2">
          <div className="order-2 md:order-1">
            <p className="text-slate-300">
              I’ve cared for cats of all temperaments for 7+ years—kittens,
              bonded pairs, seniors, and shy rescues. My updates
              include photos, short videos, and a visit summary so you never
              wonder how they’re doing.
            </p>
            <ul className="mt-4 grid gap-2 text-sm text-slate-200 md:grid-cols-2">
              <Li>Fear-free handling style</Li>
              <Li>Experience with injections/pills</Li>
              <Li>Key handoff & lockbox friendly</Li>
              <Li>Emergency vet protocol</Li>
            </ul>
          </div>
          <div className="order-1 md:order-2">
            <div className="mx-auto w-64">
              <img
                src="https://images.unsplash.com/photo-1532635223-f7a9c6a5c1df?q=80&w=1200&auto=format&fit=crop"
                alt="Sitter smiling with cat carrier"
                className="h-64 w-64 rounded-2xl border border-white/10 object-cover shadow-xl"
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Gallery
      <section id="gallery" className="mx-auto max-w-6xl px-4 py-16">
        <SectionTitle kicker="Happy Clients" title="Cozy cats, daily updates" />
        <div className="mt-8 grid grid-cols-2 gap-3 md:grid-cols-4">
          {[
            "https://images.unsplash.com/photo-1511044568932-338cba0ad803?q=80&w=1200&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1543852786-1cf6624b9987?q=80&w=1200&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1526336024174-e58f5cdd8e13?q=80&w=1200&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1546443046-ed1ce6ffd1c7?q=80&w=1200&auto=format&fit=crop",
          ].map((src, i) => (
            <div
              key={i}
              className="aspect-square overflow-hidden rounded-xl border border-white/10 bg-white/5"
            >
              <img
                src={src}
                alt={`Cat ${i + 1}`}
                className="h-full w-full object-cover transition-transform duration-300 hover:scale-105"
                loading="lazy"
              />
            </div>
          ))}
        </div>
      </section> */}

      {/* Reviews */}
      <section id="reviews" className="mx-auto max-w-6xl px-4 py-16">
        <SectionTitle kicker="Testimonials" title="Loved by cats & humans alike" />
        <div className="mt-8 grid gap-6 md:grid-cols-3">
          {REVIEWS.map((r, i) => (
            <blockquote
              key={i}
              className="rounded-2xl border border-white/10 bg-white/5 p-5"
            >
              <div className="flex items-center gap-3">
                <div className="size-10 rounded-full bg-white/10" />
                <div>
                  <div className="font-semibold">{r.name}</div>
                  <div className="text-xs text-slate-400">{r.area}</div>
                </div>
              </div>
              <p className="mt-3 text-sm text-slate-200">{r.text}</p>
              <div className="mt-3 flex items-center gap-1 text-emerald-300">
                {Array.from({ length: 5 }).map((_, j) => (
                  <Star key={j} />
                ))}
              </div>
            </blockquote>
          ))}
        </div>
      </section>

      {/* Booking */}
      <section id="book" className="mx-auto max-w-6xl px-4 py-16">
        <SectionTitle kicker="Booking" title="Tell me about your kitty" />
        <div className="mt-8 grid gap-8 md:grid-cols-2">
          <form
            onSubmit={handleSubmit}
            className="rounded-2xl border border-white/10 bg-white/5 p-6"
          >
            <div className="grid gap-4 sm:grid-cols-2">
              <Field label="Name" name="name" value={form.name} onChange={handleChange} />
              <Field label="Email" name="email" type="email" value={form.email} onChange={handleChange} />
              <Field label="Phone" name="phone" value={form.phone} onChange={handleChange} />
              <Field label="Neighborhood / ZIP" name="neighborhood" value={form.neighborhood} onChange={handleChange} />
              <Field label="Visit Dates" name="dates" placeholder="e.g., Nov 3–7, AM/PM" value={form.dates} onChange={handleChange} />
              <div className="flex flex-col">
                <label className="text-sm text-slate-300"># of Cats</label>
                <select
                  name="cats"
                  value={form.cats}
                  onChange={handleChange}
                  className="mt-1 rounded-lg border border-white/10 bg-slate-900/70 px-3 py-2 text-sm text-white focus:outline-none focus:ring-2 focus:ring-emerald-300"
                >
                  {[1,2,3,4,5].map(n => <option key={n} value={n}>{n}</option>)}
                </select>
              </div>
              <div className="sm:col-span-2">
                <label className="text-sm text-slate-300">Notes / Special Needs</label>
                <textarea
                  name="notes"
                  value={form.notes}
                  onChange={handleChange}
                  rows={4}
                  className="mt-1 w-full rounded-lg border border-white/10 bg-slate-900/70 px-3 py-2 text-sm text-white focus:outline-none focus:ring-2 focus:ring-emerald-300"
                  placeholder="Feeding schedule, meds, hiding spots, door code…"
                />
              </div>
            </div>
            <button
              type="submit"
              className="mt-5 w-full rounded-xl bg-emerald-400 px-5 py-3 font-semibold text-slate-900 shadow-lg shadow-emerald-400/30 hover:brightness-95 focus:outline-none focus:ring-2 focus:ring-emerald-300"
            >
              Request Availability
            </button>
            {submitted && (
              <p className="mt-3 text-sm text-emerald-300">
                Thanks! I’ll get back to you shortly. (Hook this form to Formspree/Resend.)
              </p>
            )}
          </form>

          <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
            <h4 className="font-semibold">What to expect</h4>
            <ul className="mt-3 space-y-2 text-sm text-slate-300">
              <Li>Reply within 2–6 hours (8am–8pm)</Li>
              <Li>Free 15-min meet-&-greet</Li>
              <Li>Daily photo/video updates</Li>
              <Li>Keys: lockbox or building concierge</Li>
              <Li>Payment: cash, Zelle, or card</Li>
            </ul>
            <div className="mt-6 rounded-xl border border-white/10 bg-slate-900/70 p-4 text-sm">
              <div className="font-semibold text-white">Policies (short)</div>
              <ul className="mt-2 list-disc space-y-1 pl-5 text-slate-300">
                <li>48h cancellation window (holidays 7 days)</li>
                <li>Multi-cat homes may require 60-min visits</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="mx-auto max-w-6xl px-4 py-16">
        <SectionTitle kicker="FAQ" title="Common questions" />
        <div className="mt-8 grid gap-4 md:grid-cols-2">
          {FAQS.map((f, i) => (
            <details
              key={i}
              className="group rounded-2xl border border-white/10 bg-white/5 p-5 open:bg-white/10"
            >
              <summary className="flex cursor-pointer list-none items-center justify-between font-medium text-white">
                {f.q}
                <span className="transition-transform duration-200 group-open:rotate-45">
                  <Plus />
                </span>
              </summary>
              <p className="mt-2 text-sm text-slate-300">{f.a}</p>
            </details>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/10 py-10">
        <div className="mx-auto max-w-6xl px-4">
          <div className="grid gap-6 md:grid-cols-3">
            <div>
              <div className="text-lg font-semibold">JoAndCats</div>
              <p className="mt-2 text-sm text-slate-400">
                Cat Sitting in Queens, Brooklyn, Manhttan and Nassau County.
              </p>
            </div>
            <div>
              <div className="font-semibold">Contact</div>
              <ul className="mt-2 text-sm text-slate-300">
                <li>Text: <a className="underline-offset-4 hover:underline" href="sms:+10000000000">(000) 000-0000</a></li>
                <li>Email: <a className="underline-offset-4 hover:underline" href="mailto:hello@purrfect.care">hello@purrfect.care</a></li>
                <li>Hours: 8am–8pm, 7 days</li>
              </ul>
            </div>
            <div>
              <div className="font-semibold">Links</div>
              <ul className="mt-2 text-sm text-slate-300">
                <li><a className="underline-offset-4 hover:underline" href="#book">Book Now</a></li>
                <li><a className="underline-offset-4 hover:underline" href="#services">Services & Pricing</a></li>
                <li><a className="underline-offset-4 hover:underline" href="#reviews">Reviews</a></li>
              </ul>
            </div>
          </div>
          <p className="mt-6 text-xs text-slate-500">© {new Date().getFullYear()} JoAndCats Care. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}

/* ---------- UI bits ---------- */

function SectionTitle({ kicker, title }) {
  return (
    <div className="text-center">
      <div className="mx-auto w-fit rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-emerald-200">
        {kicker}
      </div>
      <h2 className="mt-3 text-2xl font-bold tracking-tight md:text-3xl">{title}</h2>
    </div>
  );
}

function Card({ title, price, children, highlight = false }) {
  return (
    <div
      className={[
        "rounded-2xl border p-6",
        highlight
          ? "border-emerald-400/30 bg-gradient-to-b from-emerald-400/10 to-white/5 shadow-xl shadow-emerald-400/20"
          : "border-white/10 bg-white/5",
      ].join(" ")}
    >
      <div className="flex items-baseline justify-between">
        <h3 className="text-lg font-semibold">{title}</h3>
        <div className="text-xl font-extrabold text-emerald-300">{price}</div>
      </div>
      <div className="mt-3">{children}</div>
      <a
        href="#book"
        className="mt-5 inline-flex rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-sm font-semibold hover:bg-white/10"
      >
        Book this
      </a>
    </div>
  );
}

function Field({ label, name, value, onChange, type = "text", placeholder }) {
  return (
    <div className="flex flex-col">
      <label htmlFor={name} className="text-sm text-slate-300">{label}</label>
      <input
        id={name}
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={["name","email","phone","neighborhood","dates"].includes(name)}
        className="mt-1 rounded-lg border border-white/10 bg-slate-900/70 px-3 py-2 text-sm text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-300"
      />
    </div>
  );
}

function Li({ children }) {
  return (
    <li className="flex items-start gap-2">
      <Check />
      <span>{children}</span>
    </li>
  );
}

function Badge({ children }) {
  return (
    <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-2.5 py-1 text-xs text-slate-200">
      <CheckMini />
      {children}
    </span>
  );
}

/* ---------- Icons (inline SVG) ---------- */

function CheckMini() {
  return (
    <svg viewBox="0 0 20 20" fill="currentColor" className="size-3 text-emerald-300">
      <path fillRule="evenodd" d="M16.704 5.29a1 1 0 0 1 .006 1.414l-7.2 7.307a1 1 0 0 1-1.43.012L3.3 9.593a1 1 0 1 1 1.404-1.424l3.05 3.01 6.5-6.596a1 1 0 0 1 1.45.006Z" clipRule="evenodd" />
    </svg>
  );
}

function Check() {
  return (
    <svg viewBox="0 0 24 24" className="mt-0.5 size-4 flex-none text-emerald-300" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M20 6 9 17l-5-5" />
    </svg>
  );
}

function Plus() {
  return (
    <svg viewBox="0 0 24 24" className="size-5" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M12 5v14M5 12h14" />
    </svg>
  );
}

function Star() {
  return (
    <svg viewBox="0 0 24 24" className="size-4" fill="currentColor">
      <path d="m12 17.27 5.18 3.04-1.64-5.81L20 10.5l-5.9-.51L12 4l-2.1 6-5.9.5 4.46 3.99-1.64 5.82L12 17.27Z" />
    </svg>
  );
}

function Arrow() {
  return (
    <svg viewBox="0 0 24 24" className="size-5" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M5 12h14M13 5l7 7-7 7" />
    </svg>
  );
}

function Dot() {
  return <span className="inline-block size-2 rounded-full bg-emerald-300" />;
}

/* ---------- Small style helpers for nav links (Tailwind plugin-free) ---------- */
// Add this to global CSS if you want smooth scrolling:
// html { scroll-behavior: smooth; }

// Tailwind doesn't know ".navlink" by default, but we can piggyback utility classes via group:
