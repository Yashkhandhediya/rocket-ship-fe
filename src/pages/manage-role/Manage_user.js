import { Link, useNavigate } from 'react-router-dom';
import PageWithSidebar from '../../common/components/page-with-sidebar/PageWithSidebar';
import { useEffect, useState } from 'react';
import { faSave } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { toast } from 'react-toastify';
import { BACKEND_URL } from '../../common/utils/env.config';
import UserDataInfo from './UserDataInfo';
import apiClient from '../../common/utils/apiClient';

const Manage_user = () => {
  const [data, setData] = useState([]);
  const navigate = useNavigate();

  const handleData = () => {
    apiClient
      .get(BACKEND_URL + `/roleuser/created_user_roles?created_by=${localStorage.getItem('company_id')}`)
      .then((res) => {
        console.log('Response User Data', res.data);
        setData(res.data);
      })
      .catch((err) => {
        console.log('Error in Data Fetch', err);
      });
  };

  useEffect(() => {
    handleData();
  }, []);

  return (
    <PageWithSidebar>
      <div className="header mx-2 border-b border-[#b3b3b3] bg-[#FAFBFC] p-2 text-xl">
        Settings-Manage Users
      </div>
      <div className="mx-2 w-full bg-[#EDEDED] px-6 pb-16">
        <div className="pb-5 pt-2 font-bold text-[#656565]">
          <Link to={'/settings'} className="font-semibold text-green-500">
            Settings
          </Link>{' '}
          &gt; User Role Management &gt; Manage Users
        </div>
        <div className="flex flex-col gap-4 bg-white p-4">
          <div className="text-lg font-bold text-[#656565]">Manage Users</div>
          <div className="border-b border-gray-200"></div>
          <div className="-mt-3 text-[10px]">
            A seller can create, update and disable users using user management setting. You can update the
            modules by editing the users using this screen
          </div>

          <div className="float-right flex justify-end">
            <button
              type="button"
              className="flex justify-end rounded bg-[#27c24c] px-3 py-1.5 text-white shadow hover:bg-green-700"
              onClick={() => navigate('/user-management')}>
              <span className="mr-4">
                <i className="fa fa-plus-square" aria-hidden="true"></i>
              </span>
              Add a User Account
            </button>
          </div>

          <div className="flex min-h-72 w-full flex-col font-bold">
            <div className="flex flex-col">
              <div className="m-1 my-2 ms-2 flex items-center justify-between border-b bg-gray-50 p-4 text-[12px] text-[#666666] shadow-sm">
                <div className="flex-1 font-bold">Full Name</div>
                <div className="flex-1 text-justify font-bold">Email Id</div>
                <div className="flex-1 text-center font-bold">Modules</div>
                <div className="flex-1 text-center font-bold">Status</div>
                <div className="flex-1 text-center font-bold">Last Login</div>
                <div className="flex-1 text-center font-bold">PII Allowed</div>
                <div className="flex-1 text-center font-bold">Edit Access</div>
              </div>

              {data.length > 0 &&
                data.map((item) => {
                  return (
                    <UserDataInfo
                      key={item?.user?.id}
                      userName={item?.user?.name}
                      userEmail={item?.user?.email}
                      module={item?.module}
                      userStatus={item?.user?.show_info}
                      LastLogin="NA"
                      PII="No"
                      data={item?.module}
                      info={item}
                    />
                  );
                })}
            </div>
          </div>
        </div>
      </div>
    </PageWithSidebar>
  );
};

export default Manage_user;
