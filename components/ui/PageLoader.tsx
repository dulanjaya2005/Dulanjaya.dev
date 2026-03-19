"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

export default function PageLoader() {
  const pathname = usePathname();
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    setLoading(true);
    setProgress(0);

    let current = 0;
    const interval = setInterval(() => {
      current += Math.random() * 20 + 8;
      if (current >= 100) {
        current = 100;
        clearInterval(interval);
        setTimeout(() => setLoading(false), 300);
      }
      setProgress(Math.floor(current));
    }, 100);

    return () => clearInterval(interval);
  }, [pathname]);

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4 }}
          className="fixed inset-0 z-[9998] bg-background flex flex-col items-center justify-center gap-8"
        >
          {/* Page Loading text */}
          <motion.p
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-xs font-mono text-muted-foreground tracking-[0.4em] uppercase"
          >
            Page Loading
          </motion.p>

          {/* Progress number */}
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-6xl font-display font-black text-primary tabular-nums"
          >
            {progress}%
          </motion.span>

          {/* Progress bar */}
          <div className="w-64 h-0.5 bg-border rounded-full overflow-hidden">
            <motion.div
              style={{ width: `${progress}%` }}
              className="h-full bg-primary rounded-full transition-all duration-100"
            />
          </div>

        </motion.div>
      )}
    </AnimatePresence>
  );
}