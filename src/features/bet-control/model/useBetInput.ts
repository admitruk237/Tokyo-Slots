import { useEffect, useState } from 'react';
import { useGameStore } from '@/entities/game/model/store';
import { GAME_STATUS } from '@/shared/types/game';
import { GAME_CONFIG } from '@/shared/config/gameConfig';

export const useBetInput = () => {
  const { bet, setBet, balance, status } = useGameStore();

  const [inputValue, setInputValue] = useState<string>(bet.toString());
  const [error, setError] = useState<string | null>(null);

  const isSpinning = status === GAME_STATUS.SPINNING;

  useEffect(() => {
    const unsubscribe = useGameStore.subscribe(
      (state) => state.bet,
      (newBet) => {
        if (newBet !== parseFloat(inputValue)) {
          setInputValue(newBet.toString());
          setError(null);
        }
      }
    );
    return unsubscribe;
  }, [inputValue]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const rawVal = e.target.value;
    setInputValue(rawVal);

    if (rawVal !== '' && !/^\d*\.?\d*$/.test(rawVal)) {
      setError('Invalid format');
      setBet(0);
      return;
    }

    if (rawVal === '' || rawVal === '.') {
      setError('Enter amount');
      setBet(0);
      return;
    }

    const parsed = parseFloat(rawVal);

    if (parsed > balance) {
      setError('Insufficient funds');
      setBet(parsed);
      return;
    }

    if (parsed < GAME_CONFIG.BET.MIN) {
      setError(`Min bet is ${GAME_CONFIG.BET.MIN}`);
      setBet(0);
      return;
    }

    setError(null);
    setBet(parsed);
  };

  const handleBlur = () => {
    const parsed = parseFloat(inputValue);
    if (isNaN(parsed) || parsed < GAME_CONFIG.BET.MIN) {
      setBet(GAME_CONFIG.BET.MIN);
    }
  };

  return {
    inputValue,
    error,
    isSpinning,
    handleInputChange,
    handleBlur,
  };
};
