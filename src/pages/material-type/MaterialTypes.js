import React, { useEffect, useState } from 'react';
import PageWithSidebar from '../../common/components/page-with-sidebar/PageWithSidebar';
import { RiDeleteBin6Line } from 'react-icons/ri';
import { GrEdit } from 'react-icons/gr';
import axios from 'axios';
import { BACKEND_URL } from '../../common/utils/env.config';
import { createColumnHelper } from '@tanstack/react-table';
import { CustomDataTable } from '../../common/components';
import { Loader } from '../../common/components';
import { toast } from 'react-toastify';
import AddMaterialModal from './components/AddMaterialModal';
import emptyBox from '../../common/images/empty-box.png';
import { faSearch } from '@fortawesome/free-solid-svg-icons/faSearch';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useLocation, useNavigate } from 'react-router-dom';

function MaterialTypes() {
  const [showDelete, setShowDelete] = useState(false);
  const [showAddMaterial, setShowAddMaterial] = useState(false);
  const [materialData, setMaterialData] = useState([]);
  const [loading, setLoading] = useState(false);
  const company_id = sessionStorage.getItem('company_id');
  const [deleteId, setDeleteId] = useState(null);
  const [editData, setEditData] = useState(null);
  const companyName = sessionStorage.getItem('user_name');
  const [userData, setUserData] = useState([]);
  const [fetchData, setFetchData] = useState(false);
  const [showMaterialTable, setShowMaterialTable] = useState(false);
  const [selectedCompanyName, setSelectedCompanyName] = useState('');
  const is_admin = sessionStorage.getItem('is_admin');
  const { state } = useLocation();
  const navigate = useNavigate();
  const companyId = is_admin == 2 ? state.id : company_id;

  useEffect(() => {
    if (state) {
      getMaterialData(state.id);
      return;
    }
    if (is_admin === '2') {
      fetchDataFromAPI();
    } else {
      getMaterialData(company_id);
    }
  }, [is_admin, company_id]);

  const fetchDataFromAPI = async () => {
    try {
      const res = await axios.get(`${BACKEND_URL}/company/all_company/`);
      console.log('RESSSSSSSSSSSSS', res);
      const filteredData = res.data.filter((item) => item.kyc_status_id === 1);
      setUserData(filteredData);
      setFetchData(true);
    } catch (err) {
      console.log('ERRRRRRRRRR', err);
    }
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
                onClick={() => handleKYC(row?.original?.id, row?.original?.name)}>
                {'Show Details'}
              </div>
            </div>
          );
        },
      }),
    ];
  };

  const [isFocused, setIsFocused] = useState(false);
  const [query, setQuery] = useState('');

  const handleFocused = () => {
    setIsFocused(true);
  };

  const handleSearch = (e) => {
    setQuery(e.target.value);
  };

  const clearSearch = () => {
    setQuery('');
    setIsFocused(false);
  };

  // const rowSubComponent = (row) => {
  //   return <div>Details for {row.companyName}</div>;
  // };

  const handleKYC = (companyId, companyName) => {
    getMaterialData(companyId, companyName);
  };

  const getMaterialData = async (companyId, companyName) => {
    setLoading(true);
    try {
      const response = await axios.get(
        `${BACKEND_URL}/materialtype/get_material_type/?created_by=${companyId}`,
      );
      console.log(response);
      setMaterialData(response.data);
      setSelectedCompanyName(companyName);
      setShowMaterialTable(true);
    } catch (err) {
      console.log(err);
      toast('There is some error while fetching data', { type: 'error' });
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (id) => {
    const data = materialData.find((data) => data.id === id);
    setEditData(data);
    setShowAddMaterial(true);
    console.log(editData, data);
  };

  const handleSetEdit = () => {
    setEditData(null);
  };

  const handleDelete = async (id) => {
    setShowDelete(false);
    setLoading(true);
    try {
      await axios.delete(`${BACKEND_URL}/materialtype/delete_material_type/?material_id=${id}`);
      getMaterialData(companyId, selectedCompanyName);
      toast('Delete Sucessfully', { type: 'success' });
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    handleSetEdit();
    setShowAddMaterial(false);
  };

  const handleShowAddMaterialModal = () => {
    setShowAddMaterial((prev) => !prev);
  };

  const handleShowDeleteModal = (id) => {
    setDeleteId(id);
    setShowDelete((prev) => !prev);
  };

  const handleShowList = () => {
    setShowMaterialTable(false);
    fetchDataFromAPI(); // Re-fetch company data when showing the list
  };

  return (
    <PageWithSidebar>
      {loading && <Loader />}
      {is_admin === '2' && !showMaterialTable ? (
        fetchData ? (
          userData.length > 0 ? (
            <CustomDataTable
              columns={getColumns()}
              rowData={userData}
              enableRowSelection={true}
              shouldRenderRowSubComponent={() => console.log(`Boolean(Math.ceil(Math.random() * 10) % 2)`)}
              onRowSelectStateChange={(selected) => console.log('selected-=-', selected)}
              // rowSubComponent={rowSubComponent}
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
          <p className="mx-3 mt-3 text-lg font-medium">
            Materials {`>`} {state ? state?.name : selectedCompanyName ? selectedCompanyName : companyName}
          </p>
          <div className="flex items-center justify-between gap-5 px-4">
            <div className="relative w-1/4">
              <form className="my-4 flex items-center gap-2 rounded-lg border bg-white px-3 py-1 text-[12px]">
                <FontAwesomeIcon icon={faSearch} className=" text-gray-500" />
                <input
                  type="text"
                  placeholder="Search By Material Name"
                  value={query}
                  onChange={(e) => handleSearch(e)}
                  onFocus={handleFocused}
                  className="text-semibold m-0 w-full border-transparent p-0 text-[12px] placeholder-gray-400 focus:border-transparent focus:outline-none focus:ring-0"
                />
                {isFocused && (
                  <FontAwesomeIcon
                    icon={faXmark}
                    className="cursor-pointer text-lg text-gray-500"
                    onClick={clearSearch}
                  />
                )}
              </form>
              {/* {query.length != 0 && (
              <div
                className={`absolute w-full cursor-pointer rounded-lg bg-white p-4 text-[12px] shadow-lg hover:bg-gray-200  ${
                  errorMsg ? 'text-red-800' : 'text-gray-400'
                } hover:text-red-800`}
                onClick={handlePostFilteredOrder}>
                {!loading ? (
                  <p className={`text-left`}>{searchBy ? `${searchBy}: ${query}` : `${errorMsg}`}</p>
                ) : (
                  <p className="h-full w-full animate-pulse rounded-lg bg-gray-300 text-left">.</p>
                )}
              </div>
            )} */}
            </div>
            <div className="flex justify-end gap-5">
              {is_admin === '2' && (
                <button
                  className="flex items-center gap-3 rounded bg-sky-500 px-4 py-1 text-white shadow"
                  onClick={() => navigate(`/adminkyc`)}>
                  Back
                </button>
              )}
              <button
                className="flex items-center gap-3 rounded bg-sky-500 px-4 py-1 text-white shadow"
                onClick={handleShowAddMaterialModal}>
                <span className="text-2xl">+</span>
                Add Material
              </button>
            </div>
          </div>
          <div className="mx-2 mt-3 min-w-full overflow-hidden rounded-lg shadow">
            <table className="w-full text-[12px]">
              <thead className="border bg-white">
                <tr>
                  <th className="w-1/6 border px-4 py-2 text-center">Sr. No</th>
                  <th className="w-4/6 border px-4 py-2 text-center">Material Name</th>
                  <th className="w-1/6 border  px-4 py-2 text-center">Actions</th>
                </tr>
              </thead>
              <tbody>
                {materialData &&
                  materialData?.map((data, index) => (
                    <tr key={data.id} className={`border bg-white font-semibold text-gray-500`}>
                      <td className="border px-4 py-4 text-center">{index + 1}</td>
                      <td className="border px-4 py-4 text-center">
                        {data.material_type ? data.material_type : '-'}
                      </td>
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
                  ))}
              </tbody>
            </table>
            {materialData.length === 0 && (
              <div className="flex h-96 flex-col items-center justify-center bg-white">
                <img src={emptyBox} className="h-60" />
                <p>{`Start by creating a new material using the 'Add Material' button above.`}</p>
              </div>
            )}
            {materialData.length > 0 && (
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
            <p>Are you sure you want to remove this Material?</p>
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
      {showAddMaterial && (
        <AddMaterialModal
          handleClose={handleClose}
          getMaterialData={getMaterialData}
          editData={editData}
          state={state}
          handleSetEdit={handleSetEdit}
        />
      )}
    </PageWithSidebar>
  );
}

export default MaterialTypes;
