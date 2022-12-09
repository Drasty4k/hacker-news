type IconProps = {
  className?: string;
  fill?: string;
  height?: number | string;
  width?: number | string;
  strokeWidth?: number | string;
  strokeColor?: string;
};

export const ArrowRightIcon: React.FC<IconProps> = ({
  className,
  fill = "none",
  height = 22,
  width = 22,
  strokeWidth = "1.5",
  strokeColor = "#fff",
}) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill={fill}
      viewBox="0 0 24 24"
      strokeWidth={strokeWidth}
      stroke={strokeColor}
      width={width}
      height={height}
      className={className}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M11.25 4.5l7.5 7.5-7.5 7.5m-6-15l7.5 7.5-7.5 7.5"
      />
    </svg>
  );
};
