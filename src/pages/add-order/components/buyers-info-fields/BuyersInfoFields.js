import { Field } from '../../../../common/components';
import { useState } from 'react';

const BuyersInfoFields = ({ id, heading, alternateText, onChange }) => {
  const [phone, setPhone] = useState(0);
  const[isValidPhone, setIsValidPhone] = useState(true);
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [isValidEmail, setIsValidEmail] = useState(true);

  function handleChangePhone(e){
    setPhone(e.target.value)
  }

  function handleChangeFullName(e){
    setFullName(e.target.value)
  }

  function handleChangeEmail(e){
    setEmail(e.target.value)
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
            onBlur={()=>{setIsValidPhone(/^\d{10}$/.test(phone));}}
          />
          {!isValidPhone && <p style={{ color: 'red', fontSize:'small' }}>Please enter a valid 10-digit number.</p>}
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
            onBlur={()=>{
              setIsValidEmail(/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email));
            }}
          />
          {!isValidEmail && <p style={{ color: 'red', fontSize:'small' }}>Please enter a valid email.</p>}
        </div>
      </div>
    </div>
  );
};

export default BuyersInfoFields;
