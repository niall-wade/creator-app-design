"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

type DealStatus = "all" | "new" | "negotiating" | "in-progress" | "completed";

interface Deal {
  id: number;
  brand: string;
  logo: string;
  logoType: "icon" | "image" | "letter";
  logoBg?: string;
  status: "new" | "negotiating" | "in-progress" | "completed";
  amount?: number;
  date: string;
}

export default function DealsPage() {
  const [activeFilter, setActiveFilter] = useState<DealStatus>("all");
  const [showProfileMenu, setShowProfileMenu] = useState(false);

  const filters: { id: DealStatus; label: string; icon?: string }[] = [
    { id: "all", label: "All", icon: "🤝" },
    { id: "new", label: "New", icon: "✨" },
    { id: "negotiating", label: "Negotiating", icon: "💬" },
    { id: "in-progress", label: "In Progress", icon: "✏️" },
    { id: "completed", label: "Completed", icon: "✅" },
  ];

  const deals: Deal[] = [
    { id: 1, brand: "Unknown", logo: "🏢", logoType: "icon", logoBg: "bg-gray-100", status: "new", date: "12/6/2025" },
    { id: 2, brand: "Talanx", logo: "T", logoType: "letter", logoBg: "bg-gradient-to-br from-pink-400 to-pink-600", status: "new", amount: 15000, date: "12/6/2025" },
    { id: 3, brand: "Nike", logo: "nike", logoType: "image", logoBg: "bg-black", status: "new", amount: 10000, date: "12/6/2025" },
    { id: 4, brand: "Lego®", logo: "lego", logoType: "image", logoBg: "bg-red-500", status: "negotiating", amount: 10000, date: "12/6/2025" },
    { id: 5, brand: "Unknown", logo: "🏢", logoType: "icon", logoBg: "bg-gray-100", status: "new", date: "12/6/2025" },
    { id: 6, brand: "Glossier", logo: "G", logoType: "letter", logoBg: "bg-gradient-to-br from-pink-200 to-pink-300", status: "in-progress", amount: 8000, date: "12/5/2025" },
    { id: 7, brand: "Spotify", logo: "S", logoType: "letter", logoBg: "bg-green-500", status: "completed", amount: 12000, date: "12/3/2025" },
    { id: 8, brand: "Adobe", logo: "A", logoType: "letter", logoBg: "bg-red-600", status: "negotiating", amount: 20000, date: "12/4/2025" },
  ];

  const filteredDeals = activeFilter === "all" 
    ? deals 
    : deals.filter(deal => deal.status === activeFilter);

  const getStatusStyle = (status: Deal["status"]) => {
    switch (status) {
      case "new":
        return "bg-blue-50 text-blue-600";
      case "negotiating":
        return "bg-amber-50 text-amber-600";
      case "in-progress":
        return "bg-purple-50 text-purple-600";
      case "completed":
        return "bg-green-50 text-green-600";
      default:
        return "bg-gray-50 text-gray-600";
    }
  };

  const getStatusLabel = (status: Deal["status"]) => {
    switch (status) {
      case "new":
        return "New";
      case "negotiating":
        return "Negotiating";
      case "in-progress":
        return "In Progress";
      case "completed":
        return "Completed";
      default:
        return status;
    }
  };

  const renderLogo = (deal: Deal) => {
    if (deal.logoType === "image") {
      if (deal.logo === "nike") {
        return (
          <div className={`w-14 h-14 rounded-2xl ${deal.logoBg} flex items-center justify-center`}>
            <svg width="32" height="12" viewBox="0 0 32 12" fill="white">
              <path d="M32 1.6c-4.5 2.2-9.3 4.6-13.9 7-2.3 1.2-4.5 2.2-6.1 2.7-1.6.5-2.6.4-3-.4-.4-.8.1-2.3 1.3-4.1 1.2-1.8 3-3.8 5.3-5.8-4.3 1.4-7.8 3.2-10.3 5.3-2.5 2.1-3.9 4.3-3.9 6.3 0 1 .4 1.8 1.1 2.3.7.5 1.7.7 2.9.5 1.2-.2 2.6-.7 4.2-1.5 3.2-1.6 7.1-4.1 11.5-7.1L32 1.6z"/>
            </svg>
          </div>
        );
      }
      if (deal.logo === "lego") {
        return (
          <div className={`w-14 h-14 rounded-2xl ${deal.logoBg} flex items-center justify-center`}>
            <span className="text-white font-black text-sm tracking-tight">LEGO</span>
          </div>
        );
      }
    }
    
    if (deal.logoType === "letter") {
      return (
        <div className={`w-14 h-14 rounded-2xl ${deal.logoBg} flex items-center justify-center`}>
          <span className="text-white font-semibold text-xl">{deal.logo}</span>
        </div>
      );
    }

    // Icon type (emoji)
    return (
      <div className={`w-14 h-14 rounded-2xl ${deal.logoBg} flex items-center justify-center border border-border`}>
        <span className="text-2xl">{deal.logo}</span>
      </div>
    );
  };

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
                  <div className="h-px bg-border" />
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
                </motion.div>
              </>
            )}
          </AnimatePresence>
        </div>
      </header>

      {/* Page Content */}
      <div className="px-6 py-4">
        {/* Title & Description */}
        <h1 className="text-3xl font-semibold text-ink mb-2" style={{ fontFamily: "var(--font-display)" }}>
          Deals
        </h1>
        <p className="text-ink-light text-sm leading-relaxed mb-6">
          Retrograde automatically identifies deals from your inbox
        </p>

        {/* Filter Pills */}
        <div className="flex gap-2 mb-6 overflow-x-auto pb-2 -mx-6 px-6 scrollbar-hide">
          {filters.map((filter) => (
            <button
              key={filter.id}
              onClick={() => setActiveFilter(filter.id)}
              className={`flex items-center gap-1.5 px-4 py-2.5 rounded-full text-sm font-medium whitespace-nowrap transition-all ${
                activeFilter === filter.id
                  ? "bg-ink text-cream"
                  : "bg-white border border-border text-ink hover:border-ink/30"
              }`}
            >
              {filter.icon && <span>{filter.icon}</span>}
              {filter.label}
            </button>
          ))}
        </div>

        {/* Deal Cards */}
        <div className="space-y-3">
          <AnimatePresence mode="popLayout">
            {filteredDeals.map((deal, index) => (
              <motion.div
                key={deal.id}
                layout
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.2, delay: index * 0.03 }}
              >
                <button className="w-full bg-white rounded-2xl border border-border p-4 flex items-center gap-4 hover:border-ink/20 transition-colors text-left">
                  {/* Brand Logo */}
                  {renderLogo(deal)}
                  
                  {/* Deal Info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-semibold text-ink">{deal.brand}</span>
                      <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${getStatusStyle(deal.status)}`}>
                        {getStatusLabel(deal.status)}
                      </span>
                    </div>
                    <div className="flex items-center gap-3 text-sm text-ink-light">
                      {deal.amount && (
                        <span className="flex items-center gap-1">
                          <span>🤝</span>
                          <span>${deal.amount.toLocaleString()}</span>
                        </span>
                      )}
                      <span className="flex items-center gap-1">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-ink-lighter">
                          <circle cx="12" cy="12" r="10" />
                          <polyline points="12 6 12 12 16 14" />
                        </svg>
                        <span>{deal.date}</span>
                      </span>
                    </div>
                  </div>
                  
                  {/* Chevron */}
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-ink-lighter flex-shrink-0">
                    <polyline points="9 18 15 12 9 6" />
                  </svg>
                </button>
              </motion.div>
            ))}
          </AnimatePresence>
          
          {filteredDeals.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="py-12 text-center"
            >
              <div className="w-16 h-16 rounded-full bg-cream mx-auto mb-4 flex items-center justify-center">
                <span className="text-2xl">🤝</span>
              </div>
              <p className="text-ink-light">No deals found</p>
              <p className="text-sm text-ink-lighter mt-1">Try a different filter</p>
            </motion.div>
          )}
        </div>
      </div>
    </main>
  );
}

