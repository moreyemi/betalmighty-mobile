import React, { useState } from 'react';
import { View, Text, ScrollView, SafeAreaView, TouchableOpacity } from 'react-native';
import { useTheme } from '@hooks/index';
import { useAppSelector } from '@hooks/index';
import { Button, GlassCard } from '@components/index';
import { spacing, typography } from '@theme/index';
import { formatCurrency, formatDate } from '@utils/formatting';

interface WalletScreenProps {
  navigation: any;
}

export const WalletScreen: React.FC<WalletScreenProps> = ({ navigation }) => {
  const { colors: palette } = useTheme();
  const wallet = useAppSelector((state) => state.wallet.wallet);
  const transactions = useAppSelector((state) => state.wallet.transactions);
  const [filter, setFilter] = useState<'all' | 'deposit' | 'withdrawal'>('all');

  const balance = wallet?.balance || 0;
  const filteredTransactions =
    filter === 'all'
      ? transactions
      : transactions.filter((t) => (filter === 'deposit' ? t.type === 'deposit' : t.type === 'withdrawal'));

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: palette.background }}>
      <ScrollView contentContainerStyle={{ paddingHorizontal: spacing[4], paddingVertical: spacing[4] }}>
        <Text style={{
          fontSize: typography.sizes['2xl'],
          fontWeight: typography.weights.bold,
          color: palette.text,
          marginBottom: spacing[6]
        }}>
          Wallet
        </Text>

        <GlassCard style={{ marginBottom: spacing[6] }}>
          <Text style={{
            fontSize: typography.sizes.sm,
            color: palette.textSecondary,
            marginBottom: spacing[2]
          }}>
            Total Balance
          </Text>
          <Text style={{
            fontSize: typography.sizes['4xl'],
            fontWeight: typography.weights.bold,
            color: palette.text,
            marginBottom: spacing[6]
          }}>
            {formatCurrency(balance)}
          </Text>
          <View style={{ flexDirection: 'row', gap: spacing[2] }}>
            <Button label="Fund" onPress={() => navigation.navigate('FundWallet')} size="sm" style={{ flex: 1 }} />
            <Button label="Withdraw" onPress={() => navigation.navigate('Withdraw')} variant="secondary" size="sm" style={{ flex: 1 }} />
          </View>
        </GlassCard>

        <View style={{ flexDirection: 'row', gap: spacing[2], marginBottom: spacing[4] }}>
          {(['all', 'deposit', 'withdrawal'] as const).map((type) => (
            <TouchableOpacity
              key={type}
              onPress={() => setFilter(type)}
              style={{
                paddingHorizontal: spacing[3],
                paddingVertical: spacing[2],
                borderRadius: 8,
                backgroundColor: filter === type ? palette.orange : palette.surface,
                borderWidth: 1,
                borderColor: filter === type ? palette.orange : palette.border
              }}
            >
              <Text style={{
                fontSize: typography.sizes.sm,
                fontWeight: typography.weights.semibold,
                color: filter === type ? '#FFFFFF' : palette.text,
                textTransform: 'capitalize'
              }}>
                {type}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        <Text style={{
          fontSize: typography.sizes.base,
          fontWeight: typography.weights.semibold,
          color: palette.text,
          marginBottom: spacing[3]
        }}>
          Transactions
        </Text>

        {filteredTransactions.length === 0 ? (
          <View style={{ alignItems: 'center', justifyContent: 'center', paddingVertical: spacing[8] }}>
            <Text style={{ fontSize: typography.sizes.lg, color: palette.textSecondary }}>No transactions yet</Text>
          </View>
        ) : (
          <View>
            {filteredTransactions.map((tx) => (
              <View
                key={tx.id}
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  paddingHorizontal: spacing[3],
                  paddingVertical: spacing[3],
                  backgroundColor: palette.surface,
                  borderRadius: 12,
                  marginBottom: spacing[2],
                  borderWidth: 1,
                  borderColor: palette.border
                }}
              >
                <View style={{ flex: 1 }}>
                  <Text style={{
                    fontSize: typography.sizes.sm,
                    fontWeight: typography.weights.semibold,
                    color: palette.text,
                    textTransform: 'capitalize'
                  }}>
                    {tx.type}
                  </Text>
                  <Text style={{
                    fontSize: typography.sizes.xs,
                    color: palette.textSecondary,
                    marginTop: spacing[1]
                  }}>
                    {formatDate(tx.createdAt)}
                  </Text>
                </View>
                <View style={{ alignItems: 'flex-end' }}>
                  <Text style={{
                    fontSize: typography.sizes.sm,
                    fontWeight: typography.weights.bold,
                    color: tx.type === 'deposit' || tx.type === 'win' ? palette.success : palette.text
                  }}>
                    {tx.type === 'deposit' || tx.type === 'win' ? '+' : '-'}
                    {formatCurrency(tx.amount)}
                  </Text>
                  <Text style={{
                    fontSize: typography.sizes.xs,
                    color:
                      tx.status === 'completed'
                        ? palette.success
                        : tx.status === 'failed'
                        ? palette.error
                        : palette.warning,
                    marginTop: spacing[1],
                    textTransform: 'capitalize'
                  }}>
                    {tx.status}
                  </Text>
                </View>
              </View>
            ))}
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};
