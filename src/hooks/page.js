import { useParams, usePathname } from "next/navigation";

export const usePage = () => {
  const pathname = usePathname();
  const { locale } = useParams();
  let page = pathname.replace(`/${locale}`, "").split("/")[1];
  if (!page?.length) page = "home";
  return { page };
};
