import { useEffect, useState } from "react";
const query = window.matchMedia("(min-width: 768px)");

export const Mediaqueries = () => {
  const [isLarge, isLargeSetter] = useState(false);
  useEffect(() => {
    const handleResize = () => {
      if (query.matches) {
        isLargeSetter(true);
      } else {
        isLargeSetter(false);
      }
    };

    
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    const event = new Event('resize');
    window.dispatchEvent(event);
  }, []);

  return {
    isLarge,
  };
};
