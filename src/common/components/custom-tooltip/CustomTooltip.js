import { Tooltip as FlowbiteTooltip } from 'flowbite-react';

const CustomTooltip = ({ children, text, wrapperClassNames, width, style = 'light', placement = 'top', ...rest }) => {
  return (
    <FlowbiteTooltip
      animation={'duration-200'}
      style={style}
      content={text}
      className={`inline-flex ${width ? `min-w-[${width}]` : 'min-w-[150px]'
        } max-w-[250px] text-xs font-normal shadow-xl [&>*:first-child]:w-full ${wrapperClassNames}`}
      {...rest}
      placement={placement}
    >
      {children}
    </FlowbiteTooltip>
  );
};

export default CustomTooltip;
