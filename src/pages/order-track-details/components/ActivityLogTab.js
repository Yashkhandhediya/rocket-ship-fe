const ActivityLogTab = () => {
  const actvitySteps = [1, 2];

  const renderTimelinePoint = (isActive) => {
    return isActive ? (
      <span className="absolute left-[-2.6rem] top-[35%] z-[2] grid h-4 w-4 place-items-center rounded-full border border-[#745be7] bg-white">
        <span className="inline-block h-2 w-2 rounded-full bg-[#745be7]"></span>
      </span>
    ) : (
      <span className="absolute left-[-2.6rem] top-[35%] z-[2] grid h-4 w-4 place-items-center rounded-full border border-[#b1b1b1] bg-white">
        <span className="inline-block h-2 w-2 rounded-full bg-[#b1b1b1]"></span>
      </span>
    );
  };

  return (
    <div className="mb-3 ml-11 mr-4 mt-[1.125rem]">
      <div className="relative border-l-0 after:absolute after:left-[-40px] after:top-8 after:ml-1.5  after:h-[calc(100%-67px)] after:border-l-2 after:border-l-[#b1b1b1]">
        {actvitySteps?.map((activity, i) => {
          return (
            <div key={i} className="relative pb-2.5">
              {renderTimelinePoint(i == 0)}
              <div className="mb-1.5 rounded-[4px] bg-[#f4f7f9] p-3 text-[#191919]">
                <div className="text-xs font-medium">{'Address Modified'}</div>
                <p className="mb-3 text-[10px] text-gray-400">{'Dec 23 2023, 21:09:58'}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ActivityLogTab;
