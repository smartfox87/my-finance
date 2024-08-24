export const setCSSVariables = () => {
  const handleResizeWindow = (): void => {
    const heightValue = window.innerHeight / 100;
    const widthValue = window.innerWidth / 100;

    document.documentElement.style.setProperty("--vh", `${heightValue}px`);
    document.documentElement.style.setProperty("--vw", `${widthValue}px`);
  };

  handleResizeWindow();
  window.addEventListener("resize", handleResizeWindow);
};
