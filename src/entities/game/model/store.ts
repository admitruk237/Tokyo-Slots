import { create } from 'zustand';
import { GAME_CONFIG } from '@/shared/config/gameConfig';
import type { GameStore } from './types';

export const useGameStore = create<GameStore>((set, get) => ({
  balance: GAME_CONFIG.INITIAL_BALANCE,
  bet: GAME_CONFIG.BET.DEFAULT,
  jackpot: GAME_CONFIG.INITIAL_JACKPOT,
  reels: Array(GAME_CONFIG.REELS_COUNT).fill('star'),
  status: 'idle',
  winAmount: 0,
  isMuted: false,

  setBet: (amount) => set({ bet: amount }),

  incrementBet: () => {
    const { bet } = get();
    if (bet + GAME_CONFIG.BET.STEP <= GAME_CONFIG.BET.MAX) {
      set({ bet: Number((bet + GAME_CONFIG.BET.STEP).toFixed(2)) });
    }
  },

  decrementBet: () => {
    const { bet } = get();
    if (bet - GAME_CONFIG.BET.STEP >= GAME_CONFIG.BET.MIN) {
      set({ bet: Number((bet - GAME_CONFIG.BET.STEP).toFixed(2)) });
    }
  },

  startSpin: () => {
    const { balance, bet, status } = get();
    if (status === 'spinning' || balance < bet) return;

    const nextReels = Array(GAME_CONFIG.REELS_COUNT)
      .fill(null)
      .map(() => {
        const totalWeight = GAME_CONFIG.SYMBOLS.reduce((acc, sym) => acc + sym.weight, 0);
        let random = Math.random() * totalWeight;
        for (const symbol of GAME_CONFIG.SYMBOLS) {
          if (random < symbol.weight) return symbol.id;
          random -= symbol.weight;
        }
        return GAME_CONFIG.SYMBOLS[0].id;
      });

    set({
      status: 'spinning',
      balance: Number((balance - bet).toFixed(2)),
      winAmount: 0,
      nextReels,
      jackpot: Number((get().jackpot + bet * GAME_CONFIG.JACKPOT.INCREASE_PERCENTAGE).toFixed(2)),
    });
  },

  finishSpin: (results) => {
    const { bet } = get();
    const symbols = GAME_CONFIG.SYMBOLS;

    const counts: Record<string, number> = {};
    results.forEach((id) => {
      counts[id] = (counts[id] || 0) + 1;
    });

    let multiplier = 0;
    let isJackpot = false;

    for (const [id, count] of Object.entries(counts)) {
      if (count === 4) {
        const symbol = symbols.find((s) => s.id === id);
        multiplier = symbol ? symbol.multiplier : 0;
        if (id === 'seven') isJackpot = true;
        break;
      }
      if (count === 3) {
        const symbol = symbols.find((s) => s.id === id);
        multiplier = symbol ? symbol.multiplier * 0.5 : 0;
      }
    }

    let win = Number((bet * multiplier).toFixed(2));
    let finalJackpot = get().jackpot;

    if (isJackpot) {
      win += finalJackpot;
      finalJackpot = GAME_CONFIG.INITIAL_JACKPOT;
    }

    set({
      reels: results,
      status: win > 0 ? 'win' : 'lose',
      winAmount: win,
      balance: Number((get().balance + win).toFixed(2)),
      jackpot: finalJackpot,
    });
  },

  toggleMute: () => set((state) => ({ isMuted: !state.isMuted })),

  resetStatus: () => set({ status: 'idle', winAmount: 0 }),
}));
