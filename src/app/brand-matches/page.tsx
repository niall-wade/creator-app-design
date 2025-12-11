"use client";

import { useState } from "react";
import { motion, AnimatePresence, useMotionValue, useTransform, PanInfo } from "framer-motion";
import Link from "next/link";

interface Brand {
  id: number;
  name: string;
  category: string;
  logo: string;
  logoBg: string;
  email: string;
  contactEmail: string;
  matchScore: number;
  description: string;
  followers?: string;
  engagement?: string;
}

const initialBrands: Brand[] = [
  {
    id: 1,
    name: "Glossier",
    category: "Beauty",
    logo: "G",
    logoBg: "bg-gradient-to-br from-pink-200 to-pink-400",
    email: "Hi Sarah,\n\nLove what Glossier is doing with clean beauty! I've been using your Cloud Paint for years and my audience always asks about it.\n\nWould love to explore a partnership for my upcoming skincare series.\n\nBest,\n[Your name]",
    contactEmail: "partnerships@glossier.com",
    matchScore: 95,
    description: "Clean beauty brand known for minimalist skincare and makeup products.",
    followers: "2.8M",
    engagement: "4.2%",
  },
  {
    id: 2,
    name: "Athletic Greens",
    category: "Wellness",
    logo: "AG",
    logoBg: "bg-gradient-to-br from-green-400 to-green-600",
    email: "Hey AG Team,\n\nI've been incorporating AG1 into my morning routine and my community has been asking about it non-stop.\n\nWould love to discuss a collaboration that feels authentic to my wellness content.\n\nCheers,\n[Your name]",
    contactEmail: "influencers@athleticgreens.com",
    matchScore: 92,
    description: "Premium daily nutrition supplement for health-conscious consumers.",
    followers: "1.2M",
    engagement: "3.8%",
  },
  {
    id: 3,
    name: "Allbirds",
    category: "Fashion",
    logo: "A",
    logoBg: "bg-gradient-to-br from-emerald-400 to-teal-600",
    email: "Hi Team,\n\nAs someone passionate about sustainable fashion, I've been a huge fan of Allbirds' mission.\n\nI'd love to feature your new collection in my sustainability-focused content this month.\n\nLooking forward to connecting!\n\n[Your name]",
    contactEmail: "creators@allbirds.com",
    matchScore: 89,
    description: "Sustainable footwear brand focused on eco-friendly materials.",
    followers: "890K",
    engagement: "2.9%",
  },
  {
    id: 4,
    name: "Notion",
    category: "Tech",
    logo: "N",
    logoBg: "bg-gradient-to-br from-gray-700 to-gray-900",
    email: "Hi Notion Team,\n\nAs a creator, Notion has transformed how I organize my content calendar and brand partnerships.\n\nI'd love to create a \"Creator's Workspace\" template and share how I use Notion with my audience.\n\nBest,\n[Your name]",
    contactEmail: "creators@notion.so",
    matchScore: 87,
    description: "All-in-one workspace for notes, docs, and project management.",
    followers: "3.5M",
    engagement: "5.1%",
  },
  {
    id: 5,
    name: "Oura",
    category: "Health Tech",
    logo: "O",
    logoBg: "bg-gradient-to-br from-indigo-500 to-purple-700",
    email: "Hi there,\n\nI've been tracking my sleep with Oura Ring and the insights have been game-changing for my productivity content.\n\nWould love to share my experience with my health-conscious audience.\n\nWarm regards,\n[Your name]",
    contactEmail: "partnerships@ouraring.com",
    matchScore: 85,
    description: "Smart ring for sleep and activity tracking with health insights.",
    followers: "650K",
    engagement: "4.5%",
  },
  {
    id: 6,
    name: "Gymshark",
    category: "Fitness",
    logo: "GS",
    logoBg: "bg-gradient-to-br from-blue-500 to-blue-700",
    email: "Hey Gymshark Team,\n\nI've been wearing Gymshark for my workout content and my followers constantly ask where my gear is from.\n\nWould love to partner on showcasing the new collection!\n\nBest,\n[Your name]",
    contactEmail: "creators@gymshark.com",
    matchScore: 91,
    description: "Fitness apparel and accessories brand with strong creator community.",
    followers: "6.2M",
    engagement: "3.2%",
  },
  {
    id: 7,
    name: "Ritual",
    category: "Wellness",
    logo: "R",
    logoBg: "bg-gradient-to-br from-yellow-400 to-amber-500",
    email: "Hi Ritual Team,\n\nI'm passionate about transparent wellness brands, and Ritual's approach to vitamins really resonates with me.\n\nLet's chat about a potential collaboration!\n\nWarm regards,\n[Your name]",
    contactEmail: "partnerships@ritual.com",
    matchScore: 88,
    description: "Traceable, science-backed daily vitamins and supplements.",
    followers: "420K",
    engagement: "4.8%",
  },
  {
    id: 8,
    name: "Away",
    category: "Travel",
    logo: "AW",
    logoBg: "bg-gradient-to-br from-sky-400 to-cyan-600",
    email: "Hi Away Team,\n\nAs a creator who travels frequently, I've been eyeing your luggage for my upcoming content series.\n\nWould love to explore a partnership!\n\nBest,\n[Your name]",
    contactEmail: "influencers@awaytravel.com",
    matchScore: 83,
    description: "Modern travel brand with premium luggage and accessories.",
    followers: "780K",
    engagement: "3.5%",
  },
];

export default function BrandMatchesPage() {
  const [currentIndex, setCurrentIndex] = useState(initialBrands.length - 1);
  const [swipedBrands, setSwipedBrands] = useState<{ brand: Brand; direction: "left" | "right" }[]>([]);
  const [showProfileMenu, setShowProfileMenu] = useState(false);

  const currentBrand = initialBrands[currentIndex];

  const handleSwipe = (direction: "left" | "right") => {
    if (currentIndex < 0) return;
    
    const brand = initialBrands[currentIndex];
    setSwipedBrands(prev => [...prev, { brand, direction }]);
    setCurrentIndex(prev => prev - 1);
  };

  const handleUndo = () => {
    if (swipedBrands.length === 0) return;
    setSwipedBrands(prev => prev.slice(0, -1));
    setCurrentIndex(prev => prev + 1);
  };

  const sentCount = swipedBrands.filter(s => s.direction === "right").length;
  const skippedCount = swipedBrands.filter(s => s.direction === "left").length;

  return (
    <main className="min-h-dvh bg-cream max-w-md mx-auto w-full">
      {/* Header */}
      <header className="px-6 pt-4 pb-3 flex items-center justify-between">
        <svg 
          width="160" 
          height="21" 
          viewBox="0 0 6988 874" 
          fill="none" 
          xmlns="http://www.w3.org/2000/svg"
          className="text-ink"
        >
          <path d="M349.605 517.363H266.088V765H63.1231V60.9349H354.46C538.974 60.9349 676.874 105.607 676.874 287.207C676.874 388.204 624.433 448.413 551.599 481.432L718.632 765H490.418L349.605 517.363ZM266.088 225.055V363.926H377.767C437.006 363.926 465.169 334.792 465.169 294.976C465.169 255.16 437.006 225.055 377.767 225.055H266.088ZM772.044 60.9349H1329.47V234.766H975.009V324.11H1311.02V498.912H975.009V590.198H1333.35V765H772.044V60.9349ZM1567.02 234.766H1357.26V60.9349H1980.72V234.766H1769.99V765H1567.02V234.766ZM2317.04 517.363H2233.53V765H2030.56V60.9349H2321.9C2506.41 60.9349 2644.31 105.607 2644.31 287.207C2644.31 388.204 2591.87 448.413 2519.04 481.432L2686.07 765H2457.85L2317.04 517.363ZM2233.53 225.055V363.926H2345.2C2404.44 363.926 2432.61 334.792 2432.61 294.976C2432.61 255.16 2404.44 225.055 2345.2 225.055H2233.53ZM3062.01 777.625C2846.42 777.625 2692.98 643.609 2692.98 411.511C2692.98 179.412 2846.42 44.4258 3062.01 44.4258C3277.6 44.4258 3431.04 179.412 3431.04 411.511C3431.04 643.609 3277.6 777.625 3062.01 777.625ZM3062.01 607.678C3143.58 607.678 3220.3 550.382 3220.3 411.511C3220.3 272.64 3143.58 214.373 3062.01 214.373C2980.43 214.373 2903.71 272.64 2903.71 411.511C2903.71 550.382 2980.43 607.678 3062.01 607.678ZM3684.73 408.597C3684.73 527.075 3735.23 607.678 3838.17 607.678C3927.51 607.678 3968.3 555.237 3968.3 517.363V516.392H3815.84V362.955H4165.44V765H4007.15L4006.18 690.223C3963.45 750.433 3889.64 777.625 3803.21 777.625C3601.22 777.625 3473.03 632.927 3473.03 408.597C3473.03 186.21 3610.93 44.4258 3832.34 44.4258C3989.67 44.4258 4121.74 117.26 4161.56 285.265H3962.48C3949.85 245.448 3910.03 214.373 3835.26 214.373C3742.03 214.373 3684.73 287.207 3684.73 408.597ZM4552.87 517.363H4469.35V765H4266.38V60.9349H4557.72C4742.23 60.9349 4880.13 105.607 4880.13 287.207C4880.13 388.204 4827.69 448.413 4754.86 481.432L4921.89 765H4693.68L4552.87 517.363ZM4469.35 225.055V363.926H4581.03C4640.27 363.926 4668.43 334.792 4668.43 294.976C4668.43 255.16 4640.27 225.055 4581.03 225.055H4469.35ZM5157.99 60.9349H5380.38L5635.78 765H5415.34L5379.41 647.494H5155.08L5119.15 765H4902.58L5157.99 60.9349ZM5202.66 495.999H5332.79L5268.7 284.293L5202.66 495.999ZM5917.52 60.9349C6143.79 60.9349 6323.45 144.452 6323.45 412.482C6323.45 681.483 6143.79 765 5917.52 765H5674.74V60.9349H5917.52ZM5920.44 225.055H5877.71V600.88H5920.44C6032.12 600.88 6111.75 573.689 6111.75 412.482C6111.75 252.246 6032.12 225.055 5920.44 225.055ZM6387.46 60.9349H6944.88V234.766H6590.42V324.11H6926.43V498.912H6590.42V590.198H6948.77V765H6387.46V60.9349Z" fill="currentColor"/>
          <path d="M63 225H271.5C309.884 225 341 256.116 341 294.5V294.5C341 332.884 309.884 364 271.5 364H63V225Z" fill="#E25D33"/>
        </svg>
        <div className="relative">
          <button 
            onClick={() => setShowProfileMenu(!showProfileMenu)}
            className="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-900 to-purple-900 flex items-center justify-center overflow-hidden"
          >
            <div className="w-full h-full bg-gradient-to-br from-indigo-800 via-purple-900 to-indigo-950" />
          </button>
          
          <AnimatePresence>
            {showProfileMenu && (
              <>
                <div 
                  className="fixed inset-0 z-40" 
                  onClick={() => setShowProfileMenu(false)}
                />
                <motion.div
                  initial={{ opacity: 0, scale: 0.95, y: -4 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95, y: -4 }}
                  transition={{ duration: 0.15 }}
                  className="absolute right-0 top-12 z-50 w-44 bg-white rounded-xl border border-border shadow-lg overflow-hidden"
                >
                  <Link
                    href="/home"
                    onClick={() => setShowProfileMenu(false)}
                    className="w-full flex items-center gap-3 px-4 py-3 text-sm text-ink hover:bg-cream transition-colors"
                  >
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                      <polyline points="9 22 9 12 15 12 15 22" />
                    </svg>
                    Home
                  </Link>
                  <div className="h-px bg-border" />
                  <Link
                    href="/settings"
                    onClick={() => setShowProfileMenu(false)}
                    className="w-full flex items-center gap-3 px-4 py-3 text-sm text-ink hover:bg-cream transition-colors"
                  >
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="12" cy="12" r="3" />
                      <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" />
                    </svg>
                    Settings
                  </Link>
                </motion.div>
              </>
            )}
          </AnimatePresence>
        </div>
      </header>

      {/* Title */}
      <div className="px-6 pb-4">
        <h1 className="text-2xl font-semibold text-ink mb-1" style={{ fontFamily: "var(--font-display)" }}>
          Brand Matches
        </h1>
        <p className="text-sm text-ink-light">Swipe right to send outreach, left to skip</p>
      </div>

      {/* Stats Bar */}
      <div className="px-6 pb-4">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 px-3 py-2 bg-white rounded-full border border-border">
            <span className="text-green-500">✓</span>
            <span className="text-sm font-medium text-ink">{sentCount} sent</span>
          </div>
          <div className="flex items-center gap-2 px-3 py-2 bg-white rounded-full border border-border">
            <span className="text-ink-lighter">✕</span>
            <span className="text-sm font-medium text-ink">{skippedCount} skipped</span>
          </div>
          <div className="flex-1" />
          <div className="text-sm text-ink-light">
            {currentIndex + 1} remaining
          </div>
        </div>
      </div>

      {/* Card Area */}
      <div className="px-6 pb-4">
        {currentIndex < 0 ? (
          /* All Done Screen */
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-3xl border border-border p-8 text-center"
          >
            <div className="w-20 h-20 rounded-full bg-gradient-to-br from-terracotta to-orange-400 flex items-center justify-center mb-6 mx-auto">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="20 6 9 17 4 12" />
              </svg>
            </div>
            <h2 className="text-2xl font-semibold text-ink mb-2" style={{ fontFamily: "var(--font-display)" }}>
              All done!
            </h2>
            <p className="text-ink-light mb-2">
              You&apos;ve reviewed all {initialBrands.length} brand matches
            </p>
            <p className="text-sm text-ink-lighter mb-6">
              {sentCount} emails queued to send
            </p>
            
            <div className="space-y-3">
              <button
                onClick={() => {
                  setCurrentIndex(initialBrands.length - 1);
                  setSwipedBrands([]);
                }}
                className="w-full py-3.5 rounded-2xl bg-terracotta text-white font-medium hover:bg-terracotta/90 transition-colors"
              >
                Start Over
              </button>
              <Link
                href="/home"
                className="w-full py-3.5 rounded-2xl bg-cream border border-border text-ink font-medium hover:border-ink/30 transition-colors block text-center"
              >
                Back to Home
              </Link>
            </div>
          </motion.div>
        ) : (
          /* Card Stack */
          <div className="relative h-[520px]">
            {/* Background cards for stack effect */}
            {currentIndex > 0 && (
              <div 
                className="absolute inset-x-0 top-2 h-full bg-white rounded-3xl border border-border opacity-60"
                style={{ transform: "scale(0.95)" }}
              />
            )}
            {currentIndex > 1 && (
              <div 
                className="absolute inset-x-0 top-4 h-full bg-white rounded-3xl border border-border opacity-30"
                style={{ transform: "scale(0.90)" }}
              />
            )}
            
            {/* Active Card */}
            <SwipeCard
              key={currentBrand.id}
              brand={currentBrand}
              onSwipe={handleSwipe}
            />
          </div>
        )}
      </div>

      {/* Action Buttons */}
      {currentIndex >= 0 && (
        <div className="px-6 pb-8 pt-2">
          <div className="flex items-center justify-center gap-4">
            {/* Undo */}
            <button
              onClick={handleUndo}
              disabled={swipedBrands.length === 0}
              className={`w-12 h-12 rounded-full border-2 flex items-center justify-center transition-all ${
                swipedBrands.length > 0
                  ? "border-amber-400 text-amber-500 hover:bg-amber-50"
                  : "border-border text-ink-lighter cursor-not-allowed"
              }`}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M3 7v6h6" />
                <path d="M21 17a9 9 0 00-9-9 9 9 0 00-6 2.3L3 13" />
              </svg>
            </button>
            
            {/* Skip */}
            <button
              onClick={() => handleSwipe("left")}
              className="w-16 h-16 rounded-full bg-white border-2 border-red-300 flex items-center justify-center text-red-500 hover:bg-red-50 hover:border-red-400 transition-all shadow-lg"
            >
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M18 6L6 18M6 6l12 12" />
              </svg>
            </button>
            
            {/* Send */}
            <button
              onClick={() => handleSwipe("right")}
              className="w-16 h-16 rounded-full bg-gradient-to-br from-terracotta to-orange-500 flex items-center justify-center text-white hover:from-terracotta/90 hover:to-orange-500/90 transition-all shadow-lg shadow-terracotta/30"
            >
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 2L11 13" />
                <path d="M22 2L15 22L11 13L2 9L22 2Z" />
              </svg>
            </button>
          </div>
        </div>
      )}
    </main>
  );
}

// Swipeable Card Component
function SwipeCard({
  brand,
  onSwipe,
}: {
  brand: Brand;
  onSwipe: (direction: "left" | "right") => void;
}) {
  const x = useMotionValue(0);
  const rotate = useTransform(x, [-200, 200], [-15, 15]);
  const opacity = useTransform(x, [-200, -100, 0, 100, 200], [0.5, 1, 1, 1, 0.5]);
  
  // Overlay indicators
  const sendOpacity = useTransform(x, [0, 100], [0, 1]);
  const skipOpacity = useTransform(x, [-100, 0], [1, 0]);

  const handleDragEnd = (event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    const threshold = 100;
    if (info.offset.x > threshold) {
      onSwipe("right");
    } else if (info.offset.x < -threshold) {
      onSwipe("left");
    }
  };

  return (
    <motion.div
      className="absolute inset-0 cursor-grab active:cursor-grabbing touch-none"
      style={{ x, rotate, opacity }}
      drag="x"
      dragConstraints={{ left: 0, right: 0 }}
      dragElastic={0.9}
      onDragEnd={handleDragEnd}
      initial={{ scale: 0.95, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      exit={{ 
        x: x.get() > 0 ? 300 : -300,
        opacity: 0,
        transition: { duration: 0.2 }
      }}
    >
      <div className="h-full bg-white rounded-3xl border border-border shadow-xl overflow-hidden relative">
        {/* Send Overlay */}
        <motion.div
          className="absolute inset-0 bg-green-500/10 flex items-center justify-center z-20 pointer-events-none rounded-3xl"
          style={{ opacity: sendOpacity }}
        >
          <div className="bg-green-500 text-white px-8 py-4 rounded-2xl font-bold text-xl rotate-12 border-4 border-green-600">
            SEND
          </div>
        </motion.div>
        
        {/* Skip Overlay */}
        <motion.div
          className="absolute inset-0 bg-red-500/10 flex items-center justify-center z-20 pointer-events-none rounded-3xl"
          style={{ opacity: skipOpacity }}
        >
          <div className="bg-red-500 text-white px-8 py-4 rounded-2xl font-bold text-xl -rotate-12 border-4 border-red-600">
            SKIP
          </div>
        </motion.div>

        <div className="h-full flex flex-col overflow-hidden">
          {/* Brand Header */}
          <div className="p-5 pb-4 flex-shrink-0">
            <div className="flex items-center gap-4">
              {/* Logo */}
              <div className={`w-14 h-14 rounded-2xl ${brand.logoBg} flex items-center justify-center flex-shrink-0`}>
                <span className="text-white font-bold text-lg">{brand.logo}</span>
              </div>
              
              {/* Info */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <h2 className="text-lg font-semibold text-ink truncate">{brand.name}</h2>
                  <span className="px-2 py-0.5 rounded-full bg-cream text-xs font-medium text-ink-light flex-shrink-0">
                    {brand.category}
                  </span>
                </div>
                
                <p className="text-sm text-ink-light line-clamp-2">{brand.description}</p>
              </div>
            </div>
          </div>
          
          {/* Divider */}
          <div className="h-px bg-border mx-5 flex-shrink-0" />
          
          {/* Email Section */}
          <div className="flex-1 overflow-y-auto px-5 pt-4 pb-4">
            {/* Contact Email */}
            <div className="flex items-center gap-2 mb-3 bg-cream rounded-xl px-3 py-2.5">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-terracotta flex-shrink-0">
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                <polyline points="22,6 12,13 2,6" />
              </svg>
              <span className="text-sm text-ink font-medium truncate">{brand.contactEmail}</span>
            </div>
            
            {/* Email Content */}
            <div className="bg-cream rounded-xl p-4">
              <p className="text-sm text-ink whitespace-pre-wrap leading-relaxed">{brand.email}</p>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
