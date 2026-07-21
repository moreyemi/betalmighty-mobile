import React, { useState } from 'react';
import { View, Text, ScrollView, SafeAreaView, TouchableOpacity } from 'react-native';
import { useTheme } from '@hooks/index';
import { Button, TextField, Toast } from '@components/index';
import { spacing, typography } from '@theme/index';

interface SignupScreenProps {
  navigation: any;
}

export const SignupScreen: React.FC<SignupScreenProps> = ({ navigation }) => {
  const { colors: palette } = useTheme();
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [referralCode, setReferralCode] = useState('');
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [toastVisible, setToastVisible] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

  const handleSignup = async () => {
    if (!firstName || !lastName || !email || !phone || !password || !passwordConfirm) {
      setToastMessage('Please fill all fields');
      setToastVisible(true);
      return;
    }

    if (password !== passwordConfirm) {
      setToastMessage('Passwords do not match');
      setToastVisible(true);
      return;
    }

    if (!termsAccepted) {
      setToastMessage('Please accept the terms and conditions');
      setToastVisible(true);
      return;
    }

    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      navigation.navigate('OTPVerification', { phone, email });
    }, 2000);
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: palette.background }}>
      <ScrollView contentContainerStyle={{ padding: spacing[4], paddingBottom: spacing[8] }}>
        <View style={{ marginBottom: spacing[6] }}>
          <Text style={{
            fontSize: typography.sizes['3xl'],
            fontWeight: typography.weights.bold,
            color: palette.text
          }}>
            Create Account
          </Text>
          <Text style={{
            fontSize: typography.sizes.base,
            color: palette.textSecondary,
            marginTop: spacing[2]
          }}>
            Join BetAlmighty and start betting
          </Text>
        </View>

        <TextField label="First Name" placeholder="John" value={firstName} onChangeText={setFirstName} containerStyle={{ marginBottom: spacing[4] }} />
        <TextField label="Last Name" placeholder="Doe" value={lastName} onChangeText={setLastName} containerStyle={{ marginBottom: spacing[4] }} />
        <TextField label="Email" placeholder="john@example.com" keyboardType="email-address" value={email} onChangeText={setEmail} containerStyle={{ marginBottom: spacing[4] }} />
        <TextField label="Phone Number" placeholder="+234 801 234 5678" keyboardType="phone-pad" value={phone} onChangeText={setPhone} containerStyle={{ marginBottom: spacing[4] }} />
        <TextField label="Password" placeholder="••••••••" secureTextEntry value={password} onChangeText={setPassword} containerStyle={{ marginBottom: spacing[4] }} />
        <TextField label="Confirm Password" placeholder="••••••••" secureTextEntry value={passwordConfirm} onChangeText={setPasswordConfirm} containerStyle={{ marginBottom: spacing[4] }} />
        <TextField label="Referral Code (Optional)" placeholder="Enter referral code" value={referralCode} onChangeText={setReferralCode} containerStyle={{ marginBottom: spacing[6] }} />

        <TouchableOpacity onPress={() => setTermsAccepted(!termsAccepted)} style={{ flexDirection: 'row', alignItems: 'center', marginBottom: spacing[6] }}>
          <View style={{
            width: 20,
            height: 20,
            borderWidth: 1,
            borderColor: palette.orange,
            borderRadius: 4,
            backgroundColor: termsAccepted ? palette.orange : 'transparent',
            marginRight: spacing[2],
            justifyContent: 'center',
            alignItems: 'center'
          }}>
            {termsAccepted && <Text style={{ color: '#FFFFFF', fontSize: typography.sizes.sm }}>✓</Text>}
          </View>
          <Text style={{ color: palette.text, fontSize: typography.sizes.sm }}>I accept Terms & Conditions</Text>
        </TouchableOpacity>

        <Button label="Create Account" onPress={handleSignup} loading={loading} fullWidth style={{ marginBottom: spacing[4] }} />

        <TouchableOpacity onPress={() => navigation.navigate('Login')} style={{ alignItems: 'center' }}>
          <Text style={{ color: palette.textSecondary, fontSize: typography.sizes.base }}>Already have an account? <Text style={{ color: palette.orange, fontWeight: typography.weights.semibold }}>Login</Text></Text>
        </TouchableOpacity>
      </ScrollView>

      <Toast visible={toastVisible} message={toastMessage} type="error" onHide={() => setToastVisible(false)} />
    </SafeAreaView>
  );
};
