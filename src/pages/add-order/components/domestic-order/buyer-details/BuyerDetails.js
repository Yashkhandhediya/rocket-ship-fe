import { BuyersInfoFields } from '../../buyers-info-fields';
import { BuyerAddressFields } from '../../buyer-address-fields';
import { Checkbox, Field, FieldAccordion } from '../../../../../common/components';
import { useEffect, useState } from 'react';
import { setDomesticOrder } from '../../../../../redux/actions/addOrderActions';
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import { isEmpty } from 'lodash';

export default function BuyerDetails({ handleFormData, formData, currentStep, handleChangeStep }) {
  const dispatch = useDispatch();

  const domesticOrderFormValues = useSelector((state) => state?.addOrder?.domestic_order) || {};

  const [isSameBilingAddress, setIsSameBilingAddress] = useState(true);
  const [triggerBuyerValidations, setTriggerBuyerValidations] = useState(false);
  const [disableAddressLocationField, setDisableAddressLocationField] = useState(false);
  const [disableBillingLocationField, setDisableBillingLocationField] = useState(false);

  const [buyerInfo, setBuyerInfo] = useState({
    contact_no: formData?.buyer_info?.contact_no || '',
    first_name: formData?.buyer_info?.first_name || '',
    email_address: formData?.buyer_info?.email_address || '',
  });
  const [companyInfo, setCompanyInfo] = useState({
    name: formData?.company_info?.name || '',
    gst: formData?.company_info?.gst || '',
  });
  const [addressInfo, setAddressInfo] = useState({
    complete_address: formData?.address_info?.complete_address || '',
    landmark: formData?.address_info?.complete_address || '',
    pincode: formData?.address_info?.pincode || '',
    city: formData?.address_info?.city || '',
    state: formData?.address_info?.state || '',
    country: 'India',
  });
  const [billingInfo, setBillingInfo] = useState({
    contact_no: formData?.address_info?.contact_no || '',
    first_name: formData?.address_info?.first_name || '',
    email_address: formData?.address_info?.email_address || '',
    complete_address: formData?.address_info?.complete_address || '',
    landmark: formData?.address_info?.landmark || '',
    pincode: formData?.address_info?.pincode || '',
    city: formData?.address_info?.city || '',
    state: formData?.address_info?.state || '',
    country: formData?.address_info?.state || 'India',
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

  const onAddressPincodeVerify = (pincodeDetails) => {
    setAddressInfo({
      ...addressInfo,
      ...pincodeDetails,
    });
    setDisableAddressLocationField(true);
  };

  const onBillingPincodeVerify = (pincodeDetails) => {
    setBillingInfo({
      ...billingInfo,
      ...pincodeDetails,
    });
    setDisableBillingLocationField(true);
  };

  const changeNextStep = (type) => {
    if (type === 'NEXT') {
      setTriggerBuyerValidations(true);
      if (
        !buyerInfo?.contact_no ||
        !buyerInfo?.first_name ||
        !addressInfo?.complete_address ||
        !addressInfo?.pincode ||
        !addressInfo?.city ||
        !addressInfo?.state ||
        !addressInfo?.country
      ) {
        toast('Please enter all required fields', { type: 'error' });
      } else {
        dispatch(
          setDomesticOrder({
            buyer_info: buyerInfo,
            company_info: companyInfo,
            address_info: addressInfo,
            billing_info: billingInfo,
          }),
        );
        handleChangeStep(currentStep + 1);
      }
    } else if (currentStep > 0) {
      handleChangeStep(currentStep - 1);
    }
  };

  useEffect(() => {
    if (addressInfo?.city || addressInfo?.state) {
      setAddressInfo({
        ...addressInfo,
        city: '',
        state: '',
      });
      setDisableAddressLocationField(false);
    }
  }, [addressInfo.pincode]);

  useEffect(() => {
    if (billingInfo?.city || billingInfo?.state) {
      setBillingInfo({
        ...billingInfo,
        city: '',
        state: '',
      });
      setDisableBillingLocationField(false);
    }
  }, [billingInfo.pincode]);

  useEffect(() => {
    if (!isEmpty(domesticOrderFormValues)) {
      setBuyerInfo(domesticOrderFormValues.buyer_info);
      setCompanyInfo(domesticOrderFormValues.company_info);
      setAddressInfo(domesticOrderFormValues.address_info);
      setBillingInfo(domesticOrderFormValues.billing_info);
    }
  }, [domesticOrderFormValues]);

  return (
    <div>
      <div className="mb-6 text-xl font-bold"> {"Add Buyer's Details"} </div>
      <div className="mb-3.5 rounded-xl bg-white p-9">
        <div className="mb-3">
          <BuyersInfoFields
            heading={'To whom is the order being delivered?'}
            alternateText={"(Buyer's Info)"}
            triggerValidation={triggerBuyerValidations}
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
            heading={'Where is the order being delivered to?'}
            values={addressInfo}
            triggerValidation={triggerBuyerValidations}
            onChange={handleSetAddressinfo}
            onPincodeVeify={onAddressPincodeVerify}
            disabledFields={{
              country: true,
              state: disableAddressLocationField,
              city: disableAddressLocationField,
            }}
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
                onPincodeVeify={onBillingPincodeVerify}
                disabledFields={{
                  country: disableBillingLocationField,
                  state: disableBillingLocationField,
                  city: disableBillingLocationField,
                }}
              />
            </div>
          )}
        </div>
      </div>
      <div className="flex justify-end gap-4">
        <button
          type="button"
          className="dark:focus:ring-red-900 rounded-lg bg-red-600 px-8 py-2 text-sm font-medium text-white hover:bg-red-800 focus:outline-none focus:ring-4 focus:ring-red-300"
          onClick={() => changeNextStep('NEXT')}>
          {'Next'}
        </button>
      </div>
    </div>
  );
}
