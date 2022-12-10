import { ReactElement, useState } from "react";
import styles from "./tooltip.module.scss";

type Props = {
  delay?: number;
  children: ReactElement;
  content: string;
  direction?: "bottom" | "top" | "left" | "right";
};

const Tooltip: React.FC<Props> = ({ delay, children, content, direction }) => {
  let timeout: NodeJS.Timeout;
  const [active, setActive] = useState<boolean>(false);

  const showTip = () => {
    timeout = setTimeout(() => {
      setActive(true);
    }, delay || 0);
  };

  const hideTip = () => {
    clearInterval(timeout);
    setActive(false);
  };

  return (
    <div
      className={styles.tooltipWrapper}
      onMouseEnter={showTip}
      onMouseLeave={hideTip}
    >
      {children}
      {active && (
        <div className={`${styles.tooltip} ${styles[direction!] || styles.bottom}`}>
          {content}
        </div>
      )}
    </div>
  );
};

export default Tooltip;
