import React from "react";

interface Prop {
  title: string;
}
const Tab: React.FC<Prop> = ({ children }) => {
  return <div>{children}</div>;
};

export default Tab;
