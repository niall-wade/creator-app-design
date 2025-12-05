"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

type Tab = "outreach" | "discover" | "chat" | "inbox";

export default function Home() {
  const [activeTab, setActiveTab] = useState<Tab>("discover");
  const [showProfileMenu, setShowProfileMenu] = useState(false);

  const tabs: { id: Tab; label: string; icon: React.ReactNode }[] = [
    {
      id: "discover",
      label: "Discover",
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10" />
          <path d="M16.24 7.76L14.12 14.12L7.76 16.24L9.88 9.88L16.24 7.76Z" />
        </svg>
      ),
    },
    {
      id: "outreach",
      label: "Outreach",
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M22 2L11 13" />
          <path d="M22 2L15 22L11 13L2 9L22 2Z" />
        </svg>
      ),
    },
    {
      id: "chat",
      label: "Chat",
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M21 15C21 15.5304 20.7893 16.0391 20.4142 16.4142C20.0391 16.7893 19.5304 17 19 17H7L3 21V5C3 4.46957 3.21071 3.96086 3.58579 3.58579C3.96086 3.21071 4.46957 3 5 3H19C19.5304 3 20.0391 3.21071 20.4142 3.58579C20.7893 3.96086 21 4.46957 21 5V15Z" />
        </svg>
      ),
    },
    {
      id: "inbox",
      label: "Inbox",
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M22 12H16L14 15H10L8 12H2" />
          <path d="M5.45 5.11L2 12V18C2 18.5304 2.21071 19.0391 2.58579 19.4142C2.96086 19.7893 3.46957 20 4 20H20C20.5304 20 21.0391 19.7893 21.4142 19.4142C21.7893 19.0391 22 18.5304 22 18V12L18.55 5.11C18.3844 4.77679 18.1292 4.49637 17.813 4.30028C17.4967 4.10419 17.1321 4.0002 16.76 4H7.24C6.86792 4.0002 6.50326 4.10419 6.18704 4.30028C5.87083 4.49637 5.61558 4.77679 5.45 5.11Z" />
        </svg>
      ),
    },
  ];

  const renderContent = () => {
    switch (activeTab) {
      case "outreach":
        return <OutreachTab />;
      case "discover":
        return <DiscoverTab />;
      case "chat":
        return <ChatTab />;
      case "inbox":
        return <InboxTab />;
    }
  };

  return (
    <main className="h-dvh bg-cream flex flex-col max-w-md mx-auto w-full overflow-hidden">
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
          <path d="M63 225H271.5C309.884 225 341 256.116 341 294.5V294.5C341 332.884 309.884 364 271.5 364H63V225Z" fill="#C75A3A"/>
        </svg>
        <div className="relative">
          <button 
            onClick={() => setShowProfileMenu(!showProfileMenu)}
            className="w-10 h-10 rounded-full bg-gradient-to-br from-terracotta/20 to-terracotta/30 flex items-center justify-center overflow-hidden"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <circle cx="12" cy="8" r="4" fill="#C75A3A" fillOpacity="0.6"/>
              <path d="M4 20C4 16.6863 7.58172 14 12 14C16.4183 14 20 16.6863 20 20V21H4V20Z" fill="#C75A3A" fillOpacity="0.6"/>
            </svg>
          </button>
          
          <AnimatePresence>
            {showProfileMenu && (
              <>
                {/* Backdrop */}
                <div 
                  className="fixed inset-0 z-40" 
                  onClick={() => setShowProfileMenu(false)}
                />
                
                {/* Dropdown */}
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
                  <button
                    onClick={() => setShowProfileMenu(false)}
                    className="w-full flex items-center gap-3 px-4 py-3 text-sm text-red-600 hover:bg-red-50 transition-colors"
                  >
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
                      <polyline points="16 17 21 12 16 7" />
                      <line x1="21" y1="12" x2="9" y2="12" />
                    </svg>
                    Log out
                  </button>
                </motion.div>
              </>
            )}
          </AnimatePresence>
        </div>
      </header>

      {/* Content */}
      <div className="flex-1 overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="h-full"
          >
            {renderContent()}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Bottom Navigation */}
      <nav className="px-6 pb-8 pt-3 bg-cream flex-shrink-0">
        <div className="flex items-center justify-center gap-1 bg-white/80 backdrop-blur-xl rounded-full p-1.5 shadow-sm border border-border/50 mx-auto w-fit">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`relative flex flex-col items-center gap-0.5 py-2 px-5 rounded-full transition-all ${
                activeTab === tab.id
                  ? "text-terracotta"
                  : "text-ink-lighter hover:text-ink-light"
              }`}
            >
              {activeTab === tab.id && (
                <motion.div
                  layoutId="activeTab"
                  className="absolute inset-0 bg-ink/5 rounded-full"
                  transition={{ type: "spring", bounce: 0.15, duration: 0.5 }}
                />
              )}
              <span className="relative z-10">{tab.icon}</span>
              <span className="relative z-10 text-[10px] font-medium">{tab.label}</span>
            </button>
          ))}
        </div>
      </nav>
    </main>
  );
}

// Outreach Tab
function OutreachTab() {
  const pastCampaigns = [
    { id: 1, week: "Nov 25 - Dec 1", responses: 8, deals: 2 },
    { id: 2, week: "Nov 18 - Nov 24", responses: 5, deals: 1 },
    { id: 3, week: "Nov 11 - Nov 17", responses: 12, deals: 3 },
  ];

  return (
    <div className="h-full overflow-y-auto px-6 py-4">
      {/* Next Campaign Countdown */}
      <div className="bg-white rounded-3xl border border-border p-5 mb-4 flex items-center justify-between">
        <div>
          <div className="text-ink-lighter text-sm mb-0.5">Next campaign</div>
          <div className="text-ink font-semibold" style={{ fontFamily: "var(--font-display)" }}>
            Starts in 3 days
          </div>
        </div>
        <div className="flex items-center gap-1.5">
          {[
            { num: "3", label: "d" },
            { num: "12", label: "h" },
            { num: "45", label: "m" },
          ].map((item, i) => (
            <div key={i} className="bg-cream rounded-xl px-3 py-2 text-center min-w-[48px]">
              <span className="text-ink font-semibold">{item.num}</span>
              <span className="text-ink-lighter text-xs ml-0.5">{item.label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* This Week's Campaign Card */}
      <div className="bg-white rounded-3xl border border-border p-5 mb-4">
        <div className="flex items-center justify-between mb-4">
          <div>
            <div className="text-xs text-ink-lighter mb-1">This Week</div>
            <h2 className="text-lg font-semibold text-ink" style={{ fontFamily: "var(--font-display)" }}>
              Campaign Live
            </h2>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
            <span className="text-sm text-ink-light">15/25 sent</span>
          </div>
        </div>

        {/* Progress */}
        <div className="h-1.5 bg-border rounded-full overflow-hidden mb-4">
          <div className="h-full bg-terracotta rounded-full w-[60%]" />
        </div>

        {/* Minimal stats */}
        <div className="flex items-center gap-4 text-sm">
          <span className="text-ink"><span className="font-semibold">2</span> responses</span>
          <span className="text-ink-lighter">·</span>
          <span className="text-terracotta font-medium">40% rate</span>
        </div>
      </div>

      {/* Past Campaigns Card */}
      <div className="bg-white rounded-3xl border border-border overflow-hidden">
        <div className="p-5 pb-4">
          <h2 className="text-xl font-semibold text-ink" style={{ fontFamily: "var(--font-display)" }}>
            Past campaigns
          </h2>
        </div>
        
        <div className="px-5">
          {pastCampaigns.map((campaign, index) => (
            <div key={campaign.id}>
              <div className="flex items-center justify-between py-4">
                <span className="text-sm font-medium text-ink">{campaign.week}</span>
                <div className="flex items-center gap-3 text-sm">
                  <span className="text-ink-light">{campaign.responses} responses</span>
                  <span className="text-terracotta font-semibold">{campaign.deals} deals</span>
                </div>
              </div>
              
              {index < pastCampaigns.length - 1 && (
                <div className="h-px bg-border" />
              )}
            </div>
          ))}
        </div>
        
        <div className="h-4" />
      </div>
    </div>
  );
}

// Discover Tab
function DiscoverTab() {
  const [activeTab, setActiveTab] = useState<"trending" | "suggested">("trending");

  const trendingCreators = [
    { name: "Emma Chamberlain", handle: "@emmachamberlain", followers: "12M", category: "Lifestyle", initial: "E", rank: 1 },
    { name: "Bretman Rock", handle: "@bretmanrock", followers: "8.5M", category: "Beauty", initial: "B", rank: 2 },
    { name: "Wisdom Kaye", handle: "@wisdm", followers: "4.2M", category: "Fashion", initial: "W", rank: 3 },
    { name: "Charli D&apos;Amelio", handle: "@charlidamelio", followers: "55M", category: "Dance", initial: "C", rank: 4 },
  ];

  const suggestedCreators = [
    { name: "Sarah Chen", handle: "@sarahchen", followers: "125K", category: "Beauty", initial: "S", mutuals: 3 },
    { name: "Alex Rivera", handle: "@alexrivera", followers: "89K", category: "Fitness", initial: "A", mutuals: 5 },
    { name: "Maya Johnson", handle: "@mayaj", followers: "210K", category: "Lifestyle", initial: "M", mutuals: 2 },
    { name: "Jordan Lee", handle: "@jordanlee", followers: "156K", category: "Fashion", initial: "J", mutuals: 4 },
  ];

  return (
    <div className="h-full overflow-y-auto px-6 py-4">
      {/* Search */}
      <div className="relative mb-5">
        <svg
          className="absolute left-4 top-1/2 -translate-y-1/2 text-ink-lighter"
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <circle cx="11" cy="11" r="8" />
          <path d="M21 21L16.65 16.65" />
        </svg>
        <input
          type="text"
          placeholder="Search creators..."
          className="w-full pl-12 pr-4 py-3.5 rounded-2xl bg-white border border-border text-ink placeholder:text-ink-lighter focus:border-ink/30 transition-colors text-sm"
        />
      </div>

      {/* Tab Pills */}
      <div className="flex gap-2 mb-5">
        <button 
          onClick={() => setActiveTab("trending")}
          className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-medium transition-all ${
            activeTab === "trending" 
              ? "bg-ink text-cream" 
              : "bg-white border border-border text-ink hover:border-ink/30"
          }`}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" />
            <polyline points="17 6 23 6 23 12" />
          </svg>
          Trending
        </button>
        <button 
          onClick={() => setActiveTab("suggested")}
          className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-medium transition-all ${
            activeTab === "suggested" 
              ? "bg-ink text-cream" 
              : "bg-white border border-border text-ink hover:border-ink/30"
          }`}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
            <circle cx="9" cy="7" r="4" />
            <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
            <path d="M16 3.13a4 4 0 0 1 0 7.75" />
          </svg>
          Suggested
        </button>
      </div>

      {/* Creator List */}
      <div className="bg-white rounded-3xl border border-border overflow-hidden">
        {activeTab === "trending" ? (
          trendingCreators.map((creator, index) => (
            <div key={creator.handle}>
              <div className="flex items-center gap-4 px-5 py-4">
                {/* Avatar */}
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-terracotta/20 to-terracotta/40 flex items-center justify-center flex-shrink-0">
                  <span className="text-terracotta font-semibold text-xl">{creator.initial}</span>
                </div>
                
                {/* Info */}
                <div className="flex-1 min-w-0">
                  <div className="font-semibold text-ink">{creator.name}</div>
                  <div className="text-sm text-ink-light">{creator.followers} · {creator.category}</div>
                </div>
                
                {/* Action */}
                <button className="text-sm font-medium text-ink-light hover:text-ink transition-colors">
                  View
                </button>
              </div>
              
              {index < trendingCreators.length - 1 && (
                <div className="h-px bg-border mx-5" />
              )}
            </div>
          ))
        ) : (
          suggestedCreators.map((creator, index) => (
            <div key={creator.handle}>
              <div className="flex items-center gap-4 px-5 py-4">
                {/* Avatar */}
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-terracotta/20 to-terracotta/40 flex items-center justify-center flex-shrink-0">
                  <span className="text-terracotta font-semibold text-xl">{creator.initial}</span>
                </div>
                
                {/* Info */}
                <div className="flex-1 min-w-0">
                  <div className="font-semibold text-ink">{creator.name}</div>
                  <div className="text-sm text-ink-light">{creator.mutuals} mutuals · {creator.category}</div>
                </div>
                
                {/* Action */}
                <button className="text-sm font-medium text-ink-light hover:text-ink transition-colors">
                  View
                </button>
              </div>
              
              {index < suggestedCreators.length - 1 && (
                <div className="h-px bg-border mx-5" />
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
}

// Chat Tab - Conversation with Emma AI Assistant
function ChatTab() {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: "emma",
      text: "Hey! I'm Emma, your creator assistant. How can I help you today?",
      time: "10:30 AM",
    },
    {
      id: 2,
      sender: "emma",
      text: "Nike responded to your outreach — want me to help with a reply?",
      time: "10:31 AM",
    },
    {
      id: 3,
      sender: "user",
      text: "Yes! Can you help me negotiate a better rate?",
      time: "10:35 AM",
    },
    {
      id: 4,
      sender: "emma",
      text: "Based on your engagement (45K avg views, 8% engagement), I'd suggest asking for 20-30% more. Here's a draft:\n\n\"Thanks for reaching out! I'd love to partner with Nike. Given my recent performance, I'd propose $X. Happy to discuss further.\"",
      time: "10:36 AM",
    },
  ]);

  const handleSend = () => {
    if (!message.trim()) return;
    
    const newMessage = {
      id: messages.length + 1,
      sender: "user" as const,
      text: message,
      time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };
    
    setMessages([...messages, newMessage]);
    setMessage("");
    
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          id: prev.length + 1,
          sender: "emma",
          text: "Let me think about that...",
          time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        },
      ]);
    }, 1000);
  };

  return (
    <div className="h-full flex flex-col">
      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-6 py-4 space-y-3">
        {messages.map((msg, index) => {
          const isUser = msg.sender === "user";
          const showEmmaLabel = !isUser && (index === 0 || messages[index - 1].sender === "user");
          
          return (
            <div key={msg.id}>
              {showEmmaLabel && (
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-6 h-6 rounded-full bg-terracotta flex items-center justify-center">
                    <span className="text-white text-[10px] font-medium">E</span>
                  </div>
                  <span className="text-xs font-medium text-ink">Emma</span>
                </div>
              )}
              <div className={`flex ${isUser ? "justify-end" : "justify-start"}`}>
                <div
                  className={`max-w-[85%] px-4 py-2.5 text-sm ${
                    isUser
                      ? "bg-ink text-cream rounded-2xl rounded-br-sm"
                      : "bg-white text-ink rounded-2xl rounded-tl-sm"
                  }`}
                >
                  <p className="whitespace-pre-wrap">{msg.text}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Input Area */}
      <div className="px-4 pb-4 pt-2">
        <div className="flex items-center gap-2 bg-white rounded-full border border-border px-4 py-2">
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                handleSend();
              }
            }}
            placeholder="Message Emma..."
            className="flex-1 text-sm text-ink placeholder:text-ink-lighter focus:outline-none bg-transparent"
          />
          <button
            onClick={handleSend}
            disabled={!message.trim()}
            className={`p-2 rounded-full transition-all ${
              message.trim()
                ? "bg-terracotta text-white"
                : "text-ink-lighter"
            }`}
          >
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}

// Inbox Tab
function InboxTab() {
  const [activeTab, setActiveTab] = useState<"labels" | "drafts">("labels");
  const [negotiationTone, setNegotiationTone] = useState<"Soft" | "Standard" | "Firm">("Firm");
  
  const labelCategories = [
    { name: "New Brand Deal", color: "bg-[#D4E9D7] text-[#3D6B47]" },
    { name: "Existing Deal", color: "bg-[#D6E4E8] text-[#3D6B73]" },
    { name: "Gifting", color: "bg-[#F5E6D3] text-[#8B6914]" },
    { name: "Event", color: "bg-[#FADCD9] text-[#9E4A42]" },
    { name: "PR Request", color: "bg-[#E8E4DE] text-[#6B6660]" },
    { name: "Fan Mail", color: "bg-[#E5D4E7] text-[#7B5A7E]" },
    { name: "Scam", color: "bg-[#F2D4D0] text-[#A84B3F]" },
    { name: "Other", color: "bg-[#E0DCD6] text-[#6E6962]" },
  ];

  const labelsApplied = [
    { name: "Other", color: "bg-[#A39E97]", count: 79 },
    { name: "google_workspace", color: "bg-[#8B8680]", count: 15 },
    { name: "New Brand Deal", color: "bg-[#6B9E74]", count: 4 },
    { name: "Event", color: "bg-[#C4837B]", count: 2 },
    { name: "Gifting", color: "bg-[#C9A962]", count: 2 },
  ];

  const totalEmails = labelsApplied.reduce((sum, l) => sum + l.count, 0);

  return (
    <div className="h-full overflow-y-auto px-6 py-4">
      {/* Tab Pills */}
      <div className="flex gap-2 mb-5">
        <button 
          onClick={() => setActiveTab("labels")}
          className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-medium transition-all ${
            activeTab === "labels" 
              ? "bg-ink text-cream" 
              : "bg-white border border-border text-ink hover:border-ink/30"
          }`}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z" />
            <line x1="7" y1="7" x2="7.01" y2="7" />
          </svg>
          Email Labels
        </button>
        <button 
          onClick={() => setActiveTab("drafts")}
          className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-medium transition-all ${
            activeTab === "drafts" 
              ? "bg-ink text-cream" 
              : "bg-white border border-border text-ink hover:border-ink/30"
          }`}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M12 20h9" />
            <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" />
          </svg>
          Draft Replies
        </button>
      </div>

      {activeTab === "labels" ? (
        <>
          {/* Connected Account Card */}
          <div className="bg-white rounded-3xl border border-border overflow-hidden mb-5">
            <div className="flex items-center gap-4 p-5">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-green-400 to-green-500 flex items-center justify-center text-white font-semibold">
                N
              </div>
              <div className="flex-1 min-w-0">
                <div className="font-semibold text-ink">niall.wade@getretrograde.ai</div>
                <div className="flex items-center gap-1.5 mt-0.5">
                  <div className="w-2 h-2 rounded-full bg-green-500" />
                  <span className="text-sm text-green-600">Connected</span>
                </div>
              </div>
              <button className="text-sm text-ink-light hover:text-ink transition-colors">
                Manage
              </button>
            </div>
          </div>

          {/* Label Categories */}
          <div className="mb-5">
            <h3 className="text-sm font-medium text-ink mb-3">Label categories</h3>
            <div className="flex flex-wrap gap-2">
              {labelCategories.map((label) => (
                <span
                  key={label.name}
                  className={`px-3 py-1.5 rounded-full text-xs font-medium ${label.color}`}
                >
                  {label.name}
                </span>
              ))}
            </div>
          </div>

          {/* Labels Applied Card */}
          <div className="bg-white rounded-3xl border border-border overflow-hidden">
            <div className="p-5 pb-4">
              <div className="flex items-center gap-2">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-ink-light">
                  <path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z" />
                  <line x1="7" y1="7" x2="7.01" y2="7" />
                </svg>
                <span className="text-xl font-semibold text-ink" style={{ fontFamily: "var(--font-display)" }}>Labels applied</span>
              </div>
              <p className="text-sm text-ink-light mt-1">{totalEmails} emails categorized</p>
            </div>
            
            <div className="px-5 pb-5">
              {labelsApplied.map((label, index) => (
                <div key={label.name}>
                  <div className="flex items-center gap-3 py-3">
                    <div className={`w-3 h-3 rounded-full ${label.color}`} />
                    <span className="text-sm text-ink flex-1">{label.name}</span>
                    <div className="w-20 h-2 bg-border rounded-full overflow-hidden">
                      <div
                        className={`h-full rounded-full ${label.color}`}
                        style={{ width: `${(label.count / totalEmails) * 100}%` }}
                      />
                    </div>
                    <span className="text-sm font-medium text-ink w-8 text-right">{label.count}</span>
                  </div>
                  {index < labelsApplied.length - 1 && (
                    <div className="h-px bg-border" />
                  )}
                </div>
              ))}
            </div>
          </div>

          <p className="text-xs text-ink-lighter text-center mt-4">
            Emails are automatically categorized as they arrive
          </p>
        </>
      ) : (
        <>
          {/* Connected Account Card */}
          <div className="bg-white rounded-3xl border border-border overflow-hidden mb-5">
            <div className="flex items-center gap-4 p-5">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-green-400 to-green-500 flex items-center justify-center text-white font-semibold">
                N
              </div>
              <div className="flex-1 min-w-0">
                <div className="font-semibold text-ink">niall.wade@getretrograde.ai</div>
                <div className="flex items-center gap-1.5 mt-0.5">
                  <div className="w-2 h-2 rounded-full bg-green-500" />
                  <span className="text-sm text-green-600">Connected</span>
                </div>
              </div>
              <button className="text-sm text-ink-light hover:text-ink transition-colors">
                Manage
              </button>
            </div>
          </div>

          {/* Negotiation Settings Card */}
          <div className="bg-white rounded-3xl border border-border overflow-hidden mb-5">
            <div className="p-5">
              <h2 className="text-xl font-semibold text-ink mb-1" style={{ fontFamily: "var(--font-display)" }}>
                Negotiation settings
              </h2>
              <p className="text-sm text-ink-light">Controls the tone and rate stance in generated drafts</p>
              
              <div className="flex gap-2 mt-4 bg-cream rounded-2xl p-1.5">
                {(["Soft", "Standard", "Firm"] as const).map((tone) => (
                  <button
                    key={tone}
                    onClick={() => setNegotiationTone(tone)}
                    className={`flex-1 py-2.5 rounded-xl text-sm font-medium transition-all ${
                      negotiationTone === tone
                        ? "bg-white text-ink shadow-sm"
                        : "text-ink-light hover:text-ink"
                    }`}
                  >
                    {tone}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <p className="text-xs text-ink-lighter text-center mt-4">
            Automatically generate draft replies for incoming brand deal emails
          </p>
        </>
      )}
    </div>
  );
}

