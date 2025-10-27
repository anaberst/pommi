import React from "react";
import Countdown from "react-countdown";
import { type CountdownApi } from "react-countdown";

interface Props {
  autoStart: boolean;
  className: string;
  countdownRef: React.RefObject<CountdownApi | null>;
  controlled: boolean;
  date: number;
  renderer: (props: {minutes: number; seconds: number;}) => React.ReactNode;
}

const Timer = ({
  autoStart,
  className,
  controlled,
  countdownRef,
  date,
  renderer
}: Props) => {
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
        date={date}
        ref={countdownRef as React.Ref<Countdown>}
        renderer={renderer}
      />
    </div>
  );
};

export default Timer;
