export interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  referralCode?: string;
  kycTier: KYCTier;
  profilePicture?: string;
  createdAt: string;
}

export type KYCTier = 'TIER_0' | 'TIER_1' | 'TIER_2' | 'TIER_3';

export interface Wallet {
  userId: string;
  balance: number;
  currency: 'NGN';
  updatedAt: string;
}

export interface Transaction {
  id: string;
  type: 'deposit' | 'withdrawal' | 'bet' | 'win';
  amount: number;
  status: 'pending' | 'completed' | 'failed';
  channel?: string;
  reference?: string;
  createdAt: string;
}

export interface LotteryTicket {
  id: string;
  userId: string;
  numbers: number[];
  stars: number[];
  drawDate: string;
  amount: number;
  status: 'pending' | 'drawn' | 'won' | 'lost';
  createdAt: string;
}

export interface LotteryDraw {
  id: string;
  drawNumber: number;
  winningNumbers: number[];
  winningStars: number[];
  jackpot: number;
  drawDate: string;
  nextDrawDate: string;
}

export interface P2PBet {
  id: string;
  type: 'one-on-one' | 'group';
  creatorId: string;
  title: string;
  description: string;
  amount: number;
  potAmount?: number;
  acceptorId?: string;
  status: 'pending' | 'active' | 'resolved' | 'disputed';
  winner?: string;
  startDate: string;
  createdAt: string;
}

export interface Notification {
  id: string;
  userId: string;
  type: 'win' | 'invite' | 'activity' | 'funding' | 'draw';
  title: string;
  message: string;
  read: boolean;
  createdAt: string;
}
