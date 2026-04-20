import headerSvg from '@/shared/assets/bg/header.svg';
import citySvg from '@/shared/assets/bg/tokiocity.svg';
import cloudSvg from '@/shared/assets/bg/cloud.svg';

export default function App() {
  return (
    <div className="relative min-h-screen bg-linear-to-b from-bg-idle-from to-bg-idle-to overflow-hidden">
      <img src={headerSvg} alt="" className="absolute top-0 left-0 w-full" />
      <img src={citySvg} alt="" className="absolute left-0 w-full" style={{ bottom: '125.34px' }} />
      <img src={cloudSvg} alt="" className="absolute bottom-0 left-0 w-full" />
    </div>
  );
}
