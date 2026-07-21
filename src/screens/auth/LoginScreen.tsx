import React, { useState } from 'react';
import { View, Text, ScrollView, SafeAreaView, TouchableOpacity } from 'react-native';
import { useTheme } from '@hooks/index';
import { Button, TextField, Toast } from '@components/index';
import { spacing, typography } from '@theme/index';

interface LoginScreenProps {
  navigation: any;
}

export const LoginScreen: React.FC<LoginScreenProps> = ({ navigation }) => {
  const { colors: palette } = useTheme();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [toastVisible, setToastVisible] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

  const handleLogin = async () => {
    if (!email || !password) {
      setToastMessage('Please fill all fields');
      setToastVisible(true);
      return;
    }

    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      navigation.navigate('OTPVerification', { email, isLogin: true });
    }, 2000);
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
            Welcome Back
          </Text>
          <Text style={{
            fontSize: typography.sizes.base,
            color: palette.textSecondary,
            marginTop: spacing[2]
          }}>
            Login to your BetAlmighty account
          </Text>
        </View>

        <TextField label="Email or Phone" placeholder="john@example.com" keyboardType="email-address" value={email} onChangeText={setEmail} containerStyle={{ marginBottom: spacing[4] }} />
        <TextField label="Password" placeholder="••••••••" secureTextEntry value={password} onChangeText={setPassword} containerStyle={{ marginBottom: spacing[2] }} />

        <TouchableOpacity onPress={() => navigation.navigate('ForgotPassword')} style={{ marginBottom: spacing[6] }}>
          <Text style={{ color: palette.orange, fontSize: typography.sizes.sm, fontWeight: typography.weights.semibold, textAlign: 'right' }}>Forgot Password?</Text>
        </TouchableOpacity>

        <Button label="Login" onPress={handleLogin} loading={loading} fullWidth style={{ marginBottom: spacing[4] }} />

        <TouchableOpacity onPress={() => navigation.navigate('Signup')} style={{ alignItems: 'center' }}>
          <Text style={{ color: palette.textSecondary, fontSize: typography.sizes.base }}>Don't have an account? <Text style={{ color: palette.orange, fontWeight: typography.weights.semibold }}>Sign Up</Text></Text>
        </TouchableOpacity>
      </ScrollView>

      <Toast visible={toastVisible} message={toastMessage} type="error" onHide={() => setToastVisible(false)} />
    </SafeAreaView>
  );
};
