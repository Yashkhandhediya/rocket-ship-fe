import { icon } from "@fortawesome/fontawesome-svg-core"
import { 
    bill,
    book,
    dashboard,
    help,
    home,
    homeActive,
    manage,
    order,
    settings,
    tool,
    user,
    weight,
    return1,
    boost,
    newHome,
 } from "../../../common/icons/sidebar-icons"

const personalInfo = [
    {label:"Yes",value:"Yes"},
    {label:"No",value:"No"}
]

const modules = [
    {id:1,label:"Orders",value:"Orders",icon:order,url:'/orders'},
    {id:2,label:"Returns",value:"Returns",icon:return1,url:'/returns'},
    {id:3,label:"Billing",value:"Billing",icon:bill,url:'/statement'},
    {id:4,label:"Tools",value:"Tools",icon:tool,url:'/rate-calculator'},
    {id:5,label:"Settings",value:"Settings",icon:settings,url:'/settings'},
    {id:6,label:"Weight",value:"Weight",icon:weight,url:'/billing-charge-details?page=1&perPage=15&to=&from=&status=0&search=&courier_id='},
    {id:7,label:"Dashboard",value:"Dashboard",icon:dashboard,url:'/dashboard'},
    {id:8,label:"Homepage",value:"Homepage",icon:newHome,url:'/seller/home'},
    {id:9,label:"Process ndr",value:"Process ndr",icon:book,url:'/book'},
    {id:10,label:"Buyer Experience",value:"Buyer Experience",icon:manage,url:'/dashboard'},
    {id:11,label:"Support",value:"Support",icon:help,url:'/dashboard'},
    {id:12,label:"Manage Channel",value:"Manage Channel",icon:manage,url:'/channels'},
    {id:13,label:"Manage Catalog",value:"Manage Catalog",icon:manage,url:'/catalogue'},
    {id:14,label:"Manage Couriers",value:"Manage Couriers",icon:manage,url:'/user-couriers'},
    {id:15,label:"Manage Packaging",value:"Manage Packaging",icon:manage,url:'/dashboard'},
    {id:16,label:"Manage Customers",value:"Manage Customers",icon:manage,url:'/customers'},
    {id:17,label:"Ondc",value:"Ondc",icon:boost,url:'/seller/home'},
]

const settings_modules = [
    {id:18,label:"Company",value:"Company",items:[ {
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
      }],
    icon:<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="#B07828" className="w-6 h-6">
    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 21h19.5m-18-18v18m10.5-18v18m6-13.5V21M6.75 6.75h.75m-.75 3h.75m-.75 3h.75m3-6h.75m-.75 3h.75m-.75 3h.75M6.75 21v-3.375c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21M3 3h12m-.75 4.5H21m-3.75 3.75h.008v.008h-.008v-.008Zm0 3h.008v.008h-.008v-.008Zm0 3h.008v.008h-.008v-.008Z" />
  </svg>},
    {id:19,label:"Pickup Address",value:"Pickup Address",items:[  {
        title: 'Manage Pickup Address',
        link: '/company-pickup-location'
      }],
    icon:<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="#B07828" className="w-6 h-6">
    <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
  </svg>},
    {id:20,label:"Cod Payments",value:"Cod Payments",items:[  {
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
      }],
    icon:<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="#B07828" className="w-6 h-6">
    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18.75a60.07 60.07 0 0 1 15.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 0 1 3 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 0 0-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 0 1-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 0 0 3 15h-.75M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm3 0h.008v.008H18V10.5Zm-12 0h.008v.008H6V10.5Z" />
  </svg>},
    {id:21,label:"Billing",value:"Billing",items:[ {
        title: 'GSTIN Invoice',
        link: '/'
      },
      {
        title: 'Billing Address',
        link: '/'
      }],
      icon:<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="#B07828" className="w-6 h-6">
      <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 0 0 2.25-2.25V6.75A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25v10.5A2.25 2.25 0 0 0 4.5 19.5Z" />
    </svg>},
    {id:22,label:"Courier",value:"Courier",items:[ {
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
      }],
    icon:<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="#B07828" className="w-6 h-6">
    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 21h19.5m-18-18v18m10.5-18v18m6-13.5V21M6.75 6.75h.75m-.75 3h.75m-.75 3h.75m3-6h.75m-.75 3h.75m-.75 3h.75M6.75 21v-3.375c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21M3 3h12m-.75 4.5H21m-3.75 3.75h.008v.008h-.008v-.008Zm0 3h.008v.008h-.008v-.008Zm0 3h.008v.008h-.008v-.008Z" />
  </svg>},
    {id:23,label:"Label Invoice POD",value:"Label Invoice POD",items:[ {
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
      }],
    icon: <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="#B07828" className="w-6 h-6">
    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 21h19.5m-18-18v18m10.5-18v18m6-13.5V21M6.75 6.75h.75m-.75 3h.75m-.75 3h.75m3-6h.75m-.75 3h.75m-.75 3h.75M6.75 21v-3.375c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21M3 3h12m-.75 4.5H21m-3.75 3.75h.008v.008h-.008v-.008Zm0 3h.008v.008h-.008v-.008Zm0 3h.008v.008h-.008v-.008Z" />
  </svg>},
    {id:24,label:"Notifications",value:"Notifications",items:[{
        title: 'Buyers Communication',
        link: '/'
      },
      {
        title: 'Seller Notifications',
        link: '/'
      }],
    icon:<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="#B07828" className="w-6 h-6">
    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 21h19.5m-18-18v18m10.5-18v18m6-13.5V21M6.75 6.75h.75m-.75 3h.75m-.75 3h.75m3-6h.75m-.75 3h.75m-.75 3h.75M6.75 21v-3.375c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21M3 3h12m-.75 4.5H21m-3.75 3.75h.008v.008h-.008v-.008Zm0 3h.008v.008h-.008v-.008Zm0 3h.008v.008h-.008v-.008Z" />
  </svg>},
    {id:25,label:"Shipment Feature Others",value:"Shipment Feature Others",items:[ {
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
      }],
    icon:<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="#B07828" className="w-6 h-6">
    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 21h19.5m-18-18v18m10.5-18v18m6-13.5V21M6.75 6.75h.75m-.75 3h.75m-.75 3h.75m3-6h.75m-.75 3h.75m-.75 3h.75M6.75 21v-3.375c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21M3 3h12m-.75 4.5H21m-3.75 3.75h.008v.008h-.008v-.008Zm0 3h.008v.008h-.008v-.008Zm0 3h.008v.008h-.008v-.008Z" />
  </svg>},
    {id:26,label:"Tracking Page",value:"Tracking Page",items:[  {
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
      } ],
    icon:<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="#B07828" className="w-6 h-6">
    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 21h19.5m-18-18v18m10.5-18v18m6-13.5V21M6.75 6.75h.75m-.75 3h.75m-.75 3h.75m3-6h.75m-.75 3h.75m-.75 3h.75M6.75 21v-3.375c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21M3 3h12m-.75 4.5H21m-3.75 3.75h.008v.008h-.008v-.008Zm0 3h.008v.008h-.008v-.008Zm0 3h.008v.008h-.008v-.008Z" />
  </svg>},
    {id:27,label:"Returns",value:"Returns",items:[ {
        title: 'Return Settings',
        link: '/return-settings'
      },
      {
        title: 'Refund Settings',
        link: '/refund-settings'
      }],
    icon:<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="#B07828" className="w-6 h-6">
    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 21h19.5m-18-18v18m10.5-18v18m6-13.5V21M6.75 6.75h.75m-.75 3h.75m-.75 3h.75m3-6h.75m-.75 3h.75m-.75 3h.75M6.75 21v-3.375c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21M3 3h12m-.75 4.5H21m-3.75 3.75h.008v.008h-.008v-.008Zm0 3h.008v.008h-.008v-.008Zm0 3h.008v.008h-.008v-.008Z" />
  </svg>},
    {id:28,label:"API",value:"API",items:[{
        title: 'Configure',
        link: '/configure-api'
      },
      {
        title: 'Webhooks',
        link: '/webhooks'
      }],
    icon:<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="#B07828" className="w-6 h-6">
    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 21h19.5m-18-18v18m10.5-18v18m6-13.5V21M6.75 6.75h.75m-.75 3h.75m-.75 3h.75m3-6h.75m-.75 3h.75m-.75 3h.75M6.75 21v-3.375c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21M3 3h12m-.75 4.5H21m-3.75 3.75h.008v.008h-.008v-.008Zm0 3h.008v.008h-.008v-.008Zm0 3h.008v.008h-.008v-.008Z" />
  </svg>},
    {id:29,label:"International Settings",value:"International Settings",items:[{
        title: 'KYC International',
        link: '/'
      },
      {
        title: 'International Order Preference',
        link: '/'
      }],
    icon:<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="#B07828" className="w-6 h-6">
    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 21h19.5m-18-18v18m10.5-18v18m6-13.5V21M6.75 6.75h.75m-.75 3h.75m-.75 3h.75m3-6h.75m-.75 3h.75m-.75 3h.75M6.75 21v-3.375c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21M3 3h12m-.75 4.5H21m-3.75 3.75h.008v.008h-.008v-.008Zm0 3h.008v.008h-.008v-.008Zm0 3h.008v.008h-.008v-.008Z" />
  </svg>},
]


export {
    personalInfo,
    modules,
    settings_modules
}