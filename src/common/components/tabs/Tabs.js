import { useState } from 'react';
import { infoIcon } from '../../icons';

const Tabs = ({ tabs }) => {
  const [activeTab, setActiveTab] = useState(0);
  return (
    <div className="mb-4 border-b border-gray-200 dark:border-gray-700">
      <ul
        className="-mb-px flex flex-wrap text-center text-sm font-medium"
        id="default-tab"
      >
        {tabs.map((tab, i) => {
          return (
            <li className="me-2 flex" key={tab.id}>
              <button
                className={`inline-flex items-center rounded-t-lg border-b-4 p-2 font-normal ${i === activeTab
                  ? 'border-indigo-600 text-indigo-600'
                  : 'border-transparent'
                  }`}
                id={`${tab.id}-tab`}
                type="button"
                onClick={() => setActiveTab(i)}
              >
                {tab.title}
                <img className="ms-2" src={infoIcon} />
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
              className={`rounded-lg bg-gray-50  dark:bg-gray-800 ${i !== activeTab ? 'hidden' : ''
                }`}
              id={`${tab.id}-panel`}
            >
              {tab.panel}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Tabs;
