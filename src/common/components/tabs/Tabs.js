import { infoIcon } from '../../icons';

const Tabs = ({ tabs }) => {
  return (
    <div className="mb-4 border-b border-gray-200 dark:border-gray-700">
      <ul
        className="-mb-px flex flex-wrap text-center text-sm font-medium"
        id="default-tab"
        data-tabs-toggle="#default-tab-content"
        role="tablist">
        {tabs.map((tab, i) => {
          return (
            <li className="me-2 flex" role="presentation" key={tab.id}>
              <button
                className="inline-flex items-center rounded-t-lg border-b-4 p-2 font-normal"
                id={`${tab.id}-tab`}
                data-tabs-target={`#${tab.id}-panel`}
                type="button"
                role="tab"
                aria-controls={`${tab.id}-panel`}
                aria-selected={i === 0 ? 'true' : 'false'}>
                {tab.title}
                <img className="ms-2" src={infoIcon} />
              </button>
            </li>
          );
        })}
      </ul>
      <div id="default-tab-content">
        {tabs.map((tab) => {
          return (
            <div
              key={tab.id}
              className={`hidden rounded-lg bg-gray-50  dark:bg-gray-800`}
              id={`${tab.id}-panel`}
              role="tabpanel"
              aria-labelledby={`${tab.id}-tab`}>
              {tab.panel}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Tabs;
