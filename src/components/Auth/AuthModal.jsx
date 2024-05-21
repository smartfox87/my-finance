import { GoogleAuth } from "@/components/Auth/GoogleAuth.jsx";
import { DemoUserAuth } from "@/components/Auth/DemoUserAuth.jsx";
import { SideModal } from "@/components/Modals/SideModal.jsx";
import { DefaultForm } from "@/components/Form/DefaultForm.tsx";

export const AuthModal = ({ type, title, isOpen, onToggleVisibility, onSaveForm, fields }) => {
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
      <DefaultForm fields={fields} data-cy={`${type}-form`} onSaveForm={onSaveForm} onResetForm={onToggleVisibility} />
    </SideModal>
  );
};
