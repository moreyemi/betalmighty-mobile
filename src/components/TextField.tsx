import React, { useState } from 'react';
import { TextInput, View, Text, ViewStyle, TextInputProps } from 'react-native';
import { useTheme } from '@hooks/index';
import { spacing, typography } from '@theme/index';

interface TextFieldProps extends TextInputProps {
  label?: string;
  error?: string;
  helper?: string;
  containerStyle?: ViewStyle;
}

export const TextField: React.FC<TextFieldProps> = ({
  label,
  error,
  helper,
  containerStyle,
  ...props
}) => {
  const { colors: palette } = useTheme();
  const [isFocused, setIsFocused] = useState(false);

  return (
    <View style={containerStyle}>
      {label && (
        <Text style={{
          fontSize: typography.sizes.sm,
          fontWeight: typography.weights.medium,
          color: palette.text,
          marginBottom: spacing[2]
        }}>
          {label}
        </Text>
      )}
      <TextInput
        {...props}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        style={[
          {
            borderWidth: 1,
            borderColor: error ? palette.error : isFocused ? palette.orange : palette.border,
            borderRadius: 12,
            paddingVertical: spacing[3],
            paddingHorizontal: spacing[4],
            fontSize: typography.sizes.base,
            color: palette.text,
            backgroundColor: palette.surface
          },
          props.style
        ]}
        placeholderTextColor={palette.textSecondary}
      />
      {error && (
        <Text style={{
          fontSize: typography.sizes.xs,
          color: palette.error,
          marginTop: spacing[1]
        }}>
          {error}
        </Text>
      )}
      {helper && !error && (
        <Text style={{
          fontSize: typography.sizes.xs,
          color: palette.textSecondary,
          marginTop: spacing[1]
        }}>
          {helper}
        </Text>
      )}
    </View>
  );
};
