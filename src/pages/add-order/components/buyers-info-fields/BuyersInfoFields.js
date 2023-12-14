import { Field } from '../../../../common/components';
import { useState } from 'react';

const BuyersInfoFields = ({ id, heading, alternateText, values, onChange }) => {
  const [isValidPhone, setIsValidPhone] = useState(true);
  const [isValidEmail, setIsValidEmail] = useState(true);

  return (
    <div>
      <div className="mb-3 text-sm font-medium">
        {heading}
        {alternateText && <span className="pl-1 text-gray-400">{alternateText}</span>}
      </div>
      <div className="md:flex">
        <div className="px-2 pb-2 md:w-4/12 md:pb-0">
          <Field
            type={'number'}
            id={`contact_info`}
            label={'Mobile Number'}
            inputClassNames={'text-xs'}
            labelClassNames={'text-xs'}
            placeHolder={"Enter buyer's phone number"}
            required={true}
            value={values?.[`contact_info`]}
            onChange={onChange}
            onBlur={()=>{setIsValidPhone(/^\d{10}$/.test(values?.[`contact_info`]));}}
          />
          {!isValidPhone && (
            <p style={{ color: 'red', fontSize: 'small' }}>
              Please enter a valid 10-digit number.
            </p>
          )}
        </div>

        <div className="px-2 pb-2 md:w-4/12 md:pb-0">
          <Field
            id={`first_name`}
            label={'Full Name'}
            labelClassNames={'text-xs'}
            inputClassNames={'text-xs'}
            placeHolder={'Enter Full Name'}
            required={true}
            value={values?.[`first_name`]}
            onChange={onChange}
          />
        </div>
        <div className="px-2 pb-2 md:w-4/12 md:pb-0">
          <Field
            type={'email'}
            id={`email_address`}
            label={'Email ID'}
            inputClassNames={'text-xs'}
            showOptional
            labelClassNames={'text-xs'}
            placeHolder={'i.e abc@gmail.com'}
            required={true}
            value={values?.[`email_address`]}
            onChange={onChange}
            onBlur={()=>{
              setIsValidEmail(/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values?.[`email_address`]));
            }}
          />
          {!isValidEmail && (
            <p style={{ color: 'red', fontSize: 'small' }}>Please enter a valid email.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default BuyersInfoFields;
