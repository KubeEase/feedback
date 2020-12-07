import React, { useCallback } from "react";

interface Props {
  title: string;
  index: number;
  selectIndex: number;
  setSelectedTab: (index: number) => void;
}

const TabTitle: React.FC<Props> = ({ title, setSelectedTab, index, selectIndex }) => {
  const onClick = useCallback(() => {
    setSelectedTab(index);
  }, [setSelectedTab, index]);

  return (
    <li onClick={onClick} className={`${index === selectIndex ? "selected" : ""}`}>
      {title}
    </li>
  );
};

export default TabTitle;
