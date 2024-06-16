import { FieldTypes, type FormField } from "@/types/form";

export const INITIAL_CONTACT_FIELDS: FormField[] = [
  {
    id: "full_name",
    label_translation: "simple.full_name",
    value: "",
    type: FieldTypes.TEXT,
    focus: true,
  },
  {
    id: "email",
    label_translation: "simple.email",
    value: "",
    type: FieldTypes.EMAIL,
    required: true,
  },
  {
    id: "subject",
    label_translation: "complex.subject.label",
    value: "",
    type: FieldTypes.SELECT,
    required: true,
    options: [
      { label_translation: "complex.subject.options.feedback", value: "feedback" },
      { label_translation: "complex.subject.options.bug", value: "bug" },
      { label_translation: "complex.subject.options.support", value: "support" },
      { label_translation: "complex.subject.options.suggestion", value: "suggestion" },
      { label_translation: "complex.subject.options.collaboration", value: "collaboration" },
      { label_translation: "complex.subject.options.other", value: "other" },
    ],
  },
  {
    id: "message",
    label_translation: "simple.message",
    value: "",
    type: FieldTypes.TEXTAREA,
    required: true,
  },
  {
    id: "files",
    label_translation: "simple.attachments",
    value: [],
    type: FieldTypes.FILE,
    maxCount: 3,
    multiple: true,
    accept: "image/*,video/*",
    maxSize: 5 * 1024 * 1024,
  },
];
