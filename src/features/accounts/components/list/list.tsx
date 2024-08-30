import { Item } from "../item";
import { selectAccountsList } from "../../selectors";
import { useAppSelector } from "@/hooks/store";

export const List = () => {
  const accountsList = useAppSelector(selectAccountsList);

  return (
    <ul className="flex flex-col gap-4">
      {accountsList?.map((account) => (
        <li key={account.id}>
          <Item {...account} />
        </li>
      ))}
    </ul>
  );
};
