import { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import type { UseMount } from '@interfaces/hooks/useMount';

export const useMount = (): UseMount => {
  const [mount, setMount] = useState<boolean>(true);
  const navigate = useNavigate();

  let timeout: NodeJS.Timeout | null = null;

  const handleNavigate = useCallback(
    (path: string) => (): void => {
      setMount(false);
      timeout = setTimeout(() => {
        navigate(`/${path}`);
      }, 300);
    },
    [],
  );

  useEffect(() => {
    return (): void => {
      if (timeout) {
        clearTimeout(timeout);
      }
    };
  }, [timeout]);

  return { mount, handleNavigate };
};
