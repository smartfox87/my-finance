import SvgLoadingBtn from "@/assets/sprite/loading-btn.svg";
import PropTypes from "prop-types";

export const SimpleButton = ({ size, type, loading, children, ...props }) => {
  let className = `rounded-md border`;

  if (size === "large") className += " h-10 text-base";
  else className += " h-8 text-sm";

  if (loading) className += " opacity-70 pointer-events-none brightness-90";

  if (type === "primary") className += " bg-primary-blue text-white border-none hover:brightness-125";

  return (
    <button type="button" className={`flex items-center justify-center gap-2 px-4 duration-300 ${className}`} {...props}>
      {loading && <SvgLoadingBtn className="spiner h-4 w-4 animate-spin" />}
      {children}
    </button>
  );
};

SimpleButton.propTypes = {
  size: PropTypes.string,
  type: PropTypes.string,
  loading: PropTypes.bool,
  children: PropTypes.node,
};
