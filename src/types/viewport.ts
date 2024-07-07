export const Breakpoints = {
  "XL-MAX": 2560,
  "XL-MID": 1920,
  "XL-MIN": 1440,
  "LG-MAX": 1439,
  "LG-MIN": 1280,
  "MD-MAX": 1279,
  "MD-MIN": 1024,
  "SM-MAX": 1023,
  "SM-MIN": 768,
  "XS-MAX": 767,
  "XS-MIN": 640,
  "2XS-MAX": 639,
  "2XS-MIN": 480,
  "3XS-MAX": 479,
  "3XS-MIN": 380,
  "4XS-MAX": 379,
  "4XS-MIN": 0,
};

export enum Viewports {
  XL = "xl",
  LG = "lg",
  MD = "md",
  SM = "sm",
  XS = "xs",
  XXS = "xxs",
}

export type Viewport = `${Viewports}`;
