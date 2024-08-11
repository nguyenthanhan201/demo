type ListProps<T> = {
  items: T[];
  renderItem: (item: T) => React.ReactNode; //Or JSX.Element
};

const RegularList = <T extends {}>({ items, renderItem }: ListProps<T>) => {
  return (
    <ul>
      {items.map((item, index) => (
        <li key={index}>
          {/* <ItemComponent key={index} {...{ [sourceName]: item }} /> */}
          {renderItem(item)}
        </li>
      ))}
    </ul>
  );
};

export default RegularList;
