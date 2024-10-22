import { showNotification } from "@/utils/show-notification";
import { NotificationTypes } from "@/types/modals";
import { i18nRef } from "@/i18n";

export const showCommonError = ({ title, error }: { title?: string; error?: unknown } = {}): void => {
  if (error) console.error(error);
  if (title) showNotification({ title, type: NotificationTypes.ERROR });
  else if (i18nRef.t) showNotification({ title: i18nRef.t("notifications.error.common"), type: NotificationTypes.ERROR });
};
