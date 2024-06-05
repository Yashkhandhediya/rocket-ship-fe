import { Link } from 'react-router-dom';
import PageWithSidebar from '../../common/components/page-with-sidebar/PageWithSidebar';
import { useEffect, useState } from 'react';
import axios from 'axios';

const Change_password = () => {
  // This is a dummy data, you can replace it with your own data
  const [password, setPassword] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });

  const id_user = localStorage.getItem('user_id');
  const id_company = localStorage.getItem('company_id');

  const [passwordChanged, setPasswordChanged] = useState('');

  // This function is used to handle the form submit
  const handleSumbit = async () => {
    // You can use this data to send to the server
    const response = await axios.get(
      `https://myrcc.in:8050/login/password_change?old_password=${password.currentPassword}&user_id=${id_user}&new_password=${password.newPassword}`,
    );
    setPasswordChanged(response.data.massage);
    console.log(password); //eslint-disable-line
  };

  return (
    <PageWithSidebar>
      <div className="header mx-2 border-b border-[#b3b3b3] bg-[#FAFBFC] p-2 text-xl">
        Settings-Change Your Password
      </div>
      <div className="mx-2 w-full bg-[#EDEDED] px-6 pb-16">
        <div className="pb-5 pt-2 font-bold text-[#656565]">
          <Link to={'/settings'} className="font-semibold text-green-500">
            Settings
          </Link>{' '}
          &gt; Company &gt; Change Password
        </div>
        {passwordChanged && <p className="w-96 bg-red-100 p-2 text-red-800"> {passwordChanged}</p>}
        <div className="flex min-h-72 w-full flex-row items-center justify-center gap-5 px-3 py-5 text-[12px] font-bold text-[#666666]">
          <div className="flex flex-col items-end gap-4">
            <div className="flex h-9 items-center">Current Password</div>
            <div className="flex h-9 items-center">New Password</div>
            <div className="flex h-9 items-center">Confirm Password</div>
          </div>
          <div className="flex w-[33%] flex-col items-start gap-4">
            <input
              type="password"
              className="h-9 w-full rounded-[4px] border border-[#cccccc] bg-white p-2 text-[12px] font-normal focus:border-green-400 focus:ring-0"
              value={password.currentPassword}
              onChange={(e) => {
                setPassword({ ...password, currentPassword: e.target.value });
              }}
            />
            <input
              type="password"
              value={password.newPassword}
              className="h-9 w-full rounded-[4px] border border-[#cccccc] bg-white p-2 text-[12px] font-normal focus:border-green-400 focus:ring-0"
              onChange={(e) => {
                setPassword({ ...password, newPassword: e.target.value });
              }}
            />
            <input
              type="password"
              value={password.confirmPassword}
              className="h-9 w-full rounded-[4px] border border-[#cccccc] bg-white p-2 text-[12px] font-normal focus:border-green-400 focus:ring-0"
              onChange={(e) => {
                setPassword({ ...password, confirmPassword: e.target.value });
              }}
            />
          </div>
        </div>
        <div className="flex items-center justify-center">
          <button
            className="flex h-8 w-20 items-center justify-center gap-4 rounded bg-[#B07828] text-white"
            onClick={() => {
              handleSumbit();
            }}>
            Sumbit
          </button>
        </div>
      </div>
    </PageWithSidebar>
  );
};

export default Change_password;
