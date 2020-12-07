import React, { ReactElement, useState } from "react";
import TabTitle from "./TabTitle";
import "./Tabs.scss";

interface Props {
  children: ReactElement[];
}

const Tabs: React.FC<Props> = ({ children }) => {
  const [selectedTab, setSelectedTab] = useState(0);

  return (
    <div className="tabs">
      <ul>
        {children.map((item, index) => (
          <TabTitle
            key={index}
            title={item.props.title}
            selectIndex={selectedTab}
            index={index}
            setSelectedTab={setSelectedTab}
          />
        ))}
      </ul>
      {children[selectedTab]}
    </div>
  );
};

export default Tabs;
