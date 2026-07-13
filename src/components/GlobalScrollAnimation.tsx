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
          const el = entry.target as any;
          
          // Cancel the hiding animation
          if (el._hideAnimation) {
            el._hideAnimation.cancel();
          }

          // Play the reveal animation using WAAPI
          el.animate([
            { opacity: 0, transform: 'translateY(30px)' },
            { opacity: 1, transform: 'translateY(0)' }
          ], {
            duration: 800,
            easing: 'cubic-bezier(0.16, 1, 0.3, 1)',
            fill: 'forwards'
          });

          obs.unobserve(el);
        }
      });
    }, observerOptions);

    const targetSelector = "h1, h2, h3, h4, h5, p, img";

    const applyAnimationToElement = (el: Element) => {
      const htmlEl = el as any;
      // Don't apply to specific components where it might break layout or look bad
      if (
        !htmlEl._hasScrollAnimation &&
        !el.closest(".magic-bento-card") &&
        !el.closest(".animate-marquee-left") &&
        !el.closest(".animate-marquee-right") &&
        !el.closest("nav") &&
        !el.closest("footer")
      ) {
        htmlEl._hasScrollAnimation = true;
        
        // Hide element immediately using WAAPI (bypasses React attribute checks)
        htmlEl._hideAnimation = el.animate([
          { opacity: 0, transform: 'translateY(30px)' }
        ], { duration: 0, fill: 'forwards' });
        
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
      requestAnimationFrame(() => {
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
