import { useState, useEffect, useRef } from "react";
import axios from "axios";
import {
  motion,
  AnimatePresence,
  useScroll,
  useTransform,
  useInView
} from "framer-motion";
import {
  ShieldCheck,
  Car,
  Waves,
  Activity,
  Clock,
  Menu,
  X,
  ChevronRight,
  Phone,
  MessageCircle,
  Award,
  Zap,
  CheckCircle2,
  AlertCircle,
  Globe,
  Mail,
  Copy,
  Layers,
  Home,
  Maximize2,
  ZoomIn,
  ZoomOut,
  RotateCcw,
  SportShoe,
  Baby,
  Dumbbell,
  Rose,
  WavesLadder
} from "lucide-react";
import "./App.css";

/* ----------------- Reusable components ----------------- */

const HeroSlideshow = ({ images }) => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % images.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [images.length]);

  return (
    <div className="absolute inset-0 z-0">
      <AnimatePresence mode="wait">
        <motion.div
          key={index}
          initial={{ opacity: 0, scale: 1.1 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 2, ease: "easeInOut" }}
          className="absolute inset-0"
        >
          <img
            src={images[index]}
            alt="Aquarise Hero"
            className="w-full h-full object-cover"
          />
        </motion.div>
      </AnimatePresence>
      <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/20 to-black" />
    </div>
  );
};

const FadeIn = ({ children, delay = 0, direction = "up", fullHeight = false }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-120px" });

  return (
    <motion.div
      ref={ref}
      initial={{
        opacity: 0,
        y: direction === "up" ? 40 : direction === "down" ? -40 : 0,
        x: direction === "left" ? 40 : direction === "right" ? -40 : 0
      }}
      animate={
        isInView
          ? {
            opacity: 1,
            y: 0,
            x: 0
          }
          : {}
      }
      transition={{
        duration: 0.9,
        delay,
        ease: [0.19, 0.51, 0.23, 0.99]
      }}
      className={fullHeight ? "h-full" : ""}
    >
      {children}
    </motion.div>
  );
};

const SectionHeading = ({ subtitle, title, light = false }) => (
  <div className="mb-16 text-center">
    <motion.p
      initial={{ opacity: 0, letterSpacing: "0.12em", y: 10 }}
      whileInView={{ opacity: 1, letterSpacing: "0.42em", y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.8 }}
      className={`text-[10px] uppercase font-light mb-4 ${light ? "text-orange-500/80" : "text-orange-500"
        }`}
    >
      {subtitle}
    </motion.p>
    <motion.h2
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.9 }}
      className="text-3xl md:text-5xl font-extralight tracking-tight text-white"
    >
      {title}
    </motion.h2>
  </div>
);

const Notification = ({ type, message, onClose }) => (
  <motion.div
    initial={{ opacity: 0, y: 40, scale: 0.9 }}
    animate={{ opacity: 1, y: 0, scale: 1 }}
    exit={{ opacity: 0, y: 20, scale: 0.95 }}
    transition={{ duration: 0.25 }}
    className={`fixed bottom-32 left-1/2 -translate-x-1/2 z-[100] px-8 py-4 rounded-2xl border backdrop-blur-2xl flex items-center gap-4 shadow-[0_0_40px_rgba(0,0,0,0.6)] min-w-[320px]
      ${type === "success"
        ? "bg-black/80 border-emerald-400/30 text-emerald-100"
        : "bg-black/80 border-red-500/40 text-red-200"
      }`}
  >
    {type === "success" ? (
      <CheckCircle2 className="text-emerald-300" size={24} />
    ) : (
      <AlertCircle className="text-red-400" size={24} />
    )}
    <p className="text-sm font-light tracking-wide">{message}</p>
    <button
      onClick={onClose}
      className="ml-auto hover:opacity-60 transition-opacity"
    >
      <X size={18} />
    </button>
  </motion.div>
);

const PhoneModal = ({ isOpen, onClose, phone }) => (
  <AnimatePresence>
    {isOpen && (
      <>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 z-[100] bg-black/80 backdrop-blur-md"
        />
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          transition={{ duration: 0.3, ease: [0.17, 0.67, 0.3, 0.99] }}
          className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-[101] w-[90%] max-w-md bg-black border border-orange-500/10 rounded-[40px] p-10 shadow-[0_0_120px_rgba(255,87,34,0.1)]"
        >
          <button
            onClick={onClose}
            className="absolute top-6 right-6 p-2 rounded-full hover:bg-orange-500/5 transition-colors"
          >
            <X size={24} className="text-white/40" />
          </button>
          <div className="flex flex-col items-center text-center">
            <div className="w-20 h-20 rounded-full bg-orange-500/5 flex items-center justify-center mb-8 border border-orange-500/10 shadow-[0_0_40px_rgba(255,87,34,0.08)]">
              <Phone size={32} className="text-orange-500" />
            </div>
            <p className="text-[10px] uppercase tracking-[0.4em] text-orange-500/40 mb-2">
              Direct Contact
            </p>
            <h3 className="text-3xl font-light text-white mb-8 tracking-tight">
              {phone}
            </h3>
            <div className="grid grid-cols-2 gap-4 w-full">
              <a
                href={`tel:${phone.replace(/\s/g, "")}`}
                className="flex items-center justify-center gap-3 py-4 bg-orange-500 text-white rounded-2xl text-xs uppercase tracking-[0.3em] font-bold hover:bg-orange-600 transition-all shadow-[0_0_20px_rgba(255,87,34,0.2)]"
              >
                <Phone size={16} /> Call
              </a>
              <button
                onClick={() => {
                  navigator.clipboard.writeText(phone);
                  alert("Copied!");
                }}
                className="flex items-center justify-center gap-3 py-4 bg-white/5 text-white border border-white/10 rounded-2xl text-xs uppercase tracking-[0.3em] font-bold hover:bg-white/10 transition-all"
              >
                <Copy size={16} /> Copy
              </button>
            </div>
          </div>
        </motion.div>
      </>
    )}
  </AnimatePresence>
);

/* -------- Legal modal (Terms & Privacy) -------- */

const LegalModal = ({ isOpen, onClose, title, children }) => (
  <AnimatePresence>
    {isOpen && (
      <>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.85 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 z-[100] bg-black/90 backdrop-blur-md"
        />
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 24 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 24 }}
          transition={{ duration: 0.3, ease: [0.17, 0.67, 0.3, 0.99] }}
          className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2
                     z-[101] w-[96%] max-w-3xl max-h-[90vh] overflow-y-auto
                     bg-black border border-white/12 rounded-[32px] p-8 md:p-10
                     shadow-[0_0_120px_rgba(0,0,0,0.95)] custom-scrollbar"
        >
          <button
            onClick={onClose}
            className="absolute top-6 right-6 p-2 rounded-full hover:bg-white/5 transition-colors"
          >
            <X size={22} className="text-white/60" />
          </button>

          <div className="space-y-6">
            <div>
              <p className="text-[10px] uppercase tracking-[0.32em] text-white/50 mb-2">
                Legal Information
              </p>
              <h2 className="text-2xl md:text-3xl font-light text-white tracking-tight">
                {title}
              </h2>
            </div>
            <div className="space-y-4 text-sm leading-relaxed text-white/80">
              {children}
            </div>
          </div>
        </motion.div>
      </>
    )}
  </AnimatePresence>
);

/* -------- Unit detail modal -------- */

/* -------- Category Plans Modal -------- */

const CategoryPlansModal = ({ isOpen, onClose, categoryData }) => {
  const [activeUnit, setActiveUnit] = useState(null);
  const [zoom, setZoom] = useState(1);

  useEffect(() => {
    if (categoryData?.items?.length > 0) {
      setActiveUnit(categoryData.items[0]);
      setZoom(1);
    }
  }, [categoryData]);

  useEffect(() => {
    setZoom(1);
  }, [activeUnit]);

  if (!categoryData) return null;

  const handleZoomIn = () => setZoom(prev => Math.min(prev + 0.25, 3));
  const handleZoomOut = () => setZoom(prev => Math.max(prev - 0.25, 0.5));
  const handleReset = () => setZoom(1);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.95 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-xl"
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.98, y: 20 }}
            transition={{ duration: 0.4, ease: [0.17, 0.67, 0.3, 0.99] }}
            className="fixed inset-4 md:inset-10 z-[101] bg-black border border-white/10 rounded-[40px] shadow-[0_0_200px_rgba(0,0,0,1)] overflow-hidden flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-8 py-6 border-b border-white/5 bg-white/[0.02]">
              <div>
                <p className="text-[10px] uppercase tracking-[0.4em] text-orange-500/50 mb-1">
                  Floor Plan Explorer
                </p>
                <h3 className="text-2xl md:text-3xl font-light text-white tracking-tight">
                  {categoryData.category} <span className="text-white/20 ml-2">Collection</span>
                </h3>
              </div>
              <button
                onClick={onClose}
                className="p-3 rounded-full hover:bg-white/5 transition-colors"
              >
                <X size={24} className="text-white/40" />
              </button>
            </div>

            <div className="flex-1 flex flex-col lg:flex-row overflow-hidden">
              {/* Sidebar: Plan Selection */}
              <div className="w-full lg:w-80 border-r border-white/5 flex flex-col bg-white/[0.01]">
                <div className="p-6 overflow-y-auto custom-scrollbar flex lg:flex-col gap-4">
                  {categoryData.items.map((unit, idx) => (
                    <button
                      key={idx}
                      onClick={() => setActiveUnit(unit)}
                      className={`flex-1 lg:flex-none p-4 rounded-2xl border transition-all text-left flex flex-col gap-2 group
                        ${activeUnit === unit 
                          ? "bg-orange-500/10 border-orange-500/40" 
                          : "bg-white/2 border-white/5 hover:border-white/20"}`}
                    >
                      <span className={`text-[10px] uppercase tracking-[0.2em] font-bold
                        ${activeUnit === unit ? "text-orange-500" : "text-white/40 group-hover:text-white/60"}`}>
                        Type {idx + 1 < 10 ? `0${idx + 1}` : idx + 1}
                      </span>
                      <div className="aspect-[4/3] rounded-lg bg-white/5 overflow-hidden p-2">
                        <img src={unit.image} alt="Thumbnail" className="w-full h-full object-contain" />
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Main: Active Plan View */}
              <div className="flex-1 flex flex-col overflow-hidden bg-black relative">
                {activeUnit && (
                  <>
                    {/* Zoom Controls Overlay */}
                    <div className="absolute top-6 left-1/2 -translate-x-1/2 z-10 flex items-center gap-3 bg-black/60 backdrop-blur-md border border-white/10 rounded-full px-4 py-1.5">
                      <button onClick={handleZoomOut} className="p-2 hover:text-orange-500 transition-colors">
                        <ZoomOut size={18} />
                      </button>
                      <span className="text-[10px] uppercase tracking-[0.1em] text-white/40 w-10 text-center font-mono">
                        {Math.round(zoom * 100)}%
                      </span>
                      <button onClick={handleZoomIn} className="p-2 hover:text-orange-500 transition-colors">
                        <ZoomIn size={18} />
                      </button>
                      <div className="w-px h-3 bg-white/10" />
                      <button onClick={handleReset} className="p-2 hover:text-orange-500 transition-colors">
                        <RotateCcw size={16} />
                      </button>
                    </div>

                    <div className="flex-1 overflow-auto custom-scrollbar flex items-center justify-center p-8 md:p-20">
                      <div 
                        className="transition-transform duration-300 ease-out origin-center"
                        style={{ transform: `scale(${zoom})` }}
                      >
                        <img
                          src={activeUnit.image}
                          alt="Detailed Plan"
                          className="max-w-full h-auto object-contain pointer-events-none drop-shadow-[0_0_50px_rgba(0,0,0,0.5)]"
                        />
                      </div>
                    </div>

                    {/* Footer CTA */}
                    <div className="p-8 border-t border-white/5 flex items-center justify-center bg-white/[0.01]">
                       <button
                        onClick={() => {
                          onClose();
                          const el = document.getElementById("inquiry");
                          if (el) el.scrollIntoView({ behavior: "smooth" });
                        }}
                        className="px-12 py-4 bg-orange-500 text-white rounded-2xl text-[11px] uppercase
                                   tracking-[0.32em] font-bold hover:bg-orange-600 transition-all
                                   shadow-[0_0_30px_rgba(255,87,34,0.25)]"
                      >
                        Register Interest
                      </button>
                    </div>
                  </>
                )}
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

/* -------- Collection detail modal with slider -------- */

const CollectionModal = ({ isOpen, onClose, collection }) => {
  if (!collection) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.9 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-[100] bg-black/90 backdrop-blur-md"
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 24 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 24 }}
            transition={{ duration: 0.35, ease: [0.17, 0.67, 0.3, 0.99] }}
            className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2
                       z-[101] w-[96%] max-w-2xl max-h-[92vh] overflow-y-auto
                       bg-black border border-white/12 rounded-[40px] p-8 md:p-10
                       shadow-[0_0_160px_rgba(0,0,0,1)] custom-scrollbar"
          >
            <button
              onClick={onClose}
              className="absolute top-7 right-7 p-2 rounded-full hover:bg-white/5 transition-colors z-50"
            >
              <X size={26} className="text-white/50" />
            </button>

            <div className="flex flex-col">
              <div className="mb-8">
                <p className="text-[11px] uppercase tracking-[0.4em] text-orange-500/50 mb-2">
                  {collection.tower}
                </p>
                <h3 className="text-3xl md:text-4xl font-light text-white tracking-tight leading-tight mb-2">
                  {collection.name}
                </h3>
                <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-orange-500/5 border border-orange-500/20 text-[11px] uppercase tracking-[0.26em] text-orange-500">
                  <span className="w-1.5 h-1.5 rounded-full bg-orange-500" />
                  {collection.highlight}
                </span>
              </div>

              <p className="text-[11px] uppercase tracking-[0.4em] text-orange-500/50 mb-4">
                Project Facts
              </p>

              <div className="grid grid-cols-2 gap-4 mb-6 text-sm">
                <div className="rounded-2xl bg-white/4 border border-white/15 p-4">
                  <p className="text-[10px] uppercase tracking-[0.28em] text-white/45 mb-1.5">
                    Property Type
                  </p>
                  <p className="text-sm md:text-base font-light text-white/95">
                    {collection.facts.type}
                  </p>
                </div>
                <div className="rounded-2xl bg-white/4 border border-white/15 p-4">
                  <p className="text-[10px] uppercase tracking-[0.28em] text-white/45 mb-1.5">
                    Plot Area
                  </p>
                  <p className="text-sm md:text-base font-light text-white/95">
                    {collection.facts.plot}
                  </p>
                </div>
                <div className="rounded-2xl bg-white/4 border border-orange-500/30 p-4">
                  <p className="text-[10px] uppercase tracking-[0.28em] text-orange-500/60 mb-1.5">
                    Total Units
                  </p>
                  <p className="text-2xl font-semibold text-white">
                    {collection.units}
                  </p>
                </div>
                <div className="rounded-2xl bg-white/4 border border-white/15 p-4">
                  <p className="text-[10px] uppercase tracking-[0.28em] text-white/45 mb-1.5">
                    Residential Floors
                  </p>
                  <p className="text-sm md:text-base font-medium text-white/95">
                    {collection.floors}
                  </p>
                </div>
              </div>

              <div className="mb-8">
                <p className="text-[10px] uppercase tracking-[0.3em] text-white/45 mb-2">
                  Architectural Composition
                </p>
                <p className="text-sm md:text-[15px] font-light text-white/80 leading-relaxed">
                  {collection.facts.levels}
                </p>
              </div>

              <div className="mb-8">
                <p className="text-[10px] uppercase tracking-[0.3em] text-orange-500/50 mb-3">
                  Unit Distribution
                </p>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {Object.entries(collection.facts.units).map(
                    ([key, val]) => {
                      const label = key
                        .replace("studio", "Studio")
                        .replace("bed1", "1 Bedroom")
                        .replace("bed2", "2 Bedroom")
                        .replace("bed3", "3 Bedroom")
                        .replace("bed4", "4 Bedroom")
                        .replace("bed5", "5 Bedroom")
                        .replace("shops", "Retail Shops");

                      return (
                        <div
                          key={key}
                          className="rounded-2xl bg-orange-500/5 border border-orange-500/16 px-3.5 py-3 flex flex-col gap-1"
                        >
                          <span className="text-[10px] uppercase tracking-[0.24em] text-orange-500/60">
                            {label}
                          </span>
                          <span className="text-xl font-semibold text-white">
                            {val}
                          </span>
                        </div>
                      );
                    }
                  )}
                </div>
              </div>

              <div className="mt-auto pt-4 flex flex-col sm:flex-row gap-4">
                <button
                  onClick={() => {
                    onClose();
                    const el = document.getElementById("inquiry");
                    if (el) el.scrollIntoView({ behavior: "smooth" });
                  }}
                  className="flex-1 py-4 bg-orange-500 text-white rounded-2xl text-[11px] uppercase
                             tracking-[0.32em] font-bold hover:bg-orange-600 transition-all
                             shadow-[0_0_30px_rgba(255,87,34,0.25)]"
                >
                  Register Interest
                </button>
                <button
                  onClick={onClose}
                  className="px-8 py-4 bg-white/5 border border-white/18 text-white rounded-2xl
                             text-[11px] uppercase tracking-[0.3em] font-medium hover:bg-white/10
                             transition-all"
                >
                  Close
                </button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

/* ----------------- Collections data ----------------- */

const mergedGallery = [
  `${import.meta.env.BASE_URL}aquarise-horizontal.avif`,
  `${import.meta.env.BASE_URL}bg1.avif`,
  `${import.meta.env.BASE_URL}bg2.avif`
  
];



/* ----------------- Units data ----------------- */

const unitTypes = [
 
  {
    category: "1 Bedroom",
    price: "Starting AED 2,000,000",
    size: "Starting 789 SQ FT *",
    items: [
      { type: "Type 01", image: `${import.meta.env.BASE_URL}1bedroom1.png` },
      { type: "Type 02", image: `${import.meta.env.BASE_URL}1bedroom2.png` },
      { type: "Type 03", image: `${import.meta.env.BASE_URL}1bedroom3.png` },
      { type: "Type 04", image: `${import.meta.env.BASE_URL}1bedroom4.png` },
      { type: "Type 05", image: `${import.meta.env.BASE_URL}1bedroom5.png` },
    ]
  },
  {
    category: "2 Bedroom",
    price: "Starting AED 2,909,999",
    size: "Starting 1090 SQ FT *",
    items: [
      { type: "Type 01", image: `${import.meta.env.BASE_URL}2bedroom1.png` },
      { type: "Type 02", image: `${import.meta.env.BASE_URL}2bedroom2.png` },
      { type: "Type 03", image: `${import.meta.env.BASE_URL}2bedroom3.png` },
      { type: "Type 04", image: `${import.meta.env.BASE_URL}2bedroom4.png` },
    ]
  }
];

/* ----------------- Main App ----------------- */

export default function App() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [phoneModalOpen, setPhoneModalOpen] = useState(false);
  const [selectedCollection, setSelectedCollection] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedUnit, setSelectedUnit] = useState(null);
  const [selectedUnitCategory, setSelectedUnitCategory] = useState("");
  const [notification, setNotification] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showTerms, setShowTerms] = useState(false);
  const [showPrivacy, setShowPrivacy] = useState(false);

  const { scrollYProgress } = useScroll();
  const heroOpacity = useTransform(scrollYProgress, [0, 0.05], [1, 0.85]);
  const heroScale = useTransform(scrollYProgress, [0, 0.05], [1, 1.05]);

  const contactInfo = {
    phone: "+34 625 76 60 08",
    whatsapp: "34625766008",
    email: "info@dprealestate.org",
    websites: ["www.dprealestate.org", "www.dprealestate.net"]
  };

  useEffect(() => {
    if (notification) {
      const timer = setTimeout(() => setNotification(null), 5000);
      return () => clearTimeout(timer);
    }
  }, [notification]);

  const amenities = [
    { icon: <WavesLadder size={20} />, label: "Pool Deck" },
    { icon: <SportShoe size={20} />, label: "Running Lane" },
    { icon: <Baby size={20} />, label: "Kids’ Play Area" },
    { icon: <Dumbbell size={20} />, label: "Gym& Fitness" },
    { icon: <Rose size={20} />, label: "Sky Garden" },
    { icon: <Waves size={20} />, label: "Artificial Beach" }
  ];

  const scrollToSection = id => {
    const element = document.getElementById(id);
    if (element) element.scrollIntoView({ behavior: "smooth" });
  };

  const heroImages = [
    `${import.meta.env.BASE_URL}aquarise-horizontal.avif`,
  `${import.meta.env.BASE_URL}bg1.avif`,
  `${import.meta.env.BASE_URL}bg2.avif`
  ];

  return (
    <div className="bg-black text-white font-sans selection:bg-orange-500 selection:text-white">
      <AnimatePresence>
        {notification && (
          <Notification
            type={notification.type}
            message={notification.message}
            onClose={() => setNotification(null)}
          />
        )}
      </AnimatePresence>

      <PhoneModal
        isOpen={phoneModalOpen}
        onClose={() => setPhoneModalOpen(false)}
        phone={contactInfo.phone}
      />

      <CollectionModal
        isOpen={!!selectedCollection}
        onClose={() => setSelectedCollection(null)}
        collection={selectedCollection}
      />

      <CategoryPlansModal
        isOpen={!!selectedCategory}
        onClose={() => setSelectedCategory(null)}
        categoryData={selectedCategory}
      />

      {/* Legal modals */}
      <LegalModal
        isOpen={showTerms}
        onClose={() => setShowTerms(false)}
        title="Terms of Service"
      >
        <p>
          These Terms of Service govern your use of this website and any services
          provided through it. By accessing or using the site, you agree to be
          bound by these terms in full.
        </p>
        <h3 className="text-sm font-semibold text-white mt-4">1. Provider details</h3>
        <p>
          This website is operated by Aquarise (the “Company”, “we”, “us”
          or “our”), established in the United Arab Emirates. Our contact details are
          set out in the “Contact” section of this site.
        </p>
        <h3 className="text-sm font-semibold text-white mt-4">2. Use of the website</h3>
        <p>
          The website is provided for information purposes only. You may not use
          the site in any way that is unlawful, fraudulent, or likely to harm us,
          our partners, or other users.
        </p>
        <h3 className="text-sm font-semibold text-white mt-4">
          3. No offer, no advice
        </h3>
        <p>
          The content of this website does not constitute an offer, solicitation,
          or recommendation to buy or sell any property or financial product.
          Nothing on this site constitutes legal, tax, or investment advice.
        </p>
        <h3 className="text-sm font-semibold text-white mt-4">4. User submissions</h3>
        <p>
          When you submit information via forms, you confirm that all information
          is accurate and that you are authorised to provide it. You must not
          submit any content that is unlawful, offensive, or infringes
          third‑party rights.
        </p>
        <h3 className="text-sm font-semibold text-white mt-4">5. Intellectual property</h3>
        <p>
          All content on this website, including text, images, logos, and
          layouts, is protected by copyright and other intellectual property
          rights. You may view this content for personal use only. Any other use
          requires our prior written consent, unless permitted by mandatory law.
        </p>
        <h3 className="text-sm font-semibold text-white mt-4">6. Third‑party links</h3>
        <p>
          The site may contain links to third‑party websites. We have no control
          over and assume no responsibility for the content, privacy policies, or
          practices of third‑party websites.
        </p>
        <h3 className="text-sm font-semibold text-white mt-4">7. Liability</h3>
        <p>
          We take reasonable care to ensure that the information on this website
          is accurate and up to date. However, the site is provided “as is” and
          we make no warranties, express or implied, regarding its accuracy,
          completeness, or availability.
        </p>
        <p>
          To the maximum extent permitted by applicable law, we shall not be
          liable for any indirect, incidental, or consequential damages arising
          out of your use of, or inability to use, this website. Nothing in these
          terms excludes or limits liability where such exclusion or limitation
          would be unlawful under EU or local mandatory law.
        </p>
        <h3 className="text-sm font-semibold text-white mt-4">
          8. Data protection and privacy
        </h3>
        <p>
          We process personal data in accordance with the EU General Data
          Protection Regulation (GDPR) and applicable local laws. Details of how
          we collect and use personal data are set out in our Privacy Policy.
        </p>
        <h3 className="text-sm font-semibold text-white mt-4">
          9. Changes to the website and terms
        </h3>
        <p>
          We may update, suspend, or discontinue any part of the website at any
          time. We may also amend these Terms of Service from time to time. The
          version published on this site at the time of your visit applies.
        </p>
        <h3 className="text-sm font-semibold text-white mt-4">10. Governing law</h3>
        <p>
          These Terms of Service are governed by the laws of the Member State in
          which the Company is established, without prejudice to any mandatory
          consumer protection rules that apply in your country of residence
          within the European Economic Area.
        </p>
        <h3 className="text-sm font-semibold text-white mt-4">11. Contact</h3>
        <p>
          If you have any questions about these Terms of Service, please contact
          us using the details provided in the “Contact” section of this
          website.
        </p>
      </LegalModal>

      <LegalModal
        isOpen={showPrivacy}
        onClose={() => setShowPrivacy(false)}
        title="Privacy Policy"
      >
        <p>
          This Privacy Policy explains how we collect and use personal data when
          you visit this website or contact us. We process personal data in
          accordance with the EU General Data Protection Regulation (GDPR) and
          applicable local data protection laws.
        </p>
        <h3 className="text-sm font-semibold text-white mt-4">1. Controller</h3>
        <p>
          The controller responsible for processing your personal data is Aquarise
          (the “Company”, “we”, “us” or “our”). Our contact details
          are available in the “Contact” section of this site.
        </p>
        <h3 className="text-sm font-semibold text-white mt-4">
          2. Personal data we collect
        </h3>
        <p>We may process the following categories of personal data:</p>
        <ul className="list-disc list-inside text-white/80 text-sm space-y-1">
          <li>
            Identification and contact details (such as name, email address,
            phone number) when you submit an enquiry form or contact us
            directly.
          </li>
          <li>Communication data (content of messages and correspondence).</li>
          <li>
            Technical and usage data (such as IP address, browser type, device
            information, pages viewed and interaction data), collected via
            cookies or similar technologies.
          </li>
        </ul>
        <h3 className="text-sm font-semibold text-white mt-4">
          3. Purposes and legal bases
        </h3>
        <p>We process personal data for the following purposes:</p>
        <ul className="list-disc list-inside text-white/80 text-sm space-y-1">
          <li>
            To respond to your enquiries and provide information about our
            projects and services (Art. 6(1)(b) or 6(1)(f) GDPR).
          </li>
          <li>
            To manage our relationship with you and maintain our records
            (Art. 6(1)(f) GDPR).
          </li>
          <li>
            To improve the website, ensure security, and compile statistics on
            usage (Art. 6(1)(f) GDPR).
          </li>
          <li>
            Where required, to send you marketing communications with your
            consent (Art. 6(1)(a) GDPR). You may withdraw consent at any time.
          </li>
        </ul>
        <h3 className="text-sm font-semibold text-white mt-4">
          4. Cookies and similar technologies
        </h3>
        <p>
          We may use cookies and similar technologies to operate the site,
          analyse usage, and remember your preferences. Where required by law, we
          will ask for your consent before setting non‑essential cookies. You can
          manage your cookie preferences via your browser settings or any cookie
          banner we provide.
        </p>
        <h3 className="text-sm font-semibold text-white mt-4">
          5. Recipients and transfers
        </h3>
        <p>
          We may share personal data with service providers that assist us in
          operating the website, managing enquiries, or providing IT services.
          These providers act as processors and are bound by contractual
          obligations to protect your data.
        </p>
        <p>
          Where data is transferred outside the European Economic Area, we will
          ensure appropriate safeguards are in place, such as standard
          contractual clauses approved by the European Commission, unless an
          adequacy decision or another lawful transfer mechanism applies.
        </p>
        <h3 className="text-sm font-semibold text-white mt-4">
          6. Retention period
        </h3>
        <p>
          We retain personal data only for as long as necessary for the purposes
          for which it was collected, or as required by applicable law. Enquiry
          data is generally kept for the duration of our correspondence and a
          reasonable period afterwards to handle follow‑up questions or legal
          claims.
        </p>
        <h3 className="text-sm font-semibold text-white mt-4">
          7. Your rights under GDPR
        </h3>
        <p>Subject to legal conditions, you have the following rights:</p>
        <ul className="list-disc list-inside text-white/80 text-sm space-y-1">
          <li>Right of access to your personal data.</li>
          <li>Right to rectification of inaccurate or incomplete data.</li>
          <li>Right to erasure (“right to be forgotten”).</li>
          <li>Right to restriction of processing.</li>
          <li>Right to data portability.</li>
          <li>
            Right to object to processing based on our legitimate interests or
            for direct marketing.
          </li>
          <li>
            Where processing is based on consent, the right to withdraw consent
            at any time, without affecting the lawfulness of processing before
            withdrawal.
          </li>
        </ul>
        <p>
          To exercise your rights, please contact us using the details in the
          “Contact” section of this website. You also have the right to lodge a
          complaint with your local data protection authority.
        </p>
        <h3 className="text-sm font-semibold text-white mt-4">
          8. Security of your data
        </h3>
        <p>
          We take appropriate technical and organisational measures to protect
          personal data against unauthorised access, loss, alteration, or
          disclosure. However, no online system can be completely secure, and we
          cannot guarantee absolute security.
        </p>
        <h3 className="text-sm font-semibold text-white mt-4">
          9. Changes to this Privacy Policy
        </h3>
        <p>
          We may update this Privacy Policy from time to time, for example to
          reflect legal changes or new processing activities. The latest version
          will always be available on this website and will apply from the date
          of publication.
        </p>
        <h3 className="text-sm font-semibold text-white mt-4">10. Contact</h3>
        <p>
          If you have any questions about this Privacy Policy or our
          data‑protection practices, please contact us using the details
          provided in the “Contact” section of this website.
        </p>
      </LegalModal>

      {/* Navigation */}
      <motion.nav
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, ease: [0.19, 0.51, 0.23, 0.99] }}
        className="fixed top-0 w-full z-50 bg-black/60 backdrop-blur-xl border-b border-white/10"
      >
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <motion.div
              initial={{ rotate: -180, opacity: 0, scale: 0.8 }}
              animate={{ rotate: 0, opacity: 1, scale: 1 }}
              transition={{ duration: 1 }}
              className="w-12 h-12 border border-orange-500/30 rounded-full flex items-center justify-center shadow-[0_0_20px_rgba(255,87,34,0.2)] overflow-hidden bg-white/5"
            >
              <img
                src={`${import.meta.env.BASE_URL}logo.jpg`}
                alt="Logo"
                className="w-full h-full object-cover"
              />
            </motion.div>
            <div className="flex flex-col">
              <span className="text-sm md:text-xl font-semibold tracking-[0.35em] uppercase">
                DP REAL ESTATE
              </span>
              <span className="text-[10px] tracking-[0.35em] uppercase text-orange-500">
                Aquarise | Business Bay
              </span>
            </div>
          </div>
          <div className="hidden md:flex items-center gap-10">
            {["Overview",  "Units", "Amenities", "Location"].map(item => (
              <button
                key={item}
                onClick={() => scrollToSection(item.toLowerCase())}
                className="text-[11px] uppercase tracking-[0.3em] font-medium text-white/60 hover:text-orange-500 transition-colors"
              >
                {item}
              </button>
            ))}
            <button
              onClick={() => scrollToSection("inquiry")}
              className="px-6 py-2.5 bg-orange-500 text-white text-[11px] uppercase tracking-[0.35em] font-bold rounded-full hover:bg-orange-600 transition-all shadow-[0_0_25px_rgba(255,87,34,0.35)]"
            >
              Register Interest
            </button>
          </div>
          <button
            className="md:hidden text-white"
            onClick={() => setMobileMenuOpen(true)}
          >
            <Menu size={24} />
          </button>
        </div>
      </motion.nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileMenuOpen(false)}
              className="fixed inset-0 z-40 bg-black/80 backdrop-blur-sm"
            />
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="fixed top-0 right-0 bottom-0 z-50 w-64 bg-black border-l border-white/10 p-6 flex flex-col gap-6"
            >
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs tracking-[0.3em] uppercase text-white/50">
                  Menu
                </span>
                <button onClick={() => setMobileMenuOpen(false)}>
                  <X size={22} />
                </button>
              </div>
              {["Overview", "Towers", "Units", "Amenities", "Location", "inquiry"].map(
                item => (
                  <button
                    key={item}
                    onClick={() => {
                      scrollToSection(item.toLowerCase());
                      setMobileMenuOpen(false);
                    }}
                    className="text-sm text-left uppercase tracking-[0.25em] text-white/70 hover:text-orange-500 py-2"
                  >
                    {item === "inquiry" ? "Register Interest" : item}
                  </button>
                )
              )}
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Hero */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <motion.div
          style={{ scale: heroScale, opacity: heroOpacity }}
          className="absolute inset-0 z-0"
        >
          <HeroSlideshow images={heroImages} />
        </motion.div>
        <div className="relative z-10 text-center px-6">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="text-xs md:text-sm uppercase tracking-[0.5em] text-orange-400 mb-6 drop-shadow-[0_0_16px_rgba(255,87,34,0.35)]"
          >
            The Shape of Mastery
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 1 }}
            className="text-5xl md:text-8xl font-extralight tracking-tight mb-8"
          >
            <span className="text-orange-500 italic">AQUARISE</span>
          </motion.h1>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2 }}
            className="flex flex-col md:flex-row items-center justify-center gap-6"
          >
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => scrollToSection("overview")}
              className="px-10 py-4 bg-orange-500 text-white text-xs uppercase tracking-[0.35em] font-bold rounded-full shadow-[0_0_30px_rgba(255,87,34,0.35)]"
            >
              Experience Now
            </motion.button>
            <div className="flex items-center gap-4 text-white/60">
              <div className="h-px w-12 bg-orange-500/30" />
              <span className="text-[10px] uppercase tracking-[0.35em]">
                Business Bay | Dubai
              </span>
              <div className="h-px w-12 bg-orange-500/30" />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Overview */}
      <section id="overview" className="py-32 px-6 max-w-7xl mx-auto space-y-16">
        <div className="grid lg:grid-cols-2 gap-20 items-center">
          <FadeIn direction="right">
            <div className="relative aspect-[4/5] rounded-3xl overflow-hidden group shadow-[0_0_60px_rgba(0,0,0,0.9)] border border-orange-500/15 bg-gradient-to-br from-orange-500/5 to-black">
              <div className="absolute inset-0 bg-orange-500/5 group-hover:bg-transparent transition-colors duration-700" />
              <motion.img
                initial={{ scale: 1.05 }}
                whileHover={{ scale: 1.12 }}
                transition={{
                  duration: 1.2,
                  ease: [0.19, 0.51, 0.23, 0.99]
                }}
                src={`${import.meta.env.BASE_URL}hero.png`}
                alt="Aquarise Vision"
                className="w-full h-full object-cover"
              />
            </div>
          </FadeIn>
          <div>
            <FadeIn delay={0.2}>
              <p className="text-[10px] uppercase tracking-[0.4em] text-orange-500 mb-6 font-medium">
                The Shape of Mastery
              </p>
              <h2 className="text-4xl md:text-6xl font-extralight mb-8 leading-tight">
                Shaped by <br />
                <span className="text-orange-500/40 italic">Water.</span>
              </h2>
              <div className="space-y-6 text-gray-300 text-lg font-light leading-relaxed">
                <p>
                  Rising along the Dubai Water Canal in Business Bay, Aquarise draws
                  its form from the fluid movement of water. Curving façades and
                  flowing structural lines give the tower a distinctive presence on
                  the Dubai skyline.
                </p>
                <p>
                  Reflective surfaces catch the sunlight by day and mirror the city
                  lights by night, while interiors of polished marble, travertine,
                  natural oak and brushed brass create a calm, refined sanctuary —
                  a futuristic vision of movement, energy and innovation.
                </p>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      
      {/* Units */}
      <section id="units" className="py-32 bg-black">
        <div className="max-w-7xl mx-auto px-6">
          <SectionHeading
            subtitle="The Units"
            title="Premium Collection"
          />

          <FadeIn>
            <p className="max-w-3xl mx-auto -mt-8 mb-16 text-center text-gray-400 font-light leading-relaxed">
              Inspired by the sinuous curves of water, the Aquarise façade is a
              testament to fluidity. A dance of glass and light, reflecting the
              ever-changing hues of the Dubai sky — an ode to a visionary design
              where architecture becomes art.
            </p>
          </FadeIn>

          <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
            {unitTypes.map((category, idx) => (
              <FadeIn key={category.category} delay={idx * 0.1}>
                <motion.div
                  whileHover={{ y: -5 }}
                  onClick={() => setSelectedCategory(category)}
                  className="group relative bg-white/[0.02] border border-white/10 rounded-[40px] p-10 text-center cursor-pointer hover:border-orange-500/40 hover:bg-orange-500/[0.02] transition-all duration-500"
                >
                  <div className="mb-8 flex justify-center">
                    <div className="w-20 h-20 rounded-full bg-orange-500/5 border border-orange-500/10 flex items-center justify-center group-hover:scale-110 group-hover:shadow-[0_0_40px_rgba(255,87,34,0.15)] transition-all duration-500">
                      <Home size={32} className="text-orange-500" />
                    </div>
                  </div>
                  <h3 className="text-2xl font-light text-white tracking-[0.25em] uppercase mb-4">
                    {category.category}
                  </h3>
                  {category.price && (
                    <div className="mb-8 space-y-1.5">
                      <p className="text-lg font-light text-orange-500">
                        {category.price}
                      </p>
                      <p className="text-[10px] uppercase tracking-[0.3em] text-white/40">
                        {category.size}
                      </p>
                    </div>
                  )}
                  <div className="flex flex-col items-center gap-4">
                    <div className="h-px w-12 bg-orange-500/30 group-hover:w-20 transition-all duration-500" />
                    <button className="px-8 py-3.5 rounded-full bg-orange-500/10 border border-orange-500/20 text-[10px] uppercase tracking-[0.3em] font-bold text-orange-500 group-hover:bg-orange-500 group-hover:text-white transition-all">
                      Explore Plans
                    </button>
                  </div>
                </motion.div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Amenities */}
      <section id="amenities" className="py-32 px-6">
        <div className="max-w-7xl mx-auto">
          <SectionHeading
            subtitle="Resort-Style Living"
            title="Engineered for Mastery"
          />
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {amenities.map((item, idx) => (
              <FadeIn key={idx} delay={idx * 0.05}>
                <motion.div
                  whileHover={{ y: -4 }}
                  className="flex flex-col items-center gap-4 p-8 rounded-3xl border border-white/5 bg-white/[0.03] hover:bg-orange-500/10 hover:shadow-[0_0_20px_rgba(255,87,34,0.05)] transition-all text-center group"
                >
                  <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center text-white/80 group-hover:scale-110 transition-transform group-hover:text-orange-500">
                    {item.icon}
                  </div>
                  <span className="text-[10px] uppercase tracking-[0.3em] font-medium text-white/60 leading-tight">
                    {item.label}
                  </span>
                </motion.div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Location */}
      <section id="location" className="py-32 px-6 bg-black relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/3 h-full bg-orange-500/[0.03] -skew-x-12 translate-x-1/2 blur-3xl" />
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="grid lg:grid-cols-2 gap-20 items-center">
            <div>
              <FadeIn>
                <p className="text-[10px] uppercase tracking-[0.4em] text-orange-500 mb-6 font-medium">
                    Business Bay Community
                </p>
                <h2 className="text-4xl md:text-5xl font-extralight mb-8 leading-tight">
                  At the Heart of <br />
                  <span className="text-orange-500/40">Water and Skyline</span>
                </h2>
                <p className="text-gray-400 text-lg font-light leading-relaxed mb-10">
                  Set directly along the Dubai Water Canal in Business Bay, Aquarise
                  places you at the center of the city. With Sheikh Zayed Road, Al Khail
                  Road and Business Bay Metro Station at your doorstep, Downtown Dubai
                  and DIFC are moments away.
                </p>
                <div className="grid grid-cols-2 gap-8">
                  {[
                    {
                      time: "5 Minutes",
                      place: "Burj Khalifa & Dubai Mall"
                    },
                    {
                      time: "10 Minutes",
                      place: "DIFC"
                    },
                    { time: "15 Minutes", place: "Palm Jumeirah" },
                    { time: "16 Minutes", place: "Dubai Intl Airport" }
                  ].map((loc, idx) => (
                    <div
                      key={idx}
                      className="space-y-1 p-4 rounded-2xl bg-white/[0.03] border border-white/5 hover:border-orange-500/20 transition-colors"
                    >
                      <div className="flex items-center gap-2 text-orange-500/60">
                        <Clock size={14} />{" "}
                        <span className="text-[10px] uppercase tracking-[0.28em]">
                          {loc.time}
                        </span>
                      </div>
                      <p className="text-sm font-medium">{loc.place}</p>
                    </div>
                  ))}
                </div>
              </FadeIn>
            </div>
            <FadeIn delay={0.3}>
              <div className="relative h-[500px] rounded-3xl overflow-hidden border border-white/10 shadow-[0_0_60px_rgba(255,87,34,0.05)]">
                <iframe
                  title="Location"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3610.795410207513!2d55.2727223!3d25.1763851!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e5f69007339d6cd%3A0x30d49df804322c3!2sBinghatti%20Aquarise!5e0!3m2!1sen!2ses!4v1782394218231!5m2!1sen!2ses"
                  className="w-full h-full border-0 grayscale invert opacity-80"
                  loading="lazy"
                />
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Inquiry */}
      <section id="inquiry" className="py-32 px-6 relative overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            className="w-full h-full object-cover opacity-20 grayscale"
            src={`${import.meta.env.BASE_URL}bg9.jpg`}
            alt="Aquarise Interior"
          />
          <div className="absolute inset-0 bg-black/60" />
        </div>

        <div className="max-w-4xl mx-auto bg-white/5 border border-orange-500/10 rounded-[40px] p-8 md:p-16 relative z-10 overflow-hidden shadow-[0_0_100px_rgba(255,87,34,0.03)] backdrop-blur-sm">
          <div className="relative z-10">
            <SectionHeading
              subtitle="Secure Your Place"
              title="Inquire for Mastery"
              light
            />
            <form
              className="grid md:grid-cols-2 gap-6"
              onSubmit={async e => {
                e.preventDefault();
                setIsSubmitting(true);

                const payload = Object.fromEntries(new FormData(e.target));

                try {
                  const response = await axios.post(
                    `${import.meta.env.BASE_URL}api/lead.php`,
                    payload,
                    {
                      headers: {
                        "Content-Type": "application/json"
                      }
                    }
                  );

                  setNotification({
                    type: "success",
                    message:
                      response.data?.message || "Registered successfully."
                  });

                  e.target.reset();
                } catch (err) {
                  console.error(err);

                  setNotification({
                    type: "error",
                    message:
                      err.response?.data?.message ||
                      "Server error. Please try again."
                  });
                } finally {
                  setIsSubmitting(false);
                }
              }}
            >
              <div className="space-y-1">
                <label className="text-[10px] uppercase tracking-[0.3em] text-orange-500/40 ml-1">
                  Full Name
                </label>
                <input
                  required
                  name="name"
                  className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 outline-none focus:border-orange-500/40 transition-colors"
                  placeholder="Your Name"
                />
              </div>
              <div className="space-y-1">
                <label className="text-[10px] uppercase tracking-[0.3em] text-orange-500/40 ml-1">
                  Email Address
                </label>
                <input
                  required
                  name="email"
                  type="email"
                  className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 outline-none focus:border-orange-500/40 transition-colors"
                  placeholder={contactInfo.email}
                />
              </div>
              <div className="space-y-1">
                <label className="text-[10px] uppercase tracking-[0.3em] text-orange-500/40 ml-1">
                  Phone
                </label>
                <input
                  name="phone"
                  className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 outline-none focus:border-orange-500/40 transition-colors"
                  placeholder={contactInfo.phone}
                />
              </div>
              <div className="space-y-1">
                <label className="text-[10px] uppercase tracking-[0.3em] text-orange-500/40 ml-1">
                  Preferred Unit
                </label>
                <select
                  name="unit"
                  className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 outline-none focus:border-orange-500/40 appearance-none"
                >
                  <option className="bg-black">Studio</option>
                  <option className="bg-black">1 Bedroom</option>
                  <option className="bg-black">2 Bedroom</option>
                </select>
              </div>
              <div className="md:col-span-2 space-y-1">
                <label className="text-[10px] uppercase tracking-[0.3em] text-orange-500/40 ml-1">
                  Message
                </label>
                <textarea
                  rows="4"
                  name="message"
                  className="w-full bg-white/5 border border-white/10 rounded-3xl px-6 py-4 outline-none focus:border-orange-500/40 resize-none"
                  placeholder="How can we assist you?"
                />
              </div>
              <button
                disabled={isSubmitting}
                className="md:col-span-2 mt-4 py-5 bg-orange-500 text-white text-xs uppercase tracking-[0.4em] font-bold rounded-full hover:scale-[1.02] active:scale-95 transition-all shadow-[0_0_30px_rgba(255,87,34,0.15)] disabled:opacity-50"
              >
                {isSubmitting ? "Processing..." : "Submit Interest"}
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-20 border-t border-white/10">
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-3 gap-12 items-start">
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 border border-orange-500/20 rounded-full flex items-center justify-center overflow-hidden">
                <img
                  src={`${import.meta.env.BASE_URL}logo.jpg`}
                  alt="Logo"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex flex-col">
                <span className="text-sm font-semibold tracking-[0.35em] uppercase leading-none mb-1">
                  DP REAL ESTATE
                </span>
                <span className="text-[9px] font-medium tracking-[0.3em] uppercase text-orange-500/60 leading-none">
                  AQUARISE | Business Bay
                </span>
              </div>
            </div>
            <p className="text-gray-500 text-sm max-w-sm font-light">
              Like a wave, it rises. Aquarise brings superlative waterfront living
              to Business Bay — a shimmering, wave-inspired tower on the Dubai
              Water Canal, designed around the gentle pull of life.
            </p>
            <div className="flex flex-col gap-3 text-sm text-white/60">
              <div className="flex items-center gap-3">
                <Mail size={16} /> <span>{contactInfo.email}</span>
              </div>
              <div className="flex items-center gap-3">
                <Phone size={16} /> <span>{contactInfo.phone}</span>
              </div>
            </div>
            <div className="flex gap-4">
              <button
                onClick={() => setPhoneModalOpen(true)}
                className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-orange-500/10 transition-colors text-white/60 hover:text-orange-500"
              >
                <Phone size={18} />
              </button>
              <a
                href={`https://wa.me/${contactInfo.whatsapp}`}
                target="_blank"
                rel="noreferrer"
                className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-orange-500/10 transition-colors text-white/60 hover:text-orange-500"
              >
                <MessageCircle size={18} />
              </a>
            </div>
          </div>

          <div className="md:ml-auto">
            <h4 className="text-[10px] uppercase tracking-[0.3em] text-white/80 mb-6">
              Official Links
            </h4>
            <ul className="space-y-3 text-sm text-gray-500 font-light">
              {contactInfo.websites.map(site => (
                <li key={site}>
                  <a
                    href={`https://${site}`}
                    target="_blank"
                    rel="noreferrer"
                    className="hover:text-orange-500 flex items-center gap-2 transition-colors"
                  >
                    <Globe size={14} /> {site}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="md:ml-auto flex flex-col gap-6 text-right">
            <div className="flex flex-col gap-2">
              <span className="text-[10px] uppercase tracking-[0.4em] text-orange-500/40">
                Location
              </span>
              <span className="text-sm font-light text-white/80">
                Business Bay, Dubai
              </span>
            </div>
            <button
              onClick={() => scrollToSection("inquiry")}
              className="px-8 py-3 bg-white/5 border border-orange-500/10 text-white text-[10px] uppercase tracking-[0.3em] font-bold rounded-full hover:bg-orange-500/10 transition-all"
            >
              Register Interest
            </button>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-6 mt-20 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between gap-6 text-[10px] uppercase tracking-[0.2em] text-gray-600">
          <span>© 2026 DP Real Estate. All rights reserved.</span>
          <div className="flex gap-8">
            <button
              onClick={() => setShowPrivacy(true)}
              className="hover:text-orange-500 cursor-pointer transition-colors"
            >
              Privacy Policy
            </button>
            <button
              onClick={() => setShowTerms(true)}
              className="hover:text-orange-500 cursor-pointer transition-colors"
            >
              Terms of Service
            </button>
          </div>
        </div>
      </footer>

      {/* Fixed contact icons */}
      <div className="fixed bottom-10 right-10 z-40 flex flex-col gap-4">
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => setPhoneModalOpen(true)}
          className="w-14 h-14 bg-white text-black rounded-full flex items-center justify-center shadow-2xl"
        >
          <Phone size={24} />
        </motion.button>
        <motion.a
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          href={`https://wa.me/${contactInfo.whatsapp}`}
          target="_blank"
          rel="noreferrer"
          className="w-14 h-14 bg-[#25D366] text-white rounded-full flex items-center justify-center shadow-2xl"
        >
          <MessageCircle size={24} />
        </motion.a>
      </div>
    </div>
  );
}