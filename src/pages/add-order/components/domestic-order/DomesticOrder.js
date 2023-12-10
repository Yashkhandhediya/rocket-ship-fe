import { useState } from 'react';
import { Field, Checkbox } from '../../../../common/components';
import { downArrow } from '../../../../common/icons';
import { BuyerAddressFields } from '../buyer-address-fields';
import { BuyersInfoFields } from '../buyers-info-fields';

const DomesticOrder = () => {
  const [isSameBilingAddress, setIsSameBilingAddress] = useState(true);

  return (
    <div className="md:flex pt-8 mb-8">
      <div className="form-step px-6">
        <ol>
          <li>Buyers Details</li>
          <li>Pickup Details</li>
          <li>Order Details</li>
          <li>Package Details</li>
        </ol>
      </div>
      <div className="grow px-6">
        <div className="mb-6 text-xl font-bold"> {"Add Buyer's Details"} </div>
        <div className="mb-3.5 rounded-xl bg-white p-9">
          <div className="mb-3">
            <BuyersInfoFields
              id="buyer"
              heading={'To whom is the order being delivered?'}
              alternateText={"(Buyer's Info)"}
              values={{}}
              onChange={() => {}}
            />
          </div>
          <div
            id="accordion-flush"
            className="my-4 cursor-pointer bg-transparent"
            data-active-classes="bg-white"
            data-accordion="collapse">
            <div
              className="flex items-center bg-transparent pb-4 text-xs text-blue-700"
              data-accordion-target="#alternate-buyer-details"
              aria-controls="alternate-buyer-details">
              <span className="text-blue-700">
                {" + Add Alternate Mobile Number, Buyer's Company Name, Buyer's GSTIN "}
              </span>
              <img
                className="accordion-icon shrink-0 text-indigo-700"
                data-accordion-icon
                src={downArrow}
              />
              <span className="ml-2 text-[10px] text-gray-400">{'(Optional)'}</span>
            </div>
            <div
              id="alternate-buyer-details"
              className="hidden"
              aria-labelledby="accordion-flush-heading-1">
              <div className="md:flex">
                <div className="px-2 pb-2 md:pb-0 w-full md:w-4/12">
                  <Field
                    type={'number'}
                    id={'altMobile'}
                    label={'Alternate Mobile Number'}
                    inputClassNames={'text-xs'}
                    labelClassNames={'text-xs'}
                    placeHolder={"Enter buyer's phone number"}
                    required={true}
                    value={''}
                    onChange={() => {}}
                  />
                </div>
                <div className="px-2 pb-2 md:pb-0 w-full md:w-4/12">
                  <Field
                    id={'compnyName'}
                    label={"Buyer's Company Name"}
                    inputClassNames={'text-xs'}
                    labelClassNames={'text-xs'}
                    placeHolder={"Enter Buyer's Company Name"}
                    note={"Note: If you're Shipping B2B, Please Enter the Company's name"}
                    required={true}
                    value={''}
                    onChange={() => {}}
                  />
                </div>
                <div className="px-2 pb-2 md:pb-0 w-full md:w-4/12">
                  <Field
                    id={'gstin'}
                    label={"Buyer's GSTIN"}
                    inputClassNames={'text-xs'}
                    labelClassNames={'text-xs'}
                    placeHolder={"Enter Buyer's GSTIN"}
                    required={true}
                    value={''}
                    onChange={() => {}}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="mb-3">
            <BuyerAddressFields
              id="buyer"
              heading={'Where is the order being delivered to?'}
              values={{}}
              onChange={() => {}}
            />
          </div>
          <div className="mt-5">
            <div>
              <Checkbox
                checked={isSameBilingAddress}
                label={'Billing address is same as the shipping address'}
                onChange={(e) => setIsSameBilingAddress(e.target.checked)}
              />
            </div>
            {!isSameBilingAddress && <div className='mt-5'>
              <div className='font-bold text-xl mb-5'>
                {'Billing Address'}
              </div>
              <BuyersInfoFields
                id="billing"
                heading={"Buyer's Details"}
                values={{}}
                onChange={() => {}}
              />
              <div className="my-6 w-full border border-gray-200" />
              <BuyerAddressFields
                id="billing"
                heading={"Buyer's Address"}
                values={{}}
                onChange={() => {}}
              />
            </div>}
          </div>
        </div>
        <div className="text-end">
          <button
            type="button"
            className="rounded-lg bg-purple-600 px-8 py-2 text-sm font-medium text-white hover:bg-purple-800 focus:outline-none focus:ring-4 focus:ring-purple-300 dark:focus:ring-purple-900"
            onClick={() => {}}>
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default DomesticOrder;
