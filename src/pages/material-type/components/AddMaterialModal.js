import React, { useState } from 'react';
import { Loader } from '../../../common/components';
import { BACKEND_URL } from '../../../common/utils/env.config';
import axios from 'axios';
import { toast } from 'react-toastify';
import { ACCESS_TOKEN } from '../../../common/utils/config';
import { useNavigate } from 'react-router-dom';

function AddMaterialModal({ handleClose, getMaterialData, state, editData, handleSetEdit }) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const company_id = sessionStorage.getItem('company_id');
  const [material_type, setMaterial_type] = useState(editData ? editData.material_type : '');
  const headers = {             
    'Content-Type': 'application/json',
    'Authorization': ACCESS_TOKEN};
  const navigate = useNavigate();  
  // console.log(state);

  const is_admin = sessionStorage.getItem('is_admin');
  // const companyId = is_admin == 2 ? state.id : company_id;

  const handleAddMaterial = async () => {
    if (material_type === '') {
      setError('Material Name is Required');
      return;
    }
    setLoading(true);
    handleClose();
    try {
      const response = await axios.post(`${BACKEND_URL}/materialtype/create_material_type/`, {
        material_type,
        created_by: company_id,
        headers:headers
      });
      setMaterial_type('');
      console.log(response);
      getMaterialData(company_id);
      toast('Added Material Sucessfully', { type: 'success' });
    } catch (err) {
      if (err.response.status === 400) {
        toast(err.response.data.detail, { type: 'error' });
      } else if (err.response.status === 401) {
        sessionStorage.clear();
        navigate('/login');
      } else {
        toast('There is some error while Adding Material', { type: 'error' });
      }
    } finally {
      setLoading(false);
    }
  };
  const handleEditMaterial = async () => {
    setLoading(true);
    handleClose();

    try {
      const response = await axios.put(
        `${BACKEND_URL}/materialtype/update_material_type/?id=${editData.id}`,
        {
          material_type,headers:headers
        },
      );
      setMaterial_type('');
      handleSetEdit();
      console.log(response);
      getMaterialData(company_id);
      toast('Edited Material Sucessfully', { type: 'success' });
    } catch (err) {
      if (err.response.status === 400) {
        toast(err.response.data.detail, { type: 'error' });
      } else if (err.response.status === 401) {
        sessionStorage.clear();
        navigate('/login');
      } else {
        toast('There is some error while Editing Material', { type: 'error' });
      }
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
            <p className="text-lg font-bold">{editData ? 'Edit' : 'Add'} Material</p>
            <button className="text-gray-400" onClick={handleClose}>
              X
            </button>
          </div>
          <div className="mb-2 ">
            <input
              type="text"
              id="truck_number"
              placeholder="Enter Material Name"
              className="mt-1 block w-full rounded-sm border border-gray-200 px-2.5 py-1 text-[12px] shadow-sm focus:border-blue-50 focus:outline-none"
              value={material_type}
              onChange={(e) => setMaterial_type(e.target.value)}
            />
            {error && <p className="w-1/2 text-xs text-red-500">{error}</p>}
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
              className="w-1/2 rounded-lg bg-sky-500 px-4 py-2 text-white"
              onClick={() => {
                editData ? handleEditMaterial() : handleAddMaterial();
              }}>
              {editData ? 'Edit Material' : 'Add Material'}
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default AddMaterialModal;
