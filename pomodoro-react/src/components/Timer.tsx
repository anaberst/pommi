import Countdown from "react-countdown";

interface Props {
  autoStart?: boolean;
  className: string;
  controlled?: boolean;
  minutes: number;
}

const Timer = ({ autoStart, className, controlled, minutes }: Props) => {
  return (
    <div
      className={className}
      style={{
        fontSize: "100px",
        fontWeight: "bold",
        color: "MediumPurple",
        minHeight: "10vh",
      }}
    >
      <Countdown
        autoStart={autoStart}
        controlled={controlled}
        date={Date.now() + minutes * 60000}
      />
    </div>
  );
};

export default Timer;
