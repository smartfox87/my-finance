import { DemoUserAuth } from "@/components/demo-user-auth";
import { GoogleAuth, SignIn } from "../../components";
import { useTranslation } from "react-i18next";

export default function Page() {
  const { t } = useTranslation();

  return (
    <section className="mx-auto flex w-full max-w-[600px] grow flex-col gap-y-8">
      <header className="sticky top-0 z-20 flex flex-col gap-4 border-b border-b-gray-300 bg-white py-6 dark:bg-dark">
        <h1 className="text-3xl">{t("pages.sign-in.title")}</h1>
        <p className="text-lg">{t("pages.sign-in.description")}</p>
      </header>
      <SignIn />
      <div className="sticky bottom-0 z-20 mt-auto flex flex-col gap-4 bg-white py-6 dark:bg-dark">
        <GoogleAuth />
        <DemoUserAuth />
      </div>
    </section>
  );
}
