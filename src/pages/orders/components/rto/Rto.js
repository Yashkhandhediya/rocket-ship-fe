import { useState } from 'react';
import { filterIcon } from '../../../../common/icons';
import { MoreFiltersDrawer } from '../more-filters-drawer';
import { filterInRTO } from '../utils';

const Rto = () => {
  const [openFilterDrawer, setOpenFilterDrawer] = useState(false);

  return (
    <div className="mt-5">
      <div className="mb-4 flex w-full">
        <div>
          <button
            className="inline-flex items-center rounded-sm border border-[#e6e6e6] bg-white px-2.5 py-2 text-xs font-medium hover:border-indigo-700"
            onClick={() => setOpenFilterDrawer(true)}>
            <img src={filterIcon} className="mr-2 w-4" />
            {'More Filters'}
          </button>
        </div>
      </div>

      <MoreFiltersDrawer
        isOpen={openFilterDrawer}
        onClose={() => setOpenFilterDrawer(false)}
        fieldNames={filterInRTO}
      />
    </div>
  );
};

export default Rto;
