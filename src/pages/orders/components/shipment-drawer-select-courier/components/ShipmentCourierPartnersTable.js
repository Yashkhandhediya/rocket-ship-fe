import DataTable from 'react-data-table-component';
import { infoIcon } from '../../../../../common/icons';
import { CustomTooltip, RatingProgressBar } from '../../../../../common/components';

const ShipmentCourierPartnersTable = ({ courierCompanies }) => {
  const columns = [
    {
      name: 'Courier Partner',
      selector: (row) => (
        <div className="flex gap-1 pb-4 pt-7 text-left">
          <div className="">
            <img src={''} className="h-10 w-10 rounded-full bg-gray-400" />
          </div>
          <div>
            <h4 className="pb-1.5 text-xs font-medium text-[#555]">
              {row?.courier_name || 'Xpressbees Surface'}
            </h4>
            <div className="pb-1.5 text-xs text-[#555]">
              {`${Number(row?.surface_max_weight || 0) ? 'Surface ' : 'Air'} | Min-weight: `}
              <span className="font-medium">
                {Number(row?.surface_max_weight || 0)
                  ? row?.surface_max_weight
                  : row?.air_max_weight || 10.54}
              </span>
            </div>
            <div className="pb-1.5 text-xs text-[#555]">
              {`RTO Charges: ₹`}
              <span className="font-medium">{row?.rto_charges || 520}</span>
            </div>
          </div>
        </div>
      ),
    },
    {
      name: 'Rating',
      selector: (row) => (
        <div className="flex flex-col gap-1 py-2 text-left">
          <div className="relative h-12 w-12 text-sm font-medium">
            <RatingProgressBar rating={row?.rating || 4.5} />
          </div>
        </div>
      ),
    },
    {
      name: 'Expected Pickup',
      selector: (row) => (
        <div className="flex flex-col gap-1 py-2 text-left">
          <div className="text-xs text-[#555]">{row?.expected_pickup || 'Tommorow'}</div>
        </div>
      ),
    },
    {
      name: 'Estimated Delivery',
      selector: (row) => (
        <div className="flex flex-col gap-1 py-2 text-left">
          <div className="text-xs text-[#555]">{row?.estimated_delivery || 'Dec 28, 2023'}</div>
        </div>
      ),
    },
    {
      name: 'Chargeable Weight',
      selector: (row) => (
        <div className="flex h-full w-full flex-col gap-1 py-2 text-center">
          <div className="text-xs text-[#555]">{`${row?.charge_weight || 1.25} Kg`}</div>
        </div>
      ),
    },
    {
      name: 'Charges',
      selector: (row) => (
        <div className="flex flex-col gap-1 py-2 text-left">
          <div className="flex items-center">
            <div className="text-base font-bold text-[gray]">{`₹${row?.rate || 180.49}`}</div>
            <CustomTooltip
              text={
                <>
                  <div className="mb-1.5">
                    {`Freight Charge: `}
                    <span className="font-bold">{`₹ ${row?.freight_charge || 0.0}`}</span>
                  </div>
                  <div className="">
                    {`Cod Charges: `}
                    <span className="font-bold">{`₹ ${row?.cod_charges || 0.0}`}</span>
                  </div>
                </>
              }>
              <img src={infoIcon} className="ml-1" />
            </CustomTooltip>
          </div>
        </div>
      ),
    },
    {
      name: 'Action',
      selector: (row) => (
        <div className="flex flex-col gap-1 py-2 text-left">
          <button id={row.id} className="min-w-fit rounded bg-indigo-600 px-5 py-2 text-white">
            {'Ship Now'}
          </button>
        </div>
      ),
    },
  ];

  return (
    <div className="mt-3 h-full w-full text-left">
      <div className="text-xs text-[#888]">{`${courierCompanies?.length || 0} Couriers Found`}</div>
      <div className="mt-4 h-full max-h-full w-full overflow-auto">
        <DataTable
          columns={columns}
          data={[{}, {}, {}]}
          sortActive={false}
        />
      </div>
    </div>
  );
};

export default ShipmentCourierPartnersTable;
