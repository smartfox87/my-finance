import { selectProfile } from "../../../profile/selectors";
import SvgUser from "@/assets/sprite/user.svg";
import Link from "next/link";
import { useViewport } from "@/hooks/viewport";
import { useModalState } from "@/hooks/providers/modalState";
import { useAppSelector } from "@/hooks/store";

export const ProfileMenu = () => {
  const { isTablet } = useViewport();

  const { setIsOpenMenuModal } = useModalState();
  const handleLinkClick = () => isTablet && setIsOpenMenuModal(false);

  const profile = useAppSelector(selectProfile);
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
