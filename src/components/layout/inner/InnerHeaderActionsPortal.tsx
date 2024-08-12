import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import type { ComponentChildrenProps } from "@/types/common";

export const InnerHeaderActionsPortal = ({ children }: ComponentChildrenProps) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);

  // notice: createPortal target element must be already mounted
  return mounted ? createPortal(children, document.getElementById("layout-header")!) : null;
};
