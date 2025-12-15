"use client";

import { useParams } from "next/navigation";
import { motion } from "framer-motion";
import Link from "next/link";

// Theme color options
const THEME_OPTIONS = [
  { 
    id: "terracotta", 
    name: "Terracotta", 
    primaryText: "text-terracotta",
    gradient: "from-terracotta to-terracotta/80",
    progressBar: "bg-terracotta",
  },
  { 
    id: "violet", 
    name: "Violet", 
    primaryText: "text-violet-500",
    gradient: "from-violet-500 to-violet-600",
    progressBar: "bg-violet-500",
  },
  { 
    id: "emerald", 
    name: "Emerald", 
    primaryText: "text-emerald-500",
    gradient: "from-emerald-500 to-emerald-600",
    progressBar: "bg-emerald-500",
  },
  { 
    id: "blue", 
    name: "Ocean", 
    primaryText: "text-blue-500",
    gradient: "from-blue-500 to-blue-600",
    progressBar: "bg-blue-500",
  },
  { 
    id: "slate", 
    name: "Slate", 
    primaryText: "text-slate-700",
    gradient: "from-slate-700 to-slate-800",
    progressBar: "bg-slate-700",
  },
];

// Mock data for the media kit
const MOCK_MEDIA_KITS: Record<string, {
  name: string;
  handle: string;
  tagline: string;
  bio: string;
  profileImage: string | null;
  theme: string;
  stats: {
    instagram: { followers: string; engagement: string; avgLikes: string };
    tiktok: { followers: string; engagement: string; avgViews: string };
    youtube: { subscribers: string; avgViews: string; watchTime: string };
  };
  demographics: {
    age: { range: string; percentage: number }[];
    gender: { female: number; male: number; other: number };
    topLocations: string[];
  };
  contentCategories: string[];
  previousBrands: { name: string; logo: string }[];
  contact: string;
}> = {
  yourhandle: {
    name: "Your Name",
    handle: "yourhandle",
    tagline: "Lifestyle & Fashion Creator",
    bio: "Passionate about sustainable fashion, wellness, and authentic storytelling. I create content that inspires my community to live more intentionally.",
    profileImage: null,
    theme: "terracotta",
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
  },
  emma: {
    name: "Emma Chamberlain",
    handle: "emma",
    tagline: "Content Creator & Entrepreneur",
    bio: "Coffee enthusiast, podcast host, and creator of unfiltered content. Building Chamberlain Coffee and sharing my journey along the way.",
    profileImage: "/emma chamberlain.jpg",
    theme: "violet",
    stats: {
      instagram: { followers: "16.2M", engagement: "3.2%", avgLikes: "520K" },
      tiktok: { followers: "11.8M", engagement: "5.1%", avgViews: "2.4M" },
      youtube: { subscribers: "12.1M", avgViews: "3.2M", watchTime: "8.5min" },
    },
    demographics: {
      age: [
        { range: "18-24", percentage: 52 },
        { range: "25-34", percentage: 35 },
        { range: "35-44", percentage: 10 },
        { range: "45+", percentage: 3 },
      ],
      gender: { female: 78, male: 20, other: 2 },
      topLocations: ["United States", "United Kingdom", "Canada", "Brazil"],
    },
    contentCategories: ["Lifestyle", "Fashion", "Coffee", "Podcast"],
    previousBrands: [
      { name: "Louis Vuitton", logo: "LV" },
      { name: "Cartier", logo: "C" },
      { name: "Levi's", logo: "L" },
      { name: "Bad Habit", logo: "BH" },
      { name: "Lancôme", logo: "L" },
    ],
    contact: "partnerships@emmachamberlain.com",
  },
};

export default function PublicMediaKit() {
  const params = useParams();
  const handle = params.handle as string;
  
  const kit = MOCK_MEDIA_KITS[handle];
  const theme = THEME_OPTIONS.find(t => t.id === kit?.theme) || THEME_OPTIONS[0];
  
  const getProfileBgClass = () => {
    if (!kit || kit.profileImage) return "";
    switch (theme.id) {
      case "terracotta": return "bg-gradient-to-br from-terracotta/20 to-terracotta/40";
      case "violet": return "bg-gradient-to-br from-violet-500/20 to-violet-500/40";
      case "emerald": return "bg-gradient-to-br from-emerald-500/20 to-emerald-500/40";
      case "blue": return "bg-gradient-to-br from-blue-500/20 to-blue-500/40";
      case "slate": return "bg-gradient-to-br from-slate-700/20 to-slate-700/40";
      default: return "bg-gradient-to-br from-terracotta/20 to-terracotta/40";
    }
  };
  
  if (!kit) {
    return (
      <main className="min-h-dvh bg-cream flex items-center justify-center px-6">
        <div className="text-center">
          <div className="w-20 h-20 rounded-full bg-white mx-auto mb-6 flex items-center justify-center border border-border">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-ink-lighter">
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
              <polyline points="14 2 14 8 20 8" />
            </svg>
          </div>
          <h1 className="text-2xl font-semibold text-ink mb-2" style={{ fontFamily: "var(--font-display)" }}>
            Media Kit Not Found
          </h1>
          <p className="text-ink-light mb-6">This media kit doesn&apos;t exist yet.</p>
          <Link
            href="/"
            className="inline-block px-6 py-3 rounded-xl bg-ink text-cream font-medium hover:bg-ink/90 transition-colors"
          >
            Go Home
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-dvh bg-cream">
      <div className="max-w-2xl mx-auto px-6 py-8">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={{
            hidden: {},
            visible: {
              transition: {
                staggerChildren: 0.06,
                delayChildren: 0.1,
              },
            },
          }}
        >
          {/* Header */}
          <motion.div
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0 },
            }}
            className="bg-white rounded-3xl border border-border p-6 mb-4"
          >
            <div className="flex items-start gap-5">
              <div className={`w-20 h-20 rounded-2xl overflow-hidden flex-shrink-0 ${kit.profileImage ? "" : `${getProfileBgClass()} flex items-center justify-center`}`}>
                {kit.profileImage ? (
                  <img src={kit.profileImage} alt={kit.name} className="w-full h-full object-cover" />
                ) : (
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className={theme.primaryText}>
                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" strokeLinecap="round" strokeLinejoin="round" />
                    <circle cx="12" cy="7" r="4" />
                  </svg>
                )}
              </div>
              <div className="flex-1">
                <h1 className="text-2xl font-semibold text-ink" style={{ fontFamily: "var(--font-display)" }}>
                  {kit.name}
                </h1>
                <p className="text-ink-light">@{kit.handle}</p>
                <p className={`text-sm ${theme.primaryText} font-medium mt-1`}>{kit.tagline}</p>
              </div>
            </div>
            
            <p className="text-ink-light text-sm leading-relaxed mt-4">{kit.bio}</p>
            
            <div className="flex flex-wrap gap-2 mt-4">
              {kit.contentCategories.map((category) => (
                <span key={category} className="px-3 py-1 rounded-full bg-cream text-xs font-medium text-ink">
                  {category}
                </span>
              ))}
            </div>
          </motion.div>

          {/* Stats Grid */}
          <motion.div
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0 },
            }}
            className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4"
          >
            {/* Instagram */}
            <div className="bg-white rounded-2xl border border-border p-5">
              <div className="flex items-center gap-2 mb-4">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-pink-500">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                </svg>
                <span className="font-medium text-ink text-sm">Instagram</span>
              </div>
              <div className="text-2xl font-bold text-ink mb-1">{kit.stats.instagram.followers}</div>
              <div className="text-xs text-ink-lighter mb-3">Followers</div>
              <div className="flex justify-between text-xs">
                <div>
                  <span className="font-semibold text-ink">{kit.stats.instagram.engagement}</span>
                  <span className="text-ink-lighter ml-1">Eng.</span>
                </div>
                <div>
                  <span className="font-semibold text-ink">{kit.stats.instagram.avgLikes}</span>
                  <span className="text-ink-lighter ml-1">Avg. Likes</span>
                </div>
              </div>
            </div>

            {/* TikTok */}
            <div className="bg-white rounded-2xl border border-border p-5">
              <div className="flex items-center gap-2 mb-4">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" className="text-ink">
                  <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" />
                </svg>
                <span className="font-medium text-ink text-sm">TikTok</span>
              </div>
              <div className="text-2xl font-bold text-ink mb-1">{kit.stats.tiktok.followers}</div>
              <div className="text-xs text-ink-lighter mb-3">Followers</div>
              <div className="flex justify-between text-xs">
                <div>
                  <span className="font-semibold text-ink">{kit.stats.tiktok.engagement}</span>
                  <span className="text-ink-lighter ml-1">Eng.</span>
                </div>
                <div>
                  <span className="font-semibold text-ink">{kit.stats.tiktok.avgViews}</span>
                  <span className="text-ink-lighter ml-1">Avg. Views</span>
                </div>
              </div>
            </div>

            {/* YouTube */}
            <div className="bg-white rounded-2xl border border-border p-5">
              <div className="flex items-center gap-2 mb-4">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" className="text-red-500">
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                </svg>
                <span className="font-medium text-ink text-sm">YouTube</span>
              </div>
              <div className="text-2xl font-bold text-ink mb-1">{kit.stats.youtube.subscribers}</div>
              <div className="text-xs text-ink-lighter mb-3">Subscribers</div>
              <div className="flex justify-between text-xs">
                <div>
                  <span className="font-semibold text-ink">{kit.stats.youtube.avgViews}</span>
                  <span className="text-ink-lighter ml-1">Avg. Views</span>
                </div>
                <div>
                  <span className="font-semibold text-ink">{kit.stats.youtube.watchTime}</span>
                  <span className="text-ink-lighter ml-1">Watch</span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Demographics */}
          <motion.div
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0 },
            }}
            className="bg-white rounded-2xl border border-border p-5 mb-4"
          >
            <h2 className="text-sm font-semibold text-ink mb-4">Audience Demographics</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Age */}
              <div>
                <h3 className="text-xs font-medium text-ink-light mb-3">Age Distribution</h3>
                <div className="space-y-2">
                    {kit.demographics.age.map((item) => (
                      <div key={item.range} className="flex items-center gap-3">
                        <span className="text-xs text-ink w-12">{item.range}</span>
                        <div className="flex-1 h-2 bg-cream rounded-full overflow-hidden">
                          <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${item.percentage}%` }}
                            transition={{ duration: 0.8, delay: 0.4 }}
                            className={`h-full ${theme.progressBar} rounded-full`}
                          />
                        </div>
                        <span className="text-xs font-medium text-ink w-10 text-right">{item.percentage}%</span>
                      </div>
                    ))}
                </div>
              </div>

              {/* Gender & Location */}
              <div className="space-y-4">
                <div>
                  <h3 className="text-xs font-medium text-ink-light mb-3">Gender</h3>
                  <div className="flex gap-3">
                    <div className="flex-1 bg-cream rounded-xl p-2.5 text-center">
                      <div className="text-lg font-semibold text-ink">{kit.demographics.gender.female}%</div>
                      <div className="text-xs text-ink-lighter">Female</div>
                    </div>
                    <div className="flex-1 bg-cream rounded-xl p-2.5 text-center">
                      <div className="text-lg font-semibold text-ink">{kit.demographics.gender.male}%</div>
                      <div className="text-xs text-ink-lighter">Male</div>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h3 className="text-xs font-medium text-ink-light mb-2">Top Locations</h3>
                  <div className="flex flex-wrap gap-1.5">
                    {kit.demographics.topLocations.map((location, index) => (
                      <span key={location} className="px-2 py-1 rounded-full bg-cream text-xs text-ink">
                        {index + 1}. {location}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Previous Collaborations */}
          <motion.div
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0 },
            }}
            className="bg-white rounded-2xl border border-border p-5 mb-4"
          >
            <h2 className="text-sm font-semibold text-ink mb-4">Previous Collaborations</h2>
            <div className="flex flex-wrap gap-3">
              {kit.previousBrands.map((brand) => (
                <div key={brand.name} className="flex items-center gap-2 px-3 py-2 rounded-xl bg-cream">
                  <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-ink/10 to-ink/20 flex items-center justify-center">
                    <span className="text-xs font-bold text-ink">{brand.logo}</span>
                  </div>
                  <span className="text-sm font-medium text-ink">{brand.name}</span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Contact */}
          <motion.div
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0 },
            }}
            className={`bg-gradient-to-br ${theme.gradient} rounded-2xl p-5 text-center`}
          >
            <h2 className="text-white font-semibold mb-2">Interested in collaborating?</h2>
            <a 
              href={`mailto:${kit.contact}`}
              className={`inline-flex items-center gap-2 px-5 py-2.5 bg-white rounded-xl text-sm font-medium ${theme.primaryText} hover:bg-white/90 transition-colors`}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                <polyline points="22,6 12,13 2,6" />
              </svg>
              Get in Touch
            </a>
          </motion.div>

          {/* Footer */}
          <motion.div
            variants={{
              hidden: { opacity: 0 },
              visible: { opacity: 1, transition: { delay: 0.5 } },
            }}
            className="mt-8 text-center"
          >
            <Link href="/" className="inline-flex items-center gap-2 text-sm text-ink-lighter hover:text-terracotta transition-colors">
              <span>Powered by</span>
              <svg 
                width="70" 
                height="10" 
                viewBox="0 0 6988 874" 
                fill="none" 
                xmlns="http://www.w3.org/2000/svg"
                className="opacity-60"
              >
                <path d="M349.605 517.363H266.088V765H63.1231V60.9349H354.46C538.974 60.9349 676.874 105.607 676.874 287.207C676.874 388.204 624.433 448.413 551.599 481.432L718.632 765H490.418L349.605 517.363ZM266.088 225.055V363.926H377.767C437.006 363.926 465.169 334.792 465.169 294.976C465.169 255.16 437.006 225.055 377.767 225.055H266.088ZM772.044 60.9349H1329.47V234.766H975.009V324.11H1311.02V498.912H975.009V590.198H1333.35V765H772.044V60.9349ZM1567.02 234.766H1357.26V60.9349H1980.72V234.766H1769.99V765H1567.02V234.766ZM2317.04 517.363H2233.53V765H2030.56V60.9349H2321.9C2506.41 60.9349 2644.31 105.607 2644.31 287.207C2644.31 388.204 2591.87 448.413 2519.04 481.432L2686.07 765H2457.85L2317.04 517.363ZM2233.53 225.055V363.926H2345.2C2404.44 363.926 2432.61 334.792 2432.61 294.976C2432.61 255.16 2404.44 225.055 2345.2 225.055H2233.53ZM3062.01 777.625C2846.42 777.625 2692.98 643.609 2692.98 411.511C2692.98 179.412 2846.42 44.4258 3062.01 44.4258C3277.6 44.4258 3431.04 179.412 3431.04 411.511C3431.04 643.609 3277.6 777.625 3062.01 777.625ZM3062.01 607.678C3143.58 607.678 3220.3 550.382 3220.3 411.511C3220.3 272.64 3143.58 214.373 3062.01 214.373C2980.43 214.373 2903.71 272.64 2903.71 411.511C2903.71 550.382 2980.43 607.678 3062.01 607.678ZM3684.73 408.597C3684.73 527.075 3735.23 607.678 3838.17 607.678C3927.51 607.678 3968.3 555.237 3968.3 517.363V516.392H3815.84V362.955H4165.44V765H4007.15L4006.18 690.223C3963.45 750.433 3889.64 777.625 3803.21 777.625C3601.22 777.625 3473.03 632.927 3473.03 408.597C3473.03 186.21 3610.93 44.4258 3832.34 44.4258C3989.67 44.4258 4121.74 117.26 4161.56 285.265H3962.48C3949.85 245.448 3910.03 214.373 3835.26 214.373C3742.03 214.373 3684.73 287.207 3684.73 408.597ZM4552.87 517.363H4469.35V765H4266.38V60.9349H4557.72C4742.23 60.9349 4880.13 105.607 4880.13 287.207C4880.13 388.204 4827.69 448.413 4754.86 481.432L4921.89 765H4693.68L4552.87 517.363ZM4469.35 225.055V363.926H4581.03C4640.27 363.926 4668.43 334.792 4668.43 294.976C4668.43 255.16 4640.27 225.055 4581.03 225.055H4469.35ZM5157.99 60.9349H5380.38L5635.78 765H5415.34L5379.41 647.494H5155.08L5119.15 765H4902.58L5157.99 60.9349ZM5202.66 495.999H5332.79L5268.7 284.293L5202.66 495.999ZM5917.52 60.9349C6143.79 60.9349 6323.45 144.452 6323.45 412.482C6323.45 681.483 6143.79 765 5917.52 765H5674.74V60.9349H5917.52ZM5920.44 225.055H5877.71V600.88H5920.44C6032.12 600.88 6111.75 573.689 6111.75 412.482C6111.75 252.246 6032.12 225.055 5920.44 225.055ZM6387.46 60.9349H6944.88V234.766H6590.42V324.11H6926.43V498.912H6590.42V590.198H6948.77V765H6387.46V60.9349Z" fill="currentColor"/>
                <path d="M63 225H271.5C309.884 225 341 256.116 341 294.5V294.5C341 332.884 309.884 364 271.5 364H63V225Z" fill="#E25D33"/>
              </svg>
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </main>
  );
}

