import React, { ReactElement, useState } from "react";
import TabTitle from "./TabTitle";
import "./Tabs.scss";

interface Props {
  children: ReactElement[];
  onChange?: (index: number) => void;
}

const Tabs: React.FC<Props> = ({ children, onChange }) => {
  const [selectedTab, setSelectedTab] = useState(0);
  const onIndexChange = (index: number) => {
    setSelectedTab(index);
    if (onChange !== undefined) {
      onChange(index);
    }
  };
  return (
    <div className="tabs">
      <ul>
        {children.map((item, index) => (
          <TabTitle
            key={index}
            title={item.props.title}
            selectIndex={selectedTab}
            index={index}
            setSelectedTab={onIndexChange}
          />
        ))}
      </ul>
      {children[selectedTab]}
    </div>
  );
};

export default Tabs;
