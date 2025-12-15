"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence, Reorder } from "framer-motion";
import Link from "next/link";

interface CustomLink {
  id: string;
  title: string;
  url: string;
  emoji: string;
}

interface SocialLinks {
  instagram: string;
  tiktok: string;
  youtube: string;
  twitter: string;
  linkedin: string;
}

const SOCIAL_PLATFORMS = [
  { id: "instagram", name: "Instagram", placeholder: "username", baseUrl: "https://instagram.com/" },
  { id: "tiktok", name: "TikTok", placeholder: "username", baseUrl: "https://tiktok.com/@" },
  { id: "youtube", name: "YouTube", placeholder: "channel", baseUrl: "https://youtube.com/@" },
  { id: "twitter", name: "X (Twitter)", placeholder: "username", baseUrl: "https://x.com/" },
  { id: "linkedin", name: "LinkedIn", placeholder: "username", baseUrl: "https://linkedin.com/in/" },
] as const;


const EMOJI_OPTIONS = ["🔗", "🌟", "🎬", "🎵", "📸", "💼", "🛒", "📝", "🎨", "💡", "🚀", "❤️", "✨", "🎯", "📱", "🎧"];

const GRADIENT_OPTIONS = [
  { id: "sunset", name: "Sunset", class: "bg-gradient-to-b from-orange-100 via-rose-100 to-purple-100" },
  { id: "ocean", name: "Ocean", class: "bg-gradient-to-b from-cyan-100 via-blue-100 to-indigo-100" },
  { id: "forest", name: "Forest", class: "bg-gradient-to-b from-emerald-100 via-teal-100 to-cyan-100" },
  { id: "midnight", name: "Midnight", class: "bg-gradient-to-b from-slate-600 via-slate-700 to-zinc-700" },
  { id: "minimal", name: "Minimal", class: "bg-gradient-to-b from-gray-50 via-white to-white" },
] as const;

export default function LinkInBioEdit() {
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const [displayName, setDisplayName] = useState("Your Name");
  const [handle, setHandle] = useState("yourhandle");
  const [socialLinks, setSocialLinks] = useState<SocialLinks>({
    instagram: "",
    tiktok: "",
    youtube: "",
    twitter: "",
    linkedin: "",
  });
  const [links, setLinks] = useState<CustomLink[]>([
    { id: "1", title: "My Website", url: "https://example.com", emoji: "🌟" },
    { id: "2", title: "Shop My Favorites", url: "https://shop.example.com", emoji: "🛒" },
  ]);
  const [showPreview, setShowPreview] = useState(false);
  const [copied, setCopied] = useState(false);
  const [editingLinkId, setEditingLinkId] = useState<string | null>(null);
  const [showEmojiPicker, setShowEmojiPicker] = useState<string | null>(null);
  const [selectedGradient, setSelectedGradient] = useState("sunset");
  const [origin, setOrigin] = useState("");
  
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setOrigin(window.location.origin);
  }, []);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const addLink = () => {
    const newLink: CustomLink = {
      id: Date.now().toString(),
      title: "New Link",
      url: "https://",
      emoji: "🔗",
    };
    setLinks([...links, newLink]);
    setEditingLinkId(newLink.id);
  };

  const updateLink = (id: string, field: keyof CustomLink, value: string) => {
    setLinks(links.map(link => 
      link.id === id ? { ...link, [field]: value } : link
    ));
  };

  const deleteLink = (id: string) => {
    setLinks(links.filter(link => link.id !== id));
    if (editingLinkId === id) setEditingLinkId(null);
  };

  const copyLink = async () => {
    const url = `${window.location.origin}/u/${handle}`;
    await navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const updateSocialLink = (platform: keyof SocialLinks, value: string) => {
    setSocialLinks({ ...socialLinks, [platform]: value });
  };

  const activeSocialLinks = Object.entries(socialLinks).filter(([, value]) => value.trim() !== "");

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
          Link in Bio
        </h1>
        <button
          onClick={() => setShowPreview(true)}
          className="text-sm font-medium text-terracotta hover:text-terracotta/80 transition-colors"
        >
          Preview
        </button>
      </header>

      <div className="px-6 py-4 max-w-md mx-auto space-y-6 pb-32">
        {/* Share Section */}
        <section className="bg-white rounded-2xl border border-border p-5">
          <h2 className="text-sm font-semibold text-ink mb-3">Your Link</h2>
          <div className="flex items-center gap-2">
            <div className="flex-1 px-4 py-3 rounded-xl bg-cream text-sm text-ink truncate">
              {origin}/u/{handle}
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

        {/* Profile Section */}
        <section className="bg-white rounded-2xl border border-border p-5">
          <h2 className="text-sm font-semibold text-ink mb-4">Profile</h2>
          
          {/* Profile Image */}
          <div className="flex items-center gap-4 mb-5">
            <button
              onClick={() => fileInputRef.current?.click()}
              className="relative w-20 h-20 rounded-full bg-gradient-to-br from-terracotta/20 to-terracotta/40 flex items-center justify-center overflow-hidden group"
            >
              {profileImage ? (
                <img src={profileImage} alt="Profile" className="w-full h-full object-cover" />
              ) : (
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-terracotta">
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" strokeLinecap="round" strokeLinejoin="round" />
                  <circle cx="12" cy="7" r="4" />
                </svg>
              )}
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
                  <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" />
                  <circle cx="12" cy="13" r="4" />
                </svg>
              </div>
            </button>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="hidden"
            />
            <div className="flex-1">
              <p className="text-sm text-ink font-medium">Profile Photo</p>
              <p className="text-xs text-ink-light">Tap to upload</p>
            </div>
          </div>

          {/* Display Name */}
          <div className="mb-4">
            <label className="block text-xs font-medium text-ink-light mb-1.5">Display Name</label>
            <input
              type="text"
              value={displayName}
              onChange={(e) => setDisplayName(e.target.value)}
              className="w-full px-4 py-3 rounded-xl bg-cream border border-border text-ink text-sm focus:border-terracotta/50 transition-colors"
              placeholder="Your name"
            />
          </div>

          {/* Handle */}
          <div>
            <label className="block text-xs font-medium text-ink-light mb-1.5">Handle</label>
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-ink-lighter text-sm">@</span>
              <input
                type="text"
                value={handle}
                onChange={(e) => setHandle(e.target.value.toLowerCase().replace(/[^a-z0-9_]/g, ""))}
                className="w-full pl-8 pr-4 py-3 rounded-xl bg-cream border border-border text-ink text-sm focus:border-terracotta/50 transition-colors"
                placeholder="yourhandle"
              />
            </div>
          </div>
        </section>

        {/* Background Section */}
        <section className="bg-white rounded-2xl border border-border p-5">
          <h2 className="text-sm font-semibold text-ink mb-4">Background</h2>
          <div className="grid grid-cols-5 gap-2">
            {GRADIENT_OPTIONS.map((gradient) => (
              <button
                key={gradient.id}
                onClick={() => setSelectedGradient(gradient.id)}
                className={`relative aspect-[3/4] rounded-xl overflow-hidden border-2 transition-all ${
                  selectedGradient === gradient.id
                    ? "border-terracotta ring-2 ring-terracotta/20"
                    : "border-border hover:border-ink/20"
                }`}
              >
                <div className={`absolute inset-0 ${gradient.class}`} />
                {selectedGradient === gradient.id && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-5 h-5 rounded-full bg-terracotta flex items-center justify-center">
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                    </div>
                  </div>
                )}
              </button>
            ))}
          </div>
          <p className="text-xs text-ink-lighter mt-3 text-center">
            {GRADIENT_OPTIONS.find(g => g.id === selectedGradient)?.name}
          </p>
        </section>

        {/* Social Links Section */}
        <section className="bg-white rounded-2xl border border-border p-5">
          <h2 className="text-sm font-semibold text-ink mb-4">Social Links</h2>
          <div className="space-y-3">
            {SOCIAL_PLATFORMS.map((platform) => (
              <div key={platform.id} className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-cream flex items-center justify-center flex-shrink-0">
                  <SocialIcon platform={platform.id} />
                </div>
                <input
                  type="text"
                  value={socialLinks[platform.id as keyof SocialLinks]}
                  onChange={(e) => updateSocialLink(platform.id as keyof SocialLinks, e.target.value)}
                  className="flex-1 px-4 py-2.5 rounded-xl bg-cream border border-border text-ink text-sm focus:border-terracotta/50 transition-colors"
                  placeholder={platform.placeholder}
                />
              </div>
            ))}
          </div>
        </section>

        {/* Custom Links Section */}
        <section className="bg-white rounded-2xl border border-border p-5 overflow-visible">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-sm font-semibold text-ink">Custom Links</h2>
            <button
              onClick={addLink}
              className="text-sm font-medium text-terracotta hover:text-terracotta/80 transition-colors flex items-center gap-1"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="12" y1="5" x2="12" y2="19" />
                <line x1="5" y1="12" x2="19" y2="12" />
              </svg>
              Add Link
            </button>
          </div>

          <Reorder.Group axis="y" values={links} onReorder={setLinks} className="space-y-3 overflow-visible">
            {links.map((link) => (
              <Reorder.Item key={link.id} value={link} className="overflow-visible">
                <motion.div
                  layout
                  className="bg-cream rounded-xl border border-border overflow-visible"
                >
                  {/* Link Header */}
                  <div className="flex items-center gap-3 p-3">
                    {/* Drag Handle */}
                    <div className="cursor-grab active:cursor-grabbing text-ink-lighter hover:text-ink-light transition-colors">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                        <circle cx="9" cy="6" r="1.5" />
                        <circle cx="15" cy="6" r="1.5" />
                        <circle cx="9" cy="12" r="1.5" />
                        <circle cx="15" cy="12" r="1.5" />
                        <circle cx="9" cy="18" r="1.5" />
                        <circle cx="15" cy="18" r="1.5" />
                      </svg>
                    </div>

                    {/* Emoji */}
                    <button
                      onClick={() => setShowEmojiPicker(showEmojiPicker === link.id ? null : link.id)}
                      className={`w-10 h-10 rounded-lg bg-white border flex items-center justify-center text-lg transition-colors ${
                        showEmojiPicker === link.id ? "border-terracotta" : "border-border hover:border-terracotta/50"
                      }`}
                    >
                      {link.emoji}
                    </button>

                    {/* Title & URL Preview */}
                    <div className="flex-1 min-w-0">
                      <div className="font-medium text-ink text-sm truncate">{link.title}</div>
                      <div className="text-xs text-ink-lighter truncate">{link.url}</div>
                    </div>

                    {/* Actions */}
                    <button
                      onClick={() => setEditingLinkId(editingLinkId === link.id ? null : link.id)}
                      className="p-2 rounded-lg hover:bg-white transition-colors text-ink-light"
                    >
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                        <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
                      </svg>
                    </button>
                    <button
                      onClick={() => deleteLink(link.id)}
                      className="p-2 rounded-lg hover:bg-red-50 transition-colors text-ink-lighter hover:text-red-500"
                    >
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <polyline points="3 6 5 6 21 6" />
                        <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
                      </svg>
                    </button>
                  </div>

                  {/* Emoji Picker */}
                  <AnimatePresence>
                    {showEmojiPicker === link.id && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="overflow-hidden"
                      >
                        <div className="px-3 pb-3 flex flex-wrap gap-2">
                          {EMOJI_OPTIONS.map((emoji) => (
                            <button
                              key={emoji}
                              onClick={() => {
                                updateLink(link.id, "emoji", emoji);
                                setShowEmojiPicker(null);
                              }}
                              className={`w-10 h-10 rounded-lg transition-colors flex items-center justify-center text-lg ${
                                link.emoji === emoji
                                  ? "bg-terracotta/10 border-2 border-terracotta"
                                  : "bg-white border border-border hover:border-terracotta/50"
                              }`}
                            >
                              {emoji}
                            </button>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* Expanded Edit Form */}
                  <AnimatePresence>
                    {editingLinkId === link.id && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="overflow-hidden"
                      >
                        <div className="px-3 pb-3 pt-0 space-y-3 border-t border-border mt-1 pt-3">
                          <div>
                            <label className="block text-xs font-medium text-ink-light mb-1">Title</label>
                            <input
                              type="text"
                              value={link.title}
                              onChange={(e) => updateLink(link.id, "title", e.target.value)}
                              className="w-full px-3 py-2 rounded-lg bg-white border border-border text-ink text-sm focus:border-terracotta/50 transition-colors"
                              placeholder="Link title"
                            />
                          </div>
                          <div>
                            <label className="block text-xs font-medium text-ink-light mb-1">URL</label>
                            <input
                              type="url"
                              value={link.url}
                              onChange={(e) => updateLink(link.id, "url", e.target.value)}
                              className="w-full px-3 py-2 rounded-lg bg-white border border-border text-ink text-sm focus:border-terracotta/50 transition-colors"
                              placeholder="https://example.com"
                            />
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              </Reorder.Item>
            ))}
          </Reorder.Group>

          {links.length === 0 && (
            <div className="py-8 text-center">
              <div className="w-12 h-12 rounded-full bg-cream mx-auto mb-3 flex items-center justify-center">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-ink-lighter">
                  <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
                  <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
                </svg>
              </div>
              <p className="text-sm text-ink-light">No links yet</p>
              <p className="text-xs text-ink-lighter mt-1">Add your first link above</p>
            </div>
          )}
        </section>

      </div>

      {/* Preview Modal */}
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
              <div className="flex items-center justify-between px-6 py-4 border-b border-border">
                <h2 className="text-lg font-semibold text-ink">Preview</h2>
                <button
                  onClick={() => setShowPreview(false)}
                  className="w-8 h-8 rounded-full bg-cream flex items-center justify-center hover:bg-cream-dark transition-colors"
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <line x1="18" y1="6" x2="6" y2="18" />
                    <line x1="6" y1="6" x2="18" y2="18" />
                  </svg>
                </button>
              </div>
              <div className="overflow-y-auto h-full pb-20">
                <LinkInBioPreview
                  profileImage={profileImage}
                  displayName={displayName}
                  handle={handle}
                  socialLinks={socialLinks}
                  links={links}
                  gradient={selectedGradient}
                />
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Bottom Action Bar */}
      <div className="fixed bottom-0 left-0 right-0 bg-cream border-t border-border px-6 py-4">
        <div className="max-w-md mx-auto">
          <Link
            href={`/u/${handle}`}
            className="block w-full py-4 rounded-2xl bg-ink text-cream font-medium text-center hover:bg-ink/90 transition-colors"
          >
            View Live Page
          </Link>
        </div>
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

// Preview Component
function LinkInBioPreview({
  profileImage,
  displayName,
  handle,
  socialLinks,
  links,
  gradient,
}: {
  profileImage: string | null;
  displayName: string;
  handle: string;
  socialLinks: SocialLinks;
  links: CustomLink[];
  gradient: string;
}) {
  const activeSocialLinks = Object.entries(socialLinks).filter(([, value]) => value.trim() !== "");
  const gradientClass = GRADIENT_OPTIONS.find(g => g.id === gradient)?.class || GRADIENT_OPTIONS[0].class;
  const isDark = gradient === "midnight";

  return (
    <div className={`min-h-full px-6 py-12 ${gradientClass}`}>
      <div className="max-w-sm mx-auto text-center">
        {/* Profile Image */}
        <div className={`w-24 h-24 rounded-full mx-auto mb-4 overflow-hidden flex items-center justify-center ${isDark ? "bg-white/20" : "bg-gradient-to-br from-terracotta/30 to-terracotta/50"}`}>
          {profileImage ? (
            <img src={profileImage} alt={displayName} className="w-full h-full object-cover" />
          ) : (
            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className={isDark ? "text-white" : "text-terracotta"}>
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" strokeLinecap="round" strokeLinejoin="round" />
              <circle cx="12" cy="7" r="4" />
            </svg>
          )}
        </div>

        {/* Name & Handle */}
        <h1 className={`text-xl font-semibold mb-1 ${isDark ? "text-white" : "text-ink"}`} style={{ fontFamily: "var(--font-display)" }}>
          {displayName || "Your Name"}
        </h1>
        <p className={`text-sm mb-6 ${isDark ? "text-white/70" : "text-ink-light"}`}>@{handle || "yourhandle"}</p>

        {/* Social Links */}
        {activeSocialLinks.length > 0 && (
          <div className="flex items-center justify-center gap-3 mb-8">
            {activeSocialLinks.map(([platform, username]) => {
              const platformInfo = SOCIAL_PLATFORMS.find(p => p.id === platform);
              if (!platformInfo) return null;
              return (
                <a
                  key={platform}
                  href={`${platformInfo.baseUrl}${username}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`w-10 h-10 rounded-full flex items-center justify-center transition-colors ${
                    isDark 
                      ? "bg-white/10 border border-white/20 text-white/80 hover:bg-white/20" 
                      : "bg-white border border-border text-ink-light hover:text-terracotta hover:border-terracotta/30"
                  }`}
                >
                  <SocialIcon platform={platform} className="w-5 h-5" />
                </a>
              );
            })}
          </div>
        )}

        {/* Custom Links */}
        <div className="space-y-3">
          {links.map((link) => (
            <a
              key={link.id}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className={`block w-full py-4 px-6 rounded-2xl transition-all text-center ${
                isDark
                  ? "bg-white/10 border border-white/20 hover:bg-white/20"
                  : "bg-white border border-border hover:border-terracotta/30 hover:shadow-md"
              }`}
            >
              <span className="mr-2">{link.emoji}</span>
              <span className={`font-medium ${isDark ? "text-white" : "text-ink"}`}>{link.title}</span>
            </a>
          ))}
        </div>

        {/* Footer */}
        <div className={`mt-12 pt-8 border-t ${isDark ? "border-white/20" : "border-border/50"}`}>
          <p className={`text-xs ${isDark ? "text-white/50" : "text-ink-lighter"}`}>
            Powered by <span className={`font-medium ${isDark ? "text-white/70" : "text-terracotta"}`}>Retrograde</span>
          </p>
        </div>
      </div>
    </div>
  );
}

