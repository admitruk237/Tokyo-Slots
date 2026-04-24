import { beforeEach, describe, expect, it } from 'vitest';
import { useGameStore } from './store';
import { GAME_STATUS } from '@/shared/types/game';

describe('useGameStore', () => {
  beforeEach(() => {
    useGameStore.setState({
      balance: 1000,
      bet: 100,
      status: GAME_STATUS.IDLE,
      winAmount: 0,
      reels: ['seven', 'seven', 'seven', 'seven'],
      nextReels: undefined,
    });
  });

  it('should not start spin if balance is less than bet', () => {
    useGameStore.setState({ balance: 50, bet: 100 });

    useGameStore.getState().startSpin();

    expect(useGameStore.getState().status).toBe(GAME_STATUS.IDLE);
    expect(useGameStore.getState().balance).toBe(50);
  });

  it('should start spin and deduct bet if balance is sufficient', () => {
    useGameStore.getState().startSpin();

    expect(useGameStore.getState().status).toBe(GAME_STATUS.SPINNING);
    expect(useGameStore.getState().balance).toBe(900);
    expect(useGameStore.getState().nextReels).toBeDefined();
  });

  it('should reset status and winAmount correctly', () => {
    useGameStore.setState({
      status: GAME_STATUS.WIN,
      winAmount: 50,
    });

    useGameStore.getState().resetStatus();

    expect(useGameStore.getState().status).toBe(GAME_STATUS.IDLE);
    expect(useGameStore.getState().winAmount).toBe(0);
  });

  it('should not allow setting bet higher than current balance', () => {
    useGameStore.setState({ balance: 500, bet: 100 });

    useGameStore.getState().setBet(600);

    expect(useGameStore.getState().bet).toBe(100);
  });

  it('should allow setting valid bet', () => {
    useGameStore.getState().setBet(200);
    expect(useGameStore.getState().bet).toBe(200);
  });

  it('should not allow setting bet higher than GAME_CONFIG.BET.MAX', () => {
    useGameStore.setState({ balance: 20000, bet: 100 });

    // GAME_CONFIG.BET.MAX is 10000, let's use 20000
    useGameStore.getState().setBet(20000);

    expect(useGameStore.getState().bet).toBe(100);
  });
});
