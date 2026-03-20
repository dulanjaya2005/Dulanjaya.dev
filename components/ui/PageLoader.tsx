"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

export default function PageLoader() {
  const pathname = usePathname();
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [isFirstLoad, setIsFirstLoad] = useState(true);

  useEffect(() => {
    // First load skip කරන්න
    if (isFirstLoad) {
      setIsFirstLoad(false);
      return;
    }

    setLoading(true);
    setProgress(0);

    let current = 0;
    const interval = setInterval(() => {
      current += Math.random() * 3 + 1;
      if (current >= 100) {
        current = 100;
        clearInterval(interval);
        setTimeout(() => setLoading(false), 400);
      }
      setProgress(Math.floor(current));
    }, 80);

    return () => clearInterval(interval);
  }, [pathname]);

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4 }}
          className="fixed inset-0 z-[9998] bg-background flex flex-col items-center justify-center gap-6"
        >
          {/* Progress bar */}
          <div className="w-64 h-1 bg-border rounded-full overflow-hidden">
            <motion.div
              style={{ width: `${progress}%` }}
              className="h-full bg-primary rounded-full transition-all duration-75"
            />
          </div>

          {/* Progress number — පොඩි */}
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-2xl font-display font-bold text-primary tabular-nums"
          >
            {progress}%
          </motion.span>

          {/* Loading dots */}
          <div className="flex items-center gap-1">
            <span className="text-xs font-mono text-muted-foreground tracking-[0.3em] uppercase">
              Loading Page
            </span>
            {[0, 1, 2].map((i) => (
              <motion.span
                key={i}
                animate={{ opacity: [0, 1, 0] }}
                transition={{
                  duration: 1.2,
                  repeat: Infinity,
                  delay: i * 0.2,
                }}
                className="text-xs text-primary font-bold"
              >
                .
              </motion.span>
            ))}
          </div>

        </motion.div>
      )}
    </AnimatePresence>
  );
}