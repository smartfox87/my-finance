export const checkIsTextClamped = (element: HTMLElement): boolean => element.scrollHeight > element.clientHeight || element.scrollWidth > element.clientWidth;
