"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

// Theme color options
const THEME_OPTIONS = [
  { 
    id: "terracotta", 
    name: "Terracotta", 
    primary: "bg-terracotta", 
    primaryText: "text-terracotta",
    primaryHover: "hover:bg-terracotta/90",
    gradient: "from-terracotta to-terracotta/80",
    progressBar: "bg-terracotta",
    preview: "bg-terracotta"
  },
  { 
    id: "violet", 
    name: "Violet", 
    primary: "bg-violet-500", 
    primaryText: "text-violet-500",
    primaryHover: "hover:bg-violet-600",
    gradient: "from-violet-500 to-violet-600",
    progressBar: "bg-violet-500",
    preview: "bg-violet-500"
  },
  { 
    id: "emerald", 
    name: "Emerald", 
    primary: "bg-emerald-500", 
    primaryText: "text-emerald-500",
    primaryHover: "hover:bg-emerald-600",
    gradient: "from-emerald-500 to-emerald-600",
    progressBar: "bg-emerald-500",
    preview: "bg-emerald-500"
  },
  { 
    id: "blue", 
    name: "Ocean", 
    primary: "bg-blue-500", 
    primaryText: "text-blue-500",
    primaryHover: "hover:bg-blue-600",
    gradient: "from-blue-500 to-blue-600",
    progressBar: "bg-blue-500",
    preview: "bg-blue-500"
  },
  { 
    id: "slate", 
    name: "Slate", 
    primary: "bg-slate-700", 
    primaryText: "text-slate-700",
    primaryHover: "hover:bg-slate-800",
    gradient: "from-slate-700 to-slate-800",
    progressBar: "bg-slate-700",
    preview: "bg-slate-700"
  },
];

// Mock data for the media kit
const MOCK_MEDIA_KIT = {
  name: "Your Name",
  handle: "yourhandle",
  tagline: "Lifestyle & Fashion Creator",
  bio: "Passionate about sustainable fashion, wellness, and authentic storytelling. I create content that inspires my community to live more intentionally.",
  profileImage: null as string | null,
  stats: {
    instagram: { followers: "125K", engagement: "4.8%", avgLikes: "6.2K" },
    tiktok: { followers: "89K", engagement: "8.2%", avgViews: "45K" },
    youtube: { subscribers: "34K", avgViews: "12K", watchTime: "4.2min" },
  },
  demographics: {
    age: [
      { range: "18-24", percentage: 35 },
      { range: "25-34", percentage: 45 },
      { range: "35-44", percentage: 15 },
      { range: "45+", percentage: 5 },
    ],
    gender: { female: 72, male: 26, other: 2 },
    topLocations: ["United States", "United Kingdom", "Canada", "Australia"],
  },
  contentCategories: ["Fashion", "Lifestyle", "Wellness", "Travel"],
  previousBrands: [
    { name: "Glossier", logo: "G" },
    { name: "Everlane", logo: "E" },
    { name: "Mejuri", logo: "M" },
    { name: "Ritual", logo: "R" },
    { name: "Away", logo: "A" },
  ],
  contact: "partnerships@yourname.com",
};

export default function MediaKit() {
  const [copied, setCopied] = useState(false);
  const [origin, setOrigin] = useState("");
  const [showPreview, setShowPreview] = useState(false);
  const [selectedTheme, setSelectedTheme] = useState("terracotta");

  useEffect(() => {
    setOrigin(window.location.origin);
  }, []);
  
  const theme = THEME_OPTIONS.find(t => t.id === selectedTheme) || THEME_OPTIONS[0];

  const copyLink = async () => {
    const url = `${window.location.origin}/media-kit/${MOCK_MEDIA_KIT.handle}`;
    await navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <main className="min-h-dvh bg-cream">
      {/* Header */}
      <header className="px-6 pt-4 pb-2 flex items-center justify-between max-w-md mx-auto">
        <Link 
          href="/settings"
          className="w-10 h-10 rounded-full flex items-center justify-center hover:bg-white/50 transition-colors"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-ink">
            <path d="M19 12H5M12 19l-7-7 7-7" />
          </svg>
        </Link>
        <h1 className="text-lg font-semibold text-ink" style={{ fontFamily: "var(--font-display)" }}>
          Media Kit
        </h1>
        <button
          onClick={() => setShowPreview(true)}
          className="text-sm font-medium text-terracotta hover:text-terracotta/80 transition-colors"
        >
          Preview
        </button>
      </header>

      <div className="px-6 py-4 max-w-md mx-auto space-y-6 pb-8">
        {/* Share Section */}
        <section className="bg-white rounded-2xl border border-border p-5">
          <h2 className="text-sm font-semibold text-ink mb-3">Your Media Kit Link</h2>
          <div className="flex items-center gap-2">
            <div className="flex-1 px-4 py-3 rounded-xl bg-cream text-sm text-ink truncate">
              {origin}/media-kit/{MOCK_MEDIA_KIT.handle}
            </div>
            <button
              onClick={copyLink}
              className={`px-4 py-3 rounded-xl font-medium text-sm transition-all ${
                copied
                  ? "bg-green-500 text-white"
                  : "bg-terracotta text-white hover:bg-terracotta/90"
              }`}
            >
              {copied ? "Copied!" : "Copy"}
            </button>
          </div>
        </section>

        {/* Profile Overview */}
        <section className="bg-white rounded-2xl border border-border p-5">
          <h2 className="text-sm font-semibold text-ink mb-4">Profile</h2>
          
          <div className="flex items-center gap-4 mb-4">
            <div className={`w-16 h-16 rounded-full flex items-center justify-center ${
              theme.id === "terracotta" ? "bg-gradient-to-br from-terracotta/20 to-terracotta/40" :
              theme.id === "violet" ? "bg-gradient-to-br from-violet-500/20 to-violet-500/40" :
              theme.id === "emerald" ? "bg-gradient-to-br from-emerald-500/20 to-emerald-500/40" :
              theme.id === "blue" ? "bg-gradient-to-br from-blue-500/20 to-blue-500/40" :
              "bg-gradient-to-br from-slate-700/20 to-slate-700/40"
            }`}>
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className={theme.primaryText}>
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" strokeLinecap="round" strokeLinejoin="round" />
                <circle cx="12" cy="7" r="4" />
              </svg>
            </div>
            <div>
              <h3 className="font-semibold text-ink">{MOCK_MEDIA_KIT.name}</h3>
              <p className="text-sm text-ink-light">@{MOCK_MEDIA_KIT.handle}</p>
              <p className={`text-xs ${theme.primaryText} font-medium mt-0.5`}>{MOCK_MEDIA_KIT.tagline}</p>
            </div>
          </div>

          <p className="text-sm text-ink-light leading-relaxed">{MOCK_MEDIA_KIT.bio}</p>

          <div className="flex flex-wrap gap-2 mt-4">
            {MOCK_MEDIA_KIT.contentCategories.map((category) => (
              <span key={category} className="px-3 py-1 rounded-full bg-cream text-xs font-medium text-ink">
                {category}
              </span>
            ))}
          </div>
        </section>

        {/* Social Stats */}
        <section className="bg-white rounded-2xl border border-border p-5">
          <h2 className="text-sm font-semibold text-ink mb-4">Social Stats</h2>
          
          <div className="space-y-4">
            {/* Instagram */}
            <div className="bg-cream rounded-xl p-4">
              <div className="flex items-center gap-2 mb-3">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-pink-500">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                </svg>
                <span className="font-medium text-ink text-sm">Instagram</span>
              </div>
              <div className="grid grid-cols-3 gap-3">
                <div>
                  <div className="text-lg font-semibold text-ink">{MOCK_MEDIA_KIT.stats.instagram.followers}</div>
                  <div className="text-xs text-ink-lighter">Followers</div>
                </div>
                <div>
                  <div className="text-lg font-semibold text-ink">{MOCK_MEDIA_KIT.stats.instagram.engagement}</div>
                  <div className="text-xs text-ink-lighter">Engagement</div>
                </div>
                <div>
                  <div className="text-lg font-semibold text-ink">{MOCK_MEDIA_KIT.stats.instagram.avgLikes}</div>
                  <div className="text-xs text-ink-lighter">Avg. Likes</div>
                </div>
              </div>
            </div>

            {/* TikTok */}
            <div className="bg-cream rounded-xl p-4">
              <div className="flex items-center gap-2 mb-3">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" className="text-ink">
                  <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" />
                </svg>
                <span className="font-medium text-ink text-sm">TikTok</span>
              </div>
              <div className="grid grid-cols-3 gap-3">
                <div>
                  <div className="text-lg font-semibold text-ink">{MOCK_MEDIA_KIT.stats.tiktok.followers}</div>
                  <div className="text-xs text-ink-lighter">Followers</div>
                </div>
                <div>
                  <div className="text-lg font-semibold text-ink">{MOCK_MEDIA_KIT.stats.tiktok.engagement}</div>
                  <div className="text-xs text-ink-lighter">Engagement</div>
                </div>
                <div>
                  <div className="text-lg font-semibold text-ink">{MOCK_MEDIA_KIT.stats.tiktok.avgViews}</div>
                  <div className="text-xs text-ink-lighter">Avg. Views</div>
                </div>
              </div>
            </div>

            {/* YouTube */}
            <div className="bg-cream rounded-xl p-4">
              <div className="flex items-center gap-2 mb-3">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" className="text-red-500">
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                </svg>
                <span className="font-medium text-ink text-sm">YouTube</span>
              </div>
              <div className="grid grid-cols-3 gap-3">
                <div>
                  <div className="text-lg font-semibold text-ink">{MOCK_MEDIA_KIT.stats.youtube.subscribers}</div>
                  <div className="text-xs text-ink-lighter">Subscribers</div>
                </div>
                <div>
                  <div className="text-lg font-semibold text-ink">{MOCK_MEDIA_KIT.stats.youtube.avgViews}</div>
                  <div className="text-xs text-ink-lighter">Avg. Views</div>
                </div>
                <div>
                  <div className="text-lg font-semibold text-ink">{MOCK_MEDIA_KIT.stats.youtube.watchTime}</div>
                  <div className="text-xs text-ink-lighter">Avg. Watch</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Demographics */}
        <section className="bg-white rounded-2xl border border-border p-5">
          <h2 className="text-sm font-semibold text-ink mb-4">Audience Demographics</h2>
          
          {/* Age Distribution */}
          <div className="mb-5">
            <h3 className="text-xs font-medium text-ink-light mb-3">Age Distribution</h3>
            <div className="space-y-2">
              {MOCK_MEDIA_KIT.demographics.age.map((item) => (
                <div key={item.range} className="flex items-center gap-3">
                  <span className="text-xs text-ink w-12">{item.range}</span>
                  <div className="flex-1 h-2 bg-cream rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${item.percentage}%` }}
                      transition={{ duration: 0.8, delay: 0.2 }}
                      className={`h-full ${theme.progressBar} rounded-full`}
                    />
                  </div>
                  <span className="text-xs font-medium text-ink w-10 text-right">{item.percentage}%</span>
                </div>
              ))}
            </div>
          </div>

          {/* Gender */}
          <div className="mb-5">
            <h3 className="text-xs font-medium text-ink-light mb-3">Gender</h3>
            <div className="flex gap-4">
              <div className="flex-1 bg-cream rounded-xl p-3 text-center">
                <div className="text-lg font-semibold text-ink">{MOCK_MEDIA_KIT.demographics.gender.female}%</div>
                <div className="text-xs text-ink-lighter">Female</div>
              </div>
              <div className="flex-1 bg-cream rounded-xl p-3 text-center">
                <div className="text-lg font-semibold text-ink">{MOCK_MEDIA_KIT.demographics.gender.male}%</div>
                <div className="text-xs text-ink-lighter">Male</div>
              </div>
              <div className="flex-1 bg-cream rounded-xl p-3 text-center">
                <div className="text-lg font-semibold text-ink">{MOCK_MEDIA_KIT.demographics.gender.other}%</div>
                <div className="text-xs text-ink-lighter">Other</div>
              </div>
            </div>
          </div>

          {/* Top Locations */}
          <div>
            <h3 className="text-xs font-medium text-ink-light mb-3">Top Locations</h3>
            <div className="flex flex-wrap gap-2">
              {MOCK_MEDIA_KIT.demographics.topLocations.map((location, index) => (
                <span key={location} className="px-3 py-1.5 rounded-full bg-cream text-xs font-medium text-ink">
                  {index + 1}. {location}
                </span>
              ))}
            </div>
          </div>
        </section>

        {/* Previous Brand Collaborations */}
        <section className="bg-white rounded-2xl border border-border p-5">
          <h2 className="text-sm font-semibold text-ink mb-4">Previous Collaborations</h2>
          <div className="flex flex-wrap gap-3">
            {MOCK_MEDIA_KIT.previousBrands.map((brand) => (
              <div key={brand.name} className="flex items-center gap-2 px-3 py-2 rounded-xl bg-cream">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-ink/10 to-ink/20 flex items-center justify-center">
                  <span className="text-sm font-semibold text-ink">{brand.logo}</span>
                </div>
                <span className="text-sm font-medium text-ink">{brand.name}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Contact */}
        <section className="bg-white rounded-2xl border border-border p-5">
          <h2 className="text-sm font-semibold text-ink mb-3">Contact</h2>
          <a 
            href={`mailto:${MOCK_MEDIA_KIT.contact}`}
            className={`flex items-center gap-3 text-sm ${theme.primaryText} hover:opacity-80 transition-colors`}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
              <polyline points="22,6 12,13 2,6" />
            </svg>
            {MOCK_MEDIA_KIT.contact}
          </a>
        </section>

        {/* Theme Color */}
        <section className="bg-white rounded-2xl border border-border p-5">
          <h2 className="text-sm font-semibold text-ink mb-4">Theme Color</h2>
          <div className="grid grid-cols-5 gap-2">
            {THEME_OPTIONS.map((themeOption) => (
              <button
                key={themeOption.id}
                onClick={() => setSelectedTheme(themeOption.id)}
                className={`flex flex-col items-center gap-2 p-2 rounded-xl border-2 transition-all ${
                  selectedTheme === themeOption.id
                    ? "border-ink bg-cream"
                    : "border-transparent hover:bg-cream/50"
                }`}
              >
                <div className={`w-7 h-7 rounded-full ${themeOption.preview}`} />
                <span className="text-[10px] font-medium text-ink truncate w-full text-center">{themeOption.name}</span>
              </button>
            ))}
          </div>
        </section>
      </div>

      {/* Preview Drawer */}
      <AnimatePresence>
        {showPreview && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-ink/50 z-50"
              onClick={() => setShowPreview(false)}
            />
            <motion.div
              initial={{ opacity: 0, y: "100%" }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="fixed inset-x-0 bottom-0 top-12 z-50 bg-cream rounded-t-3xl overflow-hidden"
            >
              <div className="flex items-center justify-between px-6 py-4 border-b border-border bg-cream">
                <h2 className="text-lg font-semibold text-ink">Preview</h2>
                <button
                  onClick={() => setShowPreview(false)}
                  className="w-8 h-8 rounded-full bg-white flex items-center justify-center hover:bg-cream-dark transition-colors"
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <line x1="18" y1="6" x2="6" y2="18" />
                    <line x1="6" y1="6" x2="18" y2="18" />
                  </svg>
                </button>
              </div>
              <div className="overflow-y-auto h-full pb-20">
                <MediaKitPreview data={MOCK_MEDIA_KIT} theme={theme} />
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </main>
  );
}

// Preview Component
function MediaKitPreview({ data, theme }: { data: typeof MOCK_MEDIA_KIT; theme: typeof THEME_OPTIONS[0] }) {
  const getProfileBgClass = () => {
    if (data.profileImage) return "";
    switch (theme.id) {
      case "terracotta": return "bg-gradient-to-br from-terracotta/20 to-terracotta/40";
      case "violet": return "bg-gradient-to-br from-violet-500/20 to-violet-500/40";
      case "emerald": return "bg-gradient-to-br from-emerald-500/20 to-emerald-500/40";
      case "blue": return "bg-gradient-to-br from-blue-500/20 to-blue-500/40";
      case "slate": return "bg-gradient-to-br from-slate-700/20 to-slate-700/40";
      default: return "bg-gradient-to-br from-terracotta/20 to-terracotta/40";
    }
  };

  return (
    <div className="max-w-2xl mx-auto px-6 py-8">
      {/* Header */}
      <div className="bg-white rounded-3xl border border-border p-6 mb-4">
        <div className="flex items-start gap-5">
          <div className={`w-20 h-20 rounded-2xl overflow-hidden flex-shrink-0 ${getProfileBgClass()} ${!data.profileImage ? "flex items-center justify-center" : ""}`}>
            {data.profileImage ? (
              <img src={data.profileImage} alt={data.name} className="w-full h-full object-cover" />
            ) : (
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className={theme.primaryText}>
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" strokeLinecap="round" strokeLinejoin="round" />
                <circle cx="12" cy="7" r="4" />
              </svg>
            )}
          </div>
          <div className="flex-1">
            <h1 className="text-2xl font-semibold text-ink" style={{ fontFamily: "var(--font-display)" }}>
              {data.name}
            </h1>
            <p className="text-ink-light">@{data.handle}</p>
            <p className={`text-sm ${theme.primaryText} font-medium mt-1`}>{data.tagline}</p>
          </div>
        </div>
        
        <p className="text-ink-light text-sm leading-relaxed mt-4">{data.bio}</p>
        
        <div className="flex flex-wrap gap-2 mt-4">
          {data.contentCategories.map((category) => (
            <span key={category} className="px-3 py-1 rounded-full bg-cream text-xs font-medium text-ink">
              {category}
            </span>
          ))}
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-3 mb-4">
        {/* Instagram */}
        <div className="bg-white rounded-2xl border border-border p-4">
          <div className="flex items-center gap-2 mb-3">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-pink-500">
              <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
              <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
              <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
            </svg>
            <span className="font-medium text-ink text-xs">Instagram</span>
          </div>
          <div className="text-xl font-bold text-ink">{data.stats.instagram.followers}</div>
          <div className="text-xs text-ink-lighter">Followers</div>
        </div>

        {/* TikTok */}
        <div className="bg-white rounded-2xl border border-border p-4">
          <div className="flex items-center gap-2 mb-3">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" className="text-ink">
              <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" />
            </svg>
            <span className="font-medium text-ink text-xs">TikTok</span>
          </div>
          <div className="text-xl font-bold text-ink">{data.stats.tiktok.followers}</div>
          <div className="text-xs text-ink-lighter">Followers</div>
        </div>

        {/* YouTube */}
        <div className="bg-white rounded-2xl border border-border p-4">
          <div className="flex items-center gap-2 mb-3">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" className="text-red-500">
              <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
            </svg>
            <span className="font-medium text-ink text-xs">YouTube</span>
          </div>
          <div className="text-xl font-bold text-ink">{data.stats.youtube.subscribers}</div>
          <div className="text-xs text-ink-lighter">Subscribers</div>
        </div>
      </div>

      {/* Demographics */}
      <div className="bg-white rounded-2xl border border-border p-5 mb-4">
        <h2 className="text-sm font-semibold text-ink mb-4">Audience Demographics</h2>
        
        <div className="grid grid-cols-2 gap-6">
          {/* Age */}
          <div>
            <h3 className="text-xs font-medium text-ink-light mb-3">Age Distribution</h3>
            <div className="space-y-2">
                  {data.demographics.age.map((item) => (
                    <div key={item.range} className="flex items-center gap-2">
                      <span className="text-xs text-ink w-10">{item.range}</span>
                      <div className="flex-1 h-2 bg-cream rounded-full overflow-hidden">
                        <div
                          style={{ width: `${item.percentage}%` }}
                          className={`h-full ${theme.progressBar} rounded-full`}
                        />
                      </div>
                      <span className="text-xs font-medium text-ink w-8 text-right">{item.percentage}%</span>
                    </div>
                  ))}
            </div>
          </div>

          {/* Gender & Location */}
          <div className="space-y-4">
            <div>
              <h3 className="text-xs font-medium text-ink-light mb-2">Gender</h3>
              <div className="flex gap-2">
                <div className="flex-1 bg-cream rounded-lg p-2 text-center">
                  <div className="text-sm font-semibold text-ink">{data.demographics.gender.female}%</div>
                  <div className="text-xs text-ink-lighter">Female</div>
                </div>
                <div className="flex-1 bg-cream rounded-lg p-2 text-center">
                  <div className="text-sm font-semibold text-ink">{data.demographics.gender.male}%</div>
                  <div className="text-xs text-ink-lighter">Male</div>
                </div>
              </div>
            </div>
            
            <div>
              <h3 className="text-xs font-medium text-ink-light mb-2">Top Locations</h3>
              <div className="flex flex-wrap gap-1">
                {data.demographics.topLocations.slice(0, 3).map((location, index) => (
                  <span key={location} className="px-2 py-0.5 rounded-full bg-cream text-xs text-ink">
                    {index + 1}. {location}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Previous Collaborations */}
      <div className="bg-white rounded-2xl border border-border p-5 mb-4">
        <h2 className="text-sm font-semibold text-ink mb-4">Previous Collaborations</h2>
        <div className="flex flex-wrap gap-2">
          {data.previousBrands.map((brand) => (
            <div key={brand.name} className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-cream">
              <div className="w-6 h-6 rounded bg-gradient-to-br from-ink/10 to-ink/20 flex items-center justify-center">
                <span className="text-xs font-bold text-ink">{brand.logo}</span>
              </div>
              <span className="text-sm font-medium text-ink">{brand.name}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Contact */}
      <div className={`bg-gradient-to-br ${theme.gradient} rounded-2xl p-5 text-center`}>
        <h2 className="text-white font-semibold mb-2">Interested in collaborating?</h2>
        <a 
          href={`mailto:${data.contact}`}
          className={`inline-flex items-center gap-2 px-5 py-2.5 bg-white rounded-xl text-sm font-medium ${theme.primaryText} hover:bg-white/90 transition-colors`}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
            <polyline points="22,6 12,13 2,6" />
          </svg>
          Get in Touch
        </a>
      </div>

      {/* Footer */}
      <div className="mt-8 text-center">
        <p className="text-xs text-ink-lighter">
          Powered by <span className="font-medium text-terracotta">Retrograde</span>
        </p>
      </div>
    </div>
  );
}

