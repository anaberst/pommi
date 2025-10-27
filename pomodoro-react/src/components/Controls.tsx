import { type ReactNode } from "react";

interface Props {
  children: ReactNode;
  color: string;
  isDisabled?: boolean;
  onClick: () => void;
}

const Controls = ({ children, color, onClick = { onClick } }: Props) => {
  return <button className={"text-nowrap btn btn-" + color}>{children}</button>;
};

export default Controls;
