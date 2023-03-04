import type { Path } from '@constants/routes';

export type UseMount = {
  mount: boolean;
  handleNavigate: (path: Path) => () => void;
};
