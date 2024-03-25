import { useSelector } from "react-redux";
import { selectProfile } from "@/store/selectors/profile.jsx";
import SvgUser from "@/assets/sprite/user.svg";
import { getLocalizeUrl } from "@/helpers/url.js";
import Link from "next/link";

export const ProfileMenu = () => {
  const profile = useSelector(selectProfile);
  if (!profile) return null;
  const { full_name } = profile;

  return (
    <>
      <Link href={getLocalizeUrl("/profile")} className="group flex cursor-pointer items-center gap-3">
        <div className="dark:text-dark rounded-full bg-black/50 p-1 text-white duration-300 group-hover:bg-black/80 dark:bg-white/50 dark:group-hover:bg-white/80">
          <SvgUser className="dark:text-dark h-6 w-6" />
        </div>
        <div className="font-bold text-black/80 group-hover:underline dark:text-white/80">{full_name}</div>
      </Link>
    </>
  );
};
