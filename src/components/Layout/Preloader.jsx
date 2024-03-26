import { Watch } from "react-loader-spinner";

export const Preloader = ({ isLoading = false, children, className = "" }) => {
  return (
    <>
      <Watch
        height="80"
        width="80"
        radius="48"
        color="rgb(37, 99, 235)"
        ariaLabel="watch-loading"
        wrapperStyle={{}}
        wrapperClass={`p-4 justify-center items-center grow dark:bg-dark/70 bg-white/70 absolute top-0 left-0 right-0 bottom-0 z-50 max-h-[100vh] ${className}`}
        visible={isLoading}
      />
      {children}
    </>
  );
};
