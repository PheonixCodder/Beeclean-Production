"use client";

import { useEffect } from "react";

export function HashScrollHandler() {
  useEffect(() => {
    const handleHashScroll = () => {
      // Check if we have a stored hash from sessionStorage (redirect from other page)
      const storedHash = sessionStorage.getItem('scrollToHash');
      if (storedHash) {
        // Clear the stored hash
        sessionStorage.removeItem('scrollToHash');
        const element = document.getElementById(storedHash);
        if (element) {
          const offset = 80;
          const elementPosition = element.getBoundingClientRect().top;
          const offsetPosition = elementPosition + window.pageYOffset - offset;
          window.scrollTo({
            top: offsetPosition,
            behavior: "smooth",
          });
        }
        return; // Skip normal hash handling if we had a stored hash
      }

      // Normal hash handling (for direct navigation or hash changes)
      const hash = window.location.hash;
      if (hash) {
        const element = document.getElementById(hash.slice(1));
        if (element) {
          const offset = 80;
          const elementPosition = element.getBoundingClientRect().top;
          const offsetPosition = elementPosition + window.pageYOffset - offset;
          window.scrollTo({
            top: offsetPosition,
            behavior: "smooth",
          });
        }
      }
    };

    // Handle initial load (including redirects)
    if (window.location.hash || sessionStorage.getItem('scrollToHash')) {
      setTimeout(handleHashScroll, 100);
    }

    window.addEventListener("hashchange", handleHashScroll);

    return () => {
      window.removeEventListener("hashchange", handleHashScroll);
    };
  }, []);

  return null;
}
