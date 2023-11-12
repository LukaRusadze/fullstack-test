type Props<T> = {
  each?: T[];
  children: (item: T) => React.ReactNode;
};

export function For<T>({ children, each }: Props<T>) {
  return each?.map(children);
}
