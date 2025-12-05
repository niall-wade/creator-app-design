"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";

export default function Settings() {
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [showCalendarTip, setShowCalendarTip] = useState(true);

  return (
    <main className="min-h-dvh bg-cream max-w-md mx-auto w-full">
      {/* Header */}
      <header className="px-6 pt-4 pb-2 flex items-center gap-4">
        <Link 
          href="/home"
          className="w-10 h-10 rounded-full flex items-center justify-center hover:bg-white/50 transition-colors"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-ink">
            <path d="M19 12H5M12 19l-7-7 7-7" />
          </svg>
        </Link>
        <h1 className="text-2xl font-semibold text-ink" style={{ fontFamily: "var(--font-display)" }}>
          Settings
        </h1>
      </header>

      <div className="px-6 py-4 space-y-6">
        {/* Account Section */}
        <section>
          <h2 className="text-sm font-semibold text-ink mb-3">Account</h2>
          <div className="bg-white rounded-2xl border border-border overflow-hidden">
            {/* Push Notifications */}
            <button 
              onClick={() => setNotificationsEnabled(!notificationsEnabled)}
              className="w-full flex items-center gap-3 px-4 py-3.5 hover:bg-cream/50 transition-colors"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-ink-light">
                <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
                <path d="M13.73 21a2 2 0 0 1-3.46 0" />
              </svg>
              <span className="flex-1 text-left text-sm text-ink">Push Notifications</span>
              <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${
                notificationsEnabled 
                  ? "bg-green-100 text-green-700" 
                  : "bg-ink-lighter/20 text-ink-lighter"
              }`}>
                {notificationsEnabled ? "Enabled" : "Disabled"}
              </span>
            </button>

            <div className="h-px bg-border mx-4" />

            {/* Logout */}
            <button className="w-full flex items-center gap-3 px-4 py-3.5 hover:bg-cream/50 transition-colors">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-ink-light">
                <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
                <polyline points="16 17 21 12 16 7" />
                <line x1="21" y1="12" x2="9" y2="12" />
              </svg>
              <span className="flex-1 text-left text-sm text-ink">Logout</span>
            </button>

            <div className="h-px bg-border mx-4" />

            {/* Delete Account */}
            <button className="w-full flex items-center gap-3 px-4 py-3.5 hover:bg-red-50 transition-colors">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-red-500">
                <polyline points="3 6 5 6 21 6" />
                <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
                <line x1="10" y1="11" x2="10" y2="17" />
                <line x1="14" y1="11" x2="14" y2="17" />
              </svg>
              <span className="flex-1 text-left text-sm text-red-500">Delete Account</span>
            </button>
          </div>
        </section>

        {/* Subscription Section */}
        <section>
          <h2 className="text-sm font-semibold text-ink mb-3">Subscription</h2>
          <div className="bg-white rounded-2xl border border-border overflow-hidden">
            <button className="w-full flex items-center gap-3 px-4 py-3.5 hover:bg-cream/50 transition-colors">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-ink-light">
                <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                <line x1="16" y1="2" x2="16" y2="6" />
                <line x1="8" y1="2" x2="8" y2="6" />
                <line x1="3" y1="10" x2="21" y2="10" />
              </svg>
              <span className="flex-1 text-left text-sm text-ink">Manage Subscription</span>
              <span className="text-xs font-medium px-2.5 py-1 rounded-full bg-terracotta/10 text-terracotta">
                Pro
              </span>
            </button>
          </div>

          {/* Tip Card */}
          {showCalendarTip && (
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-3 bg-white rounded-2xl border border-border p-4 relative"
            >
              <button 
                onClick={() => setShowCalendarTip(false)}
                className="absolute top-3 right-3 text-ink-lighter hover:text-ink transition-colors"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-terracotta/10 flex items-center justify-center flex-shrink-0">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-terracotta">
                    <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                    <line x1="16" y1="2" x2="16" y2="6" />
                    <line x1="8" y1="2" x2="8" y2="6" />
                    <line x1="3" y1="10" x2="21" y2="10" />
                  </svg>
                </div>
                <div className="pr-6">
                  <h3 className="text-sm font-semibold text-ink mb-1">Sync your campaigns</h3>
                  <p className="text-xs text-ink-light">
                    Connect your calendar to see upcoming brand deals and deadlines.
                  </p>
                </div>
              </div>
            </motion.div>
          )}
        </section>

        {/* Terms Section */}
        <section>
          <h2 className="text-sm font-semibold text-ink mb-3">Terms</h2>
          <div className="bg-white rounded-2xl border border-border overflow-hidden">
            <button className="w-full flex items-center gap-3 px-4 py-3.5 hover:bg-cream/50 transition-colors">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-ink-light">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                <polyline points="14 2 14 8 20 8" />
                <line x1="16" y1="13" x2="8" y2="13" />
                <line x1="16" y1="17" x2="8" y2="17" />
                <polyline points="10 9 9 9 8 9" />
              </svg>
              <span className="flex-1 text-left text-sm text-ink">Terms & Conditions</span>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-ink-lighter">
                <polyline points="9 18 15 12 9 6" />
              </svg>
            </button>

            <div className="h-px bg-border mx-4" />

            <button className="w-full flex items-center gap-3 px-4 py-3.5 hover:bg-cream/50 transition-colors">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-ink-light">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
              </svg>
              <span className="flex-1 text-left text-sm text-ink">Privacy Policy</span>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-ink-lighter">
                <polyline points="9 18 15 12 9 6" />
              </svg>
            </button>
          </div>
        </section>

        {/* Contact Section */}
        <section>
          <h2 className="text-sm font-semibold text-ink mb-3">Contact</h2>
          <div className="bg-white rounded-2xl border border-border overflow-hidden">
            <a 
              href="mailto:support@getretrograde.ai"
              className="w-full flex items-center gap-3 px-4 py-3.5 hover:bg-cream/50 transition-colors"
            >
              <span className="text-ink-light font-medium text-lg">@</span>
              <span className="flex-1 text-left text-sm text-ink">support@getretrograde.ai</span>
            </a>
          </div>
        </section>

        {/* Version */}
        <p className="text-center text-xs text-ink-lighter pt-4 pb-8">
          Retrograde v1.0.0
        </p>
      </div>
    </main>
  );
}

