import { GoogleAuth } from "@/components/Auth/GoogleAuth";
import { DemoUserAuth } from "@/components/Auth/DemoUserAuth";
import { SideModal } from "@/components/Modals/SideModal";
import { DefaultForm } from "@/components/Form/DefaultForm";
import { DefaultFormSaveHandler, FormField } from "@/types/form";

export const AuthModal = ({
  type,
  title,
  isOpen,
  onToggleVisibility,
  onSaveForm,
  fields,
}: {
  type: string;
  title: string;
  isOpen: boolean;
  onToggleVisibility: () => void;
  onSaveForm: DefaultFormSaveHandler;
  fields: FormField[];
}) => {
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
