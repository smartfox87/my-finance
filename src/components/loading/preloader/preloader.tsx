import { Spinner } from "@/components/loading/spinner";
import type { ReactNode } from "react";

export const Preloader = ({ isLoading = false, children, className = "" }: { isLoading: boolean; children: ReactNode; className?: string }) => {
  return (
    <>
      {isLoading && <Spinner isVisible={isLoading} className={className} />}
      {children}
    </>
  );
};
