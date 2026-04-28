import { Cloud } from '@/shared/ui/cloud';

export const GameForeground = () => {
  return (
    <div className="absolute inset-x-0 bottom-0 z-20 pointer-events-none overflow-hidden h-[250px]">
      <Cloud />
    </div>
  );
};
