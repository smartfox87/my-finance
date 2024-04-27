import { ReactNodeLike } from "prop-types";

export default async function RootLayout({ children }: { children: ReactNodeLike }) {
  return <>{children}</>;
}
