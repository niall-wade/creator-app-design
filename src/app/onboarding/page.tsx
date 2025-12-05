"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

// Types
interface OnboardingData {
  followers: string;
  instagramHandle: string;
  previousBrands: string[];
  wishlistBrands: string[];
  contentCategories: string[];
  milestones: string[];
  hasTalentAgent: boolean | null;
  brandDealsPerMonth: string;
  averageDealSize: string;
  dealTypes: string[];
  name: string;
  gender: string;
  birthDate: string;
  location: string;
  email: string;
}

const initialData: OnboardingData = {
  followers: "",
  instagramHandle: "",
  previousBrands: [],
  wishlistBrands: [],
  contentCategories: [],
  milestones: [],
  hasTalentAgent: null,
  brandDealsPerMonth: "",
  averageDealSize: "",
  dealTypes: [],
  name: "",
  gender: "",
  birthDate: "",
  location: "",
  email: "",
};

export default function Onboarding() {
  const [step, setStep] = useState(0);
  const [data, setData] = useState<OnboardingData>(initialData);
  const [direction, setDirection] = useState(1);

  const totalSteps = 20;

  const next = () => {
    if (step < totalSteps - 1) {
      setDirection(1);
      setStep(step + 1);
    }
  };

  const back = () => {
    if (step > 0) {
      setDirection(-1);
      setStep(step - 1);
    }
  };

  const updateData = (updates: Partial<OnboardingData>) => {
    setData({ ...data, ...updates });
  };

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 300 : -300,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      x: direction < 0 ? 300 : -300,
      opacity: 0,
    }),
  };

  const renderStep = () => {
    switch (step) {
      case 0:
        return (
          <FollowersStep
            value={data.followers}
            onChange={(followers) => updateData({ followers })}
          />
        );
      case 1:
        return (
          <InstagramHandleStep
            value={data.instagramHandle}
            onChange={(instagramHandle) => updateData({ instagramHandle })}
          />
        );
      case 2:
        return <MoreDealsAffirmationStep />;
      case 3:
        return (
          <PreviousBrandsStep
            value={data.previousBrands}
            onChange={(previousBrands) => updateData({ previousBrands })}
          />
        );
      case 4:
        return (
          <WishlistBrandsStep
            value={data.wishlistBrands}
            onChange={(wishlistBrands) => updateData({ wishlistBrands })}
          />
        );
      case 5:
        return <AnalyzingProfileStep onComplete={next} />;
      case 6:
        return (
          <ContentCategoryStep
            value={data.contentCategories}
            onChange={(contentCategories) => updateData({ contentCategories })}
          />
        );
      case 7:
        return (
          <MilestonesStep
            value={data.milestones}
            onChange={(milestones) => updateData({ milestones })}
          />
        );
      case 8:
        return <SevenDaysAffirmationStep />;
      case 9:
        return (
          <TalentAgentStep
            value={data.hasTalentAgent}
            onChange={(hasTalentAgent) => updateData({ hasTalentAgent })}
          />
        );
      case 10:
        return (
          <BrandDealsStep
            value={data.brandDealsPerMonth}
            onChange={(brandDealsPerMonth) => updateData({ brandDealsPerMonth })}
          />
        );
      case 11:
        return (
          <DealSizeStep
            value={data.averageDealSize}
            onChange={(averageDealSize) => updateData({ averageDealSize })}
          />
        );
      case 12:
        return (
          <DealTypesStep
            value={data.dealTypes}
            onChange={(dealTypes) => updateData({ dealTypes })}
          />
        );
      case 13:
        return <FocusOnContentAffirmationStep />;
      case 14:
        return (
          <NameStep
            value={data.name}
            onChange={(name) => updateData({ name })}
          />
        );
      case 15:
        return (
          <GenderStep
            value={data.gender}
            onChange={(gender) => updateData({ gender })}
          />
        );
      case 16:
        return (
          <BirthDateStep
            value={data.birthDate}
            onChange={(birthDate) => updateData({ birthDate })}
          />
        );
      case 17:
        return (
          <LocationStep
            value={data.location}
            onChange={(location) => updateData({ location })}
          />
        );
      case 18:
        return (
          <EmailStep
            value={data.email}
            onChange={(email) => updateData({ email })}
          />
        );
      case 19:
        return <GeneratingStep />;
      default:
        return null;
    }
  };

  // Auto-advance steps (for loading/affirmation screens)
  const isAutoAdvanceStep = step === 5;
  const showContinueButton = !isAutoAdvanceStep && step < 19;

  return (
    <main className="min-h-dvh bg-cream text-ink flex flex-col max-w-md mx-auto w-full">
      {/* Progress Bar */}
      <div className="px-6 pt-4">
        <div className="flex items-center gap-3">
          {step > 0 && (
            <button
              onClick={back}
              className="p-2 -ml-2 hover:bg-ink/5 rounded-full transition-colors"
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M12 4L6 10L12 16" />
              </svg>
            </button>
          )}
          <div className="flex-1 h-1 bg-ink/10 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-terracotta rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${((step + 1) / totalSteps) * 100}%` }}
              transition={{ duration: 0.3 }}
            />
          </div>
        </div>
      </div>

      {/* Step Content */}
      <div className="flex-1 flex flex-col px-6 pt-8 pb-6 overflow-hidden">
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={step}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="flex-1 flex flex-col"
          >
            {renderStep()}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Continue Button */}
      {showContinueButton && (
        <div className="px-6 pb-8">
          <button
            onClick={next}
            className="w-full py-4 rounded-full bg-ink text-cream font-semibold text-base hover:bg-ink/90 active:scale-[0.98] transition-all duration-150"
          >
            Continue
          </button>
        </div>
      )}
    </main>
  );
}

// Step 1: Followers
function FollowersStep({
  value,
  onChange,
}: {
  value: string;
  onChange: (v: string) => void;
}) {
  const options = ["0 - 1,000", "1,000 - 10,000", "10,000 - 50,000", "50,000 - 100,000", "100,000 - 500,000", "500,000+"];
  return (
    <div className="flex-1 flex flex-col">
      <h2
        className="text-3xl font-semibold mb-8"
        style={{ fontFamily: "var(--font-display)" }}
      >
        How many followers
        <br />
        do you have?
      </h2>
      <div className="space-y-3">
        {options.map((option) => (
          <button
            key={option}
            onClick={() => onChange(option)}
            className={`w-full py-4 px-6 rounded-2xl border text-left font-medium transition-all ${
              value === option
                ? "bg-ink text-cream border-ink"
                : "bg-white text-ink border-border hover:border-ink/30"
            }`}
          >
            {option}
          </button>
        ))}
      </div>
    </div>
  );
}

// Step 2: Instagram Handle
function InstagramHandleStep({
  value,
  onChange,
}: {
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <div className="flex-1 flex flex-col">
      <h2
        className="text-3xl font-semibold mb-8"
        style={{ fontFamily: "var(--font-display)" }}
      >
        What&apos;s your
        <br />
        Instagram handle?
      </h2>
      <div className="relative">
        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-ink-lighter text-lg">
          @
        </span>
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="username"
          className="w-full py-4 pl-10 pr-4 rounded-2xl bg-white border border-border text-ink placeholder:text-ink-lighter focus:border-ink/30 transition-colors text-lg"
          autoFocus
        />
      </div>
    </div>
  );
}

// Step 3: More Deals Affirmation
function MoreDealsAffirmationStep() {
  const deals = [
    { brand: "Nike", delay: 0.2 },
    { brand: "Sephora", delay: 0.4 },
    { brand: "Spotify", delay: 0.6 },
    { brand: "Glossier", delay: 0.8 },
    { brand: "Apple", delay: 1.0 },
  ];

  return (
    <div className="flex-1 flex flex-col items-center justify-center text-center">
      <div className="mb-10 relative h-56 w-64">
        {/* Base "1" deal - faded */}
        <motion.div
          className="absolute left-1/2 bottom-0 -translate-x-1/2 w-48 h-16 rounded-2xl bg-border/50 border border-border flex items-center gap-3 px-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 0.4, y: 0 }}
          transition={{ duration: 0.4, delay: 0 }}
        >
          <div className="w-10 h-10 rounded-xl bg-ink/10" />
          <div className="flex-1">
            <div className="h-2.5 w-16 bg-ink/10 rounded-full" />
            <div className="h-2 w-10 bg-ink/5 rounded-full mt-1.5" />
          </div>
        </motion.div>

        {/* Stacking animated deals */}
        {deals.map((deal, index) => (
          <motion.div
            key={deal.brand}
            className="absolute left-1/2 w-48 h-16 rounded-2xl bg-white border border-border shadow-sm flex items-center gap-3 px-4"
            initial={{ 
              opacity: 0, 
              y: 60,
              x: "-50%",
              scale: 0.9
            }}
            animate={{ 
              opacity: 1, 
              y: -index * 28,
              x: "-50%",
              scale: 1
            }}
            transition={{ 
              duration: 0.5, 
              delay: deal.delay,
              ease: [0.23, 1, 0.32, 1]
            }}
            style={{ bottom: 24 }}
          >
            <motion.div 
              className="w-10 h-10 rounded-xl bg-terracotta/15 flex items-center justify-center"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.3, delay: deal.delay + 0.2 }}
            >
              <span className="text-terracotta text-xs font-semibold">
                {deal.brand.charAt(0)}
              </span>
            </motion.div>
            <div className="flex-1">
              <div className="text-sm font-medium text-ink">{deal.brand}</div>
              <div className="text-xs text-ink-lighter">Brand deal</div>
            </div>
            <motion.div
              className="w-6 h-6 rounded-full bg-terracotta/10 flex items-center justify-center"
              initial={{ scale: 0, rotate: -90 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ duration: 0.3, delay: deal.delay + 0.3 }}
            >
              <svg width="12" height="12" viewBox="0 0 12 12" className="text-terracotta">
                <path d="M2 6L5 9L10 3" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </motion.div>
          </motion.div>
        ))}

        {/* Multiplier badge */}
        <motion.div
          className="absolute -right-2 top-8 bg-terracotta text-cream px-3 py-1.5 rounded-full shadow-lg"
          initial={{ opacity: 0, scale: 0, x: 20 }}
          animate={{ opacity: 1, scale: 1, x: 0 }}
          transition={{ 
            duration: 0.5, 
            delay: 1.3,
            ease: [0.23, 1, 0.32, 1]
          }}
        >
          <span className="text-lg font-semibold" style={{ fontFamily: "var(--font-display)" }}>
            +5
          </span>
        </motion.div>
      </div>

      <motion.h2
        className="text-3xl font-semibold mb-4"
        style={{ fontFamily: "var(--font-display)" }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 1.5 }}
      >
        Creators working with us get
        <br />
        <span className="text-terracotta">3-5 more brand deals</span>
        <br />
        per month
      </motion.h2>
    </div>
  );
}

// Step 4: Previous Brands
function PreviousBrandsStep({
  value,
  onChange,
}: {
  value: string[];
  onChange: (v: string[]) => void;
}) {
  const brands = [
    "Nike",
    "Adidas",
    "Apple",
    "Samsung",
    "Amazon",
    "Spotify",
    "Netflix",
    "Disney",
    "Coca-Cola",
    "Pepsi",
    "McDonald's",
    "Starbucks",
    "Target",
    "Walmart",
    "Sephora",
    "Ulta",
    "None yet",
  ];

  const toggle = (brand: string) => {
    if (brand === "None yet") {
      onChange(value.includes(brand) ? [] : ["None yet"]);
      return;
    }
    const filtered = value.filter((b) => b !== "None yet");
    if (filtered.includes(brand)) {
      onChange(filtered.filter((b) => b !== brand));
    } else {
      onChange([...filtered, brand]);
    }
  };

  return (
    <div className="flex-1 flex flex-col">
      <h2
        className="text-3xl font-semibold mb-2"
        style={{ fontFamily: "var(--font-display)" }}
      >
        What brands have you
        <br />
        worked with before?
      </h2>
      <p className="text-ink-light mb-6">Select all that apply</p>
      <div className="flex flex-wrap gap-2">
        {brands.map((brand) => (
          <button
            key={brand}
            onClick={() => toggle(brand)}
            className={`py-2.5 px-4 rounded-full border text-sm font-medium transition-all ${
              value.includes(brand)
                ? "bg-ink text-cream border-ink"
                : "bg-white text-ink border-border hover:border-ink/30"
            }`}
          >
            {brand}
          </button>
        ))}
      </div>
    </div>
  );
}

// Step 5: Wishlist Brands
function WishlistBrandsStep({
  value,
  onChange,
}: {
  value: string[];
  onChange: (v: string[]) => void;
}) {
  const brands = [
    "Nike",
    "Adidas",
    "Apple",
    "Samsung",
    "Amazon",
    "Spotify",
    "Netflix",
    "Disney",
    "Coca-Cola",
    "Pepsi",
    "McDonald's",
    "Starbucks",
    "Target",
    "Walmart",
    "Sephora",
    "Ulta",
    "Gymshark",
    "Fenty",
    "Glossier",
    "Rare Beauty",
  ];

  const toggle = (brand: string) => {
    if (value.includes(brand)) {
      onChange(value.filter((b) => b !== brand));
    } else {
      onChange([...value, brand]);
    }
  };

  return (
    <div className="flex-1 flex flex-col">
      <h2
        className="text-3xl font-semibold mb-2"
        style={{ fontFamily: "var(--font-display)" }}
      >
        What brands would
        <br />
        you like to work with?
      </h2>
      <p className="text-ink-light mb-6">Select your dream brands</p>
      <div className="flex flex-wrap gap-2">
        {brands.map((brand) => (
          <button
            key={brand}
            onClick={() => toggle(brand)}
            className={`py-2.5 px-4 rounded-full border text-sm font-medium transition-all ${
              value.includes(brand)
                ? "bg-ink text-cream border-ink"
                : "bg-white text-ink border-border hover:border-ink/30"
            }`}
          >
            {brand}
          </button>
        ))}
      </div>
    </div>
  );
}

// Step 6: Analyzing Profile (Auto-advances)
function AnalyzingProfileStep({ onComplete }: { onComplete: () => void }) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const duration = 3000;
    const interval = 50;
    const increment = (interval / duration) * 100;

    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          setTimeout(onComplete, 300);
          return 100;
        }
        return prev + increment;
      });
    }, interval);

    return () => clearInterval(timer);
  }, [onComplete]);

  return (
    <div className="flex-1 flex flex-col items-center justify-center text-center">
      <div className="mb-8">
        <motion.div
          className="w-20 h-20 rounded-full border-3 border-border border-t-terracotta"
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
        />
      </div>
      <h2
        className="text-3xl font-semibold mb-4"
        style={{ fontFamily: "var(--font-display)" }}
      >
        Analysing your
        <br />
        <span className="text-terracotta">Instagram profile</span>
      </h2>
      <p className="text-ink-light">This will only take a moment...</p>
      <div className="w-48 h-1 bg-border rounded-full mt-6 overflow-hidden">
        <motion.div
          className="h-full bg-terracotta rounded-full"
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
}

// Step 7: Content Categories
function ContentCategoryStep({
  value,
  onChange,
}: {
  value: string[];
  onChange: (v: string[]) => void;
}) {
  const categories = [
    "Lifestyle",
    "Fashion",
    "Beauty",
    "Fitness",
    "Food",
    "Travel",
    "Tech",
    "Gaming",
    "Finance",
    "Education",
    "Entertainment",
    "Music",
    "Art",
    "Sports",
    "Parenting",
    "Pets",
  ];

  const toggle = (cat: string) => {
    if (value.includes(cat)) {
      onChange(value.filter((c) => c !== cat));
    } else {
      onChange([...value, cat]);
    }
  };

  return (
    <div className="flex-1 flex flex-col">
      <h2
        className="text-3xl font-semibold mb-2"
        style={{ fontFamily: "var(--font-display)" }}
      >
        What do you make
        <br />
        content about?
      </h2>
      <p className="text-ink-light mb-6">Select all that apply</p>
      <div className="flex flex-wrap gap-2">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => toggle(cat)}
            className={`py-2.5 px-4 rounded-full border text-sm font-medium transition-all ${
              value.includes(cat)
                ? "bg-ink text-cream border-ink"
                : "bg-white text-ink border-border hover:border-ink/30"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>
    </div>
  );
}

// Step 8: Milestones
function MilestonesStep({
  value,
  onChange,
}: {
  value: string[];
  onChange: (v: string[]) => void;
}) {
  const milestones = [
    "Getting married",
    "Having a baby",
    "Buying a house",
    "Moving cities",
    "Starting a business",
    "Graduating",
    "Getting engaged",
    "Anniversary",
    "Birthday milestone",
    "Career change",
    "None right now",
  ];

  const toggle = (milestone: string) => {
    if (milestone === "None right now") {
      onChange(value.includes(milestone) ? [] : ["None right now"]);
      return;
    }
    const filtered = value.filter((m) => m !== "None right now");
    if (filtered.includes(milestone)) {
      onChange(filtered.filter((m) => m !== milestone));
    } else {
      onChange([...filtered, milestone]);
    }
  };

  return (
    <div className="flex-1 flex flex-col">
      <h2
        className="text-3xl font-semibold mb-2"
        style={{ fontFamily: "var(--font-display)" }}
      >
        Any recent or upcoming
        <br />
        life milestones?
      </h2>
      <p className="text-ink-light mb-6">Brands love authentic moments</p>
      <div className="flex flex-wrap gap-2">
        {milestones.map((milestone) => (
          <button
            key={milestone}
            onClick={() => toggle(milestone)}
            className={`py-2.5 px-4 rounded-full border text-sm font-medium transition-all ${
              value.includes(milestone)
                ? "bg-ink text-cream border-ink"
                : "bg-white text-ink border-border hover:border-ink/30"
            }`}
          >
            {milestone}
          </button>
        ))}
      </div>
    </div>
  );
}

// Step 9: Seven Days Affirmation
function SevenDaysAffirmationStep() {
  const days = ["M", "T", "W", "T", "F", "S", "S"];
  
  return (
    <div className="flex-1 flex flex-col items-center justify-center text-center">
      <div className="mb-10 relative">
        {/* Deal secured card */}
        <motion.div
          className="bg-white rounded-2xl border border-border p-4 shadow-sm flex items-center gap-3 mb-6"
          initial={{ opacity: 0, y: -20, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.5, delay: 1.1, ease: [0.23, 1, 0.32, 1] }}
        >
          <motion.div 
            className="w-12 h-12 rounded-xl bg-terracotta/10 flex items-center justify-center"
            initial={{ rotate: -10 }}
            animate={{ rotate: 0 }}
            transition={{ delay: 1.3 }}
          >
            <span className="text-2xl">🎉</span>
          </motion.div>
          <div className="text-left">
            <div className="text-sm font-semibold text-ink">Deal secured!</div>
            <div className="text-xs text-ink-lighter">Your first brand partnership</div>
          </div>
          <motion.div
            className="ml-auto w-8 h-8 rounded-full bg-terracotta/10 flex items-center justify-center"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 1.4, type: "spring", stiffness: 400 }}
          >
            <svg width="14" height="14" viewBox="0 0 14 14" className="text-terracotta">
              <path d="M2 7L5.5 10.5L12 3.5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </motion.div>
        </motion.div>

        {/* Week timeline */}
        <div className="flex gap-2 relative">
          {days.map((day, index) => (
            <motion.div
              key={index}
              className="flex flex-col items-center gap-2"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.08 }}
            >
              <motion.div
                className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                  index === 6 
                    ? "bg-terracotta text-cream" 
                    : "bg-white border border-border"
                }`}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ 
                  duration: 0.3, 
                  delay: index * 0.08 + 0.2,
                  ease: [0.23, 1, 0.32, 1]
                }}
              >
                {index < 6 ? (
                  <motion.div
                    className="w-2 h-2 rounded-full bg-terracotta/30"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: index * 0.08 + 0.4 }}
                  />
                ) : (
                  <motion.svg 
                    width="18" 
                    height="18" 
                    viewBox="0 0 18 18"
                    initial={{ scale: 0, rotate: -90 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ 
                      delay: 0.9,
                      duration: 0.4,
                      ease: [0.23, 1, 0.32, 1]
                    }}
                  >
                    <path 
                      d="M4 9L7.5 12.5L14 5.5" 
                      fill="none" 
                      stroke="currentColor" 
                      strokeWidth="2.5" 
                      strokeLinecap="round" 
                      strokeLinejoin="round" 
                    />
                  </motion.svg>
                )}
              </motion.div>
              <span className="text-xs text-ink-lighter font-medium">{day}</span>
            </motion.div>
          ))}
          
          {/* Progress line connecting the days */}
          <div className="absolute top-5 left-5 right-5 h-0.5 bg-border -z-10">
            <motion.div
              className="h-full bg-terracotta rounded-full"
              initial={{ width: "0%" }}
              animate={{ width: "100%" }}
              transition={{ duration: 0.8, delay: 0.5, ease: "easeOut" }}
            />
          </div>
        </div>
      </div>

      <motion.h2
        className="text-3xl font-semibold mb-4"
        style={{ fontFamily: "var(--font-display)" }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 1.5 }}
      >
        Most creators get a deal
        <br />
        within <span className="text-terracotta">7 days</span>
      </motion.h2>
      <motion.p 
        className="text-ink-light"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 1.7 }}
      >
        Join thousands of successful creators
      </motion.p>
    </div>
  );
}

// Step 10: Talent Agent
function TalentAgentStep({
  value,
  onChange,
}: {
  value: boolean | null;
  onChange: (v: boolean) => void;
}) {
  return (
    <div className="flex-1 flex flex-col">
      <h2
        className="text-3xl font-semibold mb-8"
        style={{ fontFamily: "var(--font-display)" }}
      >
        Do you currently
        <br />
        have a talent agent?
      </h2>
      <div className="space-y-3">
        {[
          { label: "Yes", val: true },
          { label: "No", val: false },
        ].map((option) => (
          <button
            key={option.label}
            onClick={() => onChange(option.val)}
            className={`w-full py-4 px-6 rounded-2xl border text-left font-medium transition-all ${
              value === option.val
                ? "bg-ink text-cream border-ink"
                : "bg-white text-ink border-border hover:border-ink/30"
            }`}
          >
            {option.label}
          </button>
        ))}
      </div>
    </div>
  );
}

// Step 11: Brand Deals Per Month
function BrandDealsStep({
  value,
  onChange,
}: {
  value: string;
  onChange: (v: string) => void;
}) {
  const options = ["0", "1-2 per month", "3-5 per month", "5+ per month"];
  return (
    <div className="flex-1 flex flex-col">
      <h2
        className="text-3xl font-semibold mb-8"
        style={{ fontFamily: "var(--font-display)" }}
      >
        How many brand deals
        <br />
        do you do a month?
      </h2>
      <div className="space-y-3">
        {options.map((option) => (
          <button
            key={option}
            onClick={() => onChange(option)}
            className={`w-full py-4 px-6 rounded-2xl border text-left font-medium transition-all ${
              value === option
                ? "bg-ink text-cream border-ink"
                : "bg-white text-ink border-border hover:border-ink/30"
            }`}
          >
            {option}
          </button>
        ))}
      </div>
    </div>
  );
}

// Step 12: Deal Size
function DealSizeStep({
  value,
  onChange,
}: {
  value: string;
  onChange: (v: string) => void;
}) {
  const options = ["None yet", "Up to $1,000", "$1,000 - $5,000", "$5,000 - $10,000", "$10,000 - $50,000", "$50,000+"];
  return (
    <div className="flex-1 flex flex-col">
      <h2
        className="text-3xl font-semibold mb-8"
        style={{ fontFamily: "var(--font-display)" }}
      >
        Average brand
        <br />
        deal size?
      </h2>
      <div className="space-y-3">
        {options.map((option) => (
          <button
            key={option}
            onClick={() => onChange(option)}
            className={`w-full py-4 px-6 rounded-2xl border text-left font-medium transition-all ${
              value === option
                ? "bg-ink text-cream border-ink"
                : "bg-white text-ink border-border hover:border-ink/30"
            }`}
          >
            {option}
          </button>
        ))}
      </div>
    </div>
  );
}

// Step 13: Deal Types
function DealTypesStep({
  value,
  onChange,
}: {
  value: string[];
  onChange: (v: string[]) => void;
}) {
  const types = [
    "Sponsored posts",
    "Brand ambassadorships",
    "Affiliate deals",
    "Product gifting",
    "UGC creation",
    "Event appearances",
    "Podcast/interview",
    "Licensing",
  ];

  const toggle = (type: string) => {
    if (value.includes(type)) {
      onChange(value.filter((t) => t !== type));
    } else {
      onChange([...value, type]);
    }
  };

  return (
    <div className="flex-1 flex flex-col">
      <h2
        className="text-3xl font-semibold mb-2"
        style={{ fontFamily: "var(--font-display)" }}
      >
        What type of deals
        <br />
        would you like to do?
      </h2>
      <p className="text-ink-light mb-6">Select all that apply</p>
      <div className="flex flex-wrap gap-2">
        {types.map((type) => (
          <button
            key={type}
            onClick={() => toggle(type)}
            className={`py-2.5 px-4 rounded-full border text-sm font-medium transition-all ${
              value.includes(type)
                ? "bg-ink text-cream border-ink"
                : "bg-white text-ink border-border hover:border-ink/30"
            }`}
          >
            {type}
          </button>
        ))}
      </div>
    </div>
  );
}

// Step 14: Focus on Content Affirmation
function FocusOnContentAffirmationStep() {
  const notifications = [
    { brand: "Nike", amount: "$2,500", delay: 0.8 },
    { brand: "Spotify", amount: "$1,800", delay: 1.2 },
    { brand: "Glossier", amount: "$3,200", delay: 1.6 },
  ];

  return (
    <div className="flex-1 flex flex-col items-center justify-center text-center">
      <div className="mb-10 relative">
        {/* Phone mockup */}
        <motion.div 
          className="w-44 h-72 rounded-[2rem] bg-white border border-border p-2 shadow-sm relative overflow-visible"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.23, 1, 0.32, 1] }}
        >
          {/* Phone screen */}
          <div className="w-full h-full rounded-[1.5rem] bg-ink overflow-hidden relative">
            {/* Content grid animation */}
            <div className="absolute inset-0 p-3 grid grid-cols-2 gap-2">
              {[0, 1, 2, 3].map((i) => (
                <motion.div
                  key={i}
                  className="rounded-xl bg-cream/10"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ 
                    duration: 0.4, 
                    delay: 0.3 + i * 0.1,
                    ease: [0.23, 1, 0.32, 1]
                  }}
                />
              ))}
            </div>
            
            {/* Camera icon */}
            <motion.div 
              className="absolute bottom-4 left-1/2 -translate-x-1/2 w-10 h-10 rounded-full bg-cream/20 flex items-center justify-center"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.6, type: "spring", stiffness: 400 }}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" className="text-cream">
                <path d="M12 15.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7Z" fill="currentColor"/>
                <path d="M20 4h-3.17L15 2H9L7.17 4H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2Z" fill="none" stroke="currentColor" strokeWidth="1.5"/>
              </svg>
            </motion.div>
          </div>
          
          {/* Notch */}
          <div className="absolute top-3 left-1/2 -translate-x-1/2 w-16 h-5 rounded-full bg-ink" />
        </motion.div>

        {/* Deal notifications flying in */}
        {notifications.map((notif, index) => (
          <motion.div
            key={notif.brand}
            className="absolute bg-white rounded-xl border border-border shadow-lg p-3 flex items-center gap-2 w-40"
            style={{
              right: -60,
              top: 40 + index * 60,
            }}
            initial={{ opacity: 0, x: 60, scale: 0.8 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            transition={{ 
              duration: 0.5, 
              delay: notif.delay,
              ease: [0.23, 1, 0.32, 1]
            }}
          >
            <motion.div 
              className="w-8 h-8 rounded-lg bg-terracotta/15 flex items-center justify-center shrink-0"
              initial={{ rotate: -20 }}
              animate={{ rotate: 0 }}
              transition={{ delay: notif.delay + 0.2 }}
            >
              <span className="text-terracotta text-xs font-bold">{notif.brand.charAt(0)}</span>
            </motion.div>
            <div className="min-w-0">
              <div className="text-xs font-semibold text-ink truncate">{notif.brand}</div>
              <div className="text-xs text-terracotta font-medium">{notif.amount}</div>
            </div>
          </motion.div>
        ))}

        {/* Sparkle effects */}
        <motion.div
          className="absolute -left-2 top-16 text-lg"
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 2, type: "spring" }}
        >
          ✨
        </motion.div>
        <motion.div
          className="absolute -left-4 bottom-20 text-sm"
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 2.2, type: "spring" }}
        >
          ✨
        </motion.div>
      </div>

      <motion.h2
        className="text-3xl font-semibold mb-4"
        style={{ fontFamily: "var(--font-display)" }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 2 }}
      >
        Focus on your content,
        <br />
        <span className="text-terracotta">we&apos;ll bring the deals</span>
      </motion.h2>
    </div>
  );
}

// Step 15: Name
function NameStep({
  value,
  onChange,
}: {
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <div className="flex-1 flex flex-col">
      <h2
        className="text-3xl font-semibold mb-8"
        style={{ fontFamily: "var(--font-display)" }}
      >
        What&apos;s your name?
      </h2>
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Full name"
        className="w-full py-4 px-6 rounded-2xl bg-white border border-border text-ink placeholder:text-ink-lighter focus:border-ink/30 transition-colors text-lg"
        autoFocus
      />
    </div>
  );
}

// Step 16: Gender
function GenderStep({
  value,
  onChange,
}: {
  value: string;
  onChange: (v: string) => void;
}) {
  const options = ["Female", "Male", "Non-binary", "Prefer not to say"];
  return (
    <div className="flex-1 flex flex-col">
      <h2
        className="text-3xl font-semibold mb-8"
        style={{ fontFamily: "var(--font-display)" }}
      >
        Gender?
      </h2>
      <div className="space-y-3">
        {options.map((option) => (
          <button
            key={option}
            onClick={() => onChange(option)}
            className={`w-full py-4 px-6 rounded-2xl border text-left font-medium transition-all ${
              value === option
                ? "bg-ink text-cream border-ink"
                : "bg-white text-ink border-border hover:border-ink/30"
            }`}
          >
            {option}
          </button>
        ))}
      </div>
    </div>
  );
}

// Step 17: Birth Date
function BirthDateStep({
  value,
  onChange,
}: {
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <div className="flex-1 flex flex-col">
      <h2
        className="text-3xl font-semibold mb-8"
        style={{ fontFamily: "var(--font-display)" }}
      >
        Date of birth?
      </h2>
      <input
        type="date"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full py-4 px-6 rounded-2xl bg-white border border-border text-ink focus:border-ink/30 transition-colors text-lg"
      />
    </div>
  );
}

// Step 18: Location
function LocationStep({
  value,
  onChange,
}: {
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <div className="flex-1 flex flex-col">
      <h2
        className="text-3xl font-semibold mb-8"
        style={{ fontFamily: "var(--font-display)" }}
      >
        Where are you based?
      </h2>
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="City, Country"
        className="w-full py-4 px-6 rounded-2xl bg-white border border-border text-ink placeholder:text-ink-lighter focus:border-ink/30 transition-colors text-lg"
        autoFocus
      />
    </div>
  );
}

// Step 19: Email
function EmailStep({
  value,
  onChange,
}: {
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <div className="flex-1 flex flex-col">
      <h2
        className="text-3xl font-semibold mb-8"
        style={{ fontFamily: "var(--font-display)" }}
      >
        What&apos;s your email?
      </h2>
      <input
        type="email"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="you@example.com"
        className="w-full py-4 px-6 rounded-2xl bg-white border border-border text-ink placeholder:text-ink-lighter focus:border-ink/30 transition-colors text-lg"
        autoFocus
      />
    </div>
  );
}

// Step 20: Generating (Final)
function GeneratingStep() {
  return (
    <div className="flex-1 flex flex-col items-center justify-center text-center">
      <div className="mb-8">
        <motion.div
          className="w-20 h-20 rounded-full border-3 border-border border-t-terracotta"
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
        />
      </div>
      <h2
        className="text-3xl font-semibold mb-4"
        style={{ fontFamily: "var(--font-display)" }}
      >
        Time to generate your
        <br />
        <span className="text-terracotta">personalised outreach plan!</span>
      </h2>
      <p className="text-ink-light">
        This will only take a moment...
      </p>
    </div>
  );
}
