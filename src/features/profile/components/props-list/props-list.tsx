export const PropsList = ({ items, className }: { items: { prop: string; value: string }[]; className: string }) => {
  return (
    <ul className={className}>
      {items.map(({ prop, value }) => (
        <li key={prop} className="flex gap-3">
          <div className="capitalize">{prop}:</div>
          <div className="font-bold">{value}</div>
        </li>
      ))}
    </ul>
  );
};
