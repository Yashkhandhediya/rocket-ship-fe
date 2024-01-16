import { isEmpty } from 'lodash';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { setSingleReturn } from '../../../../../redux/actions/addReturnAction';
import { BuyerAddressFields } from '../../buyer-address-fields';
import { BuyersInfoFields } from '../../buyers-info-fields';

export default function BuyerDetails({ formData, currentStep, handleChangeStep }) {
  const dispatch = useDispatch();
  const domesticOrderFormValues = useSelector((state) => state?.addOrder?.domestic_order) || {};
  const [triggerBuyerValidations, setTriggerBuyerValidations] = useState(false);
  const [disableAddressLocationField, setDisableAddressLocationField] = useState(false);

  const [buyerInfo, setBuyerInfo] = useState({
    contact_no: formData?.buyer_info?.contact_no || '',
    first_name: formData?.buyer_info?.first_name || '',
    last_name: formData?.buyer_info?.last_name || '',
    email_address: formData?.buyer_info?.email_address || '',
  });

  console.log(buyerInfo)

  const [addressInfo, setAddressInfo] = useState({
    complete_address: formData?.address_info?.complete_address || '',
    landmark: formData?.address_info?.complete_address || '',
    pincode: formData?.address_info?.pincode || '',
    city: formData?.address_info?.city || '',
    state: formData?.address_info?.state || '',
    country: 'India',
  });

  const handleSetBuyerInfo = (event) => {
    const { id, value } = event.target;
    setBuyerInfo({
      ...buyerInfo,
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



  const onAddressPincodeVerify = (pincodeDetails) => {
    setAddressInfo({
      ...addressInfo,
      ...pincodeDetails,
    });
    setDisableAddressLocationField(true);
  };

  const changeNextStep = (type) => {
    if (type === 'NEXT') {
      setTriggerBuyerValidations(true);
      if (
        !buyerInfo?.contact_no ||
        !buyerInfo?.first_name ||
        !buyerInfo?.last_name ||
        !addressInfo?.complete_address ||
        !addressInfo?.pincode ||
        !addressInfo?.city ||
        !addressInfo?.state ||
        !addressInfo?.country
      ) {
        toast('Please enter all required fields', { type: 'error' });
      } else {
        dispatch(
          setSingleReturn({
            buyer_info: buyerInfo,
            address_info: addressInfo,
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
    if (!isEmpty(domesticOrderFormValues)) {
      setBuyerInfo(domesticOrderFormValues.buyer_info);
      setAddressInfo(domesticOrderFormValues.address_info);
    }
  }, [domesticOrderFormValues]);

  return (
    <div>
      <div className="mb-6 text-xl font-bold"> {'Buyer Details'} </div>
      <div className="mb-3.5 rounded-xl bg-white p-9">
        <div className="mb-3">
          <BuyersInfoFields
            heading={'To whom is the return being picked up'}
            alternateText={"(Buyer's Info)"}
            triggerValidation={triggerBuyerValidations}
            values={buyerInfo}
            onChange={handleSetBuyerInfo}
          />
        </div>
        <div className="my-8 border-t border-solid border-gray-200" />
        <div className="mb-3">
          <BuyerAddressFields
            heading={'Where is the return being picked from?'}
            values={addressInfo}
            alternateText={"(Buyer's Address)"}
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
      </div>
      <div className="flex justify-end gap-4">
        <button
          type="button"
          className="dark:focus:ring-purple-900 rounded-lg bg-purple-600 px-8 py-2 text-sm font-medium text-white hover:bg-purple-800 focus:outline-none focus:ring-4 focus:ring-purple-300"
          onClick={() => changeNextStep('NEXT')}>
          {'Next'}
        </button>
      </div>
    </div>
  );
}
