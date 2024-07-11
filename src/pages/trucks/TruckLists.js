import React, { useEffect, useState } from 'react';
import PageWithSidebar from '../../common/components/page-with-sidebar/PageWithSidebar';
import { IoIosSave } from 'react-icons/io';
import { RxCross2 } from 'react-icons/rx';
import { RiDeleteBin6Line } from 'react-icons/ri';
import { GrEdit } from 'react-icons/gr';
import { CustomMultiSelect } from '../../common/components';
import { weightTypes, truckTypes } from '../indent/data';
function TruckLists() {
  const [enableSave, setEnableSave] = useState(null);
  const [enableClear, setEnableClear] = useState(null);
  const [showDelete, setShowDelete] = useState(false);
  const [truckData, setTruckData] = useState({
    truckType: 'Select Type',
    truckImg: 'Select Img',
    tons: 'Kg',
    truckNumber: '',
    truckDimensions: '',
    targetWeight: '',
  });

  console.log(enableSave);
  console.log(truckData);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setTruckData({ ...truckData, [id]: value });
  };

  const handleClear = () => {
    setTruckData({
      ...truckData,
      truckType: 'Select Type',
      truckNumber: '',
      truckDimensions: '',
      targetWeight: '',
    });
  };

  const handleShowDeleteModal = () => {
    setShowDelete((prev) => !prev);
  };

  useEffect(() => {
    if (
      truckData.truckType !== 'Select Type' &&
      truckData.truckNumber !== '' &&
      truckData.truckDimensions !== '' &&
      truckData.targetWeight !== ''
    ) {
      setEnableSave(true);
    } else {
      setEnableSave(null);
    }
    if (
      truckData.truckType !== 'Select Type' ||
      truckData.truckNumber !== '' ||
      truckData.truckDimensions !== '' ||
      truckData.targetWeight !== ''
    ) {
      setEnableClear(true);
    } else {
      setEnableClear(null);
    }
  }, [truckData]);

  return (
    <PageWithSidebar>
      {showDelete && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-[#24292e57]">
          <div className="flex h-36 w-64 flex-col items-center justify-center gap-4 rounded-lg bg-white px-4 text-sm font-medium">
            <p>Are you sure you want to remove this truck?</p>
            <div className="flex w-full justify-center gap-4">
              <button className="w-1/2 rounded-lg bg-sky-500 px-4 py-1 text-white">Yes</button>
              <button className="w-1/2 rounded-lg bg-zinc-100 px-4 py-1" onClick={handleShowDeleteModal}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
      <p className="mx-3 mt-3 text-lg font-medium">Truck Master {`>`} Reliance & Co.</p>
      <table className="mx-2 mt-5 min-w-full overflow-hidden rounded-lg text-[12px] shadow">
        <thead className="border bg-white">
          <tr>
            <th className="w-1/6 border px-4 py-2 text-center">Truck Type</th>{' '}
            <th className="w-1/6 border  px-4 py-2 text-center">Truck Image</th>
            <th className="w-1/6  border px-4 py-2 text-center">Vehical Capacity</th>
            <th className="w-1/6 border  px-4 py-2 text-center">Truck Number</th>
            <th className="w-1/6 border  px-4 py-2 text-center">Truck Dimensions</th>
            <th className="w-1/6 border  px-4 py-2 text-center">Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr className={`border  bg-white font-semibold text-gray-500`}>
            <td className=" border px-4 py-4 text-center">
              <CustomMultiSelect
                isMulti={false}
                options={truckTypes}
                selected={truckData.truckType}
                closeMenuOnSelect={true}
                placeholder={truckData.truckType}
                hideSelectedOptions={false}
                onChange={(value) => {
                  setTruckData({ ...truckData, truckType: value });
                }}
              />
            </td>
            <td className=" border px-4 py-4 text-center">
              <select
                value="Select"
                className="border-none bg-zinc-100 text-[13px]  outline-none focus:border-none focus:outline-none">
                <option>Select</option>
                <option>demo</option>
                <option>demo</option>
              </select>
            </td>
            <td className=" border px-2 py-4 text-center">
              <div className="flex items-center justify-center ">
                <input
                  value={truckData.targetWeight}
                  id="targetWeight"
                  type="number"
                  className="w-24 border-none bg-zinc-100 px-4 py-[7px] text-[13px]  outline-none focus:border-none focus:outline-none"
                  onChange={(e) => handleChange(e)}
                />
                <CustomMultiSelect
                  isMulti={false}
                  options={weightTypes}
                  selected={truckData.tons}
                  closeMenuOnSelect={true}
                  placeholder={truckData.tons}
                  hideSelectedOptions={false}
                  onChange={(value) => {
                    setTruckData({ ...truckData, tons: value });
                  }}
                />
              </div>
            </td>
            <td className=" border px-4 py-4 text-center">
              <input
                type="text"
                id="truckNumber"
                value={truckData.truckNumber}
                className="w-full border-none bg-zinc-100 text-[13px]  outline-none focus:border-none focus:outline-none"
                onChange={(e) => handleChange(e)}
              />{' '}
            </td>
            <td className=" border px-4 py-4 text-center">
              <input
                type="text"
                id="truckDimensions"
                value={truckData.truckDimensions}
                className="w-full border-none bg-zinc-100 text-[13px]  outline-none focus:border-none focus:outline-none"
                onChange={(e) => handleChange(e)}
              />
            </td>
            <td className=" border px-4 py-4 text-center">
              <div className="flex justify-center gap-4 text-2xl">
                <IoIosSave className={`${enableSave ? 'cursor-pointer text-sky-500' : ' text-zinc-400'}`} />
                <RxCross2
                  className={`${enableClear ? 'cursor-pointer text-sky-500' : ' text-zinc-400'}`}
                  onClick={handleClear}
                />
              </div>
            </td>
          </tr>
          <tr className={`border  bg-white  font-semibold text-gray-500`}>
            <td className=" border px-4 py-4 text-center">LCV</td>
            <td className=" border px-4 py-4 text-center">
              <img src="" />
            </td>
            <td className=" border px-2 py-4 text-center">30 tonnes</td>
            <td className=" border px-4 py-4 text-center">GJ 03 HK 8379</td>
            <td className=" border px-4 py-4 text-center">10 ft L * 7 ft H</td>
            <td className=" border px-4 py-4 text-center">
              <div className="flex items-center justify-center gap-4 text-2xl">
                <RiDeleteBin6Line className="cursor-pointer" onClick={handleShowDeleteModal} />
                <GrEdit className="cursor-pointer" />
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </PageWithSidebar>
  );
}

export default TruckLists;
