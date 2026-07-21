import React from 'react';
import { TouchableOpacity, Text, ViewStyle, TextStyle, ActivityIndicator } from 'react-native';
import { useTheme } from '@hooks/index';
import { spacing, typography } from '@theme/index';

type ButtonVariant = 'primary' | 'secondary' | 'ghost';
type ButtonSize = 'sm' | 'md' | 'lg';

interface ButtonProps {
  label: string;
  onPress: () => void;
  variant?: ButtonVariant;
  size?: ButtonSize;
  disabled?: boolean;
  loading?: boolean;
  fullWidth?: boolean;
  style?: ViewStyle;
}

export const Button: React.FC<ButtonProps> = ({
  label,
  onPress,
  variant = 'primary',
  size = 'md',
  disabled = false,
  loading = false,
  fullWidth = false,
  style
}) => {
  const { colors: palette } = useTheme();

  const sizeConfig = {
    sm: { paddingVertical: spacing[2], paddingHorizontal: spacing[3] },
    md: { paddingVertical: spacing[3], paddingHorizontal: spacing[4] },
    lg: { paddingVertical: spacing[4], paddingHorizontal: spacing[6] }
  };

  const variantConfig = {
    primary: {
      backgroundColor: disabled ? palette.textSecondary : palette.orange,
      borderColor: palette.orange,
      textColor: '#FFFFFF'
    },
    secondary: {
      backgroundColor: 'transparent',
      borderColor: palette.navy,
      textColor: palette.text
    },
    ghost: {
      backgroundColor: 'transparent',
      borderColor: 'transparent',
      textColor: palette.orange
    }
  };

  const config = variantConfig[variant];

  const buttonStyles: ViewStyle = {
    ...sizeConfig[size],
    borderRadius: 12,
    borderWidth: variant === 'secondary' ? 1 : 0,
    borderColor: config.borderColor,
    backgroundColor: config.backgroundColor,
    width: fullWidth ? '100%' : 'auto',
    opacity: disabled ? 0.6 : 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    ...style
  };

  const textStyles: TextStyle = {
    fontSize: typography.sizes.base,
    fontWeight: typography.weights.semibold,
    color: config.textColor
  };

  return (
    <TouchableOpacity
      style={buttonStyles}
      onPress={onPress}
      disabled={disabled || loading}
      activeOpacity={0.7}
    >
      {loading && <ActivityIndicator color={config.textColor} size="small" style={{ marginRight: spacing[2] }} />}
      <Text style={textStyles}>{label}</Text>
    </TouchableOpacity>
  );
};
