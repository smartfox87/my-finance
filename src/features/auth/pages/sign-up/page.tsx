import { DemoUserAuth } from "@/components/demo-user-auth";
import { GoogleAuth, SignUp } from "../../components";
import { useTranslation } from "react-i18next";
import { useRouter } from "next/navigation";
import { Button } from "antd";

export default function Page() {
  const { t } = useTranslation();
  const router = useRouter();

  return (
    <section className="mx-auto flex w-full max-w-[600px] grow flex-col gap-y-8">
      <header className="sticky top-0 z-20 flex flex-col gap-4 border-b border-b-gray-300 bg-white py-6 dark:bg-dark">
        <h1 className="text-3xl">{t("pages.sign-up.title")}</h1>
        <p className="text-lg">{t("pages.sign-up.description")}</p>
      </header>
      <SignUp />
      <div className="sticky bottom-0 z-20 mt-auto flex flex-col gap-4 bg-white py-6 dark:bg-dark">
        <Button size="large" type="primary" onClick={() => router.push("/auth/sign-in")}>
          {t("buttons.sign_in")}
        </Button>
        <GoogleAuth />
        <DemoUserAuth />
      </div>
    </section>
  );
}
