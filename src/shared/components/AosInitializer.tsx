"use client";

import AOS from "aos";
import "aos/dist/aos.css";
import { usePathname } from "next/navigation";
import { useEffect } from "react";

export default function AosInitializer() {
  const pathname = usePathname();

  useEffect(() => {
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const targets = document.querySelectorAll<HTMLElement>(
      "main > section:not(#inicio) > div:first-child, main article",
    );

    targets.forEach((element, index) => {
      if (element.closest("[data-aos-skip]")) {
        delete element.dataset.aos;
        delete element.dataset.aosDuration;
        delete element.dataset.aosDelay;
        delete element.dataset.aosOnce;
        return;
      }

      if (!element.dataset.aos) element.dataset.aos = index % 2 === 0 ? "fade-up" : "fade-right";
      element.dataset.aosDuration = "700";
      element.dataset.aosDelay = String(Math.min((index % 3) * 80, 160));
      element.dataset.aosOnce = "true";
    });

    AOS.init({
      duration: 700,
      easing: "ease-out-cubic",
      once: true,
      offset: 70,
      disable: reducedMotion,
    });
    AOS.refreshHard();

    return () => AOS.refreshHard();
  }, [pathname]);

  return null;
}
