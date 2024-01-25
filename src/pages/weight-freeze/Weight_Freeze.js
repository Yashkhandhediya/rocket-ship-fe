import { useEffect, useState } from 'react';
import PageWithSidebar from '../../common/components/page-with-sidebar/PageWithSidebar';
import { FreezeTable, FreezeTabs, WeightFreezeHeader } from './components';
import { Loader } from '../../common/components';

const Weight_Freeze = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
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

  useEffect(() => {
    // dataGet();
  }, []);

  return (
    <PageWithSidebar>
      {loading && <Loader />}
      <div className="h-full bg-[#f8f8f8] pl-4">
        <div className="py-4">
          {/* header-wrapper */}
          <WeightFreezeHeader />
        </div>
        <hr className="border-[#c2c2c2]" />
        <div className="px-4 pb-0">
          {/* content-wrapper */}
          <FreezeTabs tabs={tabs} setTabs={setTabs} setData={setData} setLoading={setLoading} />
        </div>
        <div>
          <FreezeTable data={data} setLoading={setLoading}/>
        </div>
      </div>
    </PageWithSidebar>
  );
};

export default Weight_Freeze;
