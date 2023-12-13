import { BuyersInfoFields } from '../../buyers-info-fields';
import { BuyerAddressFields } from '../../buyer-address-fields';
import { Checkbox, Field, FieldAccordion } from '../../../../../common/components';
import { downArrow } from '../../../../../common/icons';
import { useEffect, useState } from 'react';

export default function BuyerDetails({ handleFormData, formData }) {
  const [isSameBilingAddress, setIsSameBilingAddress] = useState(true);

  const [buyerInfo, setBuyerInfo] = useState({
    contact_no: '',
    first_name: '',
    email_address: '',
  });
  const [companyInfo, setCompanyInfo] = useState({
    name: '',
    gst: '',
  });
  const [addressInfo, setAddressInfo] = useState({
    complete_address: '',
    landmark: '',
    pincode: '',
    city: '',
    state: '',
    country: '',
  });
  const [billingInfo, setBillingInfo] = useState({
    contact_no: '',
    first_name: '',
    email_address: '',
    complete_address: '',
    landmark: '',
    pincode: '',
    city: '',
    state: '',
    country: '',
  });

  const handleSetBuyerInfo = (event) => {
    const { id, value } = event.target;
    setBuyerInfo({
      ...buyerInfo,
      [id]: value,
    });
  };

  const handleSetCompanyInfo = (event) => {
    const { id, value } = event.target;
    setCompanyInfo({
      ...companyInfo,
      [id]: value,
    });
  };

  const handleSetAddressinfo = (event) => {
    const { id, value } = event.target;
    setAddressInfo({
      ...addressInfo,
      [id]: value,
    });
  };

  const handleSetBillinginfo = (event) => {
    const { id, value } = event.target;
    setBillingInfo({
      ...billingInfo,
      [id]: value,
    });
  };

  useEffect(() => {
    handleFormData({
      buyer_info: buyerInfo,
      company_info: companyInfo,
      address_info: addressInfo,
      billing_info: billingInfo,
    });
  }, [billingInfo, addressInfo, companyInfo, buyerInfo]);

  return (
    <div>
      <div className="mb-6 text-xl font-bold"> {"Add Buyer's Details"} </div>
      <div className="mb-3.5 rounded-xl bg-white p-9">
        <div className="mb-3">
          <BuyersInfoFields
            heading={'To whom is the order being delivered?'}
            alternateText={"(Buyer's Info)"}
            values={buyerInfo}
            onChange={handleSetBuyerInfo}
          />
        </div>
        <FieldAccordion
          id={'alternate-buyer-details'}
          label={" + Add Alternate Mobile Number, Buyer's Company Name, Buyer's GSTIN "}
          showOptional>
          <div className="md:flex">
            <div className="w-full px-2 pb-2 md:w-4/12 md:pb-0">
              {/* missing field in API */}
              <Field
                type={'number'}
                id={'altMobile'}
                label={'Alternate Mobile Number'}
                inputClassNames={'text-xs'}
                labelClassNames={'text-xs'}
                placeHolder={"Enter buyer's phone number"}
                required={true}
                value={formData?.number}
                onChange={handleFormData}
              />
            </div>
            <div className="w-full px-2 pb-2 md:w-4/12 md:pb-0">
              <Field
                id={'name'}
                label={"Buyer's Company Name"}
                inputClassNames={'text-xs'}
                labelClassNames={'text-xs'}
                placeHolder={"Enter Buyer's Company Name"}
                note={"Note: If you're Shipping B2B, Please Enter the Company's name"}
                required={true}
                value={companyInfo?.name}
                onChange={handleSetCompanyInfo}
              />
            </div>
            <div className="w-full px-2 pb-2 md:w-4/12 md:pb-0">
              <Field
                id={'gst'}
                label={"Buyer's GSTIN"}
                inputClassNames={'text-xs'}
                labelClassNames={'text-xs'}
                placeHolder={"Enter Buyer's GSTIN"}
                required={true}
                value={companyInfo.gst}
                onChange={handleSetCompanyInfo}
              />
            </div>
          </div>
        </FieldAccordion>
        <div className="mb-3">
          <BuyerAddressFields
            id="buyer"
            heading={'Where is the order being delivered to?'}
            values={addressInfo}
            onChange={handleSetAddressinfo}
          />
        </div>
        <div className="mt-5">
          <div>
            <Checkbox
              id={'sameBillingAdress'}
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
                values={billingInfo}
                onChange={handleSetBillinginfo}
              />
              <div className="my-6 w-full border border-gray-200" />
              <BuyerAddressFields
                id="billing"
                heading={"Buyer's Address"}
                values={billingInfo}
                onChange={handleSetBillinginfo}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
