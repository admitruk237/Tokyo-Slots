import { useState } from 'react';
import { useGameStore } from '@/entities/game/model/store';
import { GAME_STATUS } from '@/entities/game/model/types';

export const useBetInput = () => {
  const { bet, setBet, balance, status } = useGameStore();
  const [inputValue, setInputValue] = useState<string>(bet.toString());
  const [error, setError] = useState<string | null>(null);
  const [prevBet, setPrevBet] = useState(bet);

  const isSpinning = status === GAME_STATUS.SPINNING;

  if (bet !== prevBet && !error) {
    const currentInputNumeric = parseFloat(inputValue);
    if (isNaN(currentInputNumeric) || currentInputNumeric !== bet) {
      setPrevBet(bet);
      setInputValue(bet.toString());
      setError(null);
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const rawVal = e.target.value;

    if (/[^0-9.]/.test(rawVal)) {
      const stripped = rawVal.replace(/[^0-9.]/g, '');
      setInputValue(stripped);
      setError('Invalid bet amount');
      setBet(0);
      return;
    }

    setInputValue(rawVal);

    if (rawVal === '') {
      setError('Enter a value');
      setBet(0);
      return;
    }

    if ((rawVal.match(/\./g) || []).length > 1) {
      setError('Invalid format');
      setBet(0);
      return;
    }

    const numeric = parseFloat(rawVal);

    if (isNaN(numeric) || numeric <= 0) {
      setError('Bet must be > 0');
      setBet(0);
      return;
    }

    if (numeric > balance) {
      setError('Bet cannot exceed your balance');
      setBet(0);
      return;
    }

    setError(null);
    setBet(numeric);
  };

  return {
    inputValue,
    error,
    handleInputChange,
    isSpinning,
  };
};
