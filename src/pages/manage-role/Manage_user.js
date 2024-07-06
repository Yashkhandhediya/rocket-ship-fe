import { Link, useNavigate } from "react-router-dom";
import PageWithSidebar from "../../common/components/page-with-sidebar/PageWithSidebar"
import { useEffect, useState } from "react";
import { faSave } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { toast } from "react-toastify";
import axios from "axios";
import { BACKEND_URL } from "../../common/utils/env.config";
import UserDataInfo from './UserDataInfo'



const Manage_user = () => {
  const [data,setData] = useState([])
  const navigate = useNavigate()


  const handleData = () => {
    axios.get(BACKEND_URL + `/roleuser/created_user_roles?created_by=${sessionStorage.getItem('company_id')}`)
    .then((res) => {
      console.log("Response User Data",res.data)
      setData(res.data)
    })
    .catch((err) => {
      console.log("Error in Data Fetch",err)
    })
  }


  useEffect(() => {
    handleData()
  },[])




  return (
    <PageWithSidebar>
      <div className="header bg-[#FAFBFC] border-b border-[#b3b3b3] p-2 text-xl mx-2">Settings-Manage Users</div>
      <div className="bg-[#EDEDED] w-full px-6 pb-16 mx-2">
        <div className="pt-2 pb-5 text-[#656565] font-bold">
          <Link to={'/settings'} className="text-green-500 font-semibold">Settings</Link> &gt; User Role Management &gt; Manage Users
        </div>
        <div className="bg-white flex flex-col gap-4 p-4">
          <div className="text-[#656565] text-lg font-bold">Manage Users</div>
          <div className="border-b border-gray-200"></div>
          <div className="text-[10px] -mt-3">A seller can create, update and disable users using user management setting. You can update the modules by editing the users using this screen</div>
         
          <div className="flex justify-end float-right">
                <button
                    type="button"
                    className="flex justify-end px-3 py-1.5 text-white bg-[#27c24c] hover:bg-green-700 rounded shadow"
                   onClick={() => navigate('/user-management')}
                >
                    <span className="mr-4">
                    <i className="fa fa-plus-square" aria-hidden="true"></i>
                    </span>
                    Add a User Account
                </button>
         </div>


          <div className="flex w-full flex-col font-bold min-h-72">
          <div className="flex flex-col">
            <div className="m-1 my-2 ms-2 flex items-center text-[#666666] text-[12px] justify-between border-b bg-gray-50 p-4 shadow-sm">
              <div className="flex-1 font-bold">Full Name</div>
              <div className="flex-1 text-justify font-bold">Email Id</div>
              <div className="flex-1 text-center font-bold">Modules</div>
              <div className="flex-1 text-center font-bold">Status</div>
              <div className="flex-1 text-center font-bold">Last Login</div>
              <div className="flex-1 text-center font-bold">PII Allowed</div>
              <div className="flex-1 text-center font-bold">Edit Access</div>
            </div>

          {data.length > 0 && data.map((item) => {
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
  )
}

export default Manage_user;
