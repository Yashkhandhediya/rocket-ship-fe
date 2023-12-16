import { useState } from 'react';
import { Checkbox, Field, FieldAccordion } from '../../../../common/components';
import { RightDrawer } from '../../../../common/components/right-drawer';
import { locationPin } from '../../../../common/icons';
import { BuyerAddressFields } from '../buyer-address-fields';
import { useDispatch } from 'react-redux';
import { setAddress } from '../../../../redux/actions/addAddressAction';

const AddAddressDrawer = ({ isOpen, onClose, formValues = {} }) => {
  const [isAddSupplier, setIsAddSupplier] = useState(false);
  const [isAddRTOAddress, setIsAddRTOAddress] = useState(false);
  const [addressInfo, setAddressInfo] = useState(formValues);

  const dispatch = useDispatch();

  const handleSetAddressInfo = (event) => {
    const { id, value } = event.target;
    setAddressInfo({
      ...addressInfo,
      [id]: value,
    });
  };

  const handleSaveAddressInRedux = () => {
    dispatch(setAddress(addressInfo, onClose));
  };

  return (
    <RightDrawer isOpen={isOpen} heading={'Add New Pick Up Address'} onClose={onClose}>
      <div className="md:flex">
        <div className="mb-2 px-2 text-sm font-medium lg:w-2/12">
          {'Tag this address as '}
        </div>
        <div className="mb-2 px-2 text-sm font-medium lg:w-9/12">
          <div className="flex w-full">
            <button className="mx-2.5 h-6 w-[92px] rounded-xl border border-indigo-700 bg-[#e5e0ff] text-center text-xs font-normal text-indigo-700">
              Home
            </button>
            <button className="mx-2.5 h-6 w-[92px] rounded-xl border border-gray-300 bg-transparent text-center text-xs font-normal text-gray-800">
              Work
            </button>
            <button className="mx-2.5 h-6 w-[92px] rounded-xl border border-gray-300 bg-transparent text-center text-xs font-normal text-gray-800">
              WareHouse
            </button>
            <button className="mx-2.5 h-6 w-[92px] rounded-xl border border-gray-300 bg-transparent text-center text-xs font-normal text-gray-800">
              Other
            </button>
            <input
              type="text"
              id={'addressTag'}
              className="peer block appearance-none border-0 border-b-2 border-gray-200 bg-transparent py-1 ps-2 text-xs text-gray-900 focus:outline-none focus:ring-0"
              placeholder="save address as"
            />
          </div>
        </div>
      </div>
      <div className="mb-4 mt-5 w-full border border-gray-100" />
      <div>
        <div className="mb-2 px-2 text-sm font-medium">
          {'Contact information for this location'}
        </div>
        <div className="md:flex">
          <div className="px-2 pb-2 md:w-3/12 md:pb-0">
            <Field
              id={`first_name`}
              label={'Contact Person'}
              inputClassNames={'text-xs'}
              labelClassNames={'text-xs'}
              placeHolder={'Name of the person to be contacted'}
              required={true}
              value={addressInfo?.first_name}
              onChange={handleSetAddressInfo}
            />
          </div>
          <div className="px-2 pb-2 md:w-3/12 md:pb-0">
            <Field
              type={'number'}
              id={`contact_no`}
              label={'Contact Number'}
              inputClassNames={'text-xs'}
              labelClassNames={'text-xs'}
              placeHolder={'Enter 10 digit mobile number'}
              required={true}
              value={addressInfo?.contact_no}
              onChange={handleSetAddressInfo}
            />
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
              value={addressInfo?.email_address}
              onChange={handleSetAddressInfo}
            />
          </div>
          <div className="px-2 pb-2 md:w-3/12 md:pb-0">
            <Field
              type={'number'}
              id={`alternameMobileNo`}
              label={'Alternate Phone No. '}
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
      <FieldAccordion
        id={'supplierRtoAddress'}
        label={'+ Add RTO Address and Supplier'}
        showOptional>
        <div className="cursor-auto bg-[#fafafa] p-5">
          <div className="items-center md:flex">
            <div className="mr-10 lg:w-4/12">
              <div className="mb-2 text-xs font-medium"> {'Add Supplier'}</div>
              <Checkbox
                id={'addSupplier'}
                label={'Add this address as supplier/vendor address'}
                checked={isAddSupplier}
                onChange={(e) => setIsAddSupplier(e.target.checked)}
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
              <div className="mb-2 text-xs font-medium"> {'Add RTO Address'}</div>
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
                    note={
                      'Note: RTO address is only applicable for Xpressbees, Delhivery and Ecom express.'
                    }
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
