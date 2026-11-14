import { FormEvent, useEffect, useState } from "react";

const A = `${import.meta.env.BASE_URL}assets`;
const mapImage = `${A}/welcome.webp`;

type View = "home" | "tour" | "confirmation";

const scenes = [
  {
    image: `${A}/hero/487f0.webp`,
    label: "Tea country",
    location: "Haputale · The tea highlands",
    title: (
      <>
        Welcome to Sri Lanka.
        <br />A world of your own.
      </>
    ),
  },
  {
    image: `${A}/hero/ca2ea.webp`,
    label: "Ancient heritage",
    location: "Sigiriya · The cultural heart",
    title: (
      <>
        A little wonder.
        <br />A thousand stories.
      </>
    ),
  },
  {
    image: `${A}/hero/fad68.webp`,
    label: "Golden beaches",
    location: "Mirissa · The southern coast",
    title: (
      <>
        Follow the coast.
        <br />
        Find your calm.
      </>
    ),
  },
  {
    image: `${A}/lasting-memories/bab8a.webp`,
    label: "Wildlife safari",
    location: "Udawalawe · Into the wild",
    title: (
      <>
        Make room
        <br />
        for the wild.
      </>
    ),
  },
  {
    image: `${A}/hero/344e2.webp`,
    label: "Misty mountains",
    location: "Ella · The misty highlands",
    title: (
      <>
        Take the slow road.
        <br />
        Feel a world away.
      </>
    ),
  },
];

const tours = [
  [
    "5 Nights / 6 Days",
    "Ceylon Flash",
    "A compact Sri Lankan escape, with time for discovery and a change of pace.",
    `${A}/packages/5N6D.webp`,
  ],
  [
    "6 Nights / 7 Days",
    "A Week Discover in Sri Lanka",
    "Ancient kingdoms, highland tea trails and wild elephants, ending by the ocean.",
    `${A}/packages/6N7D.webp`,
  ],
  [
    "8 Nights / 9 Days",
    "Leisure Sri Lanka",
    "Let the days unfold with room for island culture, nature and coastal calm.",
    `${A}/packages/8N9D.webp`,
  ],
  [
    "10 Nights / 11 Days",
    "Sri Lanka at Leisure",
    "Sacred cities and tea-covered hills, with unhurried days on the southern coast.",
    `${A}/packages/10N11D.webp`,
  ],
  [
    "14 Nights / 15 Days",
    "Discover Sri Lanka",
    "Stay a little longer. Discover the island's rich heritage, natural beauty and changing landscapes.",
    `${A}/packages/14N15D.webp`,
  ],
];

const guestPhotos = [
  "our-guests/23619.webp",
  "our-guests/e591e.webp",
  "our-guests/cc8f1.webp",
  "our-guests/64776.webp",
  "our-guests/d2502.webp",
  "our-guests/8428e.webp",
  "our-guests/c6376.webp",
  "our-guests/65b5d.webp",
  "our-guests/a8e63.webp",
  "our-guests/f4a0b.webp",
];

const days = [
  [
    "Airport to Negombo",
    "Approx. 20 minutes",
    "Welcome to Sri Lanka. Transfer to Negombo, check in and settle into coastal leisure.",
    "Negombo",
  ],
  [
    "Negombo to Anuradhapura",
    "Approx. 5 hours",
    "Depart for Sri Lanka’s first ancient kingdom and spend the afternoon among sacred ruins and monasteries.",
    "Anuradhapura",
  ],
  [
    "Anuradhapura to Dambulla & Kandy",
    "Approx. 4 hours",
    "Explore Dambulla’s cave temple before travelling through the hills to Kandy.",
    "Kandy",
  ],
  [
    "Kandy to Nuwara Eliya",
    "Approx. 3 hours",
    "Journey through cool highlands, tea estates and tumbling waterfalls.",
    "Nuwara Eliya",
  ],
  [
    "Nuwara Eliya to Haputale",
    "Scenic rail journey",
    "Take one of the world’s most beautiful train rides through the heart of tea country.",
    "Haputale",
  ],
  [
    "Haputale to Udawalawe & Weligama/Mirissa",
    "A full day of discovery",
    "Descend from the hills for an elephant safari, then continue to the southern coast.",
    "Weligama / Mirissa",
  ],
  [
    "Mirissa / Galle to Airport",
    "Departure day",
    "Visit Galle Fort and the southern coast before your airport transfer.",
    "Airport transfer",
  ],
];

function Logo({ light = false }: { light?: boolean }) {
  return (
    <div className="brand">
      <div className="logo-crop">
        <img src={`${A}/logo/logo_transparent.webp`} alt="Grand P & B" />
      </div>
      <div>
        <strong className={light ? "light" : ""}>GRAND P & B</strong>
        <span className={light ? "light muted-light" : ""}>SRI LANKA, PERSONALLY</span>
      </div>
    </div>
  );
}

function Arrow() {
  return <img className="arrow-icon" src={`${A}/96ef4.svg`} alt="" />;
}

function Header({ onView, current }: { onView: (v: View) => void; current: View }) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scroll = (id: string) => {
    setMenuOpen(false);
    if (current !== "home") {
      onView("home");
      window.setTimeout(
        () => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" }),
        50,
      );
    } else document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  const goHome = () => {
    setMenuOpen(false);
    onView("home");
  };

  return (
    <>
      <header className={`header ${scrolled ? "scrolled" : ""}`}>
        <button className="brand-button" onClick={goHome} aria-label="Grand P & B home">
          <Logo />
        </button>
        <nav>
          <button onClick={goHome}>Home</button>
          <button onClick={() => scroll("tours")}>Tour Packages</button>
          <button onClick={() => scroll("story")}>Our Story</button>
          <button onClick={() => scroll("inquiry")}>Contact</button>
          <button className="button dark" onClick={() => scroll("inquiry")}>
            Plan your journey <Arrow />
          </button>
        </nav>
        <button className="hamburger" onClick={() => setMenuOpen(!menuOpen)} aria-label="Menu">
          <span></span>
          <span></span>
          <span></span>
        </button>
      </header>
      <div className={`mobile-menu ${menuOpen ? "open" : ""}`}>
        <button onClick={goHome}>Home</button>
        <button onClick={() => scroll("tours")}>Tour Packages</button>
        <button onClick={() => scroll("story")}>Our Story</button>
        <button onClick={() => scroll("inquiry")}>Contact</button>
        <button className="button dark" onClick={() => scroll("inquiry")}>
          Plan your journey <Arrow />
        </button>
      </div>
    </>
  );
}

function Hero({ onTour }: { onTour: () => void }) {
  const [scene, setScene] = useState(0);
  const [playing, setPlaying] = useState(true);
  useEffect(() => {
    if (!playing) return;
    const timer = window.setInterval(() => setScene((n) => (n + 1) % scenes.length), 6500);
    return () => window.clearInterval(timer);
  }, [playing]);
  const active = scenes[scene];
  return (
    <section
      className="hero"
      style={{
        backgroundImage: `linear-gradient(180deg,transparent 45%,rgba(6,31,23,.76)),linear-gradient(90deg,rgba(6,38,29,.78),rgba(9,39,30,.08) 72%),url(${active.image})`,
      }}
    >
      <div className="hero-copy">
        <p className="eyebrow light">A SMALL ISLAND. AN EXTRAORDINARY JOURNEY.</p>
        <h1>{active.title}</h1>
        <p className="hero-intro">
          From tea-covered hills to the Indian Ocean, discover the island with a journey
          thoughtfully shaped around you.
        </p>
        <button className="button white" onClick={onTour}>
          Explore Tours <Arrow />
        </button>
      </div>
      <div className="hero-bottom">
        <p className="location">
          <img src={`${A}/a439f.svg`} alt="" />
          {active.location}
        </p>
        <div className="scene-nav">
          {scenes.map((item, i) => (
            <button
              key={item.label}
              className={i === scene ? "active" : ""}
              onClick={() => setScene(i)}
            >
              <i />
              <span>
                0{i + 1}&nbsp; {item.label}
              </span>
            </button>
          ))}
          <div className="slide-controls">
            <button aria-label="Previous slide" onClick={() => setScene((scene + 4) % 5)}>
              ‹
            </button>
            <span>0{scene + 1} / 05</span>
            <button aria-label="Next slide" onClick={() => setScene((scene + 1) % 5)}>
              ›
            </button>
            <button
              aria-label={playing ? "Pause slideshow" : "Play slideshow"}
              onClick={() => setPlaying(!playing)}
            >
              {playing ? "Ⅱ" : "▶"}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

function Footer({ onView }: { onView: (v: View) => void }) {
  const goTo = (id: string) => {
    onView("home");
    window.setTimeout(
      () => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" }),
      50,
    );
  };
  return (
    <footer>
      <div className="footer-grid">
        <div className="footer-brand">
          <Logo light />
          <p>Meaningful journeys. A personal welcome. Discover Sri Lanka at your own pace.</p>
          <small>Registration No PV00290601</small>
        </div>
        <div>
          <b>EXPLORE</b>
          <button onClick={() => onView("home")}>Home</button>
          <button onClick={() => onView("tour")}>Tour Packages</button>
          <button onClick={() => goTo("story")}>Our Story</button>
          <button onClick={() => goTo("inquiry")}>Contact</button>
        </div>
        <div>
          <b>GET IN TOUCH</b>
          <p>No 205/3, Polgaha-anga, Weligalla</p>
          <p>
            Mobile +94 71 636 8412
            <br />
            +94 71 636 8412
          </p>
          <p>grandpnb@mail.com</p>
        </div>
        <div>
          <b>STAY INSPIRED</b>
          <a href="#">Instagram ↗</a>
          <a href="#">Facebook ↗</a>
          <a href="#">WhatsApp ↗</a>
        </div>
      </div>
      <div className="legal">
        <span>© 2026 Grand P & B. All rights reserved.</span>
        <span>An island of possibilities. A journey that’s yours.</span>
      </div>
    </footer>
  );
}

function InquiryForm({ onComplete }: { onComplete: () => void }) {
  const [interests, setInterests] = useState(["Tea country"]);
  const submit = (e: FormEvent) => {
    e.preventDefault();
    onComplete();
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  return (
    <form className="inquiry-form" onSubmit={submit}>
      <div className="form-title">
        <h3>Tell us about your journey</h3>
        <span>* Required</span>
      </div>
      <div className="form-grid">
        <label>
          Full name *<input required placeholder="Your full name" />
        </label>
        <label>
          Email address *<input required type="email" placeholder="you@example.com" />
        </label>
        <label>
          Phone / WhatsApp
          <input placeholder="Country code + number" />
        </label>
        <label>
          Country of residence
          <select defaultValue="">
            <option value="" disabled>
              Select country
            </option>
            <option>United Kingdom</option>
            <option>Australia</option>
            <option>United States</option>
            <option>Other</option>
          </select>
        </label>
        <label>
          Arrival date
          <input type="date" />
        </label>
        <label>
          Departure date
          <input type="date" />
        </label>
        <label>
          Travellers
          <select>
            <option>2 adults · 0 children</option>
            <option>1 adult</option>
            <option>Family</option>
          </select>
        </label>
        <label>
          Accommodation preference
          <select>
            <option>3-star-plus / 4-star</option>
            <option>Boutique luxury</option>
            <option>Help me choose</option>
          </select>
        </label>
      </div>
      <label>
        Journey you’re interested in
        <select>
          <option>Help me choose a tour</option>
          <option>A Week Discover in Sri Lanka</option>
          <option>Ceylon Flash</option>
          <option>Discover Sri Lanka</option>
        </select>
      </label>
      <fieldset>
        <legend>What would you love to experience?</legend>
        <div className="chips">
          {["Culture", "Tea country", "Beaches", "Wildlife"].map((x) => (
            <button
              type="button"
              className={interests.includes(x) ? "selected" : ""}
              onClick={() =>
                setInterests((v) => (v.includes(x) ? v.filter((i) => i !== x) : [...v, x]))
              }
              key={x}
            >
              {x}
              {interests.includes(x) && " ✓"}
            </button>
          ))}
        </div>
      </fieldset>
      <label>
        A little more about your trip
        <textarea placeholder="Your preferred pace, special occasions, dietary needs or anything else we should know…" />
      </label>
      <label className="consent">
        <input required type="checkbox" /> I’m happy for Grand P & B to contact me about this
        inquiry.
      </label>
      <p className="form-note">An inquiry is not a booking. No payment required.</p>
      <button className="button dark" type="submit">
        Send my inquiry <Arrow />
      </button>
    </form>
  );
}

function GuestCarousel() {
  const [photo, setPhoto] = useState(0);
  const previous = () => setPhoto((photo + guestPhotos.length - 1) % guestPhotos.length);
  const next = () => setPhoto((photo + 1) % guestPhotos.length);

  return (
    <section
      className="guest-stories"
      aria-roledescription="carousel"
      aria-label="Guest memories"
      tabIndex={0}
      onKeyDown={(event) => {
        if (event.key === "ArrowLeft") previous();
        if (event.key === "ArrowRight") next();
      }}
    >
      <div className="guest-stories-heading">
        <div>
          <p className="eyebrow">OUR GUESTS · SHARED WITH PERMISSION</p>
          <h3>Journeys, shared with us.</h3>
        </div>
        <p>
          A few warm welcomes and happy moments from guests who kindly gave us permission to share
          their photographs.
        </p>
      </div>
      <div className="guest-carousel">
        <div className="guest-photo-stage" aria-live="polite">
          <img
            key={guestPhotos[photo]}
            src={`${A}/${guestPhotos[photo]}`}
            alt={`Grand P & B guest memory ${photo + 1} of ${guestPhotos.length}`}
          />
        </div>
        <div className="guest-carousel-panel">
          <p className="guest-counter">
            <span>{String(photo + 1).padStart(2, "0")}</span> /{" "}
            {String(guestPhotos.length).padStart(2, "0")}
          </p>
          <p className="guest-quote">A personal welcome, and a moment to remember.</p>
          <div className="guest-arrows">
            <button type="button" onClick={previous} aria-label="Previous guest photo">
              ←
            </button>
            <button type="button" onClick={next} aria-label="Next guest photo">
              →
            </button>
          </div>
          <small>Use the arrows or select a photograph below.</small>
        </div>
      </div>
      <div className="guest-thumbnails" aria-label="Choose a guest photo">
        {guestPhotos.map((image, index) => (
          <button
            type="button"
            className={index === photo ? "active" : ""}
            onClick={() => setPhoto(index)}
            aria-label={`Show guest photo ${index + 1}`}
            aria-current={index === photo}
            key={image}
          >
            <img src={`${A}/${image}`} alt="" />
          </button>
        ))}
      </div>
    </section>
  );
}

function Home({ onView }: { onView: (v: View) => void }) {
  return (
    <>
      <Header onView={onView} current="home" />
      <Hero
        onTour={() => document.getElementById("tours")?.scrollIntoView({ behavior: "smooth" })}
      />
      <section className="promises">
        <h3>Not just a destination. A feeling.</h3>
        <span>⌁ Thoughtfully planned</span>
        <span>⌾ Locally guided</span>
        <span>♧ Made personal</span>
      </section>
      <section className="section" id="tours">
        <div className="section-heading">
          <div>
            <p className="eyebrow">THE GRAND P & B COLLECTION</p>
            <h2>Five ways to fall for Sri Lanka.</h2>
          </div>
          <p>
            Choose your rhythm, from a fleeting escape to a deeper island discovery. We’ll help make
            it yours.
          </p>
        </div>
        <div className="tour-grid">
          {tours.map((tour, i) => (
            <article className="tour-card" key={tour[1]}>
              <img src={tour[3]} alt="" style={{ height: "fit-content" }} />
              <div>
                <b>{tour[0]}</b>
                <h3>{tour[1]}</h3>
                <p>{tour[2]}</p>
                <button
                  onClick={() =>
                    i === 1
                      ? (onView("tour"), window.scrollTo(0, 0))
                      : document.getElementById("inquiry")?.scrollIntoView({ behavior: "smooth" })
                  }
                >
                  {i === 1 ? "View 7-day itinerary" : "Explore this journey"} <Arrow />
                </button>
              </div>
            </article>
          ))}
          <article className="bespoke">
            <span>⌾</span>
            <p className="eyebrow">A JOURNEY, UNIQUELY YOURS</p>
            <h3>
              Your time.
              <br />
              Your kind of Sri Lanka.
            </h3>
            <p>
              Have a different route in mind? Tell us what moves you, and let’s shape the details
              together.
            </p>
            <button
              className="button outline"
              onClick={() =>
                document.getElementById("inquiry")?.scrollIntoView({ behavior: "smooth" })
              }
            >
              Create my journey <Arrow />
            </button>
          </article>
        </div>
      </section>
      <section className="story" id="story">
        <div className="story-image">
          <img
            src={mapImage}
            alt="Nine Arch Bridge in Ella"
            style={{ height: "540px", opacity: 0.7, objectFit: "contain" }}
          />
          <div>
            <span>NINE ARCH BRIDGE, ELLA</span>
            <em>The beauty is in the journey.</em>
          </div>
        </div>
        <div className="story-copy">
          <p className="eyebrow">OUR STORY · A PERSONAL WELCOME</p>
          <h2>
            An island we call home.
            <br />A journey you’ll call yours.
          </h2>
          <p>
            Grand P & B is a boutique Sri Lanka travel agency based in Weligalla. Our approach is
            personal: listen to the way you like to travel, then bring the island’s landscapes,
            culture and everyday moments together in a considered journey.
          </p>
          <p>
            From your first question to the finer details of your route, we believe good travel
            begins with clear information and a warm conversation.
          </p>
          <a href="#inquiry">Get to know Grand P & B&nbsp; ↗</a>
        </div>
        <GuestCarousel />
      </section>
      <section className="section gallery-section">
        <div className="section-heading">
          <div>
            <p className="eyebrow">LITTLE MOMENTS, LASTING MEMORIES</p>
            <h2>An island worth looking closer at.</h2>
          </div>
          <p className="right-note">
            Destination inspiration
            <br />
            Client photographs coming soon
          </p>
        </div>
        <div className="gallery">
          {[
            ["lasting-memories/ancient.webp", "01 / Ancient wonders"],
            ["lasting-memories/waterfall.webp", "02 / Highland journeys"],
            ["lasting-memories/beach.webp", "03 / Ocean days"],
            ["lasting-memories/60591.webp", "04 / Tea country mornings"],
          ].map(([img, label]) => (
            <figure key={label}>
              <img src={`${A}/${img}`} alt="" />
              <figcaption>{label}</figcaption>
            </figure>
          ))}
        </div>
        <blockquote>
          <span>TRAVELLER STORIES</span>
          <p>
            “The kind of journey that gives you time to take it all in — and memories to take home.”
          </p>
          <small>
            Illustrative copy only, not a customer review. A genuine traveller story will appear
            here with permission.
          </small>
        </blockquote>
      </section>
      <section className="inquiry-section" id="inquiry">
        <div className="inquiry-copy">
          <p className="eyebrow">YOUR NEXT CHAPTER STARTS HERE</p>
          <h2>
            Let’s make
            <br />
            your Sri Lanka
            <br />
            happen.
          </h2>
          <p>
            A sunrise safari? A slow week by the sea? Tell us what you have in mind. We’ll help you
            find your route and the right pace.
          </p>
          <ol>
            <li>Share your travel ideas</li>
            <li>Shape the details together</li>
            <li>Look forward to Sri Lanka</li>
          </ol>
          <hr />
          <small>Prefer a conversation?</small>
          <b>+94 71 636 8412</b>
          <a href="mailto:grandpnb@mail.com">grandpnb@mail.com</a>
        </div>
        <InquiryForm onComplete={() => onView("confirmation")} />
      </section>
      <Footer onView={onView} />
    </>
  );
}

function Tour({ onView }: { onView: (v: View) => void }) {
  const inquire = () => {
    onView("home");
    window.setTimeout(
      () => document.getElementById("inquiry")?.scrollIntoView({ behavior: "smooth" }),
      50,
    );
  };
  return (
    <>
      <Header onView={onView} current="tour" />
      <div className="breadcrumb">
        <button onClick={() => onView("home")}>Home / Tour Packages /</button>
        <span>A Week Discover in Sri Lanka</span>
      </div>
      <section className="tour-hero">
        <div>
          <p className="eyebrow light">THE HIGHLANDS, HERITAGE & SOUTHERN COAST</p>
          <h1>
            A Week Discover
            <br />
            in Sri Lanka
          </h1>
          <p>
            Seven days of ancient wonders, tea-country mornings and coastal moments. One beautifully
            varied island journey.
          </p>
        </div>
        <b>6 Nights / 7 Days</b>
        <span>Culture · Highlands · Wildlife · Coast</span>
      </section>
      <nav className="tour-tabs">
        <span>Overview</span>
        <b>Day-by-day itinerary</b>
        <span>What’s included</span>
        <button className="button dark" onClick={inquire}>
          Inquire about this journey <Arrow />
        </button>
      </nav>
      <main className="itinerary-layout">
        <section className="itinerary">
          <div className="itinerary-intro">
            <p className="eyebrow">YOUR JOURNEY, DAY BY DAY</p>
            <h2>From a warm welcome to a fond farewell.</h2>
            <p>
              Begin by the water in Negombo, trace the island’s cultural heart, then climb into tea
              country before a safari and the southern coast. Here’s how your seven days unfold.
            </p>
          </div>
          {days.map((day, i) => (
            <article className="day" key={day[0]}>
              <div>
                <small>DAY</small>
                <b>0{i + 1}</b>
              </div>
              <div>
                <h3>{day[0]}</h3>
                <small>◷ Travel time · {day[1]}</small>
                <p>
                  <i>•</i>
                  {day[2]}
                </p>
                {i === 0 && (
                  <aside>
                    <b>OPTIONAL</b> Bicycle hire to explore the surrounding countryside.
                  </aside>
                )}
                <strong>▱ Overnight · {day[3]}</strong>
              </div>
            </article>
          ))}
        </section>
        <aside className="sidebar">
          <div className="week-card">
            <p className="eyebrow light">YOUR WEEK AT A GLANCE</p>
            <h3>7 days. Many worlds.</h3>
            <p>
              Negombo
              <br />
              Anuradhapura / Dambulla
              <br />
              Kandy
              <br />
              Nuwara Eliya
              <br />
              Haputale
              <br />
              Udawalawe
              <br />
              Weligama / Mirissa
              <br />
              Galle → Airport
            </p>
            <hr />
            <small>
              6 nights of accommodation
              <br />
              3-star-plus or 4-star options
            </small>
            <button className="button white" onClick={inquire}>
              Plan this journey <Arrow />
            </button>
          </div>
          <div className="included">
            <h3>Considered, and included.</h3>
            {[
              "3-star-plus or 4-star accommodation",
              "Dinner and breakfast",
              "Air-conditioned vehicle with fuel",
              "English-speaking guide / driver",
              "Special guides at key sites",
              "Cultural show and train tickets",
              "All taxes",
            ].map((x) => (
              <p key={x}>✓ {x}</p>
            ))}
          </div>
          <div className="contact-card">
            <h3>Have something in mind?</h3>
            <p>
              Tell us your travel dates, accommodation preference and interests. Let's talk through
              the details.
            </p>
            <b>+94 71 636 8412</b>
            <span>grandpnb@mail.com</span>
          </div>
          <figure className="sidebar-photo">
            <img src={`${A}/packages/8N9D.webp`} alt="" />
            <figcaption>End with a little ocean air.</figcaption>
          </figure>
        </aside>
      </main>
      <section className="closing">
        <div>
          <p className="eyebrow">MAKE THIS YOUR SRI LANKA</p>
          <h2>A week to remember starts with a hello.</h2>
        </div>
        <button className="button dark" onClick={inquire}>
          Start my inquiry <Arrow />
        </button>
      </section>
      <Footer onView={onView} />
    </>
  );
}

function Confirmation({ onView }: { onView: (v: View) => void }) {
  return (
    <main className="confirmation">
      <div className="notice">ⓘ &nbsp; DESIGN PREVIEW · NO REQUEST SENT</div>
      <div className="confirm-brand">
        <div className="logo-crop">
          <img src={`${A}/logo/logo_transparent.webp`} alt="" />
        </div>
        <span>Grand P & B</span>
      </div>
      <section className="confirm-card">
        <div className="check">✓</div>
        <p className="eyebrow">A JOURNEY BEGINS WITH AN IDEA</p>
        <h1>
          Your Sri Lanka
          <br />
          is one step closer.
        </h1>
        <p>
          This is how an inquiry acknowledgement could look. Your travel ideas would be ready for a
          personal conversation with our team.
        </p>
        <div className="summary">
          <small>EXAMPLE INQUIRY</small>
          <b>A Week Discover in Sri Lanka</b>
          <span>6 Nights / 7 Days · 2 adults · Tea country</span>
        </div>
        <button className="button outline" onClick={() => onView("home")}>
          Back to exploring <Arrow />
        </button>
      </section>
      <small>
        Static visual state only. No inquiry has been submitted, no booking has been made, and no
        confirmation email has been sent.
      </small>
    </main>
  );
}

export default function App() {
  const [view, setView] = useState<View>("home");
  const go = (v: View) => {
    setView(v);
    if (v !== "confirmation") window.scrollTo({ top: 0, behavior: "smooth" });
  };
  const page =
    view === "tour" ? (
      <Tour onView={go} />
    ) : view === "confirmation" ? (
      <Confirmation onView={go} />
    ) : (
      <Home onView={go} />
    );
  const whatsappUrl =
    "https://wa.me/94716368412?text=" +
    encodeURIComponent("Hello Grand P & B! I'm interested in planning a trip to Sri Lanka.");

  return (
    <>
      {page}
      <a
        className="whatsapp-float"
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat with Grand P & B on WhatsApp"
      >
        <svg viewBox="0 0 32 32" aria-hidden="true">
          <path
            d="M16 3.5a12 12 0 0 0-10.3 18.2L4 28l6.5-1.7A12 12 0 1 0 16 3.5Z"
            fill="none"
            stroke="currentColor"
            strokeLinejoin="round"
            strokeWidth="2"
          />
          <path
            d="M12.1 10.4c-.4-.8-.8-.8-1.2-.8h-1c-.4 0-.9.2-1.2.7-.4.5-1.6 1.5-1.6 3.8s1.6 4.5 1.9 4.8c.2.3 3.1 5 7.7 6.8 3.8 1.5 4.6 1.2 5.4 1.1.8-.1 2.6-1.1 3-2.1.4-1 .4-1.9.3-2.1-.1-.2-.4-.3-.8-.5l-2.8-1.3c-.4-.2-.7-.2-1 .2-.3.4-1.1 1.3-1.4 1.6-.3.3-.5.3-.9.1-.4-.2-1.7-.6-3.3-2-1.2-1.1-2-2.4-2.2-2.8-.2-.4 0-.6.2-.8.2-.2.4-.5.6-.7.2-.2.3-.4.4-.7.1-.3 0-.5 0-.7l-1.3-3Z"
            fill="currentColor"
            transform="translate(2 0) scale(.86)"
          />
        </svg>
        <span>Chat with us</span>
      </a>
    </>
  );
}
