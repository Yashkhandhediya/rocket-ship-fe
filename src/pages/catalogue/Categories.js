import React, { useEffect, useState } from 'react';
import CatalogueTab from './CatalogueTab';
import AddCategories from './components/AddCategories';
import { BACKEND_URL } from '../../common/utils/env.config';
import { toast } from 'react-toastify';
import Loader from '../../common/loader/Loader';
import apiClient from '../../common/utils/apiClient';

function Categories() {
  const [showAdd, setShowAdd] = useState(false);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [editData, setEditData] = useState(null);
  const [deleteId, setDeleteId] = useState(null);

  const getData = async () => {
    setLoading(true);
    try {
      const response = await apiClient.get(`${BACKEND_URL}/category`);
      setData(response.data);
      console.log(response.data);
    } catch (err) {
      toast('There is some error while fetching data', { type: 'error' });
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    setLoading(true);
    try {
      await apiClient.delete(`${BACKEND_URL}/category/${id}`);
      toast('Delete Successfully', { type: 'success' });
      getData();
    } catch (err) {
      toast('Error deleting truck data', { type: 'error' });
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (id) => {
    const editId = data.find((categoryData) => categoryData.id === id);
    console.log(id);
    setEditData(editId);
    setShowAdd(true);
  };

  const handleSetEdit = () => {
    setEditData(null);
  };

  const handleClose = () => {
    handleSetEdit();
    setShowAdd(false);
  };

  const handleShowAdd = () => {
    setShowAdd((prev) => !prev);
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <CatalogueTab>
      {loading && <Loader />}
      {showAdd && (
        <AddCategories
          handleClose={handleClose}
          getData={getData}
          editData={editData}
          handleSetEdit={handleSetEdit}
        />
      )}
      <div className="w-full">
        <div className="flex justify-between border-b pb-3">
          <div className=" mt-2 text-xl">Categories</div>
          <button
            className="flex items-center gap-2 rounded bg-red-800 px-2 py-1 text-white"
            onClick={handleShowAdd}>
            <span className="text-2xl">+</span>Add Categories
          </button>
        </div>
        <table className="mt-5 w-full overflow-hidden rounded-lg text-[12px] shadow">
          <thead className=" bg-white">
            <tr>
              <th className=" border px-4 py-2 text-left"> Name</th>
              <th className=" border px-4 py-2 text-left"> Code</th>
              <th className=" border px-4 py-2 text-left"> Tax Code</th>
              <th className=" border px-4 py-2 text-left"> HSN</th>
              <th className=" border px-4 py-2 text-left"> Action</th>
            </tr>
          </thead>
          <tbody>
            {data.length != 0 &&
              data.map((item) => {
                return (
                  <tr key={item.id} className={`text-[13px] font-semibold text-gray-400`}>
                    <td className=" border px-2 py-2 text-left">{item?.category || '-'}</td>
                    <td className=" border px-2 py-2 text-left">{item?.code || '-'}</td>
                    <td className=" border px-2 py-2 text-left">{item?.hsn || '-'}</td>
                    <td className=" border px-2 py-2 text-left">{item?.tax_class_code || '-'}</td>
                    <td className=" border px-2 py-2 text-left">
                      <div className="flex gap-2">
                        <button
                          className="flex items-center gap-2 rounded bg-red-800 px-2 py-1 text-white"
                          onClick={() => handleEdit(item.id)}>
                          Edit
                        </button>
                        {/* <button
                          className="flex items-center gap-2 rounded bg-red-800 px-2 py-1 text-white"
                          onClick={() => handleDelete(item.id)}>
                          Delete
                        </button> */}
                      </div>
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      </div>
    </CatalogueTab>
  );
}

export default Categories;
