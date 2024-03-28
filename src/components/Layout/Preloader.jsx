import { Spinner } from "@/components/Layout/Spinner";

export const Preloader = ({ isLoading = false, children, className = "" }) => {
  return (
    <>
      {<Spinner isVisible={isLoading} className={className} />}
      {children}
    </>
  );
};
