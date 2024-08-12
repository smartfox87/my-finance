import { useEffect, useRef, useState } from "react";
import { Preloader } from "@/components/Layout/preloader/Preloader";
import { useViewport } from "@/hooks/viewport";
import { Viewports } from "@/types/viewport";
import { ReactComponentLike } from "prop-types";
import { ProcessedBudgetItem } from "@/types/budgets";
import { IncomeItem } from "@/types/incomes";
import { CostItem } from "@/types/costs";

const blankArray = new Array(3).fill(null);

export const LazyList = ({ items, Item }: { items: (ProcessedBudgetItem | IncomeItem | CostItem)[]; Item: ReactComponentLike }) => {
  const { viewport, isMobile } = useViewport();
  const loadItemsQuantity = isMobile ? 12 : Viewports.MD === viewport || Viewports.SM === viewport ? 18 : 24;
  const [lazyItems, setLazyItems] = useState(items.slice(0, loadItemsQuantity));
  const observer = useRef<IntersectionObserver | null>(null);
  const triggerRef = useRef<HTMLDivElement | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setLazyItems(items.slice(0, loadItemsQuantity));
  }, [items]);

  useEffect(() => {
    observer.current = new IntersectionObserver((entries) => {
      entries.forEach(({ isIntersecting }) => {
        if (isIntersecting && lazyItems.length < items.length) {
          setIsLoading(true);
          setLazyItems((prevItems) => items.slice(0, prevItems.length + loadItemsQuantity));
        }
      });
    });
    if (triggerRef.current) observer.current.observe(triggerRef.current);
    return () => observer.current?.disconnect();
  }, [lazyItems, items]);

  useEffect(() => {
    setIsLoading(false);
  }, [isLoading]);

  if (lazyItems?.length)
    return (
      <>
        <Preloader isLoading={isLoading} className="!sticky -mb-[100vh] h-screen">
          <ul className="flex flex-wrap justify-center gap-4">
            {lazyItems.map((item) => (
              <li key={item.id} className="flex w-[250px] min-w-[200px] max-w-[500px] grow">
                <Item {...item} />
              </li>
            ))}
            {blankArray.map((_, index) => (
              <li key={index} className="w-[250px] min-w-[200px] max-w-[500px] grow"></li>
            ))}
          </ul>
        </Preloader>
        <div ref={triggerRef} className="relative -top-96" />
      </>
    );

  return <></>;
};
