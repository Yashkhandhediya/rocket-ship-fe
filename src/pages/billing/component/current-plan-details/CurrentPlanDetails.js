import React, { useState, useEffect } from 'react';
import PageWithSidebar from '../../../../common/components/page-with-sidebar/PageWithSidebar';
import { BillingTabs } from '../billing-tabs';
import ActivateModal from './ActivateModal';
import { BACKEND_URL } from "../../../../common/utils/env.config";
import { toast } from "react-toastify";

function CurrentPlanDetails() {
  const [isOpen, setIsOpen] = useState(false);
  const [plans, setPlans] = useState([]);
  const [activatedPlan, setActivatedPlan] = useState(null);
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    const storedUserId = localStorage.getItem('user_id');
    setUserId(storedUserId);

    if (storedUserId) {
      const fetchPlans = async () => {
        try {
          const response = await fetch(`${BACKEND_URL}/current_plan_details/`);
          const data = await response.json();
          setPlans(data);
        } catch (error) {
          console.error('Error fetching the data:', error);
        }
      };

      const fetchActivatedPlan = async () => {
        try {
          const response = await fetch(`${BACKEND_URL}/current_plan_details/get_activated_plan/?user_id=${storedUserId}`);
          const data = await response.json();
          setActivatedPlan(data.plan_type);
        } catch (error) {
          console.error('Error fetching the activated plan:', error);
        }
      };

      fetchPlans();
      fetchActivatedPlan();
    }
  }, []);

  const handleActivate = async (planId) => {
    if (!userId) {
      toast.error('User ID is not available.');
      return;
    }

    try {
      const response = await fetch(`${BACKEND_URL}/current_plan_details/activate_plan?user_id=${userId}&plan_id=${planId}`, {
        method: 'POST',
      });
      const data = await response.json();
      if (data) {
        setActivatedPlan(planId);
        toast.success(data.message + '!');
      } else {
        toast.error('Error activating the plan');
      }
    } catch (error) {
      toast.error('Error activating the plan');
    }
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  const renderPlanRows = (key, valueExtractor) => (
    <tr className="border text-sm">
      <td className="bg-red-50 px-4 py-2 text-left font-bold text-gray-400">{key}</td>
      {plans.map(plan => (
        <td key={plan.id}>{valueExtractor(plan)}</td>
      ))}
    </tr>
  );

  return (
    <PageWithSidebar>
      {isOpen && <ActivateModal handleClose={handleClose} />}

      <BillingTabs>
        <div className="py-2 text-center">
          <h1 className="pb-2 text-3xl">Cargo Cloud Pricing</h1>
          <p className="text-[12px]">Grow faster with the shipping plan that fits your business</p>
        </div>
        <div className="m-4">
          <div className="flex justify-end rounded-t-xl bg-white px-3 py-4">
            <ul className="flex cursor-pointer gap-8 text-[12px]">
              {['Monthly', 'Quarterly', 'Half Yearly', 'Yearly'].map(period => (
                <li key={period}>{period}</li>
              ))}
            </ul>
          </div>
          <table className="mt-2 w-full bg-white text-center">
            <thead>
              <tr>
                <th className="w-[28%] text-left">
                  <div className="flex flex-col items-start pl-4 py-2">
                    <h2 className='text-[25px]'>Select a plan</h2>
                    <p className="text-[12px] font-normal">
                      Whether you&apos;re a new business or a well-known brand, 
                    </p>
                    <p className="text-[12px] font-normal">
                      we&apos;ve got you covered!
                    </p>
                  </div>
                </th>
                {plans.map(plan => (
                  <th key={plan.id} className="w-[18%] border bg-zinc-100">
                    <div className="ml-8 flex w-3/4 flex-col items-center gap-4 py-4">
                      <p className="text-red-800">{plan.plan_type}</p>
                      <h2 className="text-xl">
                        {plan.price === 0 ? 'Free' : `₹ ${plan.price.toFixed(2)}/`}
                        {plan.price !== 0 && <span className="text-[16px] font-normal">Month</span>}
                      </h2>
                      <p className="text-[12px] font-normal">
                        For sellers who ship up to {plan.shipments} shipments/month
                      </p>
                      <button
                        className={`w-full rounded-xl py-3 text-sm font-normal text-white ${plan.id === activatedPlan ? 'bg-green-500' : 'bg-red-800'}`}
                        onClick={() => handleActivate(plan.id)}
                        disabled={plan.id === activatedPlan}
                      >
                        {plan.id === activatedPlan ? 'Activated' : 'Activate'}
                      </button>
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {renderPlanRows('Shipping Rates', plan => `₹${plan.shipping_rate}/0.5 kg`)}
              {renderPlanRows('Minimum Signup Periods', () => '1 month')}
              {renderPlanRows('Courier Partners', plan => `${plan.courier_partners}+`)}
              <tr className="border text-sm">
                <td className="bg-red-50 px-4 py-2 text-left font-bold text-gray-400"> </td>
                <td className="bg-zinc-100 text-[10px]" colSpan="2">
                  *Cargo cloud fees and shipping prices mentioned are exclusive of GST
                </td>
                <td className="bg-zinc-100 py-2 text-[10px]" colSpan="2">
                  *Shipping price does not include COD or RTO fees
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </BillingTabs>
    </PageWithSidebar>
  );
}

export default CurrentPlanDetails;
