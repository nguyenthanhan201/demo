import { PaletteMode } from '../hooks/useTheme';

enum LocalStorageKey {
  THEME = 'theme'
}

export const getThemeFromLS = (): PaletteMode => {
  if (typeof window === 'undefined') return 'dark';

  const theme = localStorage.getItem(LocalStorageKey.THEME);
  return theme ? JSON.parse(theme) : 'dark';
};
