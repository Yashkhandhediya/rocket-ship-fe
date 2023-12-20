import { Tooltip as FlowbiteTooltip } from 'flowbite-react';

const Tooltip = ({ children, text, ...rest }) => {
  return (
    <FlowbiteTooltip
      style="light"
      content={text}
      className="w-[250px] text-xs font-normal inline-flex text-gray-700 shadow-xl"
      {...rest}>
      {children}
    </FlowbiteTooltip>
  );
};

export default Tooltip;
