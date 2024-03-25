import { GoogleAuth } from "@/components/Auth/GoogleAuth.jsx";
import { DemoUserAuth } from "@/components/Auth/DemoUserAuth.jsx";
import { SideModal } from "@/components/Modals/SideModal.jsx";
import { DefaultForm } from "@/components/Form/DefaultForm.jsx";
import PropTypes from "prop-types";
import { useEffect } from "react";
import { useInjectReducer } from "@/hooks/injectReducer.js";

export const AuthModal = ({ title, isOpen, onToggleVisibility, onSaveForm, fields }) => {
  const { injectReducer } = useInjectReducer();

  useEffect(() => {
    injectReducer("auth");
  }, [injectReducer]);

  return (
    <SideModal
      title={title}
      isOpen={isOpen}
      footer={
        <>
          <DemoUserAuth />
          <GoogleAuth />
        </>
      }
      onClose={onToggleVisibility}
    >
      <DefaultForm fields={fields} onSaveForm={onSaveForm} onResetForm={onToggleVisibility} />
    </SideModal>
  );
};

AuthModal.propTypes = {
  title: PropTypes.string,
  isOpen: PropTypes.bool,
  onToggleVisibility: PropTypes.func,
  onSaveForm: PropTypes.func,
  fields: PropTypes.array,
};
