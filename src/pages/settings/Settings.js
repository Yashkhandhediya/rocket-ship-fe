import { Link } from "react-router-dom"
import PageWithSidebar from "../../common/components/page-with-sidebar/PageWithSidebar"
import { settings_modules } from "../manage-role/user-management/constants"

const Settings = () => {
  let settings = []

  const mapModuleToLink = (module) => ({
    title: module.label,
    items: module.items,
    icon: module.icon,
  });

  const setting_module = localStorage.getItem('setting_modules')
  if(setting_module == null || setting_module?.length == 0){
  settings = 
  [
    {
      title: 'Company Profile',
      items: [
        {
          title: 'Company Profile',
          link: '/company-general-details'
        },
        {
          title: 'KYC',
          link: '/seller/kyc'
        },
        {
          title: 'Change Password',
          link: '/change-password'
        }
      ],
      icon: <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="#B07828" className="w-6 h-6">
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 21h19.5m-18-18v18m10.5-18v18m6-13.5V21M6.75 6.75h.75m-.75 3h.75m-.75 3h.75m3-6h.75m-.75 3h.75m-.75 3h.75M6.75 21v-3.375c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21M3 3h12m-.75 4.5H21m-3.75 3.75h.008v.008h-.008v-.008Zm0 3h.008v.008h-.008v-.008Zm0 3h.008v.008h-.008v-.008Z" />
      </svg>
    },
    {
      title: 'Pickup Address',
      items: [
        {
          title: 'Manage Pickup Address',
          link: '/company-pickup-location'
        }
      ],
      icon: <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="#B07828" className="w-6 h-6">
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
      </svg>
    },
    {
      title: 'COD Payments',
      items: [
        {
          title: 'Bank Details',
          link: '/company-bank-details'
        },
        {
          title: 'Early COD',
          link: '/'
        },
        {
          title: 'Postpaid',
          link: '/'
        }
      ],
      icon: <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="#B07828" className="w-6 h-6">
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18.75a60.07 60.07 0 0 1 15.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 0 1 3 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 0 0-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 0 1-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 0 0 3 15h-.75M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm3 0h.008v.008H18V10.5Zm-12 0h.008v.008H6V10.5Z" />
      </svg>
    },
    {
      title: 'Billing',
      items: [
        {
          title: 'GSTIN Invoice',
          link: '/'
        },
        {
          title: 'Billing Address',
          link: '/'
        }
      ],
      icon: <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="#B07828" className="w-6 h-6">
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 0 0 2.25-2.25V6.75A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25v10.5A2.25 2.25 0 0 0 4.5 19.5Z" />
      </svg>

    },
    {
      title: 'Courier',
      items: [
        {
          title: 'Courier Priority',
          link: '/'
        },
        {
          title: 'Courier Selection',
          link: '/'
        },
        {
          title: 'Courier Rules',
          link: '/'
        }
      ],
      icon: <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="#B07828" className="w-6 h-6">
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 21h19.5m-18-18v18m10.5-18v18m6-13.5V21M6.75 6.75h.75m-.75 3h.75m-.75 3h.75m3-6h.75m-.75 3h.75m-.75 3h.75M6.75 21v-3.375c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21M3 3h12m-.75 4.5H21m-3.75 3.75h.008v.008h-.008v-.008Zm0 3h.008v.008h-.008v-.008Zm0 3h.008v.008h-.008v-.008Z" />
      </svg>
    },
    {
      title: 'Label Invoice & POD',
      items: [
        {
          title: 'Label Preferences',
          link: '/'
        },
        {
          title: 'Invoice Preferences',
          link: '/'
        },
        {
          title: 'Proof of Delivery (POD)',
          link: '/'
        }
      ],
      icon: <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="#B07828" className="w-6 h-6">
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 21h19.5m-18-18v18m10.5-18v18m6-13.5V21M6.75 6.75h.75m-.75 3h.75m-.75 3h.75m3-6h.75m-.75 3h.75m-.75 3h.75M6.75 21v-3.375c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21M3 3h12m-.75 4.5H21m-3.75 3.75h.008v.008h-.008v-.008Zm0 3h.008v.008h-.008v-.008Zm0 3h.008v.008h-.008v-.008Z" />
      </svg>
    },
    {
      title: 'Notifications',
      items: [
        {
          title: 'Buyers Communication',
          link: '/'
        },
        {
          title: 'Seller Notifications',
          link: '/'
        }
      ],
      icon: <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="#B07828" className="w-6 h-6">
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 21h19.5m-18-18v18m10.5-18v18m6-13.5V21M6.75 6.75h.75m-.75 3h.75m-.75 3h.75m3-6h.75m-.75 3h.75m-.75 3h.75M6.75 21v-3.375c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21M3 3h12m-.75 4.5H21m-3.75 3.75h.008v.008h-.008v-.008Zm0 3h.008v.008h-.008v-.008Zm0 3h.008v.008h-.008v-.008Z" />
      </svg>
    },
    {
      title: 'Shipment Features',
      items: [
        {
          title: 'Split Shipment',
          link: '/'
        },
        {
          title: 'COD to Prepaid',
          link: '/'
        },
        {
          title: 'Order Verification',
          link: '/'
        },
        {
          title: 'Secure Shipment',
          link: '/'
        },
        {
          title: 'Activate Direct Ship',
          link: '/'
        },
        {
          title: 'RTO Score',
          link: '/'
        },
        {
          title: 'Delivery Boost',
          link: '/'
        },
      ],
      icon: <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="#B07828" className="w-6 h-6">
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 21h19.5m-18-18v18m10.5-18v18m6-13.5V21M6.75 6.75h.75m-.75 3h.75m-.75 3h.75m3-6h.75m-.75 3h.75m-.75 3h.75M6.75 21v-3.375c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21M3 3h12m-.75 4.5H21m-3.75 3.75h.008v.008h-.008v-.008Zm0 3h.008v.008h-.008v-.008Zm0 3h.008v.008h-.008v-.008Z" />
      </svg>
    },
    {
      title: 'International Settings',
      items: [
        {
          title: 'KYC International',
          link: '/'
        },
        {
          title: 'International Order Preference',
          link: '/'
        }
      ],
      icon: <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="#B07828" className="w-6 h-6">
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 21h19.5m-18-18v18m10.5-18v18m6-13.5V21M6.75 6.75h.75m-.75 3h.75m-.75 3h.75m3-6h.75m-.75 3h.75m-.75 3h.75M6.75 21v-3.375c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21M3 3h12m-.75 4.5H21m-3.75 3.75h.008v.008h-.008v-.008Zm0 3h.008v.008h-.008v-.008Zm0 3h.008v.008h-.008v-.008Z" />
      </svg>
    },
    {
      title: 'User Role Management',
      items: [
        {
          title: 'Manage Users',
          link: '/manage-user'
        }
      ],
      icon: <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="#B07828" className="w-6 h-6">
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 21h19.5m-18-18v18m10.5-18v18m6-13.5V21M6.75 6.75h.75m-.75 3h.75m-.75 3h.75m3-6h.75m-.75 3h.75m-.75 3h.75M6.75 21v-3.375c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21M3 3h12m-.75 4.5H21m-3.75 3.75h.008v.008h-.008v-.008Zm0 3h.008v.008h-.008v-.008Zm0 3h.008v.008h-.008v-.008Z" />
      </svg>
    },
    {
      title: 'Tracking Page',
      items: [
        {
          title: 'Page Settings',
          link: '/'
        },
        {
          title: 'Themes',
          link: '/'
        },
        {
          title: 'Promotional Banners',
          link: '/'
        },
        {
          title: 'Product Recommendation',
          link: '/'
        },
        {
          title: 'Header Links',
          link: '/'
        },
        {
          title: 'NPS Report',
          link: '/'
        },
        {
          title: 'Tracking Script',
          link: '/'
        }
      ],
      icon: <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="#B07828" className="w-6 h-6">
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 21h19.5m-18-18v18m10.5-18v18m6-13.5V21M6.75 6.75h.75m-.75 3h.75m-.75 3h.75m3-6h.75m-.75 3h.75m-.75 3h.75M6.75 21v-3.375c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21M3 3h12m-.75 4.5H21m-3.75 3.75h.008v.008h-.008v-.008Zm0 3h.008v.008h-.008v-.008Zm0 3h.008v.008h-.008v-.008Z" />
      </svg>
    },
    {
      title: 'Return',
      items: [
        {
          title: 'Return Settings',
          link: '/return-settings'
        },
        {
          title: 'Refund Settings',
          link: '/refund-settings'
        }
      ],
      icon: <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="#B07828" className="w-6 h-6">
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 21h19.5m-18-18v18m10.5-18v18m6-13.5V21M6.75 6.75h.75m-.75 3h.75m-.75 3h.75m3-6h.75m-.75 3h.75m-.75 3h.75M6.75 21v-3.375c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21M3 3h12m-.75 4.5H21m-3.75 3.75h.008v.008h-.008v-.008Zm0 3h.008v.008h-.008v-.008Zm0 3h.008v.008h-.008v-.008Z" />
      </svg>
    },
    {
      title: 'API',
      items: [
        {
          title: 'Configure',
          link: '/configure-api'
        },
        {
          title: 'Webhooks',
          link: '/webhooks'
        }
      ],
      icon: <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="#B07828" className="w-6 h-6">
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 21h19.5m-18-18v18m10.5-18v18m6-13.5V21M6.75 6.75h.75m-.75 3h.75m-.75 3h.75m3-6h.75m-.75 3h.75m-.75 3h.75M6.75 21v-3.375c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21M3 3h12m-.75 4.5H21m-3.75 3.75h.008v.008h-.008v-.008Zm0 3h.008v.008h-.008v-.008Zm0 3h.008v.008h-.008v-.008Z" />
      </svg>
    },
  ]
}else{
  settings = settings_modules
  .filter((module) => setting_module?.includes(module.id))
  .map((module) => mapModuleToLink(module))
  .filter((link) => link !== null);
}
  return (
    <PageWithSidebar>
      <div className="header bg-[#FAFBFC] border-b border-[#b3b3b3] p-2 text-xl mx-2">Settings</div>
      <div className="bg-[#EDEDED] w-full pt-6 px-6 mx-2">
        <div className="bg-white flex flex-wrap gap-4 rounded-lg p-4">
          {/* Company Profile */}
          {settings.map((setting, index) => (
            <div key={index} className="flex w-full lg:w-[24%] flex-col border rounded-lg px-3 py-5 gap-5 min-h-72">
              <div className="card-heading flex flex-row items-center text-[16px] text-[#666666] font-medium gap-5">
                {setting.icon}
                {setting.title}
              </div>
              <div className="flex flex-col w-full gap-3">
                {setting.items.map((item, index) => (
                  <Link key={index} to={item.link} className="text-green-500 w-4/5 text-[12px] ml-[14%] flex flex-row justify-between items-center">
                    {item.title}
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-3 h-3">
                      <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
                    </svg>
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </PageWithSidebar>
  )
}

export default Settings
