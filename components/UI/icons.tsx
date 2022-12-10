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

export const ArrowUpDownIcon: React.FC<IconProps> = ({
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
        d="M3 7.5L7.5 3m0 0L12 7.5M7.5 3v13.5m13.5 0L16.5 21m0 0L12 16.5m4.5 4.5V7.5"
      />
    </svg>
  );
};

export const InfoIcon: React.FC<IconProps> = ({
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
        d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25"
      />
    </svg>
  );
};
