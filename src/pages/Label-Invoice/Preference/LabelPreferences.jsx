import React, { useState } from 'react';
import PageWithSidebar from '../../../common/components/page-with-sidebar/PageWithSidebar';
import { Link } from 'react-router-dom';
const LabelPreferences = () => {
  const [show, setShow] = useState(false);
  const [selectedCheckbox, setSelectedCheckbox] = useState(null);
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const handleCheckboxChange = (id) => {
    setSelectedCheckbox(selectedCheckbox === id ? null : id);
  };
  const imgs = [
    {
      src: 'https://app.shiprocket.in/app/img/label_2.png?v=1',
      alt: 'label 1',
      title: 'Old Format (Suitable for standard desktop printer)',
      Hover: '',
    },
    {
      src: 'https://app.shiprocket.in/app/img/label_1.png?v=1',
      alt: 'label 2',
      title: 'New Format (Suitable for thermal label printers)',
      hover: 'This format support product summary and can be printed only on single papers',
    },
    {
      src: 'https://app.shiprocket.in/app/img/label_1.png?v=1',
      alt: 'label 3',
      title:
        'New Format (Suitable for thermal label printers along with full product list and price details) dy',
      hover:
        'Depending on the number of the products, the label can have more than one page and can be printed accordingly on multiple pages.',
    },
  ];
  const data = [
    {
      label: ' Display Order value in COD and Prepaid label',
      note: 'Note: For couriers Fedex, Bluedart, Delhivery, Wow, DotZot, Professional, Gati and Shadowfax Order value for COD shipments will be displayed even if this setting is disabled.',
    },
    {
      label: "Display Shipper's Mobile No. and Alternate Mobile No. in Label",
      note: "For couriers Fedex, Ekart and Bluedart Shipper's Mobile No. will be displayed even if this setting is disabled.",
    },
    {
      label: " Display Shipper's Address in Label",
      note: "For courier India Post Shipper's address will be displayed even if this setting is disabled.",
    },
    {
      label: ' Hide Product Name in Label',
      note: 'This setting will only be applicable for XpressBees, Ekart, Delhivery, Bluedart, and Ecom Express shipping labels.',
    },
    {
      label: ' Hide SKU Name in Label',
      note: 'This setting will only be applicable for XpressBees, Ekart, Delhivery, Bluedart, and Ecom Express shipping labels.',
    },
    {
      label: ' Hide Consignee’s Contact Number in Label',
      extra: 'We recommend enabling it to avoid data breach.',
      note: 'This setting will only be applicable for XpressBees, Kerry Indev, DTDC, Delhivery, Bluedart, Udaan and ShadowFax shipping labels.',
    },
    {
      label: ' Display Your Support Number & Email in Label',
      note: ' This setting will apply to all couriers except FedEx and Ekart. Please update your contact details from Postship -> Settings to view your support number and email address on your shipping labels.',
    },
  ];
  return (
    <PageWithSidebar>
      {!show && (
        <div className="header mx-2 border-b border-[#b3b3b3] bg-[#FAFBFC] p-2 text-xl">
          Settings-Label Preferences
        </div>
      )}
      {!show && (
        <div className="mx-2 w-full bg-[#EDEDED] px-6 pb-16">
          <div className="pb-5 pt-2 font-bold text-[#656565]">
            <Link to={'/settings'} className="font-semibold text-green-500">
              Settings
            </Link>{' '}
            &gt; Label, Invoice & POD &gt; Label Preferences
          </div>
          <div className="flex flex-col gap-3 bg-white p-4">
            <div className="pt-6 text-lg font-bold text-[#656565]">Label Settings</div>
            <div className="flex min-h-72 w-full flex-col flex-wrap gap-5 gap-x-7 border px-3 py-5 text-[12px] font-bold text-[#666666]">
              <p className="text-[12px] font-semibold text-gray-500">
                Let us know which label format and size works best for your business and we&apos;ll apply it
                to all of your new labels.
              </p>
              <div className="flex w-full items-center justify-center gap-20 px-20  ">
                {imgs.map((img, index) => (
                  <div
                    onMouseMoveCapture={() => index !== 0 && setHoveredIndex(index)}
                    onMouseLeave={() => setHoveredIndex(null)}
                    key={index}
                    className="relative w-1/3  ">
                    <div className="flex gap-2">
                      <input
                        className="rounded-sm bg-white p-2"
                        id={index.toString()}
                        type="checkbox"
                        checked={selectedCheckbox === index}
                        onChange={() => handleCheckboxChange(index)}
                      />{' '}
                      {img.title}
                    </div>

                    <img className="h-50 w-50 object-cover px-10" src={img.src} alt={img.alt} />
                    {hoveredIndex === index && (
                      <div className="absolute -top-[100px] left-[20%]  z-10 w-56 rounded bg-gray-700 p-2 text-[12px] text-white shadow-md">
                        {img.hover}
                      </div>
                    )}
                  </div>
                ))}
              </div>
              <div className="flex w-full flex-col gap-5">
                {data.map((item, index) => (
                  <div key={index} className="flex w-[60%] flex-col">
                    <div className="flex items-center gap-2 text-[15px] text-[#656565]">
                      <input type="checkbox" />
                      {item.label}
                    </div>
                    {item.extra && (
                      <div className="text-[12px] font-semibold text-gray-500">{item.extra}</div>
                    )}
                    <div className="text-[12px] ">
                      <p className="font-normal">{item.note}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <button className="flex h-10 w-40 items-center  gap-2 bg-blue-600 text-white hover:bg-blue-400">
              <div className="flex h-full w-1/4 items-center justify-center  hover:bg-blue-400">
                <svg viewBox="0 0 24 24" fill="currentColor" height="1.5em" width="1.5em">
                  <path d="M5 21h14a2 2 0 002-2V8l-5-5H5a2 2 0 00-2 2v14a2 2 0 002 2zM7 5h4v2h2V5h2v4H7V5zm0 8h10v6H7v-6z" />
                </svg>
              </div>
              Save Settings
            </button>
          </div>
        </div>
      )}
    </PageWithSidebar>
  );
};

export default LabelPreferences;
