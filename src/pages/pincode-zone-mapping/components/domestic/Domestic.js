import React,{useState,useEffect} from 'react'
import Condition from '../../common/Condition'
import Location from '../../common/Details'
import { Field } from '../../../../common/components'
import Order from './Order'
import ShipmentDrawerSelectCourier from './ShipmentDrawerSelectCourier'
import ShipmentDrawerOrderDetails from './ShipmentDrawerOrderDetails'
import { useRef } from 'react'


const Domestic = () => {
  const [cityInfo,setCityInfo] = useState(null)
  const [destination,setDestination] = useState(null)
  const [show,setShow] = useState(false)
  const [orderDetails, setOrderDetails] = useState(null);
  const [orderInfo,setOrderInfo] = useState(null)
  const componentRef = useRef(null);
  
  const handleDetailsChange = (details,info) => {
    setOrderDetails(details);
    setOrderInfo(info)
    setShow(true)
  };

  const handleCityChange = (info) => {
    setCityInfo(info)
  }

  const handleDestinationChange = (info) => {
    setDestination(info)
  }

  useEffect(() => {
    if (show) {
      componentRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [show]);

  console.log("klklklkl", orderDetails);
  console.log("klklklklllll", orderInfo);
  console.log("klklklklllll", cityInfo);
  return (
    <>
    <div className="flex flex-col">
    <div className="flex flex-row">
    <Order onDetailChange={handleDetailsChange} onCityChange={handleCityChange} onDestinationChange={handleDestinationChange} />
    <Location onCityChange={cityInfo} onDestinationChange={destination} />
    </div>
    {show && 
    <div ref={componentRef}>
    <div className="flex flex-row">
    <div className="mr-4 p-2 mt-4 bg-white border rounded-lg shadow-md">
    <ShipmentDrawerOrderDetails orderDetails={orderInfo} />
    </div>
    <div className="mr-4 p-2 mt-4 w-[78%] bg-white border rounded-lg shadow-md">
    <ShipmentDrawerSelectCourier orderDetails={orderDetails} />
    </div>
    </div>
    </div>}
    </div>
    <Condition />
    </>
  )
}

export default Domestic