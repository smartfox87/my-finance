export const INITIAL_SIGN_UP_FIELDS = [
  { id: "full_name", label_translation: "simple.full_name", value: "", type: "text" },
  { id: "email", label_translation: "simple.email", value: "", type: "email", required: true, focus: true },
  {
    id: "password",
    label_translation: "simple.password",
    value: "",
    type: "password",
    required: true,
  },
];

export const INITIAL_SIGN_IN_FIELDS = [
  { id: "email", label_translation: "simple.email", value: "", type: "email", required: true, focus: true },
  {
    id: "password",
    label_translation: "simple.password",
    value: "",
    type: "password",
    required: true,
  },
];
