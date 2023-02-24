import React, { useState } from "react";

function Tabs({ label1, content1, label2, content2 }) {
  let labelOne = label1;
  let contentOne = content1;

  let labelTwo = label2;
  let contentTwo = content2;

  const tabsData = [
    {
      label: labelOne,
      content: contentOne,
    },
    {
      label: labelTwo,
      content: contentTwo,
    },
  ];
  const [activeTabIndex, setActiveTabIndex] = useState(0);

  return (
    <div>
      <div className="flex3 space-x-2 border-b-2 border-gray-200">
        {/* Loop through tab data and render button for each. */}
        {tabsData.map((tab, idx) => {
          return (
            <button
              key={idx}
              className={`py-2 px-4 transition-colors duration-300 text-base font-semibold ${
                idx === activeTabIndex
                  ? "bg-white"
                  : "bg-gray-200 hover:border-gray-200"
              }`}
              // Change the active tab on click.
              onClick={() => setActiveTabIndex(idx)}
            >
              {tab.label}
            </button>
          );
        })}
      </div>
      {/* Show active tab content. */}
      <div className="p-8 bg-gray-100">
        <div>{tabsData[activeTabIndex].content}</div>
      </div>
    </div>
  );
}

export default Tabs;
