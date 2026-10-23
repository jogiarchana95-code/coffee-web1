import { useEffect, useState } from "react";

export default function useResponsive() {
  const [width, setWidth] = useState(window.innerWidth);

  useEffect(() => {
    const onResize = () => setWidth(window.innerWidth);
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  return { width, isMobile: width < 640, isTablet: width >= 640 && width < 960, isDesktop: width >= 960 };
}