import { useLocation, useNavigate } from 'react-router-dom';
import { Tabs } from '../../common/components/tabs';
import { returnsTabs } from './duck';
import PageWithSidebar from '../../common/components/page-with-sidebar/PageWithSidebar';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { setAllReturns } from '../../redux';
import { toast } from 'react-toastify';
import { useEffect, useRef, useState } from 'react';
import Loader from '../../common/loader/Loader';
import { BACKEND_URL } from '../../common/utils/env.config';
// updated code
export let resData = [];
const Returns = () => {
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const id_user = localStorage.getItem('user_id');

  const allReturnsList = useSelector((state) => state?.returnsList);
  const hasFetched = useRef(false);
  let flag = false;
  flag = location?.state?.data?.flag !== undefined ? location.state.data.flag : false;
  let cuser_id = location?.state?.data?.id !== undefined ? location.state.data.id : id_user;

  const fetchNewReturns = () => {
    axios
      .get(BACKEND_URL + `/return/get_filtered_returns?page=1&per_page=100&user_id=${cuser_id}`)
      .then(async (resp) => {
        if (resp.status === 200) {
          dispatch(setAllReturns(resp?.data || []));
          resData = resp.data;
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

  useEffect(() => {
    const checkKycStatus = () => {
      if (localStorage.getItem('is_kyc') == 1) {
        toast('Complete Your KYC First', { type: 'error' });
        navigate('/seller/home');
        return true;
      } else if (localStorage.getItem('is_kyc') == 2) {
        toast('KYC Verification Is Pending.', { type: 'error' });
        navigate('/seller/home');
        return true;
      }
      return false;
    };

    if (localStorage.getItem('is_company') == 1 && !flag) {
      navigate('/all-users');
      return;
    }

    if (!checkKycStatus() && !allReturnsList) {
      if (!hasFetched.current) {
        fetchNewReturns();
        hasFetched.current = true;
      }
    } else {
      setIsLoading(false);
    }
  }, [allReturnsList, flag]);

  return (
    <PageWithSidebar>
      {isLoading && <Loader />}
      <div className="h-full w-full bg-[#f4f4f4] px-4 text-center">
        <div className="flex items-center justify-between px-1.5 pb-3 pt-4">
          <h1 className="text-xl font-bold">Returns</h1>
          <button
            className="rounded-sm bg-[#eeebff] px-2.5 py-1.5 text-sm font-medium text-orange-600"
            onClick={() => navigate('/add-return')}
          >
            + Add Return
          </button>
        </div>
        <div>
          <Tabs tabs={returnsTabs} tabClassNames="mr-6 px-3 py-3.5 text-[#7f7f7f] font-medium" />
        </div>
      </div>
    </PageWithSidebar>
  );
};

export default Returns;
