import { create } from 'zustand';
import { persist, subscribeWithSelector } from 'zustand/middleware';
import { GAME_CONFIG } from '@/shared/config/gameConfig';
import { GAME_STATUS } from '@/shared/types/game';
import type { GameStore } from './types';
import { calculateWin } from '../lib/calculateWin';
import { pickSymbol } from '../lib/pickSymbol';

export const useGameStore = create<GameStore>()(
  subscribeWithSelector(
    persist(
      (set, get) => ({
        balance: GAME_CONFIG.INITIAL_BALANCE,
        bet: GAME_CONFIG.BET.DEFAULT,
        reels: Array(GAME_CONFIG.REELS_COUNT).fill(GAME_CONFIG.DEFAULT_REEL_SYMBOL),
        status: GAME_STATUS.IDLE,
        winAmount: 0,
        isMuted: false,

        setBet: (amount) => {
          const { balance } = get();
          if (amount >= GAME_CONFIG.BET.MIN && amount <= balance && amount <= GAME_CONFIG.BET.MAX) {
            set({ bet: amount });
          }
        },

        incrementBet: () => {
          const { bet, balance } = get();
          const nextBet = bet + GAME_CONFIG.BET.STEP;
          if (nextBet <= GAME_CONFIG.BET.MAX && nextBet <= balance) {
            set({ bet: Number(nextBet.toFixed(2)) });
          }
        },

        decrementBet: () => {
          const { bet } = get();
          const nextBet = bet - GAME_CONFIG.BET.STEP;
          if (nextBet >= GAME_CONFIG.BET.MIN) {
            set({ bet: Number(nextBet.toFixed(2)) });
          }
        },

        startSpin: () => {
          const { balance, bet, status } = get();
          if (status === GAME_STATUS.SPINNING || balance < bet || bet <= 0) return;

          const totalWeight = GAME_CONFIG.SYMBOLS.reduce((acc, sym) => acc + sym.weight, 0);

          const nextReels = Array.from({ length: GAME_CONFIG.REELS_COUNT }, () =>
            pickSymbol(GAME_CONFIG.SYMBOLS, totalWeight)
          );

          set({
            status: GAME_STATUS.SPINNING,
            balance: Number((balance - bet).toFixed(2)),
            winAmount: 0,
            nextReels,
          });
        },

        completeSpin: () => {
          const { bet, nextReels, balance } = get();
          if (!nextReels) return;

          const { winAmount } = calculateWin(nextReels, bet, GAME_CONFIG.SYMBOLS);

          set({
            reels: nextReels,
            status: winAmount > 0 ? GAME_STATUS.WIN : GAME_STATUS.LOSE,
            winAmount,
            balance: Number((balance + winAmount).toFixed(2)),
            nextReels: undefined,
          });
        },

        toggleMute: () => set((state) => ({ isMuted: !state.isMuted })),

        resetStatus: () => set({ status: GAME_STATUS.IDLE, winAmount: 0 }),
      }),
      {
        name: GAME_CONFIG.STORAGE_KEY,
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
  )
);
