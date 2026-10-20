import React, { useEffect, useState } from "react";
import {
  ArrowRight, ArrowUpRight, Cake, Car, Clock, Dog, Facebook, Gift, GraduationCap, Heart, Instagram, Leaf,
  Mail, MapPin, Menu, Mountain, Phone, Snowflake, Sun, Thermometer, Ticket, Users, Utensils, X, Youtube,
} from "lucide-react";
import { ConceptWidget, StudioCredit } from "./concept.jsx";
import logo from "./assets/leadville-railroad-logo.png";
import heroClimb from "./assets/photos/hero-climb.jpg";
import valleyRun from "./assets/photos/valley-run.jpg";
import aspenHillside from "./assets/photos/aspen-hillside.jpg";
import openCarFall from "./assets/photos/open-car-fall.jpg";
import holidayLounge from "./assets/photos/holiday-lounge.jpg";
import winterBooth from "./assets/photos/winter-booth.jpg";
import summerCurve from "./assets/photos/summer-curve.jpg";
import wildflowers from "./assets/photos/wildflowers.jpg";
import coachOpen from "./assets/photos/coach-open.jpg";
import loungeCar from "./assets/photos/lounge-car.jpg";
import caboose from "./assets/photos/caboose.jpg";
import coach1007 from "./assets/photos/coach-1007.jpg";
import engines from "./assets/photos/engines.jpg";
import crew from "./assets/photos/crew.jpg";
import dogGolden from "./assets/photos/dog-golden.jpg";
import dogWhite from "./assets/photos/dog-white.jpg";
import dogWindow from "./assets/photos/dog-window.jpg";
import depot from "./assets/photos/depot.jpg";
import waterTower from "./assets/photos/water-tower.jpg";
import group from "./assets/photos/group.jpg";

// ---------------------------------------------------------------- Content (from leadvillerailroad.com, checked 2026-10-20)
const COMPANY = "Leadville Railroad";
const ABBR = "lvr";
const END_DATE = "2026-11-24T23:59:59-07:00";
const PHONE = "1-866-386-3936";
const PHONE_HREF = "tel:+18663863936";
const EMAIL = "conductor@leadvillerailroad.com";
const ADDRESS = "326 E. 7th St., Leadville, CO 80461";
const MAP = "https://maps.app.goo.gl/2uDSr9kiY7wSQcSK9";
const ORIGINAL = "https://leadvillerailroad.com/";
const SOCIAL = [
  ["Facebook", "https://www.facebook.com/LeadvilleRailroad", Facebook],
  ["Instagram", "https://www.instagram.com/leadvillerailroad", Instagram],
  ["YouTube", "https://www.youtube.com/@LeadvilleRailroad", Youtube],
];

// Their FareHarbor booking (company "leadvillerailroad"); item ids are the ones on their homepage buttons.
const FH = "https://fareharbor.com/embeds/book/leadvillerailroad";
const BOOK = `${FH}/items/calendar/?full-items=yes&flow=1395369`;
const BOOK_OKTOBERFEST = `${FH}/items/633449/?full-items=yes&flow=1395369`;
const BOOK_SCENIC = `${FH}/items/calendar/633355/?full-items=yes&flow=1395369`;
const GIFT_CARDS = `${FH}/items/634430/?full-items=yes&flow=1395369`;

const NAV = [["#board", "Schedule"], ["#rides", "Rides"], ["#seats", "Seats"], ["#visit", "Plan a visit"], ["#groups", "Groups"]];

// The departure board: every train on the current site, with its season, length and fare.
const BOARD = [
  { train: "Oktoberfest", when: "Sat & Sun, all October", length: "2.5 hr", fare: "from $60", status: "Boarding", tone: "go", href: BOOK_OKTOBERFEST },
  { train: "Holiday Express", when: "From Nov 14, 2026", length: "2 hr", fare: "from $80", status: "On sale", tone: "sale", href: BOOK },
  { train: "Winter Express", when: "After the holidays", length: "2 hr", fare: "heated cars", status: "On sale", tone: "sale", href: BOOK },
  { train: "Summer Scenic", when: "Daily, Memorial Day–Sept", length: "2.5 hr", fare: "from $60", status: "Late Oct", tone: "soon", href: BOOK_SCENIC },
];

const STOPS = [
  { mark: "01", title: "The brick depot", text: "Check in at will call 30 minutes before departure. Free parking, benches and a gazebo by the train.", tag: "10,152 ft" },
  { mark: "02", title: "Into the San Isabel", text: "The line heads north out of downtown Leadville and climbs into the San Isabel National Forest.", tag: "Narrated" },
  { mark: "03", title: "The water tower", text: "A stop at a historic steam engine water tower, where you can step off the train and explore.", tag: "Step off" },
  { mark: "04", title: "Two fourteeners", text: "Panoramas of the upper Arkansas River Valley, Mt. Elbert and Mt. Massive on the way back to town.", tag: "Round trip" },
];

const RIDES = [
  {
    id: "oktoberfest", season: "Fall", icon: Leaf, img: aspenHillside, name: "Oktoberfest", meta: "Every Saturday & Sunday in October · 2.5 hr",
    text: "A fall ride through gold aspen with pretzels and seasonal libations: local beers, hot cocoa and hot apple cider. Dogs welcome in coach with a signed waiver.",
    cta: ["Book Oktoberfest", BOOK_OKTOBERFEST],
  },
  {
    id: "holiday", season: "Nov–Dec", icon: Gift, img: holidayLounge, name: "Holiday Express", meta: "Starting Nov 14, 2026 · 2 hr · from $80",
    text: "Heated lounge cars with festive lights, treats and drinks served at your table, and a visit from Santa, Mrs. Claus or one of Santa's elves. Step out to the open-air car for a photo with the snow globe.",
    cta: ["Book Holiday Express", BOOK],
  },
  {
    id: "winter", season: "Winter", icon: Snowflake, img: winterBooth, name: "Winter Express", meta: "After the holidays · 2 hr",
    text: "The frosted Colorado wilderness from a cozy, heated lounge car or the new heated 1007 coach. Table service in the lounge cars; the grill car and boxcar are a short walk away.",
    cta: ["See winter dates", BOOK],
  },
  {
    id: "summer", season: "Summer", icon: Sun, img: summerCurve, name: "Summer Scenic", meta: "Daily, Memorial Day weekend–September · 2.5 hr",
    text: "The classic trip in open-air and covered cars, with engine and caboose rides available. Summer 2027 tickets open in late October 2026.",
    cta: ["Check the calendar", BOOK_SCENIC],
  },
];

const SPECIALS = [
  { icon: Leaf, img: wildflowers, name: "Wildflower Special", text: "A 3-hour trip in July and August: ride up into the forest, then a 30-minute guided hike on the tundra among the wildflowers. Designed for all abilities." },
  { icon: Utensils, img: openCarFall, name: "Devil's Tail BBQ", text: "Evening rides in July and September with a buffet BBQ dinner (brisket, pulled pork, baked beans, jalapeño poppers and dessert) and the sunset over the valley." },
];

const FARES = [
  ["Coach, adult", "$60"],
  ["Coach, child 4–12", "$40"],
  ["Lounge car", "$90"],
  ["Caboose, whole party", "+$185"],
];

const SEATS = [
  { img: coachOpen, name: "Coach", price: "$60 adult · $40 child", text: "Open air, semi-enclosed, or mostly enclosed with windows. Padded seats face the scenery; first come, first served in spring, summer and fall. The only cars where dogs can ride." },
  { img: loungeCar, name: "Lounge car", price: "$90", text: "Fully enclosed and heated, with booth seating at two-person Fir and four-person Spruce tables. Three cars, Black, Red and Mint, with seats assigned by staff the morning of the ride." },
  { img: caboose, name: "Caboose", price: "$185 for your party", text: "A private car for up to 12 adults. Book coach seats for everyone, then add one caboose ride. Step out onto the back platform for the view. Summer and fall only." },
  { img: engines, name: "Engine cab", price: "Add-on per person", text: "Three adults ride up front from the water tower stop back to town. Book coach or lounge tickets first, then an engine ride for each person. Summer and fall only." },
];

const KNOW = [
  { icon: Thermometer, title: "Dress in layers", text: "At 10,000+ feet it can rain, snow, hail or shine on the same trip. Coach cars aren't heated; lounge cars are." },
  { icon: Clock, title: "Arrive 30 minutes early", text: "Tickets are held at will call. Unclaimed seats may be released 15 minutes before departure." },
  { icon: Dog, title: "Dogs welcome in coach", text: "Spring, summer and fall, in general seating, with a signed pet waiver. No animals on the Holiday or Winter Express." },
  { icon: Utensils, title: "Snacks on board", text: "Bring your own food and soft drinks. The boxcar sells snacks, drinks and beer; no outside alcohol." },
  { icon: Users, title: "Accessible boarding", text: "A boarding ramp, an accessible car and five restrooms on board. Note wheelchair needs on your reservation." },
  { icon: Ticket, title: "Tickets & changes", text: "Tickets are non-refundable; date or seat changes are $6 per ticket within 90 days. Add Trip Protection for refunds." },
];

const REVIEWS = [
  { name: "PETERRF1954OV", text: "A nice & relaxing ride as you enjoy the mountains & the beautiful variety of wildflowers.They actually do a wildflower train tour. Fall is breathtaking as the Aspen turn colors. Highly recommend!" },
  { name: "675GINGER", text: "We took the train ride on THE weekend for fall colors. Each bend in the track provided a new scene that seemed more spectacular than the previous one. Nice history and local yore as we traveled. Easy to move around the train. Even took our old dog who snoozed during most of the trip. A great way to see the countryside without hiking." },
  { name: "LYDIA Z.", text: "Beautiful scenery while cruising on the train, what more could you want....well, my friend, you can add something. The CABOOSE! Granted it is at an extra cost but boy did it make it more enjoyable!" },
];

const GROUPS = [
  { icon: Users, name: "Groups of 20+", price: "$51 adult · $34 child · $76.50 lounge", text: "Group rates good through April 2027. Call or email to book." },
  { icon: GraduationCap, name: "School & scout trips", price: "Rates per group", text: "Educational groups can get a discount even under the 20-person minimum." },
  { icon: Cake, name: "Caboose birthdays", price: "Fares + $350", text: "Up to 12 guests get the caboose for the whole trip, with a quarter-sheet cake. Not available mid-November to April." },
  { icon: Heart, name: "Weddings & charters", price: "Whole train", text: "Rent the train on a scheduled trip or for a private evening run." },
];

const DRIVES = [["Frisco", "45 min"], ["Vail", "1 hr"], ["Breckenridge", "1 hr"], ["Salida", "1 hr"], ["Avon", "1 hr 15 min"], ["Denver", "2 hr"], ["Colorado Springs", "2 hr"], ["Grand Junction", "3 hr 45 min"]];

// ---------------------------------------------------------------- Motif: rails and ties
function Rails({ className = "" }) {
  return <div className={`rails ${className}`} aria-hidden="true"><span /></div>;
}

function Herald({ size = 64 }) {
  // The oval herald from their logo, simplified for section marks.
  return (
    <svg className="herald" width={size} height={size * 0.55} viewBox="0 0 120 66" aria-hidden="true">
      <ellipse cx="60" cy="33" rx="56" ry="29" fill="none" stroke="currentColor" strokeWidth="5" />
      <ellipse cx="60" cy="33" rx="45" ry="20" fill="none" stroke="currentColor" strokeWidth="2" opacity=".5" />
      <path d="M8 26h70l10 7-10 7H8z" fill="currentColor" opacity=".9" />
    </svg>
  );
}

// ---------------------------------------------------------------- Sections
function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return (
    <>
      <a className="notice" href="#holiday">
        <Snowflake size={15} /> <span><strong>Holiday Express</strong> rides start Nov 14, 2026. Tickets are on sale now.</span> <ArrowRight size={15} />
      </a>
      <header className={`header${scrolled ? " is-scrolled" : ""}`}>
        <div className="wrap header-row">
          <a href="#top" className="brand" aria-label="Leadville Railroad home">
            <img src={logo} alt="Leadville Railroad" width="218" height="91" />
            <span className="brand-text"><strong>Leadville Railroad</strong><small>Leadville, Colorado · since 1988</small></span>
          </a>
          <nav className={`nav${open ? " is-open" : ""}`} aria-label="Main">
            {NAV.map(([href, label]) => <a key={href} href={href} onClick={() => setOpen(false)}>{label}</a>)}
            <a href={PHONE_HREF} className="nav-phone"><Phone size={16} /> {PHONE}</a>
          </nav>
          <a href={PHONE_HREF} className="header-phone"><Phone size={16} /> <span>{PHONE}</span></a>
          <a href={BOOK} className="btn btn-lantern header-book" target="_blank" rel="noopener noreferrer">Book tickets</a>
          <button type="button" className="menu-btn" onClick={() => setOpen((v) => !v)} aria-label={open ? "Close menu" : "Open menu"} aria-expanded={open}>
            {open ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </header>
    </>
  );
}

function Hero() {
  return (
    <section className="hero" id="top">
      <img className="hero-img" src={heroClimb} alt="Leadville Railroad locomotive 1714 pulling the train above a mountain valley" />
      <div className="hero-shade" />
      <div className="wrap hero-grid">
        <div className="hero-copy">
          <p className="kicker"><Mountain size={16} /> Leadville, Colorado · 10,152 feet</p>
          <h1>All aboard for <em>the high country.</em></h1>
          <p className="hero-lede">A round trip from Leadville's historic brick depot into the San Isabel National Forest, with conductor stories of the town's colorful past and views of Mt. Elbert and Mt. Massive.</p>
          <div className="hero-ctas">
            <a href={BOOK} className="btn btn-lantern" target="_blank" rel="noopener noreferrer"><Ticket size={18} /> Book your seats</a>
            <a href={PHONE_HREF} className="btn btn-ghost"><Phone size={18} /> {PHONE}</a>
          </div>
        </div>
        <aside className="ticket" aria-label="Fares">
          <div className="ticket-top">
            <span>Admit one</span>
            <span>No. 1988</span>
          </div>
          <p className="ticket-route">Leadville <ArrowRight size={16} /> Water tower <ArrowRight size={16} /> Leadville</p>
          <dl className="ticket-fares">
            {FARES.map(([k, v]) => <div key={k}><dt>{k}</dt><dd>{v}</dd></div>)}
          </dl>
          <p className="ticket-fine">2.5-hour round trip. Military discount available: call for the code.</p>
          <div className="ticket-stub">
            <a href={GIFT_CARDS} target="_blank" rel="noopener noreferrer"><Gift size={15} /> Gift cards</a>
            <a href="#seats">Seat guide <ArrowRight size={15} /></a>
          </div>
        </aside>
      </div>
    </section>
  );
}

function Board() {
  return (
    <section className="board-wrap" id="board" aria-labelledby="board-title">
      <div className="wrap">
        <div className="board">
          <div className="board-head">
            <h2 id="board-title">Departures</h2>
            <p>Daily trips Memorial Day weekend through September. Weekly rides October through April. Times for every date are on the live calendar.</p>
          </div>
          <div className="board-table" role="table" aria-label="Upcoming trains">
            <div className="board-row board-labels" role="row">
              <span role="columnheader">Train</span><span role="columnheader">When</span><span role="columnheader">Trip</span><span role="columnheader">Fare</span><span role="columnheader">Status</span>
            </div>
            {BOARD.map((row) => (
              <a className="board-row" role="row" key={row.train} href={row.href} target="_blank" rel="noopener noreferrer">
                <span role="cell" className="flap flap-train">{row.train}</span>
                <span role="cell" className="flap">{row.when}</span>
                <span role="cell" className="flap">{row.length}</span>
                <span role="cell" className="flap">{row.fare}</span>
                <span role="cell" className={`status status-${row.tone}`}>{row.status}</span>
              </a>
            ))}
          </div>
          <div className="board-foot">
            <a href={PHONE_HREF}><Phone size={16} /> {PHONE}</a>
            <a href={MAP} target="_blank" rel="noopener noreferrer"><MapPin size={16} /> {ADDRESS}</a>
            <a href={BOOK} target="_blank" rel="noopener noreferrer" className="board-cal">Open the full calendar <ArrowUpRight size={16} /></a>
          </div>
        </div>
      </div>
    </section>
  );
}

function Route() {
  return (
    <section className="route" id="route">
      <div className="wrap route-grid">
        <div className="route-intro">
          <p className="eyebrow">The line</p>
          <h2>Two and a half hours on the old high line.</h2>
          <p>Passengers ride in vintage cars behind a historic diesel locomotive. A conductor narrates half the trip: Leadville's colorful history, the Tabors, Molly Brown, Doc Holliday, and how the railroad shaped this corner of Colorado.</p>
        </div>
        <figure className="route-photo">
          <img src={valleyRun} alt="The train crossing an open valley below bare mountain slopes" loading="lazy" />
        </figure>
      </div>
      <div className="wrap">
        <ol className="stops">
          {STOPS.map((s) => (
            <li key={s.mark}>
              <span className="stop-dot" aria-hidden="true" />
              <span className="stop-tag">{s.tag}</span>
              <h3><small>{s.mark}</small>{s.title}</h3>
              <p>{s.text}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

function Rides() {
  return (
    <section className="rides" id="rides">
      <div className="wrap">
        <div className="section-head">
          <p className="eyebrow">Four seasons on the rails</p>
          <h2>Pick your train.</h2>
        </div>
        <div className="ride-list">
          {RIDES.map((r, i) => {
            const Icon = r.icon;
            return (
              <article className={`ride${i % 2 ? " flip" : ""}`} key={r.id} id={r.id}>
                <div className="ride-img"><img src={r.img} alt="" loading="lazy" /><span className="ride-season"><Icon size={15} /> {r.season}</span></div>
                <div className="ride-copy">
                  <h3>{r.name}</h3>
                  <p className="ride-meta">{r.meta}</p>
                  <p>{r.text}</p>
                  <a href={r.cta[1]} className="text-link" target="_blank" rel="noopener noreferrer">{r.cta[0]} <ArrowUpRight size={17} /></a>
                </div>
              </article>
            );
          })}
        </div>
        <div className="specials">
          <p className="specials-label">Summer specials</p>
          {SPECIALS.map((s) => {
            const Icon = s.icon;
            return (
              <article className="special" key={s.name}>
                <img src={s.img} alt="" loading="lazy" />
                <div><h3><Icon size={18} /> {s.name}</h3><p>{s.text}</p></div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function Seats() {
  return (
    <section className="seats" id="seats">
      <Rails className="rails-top" />
      <div className="wrap">
        <div className="section-head light">
          <p className="eyebrow">Choose your car</p>
          <h2>Open air, warm booth, or the whole caboose.</h2>
          <p>About 150 enclosed seats and 150 open-air seats in coach, plus three lounge cars. On the Holiday and Winter Express everyone rides heated: the lounge cars or the new 1007 coach.</p>
        </div>
        <div className="seat-grid">
          {SEATS.map((s) => (
            <article className="seat" key={s.name}>
              <div className="seat-img"><img src={s.img} alt="" loading="lazy" /></div>
              <div className="seat-body">
                <div className="seat-title"><h3>{s.name}</h3><span>{s.price}</span></div>
                <p>{s.text}</p>
              </div>
            </article>
          ))}
        </div>
        <div className="seat-winter">
          <img src={coach1007} alt="A mint-green lounge car booth with snow outside the window" loading="lazy" />
          <div>
            <p className="eyebrow">New for winter 2026</p>
            <h3>The heated 1007 coach</h3>
            <p>A fully enclosed, heated coach for the Holiday and Winter Express, with seats assigned by staff before the trip. Quick access to the open-air car for photos; food and drinks from the grill car and boxcar.</p>
          </div>
        </div>
      </div>
    </section>
  );
}

function Reviews() {
  return (
    <section className="reviews" id="reviews">
      <div className="wrap">
        <div className="section-head">
          <p className="eyebrow">From the passengers</p>
          <h2>"Each bend in the track provided a new scene."</h2>
        </div>
        <div className="review-grid">
          {REVIEWS.map((r) => (
            <figure className="review" key={r.name}>
              <blockquote>{r.text}</blockquote>
              <figcaption><strong>{r.name}</strong><span>Testimonial shown on leadvillerailroad.com</span></figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}

function Story() {
  return (
    <section className="story" id="story">
      <div className="wrap story-grid">
        <div className="story-photos">
          <img className="story-a" src={waterTower} alt="Historic photo of a steam locomotive with a plow beside a wooden water tower in snow" loading="lazy" />
          <img className="story-b" src={crew} alt="Leadville Railroad crew members on the steps of a passenger car" loading="lazy" />
        </div>
        <div className="story-copy">
          <Herald size={84} />
          <p className="eyebrow">Our story</p>
          <h2>Scenic rides out of Leadville since 1988.</h2>
          <p>For more than three decades the Leadville Railroad has carried families out of town and up into the Upper Arkansas River Valley. Every conductor tells the story a little differently: Leadville's famous characters, its scandals, and the railroading that tied this mountain town to the rest of Colorado.</p>
          <p>Bring the kids, bring the grandparents, and bring the dog. The point is unhurried time together at ten thousand feet.</p>
          <div className="story-stats">
            <div><strong>1988</strong><span>First season</span></div>
            <div><strong>10,152'</strong><span>Depot elevation</span></div>
            <div><strong>2.5 hr</strong><span>Round trip</span></div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Dogs() {
  return (
    <section className="dogs" aria-labelledby="dogs-title">
      <div className="wrap dogs-grid">
        <div className="dogs-copy">
          <Dog size={30} />
          <h2 id="dogs-title">Yes, the dog can come.</h2>
          <p>Pets ride in coach seating on spring, summer and fall trips with a signed pet waiver. Bring a mat and some water. (No animals on the Holiday or Winter Express.)</p>
        </div>
        <div className="dogs-photos">
          <img src={dogGolden} alt="A golden retriever lying on the floor of an open car" loading="lazy" />
          <img src={dogWindow} alt="A small dog looking out the window of a coach car" loading="lazy" />
          <img src={dogWhite} alt="A white dog smiling on the train" loading="lazy" />
        </div>
      </div>
    </section>
  );
}

function Know() {
  return (
    <section className="know" id="know">
      <div className="wrap">
        <div className="section-head">
          <p className="eyebrow">Before you ride</p>
          <h2>Good to know.</h2>
        </div>
        <div className="know-grid">
          {KNOW.map((k) => {
            const Icon = k.icon;
            return (
              <div className="know-item" key={k.title}>
                <Icon size={22} />
                <h3>{k.title}</h3>
                <p>{k.text}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function Groups() {
  return (
    <section className="groups" id="groups">
      <div className="wrap groups-grid">
        <div className="groups-intro">
          <p className="eyebrow">Groups &amp; events</p>
          <h2>Bring the whole crew.</h2>
          <p>Schools, scouts, reunions, birthdays and weddings. Call {PHONE} or email <a href={`mailto:${EMAIL}`}>{EMAIL}</a> and we'll set it up.</p>
          <img src={group} alt="A large group with their dogs posing beside a Leadville Railroad coach" loading="lazy" />
        </div>
        <div className="group-list">
          {GROUPS.map((g) => {
            const Icon = g.icon;
            return (
              <article className="group-item" key={g.name}>
                <Icon size={22} />
                <div><h3>{g.name}</h3><span>{g.price}</span><p>{g.text}</p></div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function Visit() {
  return (
    <section className="visit" id="visit">
      <Rails className="rails-top" />
      <div className="wrap visit-grid">
        <div className="visit-main">
          <p className="eyebrow">Plan your visit</p>
          <h2>Meet us at the depot.</h2>
          <ul className="visit-list">
            <li><MapPin size={20} /><div><strong>{ADDRESS}</strong><span>From the north, take Hwy 24 through town and turn left at 7th St. From the south, turn right at 7th.</span><a href={MAP} target="_blank" rel="noopener noreferrer">Open in Google Maps <ArrowUpRight size={15} /></a></div></li>
            <li><Car size={20} /><div><strong>Free parking</strong><span>A large lot beside the depot. Buses and RVs use the north lot across 8th Street. Drop off anyone who needs help boarding near the ramp.</span></div></li>
            <li><Phone size={20} /><div><strong><a href={PHONE_HREF}>{PHONE}</a></strong><span>Gift cards, military discount codes, engine and caboose questions.</span></div></li>
            <li><Mail size={20} /><div><strong><a href={`mailto:${EMAIL}`}>{EMAIL}</a></strong><span>Groups, charters and brochure requests.</span></div></li>
          </ul>
        </div>
        <div className="visit-side">
          <img src={depot} alt="The historic red brick Leadville depot with a locomotive parked beside it" loading="lazy" />
          <div className="drives">
            <h3>Drive times to Leadville</h3>
            <ul>{DRIVES.map(([c, t]) => <li key={c}><span>{c}</span><span className="dots" /><strong>{t}</strong></li>)}</ul>
            <p>Plan extra time on September weekends. Ride share is very limited in the mountains.</p>
          </div>
        </div>
      </div>
      <div className="wrap final-cta">
        <h2>Your seat's waiting.</h2>
        <div>
          <a href={BOOK} className="btn btn-lantern" target="_blank" rel="noopener noreferrer"><Ticket size={18} /> Book tickets</a>
          <a href={PHONE_HREF} className="btn btn-ghost"><Phone size={18} /> Call the depot</a>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="footer">
      <div className="wrap footer-row">
        <div className="footer-brand">
          <span className="footer-plate"><img src={logo} alt="Leadville Railroad" width="218" height="91" loading="lazy" /></span>
          <p>Scenic train rides from 326 E. 7th St. in Leadville, Colorado, operated by the Leadville Colorado &amp; Southern Railroad Company.</p>
        </div>
        <div className="footer-links">
          <a href="#board">Schedule</a><a href="#rides">Rides</a><a href="#seats">Seats</a><a href="#know">FAQ</a><a href="#groups">Groups</a><a href="#visit">Directions</a>
          <a href={GIFT_CARDS} target="_blank" rel="noopener noreferrer">Gift cards</a>
        </div>
        <div className="footer-contact">
          <a href={PHONE_HREF}><Phone size={16} /> {PHONE}</a>
          <a href={`mailto:${EMAIL}`}><Mail size={16} /> {EMAIL}</a>
          <div className="footer-social">
            {SOCIAL.map(([label, href, Icon]) => <a key={label} href={href} target="_blank" rel="noopener noreferrer" aria-label={label}><Icon size={18} /></a>)}
          </div>
        </div>
      </div>
      <div className="wrap footer-base">
        <span>© {new Date().getFullYear()} Leadville Railroad. Independent concept · not for official use. Current site: <a href={ORIGINAL}>leadvillerailroad.com</a></span>
        <StudioCredit />
      </div>
    </footer>
  );
}

export default function App() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Board />
        <Route />
        <Rides />
        <Seats />
        <Reviews />
        <Story />
        <Dogs />
        <Know />
        <Groups />
        <Visit />
      </main>
      <Footer />
      <ConceptWidget company={COMPANY} abbr={ABBR} endDate={END_DATE} />
    </>
  );
}
