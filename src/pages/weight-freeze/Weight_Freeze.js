import { useEffect, useState } from 'react';
import PageWithSidebar from '../../common/components/page-with-sidebar/PageWithSidebar';
import { FreezeTable, FreezeTabs, WeightFreezeHeader } from './components';
import { Loader } from '../../common/components';
import { ImageModal } from './components/weightFreezeImageModal';
import { useSearchParams } from 'react-router-dom';
import { FreezePagination } from './components/weightFreezePagination';

const Weight_Freeze = () => {
  const [data, setData] = useState([]);
  const [totalData, setTotalData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [images, setImages] = useState([]);
  const [showImages, setShowImages] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const [per_page, setPerPage] = useState(parseInt(searchParams.get('per_page'), 10) || 15);
  const [page, setPage] = useState(parseInt(searchParams.get('page'), 10) || 1);
  const [tabs, setTabs] = useState([
    {
      title: 'Action required',
      freezeStatus: 5,
      items: 0
    },
    {
      title: 'Request Raised',
      freezeStatus: 2,
      items: 0
    },
    {
      title: 'Request Aceepted',
      freezeStatus: 1,
      items: 0
    },
    {
      title: 'Request Rejected',
      freezeStatus: 3,
      items: 0
    },
    {
      title: 'Not Requested',
      freezeStatus: 0,
      items: 0
    },
    {
      title: 'Unfreezed',
      freezeStatus: 4,
      items: 0
    },
  ]);

  const handlePageChange = (page) => {
    const currentSearchParams = new URLSearchParams(searchParams);
    setPage(page);
    currentSearchParams.set('page', page);
    setSearchParams(currentSearchParams);
  }

  const handlePerPageChange = (perPage) => {
    const currentSearchParams = new URLSearchParams(searchParams);
    setPerPage(perPage);
    currentSearchParams.set('per_page', perPage);
    setSearchParams(currentSearchParams);
  }

  useEffect(() => {
    // dataGet();
  }, []);

  return (
    <PageWithSidebar>
      {loading && <Loader />}
      {showImages && <ImageModal setShow={setShowImages} images={images} setImages={setImages} />}
      <div className="h-full bg-[#f8f8f8] pl-4">
        <div className="py-4">
          {/* header-wrapper */}
          <WeightFreezeHeader />
        </div>
        <hr className="border-[#c2c2c2]" />
        <div className="px-4 pb-0">
          {/* content-wrapper */}
          <FreezeTabs tabs={tabs} setTabs={setTabs} setData={setData} setTotalData={setTotalData} setLoading={setLoading} page={page} perPage={per_page} />
        </div>
        <div>
          <FreezeTable data={data} setLoading={setLoading} setShowImages={setShowImages} setImages={setImages} />
        </div>
        {data.length &&
          <div>
            <FreezePagination page={page} totalData={totalData} perPage={per_page} data={data} handlePageChange={handlePageChange} handlePerPageChange={handlePerPageChange} />
          </div>
          }
      </div>
    </PageWithSidebar>
  );
};

export default Weight_Freeze;
