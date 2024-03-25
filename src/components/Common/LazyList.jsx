import PropTypes from "prop-types";
import { useEffect, useRef, useState } from "react";
import { Preloader } from "@/components/Layout/Preloader.jsx";
import { useViewport } from "@/hooks/viewport.js";

let blankArray = new Array(3).fill(null);

export const LazyList = ({ items = [], Item }) => {
  const { viewport } = useViewport();
  const loadItemsQuantity = ["xs", "xxs"].includes(viewport) ? 12 : ["md", "sm"].includes(viewport) ? 18 : 24;
  const [lazyItems, setLazyItems] = useState(items.slice(0, loadItemsQuantity));
  const observer = useRef(null);
  const triggerRef = useRef(null);
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
    observer.current.observe(triggerRef.current);
    return () => observer.current.disconnect();
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
            {blankArray.map((item, index) => (
              <li key={index} className="w-[250px] min-w-[200px] max-w-[500px] grow"></li>
            ))}
          </ul>
        </Preloader>
        <div ref={triggerRef} className="relative -top-96" />
      </>
    );

  return <></>;
};

LazyList.propTypes = {
  items: PropTypes.array,
  Item: PropTypes.elementType,
};
