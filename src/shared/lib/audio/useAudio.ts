import { useCallback } from 'react';

const SOUND_MAP = {
  lever: '/sounds/lever.mp3',
  spin: '/sounds/spin.mp3',
  win: '/sounds/win.wav',
  lose: '/sounds/lose.wav',
  totalcult: '/sounds/totalcult.wav',
  click: '/sounds/click.wav',
} as const;

export const SOUNDS = {
  LEVER: 'lever',
  SPIN: 'spin',
  WIN: 'win',
  LOSE: 'lose',
  REEL_STOP: 'totalcult',
  CLICK: 'click',
} as const;

export type SoundKey = keyof typeof SOUND_MAP;

const audioCache = new Map<SoundKey, HTMLAudioElement>();

const getAudio = (key: SoundKey): HTMLAudioElement => {
  const cached = audioCache.get(key);
  if (cached) return cached;

  const audio = new Audio();
  audio.preload = 'auto';
  audio.src = SOUND_MAP[key];
  audioCache.set(key, audio);

  return audio;
};

export const useAudio = () => {
  const playSound = useCallback((key: SoundKey, volume: number = 0.3) => {
    const audio = getAudio(key);
    audio.currentTime = 0;
    audio.volume = volume;
    audio.play().catch(() => {});
  }, []);

  const stopSound = useCallback((key: SoundKey) => {
    const audio = audioCache.get(key);
    if (audio) {
      audio.pause();
      audio.currentTime = 0;
    }
  }, []);

  return { playSound, stopSound };
};
