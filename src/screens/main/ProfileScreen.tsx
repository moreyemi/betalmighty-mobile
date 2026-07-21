import React, { useState } from 'react';
import { View, Text, ScrollView, SafeAreaView, TouchableOpacity, Switch } from 'react-native';
import { useTheme } from '@hooks/index';
import { useAppSelector, useAppDispatch } from '@hooks/index';
import { Button } from '@components/index';
import { spacing, typography } from '@theme/index';
import { setThemeMode } from '@store/themeSlice';
import { logout } from '@store/authSlice';

interface ProfileScreenProps {
  navigation: any;
}

export const ProfileScreen: React.FC<ProfileScreenProps> = ({ navigation }) => {
  const { colors: palette, isDark } = useTheme();
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.auth.user);
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);

  const handleLogout = () => {
    dispatch(logout());
    navigation.navigate('Auth');
  };

  const toggleTheme = () => {
    const newMode = isDark ? 'light' : 'dark';
    dispatch(setThemeMode(newMode as any));
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: palette.background }}>
      <ScrollView contentContainerStyle={{ paddingHorizontal: spacing[4], paddingVertical: spacing[4] }}>
        <Text style={{
          fontSize: typography.sizes['2xl'],
          fontWeight: typography.weights.bold,
          color: palette.text,
          marginBottom: spacing[6]
        }}>
          Profile
        </Text>

        <View style={{
          flexDirection: 'row',
          alignItems: 'center',
          paddingHorizontal: spacing[4],
          paddingVertical: spacing[4],
          backgroundColor: palette.surface,
          borderRadius: 12,
          marginBottom: spacing[6],
          borderWidth: 1,
          borderColor: palette.border
        }}>
          <View style={{
            width: 60,
            height: 60,
            borderRadius: 30,
            backgroundColor: palette.orange,
            justifyContent: 'center',
            alignItems: 'center',
            marginRight: spacing[4]
          }}>
            <Text style={{
              fontSize: typography.sizes['2xl'],
              fontWeight: typography.weights.bold,
              color: '#FFFFFF'
            }}>
              {user?.firstName?.charAt(0)}
            </Text>
          </View>
          <View>
            <Text style={{
              fontSize: typography.sizes.lg,
              fontWeight: typography.weights.bold,
              color: palette.text
            }}>
              {user?.firstName} {user?.lastName}
            </Text>
            <Text style={{
              fontSize: typography.sizes.sm,
              color: palette.textSecondary,
              marginTop: spacing[1]
            }}>
              {user?.email}
            </Text>
          </View>
        </View>

        <Text style={{
          fontSize: typography.sizes.base,
          fontWeight: typography.weights.semibold,
          color: palette.text,
          marginBottom: spacing[3]
        }}>
          Account
        </Text>

        <TouchableOpacity
          onPress={() => navigation.navigate('EditProfile')}
          style={{
            paddingHorizontal: spacing[3],
            paddingVertical: spacing[3],
            backgroundColor: palette.surface,
            borderRadius: 12,
            marginBottom: spacing[2],
            borderWidth: 1,
            borderColor: palette.border,
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center'
          }}
        >
          <Text style={{ fontSize: typography.sizes.base, color: palette.text }}>Edit Profile</Text>
          <Text style={{ fontSize: typography.sizes.lg, color: palette.textSecondary }}>›</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => navigation.navigate('KYCStatus')}
          style={{
            paddingHorizontal: spacing[3],
            paddingVertical: spacing[3],
            backgroundColor: palette.surface,
            borderRadius: 12,
            marginBottom: spacing[2],
            borderWidth: 1,
            borderColor: palette.border,
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center'
          }}
        >
          <Text style={{ fontSize: typography.sizes.base, color: palette.text }}>KYC Status</Text>
          <Text style={{ fontSize: typography.sizes.lg, color: palette.textSecondary }}>›</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => navigation.navigate('ChangePassword')}
          style={{
            paddingHorizontal: spacing[3],
            paddingVertical: spacing[3],
            backgroundColor: palette.surface,
            borderRadius: 12,
            marginBottom: spacing[6],
            borderWidth: 1,
            borderColor: palette.border,
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center'
          }}
        >
          <Text style={{ fontSize: typography.sizes.base, color: palette.text }}>Change Password</Text>
          <Text style={{ fontSize: typography.sizes.lg, color: palette.textSecondary }}>›</Text>
        </TouchableOpacity>

        <Text style={{
          fontSize: typography.sizes.base,
          fontWeight: typography.weights.semibold,
          color: palette.text,
          marginBottom: spacing[3]
        }}>
          Preferences
        </Text>

        <View style={{
          paddingHorizontal: spacing[3],
          paddingVertical: spacing[3],
          backgroundColor: palette.surface,
          borderRadius: 12,
          marginBottom: spacing[2],
          borderWidth: 1,
          borderColor: palette.border,
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          <Text style={{ fontSize: typography.sizes.base, color: palette.text }}>Dark Mode</Text>
          <Switch value={isDark} onValueChange={toggleTheme} />
        </View>

        <View style={{
          paddingHorizontal: spacing[3],
          paddingVertical: spacing[3],
          backgroundColor: palette.surface,
          borderRadius: 12,
          marginBottom: spacing[6],
          borderWidth: 1,
          borderColor: palette.border,
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          <Text style={{ fontSize: typography.sizes.base, color: palette.text }}>Notifications</Text>
          <Switch value={notificationsEnabled} onValueChange={setNotificationsEnabled} />
        </View>

        <Text style={{
          fontSize: typography.sizes.base,
          fontWeight: typography.weights.semibold,
          color: palette.text,
          marginBottom: spacing[3]
        }}>
          Responsible Gambling
        </Text>

        <TouchableOpacity
          onPress={() => navigation.navigate('DepositLimits')}
          style={{
            paddingHorizontal: spacing[3],
            paddingVertical: spacing[3],
            backgroundColor: palette.surface,
            borderRadius: 12,
            marginBottom: spacing[2],
            borderWidth: 1,
            borderColor: palette.border,
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center'
          }}
        >
          <Text style={{ fontSize: typography.sizes.base, color: palette.text }}>Deposit Limits</Text>
          <Text style={{ fontSize: typography.sizes.lg, color: palette.textSecondary }}>›</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={{
            paddingHorizontal: spacing[3],
            paddingVertical: spacing[3],
            backgroundColor: palette.surface,
            borderRadius: 12,
            marginBottom: spacing[8],
            borderWidth: 1,
            borderColor: palette.border,
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center'
          }}
        >
          <Text style={{ fontSize: typography.sizes.base, color: palette.text }}>Player Protection</Text>
          <Text style={{ fontSize: typography.sizes.lg, color: palette.textSecondary }}>›</Text>
        </TouchableOpacity>

        <Button label="Logout" onPress={handleLogout} variant="secondary" fullWidth />
      </ScrollView>
    </SafeAreaView>
  );
};
