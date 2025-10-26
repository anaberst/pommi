import { type ReactNode } from "react";

interface Props {
  children: ReactNode;
  color: string;
}

const Controls = ({ children, color }: Props) => {
  return (
    <button className={"btn btn-" + color}>
      {children}
    </button>
  );
};

export default Controls;
