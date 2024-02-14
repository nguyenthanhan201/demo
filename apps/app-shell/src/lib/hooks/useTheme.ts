import { PaletteMode } from '@mui/material';
import { useLocalStorage } from 'my-package/dist/useLocalStorage';
import { useCallback, useEffect } from 'react';

const useTheme = () => {
  const [themeLocal, setThemeLocal] = useLocalStorage<PaletteMode>({
    key: 'theme',
    defaultValue: 'dark'
  });

  useEffect(() => {
    const isDarkTheme = themeLocal === 'dark';
    const root = document.documentElement;
    root?.style.setProperty('--main-bg', isDarkTheme ? '#262833' : '#fff');
    root?.style.setProperty('--main-color', isDarkTheme ? '#fff' : '#262833');
    root?.style.setProperty('--txt-second-color', isDarkTheme ? '#fff' : '#8d8d8d');
  }, [themeLocal]);

  const toggleTheme = useCallback(
    () => setThemeLocal((prevState) => (prevState === 'dark' ? 'light' : 'dark')),
    []
  );

  return { themeLocal, toggleTheme };
};

export default useTheme;
