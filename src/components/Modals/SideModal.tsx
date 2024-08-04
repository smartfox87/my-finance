import { useViewport } from "@/hooks/viewport";
import { Preloader } from "@/components/Layout/Preloader";
import { ReactNode, SetStateAction, useEffect } from "react";
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
  onMountContent,
}: {
  isOpen: boolean;
  children: ReactNode;
  onClose: () => void;
  title?: string;
  footer?: ReactNode;
  isLoading?: boolean;
  onMountContent?: (value: SetStateAction<boolean>) => void;
}) => {
  const { isMobile } = useViewport();
  const placement = isMobile ? "bottom" : "right";
  const { isInitializedModal, setIsInitializedModal } = useModalState();

  useEffect(() => {
    if (isOpen && !isInitializedModal) setIsInitializedModal(true);
  }, [isOpen, isInitializedModal]);

  const handleOpenChange = (visible: boolean): void => {
    if (onMountContent) onMountContent(visible);
  };

  return (
    <>
      {isInitializedModal && (
        <Modal
          title={title}
          placement={placement}
          open={isOpen}
          height="100%"
          width={550}
          destroyOnClose={true}
          classNames={{ body: "flex flex-col" }}
          onClose={onClose}
          afterOpenChange={handleOpenChange}
        >
          <Preloader isLoading={isLoading}>
            {children}
            {footer && <div className="sticky -bottom-6 z-20 -mb-6 mt-auto flex flex-col gap-4 bg-white pb-6 pt-4 dark:bg-dark-modal">{footer}</div>}
          </Preloader>
        </Modal>
      )}
    </>
  );
};
