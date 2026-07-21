import React, { useState } from 'react';
import { View, Text, ScrollView, SafeAreaView, TouchableOpacity } from 'react-native';
import { useTheme } from '@hooks/index';
import { Button, GlassCard } from '@components/index';
import { spacing, typography } from '@theme/index';
import { LOTTERY_CONFIG } from '@utils/constants';
import { formatCurrency } from '@utils/formatting';

interface LotteryScreenProps {
  navigation: any;
}

export const LotteryScreen: React.FC<LotteryScreenProps> = ({ navigation }) => {
  const { colors: palette } = useTheme();
  const [selectedNumbers, setSelectedNumbers] = useState<number[]>([]);
  const [selectedStars, setSelectedStars] = useState<number[]>([]);
  const [tickets, setTickets] = useState(0);

  const toggleNumber = (num: number) => {
    if (selectedNumbers.includes(num)) {
      setSelectedNumbers(selectedNumbers.filter((n) => n !== num));
    } else if (selectedNumbers.length < LOTTERY_CONFIG.NUMBERS_TO_SELECT) {
      setSelectedNumbers([...selectedNumbers, num].sort((a, b) => a - b));
    }
  };

  const toggleStar = (num: number) => {
    if (selectedStars.includes(num)) {
      setSelectedStars(selectedStars.filter((n) => n !== num));
    } else if (selectedStars.length < LOTTERY_CONFIG.STARS_TO_SELECT) {
      setSelectedStars([...selectedStars, num].sort((a, b) => a - b));
    }
  };

  const handlePlayTicket = () => {
    if (
      selectedNumbers.length === LOTTERY_CONFIG.NUMBERS_TO_SELECT &&
      selectedStars.length === LOTTERY_CONFIG.STARS_TO_SELECT
    ) {
      setTickets(tickets + 1);
      setSelectedNumbers([]);
      setSelectedStars([]);
    }
  };

  const totalCost = tickets * LOTTERY_CONFIG.TICKET_PRICE;

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: palette.background }}>
      <ScrollView contentContainerStyle={{ paddingHorizontal: spacing[4], paddingVertical: spacing[4] }}>
        <Text style={{
          fontSize: typography.sizes['2xl'],
          fontWeight: typography.weights.bold,
          color: palette.text,
          marginBottom: spacing[4]
        }}>
          Almighty Numbers
        </Text>

        <View style={{
          backgroundColor: palette.surface,
          paddingHorizontal: spacing[3],
          paddingVertical: spacing[3],
          borderRadius: 12,
          marginBottom: spacing[6],
          borderLeftWidth: 4,
          borderLeftColor: palette.orange
        }}>
          <Text style={{
            fontSize: typography.sizes.sm,
            color: palette.text,
            fontWeight: typography.weights.semibold
          }}>
            Select {LOTTERY_CONFIG.NUMBERS_TO_SELECT} numbers and {LOTTERY_CONFIG.STARS_TO_SELECT} stars
          </Text>
          <Text style={{
            fontSize: typography.sizes.xs,
            color: palette.textSecondary,
            marginTop: spacing[1]
          }}>
            Ticket cost: {formatCurrency(LOTTERY_CONFIG.TICKET_PRICE)} each
          </Text>
        </View>

        <Text style={{
          fontSize: typography.sizes.base,
          fontWeight: typography.weights.semibold,
          color: palette.text,
          marginBottom: spacing[3]
        }}>
          Almighty Numbers ({selectedNumbers.length}/{LOTTERY_CONFIG.NUMBERS_TO_SELECT})
        </Text>

        <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: spacing[2], marginBottom: spacing[6] }}>
          {Array.from({ length: LOTTERY_CONFIG.MAX_NUMBER }, (_, i) => i + 1).map((num) => (
            <TouchableOpacity
              key={num}
              onPress={() => toggleNumber(num)}
              disabled={!selectedNumbers.includes(num) && selectedNumbers.length >= LOTTERY_CONFIG.NUMBERS_TO_SELECT}
              style={{
                width: '18%',
                aspectRatio: 1,
                borderRadius: 12,
                backgroundColor: selectedNumbers.includes(num) ? palette.orange : palette.surface,
                borderWidth: 1,
                borderColor: selectedNumbers.includes(num) ? palette.orange : palette.border,
                justifyContent: 'center',
                alignItems: 'center',
                opacity: !selectedNumbers.includes(num) && selectedNumbers.length >= LOTTERY_CONFIG.NUMBERS_TO_SELECT ? 0.5 : 1
              }}
            >
              <Text style={{
                fontSize: typography.sizes.base,
                fontWeight: typography.weights.bold,
                color: selectedNumbers.includes(num) ? '#FFFFFF' : palette.text
              }}>
                {num}
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
          Mighty Stars ({selectedStars.length}/{LOTTERY_CONFIG.STARS_TO_SELECT})
        </Text>

        <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: spacing[2], marginBottom: spacing[6] }}>
          {Array.from({ length: LOTTERY_CONFIG.MAX_STAR }, (_, i) => i + 1).map((num) => (
            <TouchableOpacity
              key={`star-${num}`}
              onPress={() => toggleStar(num)}
              disabled={!selectedStars.includes(num) && selectedStars.length >= LOTTERY_CONFIG.STARS_TO_SELECT}
              style={{
                width: '22%',
                aspectRatio: 1,
                borderRadius: 12,
                backgroundColor: selectedStars.includes(num) ? palette.navy : palette.surface,
                borderWidth: 1,
                borderColor: selectedStars.includes(num) ? palette.navy : palette.border,
                justifyContent: 'center',
                alignItems: 'center',
                opacity: !selectedStars.includes(num) && selectedStars.length >= LOTTERY_CONFIG.STARS_TO_SELECT ? 0.5 : 1
              }}
            >
              <Text style={{
                fontSize: typography.sizes.base,
                fontWeight: typography.weights.bold,
                color: selectedStars.includes(num) ? '#FFFFFF' : palette.text
              }}>
                ⭐ {num}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        <Button
          label="Add to Cart"
          onPress={handlePlayTicket}
          disabled={
            selectedNumbers.length !== LOTTERY_CONFIG.NUMBERS_TO_SELECT ||
            selectedStars.length !== LOTTERY_CONFIG.STARS_TO_SELECT
          }
          fullWidth
          style={{ marginBottom: spacing[4] }}
        />

        {tickets > 0 && (
          <GlassCard>
            <View style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: spacing[3]
            }}>
              <Text style={{
                fontSize: typography.sizes.base,
                fontWeight: typography.weights.semibold,
                color: palette.text
              }}>
                Tickets: {tickets}
              </Text>
              <Text style={{
                fontSize: typography.sizes.lg,
                fontWeight: typography.weights.bold,
                color: palette.orange
              }}>
                {formatCurrency(totalCost)}
              </Text>
            </View>
            <Button
              label="Checkout"
              onPress={() => navigation.navigate('CheckoutLottery', { tickets, totalCost })}
              fullWidth
              style={{ marginBottom: spacing[2] }}
            />
            <Button label="Clear Cart" variant="secondary" onPress={() => setTickets(0)} fullWidth />
          </GlassCard>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};
