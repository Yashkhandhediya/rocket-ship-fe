import { Field } from '../../../../common/components';
import { useState } from 'react';

const BuyersInfoFields = ({ heading, alternateText, values, onChange, triggerValidation }) => {
  const [isValidPhone, setIsValidPhone] = useState(true);
  const [isValidEmail, setIsValidEmail] = useState(true);
  const [isValidFirstName, setIsValidFirstName] = useState(true);
  const [isValidLastName, setIsValidLastName] = useState(true);

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
            id={`contact_no`}
            label={'Mobile Number'}
            inputClassNames={'text-xs'}
            labelClassNames={'text-xs'}
            placeHolder={"Enter buyer's phone number"}
            required={true}
            leftAddOn="+91"
            value={values?.[`contact_no`]}
            onChange={onChange}
            triggerValidation={triggerValidation}
            onBlur={() => {
              setIsValidPhone(/^\d{10}$/.test(values?.[`contact_no`]));
            }}
          />
          {!isValidPhone && (
            <p className="mt-1 text-xs text-red-500">Please enter a valid 10-digit number.</p>
          )}
        </div>

        <div className="px-2 pb-2 md:w-4/12 md:pb-0">
          <Field
            id={`first_name`}
            label={'First Name'}
            labelClassNames={'text-xs'}
            inputClassNames={'text-xs'}
            placeHolder={'Enter First Name'}
            required={true}
            value={values?.[`first_name`]}
            onChange={onChange}
            triggerValidation={triggerValidation}
            onBlur={() => setIsValidFirstName(Boolean(values?.[`first_name`]?.length))}
          />
          {!isValidFirstName && <p className="mt-1 text-xs text-red-500">First Name is required.</p>}
        </div>
        <div className="px-2 pb-2 md:w-4/12 md:pb-0">
          <Field
            id={`last_name`}
            label={'Last Name'}
            labelClassNames={'text-xs'}
            inputClassNames={'text-xs'}
            placeHolder={'Enter Last Name'}
            required={true}
            value={values?.[`last_name`]}
            onChange={onChange}
            triggerValidation={triggerValidation}
            onBlur={() => setIsValidLastName(Boolean(values?.[`first_name`]?.length))}
          />
          {!isValidLastName && <p className="mt-1 text-xs text-red-500">Last Name is required.</p>}
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
            onBlur={() => {
              setIsValidEmail(
                !values?.[`email_address`] || /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values?.[`email_address`]),
              );
            }}
          />
          {!isValidEmail && <p className="mt-1 text-xs text-red-500">Please enter a valid email.</p>}
        </div>
      </div>
    </div>
  );
};

export default BuyersInfoFields;
