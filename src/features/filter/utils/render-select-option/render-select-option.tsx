import type { FlattenOptionData } from "rc-select/es/interface";
import type { BaseOptionType } from "rc-select/es/Select";
import type { ReactElement } from "react";

export const renderSelectOption = ({ label, value }: FlattenOptionData<BaseOptionType>): ReactElement => <span data-value={value}>{label}</span>;
