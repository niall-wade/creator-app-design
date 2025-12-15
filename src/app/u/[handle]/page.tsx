"use client";

import { useParams } from "next/navigation";
import { motion } from "framer-motion";
import Link from "next/link";

const GRADIENT_OPTIONS = [
  { id: "sunset", name: "Sunset", class: "bg-gradient-to-b from-orange-100 via-rose-100 to-purple-100" },
  { id: "ocean", name: "Ocean", class: "bg-gradient-to-b from-cyan-100 via-blue-100 to-indigo-100" },
  { id: "forest", name: "Forest", class: "bg-gradient-to-b from-emerald-100 via-teal-100 to-cyan-100" },
  { id: "midnight", name: "Midnight", class: "bg-gradient-to-b from-slate-600 via-slate-700 to-zinc-700" },
  { id: "minimal", name: "Minimal", class: "bg-gradient-to-b from-gray-50 via-white to-white" },
] as const;

// Mock data - in a real app this would come from an API/database
const MOCK_PROFILES: Record<string, {
  profileImage: string | null;
  displayName: string;
  handle: string;
  gradient: string;
  socialLinks: {
    instagram?: string;
    tiktok?: string;
    youtube?: string;
    twitter?: string;
    linkedin?: string;
  };
  links: Array<{
    id: string;
    title: string;
    url: string;
    emoji: string;
  }>;
}> = {
  yourhandle: {
    profileImage: null,
    displayName: "Your Name",
    handle: "yourhandle",
    gradient: "sunset",
    socialLinks: {
      instagram: "yourhandle",
      tiktok: "yourhandle",
    },
    links: [
      { id: "1", title: "My Website", url: "https://example.com", emoji: "🌟" },
      { id: "2", title: "Shop My Favorites", url: "https://shop.example.com", emoji: "🛒" },
    ],
  },
  emma: {
    profileImage: "/emma chamberlain.jpg",
    displayName: "Emma Chamberlain",
    handle: "emma",
    gradient: "midnight",
    socialLinks: {
      instagram: "emmachamberlain",
      youtube: "emmachamberlain",
      twitter: "emmachambie",
      tiktok: "emmachamberlain",
    },
    links: [
      { id: "1", title: "Chamberlain Coffee", url: "https://chamberlaincoffee.com", emoji: "☕" },
      { id: "2", title: "Latest YouTube Video", url: "https://youtube.com/@emmachamberlain", emoji: "🎬" },
      { id: "3", title: "Podcast - Anything Goes", url: "https://podcasts.apple.com", emoji: "🎙️" },
      { id: "4", title: "Shop My Looks", url: "https://shopmy.us/emmachamberlain", emoji: "👗" },
    ],
  },
  wisdom: {
    profileImage: "/wisdom kaye.jpg",
    displayName: "Wisdom Kaye",
    handle: "wisdom",
    gradient: "ocean",
    socialLinks: {
      instagram: "wisdm",
      tiktok: "wisdm8",
      youtube: "wisdomkaye",
    },
    links: [
      { id: "1", title: "IMG Models Portfolio", url: "https://imgmodels.com", emoji: "📸" },
      { id: "2", title: "Latest TikTok", url: "https://tiktok.com/@wisdm8", emoji: "🎵" },
      { id: "3", title: "Style Inspo Board", url: "https://pinterest.com", emoji: "✨" },
    ],
  },
};

const SOCIAL_PLATFORMS = [
  { id: "instagram", name: "Instagram", baseUrl: "https://instagram.com/" },
  { id: "tiktok", name: "TikTok", baseUrl: "https://tiktok.com/@" },
  { id: "youtube", name: "YouTube", baseUrl: "https://youtube.com/@" },
  { id: "twitter", name: "X (Twitter)", baseUrl: "https://x.com/" },
  { id: "linkedin", name: "LinkedIn", baseUrl: "https://linkedin.com/in/" },
] as const;

export default function LinkInBioPage() {
  const params = useParams();
  const handle = params.handle as string;
  
  const profile = MOCK_PROFILES[handle];
  
  if (!profile) {
    return (
      <main className="min-h-dvh bg-gradient-to-b from-terracotta/10 to-cream flex items-center justify-center px-6">
        <div className="text-center">
          <div className="w-20 h-20 rounded-full bg-cream mx-auto mb-6 flex items-center justify-center">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-ink-lighter">
              <circle cx="12" cy="12" r="10" />
              <path d="M16 16s-1.5-2-4-2-4 2-4 2" />
              <line x1="9" y1="9" x2="9.01" y2="9" />
              <line x1="15" y1="9" x2="15.01" y2="9" />
            </svg>
          </div>
          <h1 className="text-2xl font-semibold text-ink mb-2" style={{ fontFamily: "var(--font-display)" }}>
            Page Not Found
          </h1>
          <p className="text-ink-light mb-6">This link in bio page doesn&apos;t exist yet.</p>
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

  const activeSocialLinks = Object.entries(profile.socialLinks).filter(([, value]) => value && value.trim() !== "");
  const gradientClass = GRADIENT_OPTIONS.find(g => g.id === profile.gradient)?.class || GRADIENT_OPTIONS[0].class;
  const isDark = profile.gradient === "midnight";

  return (
    <main className={`min-h-dvh ${gradientClass}`}>
      <div className="max-w-md mx-auto px-6 py-12">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={{
            hidden: {},
            visible: {
              transition: {
                staggerChildren: 0.08,
                delayChildren: 0.1,
              },
            },
          }}
          className="text-center"
        >
          {/* Profile Image */}
          <motion.div
            variants={{
              hidden: { opacity: 0, scale: 0.8 },
              visible: { opacity: 1, scale: 1, transition: { type: "spring", stiffness: 300, damping: 20 } },
            }}
            className={`w-28 h-28 rounded-full mx-auto mb-5 overflow-hidden flex items-center justify-center ring-4 shadow-lg ${
              isDark ? "bg-white/20 ring-white/20" : "bg-gradient-to-br from-terracotta/30 to-terracotta/50 ring-white"
            }`}
          >
            {profile.profileImage ? (
              <img src={profile.profileImage} alt={profile.displayName} className="w-full h-full object-cover" />
            ) : (
              <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className={isDark ? "text-white" : "text-terracotta"}>
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" strokeLinecap="round" strokeLinejoin="round" />
                <circle cx="12" cy="7" r="4" />
              </svg>
            )}
          </motion.div>

          {/* Name */}
          <motion.h1
            variants={{
              hidden: { opacity: 0, y: 10 },
              visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 300, damping: 25 } },
            }}
            className={`text-2xl font-semibold mb-1 ${isDark ? "text-white" : "text-ink"}`}
            style={{ fontFamily: "var(--font-display)" }}
          >
            {profile.displayName}
          </motion.h1>

          {/* Handle */}
          <motion.p
            variants={{
              hidden: { opacity: 0, y: 10 },
              visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 300, damping: 25 } },
            }}
            className={`mb-6 ${isDark ? "text-white/70" : "text-ink-light"}`}
          >
            @{profile.handle}
          </motion.p>

          {/* Social Links */}
          {activeSocialLinks.length > 0 && (
            <motion.div
              variants={{
                hidden: { opacity: 0 },
                visible: { opacity: 1 },
              }}
              className="flex items-center justify-center gap-3 mb-8"
            >
              {activeSocialLinks.map(([platform, username]) => {
                const platformInfo = SOCIAL_PLATFORMS.find(p => p.id === platform);
                if (!platformInfo) return null;
                return (
                  <motion.a
                    key={platform}
                    href={`${platformInfo.baseUrl}${username}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    className={`w-11 h-11 rounded-full flex items-center justify-center transition-colors shadow-sm ${
                      isDark
                        ? "bg-white/10 border border-white/20 text-white/80 hover:bg-white/20"
                        : "bg-white border border-border text-ink-light hover:text-terracotta hover:border-terracotta/30"
                    }`}
                  >
                    <SocialIcon platform={platform} className="w-5 h-5" />
                  </motion.a>
                );
              })}
            </motion.div>
          )}

          {/* Custom Links */}
          <div className="space-y-3">
            {profile.links.map((link, index) => (
              <motion.a
                key={link.id}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { 
                    opacity: 1, 
                    y: 0, 
                    transition: { 
                      type: "spring", 
                      stiffness: 300, 
                      damping: 25,
                      delay: index * 0.05,
                    } 
                  },
                }}
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.98 }}
                className={`block w-full py-4 px-6 rounded-2xl transition-all shadow-sm ${
                  isDark
                    ? "bg-white/10 border border-white/20 hover:bg-white/20"
                    : "bg-white border border-border hover:border-terracotta/30 hover:shadow-lg"
                }`}
              >
                <span className="mr-2 text-lg">{link.emoji}</span>
                <span className={`font-medium ${isDark ? "text-white" : "text-ink"}`}>{link.title}</span>
              </motion.a>
            ))}
          </div>

          {/* Footer */}
          <motion.div
            variants={{
              hidden: { opacity: 0 },
              visible: { opacity: 1, transition: { delay: 0.5 } },
            }}
            className={`mt-16 pt-8 border-t ${isDark ? "border-white/20" : "border-border/30"}`}
          >
            <Link href="/" className={`inline-flex items-center gap-2 text-sm transition-colors ${isDark ? "text-white/50 hover:text-white/70" : "text-ink-lighter hover:text-terracotta"}`}>
              <svg 
                width="80" 
                height="12" 
                viewBox="0 0 6988 874" 
                fill="none" 
                xmlns="http://www.w3.org/2000/svg"
                className="opacity-50"
              >
                <path d="M349.605 517.363H266.088V765H63.1231V60.9349H354.46C538.974 60.9349 676.874 105.607 676.874 287.207C676.874 388.204 624.433 448.413 551.599 481.432L718.632 765H490.418L349.605 517.363ZM266.088 225.055V363.926H377.767C437.006 363.926 465.169 334.792 465.169 294.976C465.169 255.16 437.006 225.055 377.767 225.055H266.088ZM772.044 60.9349H1329.47V234.766H975.009V324.11H1311.02V498.912H975.009V590.198H1333.35V765H772.044V60.9349ZM1567.02 234.766H1357.26V60.9349H1980.72V234.766H1769.99V765H1567.02V234.766ZM2317.04 517.363H2233.53V765H2030.56V60.9349H2321.9C2506.41 60.9349 2644.31 105.607 2644.31 287.207C2644.31 388.204 2591.87 448.413 2519.04 481.432L2686.07 765H2457.85L2317.04 517.363ZM2233.53 225.055V363.926H2345.2C2404.44 363.926 2432.61 334.792 2432.61 294.976C2432.61 255.16 2404.44 225.055 2345.2 225.055H2233.53ZM3062.01 777.625C2846.42 777.625 2692.98 643.609 2692.98 411.511C2692.98 179.412 2846.42 44.4258 3062.01 44.4258C3277.6 44.4258 3431.04 179.412 3431.04 411.511C3431.04 643.609 3277.6 777.625 3062.01 777.625ZM3062.01 607.678C3143.58 607.678 3220.3 550.382 3220.3 411.511C3220.3 272.64 3143.58 214.373 3062.01 214.373C2980.43 214.373 2903.71 272.64 2903.71 411.511C2903.71 550.382 2980.43 607.678 3062.01 607.678ZM3684.73 408.597C3684.73 527.075 3735.23 607.678 3838.17 607.678C3927.51 607.678 3968.3 555.237 3968.3 517.363V516.392H3815.84V362.955H4165.44V765H4007.15L4006.18 690.223C3963.45 750.433 3889.64 777.625 3803.21 777.625C3601.22 777.625 3473.03 632.927 3473.03 408.597C3473.03 186.21 3610.93 44.4258 3832.34 44.4258C3989.67 44.4258 4121.74 117.26 4161.56 285.265H3962.48C3949.85 245.448 3910.03 214.373 3835.26 214.373C3742.03 214.373 3684.73 287.207 3684.73 408.597ZM4552.87 517.363H4469.35V765H4266.38V60.9349H4557.72C4742.23 60.9349 4880.13 105.607 4880.13 287.207C4880.13 388.204 4827.69 448.413 4754.86 481.432L4921.89 765H4693.68L4552.87 517.363ZM4469.35 225.055V363.926H4581.03C4640.27 363.926 4668.43 334.792 4668.43 294.976C4668.43 255.16 4640.27 225.055 4581.03 225.055H4469.35ZM5157.99 60.9349H5380.38L5635.78 765H5415.34L5379.41 647.494H5155.08L5119.15 765H4902.58L5157.99 60.9349ZM5202.66 495.999H5332.79L5268.7 284.293L5202.66 495.999ZM5917.52 60.9349C6143.79 60.9349 6323.45 144.452 6323.45 412.482C6323.45 681.483 6143.79 765 5917.52 765H5674.74V60.9349H5917.52ZM5920.44 225.055H5877.71V600.88H5920.44C6032.12 600.88 6111.75 573.689 6111.75 412.482C6111.75 252.246 6032.12 225.055 5920.44 225.055ZM6387.46 60.9349H6944.88V234.766H6590.42V324.11H6926.43V498.912H6590.42V590.198H6948.77V765H6387.46V60.9349Z" fill="currentColor"/>
                <path d="M63 225H271.5C309.884 225 341 256.116 341 294.5V294.5C341 332.884 309.884 364 271.5 364H63V225Z" fill={isDark ? "white" : "#E25D33"}/>
              </svg>
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </main>
  );
}

// Social Icon Component
function SocialIcon({ platform, className = "w-5 h-5" }: { platform: string; className?: string }) {
  switch (platform) {
    case "instagram":
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
          <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
          <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
        </svg>
      );
    case "tiktok":
      return (
        <svg className={className} viewBox="0 0 24 24" fill="currentColor">
          <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" />
        </svg>
      );
    case "youtube":
      return (
        <svg className={className} viewBox="0 0 24 24" fill="currentColor">
          <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
        </svg>
      );
    case "twitter":
      return (
        <svg className={className} viewBox="0 0 24 24" fill="currentColor">
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
        </svg>
      );
    case "linkedin":
      return (
        <svg className={className} viewBox="0 0 24 24" fill="currentColor">
          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
        </svg>
      );
    default:
      return null;
  }
}

