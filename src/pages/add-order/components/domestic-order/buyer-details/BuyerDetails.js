import React from 'react';
import { BuyersInfoFields } from '../../buyers-info-fields';
import { BuyerAddressFields } from '../../buyer-address-fields';
import { Checkbox, Field, FieldAccordion } from '../../../../../common/components';
import { downArrow } from '../../../../../common/icons';
import { useState } from 'react';

export default function BuyerDetails() {
  const [isSameBilingAddress, setIsSameBilingAddress] = useState(true);
  return (
    <div>
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
        <div className="my-3">
          <FieldAccordion
            id={'alternate-buyer-details'}
            label={"+ Add Alternate Mobile Number, Buyer's Company Name, Buyer's GSTIN"}
            showOptional
          >
            <div className="md:flex">
              <div className="w-full px-2 pb-2 md:w-4/12 md:pb-0">
                <Field
                  type={'number'}
                  id={'altMobile'}
                  label={'Alternate Mobile Number'}
                  inputClassNames={'text-xs'}
                  labelClassNames={'text-xs'}
                  placeHolder={'Enter Alternate Mobile Number'}
                  required={true}
                  value={''}
                  onChange={() => {}}
                />
              </div>
              <div className="w-full px-2 pb-2 md:w-4/12 md:pb-0">
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
              <div className="w-full px-2 pb-2 md:w-4/12 md:pb-0">
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
          </FieldAccordion>
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
          {!isSameBilingAddress && (
            <div className="mt-5">
              <div className="mb-5 text-xl font-bold">{'Billing Address'}</div>
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
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
