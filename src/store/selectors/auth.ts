import { LazyLoadedSlices } from "@/store";

export const selectUser = ({ auth }: LazyLoadedSlices) => auth?.user || null;
