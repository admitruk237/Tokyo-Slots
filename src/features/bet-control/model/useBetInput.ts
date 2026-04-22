import { useState } from 'react';
import { useGameStore } from '@/entities/game/model/store';

export const useBetInput = () => {
  const { bet, setBet, balance, status } = useGameStore();
  const [inputValue, setInputValue] = useState<string>(bet.toString());
  const [error, setError] = useState<string | null>(null);
  const [prevBet, setPrevBet] = useState(bet);

  const isSpinning = status === 'spinning';

  if (bet !== prevBet) {
    setPrevBet(bet);
    setInputValue(bet.toString());
    setError(null);
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value.replace(/[^0-9.]/g, '');
    setInputValue(val);

    const numeric = parseFloat(val);

    if (val === '') {
      setError('Enter a value');
      return;
    }

    if (isNaN(numeric) || numeric <= 0) {
      setError('Bet must be > 0');
      setBet(0);
    } else if (numeric > balance) {
      setError('Low balance!');
      setBet(0);
    } else {
      setError(null);
      setBet(numeric);
    }
  };

  return {
    inputValue,
    error,
    handleInputChange,
    isSpinning,
  };
};
