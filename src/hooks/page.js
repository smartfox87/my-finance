import { useParams, usePathname } from "next/navigation";

export const usePage = () => {
  const pathname = usePathname();
  const { lang } = useParams();
  let page = pathname.replace(`/${lang}`, "").split("/")[1];
  if (!page?.length) page = "home";
  return { page };
};
