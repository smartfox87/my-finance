import { useViewport } from "@/hooks/viewport";
import { Preloader } from "@/components/Layout/Preloader.jsx";
import { lazy, useEffect, useState } from "react";

export const SideModal = ({ title, isOpen, isLoading = false, children, footer, onClose, onInit = () => null }) => {
  const { viewport } = useViewport();
  const placement = ["xs", "xxs"].includes(viewport) ? "bottom" : "right";

  const [Modal, setModal] = useState();
  useEffect(() => {
    if (isOpen) {
      if (Modal) onInit(true);
      else {
        setModal(lazy(() => import("antd/es/drawer")));
        onInit(true);
      }
    }
  }, [isOpen, Modal]);

  return (
    <>
      {Modal && (
        <Modal title={title} placement={placement} open={isOpen} height="100%" width={550} destroyOnClose={true} classNames={{ body: "flex flex-col" }} onClose={onClose}>
          <Preloader isLoading={isLoading}>
            {children}
            {footer && <div className="sticky -bottom-6 z-20 -mb-6 mt-auto flex flex-col gap-4 bg-white pb-6 pt-4 dark:bg-dark-modal">{footer}</div>}
          </Preloader>
        </Modal>
      )}
    </>
  );
};
