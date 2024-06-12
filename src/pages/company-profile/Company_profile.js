import { Link } from "react-router-dom";
import PageWithSidebar from "../../common/components/page-with-sidebar/PageWithSidebar"
import { useEffect, useState } from "react";
import { faSave } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { toast } from "react-toastify";
import axios from "axios";
import { BACKEND_URL } from "../../common/utils/env.config";



const Company_profile = () => {
  const [data,setData] = useState(null)
  // This is a dummy data, you can replace it with your own data
  const [companyDetails, setCompanyDetails] = useState({
    companyId: localStorage.getItem('company_id') != 'undefined' ? localStorage.getItem('company_id') : '12345678',
    companyName: '',
    website: '',
    email: '',
    logo: ''
  })

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
    // if(localStorage.getItem('is_company') == 0){
    //   toast("User Can't See Company Data",{type:'error'})
    //   return;
    // }

    console.log(companyDetails); //eslint-disable-line
    axios.put(BACKEND_URL + `/company/update_company?company_id=${companyDetails?.companyId}&company_name=${companyDetails?.companyName.toString()}`
    ).then((res) => {
      console.log("Info",res.data)
      toast("Company Info Saved",{type:'success'})
    }).catch((err) => {
      toast("Error in Saving Info",{type:'error'})
    })
  }

  const handleData = () => {
    // if(localStorage.getItem('is_company') == 0){
    //   toast("User Can't See Company Data",{type:'error'})
    //   return;
    // }

    axios.get(BACKEND_URL + `/company/${localStorage.getItem('company_id')}`)
    .then((res) => {
      console.log("Company Data ",res.data)
      // setData(res.data)
      setCompanyDetails({
        ...companyDetails,
        companyName: res.data.name,
        // website: res.data.website,
        email: res.data.email,
        // logo: res.data.logo
      })
    }).catch((err) => {
      toast("error in fetching data",{type:'error'})
    })
  }

  useEffect(() => {
    handleData()
  },[])

  return (
    <PageWithSidebar>
      <div className="header bg-[#FAFBFC] border-b border-[#b3b3b3] p-2 text-xl mx-2">Settings-Company Profile</div>
      <div className="bg-[#EDEDED] w-full px-6 pb-16 mx-2">
        <div className="pt-2 pb-5 text-[#656565] font-bold">
          <Link to={'/settings'} className="text-green-500 font-semibold">Settings</Link> &gt; Company &gt; Company Profile
        </div>
        <div className="bg-white flex flex-col gap-4 p-4">
          <div className="text-[#656565] text-lg font-bold">Company Details</div>
          <div className="flex w-full flex-col border text-[#666666] text-[12px] font-bold px-3 py-5 gap-5 min-h-72">
            <div className="flex flex-col items-start justify-start w-1/2 gap-2">
              <label htmlFor="company_ID">
                Company ID <span className="text-red-500 font-bold text-[16px]">*</span>
              </label>
              <input
                type="text"
                id="company_ID"
                name="company_ID"
                className="border border-[#b3b3b3] rounded-sm text-[12px] font-normal p-2 w-full h-7 bg-[#DDDDDD] focus:ring-0 focus:border-[#b3b3b3] cursor-not-allowed"
                value={companyDetails.companyId}
                readOnly />
            </div>
            <div className="flex flex-col items-start justify-start w-1/2 gap-2">
              <label htmlFor="company_name">
                Company Name <span className="text-red-500 font-bold text-[16px]">*</span>
              </label>
              <input
                type="text"
                id="company_name"
                name="company_name"
                className="border border-[#b3b3b3] rounded-sm text-[12px] font-normal p-2 w-full h-7 bg-white focus:ring-0 focus:border-green-400"
                value={companyDetails.companyName}
                onChange={(e) => {
                  setCompanyDetails({ ...companyDetails, companyName: e.target.value })
                }} />
            </div>
            <div className="flex flex-col items-start justify-start w-1/2 gap-2">
              <label htmlFor="website">
                WebSite
              </label>
              <input
                type="url"
                placeholder="https://www.example.com"
                id="website"
                name="website"
                className="border border-[#b3b3b3] rounded-sm text-[12px] font-normal p-2 w-full h-7 bg-white focus:ring-0 focus:border-green-400"
                value={companyDetails.website}
                onChange={(e) => {
                  setCompanyDetails({ ...companyDetails, website: e.target.value })
                }}
              />
            </div>
            <div className="flex flex-col items-start justify-start w-1/2 gap-2">
              <label htmlFor="email">
                Email <span className="text-red-500 font-bold text-[16px]">*</span>
              </label>
              <input
                type="email"
                id="email"
                name="email"
                className="border border-[#b3b3b3] rounded-sm text-[12px] font-normal p-2 w-full h-7 bg-white focus:ring-0 focus:border-green-400"
                value={companyDetails.email}
                onChange={(e) => {
                  setCompanyDetails({ ...companyDetails, email: e.target.value })
                }}
              />
            </div>
            <div className="flex flex-col items-start justify-start w-1/2 gap-2">
              <label htmlFor="logo" className="text-[12px] font-semibold">
                Website/Company Logo <span className="text-red-500 font-bold text-[16px]">*</span>
              </label>
              <div className="relative">
                {companyDetails.logo ? (
                  <div className="flex bg-gray-200 w-28 h-28 items-center relative justify-between">
                    <span></span>
                    <img src={companyDetails.logo} alt="logo" className="w-20 h-[6.5rem]" />
                    <span className="font-bold p-0 m-0 h-full text-right"
                      onClick={() => setCompanyDetails({ ...companyDetails, logo: '' })}
                      style={{ cursor: 'pointer' }}
                    >
                      x
                    </span>
                  </div>
                ) : (
                  <>
                    <input
                      type="file"
                      id="logo"
                      accept="image/*"
                      name="logo"
                      className="hidden"
                      onChange={handleFileChange}
                    />
                    <label htmlFor="logo" className="shadow cursor-pointer border rounded p-2">
                      <span className="text-green-500 text-xl">+</span>
                    </label>
                  </>
                )}
              </div>
            </div>
          </div>
          <div>
            <button className="rounded flex w-28 gap-4 h-8 items-center text-white bg-[#B07828]"
              onClick={() => {
                handleSumbit();
              }}>
              <div className="bg-[#895d20] rounded-l w-2/5 h-8 flex items-center justify-center" >
                <FontAwesomeIcon icon={faSave} />
              </div>
              <div>Save</div>
            </button>
          </div>
        </div>
      </div>
    </PageWithSidebar>
  )
}

export default Company_profile;
