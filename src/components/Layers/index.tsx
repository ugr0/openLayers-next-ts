import { VFC } from "react";

type Props = {
  children: any;
};

export const Layers: VFC<Props> = ({ children }) => {
  return <div>{children}</div>;
};
