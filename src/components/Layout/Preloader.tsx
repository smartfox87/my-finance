import { Spinner } from "@/components/Layout/Spinner";
import { ReactNode } from "react";

export const Preloader = ({ isLoading = false, children, className = "" }: { isLoading: boolean; children: ReactNode; className?: string }) => {
  return (
    <>
      {isLoading && <Spinner isVisible={isLoading} className={className} />}
      {children}
    </>
  );
};
