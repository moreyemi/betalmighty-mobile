import React, { useEffect } from 'react';
import { Animated, View, Text } from 'react-native';
import { useTheme } from '@hooks/index';
import { spacing, typography } from '@theme/index';

type ToastType = 'success' | 'error' | 'info' | 'warning';

interface ToastProps {
  visible: boolean;
  message: string;
  type?: ToastType;
  duration?: number;
  onHide?: () => void;
}

export const Toast: React.FC<ToastProps> = ({
  visible,
  message,
  type = 'info',
  duration = 3000,
  onHide
}) => {
  const { colors: palette } = useTheme();
  const fadeAnim = React.useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (visible) {
      Animated.sequence([
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true
        }),
        Animated.delay(duration),
        Animated.timing(fadeAnim, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true
        })
      ]).start(() => onHide?.());
    }
  }, [visible]);

  const bgColors = {
    success: palette.success,
    error: palette.error,
    warning: palette.warning,
    info: palette.navy
  };

  if (!visible) return null;

  return (
    <Animated.View style={[{
      opacity: fadeAnim,
      backgroundColor: bgColors[type],
      paddingHorizontal: spacing[4],
      paddingVertical: spacing[3],
      borderRadius: 12,
      marginHorizontal: spacing[4]
    }]}>
      <Text style={{
        color: '#FFFFFF',
        fontSize: typography.sizes.base,
        fontWeight: typography.weights.medium
      }}>
        {message}
      </Text>
    </Animated.View>
  );
};
