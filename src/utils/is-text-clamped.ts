export const isTextClamped = (element: HTMLElement): boolean => element.scrollHeight > element.clientHeight || element.scrollWidth > element.clientWidth;
