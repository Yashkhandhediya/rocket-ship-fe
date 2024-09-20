import React, {useState,useEffect} from 'react'
import { CustomMultiSelect } from '../../../common/components';


const Channel = ({show,onClose}) => {
    const [showChannelInfo, setShowChannelInfo] = useState('Channel Ids');
    const [isShow,setIsShow] = useState(show)
    const channelInfo = [
        {label:"Custom",value:"Custom"},
    ]

    useEffect(() => {
        setIsShow(show);
      }, [show]);
    
      const handleClose = () => {
        setIsShow(false);
        onClose(); 
      };

  return (
    <div className="mb-6 w-full border-2 rounded-md mt-2 p-2.5">
    <div className="flex flex-row justify-between items-center mb-2">
    <h2 className="block text-sm font-medium text-gray-500">
         Channel Ids
    </h2>
    <button onClick={() => handleClose()}>
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
        </svg>
    </button>
    </div>
    <div className="mt-2 w-[30%]">
    <CustomMultiSelect
    //   isMulti={false}
      withCheckbox={true}
      displayValuesAsStrings
      options={channelInfo}
    //   selected={showChannelInfo}
      closeMenuOnSelect={true}
      hideSelectedOptions={false}
      placeholder={showChannelInfo != '' ? showChannelInfo : 'Channel Ids'}
      onChange={(value) => {
        setShowChannelInfo(value);
      }}
    />
    </div>
  </div>
  )
}

export default Channel