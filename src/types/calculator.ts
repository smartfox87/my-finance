import { ChangeEvent, KeyboardEvent, MouseEvent } from "react";

export type CalculatorSaveHandler = (value: number) => void;

export type CalculatorRef = {
  clear: () => void;
};

export type ResultKeyDownHandler = {
  (event: KeyboardEvent<HTMLInputElement>): void;
};

export type ResultChangeHandler = {
  (event: ChangeEvent<HTMLInputElement>): void;
};

export type ButtonClickHandler = {
  (event: MouseEvent<HTMLButtonElement>): void;
};
