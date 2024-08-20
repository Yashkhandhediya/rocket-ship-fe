import React,{useState} from 'react'
import Condition from '../../common/Condition'
import Details from '../../common/Details'
import Order from './Order'

const International = () => {
    const [internationalRate, setInternationalRate] = useState(true)
  return (
    <>
    <div className="flex flex-row">
    <Order />
    <Details flag={internationalRate} />
    </div>
    <Condition />
    </>
  )
}

export default International