import { useColorScheme } from 'react-native';
import { useAppSelector } from './useRedux';
import { colors } from '@theme/index';

export const useTheme = () => {
  const systemColorScheme = useColorScheme();
  const themeMode = useAppSelector((state) => state.theme.mode);

  const isDark = themeMode === 'dark' || (themeMode === 'system' && systemColorScheme === 'dark');
  const palette = isDark ? colors.dark : colors.light;

  return {
    isDark,
    colors: palette
  };
};
