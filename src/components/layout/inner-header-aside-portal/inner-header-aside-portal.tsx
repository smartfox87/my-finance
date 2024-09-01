import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import type { ComponentChildrenProps } from "@/types/common";

export const InnerHeaderAsidePortal = ({ children }: ComponentChildrenProps) => {
  const [mounted, setMounted] = useState(false);

  useEffect((): void => {
    setMounted(true);
  }, []);

  // notice: createPortal target element must be already mounted
  return mounted ? createPortal(children, document.getElementById("layout-header")!) : null;
};
