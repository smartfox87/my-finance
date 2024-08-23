import { AccountListItem } from "@/components/accounts/AccountListItem";
import { selectAccountsList } from "@/store/selectors/accounts";
import { useAppSelector } from "@/hooks/store";

export const AccountsList = () => {
  const accountsList = useAppSelector(selectAccountsList);

  return (
    <ul className="flex flex-col gap-4">
      {accountsList?.map((account) => (
        <li key={account.id}>
          <AccountListItem {...account} />
        </li>
      ))}
    </ul>
  );
};
