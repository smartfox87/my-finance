import { useSelector } from "react-redux";
import { selectProfile } from "@/store/selectors/profile.jsx";
import SvgUser from "@/assets/sprite/user.svg";
import Link from "next/link";
import { useViewport } from "@/hooks/viewport";
import { useMemo } from "react";
import { useModalState } from "@/hooks/providers/modalState";

export const ProfileMenu = () => {
  const { viewport } = useViewport();
  const isMobile = useMemo(() => ["sm", "xs", "xxs"].includes(viewport), [viewport]);

  const { setIsOpenMenuModal } = useModalState();
  const handleLinkClick = () => isMobile && setIsOpenMenuModal(false);

  const profile = useSelector(selectProfile);
  if (!profile) return null;
  const { full_name } = profile;

  return (
    <>
      <Link href="/profile" className="group flex cursor-pointer items-center gap-3" onClick={handleLinkClick}>
        <div className="rounded-full bg-black/50 p-1 text-white duration-300 group-hover:bg-black/80 dark:bg-white/50 dark:text-dark dark:group-hover:bg-white/80">
          <SvgUser className="h-6 w-6 dark:text-dark" />
        </div>
        <div className="font-bold text-black/80 group-hover:underline dark:text-white/80">{full_name}</div>
      </Link>
    </>
  );
};
