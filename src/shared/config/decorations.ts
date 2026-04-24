import leaf1 from '@/shared/assets/decor/leaf-1.svg';
import leaf2 from '@/shared/assets/decor/leaf-2.svg';
import leaf3 from '@/shared/assets/decor/leaf-3.svg';
import leaf4 from '@/shared/assets/decor/seven.svg';
import symbol1 from '@/shared/assets/decor/cherry.svg';
import symbol2 from '@/shared/assets/decor/lemon.svg';
import symbol3 from '@/shared/assets/decor/crown.svg';
import symbol4 from '@/shared/assets/decor/crystal.svg';

export interface DecorationItem {
  id: number;
  src: string;
  x: number;
  y: number;
  sizeClass: string;
  rotation: number;
  delay: number;
}

export const DECORATIONS: DecorationItem[] = [
  { id: 1, src: leaf1, x: 5, y: 30, sizeClass: 'w-16 h-16', rotation: 15, delay: 0 },
  { id: 2, src: symbol1, x: 15, y: 45, sizeClass: 'w-14 h-14', rotation: -10, delay: 0.5 },
  { id: 3, src: leaf2, x: 8, y: 65, sizeClass: 'w-20 h-20', rotation: 20, delay: 1 },
  { id: 4, src: symbol2, x: 20, y: 80, sizeClass: 'w-16 h-16', rotation: -15, delay: 1.5 },
  { id: 5, src: leaf3, x: 12, y: 20, sizeClass: 'w-14 h-14', rotation: 5, delay: 2 },
  { id: 6, src: symbol3, x: 85, y: 35, sizeClass: 'w-20 h-20', rotation: -20, delay: 0.2 },
  { id: 7, src: leaf4, x: 92, y: 50, sizeClass: 'w-20 h-20', rotation: 10, delay: 0.7 },
  { id: 8, src: symbol4, x: 80, y: 70, sizeClass: 'w-16 h-16', rotation: -5, delay: 1.2 },
  { id: 9, src: leaf1, x: 88, y: 85, sizeClass: 'w-16 h-16', rotation: 25, delay: 1.7 },
  { id: 10, src: symbol1, x: 78, y: 25, sizeClass: 'w-14 h-14', rotation: -12, delay: 2.2 },
];
