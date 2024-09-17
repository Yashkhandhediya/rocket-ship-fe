import React, { useEffect, useState } from 'react';
import { CustomMultiSelect, Loader } from '../../../common/components';
import { BACKEND_URL } from '../../../common/utils/env.config';
import { toast } from 'react-toastify';
import { ACCESS_TOKEN } from '../../../common/utils/config';
import { useNavigate } from 'react-router-dom';
import apiClient from '../../../common/utils/apiClient';

function AddCategories({ handleClose, getData, editData, handleSetEdit }) {
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState(null);

  const [categoryData, setCategoryData] = useState({
    category: editData ? editData?.category : '',
    code: editData ? editData?.code : '',
    hsn: editData ? editData.hsn : '',
    tax_class_code: editData ? editData.capacity : '',
  });

  const requiredFields = () => {
    const newErrors = {};

    if (categoryData.category === 'Select Type') newErrors.category = 'category is Required';
    if (categoryData.code === '') newErrors.code = 'code is Required';
    if (categoryData.hsn === '') newErrors.hsn = ' hsn is Required';
    if (categoryData.tax_class_code === '') newErrors.tax_class_code = ' tax_class_code is Required';
    return newErrors;
  };

  const handleAdd = async () => {
    console.log('clicked');
    const requiredError = requiredFields();
    if (Object.keys(requiredError).length > 0) {
      setErrors(requiredError);
      return;
    }
    setLoading(true);
    handleClose();
    console.log('clicked');

    try {
      const response = await apiClient.post(`${BACKEND_URL}/category/`, {
        ...categoryData,
      });
      setCategoryData({
        category: '',
        code: '',
        hsn: '',
        tax_class_code: '',
      });
      console.log(response);
      getData();
      toast('Added Category Sucessfully', { type: 'success' });
    } catch (err) {
      toast('There is some error while Adding Category', { type: 'error' });
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = async () => {
    const requiredError = requiredFields();
    if (Object.keys(requiredError).length > 0) {
      setErrors(requiredError);
      return;
    }
    setLoading(true);
    handleClose();

    try {
      const response = await apiClient.put(`${BACKEND_URL}/category/${editData.id}`, {
        ...categoryData,
      });
      setCategoryData({
        category: '',
        code: '',
        hsn: '',
        tax_class_code: '',
      });
      handleSetEdit();
      console.log(response);
      getData();
      toast('Edited Category Sucessfully', { type: 'success' });
    } catch (err) {
      toast('There is some error while Editing Category', { type: 'error' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {loading && <Loader />}
      <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-[#24292e57]">
        <div className="flex w-96 flex-col gap-4 rounded-lg bg-white p-4 text-sm font-medium">
          <div className="flex justify-between">
            <p className="text-lg font-bold">{editData ? 'Edit' : 'Add'} Category</p>
            <button className="text-gray-400" onClick={handleClose}>
              X
            </button>
          </div>
          <div className="mb-2 ">
            <label htmlFor="category" className="block text-[12px] font-semibold">
              Category <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="category"
              className="mt-1 block w-full rounded-sm border  border-gray-200 px-2.5 py-1 text-[12px] shadow-sm outline-none focus:border-zinc-50 focus:outline-none"
              value={categoryData.category}
              onChange={(e) => setCategoryData({ ...categoryData, category: e.target.value })}
            />
            {errors && <p className="w-1/2 text-xs text-red-500">{errors?.category}</p>}
          </div>
          <div className="mb-2 ">
            <label htmlFor="code" className="block text-[12px] font-semibold">
              Code <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="code"
              className="mt-1 block w-full rounded-sm border border-gray-200 px-2.5 py-1 text-[12px] shadow-sm outline-none focus:border-zinc-50 focus:outline-none"
              value={categoryData.code}
              onChange={(e) => setCategoryData({ ...categoryData, code: e.target.value })}
            />
            {errors && <p className="w-1/2 text-xs text-red-500">{errors?.code}</p>}
          </div>
          <div className="mb-2 ">
            <label htmlFor="hsn" className="block text-[12px] font-medium">
              HSN <span className="text-red-500">*</span>{' '}
            </label>
            <div className="mt-1 flex w-full border border-gray-200 p-0">
              <input
                type="text"
                id="hsn"
                className="block w-full rounded-sm border-none px-2.5 py-1 text-[12px] shadow-sm outline-none focus:border-zinc-50 focus:outline-none"
                value={categoryData.hsn}
                onChange={(e) => setCategoryData({ ...categoryData, hsn: e.target.value })}
              />
            </div>
            {errors && <p className="w-1/2 text-xs text-red-500">{errors?.hsn}</p>}
          </div>
          <div className="mb-2 ">
            <label htmlFor="tax_class_code" className="block text-[12px] font-medium">
              Tax Class Code <span className="text-red-500">*</span>{' '}
            </label>
            <div className="mt-1 flex w-full border border-gray-200 p-0">
              <input
                type="text"
                id="tax_class_code"
                className="block w-full rounded-sm border-none px-2.5 py-1 text-[12px] shadow-sm outline-none focus:border-zinc-50 focus:outline-none"
                value={categoryData.tax_class_code}
                onChange={(e) => setCategoryData({ ...categoryData, tax_class_code: e.target.value })}
              />
            </div>
            {errors && <p className="w-1/2 text-xs text-red-500">{errors?.tax_class_code}</p>}
          </div>
          <div className="flex w-full justify-center gap-4">
            <button
              className="w-1/2 rounded-lg bg-zinc-200 px-4 py-2"
              onClick={() => {
                handleClose();
              }}>
              Cancel
            </button>
            <button
              className="w-1/2 rounded-lg bg-red-800 px-4 py-2 text-white"
              onClick={() => {
                console.log('add');
                editData ? handleEdit() : handleAdd();
              }}>
              {editData ? 'Edit Category' : 'Add Category'}
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
export default AddCategories;
