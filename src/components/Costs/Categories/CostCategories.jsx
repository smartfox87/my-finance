import { useSelector } from "react-redux";
import { selectCostCategories } from "@/store/selectors/references.js";
import PropTypes from "prop-types";
import { useViewport } from "@/hooks/viewport.js";
import { Button } from "antd";

export const CostCategories = ({ activeCategory, onChangeCategory }) => {
  const { viewport } = useViewport();

  const costCategories = useSelector(selectCostCategories);

  return (
    <>
      <ul className="flex flex-wrap gap-1.5 md:gap-2">
        {costCategories?.map(({ id, name }) => (
          <li key={id}>
            <Button size={["xs", "xxs"].includes(viewport) ? "small" : "middle"} type={activeCategory === id ? "primary" : "default"} onClick={() => onChangeCategory(id)}>
              {name}
            </Button>
          </li>
        ))}
      </ul>
    </>
  );
};

CostCategories.propTypes = {
  activeCategory: PropTypes.number,
  onChangeCategory: PropTypes.func,
};
