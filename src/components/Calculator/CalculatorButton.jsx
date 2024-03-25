import PropTypes from "prop-types";

export const CalculatorButton = ({ name, onClick, children, ...props }) => {
  return (
    <button type="button" name={name} className="flex h-12 w-1/5 grow items-center justify-center bg-gray-200 outline-none dark:bg-gray-700" {...props} onClick={onClick}>
      {children || name}
    </button>
  );
};

CalculatorButton.propTypes = {
  name: PropTypes.string,
  onClick: PropTypes.func,
  children: PropTypes.node,
};
