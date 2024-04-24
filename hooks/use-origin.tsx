import { useEffect, useState } from "react";

export const useOrigin = () => {
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);
  //if origin is undefined return empty string else return origin
  const origin = typeof window !== "undefined" && window.location.origin ? window.location.origin : "";
  if (!mounted) {
    return "";
  }
  return origin;
};
