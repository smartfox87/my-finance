import SvgLoadingBtn from "@/assets/sprite/loading-btn.svg";
import { type ButtonProps, ButtonSizes, ButtonTypes } from "@/types/button";

export const SimpleButton = ({ size = ButtonSizes.DEFAULT, type = ButtonTypes.DEFAULT, loading, children, onClick, ...props }: ButtonProps) => {
  let className = `rounded-md border border-black/15 dark:border-dark-gray`;

  if (size === ButtonSizes.LARGE) className += " h-10 text-base";
  else className += " h-8 text-sm";

  if (loading) className += " opacity-70 pointer-events-none brightness-90";

  if (type === ButtonTypes.PRIMARY) className += " bg-primary-blue text-white border-none hover:brightness-125";

  return (
    <button type="button" className={`flex items-center justify-center gap-2 px-4 duration-300 ${className}`} onClick={onClick} {...props}>
      {loading && <SvgLoadingBtn className="spiner h-4 w-4 animate-spin" />}
      {children}
    </button>
  );
};
