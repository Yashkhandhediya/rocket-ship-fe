import { infoIcon } from '../../icons';
import { CustomTooltip } from '../custom-tooltip';

const Checkbox = ({ id, label, checked, tooltip, onChange }) => {
  return (
    <div className="relative flex">
      <input type="checkbox" className="peer hidden" id={id} checked={checked} onChange={onChange} />

      <label
        htmlFor={id}
        className="mb-2 inline-flex cursor-pointer items-center px-6 text-xs font-medium text-gray-900"
      >
        <span className="absolute left-0 top-0 h-[18px] w-[18px] rounded border border-gray-300 bg-transparent">
          {checked && (
            <span className="grid h-full w-full place-content-center rounded border border-indigo-700 fill-indigo-700 text-indigo-700">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                x="0px"
                y="0px"
                width="10"
                height="10"
                viewBox="0 0 16 16"
              >
                <path d="M5.857 14.844L0.172 9.032 3.031 6.235 5.888 9.156 12.984 2.061 15.812 4.889z"></path>
              </svg>
            </span>
          )}
        </span>
        {label ?? ''}
        {tooltip && (
          <CustomTooltip text={tooltip}>
            <img src={infoIcon} className="ms-2" />
          </CustomTooltip>
        )}
      </label>
    </div>
  );
};

export default Checkbox;
