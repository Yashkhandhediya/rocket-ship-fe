import { Field } from '../../../../common/components';
import { useState } from 'react';

const BuyersInfoFields = ({ id, heading, alternateText, onChange }) => {
  const [phone, setPhone] = useState();
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');

  function handleChangePhone($event){
    setPhone(event.target.value)
  }

  function handleChangeFullName($event){
    setFullName(event.target.value)
  }

  function handleChangeEmail($event){
    setEmail(event.target.value)
  }
  return (
    <div>
      <div className="mb-3 text-sm font-medium">
        {heading}
        {alternateText && <span className="pl-1 text-gray-400">{alternateText}</span>}
      </div>
      <div className="md:flex">
        <div className="px-2 pb-2 md:pb-0 md:w-4/12">
          <Field
            type={'number'}
            id={`${id}-mobile`}
            label={'Mobile Number'}
            inputClassNames={'text-xs'}
            labelClassNames={'text-xs'}
            placeHolder={"Enter buyer's phone number"}
            required={true}
            value={phone}
            onChange={handleChangePhone}
          />
        </div>
        <div className="px-2 pb-2 md:pb-0 md:w-4/12">
          <Field
            id={`${id}-fullName`}
            label={'Full Name'}
            labelClassNames={'text-xs'}
            inputClassNames={'text-xs'}
            placeHolder={'Enter Full Name'}
            required={true}
            value={fullName}
            onChange={handleChangeFullName}
          />
        </div>
        <div className="px-2 pb-2 md:pb-0 md:w-4/12">
          <Field
            type={'email'}
            id={`${id}-email`}
            label={'Email ID'}
            inputClassNames={'text-xs'}
            showOptional
            labelClassNames={'text-xs'}
            placeHolder={'i.e abc@gmail.com'}
            required={true}
            value={email}
            onChange={handleChangeEmail}
          />
        </div>
      </div>
    </div>
  );
};

export default BuyersInfoFields;
