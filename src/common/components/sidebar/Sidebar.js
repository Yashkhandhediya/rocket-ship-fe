import { Link } from 'react-router-dom';
import { sidebarLinks } from './contants';
import { useState } from 'react';
import { logo, logo_main } from '../../images';
import Modal from './Modal'; // Ensure the Modal component is correctly imported
import axios from 'axios';
import { BACKEND_URL } from '../../utils/env.config';
import { toast } from 'react-toastify';

const Sidebar = () => {
  const [openAccordion, setOpenAccordion] = useState(0);
  const [isTruckSizeModalOpen, setTruckSizeModalOpen] = useState(false);
  const [isMaterialTypeModalOpen, setMaterialTypeModalOpen] = useState(false);
  const [truckSize, setTruckSize] = useState(null);
  const [materialType, setMaterialType] = useState(null);

  const handleAccordionToggle = (index) => {
    setOpenAccordion((prev) => (prev === index ? 0 : index));
  };

  const handleMouseLeave = () => {
    setOpenAccordion(0);
  };

  const openTruckSizeModal = () => setTruckSizeModalOpen(true);
  const closeTruckSizeModal = () => setTruckSizeModalOpen(false);

  const openMaterialTypeModal = () => setMaterialTypeModalOpen(true);
  const closeMaterialTypeModal = () => setMaterialTypeModalOpen(false);

  const handleTruck = (value) => {
    setTruckSize(value);
  };

  const handleMaterial = (value) => {
    setMaterialType(value);
  };

  const handleTruckSizeSubmit = () => {
    axios
      .post(
        BACKEND_URL +
          `/trucktype/create_truck_type/?created_by=${localStorage.getItem(
            'company_id'
          )}&truck_type=${truckSize}`
      )
      .then((response) => {
        console.log('Truck Size created:', response.data);
        toast('Truck Size Created', { type: 'success' });
      })
      .catch((err) => {
        console.log('Error while creating Truck Size:', err);
        toast('Error while creating Truck Size', { type: 'error' });
      });
  };

  const handleMaterialTypeSubmit = () => {
    axios
      .post(
        BACKEND_URL +
          `/materialtype/create_material_type/?created_by=${localStorage.getItem(
            'company_id'
          )}&material_type=${materialType}`
      )
      .then((response) => {
        console.log('Material Type created:', response.data);
        toast('Material Type Created', { type: 'success' });
      })
      .catch((err) => {
        console.log('Error while creating Material Type:', err);
        toast('Error while creating Material Type', { type: 'error' });
      });
  };

  return (
    <div
      id="mySidebar"
      className="group/sidebar hover:z-100 fixed left-0 top-0 z-50 h-full w-[70px] overflow-x-hidden overflow-y-hidden bg-[#912517] text-white transition-all duration-500 hover:w-[218px] hover:overflow-y-auto [&::-webkit-scrollbar-thumb]:bg-neutral-300 [&::-webkit-scrollbar]:w-1"
      onMouseLeave={handleMouseLeave}
    >
      <div className="z-100 flex justify-center items-center sticky top-0 h-[10%] w-full bg-[#912517] pt-2.5">
        <div className="mb-2">
          <img src={logo} className="h-[80px] w-[180px] group-hover/sidebar:hidden" />
          <img src={logo} className="hidden group-hover/sidebar:block" />
        </div>
      </div>
      <hr className="mb-4 border-[#c] text-[#0000001a] md:hidden" />
      <div className="mt-6">
        {sidebarLinks.map((nav, i) => {
          if (nav.path) {
            return (
              <Link
                to={nav?.path}
                key={i}
                className="translate-y-0"
                onClick={(e) => {
                  if (nav.onClick) {
                    e.preventDefault();
                    if (nav.onClick === 'openTruckSizeModal') openTruckSizeModal();
                    if (nav.onClick === 'openMaterialTypeModal') openMaterialTypeModal();
                  }
                }}
              >
                <div className="group/sidebarItem mx-3.5 mb-3 flex items-center rounded-[4px] p-2 text-white hover:bg-white hover:text-[#c38d8d]">
                  <img src={nav.icon} className="h-6 w-6 group-hover/sidebarItem:hidden" />
                  <img src={nav.hoverIcon} className="hidden h-6 w-6 group-hover/sidebarItem:block" />
                  <span className="ml-3 truncate text-base group-hover/sidebarItem:text-[#912517] ">
                    {nav.title}
                  </span>
                </div>
              </Link>
            );
          } else if (nav.subMenuOptions) {
            return (
              <div key={i}>
                <div
                  className="group/sidebarItem mx-3.5 mb-3 flex cursor-pointer items-center rounded-[4px] p-2 text-white hover:bg-white hover:text-[#980909]"
                  onClick={() => handleAccordionToggle(i)}
                  aria-expanded={openAccordion === i}
                >
                  <img src={nav.icon} className="h-6 w-6 group-hover/sidebarItem:hidden" />
                  <img src={nav.hoverIcon} className="hidden h-6 w-6 group-hover/sidebarItem:block" />
                  <div className="ml-3 w-full flex justify-between truncate text-xs group-hover/sidebarItem:text-[#980909] ">
                    <span>{nav.title}</span>
                    <span className="w-full flex justify-end">
                      <svg
                        data-accordion-icon
                        className={`w-5 h-5 truncate group-hover/sidebarItem:text-[#980909] shrink-0 ${openAccordion === i ? 'rotate-180' : 'rotate-0'} transform origin-center transition-transform duration-300 ease-in-out shrink-0`}
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        strokeWidth="1.5"
                        stroke="currentColor"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
                      </svg>
                    </span>
                  </div>
                </div>
                <div id={'accordion-collapse-body-1'} className={`${openAccordion === i ? 'block' : 'hidden'}`} aria-labelledby={'accordion-collapse-heading-1'}>
                  <div className="ml-6 font-normal">
                    {nav.subMenuOptions &&
                      nav.subMenuOptions.map((subNav, i) => (
                        <Link to={subNav.path} key={i} className="translate-y-0">
                          <div className="group/sidebarItem mx-3.5 mb-3 flex items-center rounded-[4px] p-2 text-white hover:bg-white hover:text-[#980909]">
                            <span className="ml-3 truncate text-xs group-hover/sidebarItem:text-[#980909] ">
                              {subNav.title}
                            </span>
                          </div>
                        </Link>
                      ))}
                  </div>
                </div>
              </div>
            );
          } else {
            return (
              <div key={i} className="translate-y-0" onClick={() => {
                if (nav.onClick === 'openTruckSizeModal') openTruckSizeModal();
                if (nav.onClick === 'openMaterialTypeModal') openMaterialTypeModal();
              }}>
                <div className="group/sidebarItem mx-3.5 mb-3 flex items-center rounded-[4px] p-2 text-white hover:bg-white hover:text-[#980909]">
                  <span className="ml-3 truncate text-xs group-hover/sidebarItem:text-[#980909] ">
                    {nav.title}
                  </span>
                </div>
              </div>
            );
          }
        })}
      </div>
      <Modal
        isOpen={isTruckSizeModalOpen}
        onClose={closeTruckSizeModal}
        title="Truck Size"
        label="Truck Size"
        placeholder="Enter Truck Size"
        onSubmit={handleTruckSizeSubmit}
        info={truckSize}
        setInfo={handleTruck}
      />
      <Modal
        isOpen={isMaterialTypeModalOpen}
        onClose={closeMaterialTypeModal}
        title="Material Type"
        label="Material Type"
        placeholder="Enter Material Type"
        onSubmit={handleMaterialTypeSubmit}
        info={materialType}
        setInfo={handleMaterial}
      />
    </div>
  );
};

export default Sidebar;
