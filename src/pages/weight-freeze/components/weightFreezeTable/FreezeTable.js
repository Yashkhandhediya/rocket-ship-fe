const FreezeTable = ({ data }) => {
  console.log(
    'data',
    data[0].map((item) => item),
  );
  return (
    <div className="mt-4 flex flex-col border border-b-0 border-black text-[12px] font-bold text-[#484848]">
      {/* table headings */}
      <div className="flex items-center justify-between border border-b-[#E5E7EB] text-left">
        <div className="w-[4%] border-r-2 py-2.5 text-center">
          <input type="checkbox" />
        </div>
        <div className="w-1/12 border-r-2 py-2.5">PID</div>
        <div className="w-1/12 border-r-2 py-2.5">Produt Name</div>
        <div className="w-2/12 border-r-2 py-2.5">SKU Summary</div>
        <div className="w-1/12 border-r-2 py-2.5">Channel</div>
        <div className="w-2/12 border-r-2 py-2.5">Package Details</div>
        <div className="w-2/12 border-r-2 py-2.5">Images</div>
        <div className="w-1/12 border-r-2 py-2.5">Weight Freeze Status</div>
        <div className="w-[10%] border-r-2 py-2.5">Action</div>
      </div>
      {/* table data */}
      <div className="flex flex-col items-center justify-center">
        {data[0].map((item, key) => {
          return (
            <div
              className="flex h-32 w-full flex-row items-center justify-between border border-b-[#E5E7EB] text-left"
              key={key}>
              <div className="flex h-full w-[4%] items-center justify-center border-r-2">
                <input type="checkbox" />
              </div>
              <div className="flex h-full w-1/12 items-center border-r-2 text-blue-600">{item.id}</div>
              <div className="flex h-full w-1/12 items-center border-r-2 font-normal">{item.name}</div>
              <div className="flex h-full w-2/12 flex-col justify-center gap-4 border-r-2 text-left">
                <div>Channel SKU : {item.sku}</div>
                <div>Channel Product ID : {item.sku}</div>
              </div>
              <div className="flex h-full w-1/12 items-center border-r-2">{item.channel_name}</div>
              <div className="flex h-full w-2/12 items-center border-r-2">
                <div className="flex flex-col gap-2">
                  <div>Dimension :</div>
                  <div className="font-normal">
                    {item.package_details.length.toFixed(3)} x {item.package_details.width.toFixed(3)} x{' '}
                    {item.package_details.height.toFixed(3)}
                  </div>
                  <div>Dead Weight :</div>
                  <div className="font-normal">{item.package_details.dead_weight}</div>
                </div>
              </div>
              <div className="flex h-full w-2/12 items-center border-r-2">{item?.images[0]}</div>
              <div className="flex h-full w-1/12 items-center border-r-2">{item?.status_name}</div>
              <div className="flex h-full w-[10%] items-center border-r-2">
                <button className="border-blue-500 rounded-md border px-4 py-1 bg-white text-blue-500">
                  Freeze Product</button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default FreezeTable;
