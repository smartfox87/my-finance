import PropTypes from "prop-types";
import { useTranslation } from "react-i18next";
import { usePage } from "@/hooks/page.js";
import { AuthGuard } from "@/components/Auth/AuthGuard.jsx";
import { useSelector } from "react-redux";
import { selectUser } from "@/store/selectors/auth.js";

export const InnerLayout = ({ title, description, children, headerActions, isAuth = true }) => {
  const user = useSelector(selectUser);
  const { t } = useTranslation();
  const { page } = usePage();
  const titleText = title || t(`pages.${page}.title`);
  const descriptionText = description || t(`pages.${page}.description`);

  return (
    <section className="relative flex grow flex-col gap-4 lg:gap-8">
      <div className="flex flex-col gap-2">
        <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-2">
          <h1 className="text-2xl font-bold lg:text-3xl">{titleText}</h1>
          {((isAuth && user) || !isAuth) && headerActions}
        </div>
        {descriptionText && <p className="lg:text-lg">{descriptionText}</p>}
      </div>
      {isAuth ? <AuthGuard>{children}</AuthGuard> : children}
    </section>
  );
};

InnerLayout.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
  headerActions: PropTypes.node,
  children: PropTypes.node,
  isAuth: PropTypes.bool,
};
