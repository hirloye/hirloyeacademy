"use client";

import { useEffect } from "react";

export function GlobalScrollAnimation() {
  useEffect(() => {
    // Setup intersection observer
    const observerOptions = {
      root: null,
      rootMargin: "50px", // Trigger slightly before coming into view
      threshold: 0, // Trigger as soon as any part is visible
    };

    const intersectionObserver = new IntersectionObserver((entries, obs) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          obs.unobserve(entry.target);
        }
      });
    }, observerOptions);

    const targetSelector = "h1, h2, h3, h4, h5, p, img";

    const applyAnimationToElement = (el: Element) => {
      // Don't apply to specific components where it might break layout or look bad
      if (
        !el.classList.contains("reveal-on-scroll") &&
        !el.closest(".magic-bento-card") &&
        !el.closest(".animate-marquee-left") &&
        !el.closest(".animate-marquee-right") &&
        !el.closest("nav") &&
        !el.closest("footer")
      ) {
        el.classList.add("reveal-on-scroll");
        intersectionObserver.observe(el);
      }
    };

    const applyToExisting = () => {
      const elements = document.querySelectorAll(targetSelector);
      elements.forEach(applyAnimationToElement);
    };

    // Apply to existing elements initially
    setTimeout(applyToExisting, 100);

    // Setup mutation observer to catch dynamically added elements (like from Suspense, client-side renders, or page navigations)
    const mutationObserver = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        mutation.addedNodes.forEach((node) => {
          if (node.nodeType === 1) { // ELEMENT_NODE
            const element = node as Element;
            
            // Check if the added node matches our selectors
            if (element.matches && element.matches(targetSelector)) {
              applyAnimationToElement(element);
            }
            
            // Also check all descendants of the added node
            if (element.querySelectorAll) {
              const descendants = element.querySelectorAll(targetSelector);
              descendants.forEach(applyAnimationToElement);
            }
          }
        });
      });
    });

    mutationObserver.observe(document.body, {
      childList: true,
      subtree: true,
    });

    return () => {
      intersectionObserver.disconnect();
      mutationObserver.disconnect();
    };
  }, []);

  return null;
}
