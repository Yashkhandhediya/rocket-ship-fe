import { Link } from "react-router-dom";
import PageWithSidebar from "../../common/components/page-with-sidebar/PageWithSidebar"
import { useState } from "react";

const Change_password = () => {
  // This is a dummy data, you can replace it with your own data
  const [password, setPassword] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  })

  // This function is used to handle the form submit
  const handleSumbit = () => {
    // You can use this data to send to the server
    console.log(password); //eslint-disable-line
  }
  return (
    <PageWithSidebar>
      <div className="header bg-[#FAFBFC] border-b border-[#b3b3b3] p-2 text-xl mx-2">Settings-Change Your Password</div>
      <div className="bg-[#EDEDED] w-full px-6 pb-16 mx-2">
        <div className="pt-2 pb-5 text-[#656565] font-bold">
          <Link to={'/settings'} className="text-green-500 font-semibold">Settings</Link> &gt; Company &gt; Change Password
        </div>
        <div className="flex w-full flex-row items-center justify-center text-[#666666] text-[12px] font-bold px-3 py-5 gap-5 min-h-72">
          <div className="flex flex-col gap-4 items-end">
            <div className="h-9 flex items-center">Current Password</div>
            <div className="h-9 flex items-center">New Password</div>
            <div className="h-9 flex items-center">Confirm Password</div>
          </div>
          <div className="flex flex-col gap-4 items-start w-[33%]">
            <input
              type="password"
              className="border border-[#cccccc] rounded-[4px] text-[12px] font-normal p-2 w-full h-9 bg-white focus:ring-0 focus:border-green-400"
              value={password.currentPassword}
              onChange={(e) => { setPassword({ ...password, currentPassword: e.target.value }) }}
            />
            <input
              type="password"
              value={password.newPassword}
              className="border border-[#cccccc] rounded-[4px] text-[12px] font-normal p-2 w-full h-9 bg-white focus:ring-0 focus:border-green-400"
              onChange={(e) => { setPassword({ ...password, newPassword: e.target.value }) }}
            />
            <input
              type="password"
              value={password.confirmPassword}
              className="border border-[#cccccc] rounded-[4px] text-[12px] font-normal p-2 w-full h-9 bg-white focus:ring-0 focus:border-green-400"
              onChange={(e) => { setPassword({ ...password, confirmPassword: e.target.value }) }}
            />
          </div>
        </div>
        <div className="flex items-center justify-center">
          <button className="rounded flex w-20 gap-4 h-8 items-center justify-center text-white bg-[#B07828]"
            onClick={() => {
              handleSumbit();
            }}>
            Sumbit
          </button>
        </div>
      </div>
    </PageWithSidebar>
  )
}

export default Change_password
