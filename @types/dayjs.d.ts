import type { ManipulateType, Dayjs } from "dayjs";

declare module "dayjs" {
  interface Dayjs {
    add(value: number, unit: ManipulateType | "quarter"): Dayjs;
    subtract(value: number, unit: ManipulateType | "quarter"): Dayjs;
  }
}
