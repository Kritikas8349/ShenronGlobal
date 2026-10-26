
import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const ScrollToTop = () => {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    // If a section hash exists, scroll to that section
    if (hash) {
      let attempts = 0;
      let timer;

      const scrollToHash = () => {
        const section = document.getElementById(
          decodeURIComponent(hash.slice(1))
        );

        if (section) {
          section.scrollIntoView({
            behavior: "smooth",
            block: "start",
          });
          return;
        }

        // Wait briefly if the page section hasn't rendered yet
        if (attempts < 20) {
          attempts++;
          timer = setTimeout(scrollToHash, 100);
        }
      };

      timer = setTimeout(scrollToHash, 100);

      return () => clearTimeout(timer);
    }

    // Normal navigation: scroll to the top
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "instant",
    });
  }, [pathname, hash]);

  return null;
};

export default ScrollToTop;
