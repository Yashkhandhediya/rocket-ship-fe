import { useEffect, useState } from 'react';
import { Checkbox, Field, RightDrawer, CustomMultiSelect } from '../../../../common/components';
import { fieldDefaultValues } from '../utils';

const MoreFiltersDrawer = ({ isOpen, onClose, fieldNames = [] }) => {
  const [filterSelection, setFilterSelection] = useState({
    status: 'All',
    payment: 'All',
    channels: [],
    pickupAddress: [],
    deliveryCountry: [],
    securedShipments: false,
    searchOrderIds: '',
    SKU: '',
    couriers: [],
    awbOrOrderId: '',
    menifestId: '',
    escalationStatus: [],
    AWB: '',
    shippingPartners: [],
  });

  const handleChangeValues = (e) => {
    const { id, value } = e.target;
    if (id !== 'securedShipments') {
      setFilterSelection({
        ...filterSelection,
        [id]: value,
      });
    } else if (id === 'securedShipments') {
      setFilterSelection({
        ...filterSelection,
        securedShipments: e.target.checked,
      });
    }
  };

  const setStatusValue = (e) => {
    const { value } = e.target;
    setFilterSelection({
      ...filterSelection,
      status: value,
    });
  };

  const setPaymentValue = (e) => {
    const { value } = e.target;
    setFilterSelection({
      ...filterSelection,
      payment: value,
    });
  };

  const renderFieldBasedOnName = (key) => {
    switch (key) {
      case 'Status': {
        return (
          <div>
            <label className="text-xs font-medium">{'Status'}</label>
            <div className="ml-2 flex flex-wrap gap-3">
              <div>
                <input
                  type="radio"
                  id="all"
                  className="mr-2"
                  value="All"
                  name="status"
                  checked={filterSelection?.status === 'All'}
                  onChange={setStatusValue}
                />
                <label htmlFor="all" className="mb-2 inline-flex items-center text-xs text-gray-700">
                  All
                </label>
              </div>
              <div>
                <input
                  type="radio"
                  id="invoiced"
                  className="mr-2"
                  value="Invoiced"
                  name="status"
                  checked={filterSelection?.status === 'Invoiced'}
                  onChange={setStatusValue}
                />
                <label htmlFor="invoiced" className="mb-2 inline-flex items-center text-xs text-gray-700">
                  Invoiced
                </label>
              </div>
              <div>
                <input
                  type="radio"
                  id="new"
                  className="mr-2"
                  value="New"
                  name="status"
                  checked={filterSelection?.status === 'New'}
                  onChange={setStatusValue}
                />
                <label htmlFor="new" className="mb-2 inline-flex items-center text-xs text-gray-700">
                  New
                </label>
              </div>
            </div>
          </div>
        );
      }

      case 'Channels': {
        return (
          <div>
            <CustomMultiSelect
              id={'channels'}
              label={'Channels'}
              placeholder="Select Channels"
              options={[
                { label: 'Custom', value: 'custom' },
                { label: 'tempob785', value: 'tempob785' },
                { label: 'tempop2', value: 'tempop2' },
              ]}
              selected={filterSelection?.channels}
              withCheckbox={true}
              displayValuesAsStrings
              onChange={(val) =>
                handleChangeValues({
                  target: {
                    id: 'channels',
                    value: val,
                  },
                })
              }
            />
          </div>
        );
      }

      case 'Payment': {
        return (
          <div>
            <label className="text-xs font-medium">{'Payment'}</label>
            <div className="ml-2 flex flex-wrap gap-3">
              <div>
                <input
                  type="radio"
                  id="all-payment"
                  className="mr-2"
                  value="All"
                  name="payment"
                  checked={filterSelection?.payment === 'All'}
                  onChange={setPaymentValue}
                />
                <label htmlFor="all-payment" className="mb-2 inline-flex items-center text-xs text-gray-700">
                  All
                </label>
              </div>
              <div>
                <input
                  type="radio"
                  id="cod"
                  className="mr-2"
                  value="Cod"
                  name="payment"
                  checked={filterSelection?.payment === 'Cod'}
                  onChange={setPaymentValue}
                />
                <label htmlFor="cod" className="mb-2 inline-flex items-center text-xs text-gray-700">
                  Cash On Delivery
                </label>
              </div>
              <div>
                <input
                  type="radio"
                  id="prepaid"
                  className="mr-2"
                  value="Prepaid"
                  name="payment"
                  checked={filterSelection?.payment === 'Prepaid'}
                  onChange={setPaymentValue}
                />
                <label htmlFor="prepaid" className="mb-2 inline-flex items-center text-xs text-gray-700">
                  Prepaid
                </label>
              </div>
            </div>
          </div>
        );
      }

      case 'Pickup Address': {
        return (
          <div>
            <CustomMultiSelect
              id={'pickupAddress'}
              label={'Pickup Address'}
              placeholder="Select Pickup Address"
              options={[{ label: 'Primary', value: 'primary' }]}
              selected={filterSelection?.pickupAddress}
              withCheckbox={true}
              displayValuesAsStrings
              onChange={(val) =>
                handleChangeValues({
                  target: {
                    id: 'pickupAddress',
                    value: val,
                  },
                })
              }
            />
          </div>
        );
      }

      case 'Delivery Country': {
        return (
          <div>
            <CustomMultiSelect
              id={'deliveryCountry'}
              label={'Delivery Country'}
              placeholder="Select Delivery Country"
              options={[{ label: 'India', value: 'India' }, { label: 'USA', value: 'USA' }, { label: 'Canada', value: 'Canada' }]}
              selected={filterSelection?.deliveryCountry}
              withCheckbox={true}
              selectAllEnabled
              isSearchable
              displayCountAsValue
              displayCountAsValueLabel={'Delivery Country Selected'}
              onChange={(val) =>
                handleChangeValues({
                  target: {
                    id: 'deliveryCountry',
                    value: val,
                  },
                })
              }
            />
          </div>
        );
      }

      case 'Secured Shipments': {
        return (
          <div>
            <label className="mb-2 inline-block text-xs font-medium">{'Secured Shipments'}</label>
            <Checkbox
              id="securedShipments"
              label={'View only Secured Shipments'}
              checked={filterSelection?.securedShipments}
              onChange={handleChangeValues}
            />
          </div>
        );
      }

      case 'Search Multiple Order Ids': {
        return (
          <div>
            <Field
              id={'searchOrderIds'}
              label="Search Multiple Order Ids"
              placeHolder="Enter order ids"
              labelClassNames="text-xs font-medium"
              inputClassNames="text-xs font-medium"
              value={filterSelection?.searchOrderIds}
              onChange={handleChangeValues}
            />
          </div>
        );
      }

      case 'SKU': {
        return (
          <div>
            <Field
              id={'SKU'}
              label="SKU"
              placeHolder="Enter SKU"
              labelClassNames="text-xs font-medium"
              inputClassNames="text-xs font-medium"
              value={filterSelection?.SKU}
              onChange={handleChangeValues}
            />
          </div>
        );
      }

      case 'Search AWB Or Order Id': {
        return (
          <div>
            <Field
              id={'awbOrOrderId'}
              label="Search AWB Or Order Id"
              placeHolder="Enter Order id or AWB Number"
              labelClassNames="text-xs font-medium"
              inputClassNames="text-xs font-medium"
              value={filterSelection?.awbOrOrderId}
              onChange={handleChangeValues}
            />
          </div>
        );
      }

      case 'Seach Manifest Id': {
        return (
          <div>
            <Field
              id={'menifestId'}
              label="Seach Manifest Id"
              placeHolder="Enter Manifest Id"
              labelClassNames="text-xs font-medium"
              inputClassNames="text-xs font-medium"
              value={filterSelection?.menifestId}
              onChange={handleChangeValues}
            />
          </div>
        );
      }

      case 'AWB': {
        return (
          <div>
            <Field
              id={'AWB'}
              label="AWB"
              placeHolder="Enter AWB Number"
              labelClassNames="text-xs font-medium"
              inputClassNames="text-xs font-medium"
              value={filterSelection?.AWB}
              onChange={handleChangeValues}
            />
          </div>
        );
      }

      case 'Escalation Status': {
        return (
          <div>
            <CustomMultiSelect
              id={'escalationStatus'}
              label={'Escalation Status'}
              placeholder="Select Escalation Status"
              options={[
                { label: 'Closed', value: 'Closed' },
                { label: 'In-progress', value: 'In-progress' },
                { label: 'Pending', value: 'Pending' },
                { label: 'Resolved', value: 'Resolved' },
              ]}
              selected={filterSelection?.escalationStatus}
              withCheckbox={true}
              displayValuesAsStrings
              onChange={(val) =>
                handleChangeValues({
                  target: {
                    id: 'escalationStatus',
                    value: val,
                  },
                })
              }
            />
          </div>
        );
      }

      case 'Couriers': {
        return (
          <div>
            <CustomMultiSelect
              id={'couriers'}
              label={'Couriers'}
              placeholder="Select Couriers"
              options={[{ label: 'Other', value: 'Other' }]}
              selected={filterSelection?.couriers}
              withCheckbox={true}
              isSearchable
              selectAllEnabled
              displayCountAsValue
              displayCountAsValueLabel={'Couriers Selected'}
              onChange={(val) =>
                handleChangeValues({
                  target: {
                    id: 'couriers',
                    value: val,
                  },
                })
              }
            />
          </div>
        );
      }

      case 'Shipping Partners': {
        return (
          <div>
            <CustomMultiSelect
              id={'shippingPartners'}
              label={'Shipping Partners'}
              placeholder="Select Shipping Partners"
              options={[{ label: 'Others', value: 'Others' }]}
              selected={filterSelection?.shippingPartners}
              withCheckbox={true}
              isSearchable
              selectAllEnabled
              displayCountAsValue
              displayCountAsValueLabel={'Shipping Partners Selected'}
              onChange={(val) =>
                handleChangeValues({
                  target: {
                    id: 'shippingPartners',
                    value: val,
                  },
                })
              }
            />
          </div>
        );
      }

      default: {
        return;
      }
    }
  };

  useEffect(() => {
    if (fieldNames?.length) {
      const fieldKeyValues = fieldNames.reduce((allDefaultvalues, name) => {
        return { ...allDefaultvalues, ...fieldDefaultValues[name] };
      }, {});
      setFilterSelection(fieldKeyValues);
    }
  }, [fieldNames]);

  return (
    <RightDrawer
      isOpen={isOpen}
      onClose={onClose}
      heading={'Filters'}
      drawerWrapperClassNames={'text-start'}
      bodyClassNames={'pb-12'}
      width={'340px'}
      footer={
        <div className="flex justify-end bg-white pb-1 pt-2">
          <button className="rounded-md px-4 py-2 text-sm font-medium text-indigo-700">{'Reset All'}</button>
          <button className="rounded-md bg-indigo-700 px-4 py-2 text-sm font-medium text-white">
            {'Apply Filters'}
          </button>
        </div>
      }>
      <div className="mt-1 flex w-full flex-col gap-3">
        {fieldNames?.map((name) => renderFieldBasedOnName(name))}
      </div>
    </RightDrawer>
  );
};

export default MoreFiltersDrawer;
