import { LazyLoadedSlices } from "@/types/store";

export const selectUser = ({ auth }: LazyLoadedSlices) => auth?.user || null;
