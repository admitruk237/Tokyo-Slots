import { useCallback, useRef } from 'react';

const SOUND_MAP = {
  lever: '/sounds/lever.mp3',
  spin: '/sounds/spin.wav',
  win: '/sounds/win.wav',
  lose: '/sounds/lose.wav',
  totalcult: '/sounds/totalcult.wav',
  click: '/sounds/click.wav',
};
export const SOUNDS = {
  LEVER: 'lever',
  SPIN: 'spin',
  WIN: 'win',
  LOSE: 'lose',
  REEL_STOP: 'totalcult',
  CLICK: 'click',
} as const;

export type SoundKey = keyof typeof SOUND_MAP;

export const useAudio = () => {
  const audioCache = useRef<Partial<Record<SoundKey, HTMLAudioElement>>>({});

  const playSound = useCallback((key: SoundKey, volume: number = 0.3) => {
    let audio = audioCache.current[key];

    if (!audio) {
      audio = new Audio(SOUND_MAP[key]);
      audioCache.current[key] = audio;
    }

    if (!audio) return;

    audio.currentTime = 0;
    audio.volume = volume;
    audio.play().catch(() => {});
  }, []);

  const stopSound = useCallback((key: SoundKey) => {
    const audio = audioCache.current[key];
    if (audio) {
      audio.pause();
      audio.currentTime = 0;
    }
  }, []);

  return { playSound, stopSound };
};
