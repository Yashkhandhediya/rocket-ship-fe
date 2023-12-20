import { Field } from '../../../../common/components';
import { useState } from 'react';

const BuyerAdressFields = ({
  heading,
  alternateText,
  values,
  onChange,
  triggerValidation,
  disabledFields,
}) => {
  const [isValidPinCode, setIsValidPincode] = useState(true);
  const [isValidAddress, setIsValidAddress] = useState(true);
  const [isValidCity, setIsValidCity] = useState(true);
  const [isValidState, setIsValidState] = useState(true);
  const [isValidCountry, setIsValidCountry] = useState(true);

  return (
    <div>
      <div className="mb-3 text-sm font-medium">
        {heading}
        {alternateText && <span className="pl-1 text-gray-400">{alternateText}</span>}
      </div>
      <div className="w-full">
        <div className="mb-3 w-full md:flex">
          <div className="px-2 pb-2 md:w-6/12 md:pb-0">
            <Field
              id={`complete_address`}
              label={'Complete Address'}
              labelClassNames={'text-xs'}
              inputClassNames={'text-xs'}
              placeHolder={'House/Floor No. Building Name or Street, Locality'}
              required={true}
              isDisabled={disabledFields?.complete_address}
              value={values?.[`complete_address`] || ''}
              onChange={onChange}
              triggerValidation={triggerValidation}
              onBlur={() => {
                setIsValidAddress(Boolean(values?.complete_address?.length));
              }}
            />
            {!isValidAddress && <p className="text-xs text-red-500 mt-1">Address is required.</p>}
          </div>
          <div className="px-2 pb-2 md:w-6/12 md:pb-0">
            <Field
              id={`landmark`}
              label={'Landmark'}
              showOptional
              inputClassNames={'text-xs'}
              labelClassNames={'text-xs'}
              placeHolder={'Any nearby post office, market, Hospital as the landmark'}
              required={true}
              isDisabled={disabledFields?.landmark}
              value={values?.[`landmark`] || ''}
              onChange={onChange}
            />
          </div>
        </div>
        <div className="w-full md:flex">
          <div className="px-2 pb-2 md:w-3/12 md:pb-0">
            <Field
              type={'number'}
              id={`pincode`}
              label={'Pincode'}
              inputClassNames={'text-xs'}
              labelClassNames={'text-xs'}
              placeHolder={"Enter Buyer's Pincode"}
              required={true}
              isDisabled={disabledFields?.pincode}
              value={values?.[`pincode`] || ''}
              onChange={onChange}
              triggerValidation={triggerValidation}
              onBlur={() => {
                setIsValidPincode(/^\d{6}$/.test(values?.[`pincode`]));
              }}
            />
            {!isValidPinCode && (
              <p className="text-xs text-red-500 mt-1">Please enter a valid Pincode.</p>
            )}
          </div>
          <div className="px-2 pb-2 md:w-3/12 md:pb-0">
            <Field
              id={`city`}
              label={'City'}
              labelClassNames={'text-xs'}
              inputClassNames={'text-xs bg-[#f4f9fd]'}
              placeHolder={"Enter Buyer's City"}
              required={true}
              value={values?.[`city`] || ''}
              isDisabled={disabledFields?.city}
              triggerValidation={triggerValidation}
              onBlur={() => setIsValidCity(values?.city)}
              onChange={onChange}
            />
            {!isValidCity && <p className="text-xs text-red-500 mt-1">City field is required.</p>}
          </div>
          <div className="px-2 pb-2 md:w-3/12 md:pb-0">
            <Field
              type={'select'}
              id={`state`}
              label={'State'}
              inputClassNames={'text-xs bg-[#f4f9fd]'}
              labelClassNames={'text-xs'}
              placeHolder={'Please Select State'}
              required={true}
              value={values?.[`state`] || ''}
              triggerValidation={triggerValidation}
              onBlur={() => setIsValidState(values?.state)}
              isDisabled={disabledFields?.state}
              onChange={onChange}
            />
            {!isValidState && <p className="text-xs text-red-500 mt-1">State field is required.</p>}
          </div>
          <div className="px-2 pb-2 md:w-3/12 md:pb-0">
            <Field
              id={`country`}
              label={'Country'}
              labelClassNames={'text-xs'}
              inputClassNames={'text-xs bg-[#f4f9fd]'}
              placeHolder={"Enter Buyer's country"}
              required={true}
              value={values?.[`country`] || ''}
              triggerValidation={triggerValidation}
              onBlur={() => setIsValidCountry(values?.country)}
              isDisabled={disabledFields?.country}
              onChange={onChange}
            />
            {!isValidCountry && <p className="text-xs text-red-500 mt-1">Country field is required.</p>}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BuyerAdressFields;
