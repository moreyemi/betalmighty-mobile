import React, { useState, useRef, useEffect } from 'react';
import { View, Text, SafeAreaView, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import { useTheme } from '@hooks/index';
import { Button, Toast } from '@components/index';
import { spacing, typography } from '@theme/index';

interface OTPVerificationScreenProps {
  navigation: any;
  route: any;
}

export const OTPVerificationScreen: React.FC<OTPVerificationScreenProps> = ({ navigation, route }) => {
  const { colors: palette } = useTheme();
  const { phone, email, isLogin } = route.params;
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [loading, setLoading] = useState(false);
  const [toastVisible, setToastVisible] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [timer, setTimer] = useState(60);
  const inputs = useRef<TextInput[]>([]);

  useEffect(() => {
    if (timer > 0) {
      const interval = setInterval(() => setTimer((t) => t - 1), 1000);
      return () => clearInterval(interval);
    }
  }, [timer]);

  const handleOtpChange = (value: string, index: number) => {
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value && index < 5) {
      inputs.current[index + 1]?.focus();
    }
  };

  const handleVerify = async () => {
    const otpString = otp.join('');
    if (otpString.length !== 6) {
      setToastMessage('Please enter all 6 digits');
      setToastVisible(true);
      return;
    }

    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      if (isLogin) {
        navigation.navigate('MainApp');
      } else {
        navigation.navigate('ProfileSetup');
      }
    }, 2000);
  };

  const handleResend = () => {
    setOtp(['', '', '', '', '', '']);
    setTimer(60);
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: palette.background }}>
      <ScrollView contentContainerStyle={{ padding: spacing[4], justifyContent: 'center', flex: 1 }}>
        <View style={{ marginBottom: spacing[8] }}>
          <Text style={{
            fontSize: typography.sizes['3xl'],
            fontWeight: typography.weights.bold,
            color: palette.text
          }}>
            Verify OTP
          </Text>
          <Text style={{
            fontSize: typography.sizes.base,
            color: palette.textSecondary,
            marginTop: spacing[2]
          }}>
            Enter the 6-digit code sent to {phone || email}
          </Text>
        </View>

        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: spacing[8] }}>
          {otp.map((digit, index) => (
            <TextInput
              key={index}
              ref={(input) => (inputs.current[index] = input!)}
              maxLength={1}
              keyboardType="number-pad"
              value={digit}
              onChangeText={(value) => handleOtpChange(value, index)}
              style={{
                width: '14%',
                height: 50,
                borderWidth: 2,
                borderColor: digit ? palette.orange : palette.border,
                borderRadius: 12,
                fontSize: typography.sizes.lg,
                fontWeight: typography.weights.bold,
                textAlign: 'center',
                color: palette.text,
                backgroundColor: palette.surface
              }}
            />
          ))}
        </View>

        <Button label="Verify OTP" onPress={handleVerify} loading={loading} fullWidth style={{ marginBottom: spacing[4] }} />

        <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
          <Text style={{ color: palette.textSecondary, fontSize: typography.sizes.sm }}>Didn't receive code? </Text>
          <TouchableOpacity onPress={handleResend} disabled={timer > 0}>
            <Text style={{
              color: timer > 0 ? palette.textSecondary : palette.orange,
              fontSize: typography.sizes.sm,
              fontWeight: typography.weights.semibold
            }}>
              {timer > 0 ? `Resend in ${timer}s` : 'Resend'}
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      <Toast visible={toastVisible} message={toastMessage} type="error" onHide={() => setToastVisible(false)} />
    </SafeAreaView>
  );
};
