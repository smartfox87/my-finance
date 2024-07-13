import { ReactNode, useEffect, useState } from "react";
import { createPortal } from "react-dom";

export const InnerHeaderActionsPortal = ({ children }: { children: ReactNode }) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);

  // notice: createPortal target element must be already mounted
  return mounted ? createPortal(children, document.getElementById("layout-header")!) : null;
};
