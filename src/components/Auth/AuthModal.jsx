import { GoogleAuth } from "@/components/Auth/GoogleAuth.jsx";
import { DemoUserAuth } from "@/components/Auth/DemoUserAuth.jsx";
import { SideModal } from "@/components/Modals/SideModal.jsx";
import { DefaultForm } from "@/components/Form/DefaultForm.tsx";

export const AuthModal = ({ title, isOpen, onToggleVisibility, onSaveForm, fields }) => {
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
