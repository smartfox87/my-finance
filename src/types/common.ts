import type { ReactNode } from "react";

export type PageContentProps = { onGetData: () => Promise<void> };

export type ComponentChildrenProps = { children: ReactNode };

export type ComponentOnSaveProps = { onSave: () => Promise<void> };
