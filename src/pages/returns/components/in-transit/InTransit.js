import { useState } from 'react';
import { filterIcon } from '../../../../common/icons';
import { MoreFiltersDrawer } from '../more-filters-drawer';
import { filterInTransit } from '../utils';

const InTransit = () => {
  const [openFilterDrawer, setOpenFilterDrawer] = useState(false);

  return (
    <div className="mt-5">
      <div className="mb-4 flex w-full">
        <div>
          <button
            className="inline-flex items-center rounded-sm border border-[#e6e6e6] bg-white px-2.5 py-2 text-xs font-medium hover:border-orange-700"
            onClick={() => setOpenFilterDrawer(true)}>
            <img src={filterIcon} className="mr-2 w-4" />
            {'More Filters'}
          </button>
        </div>
      </div>

      <MoreFiltersDrawer
        isOpen={openFilterDrawer}
        onClose={() => setOpenFilterDrawer(false)}
        fieldNames={filterInTransit}
      />
    </div>
  );
};

export default InTransit;
