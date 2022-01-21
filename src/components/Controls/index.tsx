import { VFC } from "react";

type Props = {
  children: any;
};

export const Controls: VFC<Props> = ({ children }) => {
  return <div>{children}</div>;
};
