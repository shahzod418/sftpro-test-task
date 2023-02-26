export type UseMount = {
  mount: boolean;
  handleNavigate: (path: string) => () => void;
};
