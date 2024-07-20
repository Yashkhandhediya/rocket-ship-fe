import React, { useEffect, useState } from 'react';
import PageWithSidebar from '../../common/components/page-with-sidebar/PageWithSidebar';
import { RiDeleteBin6Line } from 'react-icons/ri';
import { GrEdit } from 'react-icons/gr';
import axios from 'axios';
import { BACKEND_URL } from '../../common/utils/env.config';
import { Loader } from '../../common/components';
import { toast } from 'react-toastify';
import emptyBox from '../../common/images/empty-box.png';
import { faSearch } from '@fortawesome/free-solid-svg-icons/faSearch';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import AddUsers from './components/AddUsers';

function Addresses() {
  const [showDelete, setShowDelete] = useState(false);
  const [showUsers, setShowUsers] = useState(false);
  const [usersData, setUsersData] = useState([]);
  const [loading, setLoading] = useState(false);
  const company_id = sessionStorage.getItem('company_id');
  const [deleteId, setDeleteId] = useState(null);
  const [editData, setEditData] = useState(null);
  const [searchData, setSearchData] = useState([]);
  const [isFocused, setIsFocused] = useState(false);
  const [query, setQuery] = useState('');
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const users_data = query.length !== 0 ? searchData : usersData;

  const handleNextPage = () => {
    setPage((prev) => prev + 1);
  };

  const handlePrevPage = () => {
    setPage((prev) => (prev <= 1 ? prev : prev - 1));
  };

  const handleChange = (event) => {
    setPageSize(event.target.value);
  };

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

  const getUsersData = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `${BACKEND_URL}/indent/get_users?company_id=${company_id}&page=${page}&page_size=${pageSize}`,
      );
      console.log(response);
      setUsersData(response.data);
    } catch (err) {
      console.log(err);
      toast('There is some error while fetching data', { type: 'error' });
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (id) => {
    const data = usersData.find((data) => data.id === id);
    setEditData(data);
    setShowUsers(true);
    console.log(editData);
  };

  const handleSetEdit = () => {
    setEditData(null);
  };

  const handleDelete = async (id) => {
    setShowDelete(false);
    setLoading(true);
    try {
      const response = await axios.delete(`${BACKEND_URL}/users/${id}`);
      getUsersData();
      toast('Delete Successfully', { type: 'success' });
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    handleSetEdit();
    setShowUsers(false);
  };

  const handleShowAddUsersModal = () => {
    setShowUsers((prev) => !prev);
  };

  const handleShowDeleteModal = (id) => {
    setDeleteId(id);
    setShowDelete((prev) => !prev);
  };

  const getSearchData = async () => {
    try {
      const response = await axios.get(
        `${BACKEND_URL}/users/search_user/?string=${query}&company_id=${company_id}`,
      );
      console.log(response);
      setSearchData(response.data);
    } catch (err) {
      toast(`There is Some error while searching`, { type: 'error' });
    }
  };

  useEffect(() => {
    getUsersData();
  }, [page, pageSize]);

  useEffect(() => {
    getSearchData();
  }, [query]);

  return (
    <PageWithSidebar>
      {loading && <Loader />}
      <div>
        <p className="mx-3 mt-3 text-lg font-medium">Users</p>
        <div className="flex items-center justify-between px-4">
          <div className="relative w-1/4">
            <form className="my-4 flex items-center gap-2 rounded-lg border bg-white px-3 py-1 text-[12px]">
              <FontAwesomeIcon icon={faSearch} className=" text-gray-500" />
              <input
                type="text"
                placeholder="Search By User Name"
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
          </div>
          <div className="flex justify-end gap-5">
            {/* {is_admin === '2' && (
              <button
                className="flex items-center gap-3 rounded bg-sky-500 px-4 py-1 text-white shadow"
                >
                Back
              </button>
            )} */}
            <button
              className="flex items-center gap-3 rounded bg-sky-500 px-4 py-1 text-white shadow"
              onClick={handleShowAddUsersModal}>
              <span className="text-2xl">+</span>
              Add User
            </button>
          </div>
        </div>
        <div className="mx-2 mt-3 min-w-full overflow-hidden rounded-lg shadow">
          <table className="w-full text-[12px]">
            <thead className="border bg-white">
              <tr>
                <th className="w-16 border px-4 py-2 text-center">Sr. No</th>
                <th className="w-20 border px-4 py-2 text-center">User Name</th>
                <th className="w-20 border px-4 py-2 text-center">Email Address</th>
                <th className="w-24 border px-4 py-2 text-center">Contact No.</th>
                <th className="w-28 border px-4 py-2 text-center">KYC Status</th>
                <th className="w-28 border px-4 py-2 text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {users_data &&
                users_data.map((data, index) => {
                  return (
                    <tr key={data.id} className={`border bg-white font-semibold text-gray-500`}>
                      <td className="border px-4 py-4 text-center">{index + 1}</td>
                      <td className="border px-4 py-4 text-center">
                        {data.first_name}
                        {` `}
                        {data.last_name}
                      </td>
                      <td className="border px-4 py-4 text-center">{data.email_address}</td>
                      <td className="border px-2 py-4 text-center font-bold">{data.contact_no}</td>
                      <td className="border px-4 py-4 text-center">
                        {data.kyc_status_id == 1
                          ? 'Upload Pending'
                          : data.kyc_status_id == 2
                            ? 'Approve Pending'
                            : 'Approved'}
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
                  );
                })}
            </tbody>
          </table>
          {usersData.length === 0 && (
            <div className="flex h-96 flex-col items-center justify-center bg-white">
              <img src={emptyBox} className="h-60" />
              <p>{`Start by creating a new address using the 'Add Address' button above.`}</p>
            </div>
          )}
          {searchData.length === 0 && (
            <div className="flex h-96 flex-col items-center justify-center bg-white">
              <img src={emptyBox} className="h-60" />
              <p>{`No Results Found.`}</p>
            </div>
          )}
          <div className="flex w-full justify-between bg-white p-2 text-sm">
            <div className="flex items-center gap-3 text-gray-500">
              <p>Showing</p>
              <select
                id="select"
                value={pageSize}
                className="rounded-lg border-gray-300 px-1 py-0"
                onChange={handleChange}>
                <option value="10">10</option>
                <option value="20">20</option>
                <option value="30">30</option>
                <option value="40">40</option>
              </select>
              <p>Entries</p>
            </div>
            <div className="flex items-center gap-2">
              <button
                className={`rounded border border-gray-300 px-2 py-0 text-lg ${
                  page === 1 ? 'cursor-not-allowed' : ''
                }`}
                onClick={handlePrevPage}
                disabled={page === 1}>{`<`}</button>
              <span className={`rounded px-2 py-0 text-sm ${page === 1 && 'hidden'}`}>{page - 1}</span>
              <button className="rounded bg-sky-500 px-2 py-1 text-sm text-white">{page}</button>
              <span className=" rounded px-2 py-0 text-sm">{page + 1}</span>
              <span className={`rounded px-2 py-0 text-sm ${page !== 1 && 'hidden'}`}>{page + 2}</span>
              <button
                className="rounded border border-gray-300 px-2 py-0 text-center text-lg"
                onClick={handleNextPage}>{`>`}</button>
            </div>
          </div>
        </div>
      </div>

      {showDelete && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-[#24292e57]">
          <div className="flex h-36 w-64 flex-col items-center justify-center gap-4 rounded-lg bg-white px-4 text-sm font-medium">
            <p>Are you sure you want to remove this User?</p>
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
      {showUsers && (
        <AddUsers
          handleClose={handleClose}
          getUsersData={getUsersData}
          editData={editData}
          handleSetEdit={handleSetEdit}
        />
      )}
    </PageWithSidebar>
  );
}

export default Addresses;
