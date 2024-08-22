import { AccountListItem } from "@/components/accounts/AccountListItem";
import { useSelector } from "react-redux";
import { selectAccountsList } from "@/store/selectors/accounts";

export const AccountsList = () => {
  const accountsList = useSelector(selectAccountsList);

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
