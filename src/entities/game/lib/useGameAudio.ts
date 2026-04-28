import { type SoundKey, useAudio } from '@/shared/lib/audio';
import { useIsMuted } from '../model/selectors';
import { useCallback } from 'react';

export const useGameAudio = () => {
  const isMuted = useIsMuted();
  const { playSound: basePlaySound, stopSound } = useAudio();

  const playSound = useCallback(
    (sound: SoundKey, volume?: number) => {
      if (!isMuted) {
        basePlaySound(sound, volume);
      }
    },
    [basePlaySound, isMuted]
  );

  return { playSound, stopSound };
};
