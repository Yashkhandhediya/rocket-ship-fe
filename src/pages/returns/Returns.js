import { useNavigate } from 'react-router-dom';
import { Tabs } from '../../common/components/tabs';
import { returnsTabs } from './duck';
import PageWithSidebar from '../../common/components/page-with-sidebar/PageWithSidebar';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { setAllReturns } from '../../redux';
import { toast } from 'react-toastify';
import { useEffect, useState } from 'react';
import Loader from '../../common/loader/Loader';
import { BACKEND_URL } from '../../common/utils/env.config';

export let resData = []
const Returns = () => {
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const allReturnsList = useSelector((state) => state?.returnsList);

  const fetchNewReturns = () => {
    const id = localStorage.getItem('is_company') == 1 ? localStorage.getItem('company_id') : localStorage.getItem('user_id')
    axios
      .get(BACKEND_URL+`/return/get_filtered_returns?page=1&per_page=100&user_id=${id}`)
      .then(async (resp) => {
        if (resp.status === 200) {
          dispatch(setAllReturns(resp?.data || []));
          resData = resp.data
          setIsLoading(false);
        } else {
          toast('There is some error while fetching returns.', { type: 'error' });
          setIsLoading(false);
        }
      })
      .catch(() => {
        toast('There is some error while fetching returns.', { type: 'error' });
        setIsLoading(false);
      });
  };

  let count = 1
  useEffect(() => {
    if(localStorage.getItem('is_kyc') == 1 ){
      if(count == 1){
        toast("Complete Your KYC First",{type:'error'})
        count++
      }
      navigate('/seller/home')
    }else if(localStorage.getItem('is_kyc') == 2){
      if(count == 1){
        toast("KYC Verification Is Pending.",{type:'error'})
        count++
      }
      navigate('/seller/home')
    }

    if (!allReturnsList) {
      fetchNewReturns();
    } else {
      setIsLoading(false);
    }
  }, [allReturnsList]);

  return (
    <PageWithSidebar>
      {isLoading && <Loader />}
      <div className="h-full w-full bg-[#f4f4f4] px-4 text-center">
        <div className="flex items-center justify-between px-1.5 pb-3 pt-4">
          <h1 className="text-xl font-bold">Returns</h1>
          <button
            className={'rounded-sm bg-[#eeebff] px-2.5 py-1.5 text-sm font-medium text-orange-600'}
            onClick={() => navigate('/add-return')}>
            + Add Return
          </button>
        </div>
        <div>
          <Tabs tabs={returnsTabs} tabClassNames={'mr-6 px-3 py-3.5 text-[#7f7f7f] font-medium'} />
        </div>
      </div>
    </PageWithSidebar>
  );
};

export default Returns;
