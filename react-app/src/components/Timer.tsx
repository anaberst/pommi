import React from "react";
import Countdown from "react-countdown";
import { type CountdownApi } from "react-countdown";

interface Props {
  autoStart: boolean;
  className: string;
  countdownRef: React.RefObject<CountdownApi | null>;
  controlled: boolean;
  date: number;
  renderer: (props: { minutes: number; seconds: number }) => React.ReactNode;
  onComplete: () => void;
}

const Timer = ({
  autoStart,
  className,
  controlled,
  countdownRef,
  date,
  renderer,
  onComplete,
}: Props) => {
  return (
    <div
      className={`${className} d-flex justify-content-center align-items-center`}
      style={{
        fontSize: "125px",
        fontWeight: "bold",
        color: "MediumPurple",
      }}
    >
      <Countdown
        autoStart={autoStart}
        controlled={controlled}
        date={date}
        ref={countdownRef as React.Ref<Countdown>}
        renderer={renderer}
        onComplete={onComplete}
      />
    </div>
  );
};

export default Timer;
