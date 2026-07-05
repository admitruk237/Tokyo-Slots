import { useEffect, useRef, useState } from 'react';
import { useBalance, useBet, useGameActions, useGameStatus, useGameStore } from '@/entities/game';
import { GAME_STATUS } from '@/shared/types/game';
import { GAME_CONFIG } from '@/shared/config/gameConfig';

export const useBetInput = () => {
  const bet = useBet();
  const balance = useBalance();
  const status = useGameStatus();
  const { setBet } = useGameActions();

  const [inputValue, setInputValue] = useState<string>(bet.toString());
  const [error, setError] = useState<string | null>(null);

  const inputRef = useRef(inputValue);

  useEffect(() => {
    inputRef.current = inputValue;
  }, [inputValue]);

  const isSpinning = status === GAME_STATUS.SPINNING;

  useEffect(() => {
    return useGameStore.subscribe(
      (state) => state.bet,
      (newBet) => {
        if (newBet !== parseFloat(inputRef.current)) {
          setInputValue(newBet.toString());
          setError(null);
        }
      }
    );
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const rawVal = e.target.value;
    setInputValue(rawVal);

    if (rawVal !== '' && !/^\d*\.?\d*$/.test(rawVal)) {
      setError('Invalid format');
      return;
    }

    if (rawVal === '' || rawVal === '.') {
      setError('Enter amount');
      return;
    }

    const parsed = parseFloat(rawVal);

    if (parsed > balance) {
      setError('Insufficient funds');
      return;
    }

    if (parsed < GAME_CONFIG.BET.MIN) {
      setError(`Min bet is ${GAME_CONFIG.BET.MIN}`);
      return;
    }

    if (parsed > GAME_CONFIG.BET.MAX) {
      setError(`Max bet is ${GAME_CONFIG.BET.MAX}`);
      return;
    }

    setError(null);
    setBet(parsed);
  };

  const handleBlur = () => {
    const parsed = parseFloat(inputValue);
    if (isNaN(parsed) || parsed < GAME_CONFIG.BET.MIN) {
      setBet(GAME_CONFIG.BET.MIN);
    } else if (parsed > GAME_CONFIG.BET.MAX) {
      setBet(GAME_CONFIG.BET.MAX);
    }
  };

  return {
    inputValue,
    error,
    isSpinning,
    handleInputChange,
    handleBlur,
  } as const;
};
