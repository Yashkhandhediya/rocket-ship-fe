import { useEffect, useState } from 'react'

const Pagination = ({ page, perPage, handlePerPageChange, handlePageChange, totalData, data, setPage }) => {
  const [previosEnabled, setPreviosEnabled] = useState(false);
  const [nextEnabled, setNextEnabled] = useState(true);
  useEffect(() => {
    if (page === 1) {
      setPreviosEnabled(false);
    } else {
      setPreviosEnabled(true);
    }
    if (page >= Math.ceil(data.length / perPage)) {
      setNextEnabled(false);
    } else {
      setNextEnabled(true);
    }
  }, [page, perPage, data])

  const handleNext = () => {
    if (nextEnabled) {
      handlePageChange(page + 1);
    }
  };

  const handlePrevios = () => {
    if (previosEnabled) {
      handlePageChange(page - 1);
    }
  };

  const itemStartCount = (page - 1) * perPage + 1;
  const itemEndCount = page * perPage > data.length ? data.length : page * perPage;

  return (
    <div className='flex flex-row justify-between py-4 px-3 border-t-2 border-t-[#94949447]'>
      <div className='flex items-center flex-row gap-2 text-[12px] text-[#707070] w-1/3'>
        <div>Show</div>
        <select
          name="perPage"
          id="per_page"
          onChange={(e) => {
            setPage(1);
            handlePerPageChange(e.target.value)
          }}
          value={perPage}
          className='w-14 h-6 rounded-md pl-2 py-0 text-[12px] flex items-center justify-center border border-[#a4a4a4] focus:ring-0 focus:outline-none focus:border-[#a4a4a4]'
          style={{ paddingRight: '0px' }}>
          <option value="15">15</option>
          <option value="30">30</option>
          <option value="60">60</option>
          <option value="100">100</option>
        </select>
        <div>items per page</div>
      </div>

      <div className='flex items-center w-2/3 gap-16 pl-8'>
        <button className={`rounded-2xl border border-[#c1c1c144] text-[12px] px-3 py-1 ${previosEnabled ? 'text-[#159700]' : 'text-[#707070] text-opacity-25'}`}
          onClick={() => {
            handlePrevios();
          }}>{'<< Previos'}</button>
        <button className={`rounded-2xl border border-[#c1c1c144] text-[12px] px-3 py-1 ${nextEnabled ? 'text-[#159700]' : 'text-[#707070] text-opacity-25'}`}
          onClick={() => {
            handleNext();
          }}>{'Next>>'}</button>
        <div className='ml-8 text-[15px] text-[#707070]'>{itemStartCount}-{itemEndCount} of {data.length}</div>
      </div>

      <div className='flex items-center w-1/3'>
        {/* Empty div for alignment */}
      </div>
    </div>
  )
}

export default Pagination
