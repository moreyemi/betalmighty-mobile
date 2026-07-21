export const LOTTERY_CONFIG = {
  NUMBERS_TO_SELECT: 5,
  STARS_TO_SELECT: 2,
  MAX_NUMBER: 50,
  MAX_STAR: 12,
  TICKET_PRICE: 100
};

export const KYC_TIER_LIMITS = [
  { tier: 'TIER_0', limit: 50000, description: 'Tier 0', requirements: [] },
  { tier: 'TIER_1', limit: 500000, description: 'Tier 1', requirements: ['Email Verified'] },
  { tier: 'TIER_2', limit: 1000000, description: 'Tier 2', requirements: ['Email Verified', 'BVN Verified'] },
  { tier: 'TIER_3', limit: Infinity, description: 'Tier 3 (Unlimited)', requirements: ['Email Verified', 'BVN Verified', 'Full KYC'] }
];

export const FUNDING_CHANNELS = [
  { id: 'bank_transfer', name: 'Bank Transfer', icon: 'bank' },
  { id: 'card', name: 'Debit Card', icon: 'credit-card' },
  { id: 'ussd', name: 'USSD', icon: 'phone' },
  { id: 'bank_debit', name: 'Direct Debit', icon: 'link' }
];
