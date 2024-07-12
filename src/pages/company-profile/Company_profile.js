import { Link } from 'react-router-dom';
import PageWithSidebar from '../../common/components/page-with-sidebar/PageWithSidebar';
import { useEffect, useState } from 'react';
import { faSave } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { toast } from 'react-toastify';
import axios from 'axios';
import { BACKEND_URL } from '../../common/utils/env.config';

const Company_profile = () => {
  const [data, setData] = useState(null);
  // This is a dummy data, you can replace it with your own data
  const [companyDetails, setCompanyDetails] = useState({
    companyId:
      sessionStorage.getItem('company_id') != 'undefined' ? sessionStorage.getItem('company_id') : '12345678',
    companyName: '',
    website: '',
    email: '',
    logo: '',
  });

  // This function is used to handle the file change and show the image in place of the input
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setCompanyDetails({ ...companyDetails, logo: e.target.result });
      };
      reader.readAsDataURL(file);
    }
  };

  // This function is used to handle the form submit
  const handleSumbit = () => {
    // You can use this data to send to the server
    // if(sessionStorage.getItem('is_company') == 0){
    //   toast("User Can't See Company Data",{type:'error'})
    //   return;
    // }

    console.log(companyDetails); //eslint-disable-line
    axios
      .put(
        BACKEND_URL +
          `/company/update_company?company_id=${
            companyDetails?.companyId
          }&company_name=${companyDetails?.companyName.toString()}`,
      )
      .then((res) => {
        console.log('Info', res.data);
        toast('Company Info Saved', { type: 'success' });
      })
      .catch((err) => {
        toast('Error in Saving Info', { type: 'error' });
      });
  };

  const handleData = () => {
    // if(sessionStorage.getItem('is_company') == 0){
    //   toast("User Can't See Company Data",{type:'error'})
    //   return;
    // }

    axios
      .get(BACKEND_URL + `/company/${sessionStorage.getItem('company_id')}`)
      .then((res) => {
        console.log('Company Data ', res.data);
        // setData(res.data)
        setCompanyDetails({
          ...companyDetails,
          companyName: res.data.name,
          // website: res.data.website,
          email: res.data.email,
          // logo: res.data.logo
        });
        sessionStorage.setItem('user_name', res.data.name);
      })
      .catch((err) => {
        toast('error in fetching data', { type: 'error' });
      });
  };

  useEffect(() => {
    handleData();
    sessionStorage.getItem('user_name');
  }, []);

  return (
    <PageWithSidebar>
      <div className="header mx-2 border-b border-[#b3b3b3] bg-[#FAFBFC] p-2 text-xl">
        Settings-Company Profile
      </div>
      <div className="mx-2 w-full bg-[#EDEDED] px-6 pb-16">
        <div className="pb-5 pt-2 font-bold text-[#656565]">
          <Link to={'/settings'} className="font-semibold text-green-500">
            Settings
          </Link>{' '}
          &gt; Company &gt; Company Profile
        </div>
        <div className="flex flex-col gap-4 bg-white p-4">
          <div className="text-lg font-bold text-[#656565]">Company Details</div>
          <div className="flex min-h-72 w-full flex-col gap-5 border px-3 py-5 text-[12px] font-bold text-[#666666]">
            <div className="flex w-1/2 flex-col items-start justify-start gap-2">
              <label htmlFor="company_ID">
                Company ID <span className="text-[16px] font-bold text-red-500">*</span>
              </label>
              <input
                type="text"
                id="company_ID"
                name="company_ID"
                className="h-7 w-full cursor-not-allowed rounded-sm border border-[#b3b3b3] bg-[#DDDDDD] p-2 text-[12px] font-normal focus:border-[#b3b3b3] focus:ring-0"
                value={companyDetails.companyId}
                readOnly
              />
            </div>
            <div className="flex w-1/2 flex-col items-start justify-start gap-2">
              <label htmlFor="company_name">
                Company Name <span className="text-[16px] font-bold text-red-500">*</span>
              </label>
              <input
                type="text"
                id="company_name"
                name="company_name"
                className="h-7 w-full rounded-sm border border-[#b3b3b3] bg-white p-2 text-[12px] font-normal focus:border-green-400 focus:ring-0"
                value={companyDetails.companyName}
                onChange={(e) => {
                  setCompanyDetails({ ...companyDetails, companyName: e.target.value });
                }}
              />
            </div>
            <div className="flex w-1/2 flex-col items-start justify-start gap-2">
              <label htmlFor="website">WebSite</label>
              <input
                type="url"
                placeholder="https://www.example.com"
                id="website"
                name="website"
                className="h-7 w-full rounded-sm border border-[#b3b3b3] bg-white p-2 text-[12px] font-normal focus:border-green-400 focus:ring-0"
                value={companyDetails.website}
                onChange={(e) => {
                  setCompanyDetails({ ...companyDetails, website: e.target.value });
                }}
              />
            </div>
            <div className="flex w-1/2 flex-col items-start justify-start gap-2">
              <label htmlFor="email">
                Email <span className="text-[16px] font-bold text-red-500">*</span>
              </label>
              <input
                type="email"
                id="email"
                name="email"
                className="h-7 w-full cursor-not-allowed rounded-sm border border-[#b3b3b3] bg-[#DDDDDD] p-2 text-[12px] font-normal focus:border-[#b3b3b3] focus:ring-0"
                value={companyDetails.email}
                // onChange={(e) => {
                //   setCompanyDetails({ ...companyDetails, email: e.target.value });
                // }}
                readOnly
              />
            </div>
          </div>
          <div>
            <button
              className="flex h-8 w-28 items-center gap-4 rounded bg-sky-500 text-white"
              onClick={() => {
                handleSumbit();
              }}>
              <div className="flex h-8 w-2/5 items-center justify-center rounded-l bg-sky-600">
                <FontAwesomeIcon icon={faSave} />
              </div>
              <div>Save</div>
            </button>
          </div>
        </div>
      </div>
    </PageWithSidebar>
  );
};

export default Company_profile;
