import React, {useState} from 'react'
import PageWithSidebar from '../../../common/components/page-with-sidebar/PageWithSidebar'
import { CustomMultiSelect } from '../../../common/components';
import { condition } from '../constants';
import Payment from './Payment';
import Weight from './Weight';

const Rule = () => {
    const [shippingRuleName, setShippingRuleName] = useState('');
    const [shippingRuleType, setShippingRuleType] = useState('domestic');
    const [scheduleRule, setScheduleRule] = useState('no');
    const [conditions, setConditions] = useState([]);
    const [conditionType, setConditionType] = useState('Select Condition Type');
    const [isValidShipRuleName, setIsValidShipRuleName] = useState(true);
    const [show,setShow] = useState(true)
    const [showRule,setShowRule] = useState(false)
    
    const handleAddCondition = () => {
      if (conditionType) {
        setConditions([...conditions, conditionType]);
        setConditionType('Select Condition Type');
      }
    };
  
    const handleSubmit = (e) => {
      e.preventDefault();
      console.log({ shippingRuleName, shippingRuleType, scheduleRule, conditions });
      // Handle form submission
    };

    const handleRemoveCondition = (conditionToRemove) => {
        setConditions(conditions.filter(condition => condition !== conditionToRemove));
    };

    const availableConditions = condition.filter(cond => !conditions.includes(cond.label));

  return (
    <PageWithSidebar>
    <div className="min-h-screen bg-gray-100 flex flex-col p-4">
        <div className="mt-2 bg-gray-50">
        <h2 className="text-xl mt-2 mb-4 ml-2">Create New Rule</h2>
        <div className="border-b border-gray-400 ml-2 mr-2"></div>
        </div>
        <div className="mt-4 bg-white border rounded-sm p-4">
            <div className="flex flex-row">
                <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 fill-orange-500 mt-1" viewBox="0 0 24 24">
                    <path d="M9 21h6v2H9v-2zM12 2C7.58 2 4 5.58 4 10c0 2.54 1.19 4.81 3.01 6.34L8 18h8l.99-1.66C18.81 14.81 20 12.54 20 10c0-4.42-3.58-8-8-8zm0 16c-2.89 0-5.33-2.35-5.33-5.25C6.67 8.5 8.58 6 12 6s5.33 2.35 5.33 5.25C17.33 15.65 14.89 18 12 18z"/>
                </svg>
                <div className="text-black text-base font-semibold ml-1">
                Note:
                </div>
            </div>
            <p className="text-sm text-gray-500 p-2">
                 * A rule once created, it won&apos;t be edited. You can only activate & deactivate a rule.
            </p>
        </div>

                <div className="mt-2 bg-white p-4">
                    <div className="w-full mb-4 flex flex-row">
                    <label className="w-[15%] block text-sm font-medium mb-2" htmlFor="shippingRuleName">Shipping Rule Name *</label>
                    <input
                        type="text"
                        id="shippingRuleName"
                        value={shippingRuleName}
                        onChange={(e) => setShippingRuleName(e.target.value)}
                        className="w-[35%] p-1.5 border border-gray-300 rounded"
                        required
                        onBlur={() => setIsValidShipRuleName(shippingRuleName)}
                    />
                    {!isValidShipRuleName && <p className="ml-2 mt-1 text-xs text-red-500">The Shipping Rule Name is required.</p>}
                    </div>
                    <div className="w-full mb-4 flex flex-row">
                    <label className="w-[15%] block text-sm font-medium mb-2">Shipping Rule Type *</label>
                    <div className='w-[40%]'>
                        <label className="mr-4">
                        <input
                            type="radio"
                            name="shippingRuleType"
                            value="domestic"
                            checked={shippingRuleType === 'domestic'}
                            onChange={(e) => setShippingRuleType(e.target.value)}
                            className="mr-2"
                        />
                        Domestic
                        </label>
                        <label>
                        <input
                            type="radio"
                            name="shippingRuleType"
                            value="international"
                            checked={shippingRuleType === 'international'}
                            onChange={(e) => setShippingRuleType(e.target.value)}
                            className="mr-2"
                        />
                        International
                        </label>
                    </div>
                    </div>
                    <div className="w-full mb-4 flex flex-row">
                    <label className="w-[15%] block text-sm font-medium mb-2">Schedule Rule *</label>
                    <div className='w-[40%]'>
                        <label className="mr-4">
                        <input
                            type="radio"
                            name="scheduleRule"
                            value="yes"
                            checked={scheduleRule === 'yes'}
                            onChange={(e) => setScheduleRule(e.target.value)}
                            className="mr-2"
                        />
                        Yes
                        </label>
                        <label>
                        <input
                            type="radio"
                            name="scheduleRule"
                            value="no"
                            checked={scheduleRule === 'no'}
                            onChange={(e) => setScheduleRule(e.target.value)}
                            className="mr-2"
                        />
                        No
                        </label>
                    </div>
                    </div>
                    <div className="mt-8">
                        <h2 className="text-blue-800 text-base font-semibold">
                            Define Your Shipment Conditions :
                        </h2>
                        <div className="border-b border-gray-200 mt-2"></div>


                        {conditions.includes("Payment Mode") && <Payment show={true} onClose={() => handleRemoveCondition("Payment Mode")} />}
                        {conditions.includes("Weight") && <Weight show={true} onClose={() => handleRemoveCondition("Weight")} />}

                        <div className="mt-8">
                                <h2 className='font-semibold text-gray-500'>Select Shipment Conditions</h2>
                                <div className="mt-2 flex items-center space-x-4">
                                    <div className="w-[25%]">
                                        <CustomMultiSelect
                                            isMulti={false}
                                            options={availableConditions}
                                            selected={conditionType}
                                            closeMenuOnSelect={true}
                                            placeholder={conditionType}
                                            hideSelectedOptions={false}
                                            onChange={(value) => {
                                                setConditionType(value)
                                            }} 
                                        />
                                    </div>
                                    <button className={`p-2 px-2 mt-2 text-base text-white font-semibold flex items-center rounded-md ${conditionType == 'Select Condition Type' ? 'bg-blue-300 cursor-not-allowed': 'bg-blue-600'}`}
                                    onClick={() => {setShowRule(true);handleAddCondition()}}>
                                      +  Add Condition
                                    </button>
                                </div>
                        </div>
                    </div>

                    <div className="mt-2 flex flex-row justify-end">
                        <button className="p-2 border rounded-md bg-red-500 text-white mr-2">Cancel</button>
                        <button className="p-2 border rounded-md bg-blue-600 text-white ml-2">Proceed</button>
                    </div>
                </div>
       
    </div>
    </PageWithSidebar>
  )
}

export default Rule

