import { Fragment, useEffect, useState, useMemo, useRef } from 'react';
import { Checkbox, Field, RightDrawer, CustomMultiSelect } from '../../../../common/components';
import { fieldDefaultValues } from '../utils';
import { CustomTooltip } from '../../../../common/components';
import { infoIcon } from '../../../../common/icons';
import { toast } from 'react-toastify';
import { BACKEND_URL } from '../../../../common/utils/env.config';
import { isEmpty } from 'lodash';
import { useDispatch, useSelector } from 'react-redux';
import apiClient from '../../../../common/utils/apiClient';

const EditDrawer = ({ isOpen, onClose, fieldNames = [], data }) => {
  const [validationTriggered, setValidationTriggered] = useState(false);
  const [addressList, setAddressList] = useState([]);
  const id_user = localStorage.getItem('user_id');
  const id_company = localStorage.getItem('company_id');
  const is_company = localStorage.getItem('is_company');
  const domesticReturnFormValues = useSelector((state) => state?.addReturn?.single_return) || {};
  console.log(
    'Returnnnnnnnnn',
    domesticReturnFormValues?.pickup_address?.id,
    domesticReturnFormValues.return_reason,
  );

  const hasFetched = useRef(false);

  const fetchUserAddressList = () => {
    const custom_id = is_company == 1 ? id_company : id_user;
    apiClient
      .get(BACKEND_URL + `/address/?user_id=${custom_id}`)
      .then((resp) => {
        if (resp.status == 200) {
          setAddressList(resp?.data || []);
        }
      })
      .catch((e) => {
        // eslint-disable-next-line no-console
        console.error(e);
        toast('Unable to fetch address', { type: 'error' });
      });
  };

  useEffect(() => {
    if (!addressList?.length) {
      if (!hasFetched.current) {
        fetchUserAddressList();
        hasFetched.current = true;
      }
    }
  }, []);

  const [filterSelection, setFilterSelection] = useState({
    pickupAddress: null,
    return_reason: '',
  });

  const handleChangeValues = (e) => {
    const { id, value } = e.target;
    setFilterSelection({
      ...filterSelection,
      [id]: value,
    });
  };

  const [formDirectField, setFormDirectField] = useState({
    length: 0,
    width: 0,
    height: 0,
    dead_weight: '',
    applicable_weight: '',
    volumatric_weight: '',
  });
  const volumatricWeight =
    useMemo(
      () =>
        (Number(formDirectField?.length || 0) *
          Number(formDirectField?.width || 0) *
          Number(formDirectField?.height || 0)) /
        5000,
      [formDirectField],
    ) || 0;

  const applicableWeight = useMemo(
    () =>
      Number(volumatricWeight) > Number(formDirectField?.dead_weight || 0)
        ? Number(volumatricWeight)
        : Number(formDirectField?.dead_weight || 0),
    [volumatricWeight, formDirectField?.dead_weight],
  );

  const setDirectKeysInForm = (event) => {
    const { id, value, type } = event.target;
    setFormDirectField({
      ...formDirectField,
      [id]: type === 'number' ? parseFloat(value, 10) : value,
    });
  };

  useEffect(() => {
    if (!isEmpty(domesticReturnFormValues)) {
      setFormDirectField({
        length: domesticReturnFormValues?.length,
        width: domesticReturnFormValues?.width,
        height: domesticReturnFormValues?.height,
        dead_weight: domesticReturnFormValues?.dead_weight,
        applicable_weight: domesticReturnFormValues?.applicable_weight,
        volumatric_weight: domesticReturnFormValues?.volumatric_weight,
      });

      if (!isEmpty(addressList)) {
        const selectAddress = addressList?.find(
          (address) => address?.id === domesticReturnFormValues?.pickup_address?.id,
        );
        console.log('SELECT ADDRESS', selectAddress);
        setFilterSelection({
          pickupAddress: `${selectAddress?.complete_address}, ${selectAddress?.city}, ${selectAddress?.state}-${selectAddress?.pincode}`,
          return_reason: domesticReturnFormValues?.return_reason,
        });
      }
      // setFilterSelection({
      //     return_reason:domesticReturnFormValues?.return_reason
      // })
    }
    // console.log("ADFFFFFFFF",filterSelection?.pickupAddress)
  }, [domesticReturnFormValues, addressList]);

  const renderFieldBasedOnName = (key) => {
    switch (key) {
      case 'Package & Dimensions': {
        return (
          <div className="w-full rounded-xl bg-white p-2">
            <label className="text-xs font-medium">{'Package & Dimensions'}</label>
            <div className="mt-2 w-full md:flex">
              <div className="w-full">
                <Field
                  type={'number'}
                  id={'dead_weight'}
                  label={'Dead Weight'}
                  inputClassNames={'text-xs'}
                  placeHolder={'0.00'}
                  tooltip={'Dead Weight is the physical Weight.'}
                  note={
                    '(Max. 3 digits after decimal place) \nNote: The minimum chargeable weight is 0.50 Kg'
                  }
                  required={true}
                  rightAddOn="Kg"
                  value={formDirectField?.dead_weight || ''}
                  onChange={setDirectKeysInForm}
                />
                {validationTriggered && !formDirectField?.dead_weight && (
                  <p className="mt-1 text-xs text-red-500">Weight is required</p>
                )}
                {validationTriggered && formDirectField?.dead_weight < 0.5 && (
                  <p className="mt-1 text-xs text-red-500">Weight should be greter than 0</p>
                )}
              </div>
            </div>
            <div className="mb-4 mt-4 w-full border border-gray-200" />
            <div>
              <div className="w-full md:flex">
                <div className="w-full pb-2">
                  <label className="dark:text-white mb-3 block text-xs font-medium text-gray-600">
                    {'Packages dimension'}
                  </label>
                  <div className="w-full flex-row justify-between gap-4 md:flex">
                    <div className="w-[80%]">
                      <Field
                        type={'number'}
                        id={'length'}
                        inputClassNames={'text-xs w-40px'}
                        placeHolder={'0.00'}
                        required={true}
                        rightAddOn="CM"
                        value={formDirectField?.length || ''}
                        onChange={setDirectKeysInForm}
                      />
                      {validationTriggered && !formDirectField?.length && (
                        <p className="mt-1 text-xs text-red-500">Length is required</p>
                      )}
                      {validationTriggered && formDirectField?.length < 0.5 && (
                        <p className="mt-1 text-xs text-red-500">Weight should be greter than 0.5</p>
                      )}
                    </div>
                    <div className="w-[80%]">
                      <Field
                        type={'number'}
                        id={'width'}
                        inputClassNames={'text-xs'}
                        placeHolder={'0.00'}
                        required={true}
                        rightAddOn="CM"
                        value={formDirectField?.width || ''}
                        onChange={setDirectKeysInForm}
                      />
                      {validationTriggered && !formDirectField?.width && (
                        <p className="mt-1 text-xs text-red-500">Breadth is required</p>
                      )}
                      {validationTriggered && formDirectField?.width < 0.5 && (
                        <p className="mt-1 text-xs text-red-500">Breadth should be greter than 0.5</p>
                      )}
                    </div>
                    <div className="w-[80%]">
                      <Field
                        type={'number'}
                        id={'height'}
                        inputClassNames={'text-xs'}
                        placeHolder={'0.00'}
                        required={true}
                        rightAddOn="CM"
                        value={formDirectField?.height || ''}
                        onChange={setDirectKeysInForm}
                      />
                      {validationTriggered && !formDirectField?.height && (
                        <p className="mt-1 text-xs text-red-500">Height is required</p>
                      )}
                      {validationTriggered && formDirectField?.height < 0.5 && (
                        <p className="mt-1 text-xs text-red-500">Height should be greter than 0.5</p>
                      )}
                    </div>
                  </div>
                  <p className="mt-1 whitespace-pre-wrap text-[10px] leading-4 text-gray-400">
                    {
                      'Note: Dimensions should be in centimeters only & values should be greater than 0.50 cm.'
                    }
                  </p>
                </div>
              </div>
              <div className="my-5 rounded-md bg-[#ecf2fe99] p-5 text-sm font-medium text-gray-900">
                <div className="mb-1 flex">
                  <p>{'Volumetric Weight'}</p>
                  <p className="ml-9">{volumatricWeight + 'kg.'}</p>
                  <CustomTooltip text="It is weight calculated based on the dimensions (L, B, H) entered for the shipment. This weight is calculated using the formula(LxBxH)/5000 (for most of our courier partners) which measures the amount of space that the shipment will take in the carrier.">
                    <img src={infoIcon} className="ml-8 mt-1.5" />
                  </CustomTooltip>
                </div>
              </div>
              <div className="my-2">
                <div className="mt-6 w-full border border-gray-200"></div>
                <div className="rounded-md border-t border-gray-200 bg-[#ecfefd99] p-5 pt-6 text-gray-900">
                  <div className="mb-1 flex text-sm font-bold">
                    <p>{'Applicable Weight'}</p>
                    <p className="ml-9">{applicableWeight + 'kg.'}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      }

      case 'Warehouse Address': {
        return (
          <div>
            <CustomMultiSelect
              isMulti={false}
              id={'pickupAddress'}
              label={'Warehouse Address'}
              placeholder={filterSelection?.pickupAddress || 'Select Pickup Address'}
              options={addressList.map((address) => ({
                label: `${address?.complete_address}, ${address?.city}, ${address?.state}-${address?.pincode}`,
                value: `${address?.complete_address}, ${address?.city}, ${address?.state}-${address?.pincode}`,
              }))}
              withCheckbox={false}
              displayValuesAsStrings
              closeMenuOnSelect={true}
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

      case 'Return Reasons': {
        return (
          <div>
            <CustomMultiSelect
              isMulti={false}
              id={'return_reason'}
              label={'Return Reason'}
              placeholder={filterSelection?.return_reason || 'Select reason for return'}
              options={[
                { label: 'Item is damaged', value: 'damaged' },
                { label: 'Received wrong item', value: 'wrong_item' },
                { label: 'Parcel damaged on arrival', value: 'parcel_damaged' },
                { label: 'Quality not as expected', value: 'quality_not_expected' },
                { label: 'Missing Item or accessories', value: 'missing_item' },
                { label: 'Performance not adequate', value: 'inadequate_performance' },
                { label: 'Size not as expected', value: 'size_not_expected' },
                { label: 'Does not fit', value: 'does_not_fit' },
                { label: 'Not as described', value: 'not_as_described' },
                { label: 'Arrived too late', value: 'arrived_too_late' },
                { label: 'Changed my mind', value: 'changed_my_mind' },
                { label: 'Other', value: 'other' },
              ]}
              withCheckbox={false}
              displayValuesAsStrings
              closeMenuOnSelect={true}
              onChange={(val) =>
                handleChangeValues({
                  target: {
                    id: 'return_reason',
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

  const handleEditOrder = async () => {
    if (
      formDirectField.dead_weight == '' ||
      formDirectField.length == 0 ||
      formDirectField.width == 0 ||
      formDirectField.height == 0 ||
      domesticReturnFormValues?.pickup_address?.id == null
    ) {
      toast('Please Fill All Required Field', { type: 'error' });
      return;
    }
    try {
      const response = await apiClient.put(
        `${BACKEND_URL}/return/update_return_info?return_id=${domesticReturnFormValues?.id}`,
        {
          dead_weight: formDirectField.dead_weight,
          length: formDirectField.length,
          width: formDirectField.width,
          height: formDirectField.height,
          drop_address_id: domesticReturnFormValues?.pickup_address?.id,
        },
      );
      toast('Edited', { type: 'success' });
      console.log(response);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <RightDrawer
      isOpen={isOpen}
      onClose={onClose}
      heading={'Edit Order Details'}
      drawerWrapperClassNames={'text-start'}
      bodyClassNames={'pb-12'}
      width={'430px'}
      footer={
        <div className="flex justify-end bg-white pb-1 pt-2">
          <button className="rounded-md px-4 py-2 text-sm font-medium text-orange-700">{'Cancel'}</button>
          <button
            className="rounded-md bg-orange-700 px-4 py-2 text-sm font-medium text-white"
            onClick={handleEditOrder}>
            {'Edit Order'}
          </button>
        </div>
      }>
      <div className="flex w-full flex-col gap-4">
        {fieldNames?.map((name, i) => (
          <Fragment key={`${name}-${i}`}>{renderFieldBasedOnName(name)}</Fragment>
        ))}
      </div>
    </RightDrawer>
  );
};

export default EditDrawer;
