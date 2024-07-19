import { useViewport } from "@/hooks/viewport";
import { Preloader } from "@/components/Layout/Preloader.jsx";
import { lazy, ReactNode, useEffect, useState } from "react";
import { useModalState } from "@/hooks/providers/modalState";
import dynamic from "next/dynamic";

const Modal = dynamic(() => import("antd/es/drawer"));

export const SideModal = ({
  title,
  isOpen,
  isLoading = false,
  children,
  footer,
  onClose,
  onInit,
}: {
  title: string;
  isOpen: boolean;
  children: ReactNode;
  onClose: () => void;
  footer?: ReactNode;
  isLoading?: boolean;
  onInit?: (isInit: boolean) => void;
}) => {
  const { viewport } = useViewport();
  const placement = ["xs", "xxs"].includes(viewport) ? "bottom" : "right";
  const { isInitializedModal, setIsInitializedModal } = useModalState();
  const handleInit = () => onInit && onInit(true);

  useEffect(() => {
    if (isOpen) {
      if (!isInitializedModal) setIsInitializedModal(true);
      handleInit();
    }
  }, [isOpen, Modal]);

  return (
    <>
      {isInitializedModal && (
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
