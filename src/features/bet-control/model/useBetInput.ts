import { type ChangeEvent, useState } from 'react';
import {
  GAME_CONFIG,
  GAME_STATUS,
  useBalance,
  useBet,
  useGameActions,
  useGameStatus,
} from '@/entities/game';
import { BET_ERRORS } from './constants';

export const useBetInput = () => {
  const bet = useBet();
  const balance = useBalance();
  const status = useGameStatus();
  const { setBet } = useGameActions();

  const [inputValue, setInputValue] = useState<string>(bet.toString());
  const [error, setError] = useState<string | null>(null);
  const [prevBet, setPrevBet] = useState(bet);

  if (bet !== prevBet) {
    setPrevBet(bet);
    if (bet !== parseFloat(inputValue)) {
      setInputValue(bet.toString());
      setError(null);
    }
  }

  const isSpinning = status === GAME_STATUS.SPINNING;

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const rawVal = e.target.value;
    setInputValue(rawVal);

    if (rawVal !== '' && !/^\d*\.?\d*$/.test(rawVal)) {
      setError(BET_ERRORS.INVALID_FORMAT);
      return;
    }

    if (rawVal === '' || rawVal === '.') {
      setError(BET_ERRORS.ENTER_AMOUNT);
      return;
    }

    const parsed = parseFloat(rawVal);

    if (parsed > balance) {
      setError(BET_ERRORS.INSUFFICIENT_FUNDS);
      return;
    }

    if (parsed < GAME_CONFIG.BET.MIN) {
      setError(BET_ERRORS.MIN_BET(GAME_CONFIG.BET.MIN));
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
