import React, {useState,useEffect} from 'react'

const zones = ['Zone A', 'Zone B', 'Zone C', 'Zone D', 'Zone E'];

const Zone = ({show,onClose}) => {
    const [selectedZones, setSelectedZones] = useState([]);
    const [isShow,setIsShow] = useState(show)

  const handleCheckboxChange = (zone) => {
    setSelectedZones(prev =>
      prev.includes(zone)
        ? prev.filter(z => z !== zone)
        : [...prev, zone]
    );
  };

  useEffect(() => {
    setIsShow(show);
  }, [show]);

  const handleClose = () => {
    setIsShow(false);
    onClose(); 
  };


  return (
    <div className="p-4 border-2 rounded-md mt-4">
    <div className="flex flex-row justify-between items-center mb-2">
    <h2 className="mb-2 text-gray-500 font-semibold">Zone Wise</h2>
    <button onClick={() => handleClose()}>
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
        </svg>
    </button>
    </div>
    <div className="flex space-x-4">
      {zones.map(zone => (
        <label key={zone} className="inline-flex items-center">
          <input
            type="checkbox"
            className="form-checkbox text-blue-600 rounded focus:ring-blue-500"
            value={zone}
            checked={selectedZones.includes(zone)}
            onChange={() => handleCheckboxChange(zone)}
          />
          <span className="ml-2">{zone}</span>
        </label>
      ))}
    </div>
  </div>
  )
}

export default Zone