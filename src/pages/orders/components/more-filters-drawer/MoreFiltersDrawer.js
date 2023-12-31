import { useState } from 'react';
import { Checkbox, Field, RightDrawer } from '../../../../common/components';
import CustomMultiSelect from './CustomMultiSelect';

const MoreFiltersDrawer = ({ isOpen, onClose }) => {
  const [filterSelection, setFilterSelection] = useState({
    status: 'All',
    payment: 'All',
    channels: [],
    pickupAddress: [],
    deliveryCountry: [],
    securedShipments: false,
    searchOrderIds: '',
    SKU: '',
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
        <div>
          <CustomMultiSelect
            id={'channels'}
            label={'Channels'}
            placeholder="Select Channels"
            options={[{ label: 'Custom', value: 'custom' }]}
            selected={filterSelection?.channels}
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
        <div>
          <CustomMultiSelect
            id={'pickupAddress'}
            label={'Pickup Address'}
            placeholder="Select Pickup Address"
            options={[{ label: 'Primary', value: 'primary' }]}
            selected={filterSelection?.pickupAddress}
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
        <div>
          <CustomMultiSelect
            id={'deliveryCountry'}
            label={'Delivery Country'}
            placeholder="Select Delivery Country"
            options={[{ label: 'India', value: 'India' }]}
            selected={filterSelection?.deliveryCountry}
            displayCountAsValue
            displayCountAsValueLabel={"Delivery Country Selected"}
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
        <div>
          <label className="mb-2 inline-block text-xs font-medium">{'Secured Shipments'}</label>
          <Checkbox
            id="securedShipments"
            label={'View only Secured Shipments'}
            checked={filterSelection?.securedShipments}
            onChange={handleChangeValues}
          />
        </div>
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
      </div>
    </RightDrawer>
  );
};

export default MoreFiltersDrawer;
