const Tooltip = ({ children, id, text, wrapperClassNames, tooltipClassNames }) => {
  const randomizeNumber = Math.random() * 100000000000000;
  return (
    <div
      data-tooltip-target={`${id}-${randomizeNumber}-tooltip`}
      data-tooltip-placement="top"
      data-tooltip-style="light"
      className={wrapperClassNames}>
      {children}
      <div
        id={id + 'tooltip'}
        role="tooltip"
        className={`tooltip invisible absolute z-10 inline-block w-[250px] rounded-lg border border-gray-200 bg-white px-3 py-2 text-start text-xs text-gray-900 opacity-0 shadow-sm ${tooltipClassNames}`}>
        {text}
        <div className="tooltip-arrow shadow-sm" data-popper-arrow="" />
      </div>
    </div>
  );
};

export default Tooltip;
