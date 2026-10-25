"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { legacyClientTarget } from "@/lib/redirects";

/** Sends old `?panel=` and `#work/<slug>` links from the tabbed site to their new places. */
export function LegacyRedirect() {
  const router = useRouter();
  useEffect(() => {
    const target = legacyClientTarget(window.location.search, window.location.hash);
    if (target) router.replace(target);
  }, [router]);
  return null;
}
