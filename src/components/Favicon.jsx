import { useEffect } from "react";

export default function useFavicon (faviconUrl){
  useEffect(() => {
    const link = document.querySelector("link[rel*='icon']") || document.createElement("link");
    link.type = "image/png";
    link.rel = "icon";
    link.href = faviconUrl;
    document.head.appendChild(link);
  }, [faviconUrl]);
}