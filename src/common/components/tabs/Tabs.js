import { useState } from 'react';
import { infoIcon } from '../../icons';

const Tabs = ({ tabs, tabClassNames }) => {
  const [activeTab, setActiveTab] = useState(0);
  return (
    <div className="mb-4">
      <ul
        className="dark:border-gray-700 -mb-px flex flex-wrap border-b-2 border-gray-200 text-center text-sm font-medium"
        id="default-tab">
        {tabs.map((tab, i) => {
          return (
            <li className={`me-2 flex`} key={tab.id}>
              <button
                className={`inline-flex items-center rounded-t-lg border-b-4 p-2 ${tabClassNames} ${
                  i === activeTab ? 'border-indigo-600 text-indigo-600' : 'border-transparent'
                }`}
                id={`${tab.id}-tab`}
                type="button"
                onClick={() => setActiveTab(i)}>
                {tab.title}
                {tab?.tooltip && <img className="ms-2" src={infoIcon} />}
              </button>
            </li>
          );
        })}
      </ul>
      <div id="default-tab-content">
        {tabs.map((tab, i) => {
          return (
            <div
              key={tab.id}
              className={`dark:bg-gray-800 rounded-lg  bg-gray-50 ${i !== activeTab ? 'hidden' : ''}`}
              id={`${tab.id}-panel`}>
              {tab.panel}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Tabs;
