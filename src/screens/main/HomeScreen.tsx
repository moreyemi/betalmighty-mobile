import React, { useState } from 'react';
import { View, Text, ScrollView, SafeAreaView, TouchableOpacity } from 'react-native';
import { useTheme } from '@hooks/index';
import { useAppSelector } from '@hooks/index';
import { GlassCard, Button } from '@components/index';
import { spacing, typography } from '@theme/index';
import { formatCurrency } from '@utils/formatting';

interface HomeScreenProps {
  navigation: any;
}

export const HomeScreen: React.FC<HomeScreenProps> = ({ navigation }) => {
  const { colors: palette } = useTheme();
  const user = useAppSelector((state) => state.auth.user);
  const wallet = useAppSelector((state) => state.wallet.wallet);

  const balance = wallet?.balance || 125000;
  const nextDrawDate = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
  const jackpot = 50000000;

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: palette.background }}>
      <ScrollView contentContainerStyle={{ paddingHorizontal: spacing[4], paddingVertical: spacing[4] }}>
        <View style={{
          marginBottom: spacing[6],
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          <View>
            <Text style={{ fontSize: typography.sizes.sm, color: palette.textSecondary }}>Welcome back,</Text>
            <Text style={{
              fontSize: typography.sizes.lg,
              fontWeight: typography.weights.bold,
              color: palette.text
            }}>
              {user?.firstName || 'User'}
            </Text>
          </View>
          <TouchableOpacity onPress={() => navigation.navigate('Profile')}>
            <View style={{
              width: 40,
              height: 40,
              borderRadius: 20,
              backgroundColor: palette.orange,
              justifyContent: 'center',
              alignItems: 'center'
            }}>
              <Text style={{ color: '#FFFFFF', fontWeight: typography.weights.bold }}>
                {user?.firstName?.charAt(0)}
              </Text>
            </View>
          </TouchableOpacity>
        </View>

        <GlassCard style={{ marginBottom: spacing[6], borderRadius: 16 }}>
          <Text style={{
            fontSize: typography.sizes.sm,
            color: palette.textSecondary,
            marginBottom: spacing[2]
          }}>
            Wallet Balance
          </Text>
          <Text style={{
            fontSize: typography.sizes['4xl'],
            fontWeight: typography.weights.bold,
            color: palette.text,
            marginBottom: spacing[4]
          }}>
            {formatCurrency(balance)}
          </Text>
          <View style={{ flexDirection: 'row', gap: spacing[2] }}>
            <Button label="Fund Wallet" onPress={() => navigation.navigate('FundWallet')} size="sm" style={{ flex: 1 }} />
            <Button label="Withdraw" onPress={() => navigation.navigate('Withdraw')} variant="secondary" size="sm" style={{ flex: 1 }} />
          </View>
        </GlassCard>

        <GlassCard style={{
          marginBottom: spacing[6],
          backgroundColor: palette.glass,
          borderWidth: 2,
          borderColor: palette.orange,
          opacity: 0.95
        }}>
          <View style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'flex-start',
            marginBottom: spacing[4]
          }}>
            <View>
              <Text style={{
                fontSize: typography.sizes.sm,
                color: palette.orange,
                fontWeight: typography.weights.semibold
              }}>
                ALMIGHTY NUMBERS
              </Text>
              <Text style={{
                fontSize: typography.sizes['3xl'],
                fontWeight: typography.weights.bold,
                color: palette.text,
                marginTop: spacing[1]
              }}>
                {formatCurrency(jackpot)}
              </Text>
            </View>
            <View style={{
              backgroundColor: palette.orange,
              paddingHorizontal: spacing[3],
              paddingVertical: spacing[2],
              borderRadius: 8
            }}>
              <Text style={{
                color: '#FFFFFF',
                fontSize: typography.sizes.xs,
                fontWeight: typography.weights.bold
              }}>
                NEXT DRAW
              </Text>
              <Text style={{
                color: '#FFFFFF',
                fontSize: typography.sizes.sm,
                fontWeight: typography.weights.semibold,
                marginTop: spacing[1]
              }}>
                {nextDrawDate.toLocaleDateString('en-NG', { month: 'short', day: 'numeric' })}
              </Text>
            </View>
          </View>
          <Button label="Play Now" onPress={() => navigation.navigate('Lottery')} fullWidth />
        </GlassCard>

        <Text style={{
          fontSize: typography.sizes.lg,
          fontWeight: typography.weights.bold,
          color: palette.text,
          marginBottom: spacing[3]
        }}>
          Quick Actions
        </Text>

        <View style={{ flexDirection: 'row', gap: spacing[3], marginBottom: spacing[6] }}>
          <TouchableOpacity
            style={{
              flex: 1,
              backgroundColor: palette.surface,
              paddingVertical: spacing[4],
              borderRadius: 12,
              alignItems: 'center',
              borderWidth: 1,
              borderColor: palette.border
            }}
            onPress={() => navigation.navigate('Lottery')}
          >
            <Text style={{ fontSize: typography.sizes['2xl'] }}>🎰</Text>
            <Text style={{
              fontSize: typography.sizes.sm,
              color: palette.text,
              marginTop: spacing[2],
              fontWeight: typography.weights.semibold
            }}>
              Lottery
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={{
              flex: 1,
              backgroundColor: palette.surface,
              paddingVertical: spacing[4],
              borderRadius: 12,
              alignItems: 'center',
              borderWidth: 1,
              borderColor: palette.border
            }}
            onPress={() => navigation.navigate('P2P')}
          >
            <Text style={{ fontSize: typography.sizes['2xl'] }}>👥</Text>
            <Text style={{
              fontSize: typography.sizes.sm,
              color: palette.text,
              marginTop: spacing[2],
              fontWeight: typography.weights.semibold
            }}>
              P2P Bets
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={{
              flex: 1,
              backgroundColor: palette.surface,
              paddingVertical: spacing[4],
              borderRadius: 12,
              alignItems: 'center',
              borderWidth: 1,
              borderColor: palette.border
            }}
            onPress={() => navigation.navigate('Community')}
          >
            <Text style={{ fontSize: typography.sizes['2xl'] }}>🌐</Text>
            <Text style={{
              fontSize: typography.sizes.sm,
              color: palette.text,
              marginTop: spacing[2],
              fontWeight: typography.weights.semibold
            }}>
              Community
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};
