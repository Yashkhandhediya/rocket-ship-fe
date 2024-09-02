import { Dropdown } from 'flowbite-react';

const MoreDropdown = ({ label, renderTrigger, inline, options, dismissOnClick }) => {
  return (
    <Dropdown
      label={label}
      renderTrigger={renderTrigger}
      inline={inline}
      dismissOnClick={dismissOnClick}
      className="max-h-[calc(100vh-50px)] overflow-y-auto">
      {options.map((opt, i) => {
        return opt.type !== 'divider' ? (
          <Dropdown.Item
            key={opt.key}
            className={`min-w-28 max-w-72 w-40 px-4 py-2 text-xs font-medium ${opt.disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
            onClick={opt.disabled ? null : opt.onClick}
            disabled={opt.disabled}
          >
            {opt.label}
          </Dropdown.Item>
        ) : (
          <Dropdown.Divider key={opt.type + i} className="mx-4 my-2 bg-[#c1c1c1] text-[#c1c1c1]" />
        );
      })}
    </Dropdown>
  );
};

export default MoreDropdown;
