"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { Code2 } from "lucide-react";

export default function AdminGuard({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    // Check auth by calling a lightweight auth-check endpoint
    fetch("/api/admin/auth/me")
      .then((r) => {
        if (!r.ok) {
          router.push(`/admin/login?from=${pathname}`);
        } else {
          setChecking(false);
        }
      })
      .catch(() => {
        router.push("/admin/login");
      });
  }, []);

  if (checking) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="flex flex-col items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-primary/20 border border-primary/40 flex items-center justify-center">
            <Code2 className="w-7 h-7 text-primary" />
          </div>
          <div className="w-32 h-1 bg-border rounded-full overflow-hidden">
            <div className="h-full bg-primary rounded-full animate-[gradientX_1s_ease_infinite] w-1/2" />
          </div>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}
