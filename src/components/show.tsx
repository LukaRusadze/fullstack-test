type Props = {
  when: boolean;
  fallback: React.ReactNode;
  children?: React.ReactNode | React.ReactNode[];
};

export function Show({ when, fallback, children }: Props) {
  return when ? children : fallback;
}
