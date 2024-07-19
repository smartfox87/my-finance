import { useSelector } from "react-redux";
import { selectCostCategories } from "@/store/selectors/references";
import { useViewport } from "@/hooks/viewport";
import { Button } from "antd";

export const CostCategories = ({ activeCategory, onChangeCategory }) => {
  const { isMobile } = useViewport();

  const costCategories = useSelector(selectCostCategories);

  return (
    <>
      <ul className="flex flex-wrap gap-1.5 md:gap-2">
        {costCategories?.map(({ id, name }) => (
          <li key={id}>
            <Button size={isMobile ? "small" : "middle"} type={activeCategory === id ? "primary" : "default"} onClick={() => onChangeCategory(id)}>
              {name}
            </Button>
          </li>
        ))}
      </ul>
    </>
  );
};
