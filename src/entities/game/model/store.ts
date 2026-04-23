import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { GAME_CONFIG } from '@/shared/config/gameConfig';
import { GAME_STATUS, type GameStore } from './types';

export const useGameStore = create<GameStore>()(
  persist(
    (set, get) => ({
      balance: GAME_CONFIG.INITIAL_BALANCE,
      bet: GAME_CONFIG.BET.DEFAULT,
      reels: Array(GAME_CONFIG.REELS_COUNT).fill('star'),
      status: GAME_STATUS.IDLE,
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
        if (status === GAME_STATUS.SPINNING || balance < bet || bet <= 0) return;

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
          status: GAME_STATUS.SPINNING,
          balance: Number((balance - bet).toFixed(2)),
          winAmount: 0,
          nextReels,
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

        for (const [id, count] of Object.entries(counts)) {
          if (count === 4) {
            const symbol = symbols.find((s) => s.id === id);
            multiplier = symbol ? symbol.multiplier : 0;
            break;
          }
          if (count === 3) {
            const symbol = symbols.find((s) => s.id === id);
            multiplier = symbol ? symbol.multiplier * 0.5 : 0;
          }
        }

        const win = Number((bet * multiplier).toFixed(2));

        set({
          reels: results,
          status: win > 0 ? GAME_STATUS.WIN : GAME_STATUS.LOSE,
          winAmount: win,
          balance: Number((get().balance + win).toFixed(2)),
        });
      },

      toggleMute: () => set((state) => ({ isMuted: !state.isMuted })),

      resetStatus: () => set({ status: GAME_STATUS.IDLE, winAmount: 0 }),
    }),
    {
      name: 'tokyo-slots-storage',
      onRehydrateStorage: () => (state) => {
        if (state && (state.bet <= 0 || isNaN(state.bet))) {
          state.bet = GAME_CONFIG.BET.DEFAULT;
        }
      },
      partialize: (state) => ({
        balance: state.balance,
        bet: state.bet,
        isMuted: state.isMuted,
      }),
    }
  )
);
