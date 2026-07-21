import React from 'react';
import { View, ViewStyle } from 'react-native';
import { useTheme } from '@hooks/index';
import { spacing } from '@theme/index';

interface GlassCardProps {
  children: React.ReactNode;
  style?: ViewStyle;
}

export const GlassCard: React.FC<GlassCardProps> = ({ children, style }) => {
  const { colors: palette } = useTheme();

  const glassStyle: ViewStyle = {
    backgroundColor: palette.glass,
    borderRadius: 16,
    padding: spacing[4],
    borderWidth: 1,
    borderColor: palette.border,
    borderOpacity: 0.2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
    ...style
  };

  return <View style={glassStyle}>{children}</View>;
};
