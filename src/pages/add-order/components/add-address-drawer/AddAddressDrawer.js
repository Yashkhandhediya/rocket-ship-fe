import { useState } from 'react';
import { Checkbox, Field, FieldAccordion, Tooltip } from '../../../../common/components';
import { RightDrawer } from '../../../../common/components/right-drawer';
import { editIcon, infoIcon, locationPin } from '../../../../common/icons';
import { BuyerAddressFields } from '../buyer-address-fields';
import { useDispatch } from 'react-redux';
import { setAddress } from '../../../../redux/actions/addAddressAction';

const AddAddressDrawer = ({ isOpen, onClose, formValues = {} }) => {
  const [isAddSupplier, setIsAddSupplier] = useState(false);
  const [isAddRTOAddress, setIsAddRTOAddress] = useState(false);
  const [addressInfo, setAddressInfo] = useState(formValues);
  const [addressTag, setAddressTag] = useState('Home');
  const [contactDisabled, setContactDisabled] = useState(formValues ? true : false);

  const [isValidFirstName, setIsValidFirstName] = useState(true);
  const [isValidNumber, setIsValidNumber] = useState(true);
  const [isValidEmailAddress, setIsValidEmailAddress] = useState(true);
  const [triggerValidations, setTriggerValidations] = useState(false);

  const dispatch = useDispatch();

  const tagClasses = (tag) => {
    return tag === addressTag
      ? 'text-indigo-700 border-indigo-700 bg-[#e5e0ff] mx-2.5 h-6 w-[92px] rounded-xl border text-center text-xs font-normal'
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
    if (
      !isValidFirstName ||
      !isValidFirstName ||
      !isValidEmailAddress ||
      !addressInfo?.complete_address ||
      !addressInfo?.pincode ||
      !addressInfo?.city ||
      !addressInfo?.state ||
      !addressInfo?.country
    ) {
      setTriggerValidations(true);
      return;
    }
    dispatch(setAddress(addressInfo, onClose));
  };

  return (
    <RightDrawer isOpen={isOpen} heading={'Add New Pick Up Address'} onClose={onClose}>
      <div className="md:flex">
        <div className="mb-2 px-2 text-sm font-medium lg:w-2/12">{'Tag this address as '}</div>
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
              isDisabled={formValues}
              value={addressInfo?.first_name}
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
                <img
                  src={editIcon}
                  className="ml-2 inline-flex cursor-pointer"
                  onClick={() => setContactDisabled(!contactDisabled)}
                />
              }
              placeHolder={'Enter 10 digit mobile number'}
              required={true}
              isDisabled={contactDisabled}
              value={addressInfo?.contact_no}
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
              isDisabled={formValues}
              value={addressInfo?.email_address}
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
              value={''}
              onChange={() => {}}
            />
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
          disabledFields={{
            complete_address: true,
            landmark: true,
            pincode: true,
            city: true,
            state: true,
            country: true,
          }}
        />
      </div>
      <div className="mb-4 mt-5 w-full border border-gray-100" />
      <div>
        <div
          className="flex cursor-pointer items-center text-xs text-indigo-700"
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
              <div className="mb-2 text-xs font-medium">
                {' '}
                {'Add RTO Address'}{' '}
                <Tooltip
                  id="addRtoAddress"
                  text="Your package will be returned to the address selected by you, incase it needs to be delivered back to the origin." wrapperClassNames={"inline-flex"}>
                  <img src={infoIcon} className="ms-2" />
                </Tooltip>
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
          className="rounded border border-indigo-700 px-4 py-1.5 text-sm text-indigo-700"
          onClick={onClose}>
          Cancel
        </button>
        <button
          className="rounded bg-indigo-700 px-4 py-1.5 text-sm text-white"
          onClick={handleSaveAddressInRedux}>
          Verify And Save Address
        </button>
      </div>
    </RightDrawer>
  );
};

export default AddAddressDrawer;
