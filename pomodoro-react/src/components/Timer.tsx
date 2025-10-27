import Countdown from "react-countdown";

interface Props {
  autoStart?: boolean;
  className: string;
  minutes: number;
}

const Timer = ({ autoStart, className, minutes }: Props) => {
  return (
    <div className={className} style={{ fontSize: "48px", color: "red" }}>
      <Countdown autoStart={autoStart} date={Date.now() + minutes * 60000} />
    </div>
  );
};

export default Timer;
