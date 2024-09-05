import { useEffect, useState } from 'react';
import { Checkbox, Field, FieldAccordion, CustomTooltip } from '../../../../common/components';
import { RightDrawer } from '../../../../common/components/right-drawer';
import { editIcon, infoIcon, locationPin } from '../../../../common/icons';
import { BuyerAddressFields } from '../buyer-address-fields';
import axios from 'axios';
import { toast } from 'react-toastify';
import { BACKEND_URL } from '../../../../common/utils/env.config';

const AddAddressDrawer = ({ isOpen, onClose, formValues, isEdit, refetchAddress }) => {
  const id_user = localStorage.getItem('user_id');
  const [isAddSupplier, setIsAddSupplier] = useState(false);
  const [isAddRTOAddress, setIsAddRTOAddress] = useState(false);
  const [addressInfo, setAddressInfo] = useState({
    country: 'india',
    tag: 'Home',
  });
  const [addressTag, setAddressTag] = useState(isEdit ? formValues?.tag || 'Home' : 'Home');
  const [contactDisabled, setContactDisabled] = useState(isEdit ? true : false);
  const [disabledLocationFields, setDisabledLocationFields] = useState(false);

  const [isValidFirstName, setIsValidFirstName] = useState(true);
  const [isValidNumber, setIsValidNumber] = useState(true);
  const [isValidAlternateNumber, setIsValidAlternateNumber] = useState(true);
  const [isValidEmailAddress, setIsValidEmailAddress] = useState(true);
  const [triggerValidations, setTriggerValidations] = useState(false);

  const handleCloseDrawer = () => {
    setIsAddSupplier(false);
    setIsAddRTOAddress(false);
    setIsValidFirstName(true);
    setIsValidNumber(true);
    setIsValidEmailAddress(true);
    setTriggerValidations(false);
    setAddressInfo({});
    setAddressTag('Home');
    onClose();
  };

  const tagClasses = (tag) => {
    return tag === addressTag
      ? 'text-orange-700 border-orange-700 bg-[#e5e0ff] mx-2.5 h-6 w-[92px] rounded-xl border text-center text-xs font-normal'
      : 'text-gray-800 border-gray-300 bg-transparent mx-2.5 h-6 w-[92px] rounded-xl border text-center text-xs font-normal';
  };

  const handleSetAddressInfo = (event) => {
    const { id, value } = event.target;
    setAddressInfo({
      ...addressInfo,
      [id]: value,
    });
  };

  const handleUpdateTag = (selectedTag) => {
    setAddressInfo({
      ...addressInfo,
      tag: selectedTag,
    });
  };

  const updateManualTag = (value) => {
    setAddressInfo({
      ...addressInfo,
      tag: value,
    });
  };

  const handleSaveAddressInRedux = () => {
    console.log('PAYLOADDDDDDDD', addressInfo);
    if (
      !addressInfo?.contact_no ||
      !addressInfo?.first_name ||
      !addressInfo.email_address ||
      !addressInfo?.complete_address ||
      !addressInfo?.pincode ||
      !addressInfo?.city ||
      !addressInfo?.state ||
      !addressInfo?.country ||
      !isValidEmailAddress ||
      !isValidFirstName ||
      !isValidNumber
    ) {
      setTriggerValidations(true);
      return;
    }

    axios
      .post(BACKEND_URL + `/address?created_by=${id_user}`, addressInfo)
      .then((resp) => {
        if (resp.status == 200) {
          toast('Pickup details saved successfully', { type: 'success' });
          refetchAddress();
          handleCloseDrawer();
        }
      })
      .catch((e) => {
        toast('Unable to save address please retry', { type: 'error' });
        // eslint-disable-next-line no-console
        console.error(e);
      });
  };

  const onaddressPincodeVerify = (pincodeDetails) => {
    setAddressInfo({
      ...addressInfo,
      ...pincodeDetails,
    });
    setDisabledLocationFields(true);
  };

  useEffect(() => {
    if (!isEdit && (addressInfo?.city || addressInfo?.state)) {
      setAddressInfo({
        ...addressInfo,
        city: '',
        state: '',
      });
      setDisabledLocationFields(false);
    } else if (isEdit) {
      setAddressInfo({
        ...formValues,
      });
    } else {
      setAddressInfo({
        ...addressInfo,
        city: '',
        state: '',
        country: 'india',
        tag: 'Home',
      });
    }
  }, [isOpen]);

  useEffect(() => {
    if (disabledLocationFields) {
      setAddressInfo({
        ...addressInfo,
        city: '',
        state: '',
      });
      setDisabledLocationFields(false);
    }
  }, [addressInfo.pincode]);

  useEffect(() => {
    if (!isEdit) {
      setContactDisabled(false);
      setTriggerValidations(false);
      setAddressInfo({});
      setAddressTag('Home');
    } else {
      setContactDisabled(true);
      setAddressInfo(formValues);
      setAddressTag(formValues?.tag);
    }
  }, [formValues]);

  return (
    <RightDrawer isOpen={isOpen} heading={'Add New Pick Up Address'} onClose={handleCloseDrawer}>
      <div className="md:flex">
        <div className="mb-2 inline-flex items-center px-2 text-sm font-medium lg:w-2/12">
          {'Tag this address as '}
          <CustomTooltip text="Give your pickup address a short and easy-to-remember name.">
            <img src={infoIcon} className="ms-1" />
          </CustomTooltip>
        </div>
        <div className="mb-2 px-2 text-sm font-medium lg:w-9/12">
          <div className="flex w-full">
            <button
              className={tagClasses('Home')}
              onClick={() => {
                setAddressTag('Home');
                handleUpdateTag('Home');
              }}>
              Home
            </button>
            <button
              className={tagClasses('Work')}
              onClick={() => {
                setAddressTag('Work');
                handleUpdateTag('Work');
              }}>
              Work
            </button>
            <button
              className={tagClasses('WareHouse')}
              onClick={() => {
                setAddressTag('WareHouse');
                handleUpdateTag('WareHouse');
              }}>
              WareHouse
            </button>
            <button
              className={tagClasses('Other')}
              onClick={() => {
                setAddressTag('Other');
                handleUpdateTag('Other');
              }}>
              Other
            </button>
            {addressTag === 'Other' && (
              <>
                <input
                  type="text"
                  id={'addressTag'}
                  className="peer block appearance-none border-0 border-b-2 border-gray-200 bg-transparent py-1 ps-2 text-xs text-gray-900 focus:outline-none focus:ring-0"
                  placeholder="save address as"
                  value={addressInfo?.tag || ''}
                  onChange={(e) => updateManualTag(e.target.value)}
                />
                {triggerValidations && addressInfo?.tag && (
                  <p className="mt-1 text-xs text-red-500">The name field is required.</p>
                )}
              </>
            )}
          </div>
        </div>
      </div>
      <div className="mb-4 mt-5 w-full border border-gray-100" />
      <div>
        <div className="mb-2 px-2 text-sm font-medium">{'Contact information for this location'}</div>
        <div className="md:flex">
          <div className="px-2 pb-2 md:w-3/12 md:pb-0">
            <Field
              id={`first_name`}
              label={'Contact Person'}
              inputClassNames={'text-xs'}
              labelClassNames={'text-xs'}
              placeHolder={'Name of the person to be contacted'}
              tooltip={'Please include the phone number of the person who will be present at this location.'}
              required={true}
              // isDisabled={isEdit}
              value={addressInfo?.first_name || ''}
              onChange={handleSetAddressInfo}
              onBlur={() => setIsValidFirstName(addressInfo?.first_name)}
              triggerValidation={triggerValidations}
            />
            {!isValidFirstName && <p className="mt-1 text-xs text-red-500">The name field is required.</p>}
          </div>
          <div className="px-2 pb-2 md:w-3/12 md:pb-0">
            <Field
              type={'number'}
              id={`contact_no`}
              label={'Contact Number'}
              inputClassNames={'text-xs'}
              labelClassNames={'text-xs'}
              lableAddOn={
                isEdit ? (
                  <img
                    src={editIcon}
                    className="ml-2 inline-flex cursor-pointer"
                    onClick={() => setContactDisabled(!contactDisabled)}
                  />
                ) : (
                  ''
                )
              }
              placeHolder={'Enter 10 digit mobile number'}
              required={true}
              // isDisabled={contactDisabled}
              value={addressInfo?.contact_no || ''}
              onChange={handleSetAddressInfo}
              onBlur={() => setIsValidNumber(/^\d{10}$/.test(addressInfo?.contact_no))}
              triggerValidation={triggerValidations}
            />
            {!isValidNumber && (
              <p className="mt-1 text-xs text-red-500">Please enter valid 10 digit phone number.</p>
            )}
          </div>
          <div className="px-2 pb-2 md:w-3/12 md:pb-0">
            <Field
              type={'email'}
              id={`email_address`}
              label={'Email Address'}
              inputClassNames={'text-xs'}
              labelClassNames={'text-xs'}
              placeHolder={'i.e acd@gmail.com'}
              required={true}
              // isDisabled={isEdit}
              value={addressInfo?.email_address || ''}
              onChange={handleSetAddressInfo}
              onBlur={() =>
                setIsValidEmailAddress(/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(addressInfo?.email_address))
              }
              triggerValidation={triggerValidations}
            />
            {!isValidEmailAddress && (
              <p className="mt-1 text-xs text-red-500">Please enter valid email address.</p>
            )}
          </div>
          <div className="px-2 pb-2 md:w-3/12 md:pb-0">
            <Field
              type={'number'}
              id={`alternameMobileNo`}
              label={'Alternate Phone No. '}
              tooltip={
                'Please enter an alternate phone number where a pickup executive can call you if the above number is not reachable.'
              }
              showOptional
              inputClassNames={'text-xs'}
              labelClassNames={'text-xs'}
              placeHolder={'Enter 10 digit mobile number'}
              required={true}
              value={addressInfo?.alternameMobileNo || ''}
              onBlur={() => setIsValidAlternateNumber(/^\d{10}$/.test(addressInfo?.alternameMobileNo))}
              onChange={handleSetAddressInfo}
            />
            {!isValidAlternateNumber && (
              <p className="mt-1 text-xs text-red-500">Please enter valid 10 digit phone number.</p>
            )}
          </div>
        </div>
      </div>
      <div className="mb-4 mt-5 w-full border border-gray-100" />
      <div>
        <BuyerAddressFields
          heading={'How can the delivery person reach the address?'}
          onChange={handleSetAddressInfo}
          values={addressInfo}
          triggerValidation={triggerValidations}
          // onPincodeVeify={!isEdit ? onaddressPincodeVerify : null}
          onPincodeVeify={onaddressPincodeVerify}
          isEdit={isEdit}
          // disabledFields={
          //   isEdit
          //     ? {
          //         complete_address: true,
          //         landmark: true,
          //         pincode: true,
          //         city: true,
          //         state: true,
          //         country: true,
          //       }
          //     : {
          //         city: disabledLocationFields,
          //         state: disabledLocationFields,
          //         country: disabledLocationFields,
          //       }
          // }
        />
      </div>
      <div className="mb-4 mt-5 w-full border border-gray-100" />
      <div>
        <div
          className="flex cursor-pointer items-center text-xs text-orange-700"
          onClick={() => {
            // open map modal to select location
          }}>
          <img src={locationPin} className="mr-2 h-3.5 w-3.5" />
          {'Update location on Map'}
          <span className="pl-2 text-[10px] text-gray-400">{'(Optional)'}</span>
        </div>
      </div>
      <div className="mb-4 mt-5 w-full border border-gray-100" />
      <FieldAccordion id={'supplierRtoAddress'} label={'+ Add RTO Address and Supplier'} showOptional>
        <div className="cursor-auto bg-[#fafafa] p-5">
          <div className="items-center md:flex">
            <div className="mr-10 lg:w-4/12">
              <div className="mb-2 text-xs font-medium"> {'Add Supplier'}</div>
              <Checkbox
                id={'addSupplier'}
                label={'Add this address as supplier/vendor address'}
                checked={isAddSupplier}
                onChange={(e) => setIsAddSupplier(e.target.checked)}
                tooltip={
                  "Enable this to ship orders directly from your vendor's location and generate customer invoice with vendor"
                }
              />
            </div>
            <div className=" md:flex md:w-8/12 lg:w-6/12">
              {isAddSupplier && (
                <>
                  <div className="px-2 pb-2 md:w-6/12 md:pb-0">
                    <Field
                      id={`supplierName`}
                      label={"Supplier/Vendor's Name"}
                      inputClassNames={'text-xs'}
                      labelClassNames={'text-xs'}
                      value={''}
                      onChange={() => {}}
                    />
                  </div>
                  <div className="px-2 pb-2 md:w-6/12 md:pb-0">
                    <Field
                      id={`supplierGST`}
                      label={"Supplier/Vendor's GSTIN"}
                      inputClassNames={'text-xs'}
                      labelClassNames={'text-xs'}
                      value={''}
                      onChange={() => {}}
                    />
                  </div>
                </>
              )}
            </div>
          </div>
          <div className="mt-2 gap-10 md:flex">
            <div className="lg:w-4/12 ">
              <div className="mb-2 inline-flex items-center text-xs font-medium">
                {'Add RTO Address'}
                <CustomTooltip text="Your package will be returned to the address selected by you, incase it needs to be delivered back to the origin.">
                  <img src={infoIcon} className="ms-2" />
                </CustomTooltip>
              </div>
              <Checkbox
                id={'addRtoAddress'}
                label={'Use a different RTO Address'}
                checked={isAddRTOAddress}
                onChange={(e) => setIsAddRTOAddress(e.target.checked)}
              />
            </div>
            <div className=" md:flex md:w-8/12 lg:w-6/12">
              {isAddRTOAddress && (
                <div className="px-2 pb-2 md:w-6/12 md:pb-0">
                  <Field
                    type={'select'}
                    id={`rtoAddress`}
                    label={'Select Address'}
                    placeHolder={'Select Address'}
                    inputClassNames={'text-xs'}
                    labelClassNames={'text-xs'}
                    note={'Note: RTO address is only applicable for Xpressbees, Delhivery and Ecom express.'}
                    value={''}
                    onChange={() => {}}
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      </FieldAccordion>
      <div className="my-6 flex justify-end gap-5">
        <button
          className="rounded border border-orange-700 px-4 py-1.5 text-sm text-orange-700"
          onClick={handleCloseDrawer}>
          Cancel
        </button>
        <button
          className="rounded bg-orange-700 px-4 py-1.5 text-sm text-white"
          onClick={handleSaveAddressInRedux}>
          Verify And Save Address
        </button>
      </div>
    </RightDrawer>
  );
};

export default AddAddressDrawer;
