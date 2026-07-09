const ZIGZAG_STEP = 0.5;
const ZIGZAG_TOOTH_COUNT = 100 / ZIGZAG_STEP;

const generateZigzagPoints = (): string => {
  const teeth = Array.from({ length: ZIGZAG_TOOTH_COUNT }, (_, i) => {
    const x = 100 - (i + 1) * ZIGZAG_STEP;
    const y = i % 2 === 0 ? 4 : 0;
    return `${x},${y}`;
  });

  return ['0,0', '100,0', ...teeth].join(' ');
};

const ZIGZAG_POINTS = generateZigzagPoints();

export const Header = () => {
  return (
    <div className="relative w-full shrink-0">
      <div className="w-full h-[98px] bg-header-bg" />

      <svg
        className="absolute bottom-0 left-0 w-full translate-y-[calc(100%-1px)]"
        height="4"
        preserveAspectRatio="none"
        viewBox="0 0 100 4"
        xmlns="http://www.w3.org/2000/svg"
      >
        <polygon
          points={ZIGZAG_POINTS}
          className="fill-header-bg"
          stroke="none"
          shapeRendering="geometricPrecision"
        />
      </svg>
    </div>
  );
};
