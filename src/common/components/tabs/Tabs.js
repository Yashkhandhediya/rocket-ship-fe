import { useState } from 'react';
import { infoIcon } from '../../icons';
import { CustomTooltip } from '../custom-tooltip';

const Tabs = ({ tabs, tabClassNames, panelClassNames }) => {
  const [activeTab, setActiveTab] = useState(0);
  return (
    <div className="mb-4">
      <div
        className="dark:border-gray-700 -mb-px flex flex-wrap border-b-2 border-gray-200 text-center text-sm font-medium"
        id="default-tab">
        {tabs.map((tab, i) => {
          return (
            // <li className={`me-2 flex`} key={tab.id}>
            <button
              key={tab.id}
              className={`me-2 inline-flex items-center rounded-t-lg border-b-4 p-2 ${
                i === activeTab ? 'border-indigo-600 text-indigo-600' : 'border-transparent'
              } ${tabClassNames}`}
              id={`${tab.id}-tab`}
              type="button"
              onClick={() => setActiveTab(i)}>
              {tab.title}
              {tab?.tooltip && (
                <CustomTooltip text={tab.tooltip}>
                  <img className="ms-2" src={infoIcon} />
                </CustomTooltip>
              )}
            </button>
            // </li>
          );
        })}
      </div>
      <div id="default-tab-content">
        {tabs.map((tab, i) => {
          return (
            <div
              key={tab.id}
              className={`dark:bg-gray-800 rounded-lg  bg-gray-50 ${i !== activeTab ? 'hidden' : ''} ${
                panelClassNames || ''
              }`}
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
