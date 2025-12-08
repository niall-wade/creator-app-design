"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

type Tab = "outreach" | "discover" | "chat" | "inbox" | "deals";

export default function Home() {
  return (
    <Suspense fallback={<div className="h-dvh bg-cream" />}>
      <HomeContent />
    </Suspense>
  );
}

function HomeContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<Tab>("outreach");
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [chatMessage, setChatMessage] = useState("");
  const [chatMessages, setChatMessages] = useState<{ id: number; sender: string; text: string; time: string }[]>([]);
  const [showChatWelcome, setShowChatWelcome] = useState(true);
  const [showInstallDrawer, setShowInstallDrawer] = useState(false);

  // Check if user is viewing in browser (not installed as PWA)
  useEffect(() => {
    // Check if running as installed PWA
    const isStandalone = 
      window.matchMedia('(display-mode: standalone)').matches || 
      (window.navigator as Navigator & { standalone?: boolean }).standalone === true;
    
    // Check if coming from onboarding
    const fromOnboarding = searchParams.get("fromOnboarding") === "true";
    
    // Only show install prompt if not already installed as PWA
    if (!isStandalone) {
      if (fromOnboarding) {
        // Always show when coming from onboarding
        const timer = setTimeout(() => {
          setShowInstallDrawer(true);
        }, 800);
        return () => clearTimeout(timer);
      } else {
        // Otherwise, only show if they haven't seen it before
        const hasSeenInstallDrawer = localStorage.getItem("hasSeenInstallDrawer");
        if (!hasSeenInstallDrawer) {
          const timer = setTimeout(() => {
            setShowInstallDrawer(true);
          }, 800);
          return () => clearTimeout(timer);
        }
      }
    }
  }, [searchParams]);

  const dismissInstallDrawer = () => {
    setShowInstallDrawer(false);
    localStorage.setItem("hasSeenInstallDrawer", "true");
  };

  const handleSendChat = (message?: string) => {
    const textToSend = message || chatMessage;
    if (!textToSend.trim()) return;
    
    setShowChatWelcome(false);
    
    const newMessage = {
      id: chatMessages.length + 1,
      sender: "user" as const,
      text: textToSend,
      time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };
    setChatMessages([...chatMessages, newMessage]);
    setChatMessage("");
    
    setTimeout(() => {
      setChatMessages((prev) => [
        ...prev,
        { id: prev.length + 1, sender: "emma", text: "Let me think about that...", time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }) },
      ]);
    }, 1000);
  };

  const handlePromptClick = (prompt: string) => {
    handleSendChat(prompt);
  };

  const handleLoadChat = (chatId: number) => {
    // Load a past chat - in a real app this would fetch from a database
    const sampleChats: Record<number, { id: number; sender: string; text: string; time: string }[]> = {
      1: [
        { id: 1, sender: "user", text: "Can you help me negotiate a better rate with Nike?", time: "10:30 AM" },
        { id: 2, sender: "emma", text: "Based on your engagement (45K avg views, 8% engagement), I'd suggest asking for 20-30% more. Here's a draft:\n\n\"Thanks for reaching out! I'd love to partner with Nike. Given my recent performance, I'd propose $X. Happy to discuss further.\"", time: "10:31 AM" },
      ],
      2: [
        { id: 1, sender: "user", text: "Help me plan my content for next week", time: "2:15 PM" },
        { id: 2, sender: "emma", text: "Here's a suggested posting schedule for next week:\n\n• Monday: Behind-the-scenes reel\n• Wednesday: Product review\n• Friday: Q&A stories\n• Sunday: Weekly recap", time: "2:16 PM" },
      ],
      3: [
        { id: 1, sender: "user", text: "Compare the Glossier and Fenty brand deal offers", time: "11:00 AM" },
        { id: 2, sender: "emma", text: "Comparing the Glossier and Fenty offers:\n\n**Glossier:** $2,500 for 2 posts + stories\n**Fenty:** $3,000 for 3 posts\n\nFenty offers better per-post rate, but Glossier has less deliverables. I'd recommend Glossier for work-life balance.", time: "11:01 AM" },
      ],
      4: [
        { id: 1, sender: "user", text: "Draft responses for my pending brand emails", time: "9:00 AM" },
        { id: 2, sender: "emma", text: "I've drafted 3 responses for your pending emails:\n\n1. **Sephora** - Accepted with counter-offer\n2. **Revolve** - Polite decline (conflicts with existing deal)\n3. **Alo Yoga** - Request for more details", time: "9:02 AM" },
      ],
      5: [
        { id: 1, sender: "user", text: "Review my current rate card", time: "3:30 PM" },
        { id: 2, sender: "emma", text: "Your current rates are competitive for your niche. Based on industry standards:\n\n• Instagram Post: $500-800 ✓\n• Reel: $800-1200 ✓\n• Story Set: $300-500 ✓\n\nYou could increase reel rates by 15% given your engagement.", time: "3:32 PM" },
      ],
    };
    
    const loadedMessages = sampleChats[chatId] || [];
    setChatMessages(loadedMessages);
    setShowChatWelcome(false);
  };

  const tabs: { id: Tab; label: string; icon: React.ReactNode }[] = [
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
      id: "deals",
      label: "Deals",
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <rect x="2" y="7" width="20" height="14" rx="2" ry="2" />
          <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
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
  ];

  const renderContent = () => {
    switch (activeTab) {
      case "deals":
        return <DealsTab />;
      case "outreach":
        return <OutreachTab />;
      case "discover":
        return <DiscoverTab />;
      case "chat":
        return <ChatTab messages={chatMessages} onPromptClick={handlePromptClick} showWelcome={showChatWelcome} onLoadChat={handleLoadChat} />;
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
          <path d="M63 225H271.5C309.884 225 341 256.116 341 294.5V294.5C341 332.884 309.884 364 271.5 364H63V225Z" fill="#E25D33"/>
        </svg>
        <div className="relative">
          <button 
            onClick={() => setShowProfileMenu(!showProfileMenu)}
            className="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-900 to-purple-900 flex items-center justify-center overflow-hidden"
          >
            {/* Dark abstract avatar */}
            <div className="w-full h-full bg-gradient-to-br from-indigo-800 via-purple-900 to-indigo-950" />
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

      {/* Bottom Navigation / Chat Input */}
      <nav className="px-6 pb-8 pt-3 bg-cream flex-shrink-0">
        <motion.div 
          layout
          className="flex items-center justify-center gap-3"
          transition={{ type: "spring", stiffness: 500, damping: 35 }}
        >
          <motion.div 
            layout
            className={`bg-white/80 backdrop-blur-xl rounded-full border border-border overflow-hidden ${
              activeTab === "chat" ? "flex-1" : ""
            }`}
            transition={{ type: "spring", stiffness: 500, damping: 35 }}
          >
            <AnimatePresence mode="popLayout" initial={false}>
              {activeTab === "chat" ? (
                <motion.div
                  key="chat-input"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.08 }}
                  className="flex items-center gap-2 p-1.5 pl-4 min-h-[66px]"
                >
                  <input
                    type="text"
                    value={chatMessage}
                    onChange={(e) => setChatMessage(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        e.preventDefault();
                        handleSendChat();
                      }
                    }}
                    placeholder="Message Emma..."
                    className="flex-1 text-sm text-ink placeholder:text-ink-lighter focus:outline-none bg-transparent"
                  />
                  <button
                    onClick={() => handleSendChat()}
                    disabled={!chatMessage.trim()}
                    className={`p-3 rounded-full transition-colors ${
                      chatMessage.trim()
                        ? "bg-terracotta text-white"
                        : "text-ink-lighter"
                    }`}
                  >
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M5 12h14M12 5l7 7-7 7" />
                    </svg>
                  </button>
                </motion.div>
              ) : (
                <motion.div
                  key="nav-tabs"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.08 }}
                  className="flex items-center justify-center gap-1 p-1.5"
                >
                  {tabs.map((tab) => (
                    <button
                      key={tab.id}
                      onClick={() => {
                        if (tab.id === "chat") {
                          setShowChatWelcome(true);
                          setChatMessages([]);
                        }
                        setActiveTab(tab.id);
                      }}
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
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
          
          {/* Close button */}
          <AnimatePresence mode="popLayout">
            {activeTab === "chat" && (
              <motion.button
                layout
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0 }}
                transition={{ type: "spring", stiffness: 500, damping: 30 }}
                onClick={() => setActiveTab("outreach")}
                className="p-3 rounded-full bg-white/80 backdrop-blur-xl border border-border text-ink-lighter hover:text-ink transition-colors min-h-[66px] min-w-[66px] flex items-center justify-center flex-shrink-0"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M18 6L6 18M6 6l12 12" />
                </svg>
              </motion.button>
            )}
          </AnimatePresence>
        </motion.div>
      </nav>

      {/* Install to Home Screen Drawer */}
      <InstallDrawer isOpen={showInstallDrawer} onClose={dismissInstallDrawer} />
    </main>
  );
}

// Add to Home Screen Drawer Component
function InstallDrawer({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-ink/40 z-50"
            onClick={onClose}
          />
          
          {/* Drawer */}
          <motion.div
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ type: "spring", damping: 28, stiffness: 350 }}
            className="fixed inset-x-0 bottom-0 z-50 max-w-md mx-auto"
          >
            <div className="bg-cream rounded-t-3xl overflow-hidden shadow-2xl">
              {/* Handle */}
              <div className="flex justify-center pt-3 pb-1">
                <div className="w-10 h-1 rounded-full bg-ink/10" />
              </div>
              
              {/* Content */}
              <div className="px-6 pb-8 pt-4">
                {/* Header */}
                <div className="mb-6">
                  <h2 className="text-2xl font-semibold text-ink mb-1" style={{ fontFamily: "var(--font-display)" }}>
                    Install the app
                  </h2>
                  <p className="text-sm text-ink-light">
                    Add Retrograde to your home screen for the best experience
                  </p>
                </div>
                
                {/* Steps - Connected Timeline */}
                <div className="bg-white rounded-2xl p-5 mb-6 border border-border">
                  <div className="relative">
                    {/* Vertical connector line */}
                    <div className="absolute left-5 top-10 bottom-10 w-px bg-border" />
                    
                    {/* Step 1 */}
                    <div className="relative flex gap-4 pb-6">
                      <div className="w-10 h-10 rounded-xl bg-white border border-border flex items-center justify-center flex-shrink-0 z-10">
                        {/* Three dots menu icon (horizontal) */}
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" className="text-ink">
                          <circle cx="5" cy="12" r="2" fill="currentColor"/>
                          <circle cx="12" cy="12" r="2" fill="currentColor"/>
                          <circle cx="19" cy="12" r="2" fill="currentColor"/>
                        </svg>
                      </div>
                      <div className="flex-1 pt-2">
                        <p className="text-sm text-ink">
                          Tap <span className="font-semibold">• • •</span> in the bottom right
                        </p>
                      </div>
                    </div>
                    
                    {/* Step 2 */}
                    <div className="relative flex gap-4 pb-6">
                      <div className="w-10 h-10 rounded-xl bg-white border border-border flex items-center justify-center flex-shrink-0 z-10">
                        {/* iOS Share Icon */}
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" className="text-ink">
                          <path d="M12 3L12 15" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                          <path d="M8 7L12 3L16 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                          <path d="M4 14V19C4 20.1046 4.89543 21 6 21H18C19.1046 21 20 20.1046 20 19V14" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                        </svg>
                      </div>
                      <div className="flex-1 pt-2">
                        <p className="text-sm text-ink">
                          Tap <span className="font-semibold">Share</span>
                        </p>
                      </div>
                    </div>
                    
                    {/* Step 3 */}
                    <div className="relative flex gap-4 pb-6">
                      <div className="w-10 h-10 rounded-xl bg-white border border-border flex items-center justify-center flex-shrink-0 z-10">
                        {/* Add to Home Screen Icon */}
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" className="text-ink">
                          <rect x="3" y="3" width="18" height="18" rx="4" stroke="currentColor" strokeWidth="2"/>
                          <path d="M12 8V16M8 12H16" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                        </svg>
                      </div>
                      <div className="flex-1 pt-2">
                        <p className="text-sm text-ink">
                          Tap <span className="font-semibold">Add to Home Screen</span>
                        </p>
                      </div>
                    </div>
                    
                    {/* Step 4 */}
                    <div className="relative flex gap-4">
                      <div className="w-10 h-10 rounded-xl bg-terracotta flex items-center justify-center flex-shrink-0 z-10">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" className="text-white">
                          <path d="M5 12l5 5L20 7" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </div>
                      <div className="flex-1 pt-2">
                        <p className="text-sm text-ink">
                          Tap <span className="font-semibold text-terracotta">Add</span> to confirm
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* CTA */}
                <button
                  onClick={onClose}
                  className="w-full py-4 rounded-2xl bg-ink text-cream font-medium hover:bg-ink/90 transition-colors"
                >
                  Got it
                </button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

// Outreach Tab
function OutreachTab() {
  const [outreachState, setOutreachState] = useState<"idle" | "selecting" | "loading" | "results" | "history-detail">("idle");
  const [brandCount, setBrandCount] = useState(10);
  const [generatedBrands, setGeneratedBrands] = useState<{ id: number; name: string; category: string; email: string; contactEmail: string }[]>([]);
  const [selectedHistoryId, setSelectedHistoryId] = useState<number | null>(null);
  
  const usageRemaining = 1000;
  const usageUsed = 47;

  // History of past brand matches with their brands
  const brandMatchHistory = [
    { 
      id: 1, 
      date: "Dec 5, 2025", 
      brands: [
        { id: 1, name: "Glossier", category: "Beauty", email: "Hi Sarah,\n\nLove what Glossier is doing with clean beauty! I've been using your Cloud Paint for years and my audience always asks about it.\n\nWould love to explore a partnership for my upcoming skincare series.\n\nBest,\n[Your name]", contactEmail: "partnerships@glossier.com" },
        { id: 2, name: "Allbirds", category: "Fashion", email: "Hi Team,\n\nAs someone passionate about sustainable fashion, I've been a huge fan of Allbirds' mission.\n\nI'd love to feature your new collection in my sustainability-focused content this month.\n\nLooking forward to connecting!\n\n[Your name]", contactEmail: "creators@allbirds.com" },
        { id: 3, name: "Athletic Greens", category: "Wellness", email: "Hey AG Team,\n\nI've been incorporating AG1 into my morning routine and my community has been asking about it non-stop.\n\nWould love to discuss a collaboration that feels authentic to my wellness content.\n\nCheers,\n[Your name]", contactEmail: "influencers@athleticgreens.com" },
        { id: 4, name: "Notion", category: "Tech", email: "Hi Notion Team,\n\nAs a creator, Notion has transformed how I organize my content calendar and brand partnerships.\n\nI'd love to create a \"Creator's Workspace\" template and share how I use Notion with my audience.\n\nBest,\n[Your name]", contactEmail: "creators@notion.so" },
        { id: 5, name: "Oura", category: "Health Tech", email: "Hi there,\n\nI've been tracking my sleep with Oura Ring and the insights have been game-changing for my productivity content.\n\nWould love to share my experience with my health-conscious audience.\n\nWarm regards,\n[Your name]", contactEmail: "partnerships@ouraring.com" },
        { id: 6, name: "Gymshark", category: "Fitness", email: "Hey Gymshark Team,\n\nI've been wearing Gymshark for my workout content and my followers constantly ask where my gear is from.\n\nWould love to partner on showcasing the new collection!\n\nBest,\n[Your name]", contactEmail: "creators@gymshark.com" },
        { id: 7, name: "Ritual", category: "Wellness", email: "Hi Ritual Team,\n\nI'm passionate about transparent wellness brands, and Ritual's approach to vitamins really resonates with me.\n\nLet's chat about a potential collaboration!\n\nWarm regards,\n[Your name]", contactEmail: "partnerships@ritual.com" },
        { id: 8, name: "Away", category: "Travel", email: "Hi Away Team,\n\nAs a creator who travels frequently, I've been eyeing your luggage for my upcoming content series.\n\nWould love to explore a partnership!\n\nBest,\n[Your name]", contactEmail: "influencers@awaytravel.com" },
        { id: 9, name: "Mejuri", category: "Jewelry", email: "Hi Mejuri Team,\n\nYour everyday luxury pieces are exactly what my audience loves. I'd love to feature them in my styling content.\n\nLooking forward to connecting!\n\n[Your name]", contactEmail: "creators@mejuri.com" },
        { id: 10, name: "Patagonia", category: "Outdoor", email: "Hi Patagonia Team,\n\nYour commitment to sustainability aligns perfectly with my content values. Would love to discuss a collaboration.\n\nBest,\n[Your name]", contactEmail: "partnerships@patagonia.com" },
        { id: 11, name: "Headspace", category: "Wellness", email: "Hi Headspace Team,\n\nMental health is central to my content, and I've been using your app daily. Would love to share my journey with my audience.\n\nWarm regards,\n[Your name]", contactEmail: "creators@headspace.com" },
        { id: 12, name: "Casper", category: "Home", email: "Hi Casper Team,\n\nSleep content performs incredibly well with my audience. I'd love to feature your products in my wellness series.\n\nBest,\n[Your name]", contactEmail: "influencers@casper.com" },
      ],
      status: "sent" as const 
    },
    { 
      id: 2, 
      date: "Dec 1, 2025", 
      brands: [
        { id: 1, name: "Warby Parker", category: "Eyewear", email: "Hi Warby Parker Team,\n\nI love your approach to affordable, stylish eyewear. Would be great to collaborate on some content!\n\nLooking forward to it,\n[Your name]", contactEmail: "partnerships@warbyparker.com" },
        { id: 2, name: "Everlane", category: "Fashion", email: "Hi Everlane Team,\n\nTransparent pricing and sustainable fashion? That's exactly what my audience cares about. Let's work together!\n\nBest,\n[Your name]", contactEmail: "creators@everlane.com" },
        { id: 3, name: "Calm", category: "Wellness", email: "Hi Calm Team,\n\nI've been using Calm for years and it's genuinely improved my sleep. Would love to share this with my followers.\n\nWarm regards,\n[Your name]", contactEmail: "influencers@calm.com" },
        { id: 4, name: "Lululemon", category: "Fitness", email: "Hi Lululemon Team,\n\nYour athleisure pieces are staples in my wardrobe. Would love to create content featuring the new collection.\n\nBest,\n[Your name]", contactEmail: "creators@lululemon.com" },
        { id: 5, name: "Aesop", category: "Beauty", email: "Hi Aesop Team,\n\nYour products have been part of my skincare routine for years. I'd love to showcase them to my beauty-focused audience.\n\nWarm regards,\n[Your name]", contactEmail: "partnerships@aesop.com" },
        { id: 6, name: "Brooklinen", category: "Home", email: "Hi Brooklinen Team,\n\nQuality bedding makes such a difference! I'd love to feature your products in my home content.\n\nBest,\n[Your name]", contactEmail: "influencers@brooklinen.com" },
        { id: 7, name: "Outdoor Voices", category: "Fitness", email: "Hi OV Team,\n\n'Doing Things' is my mantra! Would love to partner on some active lifestyle content.\n\nLooking forward to connecting!\n\n[Your name]", contactEmail: "creators@outdoorvoices.com" },
        { id: 8, name: "Dyson", category: "Tech", email: "Hi Dyson Team,\n\nYour innovative products always generate buzz with my audience. Would love to discuss a collaboration.\n\nBest,\n[Your name]", contactEmail: "partnerships@dyson.com" },
      ],
      status: "sent" as const 
    },
    { 
      id: 3, 
      date: "Nov 28, 2025", 
      brands: [
        { id: 1, name: "Recess", category: "Beverage", email: "Hi Recess Team,\n\nI love incorporating your drinks into my wellness content. Would be great to make it official!\n\nCheers,\n[Your name]", contactEmail: "partnerships@recess.com" },
        { id: 2, name: "Skims", category: "Fashion", email: "Hi Skims Team,\n\nYour inclusive approach to shapewear is something I'd love to highlight to my audience.\n\nBest,\n[Your name]", contactEmail: "creators@skims.com" },
        { id: 3, name: "Whoop", category: "Health Tech", email: "Hi Whoop Team,\n\nI've been tracking my fitness with Whoop and my followers are curious about it. Let's create some content together!\n\nBest,\n[Your name]", contactEmail: "influencers@whoop.com" },
        { id: 4, name: "Seed", category: "Wellness", email: "Hi Seed Team,\n\nGut health is a hot topic with my audience. I'd love to share my experience with your probiotics.\n\nWarm regards,\n[Your name]", contactEmail: "partnerships@seed.com" },
        { id: 5, name: "Therabody", category: "Wellness", email: "Hi Therabody Team,\n\nRecovery content is huge with my fitness audience. Would love to feature the Theragun in my routine videos.\n\nBest,\n[Your name]", contactEmail: "creators@therabody.com" },
        { id: 6, name: "Glossier", category: "Beauty", email: "Hi Sarah,\n\nLove what Glossier is doing with clean beauty! I've been using your Cloud Paint for years and my audience always asks about it.\n\nWould love to explore a partnership for my upcoming skincare series.\n\nBest,\n[Your name]", contactEmail: "partnerships@glossier.com" },
        { id: 7, name: "Allbirds", category: "Fashion", email: "Hi Team,\n\nAs someone passionate about sustainable fashion, I've been a huge fan of Allbirds' mission.\n\nI'd love to feature your new collection in my sustainability-focused content this month.\n\nLooking forward to connecting!\n\n[Your name]", contactEmail: "creators@allbirds.com" },
        { id: 8, name: "Athletic Greens", category: "Wellness", email: "Hey AG Team,\n\nI've been incorporating AG1 into my morning routine and my community has been asking about it non-stop.\n\nWould love to discuss a collaboration that feels authentic to my wellness content.\n\nCheers,\n[Your name]", contactEmail: "influencers@athleticgreens.com" },
        { id: 9, name: "Notion", category: "Tech", email: "Hi Notion Team,\n\nAs a creator, Notion has transformed how I organize my content calendar and brand partnerships.\n\nI'd love to create a \"Creator's Workspace\" template and share how I use Notion with my audience.\n\nBest,\n[Your name]", contactEmail: "creators@notion.so" },
        { id: 10, name: "Oura", category: "Health Tech", email: "Hi there,\n\nI've been tracking my sleep with Oura Ring and the insights have been game-changing for my productivity content.\n\nWould love to share my experience with my health-conscious audience.\n\nWarm regards,\n[Your name]", contactEmail: "partnerships@ouraring.com" },
        { id: 11, name: "Gymshark", category: "Fitness", email: "Hey Gymshark Team,\n\nI've been wearing Gymshark for my workout content and my followers constantly ask where my gear is from.\n\nWould love to partner on showcasing the new collection!\n\nBest,\n[Your name]", contactEmail: "creators@gymshark.com" },
        { id: 12, name: "Ritual", category: "Wellness", email: "Hi Ritual Team,\n\nI'm passionate about transparent wellness brands, and Ritual's approach to vitamins really resonates with me.\n\nLet's chat about a potential collaboration!\n\nWarm regards,\n[Your name]", contactEmail: "partnerships@ritual.com" },
        { id: 13, name: "Away", category: "Travel", email: "Hi Away Team,\n\nAs a creator who travels frequently, I've been eyeing your luggage for my upcoming content series.\n\nWould love to explore a partnership!\n\nBest,\n[Your name]", contactEmail: "influencers@awaytravel.com" },
        { id: 14, name: "Mejuri", category: "Jewelry", email: "Hi Mejuri Team,\n\nYour everyday luxury pieces are exactly what my audience loves. I'd love to feature them in my styling content.\n\nLooking forward to connecting!\n\n[Your name]", contactEmail: "creators@mejuri.com" },
        { id: 15, name: "Patagonia", category: "Outdoor", email: "Hi Patagonia Team,\n\nYour commitment to sustainability aligns perfectly with my content values. Would love to discuss a collaboration.\n\nBest,\n[Your name]", contactEmail: "partnerships@patagonia.com" },
      ],
      status: "sent" as const 
    },
    { 
      id: 4, 
      date: "Nov 22, 2025", 
      brands: [
        { id: 1, name: "Headspace", category: "Wellness", email: "Hi Headspace Team,\n\nMental health is central to my content, and I've been using your app daily. Would love to share my journey with my audience.\n\nWarm regards,\n[Your name]", contactEmail: "creators@headspace.com" },
        { id: 2, name: "Casper", category: "Home", email: "Hi Casper Team,\n\nSleep content performs incredibly well with my audience. I'd love to feature your products in my wellness series.\n\nBest,\n[Your name]", contactEmail: "influencers@casper.com" },
        { id: 3, name: "Warby Parker", category: "Eyewear", email: "Hi Warby Parker Team,\n\nI love your approach to affordable, stylish eyewear. Would be great to collaborate on some content!\n\nLooking forward to it,\n[Your name]", contactEmail: "partnerships@warbyparker.com" },
        { id: 4, name: "Everlane", category: "Fashion", email: "Hi Everlane Team,\n\nTransparent pricing and sustainable fashion? That's exactly what my audience cares about. Let's work together!\n\nBest,\n[Your name]", contactEmail: "creators@everlane.com" },
        { id: 5, name: "Calm", category: "Wellness", email: "Hi Calm Team,\n\nI've been using Calm for years and it's genuinely improved my sleep. Would love to share this with my followers.\n\nWarm regards,\n[Your name]", contactEmail: "influencers@calm.com" },
        { id: 6, name: "Lululemon", category: "Fitness", email: "Hi Lululemon Team,\n\nYour athleisure pieces are staples in my wardrobe. Would love to create content featuring the new collection.\n\nBest,\n[Your name]", contactEmail: "creators@lululemon.com" },
        { id: 7, name: "Aesop", category: "Beauty", email: "Hi Aesop Team,\n\nYour products have been part of my skincare routine for years. I'd love to showcase them to my beauty-focused audience.\n\nWarm regards,\n[Your name]", contactEmail: "partnerships@aesop.com" },
        { id: 8, name: "Brooklinen", category: "Home", email: "Hi Brooklinen Team,\n\nQuality bedding makes such a difference! I'd love to feature your products in my home content.\n\nBest,\n[Your name]", contactEmail: "influencers@brooklinen.com" },
        { id: 9, name: "Outdoor Voices", category: "Fitness", email: "Hi OV Team,\n\n'Doing Things' is my mantra! Would love to partner on some active lifestyle content.\n\nLooking forward to connecting!\n\n[Your name]", contactEmail: "creators@outdoorvoices.com" },
        { id: 10, name: "Dyson", category: "Tech", email: "Hi Dyson Team,\n\nYour innovative products always generate buzz with my audience. Would love to discuss a collaboration.\n\nBest,\n[Your name]", contactEmail: "partnerships@dyson.com" },
      ],
      status: "sent" as const 
    },
  ];

  const handleViewHistory = (historyId: number) => {
    setSelectedHistoryId(historyId);
    setOutreachState("history-detail");
  };

  const selectedHistory = brandMatchHistory.find(h => h.id === selectedHistoryId);

  // Sample brand pool for generation
  const brandPool = [
    { name: "Glossier", category: "Beauty", email: "Hi Sarah,\n\nLove what Glossier is doing with clean beauty! I've been using your Cloud Paint for years and my audience always asks about it.\n\nWould love to explore a partnership for my upcoming skincare series.\n\nBest,\n[Your name]", contactEmail: "partnerships@glossier.com" },
    { name: "Allbirds", category: "Fashion", email: "Hi Team,\n\nAs someone passionate about sustainable fashion, I've been a huge fan of Allbirds' mission.\n\nI'd love to feature your new collection in my sustainability-focused content this month.\n\nLooking forward to connecting!\n\n[Your name]", contactEmail: "creators@allbirds.com" },
    { name: "Athletic Greens", category: "Wellness", email: "Hey AG Team,\n\nI've been incorporating AG1 into my morning routine and my community has been asking about it non-stop.\n\nWould love to discuss a collaboration that feels authentic to my wellness content.\n\nCheers,\n[Your name]", contactEmail: "influencers@athleticgreens.com" },
    { name: "Notion", category: "Tech", email: "Hi Notion Team,\n\nAs a creator, Notion has transformed how I organize my content calendar and brand partnerships.\n\nI'd love to create a \"Creator's Workspace\" template and share how I use Notion with my audience.\n\nBest,\n[Your name]", contactEmail: "creators@notion.so" },
    { name: "Oura", category: "Health Tech", email: "Hi there,\n\nI've been tracking my sleep with Oura Ring and the insights have been game-changing for my productivity content.\n\nWould love to share my experience with my health-conscious audience.\n\nWarm regards,\n[Your name]", contactEmail: "partnerships@ouraring.com" },
    { name: "Gymshark", category: "Fitness", email: "Hey Gymshark Team,\n\nI've been wearing Gymshark for my workout content and my followers constantly ask where my gear is from.\n\nWould love to partner on showcasing the new collection!\n\nBest,\n[Your name]", contactEmail: "creators@gymshark.com" },
    { name: "Ritual", category: "Wellness", email: "Hi Ritual Team,\n\nI'm passionate about transparent wellness brands, and Ritual's approach to vitamins really resonates with me.\n\nLet's chat about a potential collaboration!\n\nWarm regards,\n[Your name]", contactEmail: "partnerships@ritual.com" },
    { name: "Away", category: "Travel", email: "Hi Away Team,\n\nAs a creator who travels frequently, I've been eyeing your luggage for my upcoming content series.\n\nWould love to explore a partnership!\n\nBest,\n[Your name]", contactEmail: "influencers@awaytravel.com" },
    { name: "Mejuri", category: "Jewelry", email: "Hi Mejuri Team,\n\nYour everyday luxury pieces are exactly what my audience loves. I'd love to feature them in my styling content.\n\nLooking forward to connecting!\n\n[Your name]", contactEmail: "creators@mejuri.com" },
    { name: "Patagonia", category: "Outdoor", email: "Hi Patagonia Team,\n\nYour commitment to sustainability aligns perfectly with my content values. Would love to discuss a collaboration.\n\nBest,\n[Your name]", contactEmail: "partnerships@patagonia.com" },
    { name: "Headspace", category: "Wellness", email: "Hi Headspace Team,\n\nMental health is central to my content, and I've been using your app daily. Would love to share my journey with my audience.\n\nWarm regards,\n[Your name]", contactEmail: "creators@headspace.com" },
    { name: "Casper", category: "Home", email: "Hi Casper Team,\n\nSleep content performs incredibly well with my audience. I'd love to feature your products in my wellness series.\n\nBest,\n[Your name]", contactEmail: "influencers@casper.com" },
    { name: "Warby Parker", category: "Eyewear", email: "Hi Warby Parker Team,\n\nI love your approach to affordable, stylish eyewear. Would be great to collaborate on some content!\n\nLooking forward to it,\n[Your name]", contactEmail: "partnerships@warbyparker.com" },
    { name: "Everlane", category: "Fashion", email: "Hi Everlane Team,\n\nTransparent pricing and sustainable fashion? That's exactly what my audience cares about. Let's work together!\n\nBest,\n[Your name]", contactEmail: "creators@everlane.com" },
    { name: "Calm", category: "Wellness", email: "Hi Calm Team,\n\nI've been using Calm for years and it's genuinely improved my sleep. Would love to share this with my followers.\n\nWarm regards,\n[Your name]", contactEmail: "influencers@calm.com" },
    { name: "Lululemon", category: "Fitness", email: "Hi Lululemon Team,\n\nYour athleisure pieces are staples in my wardrobe. Would love to create content featuring the new collection.\n\nBest,\n[Your name]", contactEmail: "creators@lululemon.com" },
    { name: "Aesop", category: "Beauty", email: "Hi Aesop Team,\n\nYour products have been part of my skincare routine for years. I'd love to showcase them to my beauty-focused audience.\n\nWarm regards,\n[Your name]", contactEmail: "partnerships@aesop.com" },
    { name: "Brooklinen", category: "Home", email: "Hi Brooklinen Team,\n\nQuality bedding makes such a difference! I'd love to feature your products in my home content.\n\nBest,\n[Your name]", contactEmail: "influencers@brooklinen.com" },
    { name: "Outdoor Voices", category: "Fitness", email: "Hi OV Team,\n\n'Doing Things' is my mantra! Would love to partner on some active lifestyle content.\n\nLooking forward to connecting!\n\n[Your name]", contactEmail: "creators@outdoorvoices.com" },
    { name: "Dyson", category: "Tech", email: "Hi Dyson Team,\n\nYour innovative products always generate buzz with my audience. Would love to discuss a collaboration.\n\nBest,\n[Your name]", contactEmail: "partnerships@dyson.com" },
  ];

  const handleStartOutreach = () => {
    setOutreachState("loading");
    
    // Simulate loading for 2 seconds
    setTimeout(() => {
      // Randomly select brands
      const shuffled = [...brandPool].sort(() => 0.5 - Math.random());
      const selected = shuffled.slice(0, brandCount).map((brand, index) => ({
        ...brand,
        id: index + 1,
      }));
      setGeneratedBrands(selected);
      setOutreachState("results");
    }, 2000);
  };

  const handleBackToIdle = () => {
    setOutreachState("idle");
    setGeneratedBrands([]);
    setBrandCount(10);
  };

  // History Detail Screen
  if (outreachState === "history-detail" && selectedHistory) {
  return (
      <div className="h-full flex flex-col">
        {/* Header */}
        <div className="px-6 pt-4 pb-3 flex items-center justify-between border-b border-border">
          <button
            onClick={() => {
              setOutreachState("idle");
              setSelectedHistoryId(null);
            }}
            className="flex items-center gap-2 text-ink-light hover:text-ink transition-colors"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M19 12H5M12 19l-7-7 7-7" />
            </svg>
            <span className="text-sm font-medium">Back</span>
          </button>
          <div className="text-right">
            <div className="text-sm font-medium text-ink">{selectedHistory.date}</div>
            <div className="text-xs text-ink-light">{selectedHistory.brands.length} brands</div>
          </div>
        </div>

        {/* Brand List */}
        <div className="flex-1 overflow-y-auto px-6 py-4">
          <div className="space-y-3">
            {selectedHistory.brands.map((brand) => (
              <BrandEmailCard key={brand.id} brand={brand} showContactEmail />
            ))}
          </div>
          </div>
        </div>
    );
  }

  // Loading Screen
  if (outreachState === "loading") {
    return (
      <div className="h-full flex flex-col items-center justify-center px-6 py-4">
            <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center"
        >
          {/* Animated loader */}
          <div className="relative w-20 h-20 mx-auto mb-6">
            <motion.div
              className="absolute inset-0 rounded-full border-4 border-terracotta/20"
            />
            <motion.div
              className="absolute inset-0 rounded-full border-4 border-transparent border-t-terracotta"
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            />
            <div className="absolute inset-0 flex items-center justify-center">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-terracotta">
                <path d="M22 2L11 13" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M22 2L15 22L11 13L2 9L22 2Z" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
          </div>
          
          <h2 className="text-xl font-semibold text-ink mb-2" style={{ fontFamily: "var(--font-display)" }}>
            Finding your matches
                  </h2>
          <p className="text-sm text-ink-light">
            Matching you with {brandCount} brands in your niche...
          </p>
          
          {/* Progress dots */}
          <div className="flex items-center justify-center gap-1.5 mt-6">
            {[0, 1, 2].map((i) => (
              <motion.div
                key={i}
                className="w-2 h-2 rounded-full bg-terracotta"
                animate={{ opacity: [0.3, 1, 0.3] }}
                transition={{ duration: 1.2, repeat: Infinity, delay: i * 0.2 }}
              />
            ))}
          </div>
        </motion.div>
      </div>
    );
  }

  // Results Screen
  if (outreachState === "results") {
    return (
      <div className="h-full flex flex-col">
        {/* Header */}
        <div className="px-6 pt-4 pb-3 flex items-center justify-between">
                  <button
            onClick={handleBackToIdle}
            className="flex items-center gap-2 text-ink-light hover:text-ink transition-colors"
                  >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M19 12H5M12 19l-7-7 7-7" />
                    </svg>
            <span className="text-sm font-medium">Back</span>
                  </button>
          <div className="text-sm text-ink-light">
            {generatedBrands.length} brands matched
                </div>
        </div>

        {/* Success Banner */}
        <div className="px-6 mb-4">
          <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-2xl p-4 text-white">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
              </div>
              <div>
                <h3 className="font-semibold">Outreach ready!</h3>
                <p className="text-sm text-white/80">Review your {generatedBrands.length} personalized emails below</p>
              </div>
            </div>
          </div>
              </div>
              
              {/* Brand List */}
        <div className="flex-1 overflow-y-auto px-6 pb-4">
                <div className="space-y-3">
            {generatedBrands.map((brand) => (
              <BrandEmailCard key={brand.id} brand={brand} showContactEmail />
                  ))}
                </div>
              </div>
              
        {/* Footer CTA */}
              <div className="px-6 py-4 border-t border-border bg-cream">
                <button
            onClick={handleBackToIdle}
                  className="w-full py-3.5 rounded-2xl bg-terracotta text-white font-medium hover:bg-terracotta/90 transition-colors"
                >
            Send All Emails
                </button>
              </div>
      </div>
    );
  }

  // Selecting Screen (Brand count selector)
  if (outreachState === "selecting") {
    return (
      <div className="h-full overflow-y-auto px-6 py-4">
        {/* Back button */}
        <button
          onClick={() => setOutreachState("idle")}
          className="flex items-center gap-2 text-ink-light hover:text-ink transition-colors mb-6"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M19 12H5M12 19l-7-7 7-7" />
          </svg>
          <span className="text-sm font-medium">Back</span>
        </button>

        {/* Selection Card */}
        <div className="bg-white rounded-3xl border border-border p-6 mb-6">
          <h2 className="text-xl font-semibold text-ink mb-1" style={{ fontFamily: "var(--font-display)" }}>
            How many brands?
          </h2>
          <p className="text-sm text-ink-light mb-6">
            Select between 1-20 brands to match with
          </p>

          {/* Brand Count Selector */}
          <div className="mb-6">
            <div className="flex items-center justify-between mb-3">
              <span className="text-3xl font-bold text-terracotta">{brandCount}</span>
              <span className="text-sm text-ink-light">brands</span>
          </div>
            
            {/* Slider */}
            <input
              type="range"
              min="1"
              max="20"
              value={brandCount}
              onChange={(e) => setBrandCount(parseInt(e.target.value))}
              className="w-full h-2 bg-border rounded-full appearance-none cursor-pointer accent-terracotta"
              style={{
                background: `linear-gradient(to right, #E25D33 0%, #E25D33 ${(brandCount - 1) / 19 * 100}%, #E8E4DE ${(brandCount - 1) / 19 * 100}%, #E8E4DE 100%)`
              }}
            />
            
            <div className="flex justify-between text-xs text-ink-lighter mt-2">
              <span>1</span>
              <span>20</span>
        </div>
            </div>

          {/* Quick Select */}
          <div className="flex gap-2 mb-6">
            {[5, 10, 15, 20].map((num) => (
              <button
                key={num}
                onClick={() => setBrandCount(num)}
                className={`flex-1 py-2.5 rounded-xl text-sm font-medium transition-all ${
                  brandCount === num
                    ? "bg-terracotta text-white"
                    : "bg-cream text-ink hover:bg-cream-dark"
                }`}
              >
                {num}
              </button>
            ))}
      </div>

          {/* Usage Info */}
          <div className="bg-cream rounded-2xl p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-ink">Monthly usage</span>
              <span className="text-sm font-medium text-ink">{usageUsed + brandCount} / {usageRemaining}</span>
          </div>
            <div className="h-2 bg-border rounded-full overflow-hidden">
              <div 
                className="h-full bg-terracotta rounded-full transition-all"
                style={{ width: `${((usageUsed + brandCount) / usageRemaining) * 100}%` }}
              />
            </div>
            <p className="text-xs text-ink-lighter mt-2">
              {usageRemaining - usageUsed - brandCount} brands remaining this month
            </p>
          </div>
        </div>

        {/* Start Button */}
        <button
          onClick={handleStartOutreach}
          className="w-full py-4 rounded-2xl bg-terracotta text-white font-medium hover:bg-terracotta/90 transition-colors flex items-center justify-center gap-2"
        >
          <span>Start Outreach</span>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M22 2L11 13" />
            <path d="M22 2L15 22L11 13L2 9L22 2Z" />
          </svg>
        </button>
        </div>
    );
  }

  // Idle Screen (Main outreach page)
  return (
    <div className="h-full overflow-y-auto px-6 py-4">
      {/* Usage Card with Start Outreach Button */}
      <div className="bg-white rounded-3xl border border-border p-5 mb-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <div className="text-sm text-ink-lighter">Monthly brand usage</div>
            <div className="text-lg font-semibold text-ink">{usageUsed} / {usageRemaining} <span className="text-sm font-normal text-ink-light">brands</span></div>
          </div>
          <div className="text-right">
            <div className="text-sm text-ink-lighter">Remaining</div>
            <div className="text-lg font-semibold text-terracotta">{usageRemaining - usageUsed} <span className="text-sm font-normal">brands</span></div>
          </div>
        </div>
        <div className="h-2 bg-border rounded-full overflow-hidden mb-5">
          <div 
            className="h-full bg-terracotta rounded-full"
            style={{ width: `${(usageUsed / usageRemaining) * 100}%` }}
          />
        </div>
        
        {/* Start Outreach Button */}
        <motion.button
          onClick={() => setOutreachState("selecting")}
          className="w-full bg-terracotta rounded-2xl py-4 text-white font-semibold text-base text-center flex items-center justify-center gap-2 shadow-lg shadow-terracotta/25"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          Start Outreach
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M22 2L11 13" />
            <path d="M22 2L15 22L11 13L2 9L22 2Z" />
          </svg>
        </motion.button>
      </div>

      {/* Brand Matches History */}
      <div className="bg-white rounded-3xl border border-border overflow-hidden">
        <div className="p-5 pb-4">
          <h2 className="text-xl font-semibold text-ink" style={{ fontFamily: "var(--font-display)" }}>
            Brand Matches
          </h2>
          <p className="text-sm text-ink-light mt-0.5">Your outreach history</p>
        </div>
        
        <div className="px-5 pb-2">
          {brandMatchHistory.length === 0 ? (
            <div className="py-8 text-center">
              <div className="w-12 h-12 rounded-full bg-cream mx-auto mb-3 flex items-center justify-center">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-ink-lighter" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 2L11 13" />
                  <path d="M22 2L15 22L11 13L2 9L22 2Z" />
                </svg>
              </div>
              <p className="text-sm text-ink-light">No outreach yet</p>
              <p className="text-xs text-ink-lighter mt-1">Start your first outreach above</p>
            </div>
          ) : (
            brandMatchHistory.map((match, index) => (
              <div key={match.id}>
                <button
                  onClick={() => handleViewHistory(match.id)}
                  className="w-full flex items-center justify-between py-4 text-left hover:bg-cream/50 -mx-2 px-2 rounded-xl transition-colors"
                >
                  <div>
                    <span className="text-sm font-medium text-ink">{match.date}</span>
                    <div className="text-xs text-ink-light mt-0.5">{match.brands.length} brands</div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-terracotta font-medium">View</span>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-terracotta">
                      <path d="M9 18l6-6-6-6" />
                    </svg>
                  </div>
                </button>
                
                {index < brandMatchHistory.length - 1 && (
                  <div className="h-px bg-border" />
                )}
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

// Brand Email Card Component
function BrandEmailCard({ brand, showContactEmail = false }: { brand: { id: number; name: string; category: string; email: string; contactEmail?: string }; showContactEmail?: boolean }) {
  const [isExpanded, setIsExpanded] = useState(false);
  
  return (
    <motion.div
      className="bg-white rounded-2xl border border-border overflow-hidden"
      layout
    >
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full flex items-center gap-4 p-4 text-left"
      >
        {/* Brand Avatar */}
        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-terracotta/20 to-terracotta/40 flex items-center justify-center flex-shrink-0">
          <span className="text-terracotta font-semibold text-lg">{brand.name[0]}</span>
        </div>
        
        {/* Brand Info */}
        <div className="flex-1 min-w-0">
          <div className="font-semibold text-ink">{brand.name}</div>
          {showContactEmail && brand.contactEmail ? (
            <div className="text-xs text-ink-light truncate">{brand.contactEmail}</div>
          ) : (
          <div className="text-sm text-ink-light">{brand.category}</div>
          )}
        </div>
        
        {/* Expand Icon */}
        <motion.div
          animate={{ rotate: isExpanded ? 180 : 0 }}
          transition={{ duration: 0.2 }}
          className="text-ink-lighter"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="6 9 12 15 18 9" />
          </svg>
        </motion.div>
      </button>
      
      {/* Email Preview */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            <div className="px-4 pb-4">
              {showContactEmail && brand.contactEmail && (
                <div className="flex items-center gap-2 mb-3 text-ink-light">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                    <polyline points="22,6 12,13 2,6" />
                  </svg>
                  <span className="text-xs">{brand.contactEmail}</span>
                  <span className="text-xs px-2 py-0.5 rounded-full bg-cream text-ink-lighter">{brand.category}</span>
                </div>
              )}
              <div className="bg-cream rounded-xl p-4">
                <div className="flex items-center gap-2 mb-3">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-ink-light">
                    <path d="M12 20h9" />
                    <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" />
                  </svg>
                  <span className="text-xs font-medium text-ink-light">Draft email</span>
                </div>
                <p className="text-sm text-ink whitespace-pre-wrap leading-relaxed">{brand.email}</p>
              </div>
              <button className="w-full mt-3 py-2 text-sm font-medium text-terracotta hover:text-terracotta/80 transition-colors">
                Edit this email
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

// Discover Tab
function DiscoverTab() {
  const [activeTab, setActiveTab] = useState<"trending" | "suggested">("trending");

  const trendingCreators = [
    { name: "Emma Chamberlain", handle: "@emmachamberlain", followers: "12M", category: "Lifestyle", initial: "E", rank: 1, image: "/emma chamberlain.jpg" },
    { name: "Bretman Rock", handle: "@bretmanrock", followers: "8.5M", category: "Beauty", initial: "B", rank: 2, image: "/bretman rock.jpg" },
    { name: "Wisdom Kaye", handle: "@wisdm", followers: "4.2M", category: "Fashion", initial: "W", rank: 3, image: "/wisdom kaye.jpg" },
    { name: "Charli D'Amelio", handle: "@charlidamelio", followers: "55M", category: "Dance", initial: "C", rank: 4, image: "/Charli Damelio.jpg" },
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
                <div className="w-14 h-14 rounded-2xl overflow-hidden flex-shrink-0">
                  <img src={creator.image} alt={creator.name} className="w-full h-full object-cover" />
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
function ChatTab({ 
  messages, 
  onPromptClick,
  showWelcome,
  onLoadChat
}: { 
  messages: { id: number; sender: string; text: string; time: string }[];
  onPromptClick: (prompt: string) => void;
  showWelcome: boolean;
  onLoadChat: (chatId: number) => void;
}) {
  const [showHistory, setShowHistory] = useState(false);
  
  const suggestedPrompts = [
    "List the important emails I need to reply to",
    "What payments are due this week?",
    "Summarize today's top priorities",
    "Who do I need to follow up with?",
  ];

  const pastChats = [
    { id: 1, title: "Nike partnership negotiation", preview: "Based on your engagement, I'd suggest asking for 20-30% more...", date: "Today" },
    { id: 2, title: "Content calendar planning", preview: "Here's a suggested posting schedule for next week...", date: "Yesterday" },
    { id: 3, title: "Brand deal comparison", preview: "Comparing the Glossier and Fenty offers...", date: "Dec 3" },
    { id: 4, title: "Email response drafts", preview: "I've drafted 3 responses for your pending emails...", date: "Dec 2" },
    { id: 5, title: "Rate card review", preview: "Your current rates are competitive for your niche...", date: "Dec 1" },
  ];

  return (
    <div className="h-full flex flex-col">
      {showWelcome ? (
        showHistory ? (
          /* Chat History */
          <div className="flex-1 flex flex-col px-6 py-4">
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-ink" style={{ fontFamily: "var(--font-display)" }}>
                Past Chats
              </h2>
              <button
                onClick={() => setShowHistory(false)}
                className="text-sm font-medium text-terracotta hover:text-terracotta/80 transition-colors"
              >
                New Chat
              </button>
            </div>
            
            {/* Chat List */}
            <div className="flex-1 overflow-y-auto space-y-2">
              {pastChats.map((chat) => (
                <button
                  key={chat.id}
                  onClick={() => {
                    onLoadChat(chat.id);
                    setShowHistory(false);
                  }}
                  className="w-full text-left p-4 bg-white rounded-2xl border border-border hover:border-ink/20 transition-all"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex-1 min-w-0">
                      <div className="font-medium text-ink mb-1 truncate">{chat.title}</div>
                      <div className="text-sm text-ink-light line-clamp-2">{chat.preview}</div>
                    </div>
                    <span className="text-xs text-ink-lighter flex-shrink-0">{chat.date}</span>
                  </div>
                </button>
              ))}
            </div>
          </div>
        ) : (
          /* Welcome Screen */
          <motion.div 
            className="flex-1 flex flex-col items-center justify-center px-6 py-8"
            initial="hidden"
            animate="visible"
            variants={{
              hidden: {},
              visible: {
                transition: {
                  staggerChildren: 0.08,
                  delayChildren: 0.1
                }
              }
            }}
          >
            {/* Avatar */}
            <motion.div 
              className="w-20 h-20 rounded-full mb-6 overflow-hidden"
              variants={{
                hidden: { opacity: 0, scale: 0.8 },
                visible: { opacity: 1, scale: 1, transition: { type: "spring", stiffness: 300, damping: 20 } }
              }}
            >
              <img src="/Emma.png" alt="Emma" className="w-full h-full object-cover" />
            </motion.div>
            
            {/* Greeting */}
            <motion.h2 
              className="text-2xl font-semibold text-ink mb-8" 
              style={{ fontFamily: "var(--font-display)" }}
              variants={{
                hidden: { opacity: 0, y: 10 },
                visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 300, damping: 25 } }
              }}
            >
              Hey, how can I help?
            </motion.h2>
            
            {/* Prompt Suggestions */}
            <div className="w-full space-y-3">
              {suggestedPrompts.map((prompt) => (
                <motion.button
                  key={prompt}
                  variants={{
                    hidden: { opacity: 0, y: 15 },
                    visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 300, damping: 25 } }
                  }}
                  onClick={() => onPromptClick(prompt)}
                  className="w-full text-left px-5 py-4 bg-white rounded-2xl border border-border text-ink hover:border-ink/20 hover:shadow-sm transition-all"
                >
                  {prompt}
                </motion.button>
              ))}
            </div>
            
            {/* History Link */}
            <motion.button
              onClick={() => setShowHistory(true)}
              className="mt-6 flex items-center gap-2 text-sm text-ink-lighter hover:text-ink transition-colors"
              variants={{
                hidden: { opacity: 0 },
                visible: { opacity: 1, transition: { delay: 0.3 } }
              }}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10" />
                <polyline points="12 6 12 12 16 14" />
              </svg>
              View past chats
            </motion.button>
          </motion.div>
        )
      ) : (
        /* Messages */
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
      )}
    </div>
  );
}

// Inbox Tab
function InboxTab() {
  const [autoLabelEnabled, setAutoLabelEnabled] = useState(false);
  const [aiDraftEnabled, setAiDraftEnabled] = useState(false);
  const [emailLabelsExpanded, setEmailLabelsExpanded] = useState(false);

  // Toggle Switch Component
  const Toggle = ({ enabled, onToggle }: { enabled: boolean; onToggle: () => void }) => (
    <button
      onClick={onToggle}
      className={`relative w-12 h-7 rounded-full transition-colors ${
        enabled ? "bg-terracotta" : "bg-[#E8E4DE]"
      }`}
    >
      <motion.div
        className="absolute top-1 left-1 w-5 h-5 bg-white rounded-full shadow-sm"
        animate={{ x: enabled ? 20 : 0 }}
        transition={{ type: "spring", stiffness: 500, damping: 30 }}
      />
    </button>
  );

  return (
    <div className="h-full overflow-y-auto px-6 py-4">
      {/* Main Inbox Card */}
      <div className="bg-white rounded-3xl border border-border overflow-hidden mb-4">
        <div className="p-6">
          {/* Title & Description */}
          <h2 className="text-2xl font-semibold text-ink mb-2" style={{ fontFamily: "var(--font-display)" }}>
            Inbox
          </h2>
          <p className="text-ink-light text-sm leading-relaxed">
            Auto-label brand emails and get AI-drafted replies for incoming deals.
          </p>
          
          {/* Divider */}
          <div className="h-px bg-border my-5" />
          
          {/* Toggle Options */}
          <div className="space-y-1">
            {/* Auto-label Toggle */}
            <div className="flex items-center justify-between py-3">
              <span className="text-ink font-medium">Auto-label</span>
              <Toggle enabled={autoLabelEnabled} onToggle={() => setAutoLabelEnabled(!autoLabelEnabled)} />
            </div>
            
            {/* Divider */}
            <div className="h-px bg-border" />
            
            {/* AI Draft Replies Toggle */}
            <div className="flex items-center justify-between py-3">
              <span className="text-ink font-medium">AI Draft Replies</span>
              <Toggle enabled={aiDraftEnabled} onToggle={() => setAiDraftEnabled(!aiDraftEnabled)} />
            </div>
          </div>
          
          {/* Connected Email */}
          <div className="flex items-center gap-3 mt-4 pt-3">
            {/* Checkmark */}
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" className="text-blue-500 flex-shrink-0">
              <path d="M20 6L9 17L4 12" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            
            {/* Google Icon */}
            <svg width="18" height="18" viewBox="0 0 24 24" className="flex-shrink-0">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
            </svg>
            
            {/* Email */}
            <span className="text-ink text-sm flex-1">niall.wade@getretrograde.ai</span>
            
            {/* Info Icon */}
            <button className="w-6 h-6 rounded-full border border-blue-400 flex items-center justify-center text-blue-500 flex-shrink-0">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="12" y1="16" x2="12" y2="12" />
                <line x1="12" y1="8" x2="12.01" y2="8" />
              </svg>
            </button>
          </div>
        </div>
      </div>
      
      {/* Email Labels Expandable Section */}
      <div className="bg-white rounded-3xl border border-border overflow-hidden">
        <button
          onClick={() => setEmailLabelsExpanded(!emailLabelsExpanded)}
          className="w-full flex items-center justify-between p-5"
        >
          <span className="text-ink font-medium">Email Labels</span>
          <motion.div
            animate={{ rotate: emailLabelsExpanded ? 180 : 0 }}
            transition={{ duration: 0.2 }}
            className="text-ink-lighter"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="6 9 12 15 18 9" />
            </svg>
          </motion.div>
        </button>
        
        <AnimatePresence>
          {emailLabelsExpanded && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="overflow-hidden"
            >
              <div className="px-5 pb-5 pt-0">
                <div className="flex flex-wrap gap-2">
                  {[
                    { name: "New Brand Deal", color: "bg-[#D4E9D7] text-[#3D6B47]" },
                    { name: "Existing Deal", color: "bg-[#D6E4E8] text-[#3D6B73]" },
                    { name: "Gifting", color: "bg-[#F5E6D3] text-[#8B6914]" },
                    { name: "Event", color: "bg-[#FADCD9] text-[#9E4A42]" },
                    { name: "PR Request", color: "bg-[#E8E4DE] text-[#6B6660]" },
                    { name: "Fan Mail", color: "bg-[#E5D4E7] text-[#7B5A7E]" },
                    { name: "Scam", color: "bg-[#F2D4D0] text-[#A84B3F]" },
                    { name: "Other", color: "bg-[#E0DCD6] text-[#6E6962]" },
                  ].map((label) => (
                    <span
                      key={label.name}
                      className={`px-3 py-1.5 rounded-full text-xs font-medium ${label.color}`}
                    >
                      {label.name}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      
      {/* Footer Text */}
      <p className="text-sm text-ink-lighter text-center mt-6">
        Check your Gmail inbox to see labels and draft replies.
      </p>
    </div>
  );
}

// Deals Tab
function DealsTab() {
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

  const [activeFilter, setActiveFilter] = useState<DealStatus>("all");

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
    <div className="h-full overflow-y-auto px-6 py-4">
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
  );
}
