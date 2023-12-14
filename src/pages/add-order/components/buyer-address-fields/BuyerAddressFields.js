import { Field } from '../../../../common/components';
import { useState } from 'react';

const BuyerAdressFields = ({heading, alternateText, values, onChange }) => {
  const [isValidPinCode, setIsValidPincode] = useState(true);


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
              value={values?.[`complete_address`]}
              onChange={onChange}
            />
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
              value={values?.[`landmark`]}
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
              value={values?.[`pincode`]}
              onChange={onChange}
              onBlur={()=>{
                setIsValidPincode(/^\d{6}$/.test(values?.[`pincode`]));
              }}
            />
            
            {!isValidPinCode && (
              <p style={{ color: 'red', fontSize: 'small' }}>
                Please enter a valid Pincode.
              </p>
            )}
          </div>
          <div className="px-2 pb-2 md:w-3/12 md:pb-0">
            <Field
              id={`city`}
              label={'City'}
              labelClassNames={'text-xs'}
              inputClassNames={'text-xs'}
              placeHolder={"Enter Buyer's City"}
              required={true}
              value={values?.[`city`]}
              onChange={onChange}
            />
          </div>
          <div className="px-2 pb-2 md:w-3/12 md:pb-0">
            <Field
              type={'select'}
              id={`state`}
              label={'State'}
              inputClassNames={'text-xs'}
              labelClassNames={'text-xs'}
              placeHolder={'Please Select State'}
              required={true}
              value={values?.[`state`]}
              onChange={onChange}
            />
          </div>
          <div className="px-2 pb-2 md:w-3/12 md:pb-0">
            <Field
              id={`country`}
              label={'Country'}
              labelClassNames={'text-xs'}
              inputClassNames={'text-xs'}
              placeHolder={"Enter Buyer's country"}
              required={true}
              value={values?.[`country`]}
              onChange={onChange}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default BuyerAdressFields;
