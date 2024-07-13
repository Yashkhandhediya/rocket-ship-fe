import React, { useEffect, useState } from 'react';
import PageWithSidebar from '../../common/components/page-with-sidebar/PageWithSidebar';
import { RiDeleteBin6Line } from 'react-icons/ri';
import { GrEdit } from 'react-icons/gr';
import { createColumnHelper } from '@tanstack/react-table';
import { CustomDataTable } from '../../common/components';
import axios from 'axios';
import { BACKEND_URL } from '../../common/utils/env.config';
import { Loader } from '../../common/components';
import { toast } from 'react-toastify';
import AddAddressModal from './components/AddAddressModal';
import emptyBox from '../../common/images/empty-box.png';

function Addresses() {
  const [showDelete, setShowDelete] = useState(false);
  const [showAddAddress, setShowAddAddress] = useState(false);
  const [addressData, setAddressData] = useState([]);
  const [loading, setLoading] = useState(false);
  const company_id = sessionStorage.getItem('company_id');
  const [deleteId, setDeleteId] = useState(null);
  const [editData, setEditData] = useState(null);
  const [userData, setUserData] = useState([]);
  const [fetchData, setFetchData] = useState(false);
  const [idUser, setIdUser] = useState(null);
  const [showAddressTable, setShowAddressTable] = useState(false);
  const is_admin = sessionStorage.getItem('is_admin');

  useEffect(() => {
    fetchDataFromAPI();
  }, []);

  const fetchDataFromAPI = async () => {
    axios
      .get(BACKEND_URL + `/company/all_company/`)
      .then((res) => {
        console.log('RESSSSSSSSSSSSS', res);
        const filteredData = res.data.filter(item => item.kyc_status_id === 1);
        setUserData(filteredData);
        setFetchData(true);
      })
      .catch((err) => {
        console.log('ERRRRRRRRRR', err);
      });
  };

  const getColumns = () => {
    const columnHelper = createColumnHelper();
    return [
      columnHelper.accessor('name', {
        header: 'Company Name',
        cell: ({ row }) => {
          return (
            <div className="flex flex-col gap-2 text-left text-xs">
              {row?.original?.name && <div>{row?.original?.name}</div>}
            </div>
          );
        },
      }),
      columnHelper.accessor('email', {
        header: 'Email Address',
        cell: ({ row }) => {
          return (
            <div className="flex flex-col gap-2 text-left text-xs">
              {row?.original?.email && <div>{row?.original?.email}</div>}
            </div>
          );
        },
      }),
      columnHelper.accessor('contact', {
        header: 'Contact No.',
        cell: ({ row }) => {
          return (
            <div className="flex flex-col gap-2 text-left text-xs">
              {row?.original?.contact && <div>{row?.original?.contact}</div>}
            </div>
          );
        },
      }),

      columnHelper.accessor('action', {
        header: 'Action',
        cell: ({ row }) => {
          return (
            <div className="flex gap-2 text-left text-xs">
              <div
                className="min-w-fit rounded bg-sky-500 px-4 py-1.5 text-white hover:bg-sky-700"
                onClick={() => { handleKYC(row?.original?.id); }}>
                {'Show Details'}
              </div>
            </div>
          );
        },
      }),
    ];
  };

  const rowSubComponent = (row) => {
    return <div>Details for {row.companyName}</div>;
  };

  const getAddressData = async (companyId) => {
    setLoading(true);
    try {
      const response = await axios.get(`${BACKEND_URL}/address/get_address/?company_id=${companyId}`);
      console.log(response);
      setAddressData(response.data);
      setShowAddressTable(true);
    } catch (err) {
      console.log(err);
      toast('There is some error while fetching data', { type: 'error' });
    } finally {
      setLoading(false);
    }
  };

  const handleKYC = (companyId) => {
    getAddressData(companyId);
  };

  const handleEdit = (id) => {
    const data = addressData.find((data) => data.id === id);
    setEditData(data);
    setShowAddAddress(true);
    console.log(editData);
  };

  const handleSetEdit = () => {
    setEditData(null);
  };

  const handleDelete = async (id) => {
    setShowDelete(false);
    setLoading(true);
    try {
      const response = await axios.delete(`${BACKEND_URL}/address/delete_booking_address/?address_id=${id}`);
      getAddressData(company_id);
      toast('Delete Successfully', { type: 'success' });
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    handleSetEdit();
    setShowAddAddress(false);
  };

  const handleShowAddressModal = (id) => {
    setShowAddAddress((prev) => !prev);
  };

  const handleShowDeleteModal = (id) => {
    setDeleteId(id);
    setShowDelete((prev) => !prev);
  };

  const handleShowList = () => {
    setShowAddressTable(false);
  };

  return (
    <PageWithSidebar>
      {loading && <Loader />}
      {is_admin === '2' && !showAddressTable ? (
        fetchData ? (
          userData.length > 0 ? (
            <CustomDataTable
              columns={getColumns()}
              rowData={userData}
              enableRowSelection={true}
              shouldRenderRowSubComponent={() => Boolean(Math.ceil(Math.random() * 10) % 2)}
              onRowSelectStateChange={(selected) => console.log('selected-=-', selected)}
              rowSubComponent={rowSubComponent}
              enablePagination={true}
              tableWrapperStyles={{ height: '78vh' }}
            />
          ) : (
            <div className="flex h-[calc(100vh-5rem)] flex-col items-center justify-center bg-white">
              <img src={emptyBox} className="h-60" />
              <p>{`No Action Required`}</p>
            </div>
          )
        ) : null
      ) : (
        <div>
          <div className="flex justify-between items-center">
            <p className="mx-3 mt-3 text-lg font-medium">Address {`>`} Reliance & Co.</p>
            <div className="flex justify-end gap-5">
              <button
                className="flex items-center gap-3 rounded bg-sky-500 px-4 py-1 text-white shadow"
                onClick={handleShowList}>
                Back
              </button>
              <button
                className="flex items-center gap-3 rounded bg-sky-500 px-4 py-1 text-white shadow"
                onClick={handleShowAddressModal}>
                <span className="text-2xl">+</span>
                Add Address
              </button>
            </div>
          </div>
          <div className="mx-2 mt-3 min-w-full overflow-hidden rounded-lg shadow">
            <table className="w-full text-[12px]">
              <thead className="border bg-white">
                <tr>
                  <th className="w-16 border px-4 py-2 text-center">Sr. No</th>
                  <th className="w-20 border px-4 py-2 text-center">Area</th>
                  <th className="w-20 border px-4 py-2 text-center">City</th>
                  <th className="w-24 border px-4 py-2 text-center">State</th>
                  <th className="w-28 border px-4 py-2 text-center">Country</th>
                  <th className="w-28 border px-4 py-2 text-center">Pincode</th>
                  <th className="w-24 border px-4 py-2 text-center">Actions</th>
                </tr>
              </thead>
              <tbody>
                {addressData &&
                  addressData.map((data, index) => {
                    return (
                      <tr key={data.id} className={`border bg-white font-semibold text-gray-500`}>
                        <td className="border px-4 py-4 text-center">{index + 1}</td>
                        <td className="border px-4 py-4 text-center">{data.area ? data.area : '-'}</td>
                        <td className="border px-4 py-4 text-center">{data.city ? data.city : '-'}</td>
                        <td className="border px-2 py-4 text-center">{data.state ? data.state : '-'}</td>
                        <td className="border px-4 py-4 text-center">{data.country ? data.country : '-'}</td>
                        <td className="border px-4 py-4 text-center">{data.pincode ? data.pincode : '-'}</td>
                        <td className="border px-4 py-4 text-center">
                          <div className="flex items-center justify-center gap-4 text-2xl">
                            <RiDeleteBin6Line
                              className="cursor-pointer"
                              onClick={() => handleShowDeleteModal(data.id)}
                            />
                            <GrEdit className="cursor-pointer" onClick={() => handleEdit(data.id)} />
                          </div>
                        </td>
                      </tr>
                    );
                  })}
              </tbody>
            </table>
            {addressData.length === 0 && (
              <div className="flex h-96 flex-col items-center justify-center bg-white">
                <img src={emptyBox} className="h-60" />
                <p>{`Start by creating a new address using the 'Add Address' button above.`}</p>
              </div>
            )}
            {addressData.length > 0 && (
              <div className="flex w-full justify-between bg-white p-2 text-sm">
                <div className="flex items-center gap-3 text-gray-500">
                  <p>Showing</p>
                  <select className="rounded-lg border-gray-300 px-1 py-0">
                    <option>10</option>
                    <option>20</option>
                    <option>30</option>
                    <option>40</option>
                  </select>
                  <p>Entries</p>
                </div>
                <div className="flex gap-2">
                  <button className="rounded border border-gray-300 px-2 py-0 text-lg">{`<`}</button>
                  <button className="rounded bg-sky-500 px-2 py-0 text-sm text-white">1</button>
                  <button className="rounded px-2 py-0 text-sm">2</button>
                  <button className="rounded px-2 py-0 text-sm">3</button>
                  <button className="rounded border border-gray-300 px-2 py-0 text-center text-lg">{`>`}</button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
      {showDelete && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-[#24292e57]">
          <div className="flex h-36 w-64 flex-col items-center justify-center gap-4 rounded-lg bg-white px-4 text-sm font-medium">
            <p>Are you sure you want to remove this Address?</p>
            <div className="flex w-full justify-center gap-4">
              <button
                className="w-1/2 rounded-lg bg-sky-500 px-4 py-1 text-white"
                onClick={() => handleDelete(deleteId)}>
                Yes
              </button>
              <button className="w-1/2 rounded-lg bg-zinc-100 px-4 py-1" onClick={handleShowDeleteModal}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
      {showAddAddress && (
        <AddAddressModal
          handleClose={handleClose}
          getAddressData={() => getAddressData(idUser)}
          editData={editData}
          handleSetEdit={handleSetEdit}
        />
      )}
    </PageWithSidebar>
  );
}

export default Addresses;
